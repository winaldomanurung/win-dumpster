import { type Metadata } from 'next'
import { Varela } from 'next/font/google'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

const varela = Varela({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--font-varela' })

export const metadata: Metadata = {
  title: {
    template: '%s - Winaldo Manurung',
    default:
      'Winaldo Manurung - Engineer by profession, builder by curiosity, and endurance enthusiast by choice.',
  },
  description:
    'I’m Winaldo, an engineer based in Tangerang, Indonesia. I spend my time working in the transportation industry, building things with code, running, and cycling.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://win-dumpster.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'Win Dumpster',
    title: 'Win Dumpster — Winaldo Manurung',
    description: 'Engineering, technology, and personal writing by Winaldo Manurung.',
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://win-dumpster.vercel.app'}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className={`${varela.variable} ${varela.className} flex h-full bg-zinc-50 dark:bg-black`}>
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
