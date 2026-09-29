import type { Metadata } from 'next'
import { Camera, Code2, Laptop2, Wrench, type LucideIcon } from 'lucide-react'
import { Container } from '@/components/Container'
import { InteriorPageHeader } from '@/components/InteriorPageHeader'

type Tool = { title: string; description: string }
type ToolGroup = { title: string; description: string; icon: LucideIcon; tools: Tool[] }

const groups: ToolGroup[] = [
  {
    title: 'Workstation',
    description: 'The everyday desk setup.',
    icon: Laptop2,
    tools: [
      { title: 'Custom PC', description: 'My main workstation for coding, editing, and whatever else I happen to be working on. 1TB of storage, 16GB of RAM, and an NVIDIA GeForce RTX 4050 doing most of the heavy lifting.' },
      { title: 'ASUS TUF FX506LH', description: 'My trusty laptop for when I need to take the work somewhere else. Not the newest machine in the room, but it still gets the job done.' },
      { title: 'ViewSonic VA2432', description: 'My primary monitor. Mostly occupied by code, documentation, browser tabs, and an unreasonable number of things I swear I am going to read later.' },
      { title: 'Samsung S24R350', description: 'The second screen that makes me wonder how I ever worked with just one. Perfect for keeping documentation, terminals, dashboards, and random distractions within reach.' },
      { title: 'Logitech K120', description: 'Nothing fancy, just a keyboard that works. Sometimes the best tool is the one you never have to think about.' },
      { title: 'Logitech M650', description: 'My everyday mouse. Quiet, comfortable, and boring in exactly the way a mouse should be.' },
      { title: 'Soundcore Space One', description: 'My way of creating a little bubble of focus when the world gets too loud. Useful for work, music, and pretending I cannot hear another notification.' },
    ],
  },
  {
    title: 'Tech stack',
    description: 'The tools behind the websites.',
    icon: Code2,
    tools: [
      { title: 'Next.js', description: 'My weapon of choice for building websites. It gives me React, routing, server-side rendering, and pretty much everything else I need without having to glue together a dozen different libraries.' },
      { title: 'Vercel', description: 'Where I send my code and hope everything works. Deploying a Next.js project is ridiculously easy, and the preview deployments alone make experimenting with new ideas much less painful.' },
      { title: 'Notion', description: 'My surprisingly capable content management system. I use it to write and manage blog posts, while my website handles the rest. No custom admin dashboard required.' },
    ],
  },
  {
    title: 'Creative work',
    description: 'For capturing moments worth keeping.',
    icon: Camera,
    tools: [
      { title: 'DJI Osmo Pocket 3', description: 'My pocket-sized camera for capturing everyday moments without carrying an entire camera bag. Small enough to bring everywhere, capable enough that I actually want to use it.' },
      { title: 'DJI Osmo Nano', description: 'My tiny camera for moments where even the Pocket 3 feels like too much gear. The goal is simple: keep the camera with me and worry less about getting the perfect setup.' },
      { title: 'DJI Osmo Action 5 Pro', description: 'My choice when things get a little more adventurous. Built for cycling, outdoor activities, and anything where dropping, shaking, or getting wet is part of the plan.' },
    ],
  },
  {
    title: 'Sport equipment',
    description: 'For getting away from the screen.',
    icon: Wrench,
    tools: [
      { title: 'Element Gravel Montreal 700C', description: 'My escape vehicle. Mostly for long rides, exploring new roads, and convincing myself that getting lost counts as a training session.' },
      { title: 'Adidas Adizero Boston', description: 'My go-to running shoe when I want to pick up the pace. Fast enough for workouts, comfortable enough for everyday miles.' },
      { title: 'New Balance 1080', description: 'The comfort machine. My choice for easy and long runs when the only thing I want to think about is putting one foot in front of the other.' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Uses',
  description: 'Things I use, gadgets I love, and stuff I recommend.',
  alternates: { canonical: '/uses' },
}

export default function Uses() {
  return (
    <>
      <InteriorPageHeader
        eyebrow="The everyday toolkit"
        title="Things I use"
        description="A living inventory of the tools that make the work and the adventures a little easier."
        icon={<Wrench size={16} strokeWidth={1.8} aria-hidden="true" />}
      />
      <Container className="mt-10 sm:mt-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-5 dark:border-zinc-700/70">
          <p className="text-xs font-semibold uppercase tracking-[.17em] text-teal-600 dark:text-teal-400">My everyday essentials</p>
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{groups.reduce((sum, group) => sum + group.tools.length, 0)} items / {groups.length} collections</span>
        </div>
        <div className="space-y-9 sm:space-y-12">
          {groups.map((group, index) => {
            const Icon = group.icon
            return (
              <section key={group.title} aria-labelledby={`uses-group-${index}`} className="interior-panel rounded-2xl p-5 sm:p-7">
                <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-700/70">
                  <span className="interior-tool-icon flex h-11 w-11 items-center justify-center rounded-xl">
                    <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 id={`uses-group-${index}`} className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{group.title}</h2>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{group.description}</p>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{String(group.tools.length).padStart(2, '0')} items</span>
                </div>
                <ul className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                  {group.tools.map((tool) => (
                    <li key={tool.title} className="interior-tool-item rounded-xl p-4">
                      <h3 className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{tool.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{tool.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </Container>
    </>
  )
}
