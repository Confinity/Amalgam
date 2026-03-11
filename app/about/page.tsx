import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Users,
  Target,
  Zap,
  Eye,
  Shield,
  Clock,
  Compass,
  Layers3,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ClientLogoWall } from "@/components/client-logo-wall"
import { TestimonialStrip } from "@/components/testimonial-strip"
import { Footer } from "@/components/footer"
import {
  teamMembers,
  unifiedTeamPortraitBackgroundClass,
  unifiedTeamPortraitClasses,
  unifiedTeamPortraits,
} from "@/lib/team-members"
import { withBasePath } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Who you work with at Amalgam",
  description:
    "Founded in 2012, Amalgam helps business and technical leaders fix complex system issues that slow execution.",
  alternates: {
    canonical: "/about",
  },
}

const principles = [
  {
    icon: Target,
    title: "We make the next move clear",
    description:
      "We focus on what matters and make the next move clear.",
  },
  {
    icon: Shield,
    title: "You get experienced judgment",
    description:
      "You work with people who have handled this before.",
  },
  {
    icon: Zap,
    title: "We keep execution moving",
    description:
      "We remove blockers so teams can move with less drag.",
  },
  {
    icon: Eye,
    title: "We tell you what we actually see",
    description:
      "We say what we see and explain every recommendation clearly.",
  },
  {
    icon: Users,
    title: "We focus on what gets shipped",
    description:
      "Outcomes matter more than hours. We care about what gets shipped.",
  },
  {
    icon: Clock,
    title: "We stay practical under constraints",
    description:
      "We work with your real constraints and focus on practical progress.",
  },
]

const founder = teamMembers[0]!
const groupOrder = {
  leadership: 0,
  architecture: 1,
  delivery: 2,
} as const

const aboutPreviewTeamMembers = teamMembers
  .filter((member) => member.name !== "Neeraj")
  .sort((a, b) => groupOrder[a.group] - groupOrder[b.group])
const aboutStats = [
  { value: "2012", label: "Founded" },
  { value: String(teamMembers.length), label: "Team members" },
  { value: "3", label: "Core ways to engage" },
]

const operatingModel = [
  {
    icon: Compass,
    title: "First, understand your real system",
    description:
      "We start by understanding the real system, the real constraints, and the real decision pressure. No pre-packaged playbooks.",
  },
  {
    icon: Layers3,
    title: "Then solve at the system level",
    description:
      "We do not treat execution problems as isolated engineering problems when architecture, workflow, and decision models are all involved.",
  },
  {
    icon: Zap,
    title: "Always bias toward usable progress",
    description:
      "The goal is not perfect theory. The goal is a path leadership can trust and teams can actually move on.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-28">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-teal/8 blur-3xl" />
          <div className="pointer-events-none absolute left-8 top-20 h-56 w-56 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                  About Amalgam
                </p>
                <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                  Want to know who you&apos;ll actually work with?
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Amalgam helps business and technical leaders fix complex system issues so shipping becomes more reliable.
                </p>
              </div>
              <div className="support-panel rounded-[28px] p-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  What clients hire us for
                </p>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>A sharp diagnostic when the real issue is still unclear.</p>
                  <p>Clear sequencing when teams need a roadmap they can trust.</p>
                  <p>Hands-on follow-through when execution needs to stay on track.</p>
                </div>
              </div>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="support-panel rounded-2xl px-5 py-5"
                >
                  <p className="text-3xl font-bold text-teal">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-warm py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center">
              <div className="relative mx-auto aspect-[4/4.2] w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-secondary/50">
                <Image
                  src={withBasePath(founder.image)}
                  alt={founder.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="max-w-3xl">
                <h2 className="mb-6 text-2xl font-semibold text-foreground">A quick note from our founder</h2>
                <blockquote className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    I started Amalgam to keep the work practical and honest.
                  </p>
                  <p>
                    Too many projects create dependency instead of progress. We focus on what is actually slowing the business, make the next move clear, and help teams ship again.
                  </p>
                </blockquote>
                <p className="mt-6 font-medium text-foreground">{founder.fullName ?? founder.name}</p>
                <p className="text-sm text-muted-foreground">{founder.role}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="deferred-section border-y border-border bg-secondary/50 py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Why this model works now
              </p>
              <h2 className="mb-6 text-3xl font-semibold text-foreground text-balance">
                Most execution problems cross team boundaries
              </h2>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Most execution problems are no longer confined to one team. Architecture, product, operations, and decision-making are usually all involved.
                </p>
                <p>
                  That is where Amalgam is most useful: when leaders need clear judgment that connects the full system and gives teams a path they can execute.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="deferred-section py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground">How we operate</h2>
              <p className="mt-2 text-muted-foreground">How you can expect us to work with you.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {principles.map((principle) => (
                <div key={principle.title} className="support-panel rounded-[24px] p-6">
                  <principle.icon className="mb-4 h-6 w-6 text-teal" />
                  <h3 className="mb-2 font-semibold text-foreground">{principle.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section border-y border-border bg-secondary/35 py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Operating Model
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                How we work when stakes are high
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We are intentionally small and direct. The model is built for
                hard, high-constraint situations where decisions need to move.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {operatingModel.map((item) => (
                <div key={item.title} className="border-l border-border/80 pl-5 pr-4 py-2">
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

        <section className="deferred-section section-warm border-t border-border py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">The people you&apos;ll work with</h2>
                <p className="mt-2 text-muted-foreground">
                  Focused support across systems, architecture, and execution.
                </p>
              </div>
              <Link href="/team" className="flex items-center gap-1 text-sm font-medium text-teal hover:underline">
                View full team <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {aboutPreviewTeamMembers.map((member) => (
                <div key={member.name} className="overflow-hidden rounded-[26px] border border-border/80 bg-background">
                  <div
                    className={`relative aspect-[4/4.15] overflow-hidden ${unifiedTeamPortraitBackgroundClass}`}
                  >
                    <Image
                      src={withBasePath(unifiedTeamPortraits[member.name] ?? member.image)}
                      alt={member.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className={`${unifiedTeamPortraitClasses[member.name] ?? "object-contain object-bottom px-5 pt-6 pb-0 md:px-6 md:pt-7"} drop-shadow-[0_18px_32px_rgba(15,23,42,0.12)]`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(252,252,250,0.06),rgba(252,252,250,0.18))]" />
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {member.group === "leadership"
                        ? "Leadership"
                        : member.group === "architecture"
                          ? "Architecture"
                          : "Delivery"}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground">
                      {member.fullName ?? member.name}
                    </h3>
                    <p className="mb-3 mt-1 text-sm text-teal">{member.role}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{member.shortBio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClientLogoWall
          className="py-20 lg:py-24"
          eyebrow="Client Experience"
          title="Trusted in complex environments"
          description="The kinds of complex environments this team has operated in across regulated institutions, operationally demanding companies, and high-growth teams where systems quality directly affects execution."
        />

        <TestimonialStrip
          className="deferred-section border-t border-border py-20 lg:py-24"
          testimonialIds={["fitzmier-jtf", "mooney-cleanitsupply"]}
          maxItems={2}
        />

        <section className="deferred-section bg-foreground py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-background text-balance md:text-4xl">
              Want to see if we&apos;re the right fit for your situation?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-background/70">
              Start with a strategy call. If deeper support is needed, we
              will recommend the right engagement.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact?interest=strategy-session"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-all hover:opacity-90"
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-background/30 px-6 py-3 font-medium text-background transition-all hover:bg-background/10"
              >
                See engagement options
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

