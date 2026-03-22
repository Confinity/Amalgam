import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/heroes/PageHero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { RouteHighlightsStrip } from "@/components/sections/RouteHighlightsStrip"
import { SignalsSubscribeForm } from "@/components/signals-subscribe-form"
import { TrackedLink } from "@/components/tracked-link"
import { getLaunchpadSignalArticles } from "@/lib/launchpad"

export const metadata: Metadata = {
  title: "Your Next Move signals",
  description:
    "Short practical updates on execution, architecture, and the next move under pressure.",
  alternates: {
    canonical: "/next-move/signals",
  },
}

export default function LaunchpadSignalsPage() {
  const signalArticles = getLaunchpadSignalArticles()

  return (
    <>
      <Navigation />
      <main id="main-content">
        <PageHero
          eyebrow="Signals"
          scale="medium"
          tone="plain"
          title={
            <h1 className="max-w-[20ch]">
              Want practical notes you can use <span className="hero-title-accent">this quarter?</span>
            </h1>
          }
          support="Short practical updates on execution pressure, architecture decisions, and what to do next."
          helper="Short enough to be useful, concrete enough to shape a real next move."
          actions={
            <>
              <Button href="#signals-subscribe" withArrow>
                Subscribe for practical updates
              </Button>
              <Button href="/research" variant="secondary">
                Browse research
              </Button>
            </>
          }
          afterContent={
            <RouteHighlightsStrip
              items={[
                {
                  label: "Cadence",
                  value: "1 to 2 useful notes per month",
                  detail: "The intent is signal, not inbox volume.",
                },
                {
                  label: "Coverage",
                  value: "Execution, architecture, and operating pressure",
                  detail: "We focus on the decisions teams actually have to make under complexity.",
                },
                {
                  label: "Best next step",
                  value: "Read one, then act",
                  detail: "If a note matches your pressure, move into the related tool or support path instead of just saving it for later.",
                },
              ]}
            />
          }
        />

        <section id="signals-subscribe" className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-dark)]">
          <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div>
              <h2 className="text-[var(--color-text-inverse)]">Get updates you can actually use</h2>
              <p className="mt-4 max-w-2xl text-base text-[color-mix(in_srgb,var(--color-text-inverse)_78%,transparent)]">
                Useful notes on system health, architecture decisions, and what to do next when complexity slows progress.
              </p>
              <p className="mt-2 text-sm text-[color-mix(in_srgb,var(--color-text-inverse)_60%,transparent)]">
                1-2 useful notes per month. No noise.
              </p>
            </div>
            <div className="panel-surface border-[color-mix(in_srgb,var(--color-text-inverse)_18%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-dark)_88%,white_12%)] p-6">
              <SignalsSubscribeForm
                source="launchpad_signals_page_refined"
                buttonLabel="Subscribe for practical updates"
              />
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container-site">
            <h2>Start with these notes</h2>
            <p className="mt-4 max-w-2xl text-base">Start with notes teams are using right now.</p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {signalArticles.map((article) => (
                <Card
                  key={article.slug}
                  as={TrackedLink}
                  href={`/research/${article.slug}`}
                  eventName="launchpad_path_click"
                  eventData={{ source: "launchpad_signals_refined", target: article.slug }}
                  interactive
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">Note preview</p>
                  <h3 className="mt-3 text-2xl font-semibold">{article.title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-text-muted)]">{article.description}</p>
                </Card>
              ))}
            </div>

            <TrackedLink
              href="/research"
              eventName="launchpad_path_click"
              eventData={{ source: "launchpad_signals_refined", target: "research" }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-strong)]"
            >
              Browse research
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </section>

        <FinalCtaBand
          headline="Need direct support instead of updates?"
          support="Share your context and we will recommend the clearest next step for your current pressure."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  )
}





