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
import {
  getLaunchpadGuideArticles,
  getLaunchpadProgram,
  getLaunchpadTool,
  launchpadGuideCollections,
} from "@/lib/launchpad"

export const metadata: Metadata = {
  title: "Your Next Move guides",
  description:
    "Guide paths for delivery drag, fragile systems, integration pressure, and AI readiness.",
  alternates: {
    canonical: "/next-move/guides",
  },
}

export default function LaunchpadGuidesPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <PageHero
          eyebrow="Guide paths"
          scale="medium"
          tone="plain"
          title={
            <h1 className="max-w-[20ch]">
              Execution pressure is rising.{" "}
              <span className="hero-title-accent">Start with the right guide.</span>
            </h1>
          }
          support="Each guide path includes three practical reads and one clear next action."
          helper="Use these when you want a tighter reading path before jumping into a tool or support conversation."
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
                  label: "Built for",
                  value: "Pattern recognition",
                  detail: "Each path bundles the most useful adjacent reading around one kind of execution pressure.",
                },
                {
                  label: "How to use them",
                  value: "Read, then act",
                  detail: "Every guide path ends with one diagnostic or support move so the reading does not stay abstract.",
                },
                {
                  label: "Best next step",
                  value: "Move into a tool or program",
                  detail: "Use the reading to sharpen the next decision, not to delay it.",
                },
              ]}
            />
          }
        />

        <section className="section-space">
          <div className="container-site space-y-6">
            {launchpadGuideCollections.map((collection) => {
              const articles = getLaunchpadGuideArticles(collection)
              const relatedTool = getLaunchpadTool(collection.relatedTool)
              const relatedProgram = getLaunchpadProgram(collection.relatedProgram)

              return (
                <Card key={collection.id} variant="primary" className="p-6 md:p-8">
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                    <div>
                      <h2 className="text-3xl font-semibold">{collection.title}</h2>
                      <p className="mt-4 text-sm text-[var(--color-text-muted)]">{collection.description}</p>
                      <TrackedLink
                        href={`/next-move/${relatedTool.slug}`}
                        eventName="launchpad_path_click"
                        eventData={{ source: "launchpad_guides_refined", target: relatedTool.id }}
                        className="mt-5 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-[var(--color-accent-strong)]"
                      >
                        Open diagnostic
                        <ArrowRight className="h-4 w-4" />
                      </TrackedLink>
                    </div>

                    <div className="space-y-3">
                      {articles.map((article) => (
                        <TrackedLink
                          key={article.slug}
                          href={`/research/${article.slug}`}
                          eventName="launchpad_path_click"
                          eventData={{ source: "launchpad_guides_refined", target: article.slug }}
                          className="interactive block rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4"
                        >
                          <p className="text-lg font-semibold text-[var(--color-text)]">{article.title}</p>
                          <p className="mt-2 text-sm text-[var(--color-text-muted)]">{article.description}</p>
                        </TrackedLink>
                      ))}

                      <div className="tile-utility p-4">
                        <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">If this points to deeper support</p>
                        <p className="mt-2 text-sm text-[var(--color-text)]">{relatedProgram.description}</p>
                        <TrackedLink
                          href={relatedProgram.href}
                          eventName="launchpad_path_click"
                          eventData={{ source: "launchpad_guides_refined", target: relatedProgram.id }}
                          className="mt-3 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-[var(--color-accent-strong)]"
                        >
                          {relatedProgram.ctaLabel}
                          <ArrowRight className="h-4 w-4" />
                        </TrackedLink>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        <FinalCtaBand
          headline="Need a direct recommendation?"
          support="If you want to validate the guide path quickly, share your context and get a recommendation."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  )
}





