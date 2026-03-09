import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    host: 'https://amalgam-inc.com',
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://amalgam-inc.com/sitemap.xml',
  }
}
