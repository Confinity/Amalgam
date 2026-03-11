import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileText,
  Gauge,
  Map,
  Target,
  Users,
} from "lucide-react"
import { ContextualTestimonial } from "@/components/contextual-testimonial"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Is your team asking for a roadmap they can actually run?",
  description:
    "The Execution Sprint helps you turn clear diagnosis into a roadmap your team can execute with confidence.",
  alternates: {
    canonical: "/execution-sprint",
  },
}

const outputs = [
  {
    icon: Map,
    title: "What your system looks like today",
    description:
      "A working picture of the systems, dependencies, ownership lines, and pressure points shaping the roadmap.",
  },
  {
    icon: Target,
    title: "What is blocking momentum",
    description:
      "A clearer view of what is making delivery slow, risky, or harder to sequence honestly.",
  },
  {
    icon: Calendar,
    title: "Your 30/60/90 day sequence",
    description:
      "A phased plan that distinguishes what is fixed now, what is conditional, and what should move first.",
  },
  {
    icon: FileText,
    title: "A roadmap leadership can defend",
    description:
      "A roadmap designed to support real decisions, not just create an attractive planning document.",
  },
]

const phases = [
  {
    title: "Discovery and mapping",
    items: [
      "Review systems, workflows, and existing documentation",
      "Interview key stakeholders across product, engineering, and operations",
      "Map boundaries, dependencies, and hidden friction",
    ],
  },
  {
    title: "Analysis and sequencing",
    items: [
      "Clarify bottlenecks and operating constraints",
      "Identify trade-offs and foundational work",
      "Sequence initiatives around risk removal and leverage",
    ],
  },
  {
    title: "Roadmap and alignment",
    items: [
      "Produce a practical roadmap and near-term plan",
      "Walk leadership through the logic behind the sequence",
      "Align teams around what changes next and why",
    ],
  },
]

const executionFit = {
  right: [
    "The diagnosis is clear enough and the real need is better sequencing.",
    "Leadership needs a roadmap that can survive cross-functional scrutiny.",
    "Too many initiatives are competing for priority without a trustworthy order of operations.",
  ],
  notYet: [
    "The business still cannot explain what is actually creating the drag.",
    "The real need is ongoing follow-through rather than a time-boxed roadmap effort.",
    "The team wants a planning artifact without doing the system-level work underneath it.",
  ],
}

export default function ExecutionSprintPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-28">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute left-10 top-24 h-56 w-56 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Execution Sprint
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Is your team asking for a roadmap they can actually run?
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We map the current state, clarify constraints, and turn work into a sequence teams can actually run.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact?interest=execution-sprint"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-all hover:opacity-90"
                >
                  Start a conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?interest=founder-review"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:bg-secondary"
                >
                  Book a strategy call
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-border bg-background/95 p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 text-teal" />
                <span className="font-medium text-foreground">4-6 week engagement</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Users className="h-5 w-5 text-teal" />
                <span className="font-medium text-foreground">Direct access to the team</span>
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-secondary/35 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Best use
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Most teams arrive here after the Diagnostic Review, but it can also
                  stand alone if the diagnosis is already clear and the business now
                  needs sequence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                What You Leave With
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                You get the roadmap and the reasoning behind it
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {outputs.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-border bg-background p-7">
                  <item.icon className="h-6 w-6 text-teal" />
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/45 py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-14 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[30px] border border-border bg-background p-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Good fit
                </p>
                <div className="mt-5 space-y-3">
                  {executionFit.right.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/25 px-4 py-4 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[30px] border border-border bg-background p-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Probably not first
                </p>
                <div className="mt-5 space-y-3">
                  {executionFit.notYet.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/25 px-4 py-4 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-foreground/35" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Process
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Built so your roadmap still holds under pressure
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {phases.map((phase, index) => (
                <div key={phase.title} className="rounded-[28px] border border-border bg-background p-7">
                  <span className="text-3xl font-bold text-teal/30">{`0${index + 1}`}</span>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{phase.title}</h3>
                  <div className="mt-5 space-y-3">
                    {phase.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/25 px-4 py-3 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Why It Matters
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                A roadmap only works if it reflects your real system
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Many roadmapping efforts fail because teams sequence work before architecture, ownership, and constraints are clear enough.
                </p>
                <p>
                  The Execution Sprint fixes that with a plan based on what the system can support now and which risk to remove first.
                </p>
                <p>
                  The result is a roadmap that is easier to defend, communicate, and execute.
                </p>
              </div>
            </div>
            <div className="rounded-[30px] border border-border bg-foreground p-8">
              <h3 className="text-2xl font-semibold text-background">Want a roadmap that still works once execution starts?</h3>
              <p className="mt-4 text-sm leading-relaxed text-background/70">
                If the diagnosis is already visible and the next challenge is
                sequencing the work properly, this is the right place to go next.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contact?interest=execution-sprint"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
                >
                  Start a conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?interest=founder-review"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-background/15 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
                >
                  Book a strategy call
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContextualTestimonial
          className="deferred-section border-t border-border py-20 lg:py-24"
          eyebrow="Client perspective"
          title="What teams notice when sequencing gets clearer"
          testimonialId="fitzmier-jtf"
        />
      </main>
      <Footer />
    </>
  )
}
