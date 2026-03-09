import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Compass,
  Database,
  Gauge,
  GitBranch,
  Handshake,
  Layers,
  Map,
  Shield,
  Users,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ClientLogoWall } from "@/components/client-logo-wall"
import { TestimonialStrip } from "@/components/testimonial-strip"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Amalgam helps business and technical leaders restore momentum through focused diagnosis, sequencing support, and senior follow-through.",
  alternates: {
    canonical: "/services",
  },
}

const engagements = [
  {
    icon: Compass,
    title: "Founder Review",
    subtitle: "Clarity in 2 weeks",
    description:
      "A senior-led diagnostic for teams that know delivery is dragging but need a sharper read on what is actually broken.",
    href: "/founder-review",
    highlights: [
      "Systems and delivery diagnosis",
      "Risk and bottleneck mapping",
      "Clear priorities and next steps",
    ],
  },
  {
    icon: Map,
    title: "Execution Sprint",
    subtitle: "Roadmap in 4-6 weeks",
    description:
      "A focused engagement to map the current state, define constraints, and produce an execution plan leadership can trust.",
    href: "/execution-sprint",
    highlights: [
      "Current-state system mapping",
      "Constraint analysis and sequencing",
      "30/60/90 day plan",
    ],
  },
  {
    icon: Handshake,
    title: "Outcome Partnership",
    subtitle: "Ongoing momentum",
    description:
      "Senior follow-through to carry the roadmap forward, unblock execution, and sustain momentum where the work still needs adult supervision.",
    href: "/outcome-partnership",
    highlights: [
      "Embedded senior operators",
      "Execution and decision support",
      "Accountability for follow-through",
    ],
  },
]

const pressurePoints = [
  {
    icon: Layers,
    title: "Architecture complexity",
    featured: true,
    description:
      "The system has grown harder to reason about. Changes take too long, dependencies are murky, and risk is rising faster than confidence.",
  },
  {
    icon: GitBranch,
    title: "Integration fragility",
    description:
      "Too many tools, too many handoffs, too much hidden coupling. Work looks simpler on paper than it behaves in reality.",
  },
  {
    icon: Database,
    title: "Data trust problems",
    description:
      "The business is making important decisions on top of numbers, workflows, or automations that no one fully trusts anymore.",
  },
  {
    icon: Gauge,
    title: "Delivery slowdowns",
    featured: true,
    description:
      "Shipping has slowed after growth, a raise, a reorg, or a platform transition. The team is working hard, but the system is still dragging.",
  },
  {
    icon: Users,
    title: "Cross-functional drag",
    description:
      "Product, engineering, operations, and leadership are all involved, but ownership and sequencing still feel fuzzy or unstable.",
  },
  {
    icon: Shield,
    title: "Regulated or high-stakes environments",
    description:
      "The margin for error is lower. Legacy infrastructure, compliance, and operational risk make bad decisions more expensive.",
  },
]

