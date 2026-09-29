import { NextRequest, NextResponse } from 'next/server'
import convert from 'heic-convert'
import { notion } from '@/lib/notion'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const blockId = request.nextUrl.searchParams.get('blockId')

  if (!blockId) {
    return NextResponse.json(
      {
        error: 'Missing blockId',
      },
      {
        status: 400,
      },
    )
  }

  /*
   * Notion block IDs are UUIDs.
   * We accept both:
   *
   * 12345678-1234-1234-1234-123456789abc
   *
   * and:
   *
   * 12345678123412341234123456789abc
   */
  const normalizedBlockId = blockId.replace(/-/g, '')

  if (!/^[0-9a-fA-F]{32}$/.test(normalizedBlockId)) {
    return NextResponse.json(
      {
        error: 'Invalid blockId',
      },
      {
        status: 400,
      },
    )
  }

  try {
    /*
     * Retrieve the Notion block.
     *
     * For Notion-hosted media, the URL returned here
     * is temporary/signed. We intentionally retrieve it
     * at request time.
     */
    const block = await notion.blocks.retrieve({
      block_id: blockId,
    })

    if (!('type' in block)) {
      return NextResponse.json(
        {
          error: 'Invalid Notion block',
        },
        {
          status: 400,
        },
      )
    }

    let mediaUrl: string | null = null

    /*
     * IMAGE
     */
    if (block.type === 'image') {
      const media = block.image

      if (media.type === 'file') {
        mediaUrl = media.file.url
      }
    }

    /*
     * VIDEO
     */
    if (block.type === 'video') {
      const media = block.video

      if (media.type === 'file') {
        mediaUrl = media.file.url
      }
    }

    /*
     * FILE
     */
    if (block.type === 'file') {
      const media = block.file

      if (media.type === 'file') {
        mediaUrl = media.file.url
      }
    }

    // External media is rendered directly by NotionContent; proxy only Notion-hosted files.
    if (!mediaUrl) {
      return NextResponse.json(
        {
          error: 'Media URL not found',
        },
        {
          status: 404,
        },
      )
    }

    /*
     * Fetch the actual media from Notion.
     */
    const mediaResponse = await fetch(mediaUrl, {
      cache: 'no-store',
    })

    if (!mediaResponse.ok) {
      console.error('Failed to fetch Notion media:', mediaResponse.status)

      return NextResponse.json(
        {
          error: 'Failed to fetch media from Notion',
          status: mediaResponse.status,
        },
        {
          status: 502,
        },
      )
    }

    const contentType = mediaResponse.headers.get('content-type') ?? ''
    const contentLength = Number(mediaResponse.headers.get('content-length') || 0)
    if (contentLength > 25 * 1024 * 1024) {
      await mediaResponse.body?.cancel()
      return NextResponse.json({ error: 'Media exceeds proxy size limit' }, { status: 413 })
    }

    const arrayBuffer = await mediaResponse.arrayBuffer()
    if (arrayBuffer.byteLength > 25 * 1024 * 1024) {
      return NextResponse.json({ error: 'Media exceeds proxy size limit' }, { status: 413 })
    }
    const inputBuffer = Buffer.from(arrayBuffer)

    /*
     * Detect HEIC/HEIF.
     *
     * iPhone images may arrive with MIME types such as:
     *
     * image/heic
     * image/heif
     * image/heic-sequence
     * image/heif-sequence
     *
     * We also inspect the URL because MIME metadata isn't
     * always consistent.
     */
    const lowerContentType = contentType.toLowerCase()
    const lowerMediaUrl = mediaUrl.toLowerCase()

    const isHeic =
      lowerContentType.includes('image/heic') ||
      lowerContentType.includes('image/heif') ||
      lowerMediaUrl.includes('.heic') ||
      lowerMediaUrl.includes('.heif')

    /*
     * HEIC → JPEG
     *
     * The browser receives image/jpeg instead of image/heic.
     */
    if (isHeic) {
      try {
        const jpegBuffer = await convert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 0.9,
        })

        return new NextResponse(jpegBuffer as BodyInit, {
          status: 200,
          headers: {
            'Content-Type': 'image/jpeg',

            /*
             * Cache converted result at Vercel's edge.
             *
             * The browser never needs to know about the
             * temporary Notion URL.
             */
            'Cache-Control':
              'public, s-maxage=3600, stale-while-revalidate=86400',

            'Content-Length': jpegBuffer.length.toString(),
          },
        })
      } catch (conversionError) {
        console.error('HEIC conversion failed:', conversionError)

        return NextResponse.json(
          {
            error: 'Failed to convert HEIC image',
          },
          {
            status: 500,
          },
        )
      }
    }

    /*
     * Normal JPEG/PNG/WebP/etc.
     *
     * No conversion required.
     */
    return new NextResponse(inputBuffer as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': contentType || 'application/octet-stream',

        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',

        'Content-Length': inputBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Notion media proxy error:', error)

    return NextResponse.json(
      {
        error: 'Failed to retrieve media from Notion',
      },
      {
        status: 500,
      },
    )
  }
}
