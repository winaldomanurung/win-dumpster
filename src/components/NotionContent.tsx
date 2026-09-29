import React from 'react'

interface NotionContentProps {
  blocks: any[]
}

type RichTextItem = {
  type: string
  plain_text?: string
  href?: string | null
  annotations?: {
    bold?: boolean
    italic?: boolean
    strikethrough?: boolean
    underline?: boolean
    code?: boolean
  }
  text?: {
    content?: string
    link?: {
      url: string
    } | null
  }
}

function RichText({ items }: { items?: RichTextItem[] }) {
  if (!items?.length) {
    return null
  }

  return (
    <>
      {items.map((item, index) => {
        const text = item.plain_text ?? item.text?.content ?? ''

        if (!text) {
          return null
        }

        let content: React.ReactNode = text

        if (item.annotations?.code) {
          content = (
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em] dark:bg-zinc-800">
              {content}
            </code>
          )
        }

        if (item.annotations?.bold) {
          content = <strong>{content}</strong>
        }

        if (item.annotations?.italic) {
          content = <em>{content}</em>
        }

        if (item.annotations?.underline) {
          content = <u>{content}</u>
        }

        if (item.annotations?.strikethrough) {
          content = <s>{content}</s>
        }

        const href = item.href ?? item.text?.link?.url ?? null

        if (href) {
          content = (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
            >
              {content}
            </a>
          )
        }

        return <React.Fragment key={index}>{content}</React.Fragment>
      })}
    </>
  )
}

function Caption({ items }: { items?: RichTextItem[] }) {
  if (!items?.length) {
    return null
  }

  return (
    <figcaption className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
      <RichText items={items} />
    </figcaption>
  )
}

/**
 * Return an external URL directly.
 *
 * Notion-hosted files are intentionally NOT returned here
 * because Notion's file.url is temporary.
 */
function getExternalMediaUrl(media: any): string | null {
  if (!media) {
    return null
  }

  if (media.type === 'external') {
    return media.external?.url ?? null
  }

  return null
}

/**
 * Generate a permanent application URL for Notion-hosted media.
 *
 * The actual Notion signed URL is retrieved server-side
 * by /api/notion-media.
 */
function getNotionMediaUrl(blockId: string): string {
  return `/api/notion-media?blockId=${encodeURIComponent(blockId)}`
}

function getVideoEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)

    // YouTube watch URL
    if (
      parsed.hostname === 'www.youtube.com' ||
      parsed.hostname === 'youtube.com'
    ) {
      const videoId = parsed.searchParams.get('v')

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }

      if (parsed.pathname.startsWith('/embed/')) {
        return url
      }
    }

    // youtu.be
    if (parsed.hostname === 'youtu.be') {
      const videoId = parsed.pathname.slice(1)

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }

    return null
  } catch {
    return null
  }
}

