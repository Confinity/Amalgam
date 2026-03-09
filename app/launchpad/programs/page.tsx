import { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { TrackedLink } from "@/components/tracked-link"
import { launchpadPrograms } from "@/lib/launchpad"

export const metadata: Metadata = {
  title: "Launchpad Programs",
  description:
    "Understand how Founder Review, Execution Sprint, and Outcome Partnership map to the clarity, sequencing, and follow-through your team needs.",
  alternates: {
    canonical: "/launchpad/programs",
  },
}

const decisionMap = [
  {
    title: "Root cause unclear",
    description:
      "If the drag is visible but the system still needs a direct read, Founder Review is the cleanest front door.",
    href: "/founder-review",
  },
  {
    title: "Situation legible, sequencing needed",
    description:
      "If the diagnosis is trusted and the organization needs a roadmap that can survive scrutiny, move into the Execution Sprint.",
    href: "/execution-sprint",
  },
  {
    title: "Momentum needs adult supervision",
    description:
      "If the path exists but execution still needs senior follow-through, Outcome Partnership becomes the continuity layer.",
    href: "/outcome-partnership",
  },
]

export default function LaunchpadProgramsPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="border-b border-border py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Launchpad Programs
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl">
              If the tools or guides suggest deeper help is needed, this is how the work usually begins
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              These are structured interventions, ordered around how serious
              situations become clear and then move.
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
                      Best starting point
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
                Choose based on what the system needs next
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
                    Go there
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </TrackedLink>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
