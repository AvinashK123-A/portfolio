import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_SITE_URL, resolveSiteUrl } from '@/data/site';

describe('resolveSiteUrl', () => {
  it('falls back to the Vercel production URL when unset or blank', () => {
    expect(DEFAULT_SITE_URL).toBe('https://portfolio-avinash-reddy-s-projects1.vercel.app');
    expect(resolveSiteUrl(undefined)).toBe(DEFAULT_SITE_URL);
    expect(resolveSiteUrl('')).toBe(DEFAULT_SITE_URL);
    expect(resolveSiteUrl('   ')).toBe(DEFAULT_SITE_URL);
  });

  it('normalises a custom domain to its origin without a trailing slash', () => {
    expect(resolveSiteUrl('https://example.com')).toBe('https://example.com');
    expect(resolveSiteUrl(' https://example.com/ ')).toBe('https://example.com');
    expect(resolveSiteUrl('https://www.example.com/some/path?x=1')).toBe('https://www.example.com');
    expect(resolveSiteUrl('http://localhost:3000')).toBe('http://localhost:3000');
  });

  it('rejects values that are not http(s) URLs', () => {
    expect(() => resolveSiteUrl('example.com')).toThrow(/not a valid URL/);
    expect(() => resolveSiteUrl('ftp://example.com')).toThrow(/must use http/);
  });
});

describe('siteUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('defaults to the production URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    const { siteUrl } = await import('@/data/site');
    expect(siteUrl).toBe(DEFAULT_SITE_URL);
  });

  it('reads NEXT_PUBLIC_SITE_URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://avinash.example/');
    const { siteUrl } = await import('@/data/site');
    expect(siteUrl).toBe('https://avinash.example');
  });
});

const ROOT = path.resolve(__dirname, '../..');
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'coverage',
  'playwright-report',
  'test-results',
  '.lighthouseci',
]);
const SELF = path.relative(ROOT, __filename);

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    if (SKIP_DIRS.has(name)) return [];
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? listFiles(full) : [full];
  });
}

describe('repository', () => {
  it('no longer references the retired Netlify site', () => {
    const offenders = listFiles(ROOT)
      .filter((file) => /\.(tsx?|jsx?|mjs|cjs|json|md|ya?ml|toml|css)$/.test(file))
      .filter((file) => path.relative(ROOT, file) !== SELF)
      .filter((file) => !file.endsWith('package-lock.json'))
      .filter((file) => /netlify\.app/i.test(readFileSync(file, 'utf8')))
      .map((file) => path.relative(ROOT, file));
    expect(offenders).toEqual([]);
  });
});
