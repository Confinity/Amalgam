import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Target,
  Users,
  Zap,
} from "lucide-react"
import { ContextualTestimonial } from "@/components/contextual-testimonial"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Founder Review",
  description:
    "A senior-led diagnostic that reveals what is stuck, what is driving risk, and what to fix first.",
  alternates: {
    canonical: "/founder-review",
  },
}

const signals = [
  "Shipping slowed after growth, a raise, or a platform transition",
  "Important work keeps getting trapped in technical ambiguity",
  "Leadership knows there is drag but the root cause is still fuzzy",
  "Integrations, architecture, and operating friction are colliding at the same time",
  "The team needs a path forward it can trust, not another round of abstract advice",
]

const deliverables = [
  {
    icon: Compass,
    title: "Current-state diagnosis",
    description:
      "A clear read on the architecture, workflows, constraints, and handoff failures shaping the current situation.",
  },
  {
    icon: Target,
    title: "Bottlenecks and risk",
    description:
      "The specific issues slowing delivery, creating fragility, or distorting roadmap decisions.",
  },
  {
    icon: FileText,
    title: "Decision-ready recommendations",
    description:
      "Practical recommendations tied to business risk, sequencing, and what leadership should move on next.",
  },
  {
    icon: Zap,
    title: "Clear next step",
    description:
      "A concrete path forward, whether that means internal action, an Execution Sprint, or deeper partnership.",
  },
]

const process = [
  {
    step: "01",
    title: "Kickoff and context",
    description:
      "We align on the situation, constraints, and where leadership most needs clarity.",
  },
  {
    step: "02",
    title: "Review and interviews",
    description:
      "We review systems and workflows, then speak with the people closest to the friction.",
  },
  {
    step: "03",
    title: "Synthesis and diagnosis",
    description:
      "We cut through symptoms, identify the real pressure points, and clarify the trade-offs.",
  },
  {
    step: "04",
    title: "Readout and next step",
    description:
      "You get a senior readout, concrete recommendations, and a clean discussion about what should happen next.",
  },
]

const fitSignals = {
  right: [
    "Leadership can feel the drag clearly, but the actual source of it is still disputed or fuzzy.",
    "Architecture, workflow, integration, and operating issues are colliding at the same time.",
    "The cost of another vague planning cycle is already starting to show up in momentum, risk, or trust.",
  ],
  notYet: [
    "The diagnosis is already trusted and the real need is roadmap sequencing.",
    "The work is narrowly scoped and the constraints are already obvious to everyone involved.",
    "The business mainly needs delivery capacity, not senior diagnosis.",
  ],
}

export default function FounderReviewPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-28">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute left-8 top-20 h-56 w-56 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Founder Review
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Fast clarity when the business knows something is stuck but not yet why
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                The Founder Review is a senior-led diagnostic. In two weeks, you get
                a clear read on what is slowing delivery, what is creating risk,
                and what should move first.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact?interest=founder-review"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-all hover:opacity-90"
                >
                  Book a free strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:bg-secondary"
                >
                  See Case Studies
                </Link>
              </div>
              <Link
                href="/launchpad/delivery-drag-diagnostic"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
              >
                Not sure this is the right place to start? Try a Launchpad diagnostic first
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[30px] border border-border bg-background/95 p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-teal" />
                <span className="font-medium text-foreground">Two-week engagement</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Users className="h-5 w-5 text-teal" />
                <span className="font-medium text-foreground">Senior-led from day one</span>
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-secondary/35 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Important
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  This is a paid diagnostic, not a free consultation. It is built
                  to produce real clarity fast.
                </p>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                For most teams, this is still the cleanest front door into working
                with Amalgam.
              </p>
              <div className="mt-5 rounded-2xl border border-border bg-secondary/35 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Self-qualify first
                </p>
                <div className="mt-3 flex flex-col gap-3 text-sm">
                  <Link
                    href="/launchpad/delivery-drag-diagnostic"
                    className="text-foreground transition-colors hover:text-teal"
                  >
                    Delivery Drag Diagnostic
                  </Link>
                  <Link
                    href="/launchpad/tech-stack-audit"
                    className="text-foreground transition-colors hover:text-teal"
                  >
                    Tech Stack Audit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Best Fit
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                The right starting point when leadership needs signal, not noise
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                The Founder Review is designed for teams that do not need another
                opinion pile. They need a sharper view of what is actually creating
                drag across the system.
              </p>
              <div className="mt-8 grid gap-3">
                {signals.map((signal) => (
                  <div
                    key={signal}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-4 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                    <span>{signal}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[30px] border border-border bg-secondary/35 p-7">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                After the review
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-border bg-background px-4 py-4">
                  <p className="font-medium text-foreground">Execution Sprint</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Go deeper when the diagnosis is clear and the team needs a roadmap.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background px-4 py-4">
                  <p className="font-medium text-foreground">Outcome Partnership</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Stay engaged when the business needs senior follow-through.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background px-4 py-4">
                  <p className="font-medium text-foreground">Internal action</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Use the output internally if the team already has what it needs to execute.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/35 py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Fit check
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Choose this when the business needs sharper signal, not just more conversation
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[30px] border border-border bg-background p-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Good fit
                </p>
                <div className="mt-5 space-y-3">
                  {fitSignals.right.map((item) => (
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
                  {fitSignals.notYet.map((item) => (
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
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                What You Get
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Structured output that helps leadership decide what to do next
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {deliverables.map((item) => (
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

        <section className="border-t border-border bg-secondary/45 py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Process
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                A focused sequence designed to get to signal quickly
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {process.map((item) => (
                <div key={item.step} className="rounded-[28px] border border-border bg-background p-6">
                  <span className="text-3xl font-bold text-teal/30">{item.step}</span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Why It Works
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Not a vague discovery process dressed up as strategy
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  The Founder Review is built for situations where unclear
                  decisions are already getting expensive. It is built to produce
                  a real diagnosis.
                </p>
                <p>
                  You get senior judgment from day one, a cleaner view of the system,
                  and a more honest conversation about what should happen next.
                </p>
                <p>
                  It should reduce ambiguity, not create dependency.
                </p>
              </div>
            </div>
            <div className="rounded-[30px] border border-border bg-foreground p-8">
              <h3 className="text-2xl font-semibold text-background">Ready to start?</h3>
              <p className="mt-4 text-sm leading-relaxed text-background/70">
                If the situation is real and the team needs clarity fast, the next
                step is a conversation about fit and timing.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contact?interest=founder-review"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
                >
                  Book a free strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-background/15 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
                >
                  See all services
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContextualTestimonial
          className="deferred-section border-t border-border py-20 lg:py-24"
          eyebrow="Client perspective"
          title="What this work feels like for leadership teams"
          testimonialId="mooney-cleanitsupply"
        />
      </main>
      <Footer />
    </>
  )
}
