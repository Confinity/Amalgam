import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { TeamMemberCard } from "@/components/cards/TeamMemberCard"
import { PageHero } from "@/components/heroes/PageHero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrackedButton } from "@/components/ui/TrackedButton"
import { Card } from "@/components/ui/Card"
import { TrustBand } from "@/components/ui/TrustBand"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { caseStudies } from "@/content/caseStudies"
import { leadershipTeam, teamProfiles } from "@/content/team"
import { getCaseStudyPath } from "@/lib/case-study-system"
import { clientLogos } from "@/lib/client-logos"
import { withBasePath } from "@/lib/site-config"
import { testimonials } from "@/lib/testimonials"

export const metadata: Metadata = {
  title: "Meet the team you'll actually work with",
  description:
    "A small leadership team helping founders and product teams make clear decisions and keep work moving.",
  alternates: {
    canonical: "/about",
  },
}

const howWeShowUp = [
  {
    title: "We work directly",
    detail: "You work with experienced people close to the decisions, not layers of handoff.",
  },
  {
    title: "We go to the real blocker",
    detail: "We focus on what is actually slowing the work down, not the loudest symptom.",
  },
  {
    title: "We stay close to the work",
    detail: "We help make the next move clear, then stay with the work until momentum returns.",
  },
  {
    title: "We give judgment, not just advice",
    detail: "We help teams choose, sequence, and move instead of adding more abstraction.",
  },
]

const fitSignals = [
  "Direction, delivery, and architecture are pulling in different directions",
  "The team needs a clear next move, not another layer of advice",
  "Work is active, and leadership needs sharper sequencing quickly",
]

const primaryProofSlug = "mt-bank"
const secondaryProofSlug = "barclays-bank-us"

