import { Metadata } from "next"
import { ArrowRight, Compass, Sparkles, Wrench } from "lucide-react"
import { ContextualTestimonial } from "@/components/contextual-testimonial"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { SignalsSubscribeForm } from "@/components/signals-subscribe-form"
import { TrackedLink } from "@/components/tracked-link"
import {
  getFeaturedLaunchpadGuides,
  getFeaturedLaunchpadTools,
  getLaunchpadGuideArticles,
  getLaunchpadSignalArticles,
  launchpadPaths,
  launchpadPrograms,
} from "@/lib/launchpad"

export const metadata: Metadata = {
  title: "Launchpad",
  description:
    "Tools and guidance for teams dealing with delivery drag, systems complexity, and next-step decisions.",
  alternates: {
    canonical: "/launchpad",
  },
}

export default function LaunchpadPage() {
  const tools = getFeaturedLaunchpadTools()
  const guideCollections = getFeaturedLaunchpadGuides()
  const signalArticles = getLaunchpadSignalArticles()

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-28">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute left-0 top-16 h-64 w-64 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                Launchpad
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Tools and guidance for teams dealing with delivery drag
              </h1>
              <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-muted-foreground">
                Self-locate quickly, test what is causing drag, and pick the next move with confidence.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <TrackedLink
                  href="/launchpad/tools"
                  eventName="launchpad_path_click"
                  eventData={{ source: "launchpad_hero", target: "tools" }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
                >
                  Start with a diagnostic
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  href="/launchpad/guides"
                  eventName="launchpad_path_click"
                  eventData={{ source: "launchpad_hero", target: "guides_index" }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Browse practical guides
                </TrackedLink>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Best when you want clearer signal before deciding what help you need.
              </p>
            </div>

            <div className="support-panel rounded-[30px] p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                What Launchpad is for
              </p>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>Structured self-location for teams carrying real systems complexity.</p>
                <p>Diagnostics and field guides that deliver value before contact.</p>
                <p>Clear escalation into a strategy call when deeper support is needed.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="deferred-section section-warm py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                Choose your path
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Pick the path that matches your situation
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Pick a route into the right tool, guide set, program, or conversation.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {launchpadPaths.map((path) => (
                <TrackedLink
                  key={path.title}
                  href={path.href}
                  eventName="launchpad_path_click"
                  eventData={{ source: "launchpad_paths", target: path.title }}
                  className="support-panel flex h-full flex-col rounded-[28px] p-6 transition-colors hover:border-teal/35"
                >
                  <h3 className="text-xl font-semibold text-foreground">{path.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {path.description}
                  </p>
                  <p className="mt-5 text-sm font-medium text-teal">{path.nextStep}</p>
                </TrackedLink>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section border-y border-border bg-secondary/35 py-24 lg:py-28">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                  Featured tools
                </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Use these tools to pressure-test the situation before committing
              </h2>
              </div>
              <TrackedLink
                href="/launchpad/tools"
                eventName="launchpad_path_click"
                eventData={{ source: "launchpad_featured_tools", target: "tools_index" }}
                className="inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
              >
                See all diagnostics
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {tools.map((tool) => (
                <div key={tool.id} className="support-panel flex h-full flex-col rounded-[30px] p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background text-teal">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        {tool.kicker}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-foreground">{tool.title}</h3>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>
                  <dl className="mt-6 space-y-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Who it&apos;s for</dt>
                      <dd className="mt-1 text-foreground">{tool.audience}</dd>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-muted-foreground">Time</dt>
                        <dd className="mt-1 text-foreground">{tool.estimatedTime}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Output</dt>
                        <dd className="mt-1 text-foreground">{tool.outputLabel}</dd>
                      </div>
                    </div>
                  </dl>
                  <TrackedLink
                    href={`/launchpad/${tool.slug}`}
                    eventName="launchpad_path_click"
                    eventData={{ source: "launchpad_featured_tools", target: tool.id }}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                  >
                    Start diagnostic
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section section-warm py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                  Featured guides
                </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Practical guide groupings for the pressure points teams usually carry
              </h2>
              </div>
              <TrackedLink
                href="/launchpad/guides"
                eventName="launchpad_path_click"
                eventData={{ source: "launchpad_guides", target: "guides_index" }}
                className="inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
              >
                Browse all guide paths
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {guideCollections.map((collection) => {
                const articles = getLaunchpadGuideArticles(collection).slice(0, 3)

                return (
                  <div key={collection.id} className="rounded-[28px] border border-border bg-background p-7">
                    <h3 className="text-2xl font-semibold text-foreground">{collection.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {collection.description}
                    </p>
                    <div className="mt-6 space-y-3">
                      {articles.map((article) => (
                        <TrackedLink
                          key={article.slug}
                          href={`/knowledge/${article.slug}`}
                          eventName="launchpad_path_click"
                          eventData={{ source: "launchpad_guides", target: article.slug }}
                          className="block rounded-[22px] border border-border bg-secondary/20 px-5 py-4 transition-colors hover:border-teal/35"
                        >
                          <p className="text-sm font-semibold text-foreground">{article.title}</p>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {article.description}
                          </p>
                        </TrackedLink>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="deferred-section border-y border-border bg-secondary/40 py-24 lg:py-28">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                  Programs
                </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                If the tool or guide points to deeper work, this is how the work usually begins
              </h2>
              </div>
              <TrackedLink
                href="/launchpad/programs"
                eventName="launchpad_path_click"
                eventData={{ source: "launchpad_programs", target: "programs_index" }}
                className="inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
              >
                See how we can help
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {launchpadPrograms.map((program) => (
                <div
                  key={program.id}
                  className={`flex h-full flex-col rounded-[30px] p-8 ${
                    program.featured
                      ? "border border-teal/45 bg-background shadow-[0_14px_30px_rgba(0,191,166,0.08)]"
                      : "support-panel"
                  }`}
                >
                  {program.featured ? (
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                      Best starting point
                    </p>
                  ) : null}
                  <h3 className="mt-4 text-2xl font-semibold text-foreground">{program.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-foreground/75">
                    {program.whenItsRight}
                  </p>
                  <TrackedLink
                    href={program.href}
                    eventName="launchpad_path_click"
                    eventData={{ source: "launchpad_programs", target: program.id }}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                  >
                    {program.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="support-panel rounded-[30px] p-8">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-teal">
                Partner paths
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-foreground text-balance">
                Not every next step sits inside Amalgam&apos;s core work
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                If the right move sits adjacent to our core work, we can point you to the right intro or next step.
              </p>
            </div>
            <div className="rounded-[30px] border border-border bg-background p-7">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                When this helps
              </p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>Need a direct read on whether the issue is diagnostic, executional, or partner-led.</p>
                <p>Need an adjacent introduction after the situation is legible enough to hand off cleanly.</p>
                <p>Need a human answer on what should happen next when the path is not obvious yet.</p>
              </div>
              <TrackedLink
                href="/contact"
                eventName="launchpad_path_click"
                eventData={{ source: "launchpad_partner_paths", target: "contact" }}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </section>

        <section className="deferred-section py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="support-panel rounded-[30px] p-8">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-teal">
                Signals
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-foreground text-balance">
                Practical signal for leaders and teams carrying systems complexity
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                Notes on delivery drag, architecture decisions, and next-step judgment under pressure.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {signalArticles.map((article) => (
                  <TrackedLink
                    key={article.slug}
                    href={`/knowledge/${article.slug}`}
                    eventName="launchpad_path_click"
                    eventData={{ source: "launchpad_signals", target: article.slug }}
                    className="rounded-[24px] border border-border bg-background px-5 py-5 transition-colors hover:border-teal/35"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                      Signal preview
                    </p>
                    <p className="mt-3 text-lg font-semibold text-foreground">{article.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {article.description}
                    </p>
                  </TrackedLink>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-border bg-foreground p-8">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-teal" />
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Subscribe
                </p>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-background">
                Get practical Launchpad signal
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-background/72">
                Useful notes on systems clarity, execution drag, and next moves when complexity slows the business down.
              </p>
              <SignalsSubscribeForm
                source="launchpad_page"
                buttonLabel="Subscribe for signal"
                className="mt-6 space-y-4"
              />
              <TrackedLink
                href="/launchpad/signals"
                eventName="launchpad_path_click"
                eventData={{ source: "launchpad_signals", target: "signals_page" }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-background"
              >
                Explore the signals layer
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </section>

        <ContextualTestimonial
          className="deferred-section border-t border-border py-20 lg:py-24"
          eyebrow="Client perspective"
          title="What teams say after using practical diagnostics first"
          testimonialId="mendez-pearlx"
        />

        <section className="deferred-section bg-foreground py-20 lg:py-24">
          <div className="mx-auto max-w-[900px] px-6 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Best next step
            </p>
              <h2 className="text-3xl font-semibold text-background text-balance md:text-4xl">
                Launchpad helps you get clear quickly. If deeper help is needed, start with a strategy call.
              </h2>
            <p className="mx-auto mt-4 max-w-2xl text-background/72">
              Use the tools and guides first. If the problem needs direct diagnosis, we will point you to the right engagement.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <TrackedLink
                href="/contact?interest=strategy-session"
                eventName="launchpad_path_click"
                eventData={{ source: "launchpad_final_cta", target: "strategy_call" }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
              >
                Book a free strategy call
                <Compass className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/contact"
                eventName="launchpad_path_click"
                eventData={{ source: "launchpad_final_cta", target: "contact" }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-background/20 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
              >
                Start a conversation
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
