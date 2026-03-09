import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Compass,
  Database,
  FolderKanban,
  Gauge,
  GitBranch,
  Handshake,
  Layers,
  Map,
  Scale,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ClientLogoWall } from "@/components/client-logo-wall"
import { HeroDiagnosticPanel } from "@/components/hero-diagnostic-panel"
import { caseStudies } from "@/lib/case-studies-data"
import { knowledgeBriefs, knowledgeCategories } from "@/lib/knowledge-briefs"

export const metadata: Metadata = {
  title: "Untangle complex systems. Ship again.",
  description:
    "We help founders and versatilists untangle complex systems and restore delivery velocity. Start with the Founder Review - a focused diagnostic that reveals what is broken and what to fix first.",
  alternates: {
    canonical: "/",
  },
}

function Hero() {
  return (
    <section className="homepage-hero relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(0,191,166,0.06)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(106,92,255,0.04)_0%,transparent_70%)]" />

      <div className="mx-auto max-w-[1200px] px-6">
        <div className="hero-layout">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Senior operators for founders and versatilists
            </p>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl lg:text-[56px]">
              Untangle complex systems.{" "}
              <span className="bg-gradient-to-r from-teal to-purple bg-clip-text text-transparent">
                Ship again.
              </span>
            </h1>
            <p className="hero-body mt-6 text-lg leading-relaxed text-muted-foreground">
              For founders and versatilists stuck in systems complexity.
              We help you regain clarity and delivery velocity when
              architecture, data, integrations, and operations become hard to
              navigate.
            </p>
            <p className="hero-fit-line mt-5">
              For founders, fractional CTOs, and senior operators who know
              delivery is dragging and need clarity on why.
            </p>
            <div className="hero-cta-row mt-2">
              <Link
                href="/founder-review"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
              >
                Start the Founder Review
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-lg border border-border/90 px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted/70 hover:text-foreground"
              >
                See Case Studies
              </Link>
            </div>

            <div className="hero-trust-strip mt-7 border-t border-border/70 pt-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-muted-foreground">
                <span>Founded 2012</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>Small senior team</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>Depth in complex systems</span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground/90">
                Best fit for founders, fractional CTOs, and cross-functional
                operators carrying real complexity.
              </p>
            </div>
          </div>

          <div className="hero-panel-shell relative">
            <HeroDiagnosticPanel />
          </div>
        </div>
      </div>
    </section>
  )
}

