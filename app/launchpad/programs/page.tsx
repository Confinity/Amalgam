import { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { ContextualTestimonial } from "@/components/contextual-testimonial"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { TrackedLink } from "@/components/tracked-link"
import { launchpadPrograms } from "@/lib/launchpad"

export const metadata: Metadata = {
  title: "Not sure which support level fits right now? Start here.",
  description:
    "See how Diagnostic Review, Execution Sprint, and Outcome Partnership map to what your team needs now.",
  alternates: {
    canonical: "/launchpad/programs",
  },
}

const decisionMap = [
  {
    title: "Your root cause is still unclear",
    description:
      "If the drag is visible but the system still needs a direct read, Diagnostic Review is the cleanest entry point.",
    href: "/founder-review",
  },
  {
    title: "You can see the issue, but need sequencing",
    description:
      "If the diagnosis is trusted and the organization needs a roadmap that can survive scrutiny, move into the Execution Sprint.",
    href: "/execution-sprint",
  },
  {
    title: "You need continuity to keep momentum",
    description:
      "If the path exists but execution still needs close follow-through, Outcome Partnership becomes the continuity layer.",
    href: "/outcome-partnership",
  },
]

export default function LaunchpadProgramsPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-24">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute left-8 top-20 h-56 w-56 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto max-w-[1200px] px-6">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Launchpad Programs
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl">
              If tools or guides point to deeper help, pick the support level that fits your situation now.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              For teams with clear signal that now need the right level of support.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              {launchpadPrograms.map((program) => (
                <article
                  key={program.id}
                  className={`flex h-full flex-col rounded-[30px] p-8 ${
                    program.featured
                      ? "border border-teal/45 bg-background shadow-[0_14px_30px_rgba(0,191,166,0.08)]"
                      : "support-panel"
                  }`}
                >
                  {program.featured ? (
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                      Recommended first move
                    </p>
                  ) : null}
                  <h2 className="mt-4 text-2xl font-semibold text-foreground">{program.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-foreground/75">{program.whenItsRight}</p>
                  <TrackedLink
                    href={program.href}
                    eventName="launchpad_path_click"
                    eventData={{ source: "launchpad_programs_index", target: program.id }}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                  >
                    {program.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-secondary/35 py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                Which one is right?
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Choose based on what your system needs next
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {decisionMap.map((item) => (
                <TrackedLink
                  key={item.title}
                  href={item.href}
                  eventName="launchpad_path_click"
                  eventData={{ source: "launchpad_programs_decision_map", target: item.title }}
                  className="rounded-[28px] border border-border bg-background p-7 transition-colors hover:border-teal/35"
                >
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal">
                    Explore this path
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </TrackedLink>
              ))}
            </div>
          </div>
        </section>

        <ContextualTestimonial
          className="deferred-section border-t border-border py-20 lg:py-24"
          eyebrow="Client perspective"
          title="What clients say when support is sequenced the right way"
          testimonialId="mendez-pearlx"
        />
      </main>
      <Footer />
    </>
  )
}
