import { Container } from '@/components/Container'
import type { ReactNode } from 'react'

export function InteriorPageHeader({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string
  title: string
  description: string
  icon: ReactNode
}) {
  return (
    <Container className="mt-9">
      <header className="interior-hero relative overflow-hidden rounded-3xl px-6 py-9 sm:px-9 sm:py-12 lg:px-12 lg:py-14">
        <span aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-teal-500/15 sm:h-[420px] sm:w-[420px]" />
        <span aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full border border-teal-500/15 sm:h-[290px] sm:w-[290px]" />
        <div className="relative max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-teal-700 dark:text-teal-300">
            {icon}
            {eyebrow}
          </p>
          <h1 className="text-4xl font-bold leading-[1.14] tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            {title}<span className="text-teal-600 dark:text-teal-300">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
            {description}
          </p>
        </div>
      </header>
    </Container>
  )
}