function FounderReviewEntry() {
  const founderReviewPoints = [
    "Sharp read on what is dragging",
    "Useful before roadmap work or replatforming",
    "Built to produce clarity quickly",
  ]

  return (
    <section className="homepage-bridge-section border-y border-border bg-secondary/35 py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
            Start with the Founder Review
          </p>
          <h2 className="text-3xl font-semibold text-foreground text-balance">
            The fastest way to diagnose where delivery is breaking down.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Use the Founder Review when the business knows something is dragging
            but the architecture, integrations, data, and operating reality are
            still too tangled to sequence with confidence.
          </p>
          <p className="mt-4 text-sm font-medium text-foreground/78">
            Best when delivery friction is visible but the root cause is still unclear.
          </p>
        </div>

        <div className="homepage-bridge-panel support-panel p-7">
          <div className="space-y-4">
            {founderReviewPoints.map((point) => (
              <div
                key={point}
                className="support-panel-item flex items-start gap-3 px-1 py-1 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <span>{point}</span>
              </div>
            ))}
          </div>
          <Link
            href="/founder-review"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
          >
            See how the Founder Review works
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function WhatWeDo() {
  const outcomes = [
    {
      icon: Compass,
      title: "Clarify the path forward",
      description:
        "Understand what is actually broken and what to fix first.",
    },
    {
      icon: Layers,
      title: "Untangle systems and integrations",
      description:
        "Bring order to fragmented architecture, dependencies, and scattered data.",
    },
    {
      icon: Zap,
      title: "Restore delivery momentum",
      description:
        "Remove the friction slowing the team down so you can ship again.",
    },
    {
      icon: Target,
      title: "Move from diagnosis to execution",
      description:
        "Turn insight into plans leadership can trust and teams can follow.",
    },
  ]

  return (
    <section className="homepage-core-offer-section border-t border-border py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
            Core offer
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-foreground">
            What Amalgam does
          </h2>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            Amalgam is a small senior team that brings order to tangled systems,
            delivery friction, and operational drag. We bring clarity, momentum,
            and outcomes.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome) => (
            <div key={outcome.title} className="rounded-xl border border-border bg-background p-6">
              <outcome.icon className="mb-4 h-6 w-6 text-teal" />
              <h3 className="mb-2 font-semibold text-foreground">{outcome.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {outcome.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhoWeHelp() {
  return (
    <section className="homepage-audiences-section deferred-section border-y border-border bg-secondary/50 py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground">Who we help</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                <Users className="h-5 w-5 text-teal" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Founders</h3>
            </div>
            <p className="mb-6 text-muted-foreground">
              Growth created drag. You raised, hired, and scaled, but delivery
              is now slower, not faster. Systems got messy and dependencies
              multiplied.
            </p>
            <ul className="space-y-3">
              {[
                "Post-raise delivery slowdowns",
                "Product and operations complexity",
                "Too many tools and dependencies",
                "Technical friction reducing speed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-background p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                <Shield className="h-5 w-5 text-teal" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Versatilists</h3>
            </div>
            <p className="mb-6 text-muted-foreground">
              You carry cross-functional complexity. Product leaders, technical
              operators, and fractional CTOs bridge strategy and execution
              every day.
            </p>
            <ul className="space-y-3">
              {[
                "Bridging strategy and technical execution",
                "Holding alignment together across teams",
                "Managing complexity others cannot see",
                "Bearing the burden of cross-functional coordination",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function TypicalTriggers() {
  const triggers = [
    { icon: Gauge, text: "Shipping slows after growth" },
    { icon: Layers, text: "Systems are fragile - every change carries risk" },
    { icon: GitBranch, text: "Integrations keep breaking" },
    { icon: Database, text: "Data is scattered across tools" },
    { icon: Target, text: "No one trusts the operating picture" },
    { icon: Zap, text: "Roadmap decisions blocked by technical ambiguity" },
  ]

  return (
    <section className="homepage-triggers-section deferred-section py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Typical triggers
            </p>
            <h2 className="mb-4 text-3xl font-semibold text-foreground">
              When teams usually reach out
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              The issue is rarely just one technical problem. By the time a team
              calls Amalgam, architecture, data, integrations, and operating decisions
              are usually all interacting at once.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {triggers.map((trigger) => (
              <div key={trigger.text} className="support-panel flex items-center gap-4 p-5">
                <trigger.icon className="h-5 w-5 shrink-0 text-teal" />
                <span className="text-foreground">{trigger.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function VersatilistEra() {
  return (
    <section className="homepage-narrative-section deferred-section bg-foreground py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
            The era we&apos;re in
          </p>
          <h2 className="mb-6 text-3xl font-semibold text-background text-balance">
            The rise of the versatilist
          </h2>
          <div className="space-y-4 leading-relaxed text-background/70">
            <p>
              Modern companies no longer win through isolated specialists alone.
              They win through people who can connect strategy, product,
              operations, and execution.
            </p>
            <p>
              That is the burden founders and versatilists are carrying. Amalgam
              exists to help them move with more clarity when complexity starts
              to slow delivery down.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function EngagementJourney() {
  const steps = [
    { label: "Insight", description: "Recognize something needs to change" },
    { label: "Conversation", description: "Discuss the situation and constraints" },
    { label: "Founder Review", description: "Get fast clarity on what's stuck and why" },
    { label: "Execution\u00A0Sprint", description: "Build a practical roadmap leadership can trust" },
    { label: "Outcome Partnership", description: "Sustain momentum with senior support" },
  ]

  return (
    <section className="homepage-engagement-section deferred-section border-t border-border">
      <div className="engagement-path mx-auto max-w-[1280px]">
        <div className="engagement-path__intro">
          <p className="engagement-path__eyebrow text-sm font-medium uppercase tracking-[0.22em] text-teal">
            How engagement starts
          </p>
          <h2 className="engagement-path__title font-semibold text-foreground">
            A simple path from first signal to real follow-through
          </h2>
          <div className="engagement-path__body space-y-4">
            <p>
              The model is intentionally straightforward. We do not push teams into
              a large retainer before the situation is legible.
            </p>
            <p>
              Work starts with clarity, deepens into sequencing, and only becomes
              ongoing when senior follow-through is genuinely useful.
            </p>
          </div>
        </div>

        <div className="engagement-path__process">
          <div
            className="engagement-path__rail"
            aria-label="Amalgam engagement path from first signal to ongoing support"
          >
            {steps.map((step, index) => {
              const isFeatured = step.label === "Founder Review"

              return (
                <div key={step.label}>
                  <article
                    className={`process-step${isFeatured ? " process-step--featured" : ""}`}
                  >
                    <div className="process-step__top">
                      <span className="process-step__number">{index + 1}</span>
                      <span className="process-step__connector" aria-hidden="true" />
                    </div>
                    {isFeatured ? (
                      <p className="process-step__tag">Best starting point</p>
                    ) : null}
                    <h3 className="process-step__title">{step.label}</h3>
                    <p className="process-step__body">{step.description}</p>
                  </article>

                  {isFeatured ? (
                    <aside className="engagement-path__callout engagement-path__callout--mobile">
                      <p className="engagement-path__callout-label">
                        Why start with the Founder Review
                      </p>
                      <p className="engagement-path__callout-body">
                        The Founder Review is the front door because it creates signal fast.
                        This is not free consultation theater or vague discovery - it is a
                        focused diagnostic that makes the situation legible.
                      </p>
                    </aside>
                  ) : null}
                </div>
              )
            })}
          </div>

          <aside className="engagement-path__callout engagement-path__callout--founder-review">
            <p className="engagement-path__callout-label">
              Why start with the Founder Review
            </p>
            <p className="engagement-path__callout-body">
              The Founder Review is the front door because it creates signal fast.
              This is not free consultation theater or vague discovery - it is a
              focused diagnostic that makes the situation legible.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function WhyAmalgam() {
  const comparisons = [
    {
      icon: CircleHelp,
      title: "We diagnose before we prescribe",
      description:
        "The work starts by making the system legible enough to decide honestly, not by forcing a pre-packaged transformation frame onto the situation.",
    },
    {
      icon: FolderKanban,
      title: "We stay commercial and concrete",
      description:
        "Every engagement has a job to do: clarify the problem, sequence the work, or keep momentum moving. The site reflects that same discipline.",
    },
    {
      icon: Scale,
      title: "We are senior enough to be calm",
      description:
        "Amalgam is not trying to look huge. The value is senior judgment, direct communication, and less noise around important decisions.",
    },
  ]

  return (
    <section className="homepage-why-section deferred-section py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="homepage-why-panel grid gap-10 rounded-[34px] border border-border bg-background p-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:p-10">
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Why Amalgam
            </p>
            <h2 className="mb-4 text-3xl font-semibold text-foreground text-balance">
              Built for situations generic consulting handles poorly
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              The point is not to wrap complexity in better vocabulary. The point is
              to make the next decision clearer, the roadmap less fragile, and the
              work more likely to move again.
            </p>
          </div>

          <div className="grid gap-4">
            {comparisons.map((item) => (
              <div
                key={item.title}
                className="support-panel p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-background text-teal">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EntryOffers() {
  const offers = [
    {
      icon: Compass,
      title: "Founder Review",
      subtitle: "2 weeks",
      description:
        "Senior-led engagement to get fast clarity on systems, product, execution, bottlenecks, and decision risk.",
      features: [
        "Systems and architecture assessment",
        "Bottleneck and risk analysis",
        "Priority recommendations",
        "Clear next steps",
      ],
      href: "/founder-review",
      ctaLabel: "See how it works",
      primary: true,
    },
    {
      icon: Map,
      title: "Execution Sprint",
      subtitle: "4-6 weeks",
      description:
        "Focused sprint to map systems, define constraints, align priorities, and produce a clear roadmap.",
      features: [
        "Current-state mapping",
        "Constraint documentation",
        "30/60/90 day plan",
        "Leadership alignment",
      ],
      href: "/execution-sprint",
      ctaLabel: "See what's included",
      primary: false,
    },
    {
      icon: Handshake,
      title: "Outcome Partnership",
      subtitle: "Ongoing",
      description:
        "Senior-led follow-through to execute the roadmap, unblock decisions, and protect momentum over time.",
      trustCue: "Best after diagnostic clarity when execution support needs to stay senior.",
      features: [
        "Embedded senior operators",
        "Execution support",
        "Accountability for outcomes",
        "Flexible engagement",
      ],
      href: "/outcome-partnership",
      ctaLabel: "See how support works",
      primary: false,
    },
  ]

  return (
    <section className="homepage-offers-section deferred-section border-y border-border bg-secondary/50 py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Three ways to engage
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Each designed to move you forward. Start where the situation is clearest.
          </p>
        </div>
        <div className="homepage-offers-grid grid gap-8 lg:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className={`homepage-offer-card flex flex-col rounded-[26px] p-8 ${
                offer.primary
                  ? "homepage-offer-card--primary border border-teal/40 bg-background shadow-[0_14px_34px_rgba(0,191,166,0.08)]"
                  : "support-panel"
              }`}
            >
              {offer.primary ? (
                <span className="mb-4 text-xs font-medium uppercase tracking-widest text-teal">
                  Best starting point
                </span>
              ) : null}
              <offer.icon className="mb-4 h-8 w-8 text-teal" />
              <h3 className="text-xl font-semibold text-foreground">{offer.title}</h3>
              <p className="mb-3 mt-1 text-sm font-medium text-teal">{offer.subtitle}</p>
              <p className="mb-6 text-muted-foreground">{offer.description}</p>
              {"trustCue" in offer ? (
                <p className="mb-4 text-sm font-medium text-foreground/72">{offer.trustCue}</p>
              ) : null}
              <ul className="mb-6 flex-1 space-y-2">
                {offer.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={offer.href}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                  offer.primary
                    ? "bg-foreground text-background hover:opacity-90"
                    : "border border-border/80 text-foreground hover:bg-background"
                }`}
              >
                {offer.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrustSection() {
  return (
    <ClientLogoWall
      className="homepage-trust-section border-t border-border"
      eyebrow="Selected client experience"
      title="Trusted in complex environments"
      description="Selected client experience across banking, fintech, insurance, and complex enterprise environments."
      showCaseStudiesCta
    />
  )
}

function FeaturedCaseStudies() {
  const featured = caseStudies.filter((cs) => cs.featured).slice(0, 3)
  const [flagship, ...supporting] = featured

  return (
    <section className="homepage-case-studies-section deferred-section border-t border-border py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Proof
            </p>
            <h2 className="mb-2 text-3xl font-semibold text-foreground">
              Case studies
            </h2>
            <p className="text-muted-foreground">
              Representative client situations, real constraints, and concrete outcomes.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="hidden items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-teal sm:inline-flex"
          >
            View all case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-7">
          {flagship ? (
            <Link
              href={`/case-studies/${flagship.slug}`}
              className="group grid gap-7 rounded-[34px] border border-border bg-background p-8 transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:p-9"
            >
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-teal">
                  Flagship case study
                </p>
                <h3 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-teal">
                  {flagship.client}
                </h3>
                <p className="mt-3 text-sm font-medium text-muted-foreground">
                  {flagship.industry}
                </p>
                <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
                  {flagship.problem}
                </p>
              </div>
              <div className="support-panel rounded-[26px] p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Outcome
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {flagship.outcome}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Approach
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {flagship.approach}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-teal">
                Read case study
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ) : null}

          <div className="grid gap-6 md:grid-cols-2">
            {supporting.map((study) => (
              <Link
                key={study.id}
                href={`/case-studies/${study.slug}`}
                className="group rounded-[28px] border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5"
              >
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-teal">
                  {study.industry}
                </p>
                <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-teal">
                  {study.client}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {study.problem}
                </p>
                <div className="support-panel rounded-[22px] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Outcome
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {study.outcome}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 pt-5 text-sm font-medium text-foreground transition-colors group-hover:text-teal">
                  Read case study
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 sm:hidden">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-teal"
          >
            View all case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function KnowledgePreview() {
  const featuredKnowledge = knowledgeBriefs.filter((brief) => brief.featured).slice(0, 3)

  return (
    <section className="homepage-knowledge-section deferred-section border-y border-border bg-secondary/50 py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Authority
            </p>
            <h2 className="mb-2 text-3xl font-semibold text-foreground">
              Knowledge base
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Practical field notes on execution, architecture, data trust, and
              delivery governance for founders and operators carrying real complexity.
            </p>
            <Link
              href="/launchpad"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
            >
              Explore Launchpad
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Link
            href="/knowledge"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:bg-background"
          >
            Browse the knowledge base
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredKnowledge.map((brief) => (
            <Link
              key={brief.slug}
              href={`/knowledge/${brief.slug}`}
              className="group flex h-full flex-col rounded-[28px] border border-border/85 bg-background p-7 transition-all hover:-translate-y-1 hover:border-teal/35 hover:shadow-lg hover:shadow-teal/5"
            >
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                {knowledgeCategories.find((category) => category.id === brief.category)?.label}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-foreground text-balance transition-colors group-hover:text-teal">
                {brief.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {brief.description}
              </p>
              <div className="support-panel mt-6 rounded-[20px] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Best for
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {brief.takeaway}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors group-hover:text-foreground">
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="homepage-final-cta-section deferred-section bg-foreground py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
            Best next move
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-background text-balance">
            If the business is feeling drag, start where the signal gets sharper
          </h2>
          <p className="max-w-2xl text-background/70">
            Start with the Founder Review when architecture, data, integrations,
            and operating friction are colliding. If you already know the shape
            of the work, start a conversation and Amalgam will point you to the
            right next step.
          </p>
        </div>
        <div className="homepage-final-cta-panel rounded-[24px] border border-background/12 bg-background/[0.04] p-6">
          <div className="space-y-3">
            {[
              "Paid senior diagnostic, not ornamental discovery",
              "Built to create a real next step, not prolong the process",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 border-t border-background/10 px-0 py-3 text-sm text-background first:border-t-0 first:pt-0"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/founder-review"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-all hover:opacity-90"
            >
              Start the Founder Review
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-background/30 px-6 py-3 font-medium text-background transition-all hover:bg-background/10"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-background">
        <Hero />
        <FounderReviewEntry />
        <WhatWeDo />
        <WhoWeHelp />
        <TypicalTriggers />
        <VersatilistEra />
        <EngagementJourney />
        <WhyAmalgam />
        <EntryOffers />
        <TrustSection />
        <FeaturedCaseStudies />
        <KnowledgePreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}


