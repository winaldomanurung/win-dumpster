import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Things I use, gadgets I love, and stuff I recommend.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Things I use, gadgets I love, and stuff I recommend."
      intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my stuff."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="Custom PC">
            My main workstation for coding, editing, and whatever else I happen
            to be working on. 1TB of storage, 16GB of RAM, and an NVIDIA GeForce
            RTX 4050 doing most of the heavy lifting.
          </Tool>

          <Tool title="ASUS TUF FX506LH">
            My trusty laptop for when I need to take the work somewhere else.
            Not the newest machine in the room, but it still gets the job done.
          </Tool>

          <Tool title="ViewSonic VA2432">
            My primary monitor. Mostly occupied by code, documentation, browser
            tabs, and an unreasonable number of things I swear I am going to
            read later.
          </Tool>

          <Tool title="Samsung S24R350">
            The second screen that makes me wonder how I ever worked with just
            one. Perfect for keeping documentation, terminals, dashboards, and
            random distractions within reach.
          </Tool>

          <Tool title="Logitech K120">
            Nothing fancy, just a keyboard that works. Sometimes the best tool
            is the one you never have to think about.
          </Tool>

          <Tool title="Logitech M650">
            My everyday mouse. Quiet, comfortable, and boring in exactly the way
            a mouse should be.
          </Tool>

          <Tool title="Soundcore Space One">
            My way of creating a little bubble of focus when the world gets too
            loud. Useful for work, music, and pretending I cannot hear another
            notification.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Tech-Stack">
          <Tool title="Next.js">
            My weapon of choice for building websites. It gives me React,
            routing, server-side rendering, and pretty much everything else I
            need without having to glue together a dozen different libraries.
          </Tool>

          <Tool title="Vercel">
            Where I send my code and hope everything works. Deploying a Next.js
            project is ridiculously easy, and the preview deployments alone make
            experimenting with new ideas much less painful.
          </Tool>

          <Tool title="Notion">
            My surprisingly capable content management system. I use it to write
            and manage blog posts, while my website handles the rest. No custom
            admin dashboard required.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Creative Work">
          <Tool title="DJI Osmo Pocket 3">
            My pocket-sized camera for capturing everyday moments without
            carrying an entire camera bag. Small enough to bring everywhere,
            capable enough that I actually want to use it.
          </Tool>

          <Tool title="DJI Osmo Nano">
            My tiny camera for moments where even the Pocket 3 feels like too
            much gear. The goal is simple: keep the camera with me and worry
            less about getting the perfect setup.
          </Tool>

          <Tool title="DJI Osmo Action 5 Pro">
            My choice when things get a little more adventurous. Built for
            cycling, outdoor activities, and anything where dropping, shaking,
            or getting wet is part of the plan.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Sport Equipment">
          <Tool title="Element Gravel Montreal 700C">
            My escape vehicle. Mostly for long rides, exploring new roads, and
            convincing myself that getting lost counts as a training session.
          </Tool>

          <Tool title="Adidas Adizero Boston">
            My go-to running shoe when I want to pick up the pace. Fast enough
            for workouts, comfortable enough for everyday miles.
          </Tool>

          <Tool title="New Balance 1080">
            The comfort machine. My choice for easy and long runs when the only
            thing I want to think about is putting one foot in front of the
            other.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
