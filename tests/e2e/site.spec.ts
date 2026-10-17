import AxeBuilder from '@axe-core/playwright';
import { expect, test, type ConsoleMessage, type Page } from '@playwright/test';

const SECTION_IDS = ['about', 'skills', 'experience', 'projects', 'contact'];

/** Scrolls through the page so every whileInView animation has run, then checks nothing is left hidden. */
async function revealAll(page: Page) {
  await page.evaluate(async () => {
    // `instant` overrides the page's smooth scrolling, which would otherwise
    // cancel each step before it reaches the next section.
    const step = window.innerHeight / 2;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(1500);
  // Only the decorative, aria-hidden role switcher may still contain opacity-0 text.
  const stillHidden = await page
    .locator('main *')
    .evaluateAll(
      (els) =>
        els.filter(
          (el) => getComputedStyle(el).opacity === '0' && !el.closest('[aria-hidden="true"]'),
        ).length,
    );
  expect(stillHidden, 'elements still at opacity 0 after scrolling').toBe(0);
}

test.describe('home page', () => {
  test('responds with 200 and has exactly one h1', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Avinash Reddy Kommareddy/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Avinash Reddy');
    await expect(page.locator('main#main-content')).toHaveCount(1);
  });

  test('every section has a unique id and every in-page link points to one', async ({ page }) => {
    await page.goto('/');
    for (const id of SECTION_IDS) await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);

    const hashes = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href')!));
    expect(hashes.length).toBeGreaterThan(0);
    for (const hash of new Set(hashes)) {
      await expect(page.locator(`[id="${hash.slice(1)}"]`), `${hash} target`).toHaveCount(1);
    }
  });

  test('desktop nav links scroll to their sections', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop navigation is hidden on mobile');
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });
    for (const id of SECTION_IDS) {
      await nav.locator(`a[href="#${id}"]`).first().click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test('mobile menu opens, navigates and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile only');
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Open menu' });
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#mobile-menu')).toBeHidden();

    await button.click();
    const close = page.getByRole('button', { name: 'Close menu' });
    await expect(close).toHaveAttribute('aria-expanded', 'true');
    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeVisible();

    await menu.getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(menu).toBeHidden();
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('skip link moves focus to the main content', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard navigation');
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main-content$/);
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('logs no console errors', async ({ page, baseURL }) => {
    const origin = new URL(baseURL!).origin;
    const errors: string[] = [];
    const isForeignLoadFailure = (msg: ConsoleMessage) => {
      // Third-party resources (the GitHub avatar) may be unreachable in an
      // offline sandbox; that is not a bug in this site.
      const url = msg.location().url;
      return msg.text().startsWith('Failed to load resource') && !!url && !url.startsWith(origin);
    };
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !isForeignLoadFailure(msg)) errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/');
    await revealAll(page);
    expect(errors).toEqual([]);
  });

  test('all same-origin links and assets resolve with 200', async ({ page, request, baseURL }) => {
    const origin = new URL(baseURL!).origin;
    await page.goto('/');
    const urls = await page.evaluate(() => {
      const found = new Set<string>();
      const add = (value: string | null) => {
        if (value) found.add(new URL(value, document.baseURI).href);
      };
      document.querySelectorAll('[href]').forEach((el) => add(el.getAttribute('href')));
      document.querySelectorAll('[src]').forEach((el) => add(el.getAttribute('src')));
      document.querySelectorAll('[srcset]').forEach((el) =>
        el
          .getAttribute('srcset')!
          .split(',')
          .forEach((part) => add(part.trim().split(/\s+/)[0])),
      );
      return [...found];
    });

    const sameOrigin = [
      ...new Set(
        urls
          .map((u) => new URL(u))
          .filter((u) => u.origin === origin)
          .map((u) => u.pathname + u.search),
      ),
    ];
    // Metadata routes are referenced with absolute production URLs, so check them explicitly.
    const metadataRoutes = ['/robots.txt', '/sitemap.xml', '/opengraph-image'];
    const toCheck = [...new Set([...sameOrigin, ...metadataRoutes])];
    expect(toCheck.length).toBeGreaterThan(metadataRoutes.length);

    for (const path of toCheck) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    }
  });

  test('Open Graph image is a 1200x630 PNG', async ({ page, request }) => {
    await page.goto('/');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toMatch(/^https:\/\/.+\/opengraph-image/);
    const res = await request.get(new URL(ogImage!).pathname + new URL(ogImage!).search);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toBe('image/png');
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
      'content',
      '1200',
    );
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
      'content',
      '630',
    );
  });

  test('external links open safely in a new tab', async ({ page }) => {
    await page.goto('/');
    const external = await page.locator('a[href^="http"]').evaluateAll((links) =>
      links.map((a) => ({
        href: a.getAttribute('href'),
        target: a.getAttribute('target'),
        rel: a.getAttribute('rel'),
      })),
    );
    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link.target, link.href!).toBe('_blank');
      expect(link.rel, link.href!).toBe('noopener noreferrer');
    }
  });

  test('has no serious or critical axe violations', async ({ page }) => {
    // Reduced motion stops the rotating hero text, so axe never samples a
    // half-faded frame; all content is still revealed and checked.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await revealAll(page);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    const blocking = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    const summary = blocking.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => n.target.join(' ')).slice(0, 5),
    }));
    expect(summary).toEqual([]);
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('stops the rotating role text and hides the mouse glow', async ({ page }) => {
    await page.goto('/');
    const roles = page.locator('#about [aria-hidden="true"] > p');
    const visibleRole = async () =>
      roles.evaluateAll((els) =>
        els.filter((el) => getComputedStyle(el).opacity === '1').map((el) => el.textContent),
      );
    const before = await visibleRole();
    await page.waitForTimeout(3000);
    expect(await visibleRole()).toEqual(before);
    await expect(page.locator('body > div.pointer-events-none.fixed')).toHaveCount(0);
  });
});
