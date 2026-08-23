import { notFound } from 'next/navigation'
import { type Metadata } from 'next'

import { ArticleLayout } from '@/components/ArticleLayout'
import { NotionContent } from '@/components/NotionContent'
import { getArticleBySlug, getArticleBlocks } from '@/lib/articles'

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
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params

  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const blocks = await getArticleBlocks(article.pageId)

  return (
    <ArticleLayout article={article}>
      <NotionContent blocks={blocks} />
    </ArticleLayout>
  )
}
