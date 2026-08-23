import { notFound } from 'next/navigation'
import { type Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'

import { ArticleLayout } from '@/components/ArticleLayout'
import { getArticleBySlugWithContent } from '@/lib/articles'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const article = await getArticleBySlugWithContent(slug)

    return {
      title: article.title,
      description: article.description,
    }
  } catch {
    return {}
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params

  let article

  try {
    article = await getArticleBySlugWithContent(slug)
  } catch {
    notFound()
  }

  return (
    <ArticleLayout article={article}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypePrism]}>
        {article.content}
      </ReactMarkdown>
    </ArticleLayout>
  )
}
