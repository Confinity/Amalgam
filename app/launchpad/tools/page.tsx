import { Metadata } from "next"
import { ArrowRight, TimerReset, Wrench } from "lucide-react"
import { ContextualTestimonial } from "@/components/contextual-testimonial"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { TrackedLink } from "@/components/tracked-link"
import { getFeaturedLaunchpadTools } from "@/lib/launchpad"

export const metadata: Metadata = {
  title: "Need a quick diagnostic before you decide?",
  description:
    "Structured diagnostics for delivery drag, AI readiness, and stack posture.",
  alternates: {
    canonical: "/launchpad/tools",
  },
}

export default function LaunchpadToolsPage() {
  const tools = getFeaturedLaunchpadTools()
  const previewRows = tools.map((tool) => ({
    id: tool.id,
    title: tool.shortTitle,
    profiles: tool.categories.slice(0, 2).map((category) => category.title),
  }))

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-24">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute left-6 top-20 h-56 w-56 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto max-w-[1200px] px-6">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Launchpad Tools
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl">
              Use these diagnostics to find your next move
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Use these for a fast first-pass read before deciding on deeper support.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-10 rounded-[28px] border border-border bg-secondary/30 p-6 md:p-7">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                What you walk away with
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Each tool gives you a clear profile of what is likely creating drag, why it matters, and a practical next move.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {previewRows.map((row) => (
                  <div key={row.id} className="rounded-2xl border border-border bg-background px-4 py-4">
                    <p className="text-sm font-semibold text-foreground">{row.title}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Example profiles
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {row.profiles.join(" | ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-3">
              {tools.map((tool) => (
                <article key={tool.id} className="support-panel flex h-full flex-col rounded-[30px] p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background text-teal">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        {tool.kicker}
                      </p>
                      <h2 className="mt-1 text-2xl font-semibold text-foreground">{tool.title}</h2>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-border bg-background px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Who it&apos;s for</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">{tool.audience}</p>
                    </div>
                    <div className="rounded-[22px] border border-border bg-background px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">What you get</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">{tool.outputLabel}</p>
                      <p className="mt-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-teal">
                        <TimerReset className="h-3.5 w-3.5" />
                        {tool.estimatedTime}
                      </p>
                    </div>
                  </div>
                  <TrackedLink
                    href={`/launchpad/${tool.slug}`}
                    eventName="launchpad_path_click"
                    eventData={{ source: "launchpad_tools_index", target: tool.id }}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                  >
                    See your profile
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ContextualTestimonial
          className="deferred-section border-t border-border py-20 lg:py-24"
          eyebrow="Client perspective"
          title="What teams value after using diagnostics first"
          testimonialId="fitzmier-jtf"
        />
      </main>
      <Footer />
    </>
  )
}