const capabilityGroups = [
  {
    title: "Architecture and platforms",
    items: [
      "System architecture assessment",
      "Legacy modernization strategy",
      "Cloud and platform planning",
      "API and integration design",
    ],
  },
  {
    title: "Data and operational clarity",
    items: [
      "Data trust and source-of-truth design",
      "Workflow simplification",
      "Reporting and decision support",
      "AI and automation readiness",
    ],
  },
  {
    title: "Execution and operating model",
    items: [
      "Roadmap sequencing",
      "Delivery process improvement",
      "Team structure and workflow design",
      "Technical diligence and risk review",
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-28">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute left-0 top-16 h-56 w-56 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Services
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Senior help for the systems, decisions, and delivery friction that slow companies down
              </h1>
              <p className="mt-6 max-w-[32ch] text-lg leading-relaxed text-muted-foreground">
                Amalgam helps founders, executives, and technical leaders bring order to complex systems,
                restore delivery momentum, and move forward with a path leadership can trust.
              </p>
              <p className="mt-5 max-w-[34ch] text-sm font-medium leading-relaxed text-foreground/72">
                Best when delivery friction is visible but the root cause is still unclear.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact?interest=strategy-session"
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
                href="/launchpad"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
              >
                Prefer tools and diagnostics first? Explore Launchpad
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="support-panel rounded-[30px] border border-border/60 p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                How work usually starts
              </p>
              <div className="mt-5 space-y-0">
                {engagements.map((engagement, index) => (
                  <div
                    key={engagement.title}
                    className="support-panel-item px-1 py-4 first:pt-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-sm font-semibold text-teal">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{engagement.title}</p>
                        <p className="text-sm text-muted-foreground">{engagement.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Most teams start with a focused diagnostic, then go deeper only
                when the work is clear enough to sequence with confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="deferred-section py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                  Where We Step In
                </p>
                <h2 className="text-3xl font-semibold text-foreground text-balance">
                  The situations where senior systems judgment creates leverage fast
                </h2>
              </div>
              <p className="max-w-[52ch] leading-relaxed text-muted-foreground lg:justify-self-end">
                We are most useful when the business is no longer dealing with a
                clean technical problem. The drag now sits across architecture,
                tooling, data, operating rhythm, and decision-making.
              </p>
            </div>
            <div className="mb-8 flex flex-wrap gap-3">
              <Link
                href="/launchpad/delivery-drag-diagnostic"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-teal/35 hover:text-teal"
              >
                Delivery Drag Diagnostic
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/launchpad/tech-stack-audit"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-teal/35 hover:text-teal"
              >
                Tech Stack Audit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/launchpad/ai-readiness-checklist"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-teal/35 hover:text-teal"
              >
                AI Readiness Checklist
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pressurePoints.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-[28px] p-7 ${
                    item.featured
                      ? "border border-border/80 bg-background"
                      : "support-panel border border-border/50"
                  }`}
                >
                  <item.icon className={`h-6 w-6 ${item.featured ? "text-teal" : "text-teal/85"}`} />
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section border-y border-border bg-secondary/40 py-24 lg:py-28">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                  Offer Ladder
                </p>
                <h2 className="text-3xl font-semibold text-foreground text-balance">
                  Three ways to engage, ordered from clarity to sustained execution
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                These offers are intentionally ordered around how serious situations
                actually become legible, then move. Clarity first. Sequencing next.
                Ongoing support only when it creates real leverage.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {engagements.map((engagement, index) => (
                <div
                  key={engagement.title}
                  className={`flex h-full flex-col rounded-[30px] p-8 ${
                    index === 0
                      ? "border border-teal/70 bg-background shadow-lg shadow-teal/8"
                      : "support-panel border border-border/55"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <engagement.icon className="h-8 w-8 text-teal" />
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {engagement.subtitle}
                    </span>
                  </div>
                  {index === 0 ? (
                    <p className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-teal">
                      Best starting point
                    </p>
                  ) : null}
                  <h3 className="mt-6 text-2xl font-semibold text-foreground">
                    {engagement.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {engagement.description}
                  </p>
                  <div className="mt-6 space-y-3">
                    {engagement.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-3 px-0 py-1.5 text-sm text-foreground"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal/80" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={engagement.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                  >
                    See how it works
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section py-24 lg:py-28">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Selected Depth
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Breadth where it matters, without trying to do everything
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The work usually spans architecture, data, delivery, and operating
                model at the same time. We stay focused on the areas that actually
                change the situation, rather than expanding into everything.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {capabilityGroups.map((group) => (
                <div key={group.title} className="support-panel rounded-[28px] border border-border/55 p-7">
                  <h3 className="text-xl font-semibold text-foreground">{group.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 px-0 py-1 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClientLogoWall
          className="border-y border-border py-20 lg:py-24"
          eyebrow="Client Experience"
          title="Trusted where systems quality directly affects outcomes"
          description="Selected experience across financial services, enterprise operations, philanthropy, and growth-stage environments where bad sequencing gets expensive fast."
        />

        <TestimonialStrip
          className="deferred-section border-b border-border py-20 lg:py-24"
          compact
        />

        <section className="deferred-section py-24 lg:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Why Amalgam
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Built for teams that need calm, senior help instead of advisory theater
              </h2>
              <div className="mt-6 max-w-[48ch] space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  We are not trying to be a giant transformation firm. We are a
                  small senior team designed for situations where the business needs
                  clarity, sharper sequencing, and direct follow-through.
                </p>
                <p>
                  That is why the offers are simple. Diagnose first. Plan honestly.
                  Stay involved only when it creates real leverage. The goal is to
                  make the next decisions clearer and the path forward less fragile.
                </p>
              </div>
            </div>
            <div className="rounded-[32px] border border-border/70 bg-foreground p-8 shadow-lg shadow-slate-950/8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Best next step
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-background">
                Best next move
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-background/72">
                If something is slowing the business down and the root cause is
                still unclear, start with a strategy call.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contact?interest=strategy-session"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
                >
                  Book a free strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/founder-review"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-background/15 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
                >
                  See the Founder Review
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
