# Avinash Reddy Kommareddy — Portfolio

[![CI](https://github.com/AvinashK123-A/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/AvinashK123-A/portfolio/actions/workflows/ci.yml)

Personal portfolio site of Avinash Reddy Kommareddy, Senior Flutter Engineer. It is a single,
statically generated page with About, Skills, Experience, Projects and Contact sections.

**Live site:** <https://portfolio-xi-three-4uo4n9c.netlify.app>

## Stack

| Area        | Package (version in `package-lock.json`)                          |
| ----------- | ----------------------------------------------------------------- |
| Framework   | Next.js 16.4.2 (App Router, Turbopack build), React 19.3.1        |
| Language    | TypeScript 5.9 (strict)                                           |
| Styling     | Tailwind CSS 3.4                                                  |
| Animation   | Framer Motion 14 (loaded lazily via `LazyMotion`)                 |
| Icons       | lucide-react 1.x plus a few inline SVGs                           |
| Fonts       | Inter and JetBrains Mono, self-hosted from `@fontsource-variable` |
| Unit tests  | Vitest 4, Testing Library, jsdom                                  |
| E2E tests   | Playwright 1.64 with `@axe-core/playwright`                       |
| Lint/format | ESLint 9 (`eslint-config-next` flat config), Prettier 3           |

## Features

- One page, prerendered at build time (`○ Static` for every route).
- Content lives in one typed file, [`src/data/portfolio.ts`](src/data/portfolio.ts).
- Generated SEO assets: `/opengraph-image` (1200×630 PNG), `/robots.txt`, `/sitemap.xml`,
  an SVG favicon, canonical URL, Open Graph/Twitter tags and Person JSON-LD.
- Accessibility: skip link, landmarks, a single `h1`, visible focus styles, an ARIA-labelled
  mobile menu, and every external link marked with `rel="noopener noreferrer"`. Users with
  `prefers-reduced-motion` get no looping animations or mouse glow. The e2e suite checks for
  axe violations.
- No network access needed at build time (fonts are bundled, the OG image uses the default
  font that ships with `next/og`).

## Project structure

```
src/
  app/
    layout.tsx            Root layout: metadata, fonts, skip link, JSON-LD, motion provider
    page.tsx              The page: header, <main> with all sections, footer
    fonts.ts              next/font/local setup (--font-inter, --font-mono)
    globals.css           Tailwind layers, focus styles, reduced-motion rules
    opengraph-image.tsx   Build-time Open Graph image
    robots.ts, sitemap.ts Generated robots.txt and sitemap.xml
    icon.svg              Favicon
  components/             Navbar, Footer, ExternalLink, icons, MouseGlowEffect, MotionProvider
  sections/               AboutSection (hero), Skills, Experience, Projects, Contact
  data/portfolio.ts       All site content (single source of truth)
  hooks/useMediaQuery.ts  Media-query hook (pointer type, reduced motion)
tests/
  unit/                   Vitest: content checks and component render tests
  e2e/                    Playwright: page, links, mobile menu, console, axe
.github/workflows/
  ci.yml                  Format, lint, type-check, unit tests, build, e2e
  deploy.yml              Vercel deployment (see "Deployment")
```

## Getting started

Requirements: Node.js 20.19 or newer (`.nvmrc` pins 20 to match Netlify; Node 22 also works and
is tested in CI) and npm.

```bash
git clone https://github.com/AvinashK123-A/portfolio.git
cd portfolio
nvm use          # optional, reads .nvmrc
npm ci
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Scripts

| Script                 | What it does                                                      |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run dev`          | Start the dev server                                              |
| `npm run build`        | Production build (static prerender)                               |
| `npm run start`        | Serve the production build                                        |
| `npm run lint`         | ESLint, failing on any warning                                    |
| `npm run type-check`   | `tsc --noEmit`                                                    |
| `npm run format`       | Format everything with Prettier                                   |
| `npm run format:check` | Check formatting (used in CI)                                     |
| `npm test`             | Unit and render tests (Vitest)                                    |
| `npm run test:watch`   | Vitest in watch mode                                              |
| `npm run test:e2e`     | Playwright e2e and accessibility tests against a production build |

## Testing

**Unit tests** (`tests/unit`) check the content module and render the main components:

- content: required fields are filled in, external URLs are absolute `https`, nav links are
  in-page anchors, ids are unique, there is exactly one current role, skill levels are 0–100,
  and there are no unverifiable compliance claims in project descriptions
- components: the Navbar menu toggles `aria-expanded` and closes on Escape, scaffold_studio is
  the featured project, external links are safe, there is a single `h1`, and resume buttons
  only appear when a resume is configured

**E2E tests** (`tests/e2e`) run against `next build && next start`, which
`playwright.config.ts` starts for you, in a desktop and a mobile (Pixel 7) project. They check:
HTTP 200, a single `h1`, that every in-page anchor has a target, desktop nav scrolling, the mobile
menu, the skip link, no console errors, that every same-origin link and asset returns 200, the
Open Graph image, external link attributes, zero serious or critical axe violations
(WCAG 2.0–2.2 A/AA), and reduced-motion behaviour.

```bash
npx playwright install chromium   # once
npm run test:e2e
```

To use a Chromium that is already installed instead of the downloaded one, set
`PW_CHROMIUM_PATH=/path/to/chrome`.

## Editing content

Everything shown on the page, plus the page title, description, keywords, Open Graph image text,
robots.txt and sitemap URL, comes from [`src/data/portfolio.ts`](src/data/portfolio.ts):

- `profile`: name, role, summary, contact links, canonical `siteUrl`, avatar, SEO text.
  Years of experience is one constant (`YEARS`), and every "N+ years" string uses it.
- `navLinks`, `stats`, `skillCategories`, `tools`
- `experience`: newest first, exactly one entry with `current: true`
- `projects`: `kind: 'open-source'` projects need a GitHub link; one project can be `featured`

Run `npm test` after editing. The data tests catch missing fields, non-https links and
duplicate ids.

## Adding a resume

Resume buttons are hidden while `profile.resumeUrl` is `null`, which is the default. To show
them:

1. Export the resume as PDF and save it as `public/resume/Avinash_Reddy_Resume.pdf`.
2. In `src/data/portfolio.ts`, set `resumeUrl: '/resume/Avinash_Reddy_Resume.pdf'`.
3. Run `npm run test:e2e`. It requests every same-origin link, so a missing file fails the run.

The Navbar, hero, Contact section and footer then show a download link.

## Deployment

- **Netlify (current live host).** `netlify.toml` builds with `npm run build` on
  `NODE_VERSION = "20"` with `NPM_FLAGS = "--legacy-peer-deps"` and the `@netlify/plugin-nextjs`
  runtime. This setup was checked locally on Node 20.20 with `npm install --legacy-peer-deps`
  followed by a build.
- **Vercel.** `vercel.json` and `.github/workflows/deploy.yml` (deploys with `vercel --prod` on
  pushes to `main` when the `VERCEL_*` secrets are set) are still in the repository.

Running two hosts means two production URLs and duplicate builds. Pick one: either remove
`vercel.json` and `deploy.yml`, or move the site to Vercel and update `profile.siteUrl`.

Node.js 20 reached end-of-life in April 2026. Consider raising `NODE_VERSION` in
`netlify.toml` and `.nvmrc` to 22 (CI already tests 22).

## Performance

Measured on 2026-10-18 with Lighthouse 13.5.0 and headless Chromium 141 against a local
`next start` production build. Values are the median of 3 runs with the default mobile
(simulated slow 4G, 4× CPU slowdown) and desktop presets.

| Preset  | Performance | Accessibility | Best practices | SEO | LCP   | TBT    | CLS |
| ------- | ----------- | ------------- | -------------- | --- | ----- | ------ | --- |
| Mobile  | 93          | 100           | 96             | 100 | 2.8 s | 128 ms | 0   |
| Desktop | 100         | 100           | 96             | 100 | 0.7 s | 2 ms   | 0   |

The test machine had no outbound internet access, so the GitHub avatar failed to load and was
logged as a console error. That is the only failing Best Practices audit, and it should not happen
on the live site. These are lab numbers from one machine, not field data.
