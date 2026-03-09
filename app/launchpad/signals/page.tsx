import { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { ContextualTestimonial } from "@/components/contextual-testimonial"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { SignalsSubscribeForm } from "@/components/signals-subscribe-form"
import { TrackedLink } from "@/components/tracked-link"
import { getLaunchpadSignalArticles } from "@/lib/launchpad"

export const metadata: Metadata = {
  title: "Launchpad Signals",
  description:
    "Subscribe for practical updates on systems clarity, execution drag, architecture choices, and decision quality.",
  alternates: {
    canonical: "/launchpad/signals",
  },
}

export default function LaunchpadSignalsPage() {
  const signalArticles = getLaunchpadSignalArticles()

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-24">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute left-8 top-20 h-56 w-56 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                Launchpad Signals
              </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl">
                Practical signal for leaders navigating systems complexity
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Useful updates on delivery drag, architecture decisions, and what to do next.
              </p>
            </div>
            <div className="rounded-[30px] border border-border bg-foreground p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Subscribe
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-background">
                Get practical updates
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-background/72">
                Useful notes on systems clarity, architecture choices, and what to do next when complexity is slowing the business.
              </p>
              <SignalsSubscribeForm
                source="launchpad_signals_page"
                buttonLabel="Subscribe for signal"
                className="mt-6 space-y-4"
              />
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                Recent signal
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Start with the notes most useful to teams carrying complexity now
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {signalArticles.map((article) => (
                <TrackedLink
                  key={article.slug}
                  href={`/knowledge/${article.slug}`}
                  eventName="launchpad_path_click"
                  eventData={{ source: "launchpad_signals_page", target: article.slug }}
                  className="rounded-[28px] border border-border bg-background p-7 transition-colors hover:border-teal/35"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                    Signal preview
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-foreground">{article.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {article.description}
                  </p>
                </TrackedLink>
              ))}
            </div>
            <div className="mt-8">
              <TrackedLink
                href="/knowledge"
                eventName="launchpad_path_click"
                eventData={{ source: "launchpad_signals_page", target: "knowledge" }}
                className="inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
              >
                Explore knowledge
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </section>

        <ContextualTestimonial
          className="deferred-section border-t border-border py-20 lg:py-24"
          eyebrow="Client perspective"
          title="Signal that teams describe as practical, not performative"
          testimonialId="fitzmier-jtf"
        />
      </main>
      <Footer />
    </>
  )
}
