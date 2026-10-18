import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { profile } from '@/data/portfolio';
import { siteUrl } from '@/data/site';

// next/font only works inside the Next.js compiler.
vi.mock('@/app/fonts', () => ({
  inter: { variable: 'font-inter' },
  jetBrainsMono: { variable: 'font-jetbrains-mono' },
}));

// Capture what the OG route hands to ImageResponse instead of rasterising it.
vi.mock('next/og', () => ({
  ImageResponse: class {
    constructor(
      readonly element: React.ReactElement,
      readonly options: unknown,
    ) {}
  },
}));

describe('robots.txt', () => {
  it('allows everything and points at the sitemap', async () => {
    const { default: robots } = await import('@/app/robots');
    expect(robots()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: `${siteUrl}/sitemap.xml`,
    });
  });
});

describe('sitemap.xml', () => {
  it('lists only the home page', async () => {
    const { default: sitemap } = await import('@/app/sitemap');
    const entries = sitemap();
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ url: `${siteUrl}/`, priority: 1 });
  });
});

describe('Open Graph image', () => {
  it('is a 1200x630 PNG with the name and role', async () => {
    const og = await import('@/app/opengraph-image');
    expect(og.size).toEqual({ width: 1200, height: 630 });
    expect(og.contentType).toBe('image/png');
    expect(og.alt).toBe(profile.seo.title);
    const response = og.default() as unknown as { element: React.ReactElement; options: unknown };
    expect(response.options).toEqual(og.size);
    const html = renderToStaticMarkup(response.element);
    expect(html).toContain(profile.fullName);
    expect(html).toContain(profile.role);
  });
});

describe('root layout', () => {
  it('uses the site URL for metadataBase, canonical and Open Graph', async () => {
    const { metadata, viewport } = await import('@/app/layout');
    expect(String(metadata.metadataBase)).toBe(`${siteUrl}/`);
    expect(metadata.alternates?.canonical).toBe('/');
    expect(metadata.openGraph).toMatchObject({ url: siteUrl, title: profile.seo.title });
    expect(metadata.title).toMatchObject({ default: profile.seo.title });
    expect(viewport).toMatchObject({ colorScheme: 'dark' });
  });

  it('renders the skip link, Person JSON-LD and the no-JS fallback', async () => {
    const { default: RootLayout } = await import('@/app/layout');
    const html = renderToStaticMarkup(
      <RootLayout>
        <main id="main-content">content</main>
      </RootLayout>,
    );
    expect(html).toMatch(/^<html lang="en" class="font-inter font-jetbrains-mono/);
    expect(html).toContain('<a href="#main-content" class="skip-link">Skip to content</a>');
    expect(html).toContain('<noscript><style>[data-reveal]{opacity:1!important');

    const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)![1];
    expect(JSON.parse(json)).toMatchObject({
      '@type': 'Person',
      name: profile.fullName,
      url: siteUrl,
      email: `mailto:${profile.email}`,
      sameAs: [profile.github, profile.linkedin],
    });
  });
});

describe('home page', () => {
  it('renders the header, every section in order and the footer', async () => {
    const { default: Home } = await import('@/app/page');
    const { container } = render(<Home />);
    expect(screen.getByRole('banner')).toBeTruthy();
    expect(screen.getByRole('main').id).toBe('main-content');
    expect([...container.querySelectorAll('main > section')].map((s) => s.id)).toEqual([
      'about',
      'skills',
      'experience',
      'projects',
      'contact',
    ]);
    expect(screen.getByRole('contentinfo')).toBeTruthy();
  });
});
