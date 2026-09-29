import { notFound } from 'next/navigation'
import { type Metadata } from 'next'

import { ArticleLayout } from '@/components/ArticleLayout'
import { NotionContent } from '@/components/NotionContent'
import { getArticleBySlug, getArticleBlocks, getAllArticles } from '@/lib/articles'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 300

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params

  const article = await getArticleBySlug(slug)

  if (!article) {
    return {}
  }

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${encodeURIComponent(article.slug)}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `/articles/${encodeURIComponent(article.slug)}`,
      ...(article.date ? { publishedTime: article.date } : {}),
      ...(article.cover ? { images: [{ url: article.cover }] } : {}),
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params

  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const [blocks, articles] = await Promise.all([getArticleBlocks(article.pageId), getAllArticles()])
  const related = articles.filter((item) => item.slug !== article.slug && item.category && item.category === article.category).slice(0, 3)
  const headings = blocks.filter((block) => 'type' in block && ['heading_1', 'heading_2', 'heading_3'].includes(block.type)).map((block) => ({
    id: block.id,
    text: ('type' in block ? (block as any)[block.type]?.rich_text : [])?.map((item: any) => item.plain_text).join('') || '',
  })).filter((heading) => heading.text)
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://win-dumpster.vercel.app').replace(/\/$/, '')
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: article.title, description: article.description,
    mainEntityOfPage: `${origin}/articles/${encodeURIComponent(article.slug)}`,
    author: { '@type': 'Person', name: article.author || 'Winaldo Manurung' },
    ...(article.date ? { datePublished: article.date } : {}),
    ...(article.cover ? { image: article.cover } : {}),
  }

  return (
    <ArticleLayout article={article} headings={headings} related={related}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <NotionContent blocks={blocks} />
    </ArticleLayout>
  )
}
