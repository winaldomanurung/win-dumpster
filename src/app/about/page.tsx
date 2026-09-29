import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Sparkles } from 'lucide-react'

import { Container } from '@/components/Container'
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

const socialLinks = [
  { label: 'X', href: 'https://x.com/winaldosatryadi', icon: XIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/winaldomanurung/', icon: InstagramIcon },
  { label: 'GitHub', href: 'https://github.com/winaldomanurung', icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://id.linkedin.com/in/winaldo-satryadi-manurung', icon: LinkedInIcon },
]

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind Win Dumpster — engineering, building, and finding things worth remembering.',
  alternates: { canonical: '/about' },
}

export default function About() {
  return (
    <>
      <Container className="mt-9">
        <header className="interior-hero relative overflow-hidden rounded-3xl px-6 py-9 sm:px-9 sm:py-12 lg:px-12 lg:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-teal-500/15 sm:h-[420px] sm:w-[420px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full border border-teal-500/15 sm:h-[290px] sm:w-[290px]" />
          <div className="relative max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-teal-700 dark:text-teal-300">
              <Sparkles size={16} strokeWidth={1.8} aria-hidden="true" />
              The person behind the notes
            </p>
            <h1 className="text-4xl font-bold leading-[1.14] tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
              Hello, I’m Winaldo<span className="text-teal-600 dark:text-teal-300">.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
              Engineer by profession, builder by curiosity, and an archivist at heart. This little corner of the internet is where I keep the things I don’t want to forget.
            </p>
          </div>
        </header>
      </Container>

      <Container className="mt-10 sm:mt-14">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,.8fr)] lg:gap-14">
          <article className="min-w-0">
            <div className="mb-7 flex items-center gap-3 border-b border-zinc-200 pb-5 dark:border-zinc-700/70">
              <span className="about-section-icon flex h-10 w-10 items-center justify-center rounded-xl"><Sparkles size={19} strokeWidth={1.8} aria-hidden="true" /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.17em] text-teal-600 dark:text-teal-400">A little backstory</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">A work in progress.</h2>
              </div>
            </div>
            <div className="space-y-6 text-base leading-8 text-zinc-600 dark:text-zinc-300">
              <p>I’ve always loved making things from scratch. That curiosity eventually led me to become an engineer—not just to understand how things work, but to build things of my own.</p>
              <p>I also enjoy coding and experimenting with JavaScript to bring my ideas to life. These days, though, I don’t get as much screen time as I used to, so I like to joke that I only retain about 20% of my coding skills. But I still enjoy building things whenever I get the chance.</p>
              <p>Professionally, I’m pursuing a career in the transportation industry, currently working as a facility supervisor. My work sits at the intersection of engineering, operations, and problem-solving—areas where I’m constantly learning something new.</p>
              <p>The past few years have also been a journey of recovery and rebuilding. Now, I’m looking forward to challenging myself again through running, cycling, and eventually joining a marathon. More than just a race, I see these challenges as a way to remind myself that the body and mind are capable of recovering, adapting, and becoming stronger.</p>
              <p>And somewhere between building things, fixing things, running, and figuring out what comes next, I’m still searching for the meaning of life. I haven’t found the answer yet.</p>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="interior-panel overflow-hidden rounded-2xl p-3 sm:p-4">
              <Image
                src={portraitImage}
                alt="Portrait of Winaldo"
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 28rem, 100vw"
                className="aspect-[4/4.3] w-full rounded-xl object-cover"
                priority
              />
              <div className="flex items-center gap-2 px-2 pb-1 pt-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <MapPin size={15} aria-hidden="true" className="text-teal-600 dark:text-teal-400" />
                Tangerang, Indonesia
              </div>
            </div>

            <div className="interior-panel rounded-2xl p-6">
              <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Find me elsewhere</h2>
              <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">Other places to follow along or say hello.</p>
              <ul role="list" className="mt-5 space-y-1">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <Link href={href} target="_blank" rel="noopener noreferrer" className="about-social-link group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                      <Icon className="h-5 w-5 shrink-0 fill-current text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                      <span className="flex-1">{label}</span>
                      <ArrowUpRight size={16} className="text-teal-600 dark:text-teal-400" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                <li className="border-t border-zinc-200 pt-3 dark:border-zinc-700/70">
                  <Link href="mailto:winaldo.dump@gmail.com" className="about-social-link group flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    <Mail size={19} className="shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                    <span className="min-w-0 flex-1 break-all">winaldo.dump@gmail.com</span>
                    <ArrowUpRight size={16} className="shrink-0 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
