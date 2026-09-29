import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://win-dumpster.vercel.app').replace(/\/$/, '')
  const staticPaths = ['', '/about', '/articles', '/projects', '/uses']
  const articles = await getAllArticles()
  return [
    ...staticPaths.map((path) => ({ url: `${origin}${path}` })),
    ...articles.map((article) => ({
      url: `${origin}/articles/${encodeURIComponent(article.slug)}`,
      ...(article.date ? { lastModified: new Date(article.date) } : {}),
    })),
  ]
}
