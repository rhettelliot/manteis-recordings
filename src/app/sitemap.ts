import type { MetadataRoute } from 'next'
import { artistEPKs } from '@/lib/epk'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: 'https://manteisrecordings.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://manteisrecordings.com/epk',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  for (const artist of artistEPKs) {
    routes.push({
      url: `https://manteisrecordings.com/epk/${artist.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return routes
}