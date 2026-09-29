import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { Wrench, Code2, BrainCircuit, Compass, ArrowUpRight, ArrowRight } from 'lucide-react'

import { Button } from '@/components/Button'
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

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
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
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

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

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
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

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex items-center">
        <span className="flex min-w-0 flex-auto p-px">
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            required
            className="w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 sm:text-sm dark:bg-zinc-700/15 dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400"
          />
        </span>
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
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
      {/* <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hoconst interests = [
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
              <Link
                key={interest.number}
                href={`/articles?category=${encodeURIComponent(interest.category)}`}
                aria-label={`Browse ${interest.title} articles`}
                data-tone={interest.tone}
                className="interest-card group relative isolate flex min-h-[244px] flex-col overflow-hidden rounded-[22px] p-6 outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-500 sm:min-h-[260px] sm:p-7"
              >
                <div className="interest-wash pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="interest-icon flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl">
                      <Icon size={25} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="interest-index font-mono text-[11px] tracking-[.12em]">
                      {interest.number} <span className="opacity-40">/</span> 04
                    </span>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={21}
                    strokeWidth={1.6}
                    className="interest-diagonal mt-1 shrink-0"
                  />
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
                  <div className="interest-footer mt-5 flex items-center justify-between border-t pt-3.5">
                    <span className="text-xs font-semibold tracking-wide">Read the stories</span>
                    <ArrowRight className="interest-forward" size={17} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                </div>
              </Link>
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
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Engineer by profession, builder by curiosity.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Winaldo, an engineer based in Tangerang, Indonesia. I spend my
            time working in the transportation industry, building things with
            code, while occasionally running and cycling. I’m also an archivist
            at heart—I love documenting ideas, experiences, projects, and the
            little things that might otherwise be forgotten. I’m currently
            focused on growing my career, continuing my education, and figuring
            out what kind of person I want to become along the way.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink href="https://x.com/winaldosatryadi" aria-label="Follow on X" icon={XIcon} />
            <SocialLink
              href="https://www.instagram.com/winaldomanurung/"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com/winaldomanurung"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://id.linkedin.com/in/winaldo-satryadi-manurung"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Interests />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter /> */}
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
