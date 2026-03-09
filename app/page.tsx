import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Database,
  Gauge,
  GitBranch,
  Layers,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ClientLogoWall } from "@/components/client-logo-wall"
import { HeroDiagnosticPanel } from "@/components/hero-diagnostic-panel"
import { HomeFeaturedCaseStudies } from "@/components/home-featured-case-studies"
import { TestimonialStrip } from "@/components/testimonial-strip"
import { caseStudies } from "@/lib/case-studies-data"
import { knowledgeBriefs, knowledgeCategories } from "@/lib/knowledge-briefs"

export const metadata: Metadata = {
  title: "Complex systems. Clearer decisions. Faster execution.",
  description:
    "Amalgam helps founders, executives, and technical leaders bring clarity to complex systems and restore delivery momentum.",
  alternates: {
    canonical: "/",
  },
}

function Hero() {
  return (
    <section className="homepage-hero relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="pointer-events-none absolute top-0 right-0 h-[640px] w-[640px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(0,191,166,0.14)_0%,transparent_72%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[440px] w-[440px] translate-y-1/3 -translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(106,92,255,0.1)_0%,transparent_72%)]" />

      <div className="mx-auto max-w-[1200px] px-6">
        <div className="hero-layout">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Senior operators for complex delivery moments
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl lg:text-[58px]">
              Complex systems.{" "}
              <span className="bg-gradient-to-r from-teal to-purple bg-clip-text text-transparent">
                Clearer decisions. Faster execution.
              </span>
            </h1>
            <p className="hero-body mt-6 text-lg leading-relaxed text-muted-foreground">
              When delivery slows down, we help you see what is really causing it
              and what to do next.
            </p>
            <p className="hero-fit-line mt-5">
              Best for founders, business leaders, and technical teams carrying
              architecture, data, integration, and execution drag at the same
              time.
            </p>
            <div className="hero-cta-row mt-3">
              <Link
                href="/contact?interest=strategy-session"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
              >
                Book a free strategy call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-lg border border-border/90 px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted/70 hover:text-foreground"
              >
                See case studies
              </Link>
            </div>

            <div className="hero-trust-strip mt-7 border-t border-border/70 pt-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-muted-foreground">
                <span>Founded 2012</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>Small senior team</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>Deep systems experience</span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground/90">
                You get direct senior attention, clear thinking, and practical
                next steps.
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

function WhatWeDo() {
  const outcomes = [
    {
      icon: Compass,
      title: "Get a clean read",
      description: "Find what is actually slowing delivery and where risk is building.",
    },
    {
      icon: Layers,
      title: "Stabilize the system",
      description:
        "Reduce architecture and integration friction so teams can move with less noise.",
    },
    {
      icon: Zap,
      title: "Recover momentum",
      description: "Turn stuck work into a practical sequence leadership can trust.",
    },
    {
      icon: Target,
      title: "Support follow-through",
      description:
        "Stay close through execution when decisions need senior judgment in real time.",
    },
  ]

  return (
    <section className="homepage-core-offer-section border-t border-border py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
            What Amalgam does
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-foreground">
            Senior help for systems, decisions, and delivery
          </h2>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            We work at the system level so teams can stop guessing and start moving.
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
    <section className="homepage-audiences-section deferred-section border-y border-border bg-secondary/45 py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground">Who we help</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                <Users className="h-5 w-5 text-teal" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Founders and business leaders
              </h3>
            </div>
            <p className="mb-5 text-muted-foreground">
              When growth increases complexity and delivery starts slowing down.
            </p>
            <ul className="space-y-3">
              {[
                "Shipping slowed after growth or a raise",
                "Execution feels noisier than it should",
                "Teams are working hard but outcomes slip",
                "Roadmap confidence keeps dropping",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-background p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                <Shield className="h-5 w-5 text-teal" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Technical and product operators
              </h3>
            </div>
            <p className="mb-5 text-muted-foreground">
              When architecture, integrations, data, and delivery all collide.
            </p>
            <ul className="space-y-3">
              {[
                "Hidden integration cost keeps growing",
                "Ownership is split across too many teams",
                "Important decisions are blocked by ambiguity",
                "Execution depends on too few people",
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
    {
      icon: Gauge,
      text: "Shipping slowed after growth",
      href: "/knowledge/operating-rhythm-after-growth",
    },
    {
      icon: Layers,
      text: "System changes carry too much risk",
      href: "/knowledge/modernize-vs-rebuild",
    },
    {
      icon: GitBranch,
      text: "Integrations keep creating drag",
      href: "/knowledge/integration-tax",
    },
    {
      icon: Database,
      text: "Nobody fully trusts the numbers",
      href: "/knowledge/post-series-a-data-foundations",
    },
    {
      icon: Target,
      text: "Roadmap priorities keep shifting",
      href: "/knowledge/architecture-map-before-roadmap",
    },
    {
      icon: Zap,
      text: "Execution feels harder each quarter",
      href: "/knowledge/delivery-velocity-is-a-systems-problem",
    },
  ]

  return (
    <section className="homepage-triggers-section deferred-section py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Common pressure points
            </p>
            <h2 className="mb-4 text-3xl font-semibold text-foreground">
              When teams usually reach out
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              These patterns show up before most teams call us. Each one links to
              a practical article so you can pressure-test the situation first.
            </p>
            <Link
              href="/contact?interest=strategy-session"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
            >
              Talk to us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {triggers.map((trigger) => (
              <Link
                key={trigger.text}
                href={trigger.href}
                className="support-panel flex items-center gap-4 p-5 transition-colors hover:border-teal/35"
              >
                <trigger.icon className="h-5 w-5 shrink-0 text-teal" />
                <span className="text-foreground">{trigger.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Offers() {
  const offers = [
    {
      title: "Free strategy call",
      subtitle: "60 minutes",
      description:
        "A direct call to review what is happening and decide the right next move.",
      points: [
        "Senior second set of eyes",
        "Fast fit check",
        "Clear recommendation",
      ],
      href: "/contact?interest=strategy-session",
      ctaLabel: "Book the call",
      primary: true,
    },
    {
      title: "Focused delivery support",
      subtitle: "Paid engagements",
      description:
        "When the work needs deeper diagnosis, sequencing, or follow-through, we move into the right engagement model.",
      points: [
        "Founder Review for diagnosis",
        "Execution Sprint for sequencing",
        "Outcome Partnership for follow-through",
      ],
      href: "/services",
      ctaLabel: "See service options",
      primary: false,
    },
  ]

  return (
    <section className="homepage-offers-section deferred-section border-y border-border bg-secondary/45 py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 max-w-3xl">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Start simple</h2>
          <p className="text-muted-foreground">
            One clear first step, then deeper support only when it adds real value.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className={`rounded-[26px] p-8 ${
                offer.primary
                  ? "border border-teal/40 bg-background shadow-[0_14px_34px_rgba(0,191,166,0.08)]"
                  : "support-panel"
              }`}
            >
              {offer.primary ? (
                <span className="mb-4 inline-flex rounded-full border border-teal/25 bg-teal/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Best starting point
                </span>
              ) : null}
              <h3 className="text-2xl font-semibold text-foreground">{offer.title}</h3>
              <p className="mt-1 text-sm font-medium text-teal">{offer.subtitle}</p>
              <p className="mt-4 text-muted-foreground">{offer.description}</p>
              <ul className="mt-6 space-y-2">
                {offer.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={offer.href}
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
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
      eyebrow="Client experience"
      title="Trusted in complex environments"
      description="Selected client experience across banking, fintech, insurance, and enterprise systems."
      showCaseStudiesCta
    />
  )
}

function FeaturedCaseStudies() {
  const featured = caseStudies.filter((cs) => cs.featured)

  return (
    <section className="homepage-case-studies-section deferred-section border-t border-border py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Case studies
            </p>
            <h2 className="mb-2 text-3xl font-semibold text-foreground">
              Real situations. Real constraints. Real outcomes.
            </h2>
            <p className="text-muted-foreground">
              Featured examples rotate on each load.
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

        <HomeFeaturedCaseStudies featuredStudies={featured} />

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
              Knowledge
            </p>
            <h2 className="mb-2 text-3xl font-semibold text-foreground">
              Practical thinking for messy systems work
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Clear, field-tested articles on execution drag, architecture choices,
              and decision quality.
            </p>
          </div>
          <Link
            href="/knowledge"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:bg-background"
          >
            Browse knowledge
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
            Next step
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-background text-balance">
            Get a senior second set of eyes on what is slowing delivery
          </h2>
          <p className="max-w-2xl text-background/70">
            Start with a free strategy call. If deeper work is needed, we will
            recommend the right path.
          </p>
        </div>
        <div className="homepage-final-cta-panel rounded-[24px] border border-background/12 bg-background/[0.04] p-6">
          <div className="space-y-3">
            {[
              "Direct conversation with a senior operator",
              "Clear recommendation on what to do next",
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
              href="/contact?interest=strategy-session"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-all hover:opacity-90"
            >
              Book a free strategy call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-background/30 px-6 py-3 font-medium text-background transition-all hover:bg-background/10"
            >
              Explore services
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
        <WhatWeDo />
        <WhoWeHelp />
        <TypicalTriggers />
        <Offers />
        <TestimonialStrip className="deferred-section border-t border-border py-20 lg:py-24" />
        <TrustSection />
        <FeaturedCaseStudies />
        <KnowledgePreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
