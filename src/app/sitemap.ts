import type { MetadataRoute } from 'next';
import { siteUrl } from '@/data/site';

export const dynamic = 'force-static';

// Single-page site: in-page #anchors are not separate URLs, so only the root is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
