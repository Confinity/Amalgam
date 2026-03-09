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
import { Footer } from "@/components/footer"
import {
  teamMembers,
  unifiedTeamPortraitBackgroundClass,
  unifiedTeamPortraitClasses,
  unifiedTeamPortraits,
} from "@/lib/team-members"

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in 2012, Amalgam is a small senior team that helps founders and versatilists untangle complex systems and restore delivery velocity.",
  alternates: {
    canonical: "/about",
  },
}

const principles = [
  {
    icon: Target,
    title: "Clarity",
    description:
      "We cut through complexity to find the path forward. No vague recommendations or abstract frameworks.",
  },
  {
    icon: Shield,
    title: "Rigor",
    description:
      "We bring senior judgment and technical depth. Every engagement is led by people who have done this before.",
  },
  {
    icon: Zap,
    title: "Momentum",
    description:
      "We help teams move faster, not slower. Our job is to unblock, not to create new dependencies.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Clear communication, honest assessment, no surprises. We say what we see and explain what we recommend.",
  },
  {
    icon: Users,
    title: "Client-first",
    description:
      "Your outcomes matter more than our hours. We measure success by what gets shipped, not time spent.",
  },
  {
    icon: Clock,
    title: "Pragmatism",
    description:
      "We work with what you have. Perfect is the enemy of shipped. We find the 80/20 path to real progress.",
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
  { value: String(teamMembers.length), label: "Senior team members" },
  { value: "3", label: "Core ways to engage" },
]

const operatingModel = [
  {
    icon: Compass,
    title: "Diagnose before prescribing",
    description:
      "We start by understanding the real system, the real constraints, and the real decision pressure. No pre-packaged playbooks.",
  },
  {
    icon: Layers3,
    title: "Work at the system level",
    description:
      "We do not treat delivery problems as isolated engineering problems when the architecture, workflow, and decision model are all involved.",
  },
  {
    icon: Zap,
    title: "Bias toward momentum",
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
                  A small senior team for moments when the business needs a path it can trust.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Amalgam helps founders and versatilists untangle complex systems and
                  restore delivery velocity. We step in when architecture, integrations,
                  data, and operating decisions start to drag execution down.
                </p>
              </div>
              <div className="support-panel rounded-[28px] p-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  What clients hire us for
                </p>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>Fast senior diagnosis when the root problem is still unclear.</p>
                  <p>Clear sequencing when teams need a roadmap they can trust.</p>
                  <p>Hands-on follow-through when momentum needs to be sustained.</p>
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

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center">
              <div className="relative mx-auto aspect-[4/4.2] w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-secondary/50">
                <Image
                  src={founder.image}
                  alt={founder.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="max-w-3xl">
                <h2 className="mb-6 text-2xl font-semibold text-foreground">A note from our founder</h2>
                <blockquote className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    &ldquo;When I founded Amalgam, I wanted to build a practice that reflected my
                    ethos: put clients first, always. We made one promise and have kept it.
                  </p>
                  <p>
                    Too many consulting engagements create dependency instead of progress. They
                    produce decks instead of decisions. They bill hours instead of shipping outcomes.
                  </p>
                  <p>
                    We built Amalgam differently. Our job is to untangle what&apos;s stuck,
                    clarify what&apos;s unclear, and help the business move again.&rdquo;
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
                The era we&apos;re in
              </p>
              <h2 className="mb-6 text-3xl font-semibold text-foreground text-balance">
                The rise of the versatilist
              </h2>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Modern companies no longer win through isolated specialists alone. They win
                  through people who can connect strategy, product, operations, technology, and
                  execution.
                </p>
                <p>
                  These are the versatilists&mdash;technical founders, product leaders, fractional
                  CTOs, and cross-functional builders who carry the burden of alignment. Amalgam
                  exists to help them move with more clarity and less chaos because we&apos;ve
                  carried that weight ourselves.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="deferred-section py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground">How we operate</h2>
              <p className="mt-2 text-muted-foreground">The principles that guide every engagement.</p>
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
                How Amalgam works when the situation is high-stakes and messy
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We are not trying to look large. We are trying to be useful where the work is hardest. The
                model is intentionally senior, direct, and grounded in the actual
                system in front of us.
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

        <section className="deferred-section border-t border-border py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">The team</h2>
                <p className="mt-2 text-muted-foreground">
                  Senior operators across systems, architecture, and delivery.
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
                      src={unifiedTeamPortraits[member.name] ?? member.image}
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
          description="The kinds of complex environments this team has operated in across regulated institutions, operationally demanding companies, and high-growth teams where systems quality directly affects delivery."
        />

        <section className="deferred-section bg-foreground py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-background text-balance md:text-4xl">
              Ready to make the system legible again?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-background/70">
              Start with the Founder Review&mdash;a focused diagnostic to clarify what&apos;s stuck and
              what to do next.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/founder-review"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-all hover:opacity-90"
              >
                Start the Founder Review
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-background/30 px-6 py-3 font-medium text-background transition-all hover:bg-background/10"
              >
                See Case Studies
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
