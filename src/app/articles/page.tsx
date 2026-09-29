import type { Metadata } from 'next'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

export const revalidate = 300
export const metadata: Metadata = {
  title: 'Articles',
  description: 'Writing on engineering, technology, work and life.',
  alternates: { canonical: '/articles' },
}

type SearchParams = Promise<{ q?: string; category?: string; page?: string }>
export default async function ArticlesIndex({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const articles = await getAllArticles()
  const query = (params.q || '').trim().toLowerCase().slice(0, 120)
  const category = (params.category || '').trim()
  const categories = [...new Set(articles.map((item) => item.category).filter(Boolean))].sort()
  const filtered = articles.filter((item) =>
    (!category || item.category === category) &&
    (!query || [item.title, item.description, item.category, ...item.tags].join(' ').toLowerCase().includes(query)),
  )
  const rawPage = Number.parseInt(params.page || '1', 10)
  const page = Number.isFinite(rawPage) ? Math.max(1, Math.min(10000, rawPage)) : 1
  const totalPages = Math.max(1, Math.ceil(filtered.length / 10))
  const current = Math.min(page, totalPages)
  const results = filtered.slice((current - 1) * 10, current * 10)
  const link = (next: number) => '/articles?' + new URLSearchParams({
    ...(params.q ? { q: params.q } : {}),
    ...(category ? { category } : {}),
    page: String(next),
  }).toString()

  return (
    <SimpleLayout title="Writing on engineering, technology, and life." intro="Explore articles, experiences, and things worth remembering.">
      <form action="/articles" className="mb-10 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input name="q" type="search" defaultValue={params.q || ''} placeholder="Search articles…" aria-label="Search articles"
          className="min-w-0 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white" />
        <select name="category" defaultValue={category} aria-label="Filter category"
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
          <option value="">All categories</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <button type="submit" className="rounded-lg bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700">Search</button>
      </form>
      <p className="mb-8 text-sm text-zinc-500" aria-live="polite">{filtered.length} article{filtered.length === 1 ? '' : 's'} found</p>
      <div className="flex max-w-3xl flex-col gap-12">
        {results.map((article) => (
          <Card as="article" key={article.pageId}>
            <Card.Title href={`/articles/${encodeURIComponent(article.slug)}`}>{article.title}</Card.Title>
            {article.date && <Card.Eyebrow as="time" dateTime={article.date} decorate>{formatDate(article.date)}</Card.Eyebrow>}
            {article.category && <span className="mt-2 text-xs font-semibold text-teal-600 dark:text-teal-400">{article.category}</span>}
            <Card.Description>{article.description}</Card.Description>
            <Card.Cta>Read article</Card.Cta>
          </Card>
        ))}
        {!results.length && <p className="text-zinc-600 dark:text-zinc-400">No articles match your search. Try another keyword or category.</p>}
      </div>
      {totalPages > 1 && <nav aria-label="Article pagination" className="mt-12 flex items-center justify-between text-sm">
        {current > 1 ? <a href={link(current - 1)} className="text-teal-600 hover:underline">← Previous</a> : <span />}
        <span>Page {current} of {totalPages}</span>
        {current < totalPages ? <a href={link(current + 1)} className="text-teal-600 hover:underline">Next →</a> : <span />}
      </nav>}
    </SimpleLayout>
  )
}
