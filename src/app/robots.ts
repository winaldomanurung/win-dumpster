import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://win-dumpster.vercel.app').replace(/\/$/, '')
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${origin}/sitemap.xml`,
  }
}
