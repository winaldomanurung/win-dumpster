import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'

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
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button> */}
    </div>
  )
}

type InterestIconName = 'engineering' | 'building' | 'thinking' | 'exploring'

function InterestIcon({ name }: { name: InterestIconName }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true" {...common}>
      {name === 'engineering' && (
        <>
          <path d="M19 7h10l1.6 5.1 4.8 2.8 5.2-1.1 5 8.6-3.5 4-0.1 5.6-4.1 4.1-5.6-.1-4 3.5-8.6-5-1.1-5.2-2.8-4.8L11 23V13l5.1-1.6z" transform="translate(-4 3) scale(.88)" />
          <circle cx="24" cy="24" r="7" />
          <path d="m21 25 3 3 6-7" />
        </>
      )}
      {name === 'building' && (
        <>
          <rect x="6" y="9" width="36" height="28" rx="5" />
          <path d="M6 17h36M14 13h.01M19 13h.01M14 23l5 5-5 5M23 33h10" />
          <path d="M29 25h5M31.5 22.5v5" />
        </>
      )}
      {name === 'thinking' && (
        <>
          <path d="M24 8c-8.7 0-15 6.7-15 15 0 6.3 3.4 10.5 8 13v4h14v-4c4.6-2.5 8-6.7 8-13 0-8.3-6.3-15-15-15Z" />
          <path d="M19 44h10M18 23c2-4 4 4 6 0s4-4 6 0M24 8v6M9 23h6M33 23h6" />
        </>
      )}
      {name === 'exploring' && (
        <>
          <path d="M5 37 17 17l7 10 6-8 13 18H5Z" />
          <path d="m11 27 6 4 7-4 7 5 5-4" />
          <circle cx="34" cy="11" r="4" />
          <path d="M8 43h32" />
        </>
      )}
    </svg>
  )
}

const interests: {
  number: string
  name: string
  description: string
  icon: InterestIconName
  href: string
  color: string
  iconColor: string
  label: string
}[] = [
  {
    number: '01',
    name: 'Engineering',
    description: 'Finding clarity in complex systems and real-world problems.',
    icon: 'engineering',
    href: '/articles?category=Engineering',
    color: 'bg-[#e9efed] dark:bg-[#203439]',
    iconColor: 'text-[#376c68] dark:text-[#9ad3c8]',
    label: 'Explore engineering articles',
  },
  {
    number: '02',
    name: 'Building',
    description: 'Turning little ideas into things people can actually use.',
    icon: 'building',
    href: '/projects',
    color: 'bg-[#eae8f2] dark:bg-[#303047]',
    iconColor: 'text-[#645b92] dark:text-[#c2b9f4]',
    label: 'Explore my projects',
  },
  {
    number: '03',
    name: 'Thinking',
    description: 'Questioning assumptions and learning to see differently.',
    icon: 'thinking',
    href: '/articles?q=thinking',
    color: 'bg-[#f4ebe4] dark:bg-[#453029]',
    iconColor: 'text-[#a26343] dark:text-[#efbd9e]',
    label: 'Explore writing about thinking',
  },
  {
    number: '04',
    name: 'Exploring',
    description: 'Collecting perspectives beyond the desk and the routine.',
    icon: 'exploring',
    href: '/about',
    color: 'bg-[#e9eee4] dark:bg-[#303d32]',
    iconColor: 'text-[#678357] dark:text-[#b5cda4]',
    label: 'Read more about me',
  },
]

function Interests() {
  return (
    <Container className="mt-16 sm:mt-20">
      <section aria-labelledby="interests-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Beyond the resume
            </p>
            <h2
              id="interests-heading"
              className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100"
            >
              Things that drive me<span className="text-teal-500">.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Four different interests. One common thread: curiosity.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
          {interests.map((interest, index) => (
            <Link
              key={interest.number}
              href={interest.href}
              aria-label={interest.label}
              className={`group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-2xl p-6 ring-1 ring-zinc-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500 sm:min-h-[265px] sm:p-7 dark:ring-white/10 dark:hover:shadow-black/20 ${interest.color} ${
                index === 0 || index === 3 ? 'lg:col-span-7' : 'lg:col-span-5'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60 dark:bg-white/10 ${interest.iconColor}`}>
                  <InterestIcon name={interest.icon} />
                </span>
                <span className="font-mono text-xs tracking-widest text-zinc-500/80 dark:text-zinc-400">
                  {interest.number} / 04
                </span>
              </div>
              <div className="mt-8 flex items-end justify-between gap-4">
                <div className="max-w-sm">
                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[1.8rem] dark:text-zinc-100">
                    {interest.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {interest.description}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-current/20 text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${interest.iconColor}`}
                >
                  ↗
                </span>
              </div>
            </Link>
          ))}
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