function Block({ block }: { block: any }) {
  const type = block.type
  const data = block[type]

  if (!data) {
    return null
  }

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <RichText items={data.rich_text} />
        </p>
      )

    case 'heading_1':
      return (
        <h1 id={block.id} className="scroll-mt-24">
          <RichText items={data.rich_text} />
        </h1>
      )

    case 'heading_2':
      return (
        <h2 id={block.id} className="scroll-mt-24">
          <RichText items={data.rich_text} />
        </h2>
      )

    case 'heading_3':
      return (
        <h3 id={block.id} className="scroll-mt-24">
          <RichText items={data.rich_text} />
        </h3>
      )

    case 'heading_4':
      return (
        <h4 id={block.id} className="scroll-mt-24">
          <RichText items={data.rich_text} />
        </h4>
      )

    case 'bulleted_list_item':
      return (
        <li>
          <RichText items={data.rich_text} />
        </li>
      )

    case 'numbered_list_item':
      return (
        <li>
          <RichText items={data.rich_text} />
        </li>
      )

    case 'to_do':
      return (
        <div className="my-2 flex gap-3">
          <input
            type="checkbox"
            checked={data.checked}
            readOnly
            className="mt-1"
          />

          <span
            className={data.checked ? 'text-zinc-500 line-through' : undefined}
          >
            <RichText items={data.rich_text} />
          </span>
        </div>
      )

    case 'quote':
      return (
        <blockquote>
          <RichText items={data.rich_text} />
        </blockquote>
      )

    case 'callout':
      return (
        <aside className="my-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="flex gap-3">
            {data.icon?.type === 'emoji' && (
              <span className="shrink-0 text-xl">{data.icon.emoji}</span>
            )}

            <div className="min-w-0 flex-1">
              <RichText items={data.rich_text} />

              {block._children?.length > 0 && (
                <div className="mt-2">
                  <Blocks blocks={block._children} />
                </div>
              )}
            </div>
          </div>
        </aside>
      )

    case 'divider':
      return <hr />

    case 'code':
      return (
        <div className="my-8 overflow-hidden rounded-xl">
          <pre>
            <code className={`language-${data.language ?? 'text'}`}>
              {data.rich_text
                ?.map((item: RichTextItem) => item.plain_text ?? '')
                .join('')}
            </code>
          </pre>
        </div>
      )

    case 'image': {
      /*
       * External image:
       * use its original URL.
       *
       * Notion-hosted image:
       * use our media proxy.
       */
      const externalUrl = getExternalMediaUrl(data)

      const url = externalUrl ?? getNotionMediaUrl(block.id)

      return (
        <figure className="notion-article-image my-10">
          <img
            src={url}
            alt={
              data.caption
                ?.map((item: RichTextItem) => item.plain_text ?? '')
                .join('') ?? ''
            }
            className="notion-article-image-content rounded-2xl"
            loading="lazy"
            decoding="async"
          />

          <Caption items={data.caption} />
        </figure>
      )
    }

    case 'video': {
      const externalUrl = getExternalMediaUrl(data)

      /*
       * External video, e.g. YouTube.
       */
      if (externalUrl) {
        const embedUrl = getVideoEmbedUrl(externalUrl)

        if (embedUrl) {
          return (
            <figure className="my-10">
              <div className="aspect-video overflow-hidden rounded-2xl">
                <iframe
                  src={embedUrl}
                  title="Embedded video"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <Caption items={data.caption} />
            </figure>
          )
        }

        return (
          <figure className="my-10">
            <video
              src={externalUrl}
              controls
              className="h-auto w-full rounded-2xl"
            />

            <Caption items={data.caption} />
          </figure>
        )
      }

      /*
       * Notion-hosted video.
       */
      const url = getNotionMediaUrl(block.id)

      return (
        <figure className="my-10">
          <video src={url} controls className="h-auto w-full rounded-2xl" />

          <Caption items={data.caption} />
        </figure>
      )
    }

    case 'file':
    case 'pdf': {
      const externalUrl = getExternalMediaUrl(data)

      const url = externalUrl ?? getNotionMediaUrl(block.id)

      const name = data.name ?? 'Download file'

      return (
        <div className="my-8 rounded-2xl border border-zinc-200 p-5 dark:border-zinc-700">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                {name}
              </p>

              <Caption items={data.caption} />
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
            >
              Open
            </a>
          </div>
        </div>
      )
    }

    case 'bookmark': {
      const url = data.url

      if (!url) {
        return null
      }

      return (
        <div className="my-8">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-zinc-200 p-5 transition hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
          >
            <p className="text-sm break-all text-zinc-600 dark:text-zinc-400">
              {url}
            </p>

            <div className="mt-3 font-medium">Open link →</div>
          </a>

          <Caption items={data.caption} />
        </div>
      )
    }

    case 'link_preview': {
      const url = data.url

      if (!url) {
        return null
      }

      return (
        <div className="my-8">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-zinc-200 p-6 transition hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
          >
            <div className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
              Link Preview
            </div>

            <div className="mt-2 text-lg font-semibold break-all">{url}</div>

            <div className="mt-4 text-sm text-zinc-500">Open preview →</div>
          </a>
        </div>
      )
    }

    case 'embed':
      if (!data.url) {
        return null
      }

      return (
        <div className="my-10 aspect-video overflow-hidden rounded-2xl">
          <iframe
            src={data.url}
            title="Embedded content"
            className="h-full w-full"
            loading="lazy"
            allowFullScreen
          />
        </div>
      )

    case 'table':
      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {block._children?.map((child: any) => (
                <Block key={child.id} block={child} />
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'table_row':
      return (
        <tr>
          {data.cells?.map((cell: RichTextItem[], index: number) => (
            <td
              key={index}
              className="border border-zinc-200 px-4 py-3 align-top dark:border-zinc-700"
            >
              <RichText items={cell} />
            </td>
          ))}
        </tr>
      )

    case 'toggle':
      return (
        <details className="my-6">
          <summary className="cursor-pointer font-medium">
            <RichText items={data.rich_text} />
          </summary>

          {block._children?.length > 0 && (
            <div className="mt-4">
              <Blocks blocks={block._children} />
            </div>
          )}
        </details>
      )

    default:
      return null
  }
}

function Blocks({ blocks }: { blocks: any[] }) {
  const output: React.ReactNode[] = []

  let index = 0

  while (index < blocks.length) {
    const block = blocks[index]

    /*
     * Group consecutive bulleted list items.
     */
    if (block.type === 'bulleted_list_item') {
      const items = []

      while (
        index < blocks.length &&
        blocks[index].type === 'bulleted_list_item'
      ) {
        items.push(blocks[index])
        index++
      }

      output.push(
        <ul key={`ul-${block.id}`}>
          {items.map((item) => (
            <li key={item.id}>
              <RichText items={item[item.type]?.rich_text} />
              {item._children?.length > 0 && <Blocks blocks={item._children} />}
            </li>
          ))}
        </ul>,
      )

      continue
    }

    /*
     * Group consecutive numbered list items.
     */
    if (block.type === 'numbered_list_item') {
      const items = []

      while (
        index < blocks.length &&
        blocks[index].type === 'numbered_list_item'
      ) {
        items.push(blocks[index])
        index++
      }

      output.push(
        <ol key={`ol-${block.id}`}>
          {items.map((item) => (
            <li key={item.id}>
              <RichText items={item[item.type]?.rich_text} />
              {item._children?.length > 0 && <Blocks blocks={item._children} />}
            </li>
          ))}
        </ol>,
      )

      continue
    }

    output.push(
      <React.Fragment key={block.id}>
        <Block block={block} />

        {block._children?.length > 0 &&
          block.type !== 'toggle' &&
          block.type !== 'table' && block.type !== 'callout' && <Blocks blocks={block._children} />}
      </React.Fragment>,
    )

    index++
  }

  return <>{output}</>
}

export function NotionContent({ blocks }: NotionContentProps) {
  return (
    <div className="prose-zinc prose max-w-none dark:prose-invert">
      <Blocks blocks={blocks} />
    </div>
  )
}
