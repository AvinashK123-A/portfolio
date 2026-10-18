# Avinash Reddy Kommareddy — Portfolio

[![CI](https://github.com/AvinashK123-A/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/AvinashK123-A/portfolio/actions/workflows/ci.yml)
[![CodeQL](https://github.com/AvinashK123-A/portfolio/actions/workflows/codeql.yml/badge.svg)](https://github.com/AvinashK123-A/portfolio/actions/workflows/codeql.yml)

Personal portfolio site of Avinash Reddy Kommareddy, Senior Flutter Engineer. It is a single,
statically generated page with About, Skills, Experience, Projects and Contact sections, hosted
on Vercel.

**Live site:** <https://portfolio-avinash-reddy-s-projects1.vercel.app>

## Stack

| Area        | Package (version in `package-lock.json`)                            |
| ----------- | ------------------------------------------------------------------- |
| Framework   | Next.js 16.4.2 (App Router, Turbopack build), React 19.3            |
| Language    | TypeScript 5.9 (strict)                                             |
| Styling     | Tailwind CSS 4.3 (CSS-first config in `src/app/globals.css`)        |
| Animation   | CSS keyframes plus a few small client components (no animation lib) |
| Icons       | lucide-react plus a few inline SVGs                                 |
| Fonts       | Inter and JetBrains Mono, self-hosted from `@fontsource-variable`   |
| Unit tests  | Vitest 4 with V8 coverage, Testing Library, jsdom                   |
| E2E tests   | Playwright 1.64 with `@axe-core/playwright`                         |
| Quality     | Lighthouse CI, CodeQL, Dependabot                                   |
| Lint/format | ESLint 9 (`eslint-config-next` flat config), Prettier 3             |

## How it is built

- **Static.** Every route is prerendered at build time (`○ Static`). The build needs no network
  access: fonts are bundled and the Open Graph image uses the font that ships with `next/og`.
- **Server Components first.** The layout, every section and the footer are React Server
  Components. Only these small client components hydrate:
  - `Navbar`: scroll state, active section, mobile menu
  - `RoleSwitcher`: rotating role title
  - `AnimatedCounter`: count-up of the hero stats
  - `Avatar`: falls back to initials if the GitHub avatar cannot load
  - `HeroParallax`, `MouseGlowEffect`: pointer-following springs (`src/hooks/spring.ts`)
  - `TimelineProgress`: scroll-linked line on the experience timeline
  - `ScrollReveal`: one `IntersectionObserver` that starts the entrance animations
- **Entrance animations are CSS.** Server components mark elements with
  `{...reveal('up' | 'left' | 'right' | 'pop' | 'scale' | 'bar')}` (`src/components/reveal.ts`).
  `ScrollReveal` sets `data-revealed` when they scroll into view and keyframes in `globals.css`
  play once. With JavaScript off, a `<noscript>` rule shows everything.
- **Motion preferences.** With `prefers-reduced-motion`, looping animations, hover movement, the
  role rotation, the counters, the parallax and the mouse glow are all off, and entrance
  animations finish instantly. The mouse glow only renders for a fine pointer (a mouse).

## Project structure

```
src/
  app/
    layout.tsx            Metadata, fonts, skip link, Person JSON-LD, noscript fallback
    page.tsx              Header, <main> with all sections, footer
    globals.css           Tailwind import and @theme, base/component styles, reveal keyframes
    fonts.ts              next/font/local setup (--font-inter, --font-jetbrains-mono)
    opengraph-image.tsx   Build-time Open Graph image (1200×630 PNG)
    robots.ts, sitemap.ts robots.txt and sitemap.xml
    icon.svg              Favicon
  components/             Navbar, Footer, ExternalLink, icons and the client components above
  sections/               AboutSection (hero), Skills, Experience, Projects, Contact
  data/
    portfolio.ts          All site content (single source of truth)
    site.ts               Site URL (NEXT_PUBLIC_SITE_URL or the Vercel URL)
  hooks/                  useMediaQuery, createSpring2D
tests/
  unit/                   Vitest: content, site URL, components, routes
  e2e/                    Playwright: page, links, menu, headers/CSP, privacy, no-JS, axe
next.config.js            Response headers (CSP, HSTS, ...) for every route
lighthouserc.json         Lighthouse CI settings and score thresholds
vercel.json               Framework, install command, region
.github/
  workflows/ci.yml        Format, lint, types, coverage, build, e2e, Lighthouse
  workflows/codeql.yml    CodeQL code scanning
  dependabot.yml          Weekly dependency and action updates
```

## Getting started

Requirements: Node.js 22 (`.nvmrc`; `engines` in `package.json` is `22.x`, which Vercel uses to
pick the build image) and npm. Node 24 also works and is tested in CI; npm prints an
`EBADENGINE` warning there because of the `22.x` pin.

```bash
git clone https://github.com/AvinashK123-A/portfolio.git
cd portfolio
nvm use          # optional, reads .nvmrc
npm ci
npm run dev      # http://localhost:3000
```

Production build: `npm run build`, then `npm run start`.

## Scripts

| Script                  | What it does                                                      |
| ----------------------- | ----------------------------------------------------------------- |
| `npm run dev`           | Start the dev server                                              |
| `npm run build`         | Production build (static prerender)                               |
| `npm run start`         | Serve the production build                                        |
| `npm run lint`          | ESLint, failing on any warning                                    |
| `npm run type-check`    | `tsc --noEmit`                                                    |
| `npm run format`        | Format everything with Prettier                                   |
| `npm run format:check`  | Check formatting                                                  |
| `npm test`              | Unit tests (Vitest)                                               |
| `npm run test:coverage` | Unit tests with coverage and thresholds (used in CI)              |
| `npm run test:watch`    | Vitest in watch mode                                              |
| `npm run test:e2e`      | Playwright e2e and accessibility tests against a production build |
| `npm run lhci`          | Lighthouse CI against `next start` (run `npm run build` first)    |

## Site URL and custom domain

Canonical URL, `metadataBase`, Open Graph and Twitter URLs, `robots.txt`, `sitemap.xml` and the
JSON-LD all come from one constant, `siteUrl` in [`src/data/site.ts`](src/data/site.ts). It is
read from `NEXT_PUBLIC_SITE_URL` at build time and defaults to
`https://portfolio-avinash-reddy-s-projects1.vercel.app`. The value is reduced to its origin, and
anything that is not an `http(s)` URL fails the build.

To move to a custom domain:

1. Add the domain in the Vercel project under **Settings → Domains**.
2. Under **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to
   `https://your-domain.example` for Production (and Preview, so preview builds also point
   search engines at the production URL).
3. Redeploy. The value is inlined at build time, so existing deployments keep the old URL.

Leave it unset to keep the `vercel.app` URL. Preview deployments use the same canonical URL as
production either way, so they are never indexed as separate sites.

## Security

[`next.config.js`](next.config.js) is the only place response headers are set, and it sets these
on every route:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://github.com https://avatars.githubusercontent.com;
  font-src 'self'; connect-src 'self'; manifest-src 'self'; frame-ancestors 'none';
  base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Cross-Origin-Opener-Policy: same-origin
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()
```

`script-src` and `style-src` allow `'unsafe-inline'`: statically prerendered Next.js pages inline
their bootstrap scripts (nonces would make every request dynamic), and React `style` props are
inline styles. There is no user input and no third-party script on the page. `next dev` also
gets `'unsafe-eval'`, which its tooling needs. The e2e suite checks the headers and fails on any
CSP violation.

There is no phone number in the source, and the email address appears on the page only in the
Contact section and the footer (plus the Person JSON-LD for search engines); unit and e2e tests
enforce both. To report a vulnerability, see
[SECURITY.md](SECURITY.md).

## Testing and CI

**Unit tests** (`tests/unit`, 76 tests) cover the content module (required fields, `https`
links, unique ids, one current role, no phone number, no unverifiable claims), the site URL
resolution, every client component (including reduced-motion paths), the sections, and the
metadata routes, layout and JSON-LD. `npm run test:coverage` fails below **90 % lines,
statements and functions or 85 % branches** for `src/` (currently about 99 / 99 / 99 / 93 %).

**E2E tests** (`tests/e2e`) run against `next build && next start`, which
`playwright.config.ts` starts for you, in a desktop and a mobile (Pixel 7) project: HTTP 200 and
a single `h1`, in-page anchors, desktop nav and the mobile menu, the skip link, no console errors,
every same-origin link and asset returns 200, the Open Graph image, safe external links, the
security headers and zero CSP violations, the email and phone rules above, scroll reveals and
skill bars, content visible with JavaScript disabled, zero serious or critical axe violations
(WCAG 2.0–2.2 A/AA), and reduced-motion behaviour.

```bash
npx playwright install chromium   # once
npm run test:e2e
```

To use an already installed Chromium, set `PW_CHROMIUM_PATH=/path/to/chrome`.

**Lighthouse CI** (`lighthouserc.json`) runs Lighthouse 3 times on `next start` with the default
mobile settings and asserts the median scores: **performance ≥ 0.9, accessibility = 1,
best practices ≥ 0.95, SEO = 1**. `npm run lhci` uses a pinned `@lhci/cli` through `npx`
rather than a devDependency, because its dependency tree carries npm audit advisories that have
nothing to do with the site. Locally, point `CHROME_PATH` at a Chrome or Chromium binary.

**CI** ([`ci.yml`](.github/workflows/ci.yml)) runs on every pull request and on pushes to `main`,
on Node 22 and 24: `npm ci`, format check, lint (0 warnings), type-check, unit tests with
coverage, and build. The Node 22 job also runs the e2e suite and Lighthouse CI and uploads their
reports as artifacts. [`codeql.yml`](.github/workflows/codeql.yml) runs CodeQL
(`security-extended`) on pull requests, on `main` and weekly.

## Dependencies

- `npm audit` reports 0 vulnerabilities for the full tree. One `overrides` entry is needed:
  `eslint-config-next` (via `@next/eslint-plugin-next`) depends on `fast-glob`, which pulls in
  `braces` 3.0.3 (GHSA-vfj7-8cjw-p6xm, no patched release). The plugin only calls
  `globSync(pattern, { onlyDirectories: true })`, which `tinyglobby` provides with the same
  signature, so `package.json` maps `fast-glob` to `tinyglobby` for that package only. Remove the
  override once the plugin drops `fast-glob`.
- [Dependabot](.github/dependabot.yml) opens one grouped PR a week for npm minor and patch
  updates, separate PRs for majors, and one grouped PR for GitHub Actions.

## Editing content

Everything shown on the page, plus the page title, description, keywords and Open Graph image
text, comes from [`src/data/portfolio.ts`](src/data/portfolio.ts):

- `profile`: name, role, rotating roles, summary, location, email, GitHub and LinkedIn, avatar,
  SEO text. Years of experience is one constant (`YEARS`), and every "N+ years" string uses it.
- `navLinks`, `stats`, `skillCategories`, `tools`
- `experience`: newest first, exactly one entry with `current: true`
- `projects`: `kind: 'open-source'` projects need a GitHub link; one project can be `featured`

Run `npm test` after editing. The data tests catch missing fields, non-https links, duplicate
ids and phone numbers.

## Adding a resume

Resume buttons are hidden while `profile.resumeUrl` is `null`, which is the default. To show
them:

1. Export the resume as PDF and save it as `public/resume/Avinash_Reddy_Resume.pdf`.
2. In `src/data/portfolio.ts`, set `resumeUrl: '/resume/Avinash_Reddy_Resume.pdf'`.
3. Run `npm run test:e2e`. It requests every same-origin link, so a missing file fails the run.

The Navbar, hero, Contact section and footer then show a download link.

## Deployment

Vercel's GitHub integration deploys the site: every pull request gets a preview deployment and
every push to `main` goes to production. There is no deploy workflow in this repository.
`vercel.json` only pins the framework, `npm ci` as the install command and the `bom1` (Mumbai)
region; the Node version comes from `engines`, everything else uses Vercel's Next.js defaults.

## Performance

Lab numbers measured on 2026-10-18 against a local `next start` production build with headless
Chromium 141. Median of 3 runs; mobile is Lighthouse's default (simulated slow 4G, 4× CPU
slowdown).

| Run                          | Performance | Accessibility | Best practices | SEO | LCP   | TBT   | CLS |
| ---------------------------- | ----------- | ------------- | -------------- | --- | ----- | ----- | --- |
| Lighthouse CI 12.6.1, mobile | 95          | 100           | 96             | 100 | 2.9 s | 50 ms | 0   |
| Lighthouse 13.5.0, mobile    | 95          | 100           | 96             | 100 | 2.8 s | 90 ms | 0   |
| Lighthouse 13.5.0, desktop   | 100         | 100           | 96             | 100 | 0.7 s | 0 ms  | 0   |

The page ships 142.6 KiB of JavaScript (gzip, 7 module scripts; the `nomodule` polyfill chunk
that modern browsers skip is not counted).

The test machine could not reach `avatars.githubusercontent.com`, so the avatar request failed and
was logged as a console error. That is the only failing Best Practices audit; it does not happen
where the avatar loads, such as on the live site or in CI.
