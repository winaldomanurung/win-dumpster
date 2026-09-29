import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { Wrench, Code2, BrainCircuit, Compass, ArrowUpRight, ArrowRight, BookOpen, Sparkles } from 'lucide-react'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import logoAngkasapura from '@/images/logos/angkasapura.png'
import logoGmf from '@/images/logos/gmf.png'
import logoInjourney from '@/images/logos/injourney.png'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function Article({ article, index }: { article: ArticleWithSlug; index: number }) {
  return (
    <Card as="article" className="home-article group relative border-b border-zinc-200/80 py-6 first:pt-0 last:border-b-0 dark:border-zinc-700/70">
      <span className="home-article-number absolute right-0 top-6 font-mono text-xs text-zinc-400 group-first:top-0 dark:text-zinc-500">
        {String(index + 1).padStart(2, '0')}
      </span>
      <Card.Eyebrow as="div" decorate>
        {article.category || 'Journal'}
        {article.date ? <span className="ml-2">· {formatDate(article.date)}</span> : null}
      </Card.Eyebrow>
      <div className="max-w-[calc(100%-2rem)]">
        <Card.Title href={`/articles/${encodeURIComponent(article.slug)}`}>{article.title}</Card.Title>
      </div>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Injourney Airports',
      title: 'Mechanical Supervisor',
      logo: logoInjourney,
      start: '2026',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Injourney Airports',
      title: 'Mechanical Engineer',
      logo: logoInjourney,
      start: '2024',
      end: '2026',
    },
    {
      company: 'Angkasa Pura II',
      title: 'Mechanical Engineer',
      logo: logoAngkasapura,
      start: '2022',
      end: '2024',
    },
    {
      company: 'Angkasa Pura II',
      title: 'Mechanical Technician',
      logo: logoAngkasapura,
      start: '2019',
      end: '2022',
    },
    {
      company: 'GMF Aeroasia',
      title: 'Development Engineer',
      logo: logoGmf,
      start: '2016',
      end: '2019',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
    </div>
  )
}

const interests = [
  {
    number: '01',
    title: 'Engineering',
    description: 'Finding clarity in complex systems and real-world problems.',
    icon: Wrench,
    category: 'Engineering',
    tone: 'teal',
    detail: 'Systems / Reliability',
  },
  {
    number: '02',
    title: 'Building',
    description: 'Turning little ideas into things people can actually use.',
    icon: Code2,
    category: 'Building',
    tone: 'violet',
    detail: 'Code / Experiments',
  },
  {
    number: '03',
    title: 'Thinking',
    description: 'Questioning assumptions and learning to see differently.',
    icon: BrainCircuit,
    category: 'Thinking',
    tone: 'amber',
    detail: 'Ideas / Perspectives',
  },
  {
    number: '04',
    title: 'Exploring',
    description: 'Collecting perspectives beyond the desk and the routine.',
    icon: Compass,
    category: 'Exploring',
    tone: 'sage',
    detail: 'Life / Discovery',
  },
] as const

