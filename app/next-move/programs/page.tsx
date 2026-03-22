import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/heroes/PageHero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RouteHighlightsStrip } from "@/components/sections/RouteHighlightsStrip"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { TrackedLink } from "@/components/tracked-link"
import { launchpadPrograms } from "@/lib/launchpad"

export const metadata: Metadata = {
  title: "Your Next Move programs",
  description:
    "Choose Founder Review, Focused Intervention, or Outcome Partnership based on what your team needs right now.",
  alternates: {
    canonical: "/next-move/programs",
  },
}

const decisionMap = [
  {
    title: "Need clarity first",
    description: "If clarity is low and the system still needs a direct read, start with Founder Review.",
    href: "/founder-review",
  },
  {
    title: "Need planning support",
    description: "If direction is mostly clear but sequencing is weak, move into Focused Intervention.",
    href: "/focused-intervention",
  },
  {
    title: "Need execution continuity",
    description: "If plans exist and follow-through is the risk, use Outcome Partnership.",
    href: "/outcome-partnership",
  },
]

export default function LaunchpadProgramsPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <PageHero
          eyebrow="Support paths"
          scale="medium"
          tone="plain"
          title={
            <h1 className="max-w-[18ch]">
              Self-serve not enough?{" "}
              <span className="hero-title-accent">Choose the support level that fits now.</span>
            </h1>
          }
          support="Choose based on what you need most now: clarity, sequencing, or execution continuity."
          helper="The strongest choice depends on whether the main need is diagnosis, a focused intervention, or steadier continuity inside live work."
          actions={
            <>
              <Button href="/contact" withArrow>
                Get a recommendation
              </Button>
              <Button href="/next-move" variant="secondary">
                Find your next move
              </Button>
            </>
          }
          afterContent={
            <RouteHighlightsStrip
              items={[
                {
                  label: "If clarity is low",
                  value: "Start with Founder Review",
                  detail: "Use this when the business still needs a direct read on the real blocker.",
                  href: "/founder-review",
                },
                {
                  label: "If the bottleneck is known",
                  value: "Move into Focused Intervention",
                  detail: "Use this when the problem is visible and the work needs sharper sequence fast.",
                  href: "/focused-intervention",
                },
                {
                  label: "If the work is already active",
                  value: "Choose Outcome Partnership",
                  detail: "Use this when continuity, unblockers, and senior judgment need to stay in the loop.",
                  href: "/outcome-partnership",
                },
              ]}
            />
          }
        />

        <section className="section-space">
          <div className="container-site grid gap-5 lg:grid-cols-3">
            {launchpadPrograms.map((program) => (
              <Card key={program.id} variant={program.featured ? "primary" : "secondary"} interactive className="flex h-full flex-col">
                {program.featured ? (
                  <span className="w-fit rounded-full border border-[color-mix(in_srgb,var(--color-accent-strong)_30%,transparent)] bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">
                    Recommended first move
                  </span>
                ) : null}
                <h2 className="mt-4 text-2xl font-semibold">{program.title}</h2>
                <p className="mt-3 text-sm text-[var(--color-text-muted)]">{program.description}</p>
                <p className="mt-3 text-sm text-[var(--color-text)]">{program.whenItsRight}</p>
                <div className="flex-1" />
                <TrackedLink
                  href={program.href}
                  eventName="launchpad_path_click"
                  eventData={{ source: "launchpad_programs_refined", target: program.id }}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-[var(--color-accent-strong)]"
                >
                  {program.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <h2>Choose based on the operating need</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {decisionMap.map((item) => (
                <Card key={item.title} as={TrackedLink} href={item.href} eventName="launchpad_path_click" eventData={{ source: "launchpad_programs_decision_refined", target: item.title }} interactive>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-text-muted)]">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-strong)]">
                    See how we work
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <FinalCtaBand
          headline="Want help choosing the right level?"
          support="Share your context and we will recommend the most useful support path."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  )
}



