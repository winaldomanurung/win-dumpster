import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, BookOpenText, Code2, Layers3 } from 'lucide-react'
import { Container } from '@/components/Container'
import { InteriorPageHeader } from '@/components/InteriorPageHeader'

const projects = [
  {
    number: '01',
    name: 'Aksioma Journey',
    category: 'Personal development',
    description: 'A learning platform for mindset, personal development, and critical thinking.',
    href: 'https://aksioma-journey.com',
    label: 'aksioma-journey.com',
    icon: BookOpenText,
    tone: 'teal',
    monogram: 'AJ',
  },
  {
    number: '02',
    name: 'Aksioma Trader',
    category: 'Financial education',
    description: 'An educational project exploring stock markets and financial literacy.',
    href: 'https://aksioma-trader.com',
    label: 'aksioma-trader.com',
    icon: Code2,
    tone: 'violet',
    monogram: 'AT',
  },
] as const

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I’m building and learning from.',
  alternates: { canonical: '/projects' },
}

export default function Projects() {
  return (
    <>
      <InteriorPageHeader
        eyebrow="The building log"
        title="Selected projects"
        description="Ideas that made their way out of my notes and into something real. Still learning, still iterating."
        icon={<Layers3 size={16} strokeWidth={1.8} aria-hidden="true" />}
      />
      <Container className="mt-10 sm:mt-14">
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-zinc-200 pb-5 dark:border-zinc-700/70">
          <p className="text-xs font-semibold uppercase tracking-[.17em] text-teal-600 dark:text-teal-400">Built with curiosity</p>
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{String(projects.length).padStart(2, '0')} projects</span>
        </div>
        <ul role="list" className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <li key={project.name} data-tone={project.tone} className="interior-card interior-project group relative flex min-h-[310px] flex-col overflow-hidden rounded-2xl p-6 sm:p-8">
                <div className="flex items-start justify-between gap-3">
                  <div className="interior-project-icon flex h-14 w-14 items-center justify-center rounded-2xl">
                    <Icon size={27} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs tracking-[.12em] text-zinc-400 dark:text-zinc-500">{project.number} / 02</span>
                </div>
                <div className="mt-auto pt-12">
                  <p className="interior-project-eyebrow mb-2 text-[11px] font-semibold uppercase tracking-[.17em]">{project.category}</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
                    <Link href={project.href} target="_blank" rel="noopener noreferrer" className="interior-card-link outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-500">
                      <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
                      {project.name}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-600 dark:text-zinc-400">{project.description}</p>
                  <div className="interior-project-divider mt-6 flex items-center justify-between gap-3 border-t pt-4">
                    <span className="truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">{project.label}</span>
                    <ArrowUpRight className="interior-project-arrow shrink-0" size={19} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