function Interests() {
  return (
    <Container className="mt-16 sm:mt-20">
      <section aria-labelledby="interests-heading">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.17em] text-teal-600 dark:text-teal-400">
              A little more about me
            </p>
            <h2
              id="interests-heading"
              className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100"
            >
              Driven by curiosity<span className="text-teal-500">.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Four interests, one constant: there is always more to learn.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {interests.map((interest) => {
            const Icon = interest.icon

            return (
              <div
                key={interest.number}
                data-tone={interest.tone}
                className="interest-card relative isolate flex min-h-[220px] flex-col overflow-hidden rounded-[22px] p-6 sm:min-h-[245px] sm:p-7"
              >
                <div className="interest-wash pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="interest-icon flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl">
                      <Icon size={25} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="interest-index font-mono text-[11px] tracking-[.12em]">{interest.number} / 04</span>
                  </div><span className="interest-index font-mono text-[11px] tracking-[.12em]" aria-hidden="true">PERSONAL NOTES</span>
                </div>
                <div className="relative z-10 mt-auto max-w-md pt-9">
                  <p className="interest-detail mb-2 text-[10px] font-semibold uppercase tracking-[.18em]">
                    {interest.detail}
                  </p>
                  <h3 className="text-[1.75rem] font-semibold leading-tight tracking-[-.035em] text-zinc-900 sm:text-[2rem] dark:text-zinc-50">
                    {interest.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {interest.description}
                  </p>
                  <div className="interest-footer mt-5 border-t pt-3.5 text-[11px] tracking-[.1em] uppercase">
                    An ongoing curiosity
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </Container>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        <section aria-labelledby="home-title" className="home-hero relative overflow-hidden rounded-3xl px-6 py-9 sm:px-9 sm:py-12 lg:px-12 lg:py-14">
          <div className="home-hero-decoration pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-teal-500/15 sm:h-[420px] sm:w-[420px]" aria-hidden="true" />
          <div className="home-hero-decoration pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full border border-teal-500/15 sm:h-[290px] sm:w-[290px]" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-teal-700 dark:text-teal-300">
              <Sparkles size={15} strokeWidth={1.8} aria-hidden="true" />
              A personal archive
            </div>
            <h1 id="home-title" className="text-4xl font-bold leading-[1.14] tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.65rem] dark:text-zinc-100">
              Engineer by profession,<br />
              <span className="home-hero-accent">builder by curiosity.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
              I’m Winaldo, an engineer based in Tangerang, Indonesia. I spend my
              time working in the transportation industry, building things with
              code, while occasionally running and cycling. I’m also an archivist
              at heart—I love documenting ideas, experiences, projects, and the
              little things that might otherwise be forgotten. I’m currently
              focused on growing my career, continuing my education, and figuring
              out what kind of person I want to become along the way.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/articles" className="home-primary-link inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
                <BookOpen size={17} aria-hidden="true" /> Explore my writing <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/about" className="home-secondary-link inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
                More about me <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-zinc-300/60 pt-6 dark:border-zinc-700/60">
              <span className="text-xs font-medium tracking-[.1em] text-zinc-500 dark:text-zinc-400">FIND ME ONLINE</span>
              <div className="flex items-center gap-5">
                <SocialLink href="https://x.com/winaldosatryadi" aria-label="Follow on X" icon={XIcon} />
                <SocialLink href="https://www.instagram.com/winaldomanurung/" aria-label="Follow on Instagram" icon={InstagramIcon} />
                <SocialLink href="https://github.com/winaldomanurung" aria-label="Follow on GitHub" icon={GitHubIcon} />
                <SocialLink href="https://id.linkedin.com/in/winaldo-satryadi-manurung" aria-label="Follow on LinkedIn" icon={LinkedInIcon} />
              </div>
            </div>
          </div>
        </section>
      </Container>
      <Interests />
      <Container className="mt-24 md:mt-28">
        <section aria-labelledby="latest-writing-heading">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-700/70">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[.17em] text-teal-600 dark:text-teal-400">From the archive</p>
              <h2 id="latest-writing-heading" className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">Latest writing<span className="text-teal-500">.</span></h2>
            </div>
            <Link href="/articles" className="home-all-articles inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 dark:text-teal-400">
              All articles <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-12 lg:max-w-none lg:grid-cols-[minmax(0,1fr)_minmax(0,.88fr)] lg:gap-x-12">
            <div className="flex min-w-0 flex-col">
              {articles.map((article, index) => (
                <Article key={article.slug} article={article} index={index} />
              ))}
              {articles.length === 0 && <p className="text-sm text-zinc-500 dark:text-zinc-400">New writing will appear here soon.</p>}
            </div>
            <div className="lg:pl-8">
              <Resume />
            </div>
          </div>
        </section>
      </Container>
    </>
  )
}
