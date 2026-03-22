import type { Metadata } from "next"
import { ArrowRight, TimerReset, Wrench } from "lucide-react"
import { PageHero } from "@/components/heroes/PageHero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RouteHighlightsStrip } from "@/components/sections/RouteHighlightsStrip"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { TrackedLink } from "@/components/tracked-link"
import { getFeaturedLaunchpadTools } from "@/lib/launchpad"

export const metadata: Metadata = {
  title: "Your Next Move tools",
  description:
    "Practical diagnostics for delivery friction, AI readiness, and tech-stack risk.",
  alternates: {
    canonical: "/next-move/tools",
  },
}

export default function LaunchpadToolsPage() {
  const tools = getFeaturedLaunchpadTools()

  return (
    <>
      <Navigation />
      <main id="main-content">
        <PageHero
          eyebrow="Your Next Move tools"
          scale="medium"
          tone="plain"
          title={
            <h1 className="max-w-[20ch]">
              Not sure where to start? <span className="hero-title-accent">Start with a quick diagnostic.</span>
            </h1>
          }
          support="Each tool gives you a structured first-pass read and a practical next step."
          helper="Use these when the pressure is real but the root cause or best first move still needs sharper definition."
          actions={
            <>
              <Button href="/next-move" withArrow>
                Find your next move
              </Button>
              <Button href="/contact" variant="secondary">
                Get a recommendation
              </Button>
            </>
          }
          afterContent={
            <RouteHighlightsStrip
              items={[
                {
                  label: "Best for",
                  value: "Early diagnosis",
                  detail: "Use the tools before the business commits to a path it does not fully trust yet.",
                },
                {
                  label: "How long it takes",
                  value: "About 5 minutes",
                  detail: "Short enough to run in one sitting and share back with the team immediately.",
                },
                {
                  label: "What you leave with",
                  value: "One practical next move",
                  detail: "Each tool points to a likely profile, the first actions to take, and the clearest follow-on path.",
                },
              ]}
            />
          }
        />

        <section className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <Card variant="primary" className="p-6 md:p-7">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">How the tools help</p>
              <p className="mt-3 text-sm text-[var(--color-text)]">
                Answer 5 questions, see your likely profile, then choose a self-serve path or direct support.
              </p>
            </Card>
          </div>
        </section>

        <section className="section-space">
          <div className="container-site grid gap-5 xl:grid-cols-3">
            {tools.map((tool) => (
              <Card key={tool.id} interactive className="flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <div className="tile-utility flex h-11 w-11 items-center justify-center rounded-2xl">
                    <Wrench className="h-5 w-5 text-[var(--color-accent-strong)]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">{tool.kicker}</p>
                    <h2 className="mt-1 text-2xl font-semibold">{tool.title}</h2>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">{tool.description}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="tile-utility p-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Who this is for</p>
                    <p className="mt-2 text-sm text-[var(--color-text)]">{tool.audience}</p>
                  </div>
                  <div className="tile-utility p-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Output</p>
                    <p className="mt-2 text-sm text-[var(--color-text)]">{tool.outputLabel}</p>
                    <p className="mt-2 inline-flex items-center gap-2 text-xs text-[var(--color-accent-strong)]">
                      <TimerReset className="h-3.5 w-3.5" />
                      {tool.estimatedTime}
                    </p>
                  </div>
                </div>

                <TrackedLink
                  href={`/next-move/${tool.slug}`}
                  eventName="launchpad_path_click"
                  eventData={{ source: "launchpad_tools_index_refined", target: tool.id }}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-[var(--color-accent-strong)]"
                >
                  Open assessment
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </Card>
            ))}
          </div>
        </section>

        <FinalCtaBand
          headline="Need help interpreting the result?"
          support="Share your context and we will validate the diagnostic with your actual context."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  )
}



