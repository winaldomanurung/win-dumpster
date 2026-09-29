import { verifyWebhookSignature } from '@notionhq/client'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

const verificationToken = process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN

export async function POST(request: Request) {
  const body = await request.text()

  // Initial verification request from Notion
  try {
    const payload = JSON.parse(body)

    if (payload.verification_token) {
      // Configure the verification token privately; never log it.

      return NextResponse.json({ received: true })
    }
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    )
  }

  // Verify subsequent webhook events
  if (!verificationToken) {
    console.error('NOTION_WEBHOOK_VERIFICATION_TOKEN is not configured.')

    return NextResponse.json(
      { error: 'Webhook is not configured.' },
      { status: 500 },
    )
  }

  const signature = request.headers.get('x-notion-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing Notion signature.' },
      { status: 401 },
    )
  }

  const isValid = await verifyWebhookSignature({
    body,
    signature,
    verificationToken,
  })

  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid Notion signature.' },
      { status: 401 },
    )
  }

  let event: {
    type?: string
  }

  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400 },
    )
  }

  console.log('Notion webhook event:', event.type)

  revalidatePath('/')
  revalidatePath('/articles')
  revalidatePath('/articles/[slug]', 'page')

  return NextResponse.json({ received: true })
}