export default function AboutPage() {
  const founder = leadershipTeam[0] ?? teamProfiles[0]!
  const primaryProofCase =
    caseStudies.find((study) => study.slug === primaryProofSlug) ?? caseStudies[0]!
  const secondaryProofCase =
    caseStudies.find((study) => study.slug === secondaryProofSlug) ??
    caseStudies.find((study) => study.slug !== primaryProofCase.slug) ??
    primaryProofCase
  const aboutTestimonial =
    testimonials.find((testimonial) => testimonial.id === "mendez-pearlx") ??
    testimonials[1] ??
    testimonials[0]!

  return (
    <>
      <Navigation />
      <main id="main-content">
        <PageHero
          eyebrow="Who we are"
          scale="mediumLarge"
          tone="soft"
          className="pt-[128px] pb-[50px] md:pt-[144px] md:pb-[62px] lg:pt-[158px] lg:pb-[74px]"
          gridClassName="lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:items-center lg:gap-10"
          artifactClassName="w-full max-w-[430px] lg:justify-self-end"
          title={
            <h1 className="max-w-[20ch]">
              Meet the team you&rsquo;ll <span className="hero-title-accent">actually work with.</span>
            </h1>
          }
          support="A small leadership team helping founders and product teams make clear decisions and keep work moving."
          actions={
            <>
              <TrackedButton
                href="/contact"
                eventName="strategy_call_clicked"
                eventData={{
                  surface_id: "about_hero",
                  cta_id: "about_hero_strategy_call",
                  cta_label: "Get a recommendation",
                  destination: "/contact",
                }}
              >
                Get a recommendation
              </TrackedButton>
              <TrackedButton
                href="/team"
                variant="secondary"
                eventName="section_cta_clicked"
                eventData={{
                  surface_id: "about_hero",
                  cta_id: "about_hero_view_team",
                  cta_label: "View full team",
                  cta_variant: "secondary",
                  destination: "/team",
                }}
              >
                View full team
              </TrackedButton>
            </>
          }
          artifact={
            <Card variant="primary" className="overflow-hidden p-0">
              <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(176deg,rgba(242,247,246,0.95),rgba(240,244,248,0.9))]">
                <Image
                  src={withBasePath(founder.image)}
                  alt={founder.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-contain object-bottom px-4 pt-4"
                />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">Founder</p>
                <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">{founder.name}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{founder.role}</p>
                <p className="mt-3 text-sm text-[var(--color-text)]">Works directly with teams on product, delivery, and systems decisions.</p>
              </div>
            </Card>
          }
        />

        <section className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <h2>How we show up when the work is hard</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {howWeShowUp.map((item) => (
                <Card key={item.title} interactive>
                  <h3 className="text-base font-semibold text-[var(--color-text)]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{item.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-compact">
          <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <Card variant="primary" className="p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">Why Amalgam exists</p>
              <h2 className="mt-3 text-3xl font-semibold">Built to help teams get clear and keep work moving</h2>
              <p className="mt-4 text-base">
                We built Amalgam to help teams get clear faster, choose the next move, and keep the work moving.
              </p>
              <p className="mt-5 text-sm font-semibold text-[var(--color-text)]">{founder.name}, {founder.role}</p>
            </Card>

            <Card className="p-6 md:p-7">
              <h3 className="text-2xl font-semibold">When teams usually bring us in</h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--color-text)]">
                {fitSignals.map((signal) => (
                  <li key={signal} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent-strong)]" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        <section className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2>Who you&rsquo;ll work with</h2>
                <p className="mt-4 max-w-2xl text-base">A quick look at the people you&apos;ll work with directly.</p>
              </div>
              <Link href="/team" className="inline-flex min-h-11 items-center py-2 text-sm font-medium text-[var(--color-accent-strong)]">
                View full team
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {leadershipTeam.slice(0, 3).map((member) => (
                <TeamMemberCard key={member.id} member={member} featured expertiseLimit={1} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-tight border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="container-site">
            <Card variant="secondary" className="overflow-hidden p-0 md:grid md:grid-cols-[220px_minmax(0,1fr)]">
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-surface-muted)] md:aspect-auto md:min-h-[168px]">
                <Image
                  src={withBasePath(primaryProofCase.source.heroImageSrc)}
                  alt={`${primaryProofCase.company} case study thumbnail`}
                  fill
                  sizes="(max-width: 768px) 100vw, 220px"
                  className="object-cover"
                />
              </div>
              <div className="p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">Case study</p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--color-text)]">{primaryProofCase.company}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  <span className="font-semibold text-[var(--color-text)]">Problem:</span> {primaryProofCase.challenge}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  <span className="font-semibold text-[var(--color-text)]">What changed:</span> {primaryProofCase.whatMovedForward}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <TrackedButton
                    href={getCaseStudyPath(primaryProofCase.slug)}
                    variant="secondary"
                    eventName="section_cta_clicked"
                    eventData={{
                      surface_id: "about_case_proof",
                      cta_id: "about_case_proof_open",
                      cta_label: "Open case study",
                      cta_variant: "secondary",
                      destination: getCaseStudyPath(primaryProofCase.slug),
                    }}
                  >
                    Open case study
                  </TrackedButton>
                  <Link
                    href={getCaseStudyPath(secondaryProofCase.slug)}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--color-accent-strong)]"
                  >
                    See another example
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <TrustBand
          eyebrow="Proof"
          title="Trusted when execution gets hard"
          support="Teams bring us in when the next move is unclear and execution quality has to stay high."
          logos={clientLogos.map((logo) => ({ name: logo.name, src: logo.src, href: logo.href }))}
          testimonial={{
            quote: aboutTestimonial.quote,
            name: aboutTestimonial.name,
            role: aboutTestimonial.title,
            company: aboutTestimonial.company,
            image: aboutTestimonial.image,
          }}
          ctaLabel="View all case studies"
          ctaHref="/our-work"
        />

        <FinalCtaBand
          headline="Want to talk through whether this is the right fit?"
          support="Share your context and we&apos;ll recommend the clearest next step for how we should work together."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  )
}



