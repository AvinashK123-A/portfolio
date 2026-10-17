import type { MetadataRoute } from 'next';
import { profile } from '@/data/portfolio';

export const dynamic = 'force-static';

// Single-page site: in-page #anchors are not separate URLs, so only the root is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${profile.siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
