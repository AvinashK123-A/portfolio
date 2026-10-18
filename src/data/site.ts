/** Production URL on Vercel. Used whenever NEXT_PUBLIC_SITE_URL is not set. */
export const DEFAULT_SITE_URL = 'https://portfolio-avinash-reddy-s-projects1.vercel.app';

/**
 * Normalises a site URL to its origin (`https://example.com`, no trailing slash).
 * Empty values fall back to DEFAULT_SITE_URL; anything that is not an http(s)
 * URL throws, so a typo in the environment variable fails the build instead of
 * shipping broken canonical and Open Graph URLs.
 */
export function resolveSiteUrl(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) return DEFAULT_SITE_URL;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL is not a valid URL: "${raw}"`);
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`NEXT_PUBLIC_SITE_URL must use http(s): "${raw}"`);
  }
  return url.origin;
}

/**
 * Canonical site URL (no trailing slash). The single source for metadataBase,
 * canonical and Open Graph URLs, robots.txt, sitemap.xml and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL at build time to use a custom domain.
 */
export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
