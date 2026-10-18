import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import MouseGlowEffect from '@/components/MouseGlowEffect';
import ScrollReveal from '@/components/ScrollReveal';
import { profile } from '@/data/portfolio';
import { siteUrl } from '@/data/site';
import { inter, jetBrainsMono } from './fonts';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: profile.seo.title,
    template: `%s | ${profile.fullName}`,
  },
  description: profile.seo.description,
  keywords: [...profile.seo.keywords],
  authors: [{ name: profile.fullName, url: siteUrl }],
  creator: profile.fullName,
  robots: { index: true, follow: true },
  // og:image / twitter:image come from app/opengraph-image.tsx automatically.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: profile.fullName,
    title: profile.seo.title,
    description: profile.seo.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.seo.title,
    description: profile.seo.description,
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.fullName,
  jobTitle: profile.role,
  url: siteUrl,
  image: profile.avatarUrl,
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressLocality: profile.location },
  sameAs: [profile.github, profile.linkedin],
};

const NO_SCRIPT_CSS =
  "[data-reveal]{opacity:1!important;animation:none!important}[data-reveal='bar']{width:var(--level)!important}";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable} scroll-smooth`}>
      <body className="font-sans bg-[#0a0a0a] text-white antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          // Static, trusted data from src/data/portfolio.ts; `<` is escaped defensively.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        {/* Without JavaScript, show the content that scroll animations would reveal. */}
        <noscript>
          <style>{NO_SCRIPT_CSS}</style>
        </noscript>
        <MouseGlowEffect />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
