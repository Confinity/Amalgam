import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Handshake,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react"
import { ContextualTestimonial } from "@/components/contextual-testimonial"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Do you need senior support to keep execution moving?",
  description:
    "Outcome Partnership gives you ongoing senior support to keep execution moving when priorities and pressure keep changing.",
  alternates: {
    canonical: "/outcome-partnership",
  },
}

const whatWeProvide = [
  {
    icon: Users,
    title: "Senior support inside the work",
    description:
      "People who can make sense of the situation quickly and contribute real judgment.",
  },
  {
    icon: Handshake,
    title: "Continuity across changing priorities",
    description:
      "A steady partnership model that preserves context instead of restarting every few weeks.",
  },
  {
    icon: Target,
    title: "Shared accountability for outcomes",
    description:
      "The work stays tied to outcomes, sequencing, and shipped progress.",
  },
  {
    icon: Zap,
    title: "Fast unblocking and forward progress",
    description:
      "We resolve decision bottlenecks and cross-team friction before they stall the roadmap.",
  },
]

const whatThisLooksLike = [
  "Working alongside your team during planning, execution, and review cycles",
  "Supporting architecture and sequencing decisions as the roadmap meets reality",
  "Keeping leadership and teams aligned when cross-functional friction rises",
  "Keeping execution moving while building internal capability",
]

const notThis = [
  "Staff augmentation without ownership",
  "Billing hours without a meaningful execution role",
  "Generic playbooks detached from the system in front of us",
  "Open-ended consulting designed to prolong itself",
]

const partnershipFit = {
  right: [
    "The roadmap exists, but execution pressure is likely to distort it without close support.",
    "Leadership wants judgment close to the work while priorities and constraints keep shifting.",
    "The team needs help preserving progress and cross-functional alignment.",
  ],
  notYet: [
    "The root problem is still too fuzzy and needs a clear assessment first.",
    "The business mainly needs a time-boxed roadmap rather than ongoing involvement.",
    "The actual ask is generic staff augmentation without accountability for the shape of the work.",
  ],
}

export default function OutcomePartnershipPage() {
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
                Outcome Partnership
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Do you need senior support to keep execution moving?
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                The Outcome Partnership carries the roadmap into execution when priorities shift and decisions cannot drift.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact?interest=outcome-partnership"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-all hover:opacity-90"
                >
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?interest=founder-review"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:bg-secondary"
                >
                  Explore Founder Review
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-border bg-background/95 p-7 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Typical path
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-border bg-secondary/35 px-4 py-4">
                  <p className="font-medium text-foreground">After a clear read</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Most teams reach this point after the Founder Review or Execution Sprint.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/35 px-4 py-4">
                  <p className="font-medium text-foreground">During execution</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We stay close enough to unblock work, clarify trade-offs, and help the team keep moving.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/35 px-4 py-4">
                  <p className="font-medium text-foreground">Toward independence</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    The objective is stronger internal capacity, not permanent outside dependency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                What We Provide
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Direct support tied to execution, not advisory theater
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Senior support that stays connected to real execution and real outcomes.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {whatWeProvide.map((item) => (
                <div key={item.title} className="card-interactive rounded-[28px] border border-border bg-background p-7">
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
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                In Practice
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                What this partnership looks like week to week
              </h2>
              <div className="mt-6 space-y-3">
                {whatThisLooksLike.map((item) => (
                  <div
                    key={item}
                    className="card-interactive flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-4 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                What It Is Not
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                What this is not
              </h2>
              <div className="mt-6 space-y-3">
                {notThis.map((item) => (
                  <div
                    key={item}
                    className="card-interactive flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-4 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Fit check
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Best when direction is clear and follow-through is the risk
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[30px] border border-border bg-background p-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Good fit
                </p>
                <div className="mt-5 space-y-3">
                  {partnershipFit.right.map((item) => (
                    <div
                      key={item}
                      className="card-interactive flex items-start gap-3 rounded-2xl border border-border bg-secondary/25 px-4 py-4 text-sm text-muted-foreground"
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
                  {partnershipFit.notYet.map((item) => (
                    <div
                      key={item}
                      className="card-interactive flex items-start gap-3 rounded-2xl border border-border bg-secondary/25 px-4 py-4 text-sm text-muted-foreground"
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

        <section className="border-t border-border bg-secondary/35 py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Why Teams Choose This
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                A roadmap alone will not keep execution on track
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  A roadmap alone does not keep execution on track.
                </p>
                <p>
                  This model helps teams keep momentum while priorities evolve.
                </p>
              </div>
            </div>
            <div className="rounded-[30px] border border-border bg-foreground p-8">
              <Shield className="h-6 w-6 text-teal" />
              <h3 className="mt-4 text-2xl font-semibold text-background">
                Want focused support while the roadmap is in motion?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-background/70">
                If the business has direction but the work still needs stronger follow-through, this is the next conversation to have.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contact?interest=outcome-partnership"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
                >
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-background/15 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
                >
                  See how we work
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContextualTestimonial
          className="deferred-section border-t border-border py-20 lg:py-24"
          eyebrow="Client perspective"
          title="How this model feels during real execution pressure"
          testimonialId="mendez-pearlx"
        />
      </main>
      <Footer />
    </>
  )
}


