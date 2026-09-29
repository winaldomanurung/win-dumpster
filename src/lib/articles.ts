import { notion, NOTION_DATA_SOURCE_ID } from './notion'
import { cache } from 'react'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface Article {
  title: string
  description: string
  author: string
  date: string
  slug: string
  category: string
  tags: string[]
  cover: string
  featured: boolean
}

export interface ArticleWithSlug extends Article {
  slug: string
  pageId: string
}

type NotionProperty = {
  type: string
  title?: Array<{
    plain_text: string
  }>
  rich_text?: Array<{
    plain_text: string
  }>
  select?: {
    name: string
  } | null
  multi_select?: Array<{ name: string }>
  checkbox?: boolean
  files?: Array<{ type: string; external?: { url: string }; file?: { url: string } }>
  date?: {
    start: string
  } | null
}

function getProperty(properties: Record<string, NotionProperty>, name: string) {
  return properties[name]
}

function getTextProperty(
  properties: Record<string, NotionProperty>,
  name: string,
): string {
  const property = getProperty(properties, name)

  if (!property) {
    return ''
  }

  if (property.type === 'title') {
    return property.title?.map((item) => item.plain_text).join('') ?? ''
  }

  if (property.type === 'rich_text') {
    return property.rich_text?.map((item) => item.plain_text).join('') ?? ''
  }

  if (property.type === 'select') {
    return property.select?.name ?? ''
  }

  return ''
}

function getDateProperty(
  properties: Record<string, NotionProperty>,
  name: string,
): string {
  const property = getProperty(properties, name)

  if (!property || property.type !== 'date') {
    return ''
  }

  return property.date?.start ?? ''
}

function mapNotionPage(page: any): ArticleWithSlug {
  const properties = page.properties as Record<string, NotionProperty>

  return {
    title: getTextProperty(properties, 'Name'),
    description: getTextProperty(properties, 'Description'),
    author: getTextProperty(properties, 'Author'),
    date: getDateProperty(properties, 'Date'),
    slug: getTextProperty(properties, 'Slug'),
    pageId: page.id,
    category: getTextProperty(properties, 'Category'),
    tags: properties.Tags?.multi_select?.map((item) => item.name) ?? [],
    cover: properties.Cover?.files?.find((file) => file.type === 'external')?.external?.url ?? '',
    featured: properties.Featured?.checkbox ?? false,
  }
}

/**
 * Get all published articles.
 */
export const getAllArticles = cache(async (): Promise<ArticleWithSlug[]> => {
  const results: ArticleWithSlug[] = []
  let cursor: string | undefined

  do {
    const response = await notion.dataSources.query({
      data_source_id: NOTION_DATA_SOURCE_ID!,
      filter: {
        property: 'Status',
        select: { equals: 'Published' },
      },
      sorts: [{ property: 'Date', direction: 'descending' }],
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    })

    results.push(
      ...response.results
        .filter((page): page is any => 'properties' in page)
        .map(mapNotionPage),
    )
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return results.filter((article) => article.slug && article.title)
})

/**
 * Get a single published article by slug.
 */
export const getArticleBySlug = cache(async (
  slug: string,
): Promise<ArticleWithSlug | undefined> => {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_DATA_SOURCE_ID!,
    filter: {
      and: [
        {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
      ],
    },
    page_size: 1,
  })

  const page = response.results[0]

  if (!page || !('properties' in page)) {
    return undefined
  }

  return mapNotionPage(page)
})

/**
 * Get all children of a Notion block recursively.
 *
 * This means NotionContent.tsx no longer needs to call
 * the Notion API itself.
 */
async function getBlockChildren(
  blockId: string,
): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = []

  let cursor: string | undefined = undefined

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    })

    for (const block of response.results) {
      if (!('type' in block)) {
        continue
      }

      const typedBlock = block as BlockObjectResponse

      if (typedBlock.has_children) {
        const children = await getBlockChildren(typedBlock.id)

        ;(typedBlock as any)._children = children
      }

      blocks.push(typedBlock)
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return blocks
}

/**
 * Get all blocks inside a Notion page,
 * including nested children.
 */
export async function getArticleBlocks(
  pageId: string,
): Promise<BlockObjectResponse[]> {
  return getBlockChildren(pageId)
}

/**
 * Get article + all native Notion blocks.
 */
export async function getArticleBySlugWithBlocks(
  slug: string,
): Promise<ArticleWithSlug & { blocks: BlockObjectResponse[] }> {
  const article = await getArticleBySlug(slug)

  if (!article) {
    throw new Error(`Article not found: ${slug}`)
  }

  const blocks = await getArticleBlocks(article.pageId)

  return {
    ...article,
    blocks,
  }
}
