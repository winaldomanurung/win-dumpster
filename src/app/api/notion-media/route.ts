import { NextRequest, NextResponse } from 'next/server'
import { notion } from '@/lib/notion'

export async function GET(request: NextRequest) {
  const blockId = request.nextUrl.searchParams.get('blockId')

  if (!blockId) {
    return NextResponse.json({ error: 'Missing blockId' }, { status: 400 })
  }

  try {
    const block = await notion.blocks.retrieve({
      block_id: blockId,
    })

    if (!('type' in block)) {
      return NextResponse.json(
        { error: 'Invalid Notion block' },
        { status: 400 },
      )
    }

    let url: string | null = null

    if (block.type === 'image') {
      const image = block.image

      if (image.type === 'external') {
        url = image.external.url
      } else if (image.type === 'file') {
        url = image.file.url
      }
    }

    if (block.type === 'video') {
      const video = block.video

      if (video.type === 'external') {
        url = video.external.url
      } else if (video.type === 'file') {
        url = video.file.url
      }
    }

    if (block.type === 'file') {
      const file = block.file

      if (file.type === 'external') {
        url = file.external.url
      } else if (file.type === 'file') {
        url = file.file.url
      }
    }

    if (!url) {
      return NextResponse.json(
        { error: 'Media URL not found' },
        { status: 404 },
      )
    }

    const response = await fetch(url, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'Failed to fetch media from Notion',
          status: response.status,
        },
        { status: 502 },
      )
    }

    const contentType =
      response.headers.get('content-type') ?? 'application/octet-stream'

    const contentLength = response.headers.get('content-length')

    const headers = new Headers()

    headers.set('Content-Type', contentType)

    /*
     * Cache hasil media di CDN.
     *
     * Notion URL boleh expired, tetapi browser/Vercel hanya
     * menggunakan URL /api/notion-media yang permanen.
     */
    headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400',
    )

    if (contentLength) {
      headers.set('Content-Length', contentLength)
    }

    return new NextResponse(response.body, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Notion media proxy error:', error)

    return NextResponse.json(
      { error: 'Failed to retrieve media from Notion' },
      { status: 500 },
    )
  }
}
