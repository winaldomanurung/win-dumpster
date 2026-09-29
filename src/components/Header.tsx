'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel, PopoverBackdrop } from '@headlessui/react'
import { ArrowUpRight, ChevronDown, Moon, Sun, X } from 'lucide-react'
import { Container } from '@/components/Container'
import avatarImage from '@/images/avatar.jpg'

const navigation = [
  { href: '/about', label: 'About' },
  { href: '/articles', label: 'Articles' },
  { href: '/projects', label: 'Projects' },
  { href: '/uses', label: 'Uses' },
]

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + '/')
}

function HomeAvatar() {
  return (
    <Link
      href="/"
      aria-label="Go to homepage"
      className="site-home-avatar group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-500 sm:h-12 sm:w-12"
    >
      <Image
        src={avatarImage}
        alt="Winaldo Manurung — Home"
        sizes="48px"
        className="h-full w-full rounded-full object-cover"
        priority
      />
      <span aria-hidden="true" className="site-home-avatar-ring absolute -inset-1 rounded-full border border-teal-500/25" />
    </Link>
  )
}

function DesktopNavigation({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Main navigation" className="hidden md:block">
      <ul className="site-nav-shell flex items-center gap-1 rounded-full p-1.5">
        {navigation.map(({ href, label }) => {
          const active = isActivePath(pathname, href)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`site-nav-item relative inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-teal-500 ${active ? 'site-nav-item-active' : ''}`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function MobileNavigation({ pathname }: { pathname: string }) {
  return (
    <Popover className="relative md:hidden">
      {({ close }) => (
        <>
          <PopoverButton className="site-nav-shell inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-zinc-800 outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-500 dark:text-zinc-100">
            Menu <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
          </PopoverButton>
          <PopoverBackdrop
            transition
            className="fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-sm transition duration-200 data-closed:opacity-0"
          />
          <PopoverPanel
            focus
            transition
            className="site-mobile-panel absolute right-0 top-14 z-[60] w-[min(19rem,calc(100vw-2rem))] origin-top-right rounded-2xl p-3 shadow-2xl transition duration-200 data-closed:scale-95 data-closed:opacity-0"
          >
            <div className="mb-2 flex items-center justify-between px-3 py-2">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-zinc-500 dark:text-zinc-400">Navigation</span>
              <button type="button" onClick={() => close()} aria-label="Close menu" className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <X size={17} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              <ul className="space-y-1">
                {navigation.map(({ href, label }) => {
                  const active = isActivePath(pathname, href)
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => close()}
                        className={`site-mobile-nav-item flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium ${active ? 'site-mobile-nav-item-active' : ''}`}
                      >
                        {label}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme` : 'Toggle theme'}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="site-theme-button flex h-11 w-11 items-center justify-center rounded-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-500"
    >
      {mounted && resolvedTheme === 'dark' ? <Moon size={19} strokeWidth={1.8} aria-hidden="true" /> : <Sun size={19} strokeWidth={1.8} aria-hidden="true" />}
    </button>
  )
}

export function Header() {
  const pathname = usePathname()

  return (
    <header className="site-header sticky top-0 z-50 w-full shrink-0">
      <Container>
        <div className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center gap-2 sm:h-[86px] sm:gap-4">
          <div className="flex min-w-0 justify-start">
            <HomeAvatar />
          </div>
          <div className="flex justify-center">
            <DesktopNavigation pathname={pathname} />
            <MobileNavigation pathname={pathname} />
          </div>
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  )
}
