import { Feed } from 'feed'
import { getAllArticles } from '@/lib/articles'

export const revalidate = 300

export async function GET() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://win-dumpster.vercel.app').replace(/\/$/, '')

  const author = { name: 'Winaldo Manurung' }
  const feed = new Feed({
    title: 'Win Dumpster',
    description: 'Writing on engineering, technology, and life.',
    id: siteUrl,
    link: siteUrl,
    author,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Winaldo Manurung`,
    feedLinks: { rss2: `${siteUrl}/feed.xml` },
  })

  const articles = await getAllArticles()
  for (const article of articles) {
    const url = `${siteUrl}/articles/${encodeURIComponent(article.slug)}`
    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      author: [author],
      date: article.date ? new Date(article.date) : new Date(),
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  })
}
