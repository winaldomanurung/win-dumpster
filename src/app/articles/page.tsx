import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpenText, Search } from 'lucide-react'
import { Container } from '@/components/Container'
import { InteriorPageHeader } from '@/components/InteriorPageHeader'
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
  const rawQuery = typeof params.q === 'string' ? params.q.slice(0, 120) : ''
  const query = rawQuery.trim().toLowerCase()
  const category = typeof params.category === 'string' ? params.category.trim() : ''
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
  const pageLink = (next: number) => '/articles?' + new URLSearchParams({
    ...(rawQuery ? { q: rawQuery } : {}),
    ...(category ? { category } : {}),
    page: String(next),
  }).toString()

  return (
    <>
      <InteriorPageHeader
        eyebrow="From the archive"
        title="Writing & ideas"
        description="Engineering, technology, and everyday observations. A place for the things worth remembering."
        icon={<BookOpenText size={16} strokeWidth={1.8} aria-hidden="true" />}
      />
      <Container className="mt-10 sm:mt-14">
        <section aria-label="Find articles" className="interior-panel rounded-2xl p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Find something to read</p>
            <span className="interior-count rounded-full px-3 py-1 font-mono text-xs">{articles.length} in the archive</span>
          </div>
          <form action="/articles" className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} aria-hidden="true" />
              <input
                name="q"
                type="search"
                defaultValue={rawQuery}
                placeholder="Search articles…"
                aria-label="Search articles"
                className="interior-input w-full min-w-0 rounded-xl py-3 pl-11 pr-4 text-sm outline-offset-2 focus-visible:outline-2 focus-visible:outline-teal-500"
              />
            </div>
            <select
              name="category"
              defaultValue={category}
              aria-label="Filter category"
              className="interior-input min-w-0 rounded-xl px-4 py-3 text-sm outline-offset-2 focus-visible:outline-2 focus-visible:outline-teal-500"
            >
              <option value="">All categories</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <button type="submit" className="home-primary-link rounded-xl px-5 py-3 text-sm font-semibold outline-offset-2 focus-visible:outline-2 focus-visible:outline-teal-500">Search</button>
          </form>
        </section>

        <section aria-labelledby="article-results-heading" className="mt-11 sm:mt-14">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-zinc-200 pb-5 dark:border-zinc-700/70">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[.17em] text-teal-600 dark:text-teal-400">Your reading list</p>
              <h2 id="article-results-heading" className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">All articles<span className="text-teal-500">.</span></h2>
            </div>
            <p aria-live="polite" className="text-sm text-zinc-500 dark:text-zinc-400">
              {filtered.length} article{filtered.length === 1 ? '' : 's'} found
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((article, index) => (
              <article key={article.pageId} className="interior-card group relative flex min-h-[230px] flex-col rounded-2xl p-6">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs">
                    {article.category && <span className="interior-chip rounded-full px-2.5 py-1 font-semibold">{article.category}</span>}
                    {article.date && <time dateTime={article.date} className="text-zinc-500 dark:text-zinc-400">{formatDate(article.date)}</time>}
                  </div>
                  <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">{String((current - 1) * 10 + index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
                  <Link href={`/articles/${encodeURIComponent(article.slug)}`} className="interior-card-link outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-500">
                    <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{article.description}</p>
                <span aria-hidden="true" className="interior-cta mt-auto flex items-center gap-2 pt-6 text-xs font-semibold">Read article <ArrowUpRight size={16} /></span>
              </article>
            ))}
          </div>
          {results.length === 0 && (
            <div className="interior-panel rounded-2xl px-6 py-12 text-center">
              <Search size={27} className="mx-auto mb-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">No matching articles</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Try another keyword or choose a different category.</p>
              <Link href="/articles" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400">Clear filters <ArrowRight size={15} /></Link>
            </div>
          )}
          {totalPages > 1 && (
            <nav aria-label="Article pagination" className="mt-9 flex items-center justify-between gap-3 text-sm">
              {current > 1 ? <Link href={pageLink(current - 1)} className="interior-page-button inline-flex items-center gap-2 rounded-full px-4 py-2.5"><ArrowLeft size={16} /> Previous</Link> : <span />}
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Page {current} of {totalPages}</span>
              {current < totalPages ? <Link href={pageLink(current + 1)} className="interior-page-button inline-flex items-center gap-2 rounded-full px-4 py-2.5">Next <ArrowRight size={16} /></Link> : <span />}
            </nav>
          )}
        </section>
      </Container>
    </>
  )
}
