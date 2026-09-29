import Link from 'next/link'
import Image from 'next/image'
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
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

export const revalidate = 300

const socialLinks = [
  { label: 'X', href: 'https://x.com/winaldosatryadi', icon: XIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/winaldomanurung/', icon: InstagramIcon },
  { label: 'GitHub', href: 'https://github.com/winaldomanurung', icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://id.linkedin.com/in/winaldo-satryadi-manurung', icon: LinkedInIcon },
]

const roles = [
  { company: 'InJourney Airports', title: 'Mechanical Supervisor', years: '2026 — Now', logo: logoInjourney },
  { company: 'InJourney Airports', title: 'Mechanical Engineer', years: '2024 — 2026', logo: logoInjourney },
  { company: 'Angkasa Pura II', title: 'Mechanical Engineer', years: '2022 — 2024', logo: logoAngkasapura },
  { company: 'Angkasa Pura II', title: 'Mechanical Technician', years: '2019 — 2022', logo: logoAngkasapura },
  { company: 'GMF AeroAsia', title: 'Development Engineer', years: '2016 — 2019', logo: logoGmf },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="text-lg leading-none">{diagonal ? '↗' : '→'}</span>
}

function Interests() {
  return (
    <section aria-labelledby="curiosity-title" className="relative mt-24 sm:mt-32">
      <Container>
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="editorial-kicker mb-4"><span className="editorial-dot" /> The curiosity index / 01</p>
            <h2 id="curiosity-title" className="editorial-heading max-w-2xl text-4xl leading-[1.08] sm:text-5xl">
              More than a job.<br /><em className="text-[var(--accent)]">A way of looking at things.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-zinc-600 dark:text-zinc-400">A few corners of my world: the work, the experiments, and the things that keep me curious.</p>
        </div>
        <div className="editorial-bento">
          <Link href="/articles" className="editorial-panel editorial-panel-feature group relative flex min-h-72 flex-col justify-between overflow-hidden p-7 sm:min-h-96 sm:p-10">
            <div className="pointer-events-none absolute -right-16 -bottom-24 h-72 w-72 rounded-full border border-white/20 sm:h-96 sm:w-96" />
            <div className="pointer-events-none absolute -right-5 -bottom-16 h-56 w-56 rounded-full border border-white/20 sm:h-80 sm:w-80" />
            <div className="pointer-events-none absolute right-12 bottom-3 h-36 w-36 rounded-full border border-white/20 sm:h-56 sm:w-56" />
            <div className="relative flex items-center justify-between">
              <span className="editorial-kicker !text-white/70">Field notes · Engineering</span>
              <span className="editorial-arrow !border-white/30 !text-white"><Arrow diagonal /></span>
            </div>
            <div className="relative max-w-lg">
              <span className="mb-4 inline-block text-sm text-white/70">01 / Systems & problem solving</span>
              <h3 className="editorial-heading text-4xl leading-[1.08] text-white sm:text-6xl">The art of<br /><em>figuring it out.</em></h3>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/80">Machines, maintenance, and lessons learned from keeping complex things running.</p>
            </div>
          </Link>
          <Link href="/projects" className="editorial-panel editorial-panel-project group relative flex min-h-60 flex-col justify-between p-7 sm:p-8">
            <div className="flex items-center justify-between"><span className="editorial-kicker">02 / Building</span><span className="editorial-arrow"><Arrow diagonal /></span></div>
            <div className="relative my-5 flex h-20 items-center gap-2" aria-hidden="true">
              <span className="editorial-block h-12 w-12 -rotate-12 rounded-2xl" />
              <span className="editorial-block h-16 w-16 rotate-12 rounded-2xl opacity-70" />
              <span className="editorial-block h-10 w-10 -rotate-6 rounded-full opacity-40" />
            </div>
            <div><h3 className="editorial-heading text-3xl">Ideas into things.</h3><p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Code, experiments, and side projects.</p></div>
          </Link>
          <Link href="/about" className="editorial-panel editorial-panel-life group relative flex min-h-60 flex-col justify-between overflow-hidden p-7 sm:p-8">
            <div className="flex items-center justify-between"><span className="editorial-kicker">03 / Beyond the desk</span><span className="editorial-arrow"><Arrow diagonal /></span></div>
            <div className="relative my-5" aria-hidden="true"><svg viewBox="0 0 280 95" className="h-20 w-full max-w-72 fill-none" preserveAspectRatio="xMidYMid meet"><path d="M2 75 48 48 76 61 112 13 158 76 192 37 232 65 277 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]"/><path d="M2 90H278" stroke="currentColor" strokeOpacity=".18" strokeDasharray="4 7"/><circle cx="277" cy="8" r="5" fill="currentColor" className="text-[var(--accent)]"/></svg></div>
            <div><h3 className="editorial-heading text-3xl">Keep moving.</h3><p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Life, endurance, and the long way around.</p></div>
          </Link>
        </div>
        <div className="mt-5 flex items-center justify-between gap-4 text-xs tracking-[.14em] text-zinc-500 dark:text-zinc-400">
          <span>CURIOUS BY DEFAULT</span><span className="h-px flex-1 bg-zinc-300/70 dark:bg-zinc-700/70" /><span>ALWAYS IN PROGRESS ↗</span>
        </div>
      </Container>
    </section>
  )
}

export default async function Home() {
  const articles = (await getAllArticles()).slice(0, 4)

  return (
    <main className="pb-6">
      <Container className="relative mt-10 sm:mt-16">
        <div className="editorial-hero relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full border border-[var(--accent)]/20" />
          <div className="pointer-events-none absolute -right-36 bottom-0 h-80 w-80 rounded-full border border-[var(--accent)]/15" />
          <div className="relative max-w-3xl">
            <p className="editorial-kicker mb-7"><span className="editorial-dot" /> Winaldo Manurung / Personal archive</p>
            <h1 className="editorial-heading text-[clamp(3.2rem,7vw,6.7rem)] leading-[.98] tracking-[-.055em]">
              Engineer by profession.<br /><em className="text-[var(--accent)]">Builder by curiosity.</em>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-zinc-600 sm:text-lg dark:text-zinc-300">
              A little corner of the internet for the things I build, the problems I solve, and the ideas I do not want to forget.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/articles" className="editorial-cta">Explore my writing <Arrow diagonal /></Link>
              <Link href="/about" className="editorial-cta-secondary">The story so far <Arrow /></Link>
            </div>
          </div>
          <div className="relative mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-zinc-300/60 pt-5 dark:border-zinc-700/70">
            <span className="text-xs font-medium tracking-[.14em] text-zinc-500 dark:text-zinc-400">TANGERANG, INDONESIA · EST. IN CURIOSITY</span>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="text-zinc-500 transition hover:text-[var(--accent)] dark:text-zinc-400 dark:hover:text-[var(--accent)]"><Icon className="h-5 w-5 fill-current" /></Link>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Interests />

      <Container className="mt-24 sm:mt-32">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-zinc-300/60 pb-5 dark:border-zinc-700/70">
          <div><p className="editorial-kicker mb-3"><span className="editorial-dot" /> From the archive / 02</p><h2 className="editorial-heading text-4xl sm:text-5xl">Latest <em className="text-[var(--accent)]">writing.</em></h2></div>
          <Link href="/articles" className="shrink-0 text-sm font-semibold text-[var(--accent)] hover:underline">All articles ↗</Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(270px,1fr)] lg:gap-12">
          <div className="min-w-0">
            {articles.length ? (
              <ol className="divide-y divide-zinc-300/60 dark:divide-zinc-700/70">
                {articles.map((article, index) => (
                  <li key={article.pageId}>
                    <Link href={`/articles/${encodeURIComponent(article.slug)}`} className="group flex gap-4 py-6 first:pt-2 sm:gap-6">
                      <span className="pt-1 font-mono text-xs text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span>
                      <div className="min-w-0 flex-1">
                        <p className="mb-2 text-xs tracking-[.07em] text-zinc-500 dark:text-zinc-400">{article.category || 'Journal'}{article.date ? ` · ${formatDate(article.date)}` : ''}</p>
                        <h3 className="editorial-heading text-2xl leading-tight transition-colors group-hover:text-[var(--accent)] sm:text-3xl">{article.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{article.description}</p>
                      </div>
                      <span aria-hidden="true" className="mt-1 text-xl text-[var(--accent)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                    </Link>
                  </li>
                ))}
              </ol>
            ) : <p className="py-10 text-zinc-600 dark:text-zinc-400">The archive is taking shape. Check back for new writing.</p>}
          </div>
          <aside className="editorial-resume rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3"><span className="editorial-kicker">Currently & previously</span><span className="text-xl text-[var(--accent)]">✳</span></div>
            <h3 className="editorial-heading mt-5 text-3xl">The working <em>years.</em></h3>
            <ol className="mt-7 space-y-5">
              {roles.map((role, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800"><Image src={role.logo} alt="" className="max-h-7 w-auto object-contain" /></span>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold leading-5 text-zinc-900 dark:text-zinc-100">{role.title}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">{role.company}</p></div>
                  <span className="shrink-0 text-right font-mono text-[10px] text-zinc-500 dark:text-zinc-400">{role.years}</span>
                </li>
              ))}
            </ol>
            <Link href="/about" className="mt-8 flex items-center justify-between border-t border-zinc-300/70 pt-5 text-sm font-semibold text-[var(--accent)] transition hover:gap-4 dark:border-zinc-700">A little more about me <Arrow diagonal /></Link>
          </aside>
        </div>
      </Container>
    </main>
  )
}
