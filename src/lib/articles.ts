import { notion, NOTION_DATA_SOURCE_ID } from './notion'

export interface Article {
  title: string
  description: string
  author: string
  date: string
  slug: string
  content?: string
}

export interface ArticleWithSlug extends Article {
  slug: string
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
  }
}

export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_DATA_SOURCE_ID!,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })

  return response.results
    .filter((page): page is any => 'properties' in page)
    .map(mapNotionPage)
}

export async function getArticleBySlug(
  slug: string,
): Promise<ArticleWithSlug | undefined> {
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
}

export async function getArticleContent(pageId: string): Promise<string> {
  const response = await notion.pages.retrieveMarkdown({
    page_id: pageId,
  })

  return response.markdown
}

export async function getArticleBySlugWithContent(
  slug: string,
): Promise<ArticleWithSlug & { content: string }> {
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
    throw new Error(`Article not found: ${slug}`)
  }

  const article = mapNotionPage(page)
  const content = await getArticleContent(page.id)

  return {
    ...article,
    content,
  }
}
