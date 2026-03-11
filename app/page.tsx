import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Compass, Layers, Target, Users, Wrench, Zap } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ClientLogoWall } from "@/components/client-logo-wall"
import { HomeFeaturedCaseStudies } from "@/components/home-featured-case-studies"
import { TestimonialStrip } from "@/components/testimonial-strip"
import { caseStudies } from "@/lib/case-studies-data"
import { knowledgeBriefs, knowledgeCategories } from "@/lib/knowledge-briefs"

export const metadata: Metadata = {
  title: "From idea to scale - without the chaos.",
  description:
    "Amalgam helps founders, entrepreneurs, and product teams turn ideas into real products and working systems.",
  alternates: {
    canonical: "/",
  },
}

function Hero() {
  return (
    <section className="homepage-hero relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="pointer-events-none absolute top-0 right-0 h-[640px] w-[640px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(0,191,166,0.14)_0%,transparent_72%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[440px] w-[440px] translate-y-1/3 -translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(106,92,255,0.1)_0%,transparent_72%)]" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl lg:text-[58px]">
            From idea to scale - without the chaos.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-foreground/90">
            Amalgam helps founders, entrepreneurs, and product teams turn ideas into real products and working systems.
          </p>
          <div className="mt-6 max-w-3xl space-y-2 text-lg leading-relaxed text-muted-foreground">
            <p>Building something real is rarely simple.</p>
            <p>Ideas evolve. Systems grow. Delivery gets messy.</p>
            <p>
              We help you bring clarity to what you&apos;re building, fix what is slowing progress, and move forward with confidence.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/launchpad"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
            >
              Find my stage
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact?interest=strategy-session"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border/90 px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-border hover:bg-muted/70"
            >
              Book a strategy call
            </Link>
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
      title: "Clarify product direction",
      description: "Get clear on what to build first and why.",
    },
    {
      icon: Zap,
      title: "Fix delivery friction",
      description: "Remove the blockers that keep work from shipping.",
    },
    {
      icon: Layers,
      title: "Simplify complex systems",
      description: "Make architecture and workflows easier to trust.",
    },
    {
      icon: Target,
      title: "Create a clear execution path",
      description: "Turn uncertainty into practical next steps.",
    },
  ]

  return (
    <section className="homepage-core-offer-section section-warm border-t border-border py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-12 max-w-3xl">
          <h2 className="mb-4 text-3xl font-semibold text-foreground">What we help builders solve</h2>
          <p className="max-w-2xl whitespace-pre-line leading-relaxed text-muted-foreground">
            {`Teams usually reach out when progress starts feeling harder than it should.

Maybe product direction is unclear.
Maybe delivery keeps slipping.
Maybe systems start breaking as things grow.

We help identify the real blocker and decide what should happen next.`}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome) => (
            <div key={outcome.title} className="rounded-xl border border-border bg-background p-6">
              <outcome.icon className="mb-4 h-6 w-6 text-teal" />
              <h3 className="mb-2 font-semibold text-foreground">{outcome.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhoWeHelp() {
  const audienceCards = [
    {
      icon: Users,
      title: "Founders building startups",
      body: "From early direction to execution pressure.",
    },
    {
      icon: Compass,
      title: "Entrepreneurs launching new ventures",
      body: "Clear next moves when momentum gets messy.",
    },
    {
      icon: Wrench,
      title: "Solopreneurs building independently",
      body: "Senior thinking without heavyweight process.",
    },
    {
      icon: Target,
      title: "Product and delivery teams",
      body: "Support for planning, systems, and execution.",
    },
  ]

  return (
    <section className="homepage-audiences-section deferred-section border-y border-border bg-secondary/45 py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-semibold text-foreground">Who Amalgam helps</h2>
          <p className="mt-3 text-muted-foreground">
            Amalgam supports people building real products and systems.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {audienceCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-border bg-background p-6">
              <card.icon className="h-5 w-5 text-teal" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TypicalTriggers() {
  const triggers = [
    { icon: Zap, text: "Progress keeps slowing" },
    { icon: Target, text: "Priorities are harder to align" },
    { icon: Layers, text: "Systems are getting harder to trust" },
    { icon: Wrench, text: "Too much coordination for simple work" },
    { icon: Compass, text: "Product direction feels less clear" },
    { icon: Users, text: "Teams are busy, but outcomes still feel off" },
  ]

  return (
    <section className="homepage-triggers-section deferred-section py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="max-w-xl">
            <h2 className="mb-4 text-3xl font-semibold text-foreground">When teams usually reach out</h2>
            <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
              {`Progress slows.
Priorities become harder to align.
Teams are working hard but outcomes still feel off.

We help teams step back, understand what is really happening, and choose the next move with confidence.`}
            </p>
            <Link
              href="/contact?interest=strategy-session"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {triggers.map((trigger) => (
              <div key={trigger.text} className="support-panel flex min-w-0 items-center gap-4 p-5">
                <trigger.icon className="h-5 w-5 shrink-0 text-teal" />
                <span className="min-w-0 break-words text-foreground">{trigger.text}</span>
              </div>
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
      title: "Founder Review",
      subtitle: "Clear first step",
      description:
        "Most teams begin with a Founder Review. It gives leadership a clear read on the situation and a practical path forward.",
      points: ["Clear assessment", "Practical next steps", "Realistic execution path"],
      href: "/founder-review",
      ctaLabel: "See how we work",
      primary: true,
    },
    {
      title: "Execution Sprint",
      subtitle: "When planning is the blocker",
      description:
        "Turn a clear situation into a roadmap your team can realistically execute.",
      points: ["Constraint-aware planning", "30/60/90 sequence", "Leadership-ready roadmap"],
      href: "/execution-sprint",
      ctaLabel: "See how we work",
      primary: false,
    },
    {
      title: "Outcome Partnership",
      subtitle: "When follow-through is the risk",
      description:
        "Stay supported while priorities evolve and execution pressure rises.",
      points: ["Senior continuity", "Fast unblocking", "Steady momentum"],
      href: "/outcome-partnership",
      ctaLabel: "See how we work",
      primary: false,
    },
  ]

  return (
    <section className="homepage-offers-section deferred-section border-y border-border bg-secondary/45 py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-10 max-w-3xl">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Start with one clear step</h2>
          <p className="whitespace-pre-line text-muted-foreground">
            {`Most teams begin with a Founder Review.

It gives leadership a clear read on the situation and a practical path forward.

If deeper support is needed, we move into execution planning and hands-on support.`}
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
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
                  Recommended first step
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
      description="We’ve supported teams across fintech, banking, energy, retail, philanthropy, and enterprise software. These environments share one thing: complexity that cannot be solved with generic advice."
      showCaseStudiesCta
    />
  )
}

function FeaturedCaseStudies() {
  const featured = caseStudies.filter((cs) => cs.featured)

  return (
    <section className="homepage-case-studies-section deferred-section section-warm border-t border-border py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-teal">Case studies</p>
            <h2 className="mb-2 text-3xl font-semibold text-foreground">See work in situations like yours</h2>
            <p className="whitespace-pre-line text-muted-foreground">{`Real situations.
Real constraints.
Clear outcomes.`}</p>
          </div>
          <Link
            href="/case-studies"
            className="hidden items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-teal sm:inline-flex"
          >
            See case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <HomeFeaturedCaseStudies featuredStudies={featured} />
      </div>
    </section>
  )
}

function KnowledgePreview() {
  const featuredKnowledge = knowledgeBriefs.filter((brief) => brief.featured).slice(0, 3)

  return (
    <section className="homepage-knowledge-section deferred-section border-y border-border bg-secondary/50 py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-teal">Knowledge</p>
            <h2 className="mb-2 text-3xl font-semibold text-foreground">Read this when systems get messy</h2>
            <p className="max-w-xl text-muted-foreground">
              Short practical notes on architecture, delivery, data, and leadership decisions when systems get messy.
            </p>
          </div>
          <Link
            href="/knowledge"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:bg-background"
          >
            Explore knowledge
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
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{brief.description}</p>
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
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">Next step</p>
          <h2 className="mb-4 text-3xl font-semibold text-background text-balance">Need a clear next step?</h2>
          <p className="max-w-2xl whitespace-pre-line text-background/70">
            {`Use Launchpad if you want to self-serve first.
If you want direct support, book a strategy call.`}
          </p>
        </div>
        <div className="homepage-final-cta-panel rounded-[24px] border border-background/12 bg-background/[0.04] p-6">
          <div className="space-y-3">
            {["Self-serve guidance in Launchpad", "Direct support when you need it"].map((item) => (
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
              href="/launchpad"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-all hover:opacity-90"
            >
              Find my stage
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact?interest=strategy-session"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-background/30 px-6 py-3 font-medium text-background transition-all hover:bg-background/10"
            >
              Book a strategy call
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
        <TestimonialStrip
          className="deferred-section border-t border-border py-20 lg:py-24"
          testimonialIds={["fitzmier-jtf", "mendez-pearlx", "mooney-cleanitsupply"]}
        />
        <TrustSection />
        <FeaturedCaseStudies />
        <KnowledgePreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
