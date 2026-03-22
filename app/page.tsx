import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { ArtifactPreview } from "@/components/artifacts/ArtifactPreview"
import { PageHero } from "@/components/heroes/PageHero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrackedLink } from "@/components/tracked-link"
import { OfferComparison } from "@/components/sections/OfferComparison"
import { HomeCaseStudyRotator } from "@/components/sections/HomeCaseStudyRotator"
import { HomeResearchRotator } from "@/components/sections/HomeResearchRotator"
import { ResearchSourcesMarquee } from "@/components/sections/ResearchSourcesMarquee"
import { HomeNextStepOptions } from "@/components/sections/HomeNextStepOptions"
import { PressureCardGrid } from "@/components/sections/PressureCardGrid"
import { TrackedButton } from "@/components/ui/TrackedButton"
import { TrustBand } from "@/components/ui/TrustBand"
import { homeCaseStudies } from "@/content/caseStudies"
import {
  homeResearchFeaturedArticles,
  homeResearchQuickLinks,
  homeResearchSourcesPreview,
} from "@/content/knowledge"
import {
  homepageAudiences,
  homepageCapabilities,
  homepageCopy,
  trustFrame,
} from "@/content/site"
import { clientLogos } from "@/lib/client-logos"
import { testimonials } from "@/lib/testimonials"

export const metadata: Metadata = {
  title: "We help teams get unstuck under delivery pressure | Amalgam",
  description:
    "We help founders, product leads, and engineering teams get unstuck when delivery pressure is high. Find what's blocked, choose the next move, and keep delivery steady.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "We help teams get unstuck under delivery pressure | Amalgam",
    description:
      "We help founders, product leads, and engineering teams get unstuck when delivery pressure is high. Find what's blocked, choose the next move, and keep delivery steady.",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "We help teams get unstuck under delivery pressure | Amalgam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We help teams get unstuck under delivery pressure | Amalgam",
    description:
      "We help founders, product leads, and engineering teams get unstuck when delivery pressure is high. Find what's blocked, choose the next move, and keep delivery steady.",
    images: ["/opengraph-image"],
  },
}

export default function HomePage() {
  return (
    <>
      <Navigation primaryCtaLabel="Find your next move" primaryCtaHref="/next-move" />
      <main id="main-content">
        <PageHero
          scale="large"
          tone="soft"
          className="hero-depth-home"
          title={
            <h1 className="hero-home-headline max-w-none font-semibold">
              <span className="block xl:whitespace-nowrap">From idea to scale</span>
              <span className="headline-accent block xl:whitespace-nowrap">without the chaos.</span>
            </h1>
          }
          support={homepageCopy.support}
          helper={homepageCopy.helper}
          gridClassName="lg:grid-cols-[minmax(0,1.58fr)_minmax(0,1fr)] lg:items-center lg:gap-8 xl:gap-10"
          contentClassName="max-w-none lg:max-w-[43rem]"
          supportClassName="copy-support-strong max-w-[48ch] text-[1.12rem] leading-[1.56]"
          actionsClassName="gap-2.5 sm:gap-3.5"
          artifactClassName="w-full max-w-[560px] lg:max-w-[420px] lg:justify-self-end xl:max-w-[448px]"
          actions={
            <>
              <TrackedButton
                href="/next-move"
                withArrow
                eventName="hero_cta_clicked"
                eventData={{
                  surface_id: "home_hero",
                  cta_id: "home_hero_find_stage",
                  cta_label: "Find your next move",
                  cta_variant: "primary",
                  destination: "/next-move",
                }}
              >
                Find your next move
              </TrackedButton>
              <TrackedButton
                href="/contact"
                variant="secondary"
                className="border-tier-soft bg-[color-mix(in_srgb,var(--color-surface)_98%,white_2%)] text-[var(--color-text-subtle)]"
                eventName="strategy_call_clicked"
                eventData={{
                  surface_id: "home_hero",
                  cta_id: "home_hero_strategy_call",
                  cta_label: "Get a recommendation",
                  destination: "/contact",
                }}
              >
                Get a recommendation
              </TrackedButton>
            </>
          }
          artifact={<ArtifactPreview type="execution-brief" />}
        />

        <PressureCardGrid
          title="How we help you get unstuck"
          support="When things feel messy, we help you see what's blocking progress and what to do next."
          className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
          signals={homepageCapabilities}
          variant="capability"
        />

        <OfferComparison />

        <section
          id="home-audience-fit"
          className="section-space border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]"
        >
          <div className="container-site">
            <div>
              <h2>Who this is for</h2>
              <p className="copy-support-strong mt-4 max-w-2xl text-base">
                These are the teams we help most when the next decision really matters.
              </p>
            </div>

            <ul className="mt-11 grid gap-x-10 gap-y-7 md:grid-cols-2">
              {homepageAudiences.map((audience) => (
                <li
                  key={audience.title}
                  className="border-b border-[color-mix(in_srgb,var(--color-border)_86%,transparent)] pb-4 md:pb-5"
                >
                  <p className="text-lg font-semibold text-[var(--color-text)]">{audience.title}</p>
                  <div className="brand-key-row mt-2">
                    <span aria-hidden="true" className="brand-key-dot" />
                    <p className="text-sm leading-6 text-[var(--color-text-muted)]">{audience.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <TrustBand
          title={homepageCopy.proofTitle}
          support={trustFrame}
          tone="plain"
          className="section-space border-y border-[var(--color-border)] band-cool-subtle"
          logos={clientLogos.map((logo) => ({
            name: logo.name,
            src: logo.src,
            href: logo.href,
          }))}
          testimonial={{
            quote: testimonials[0]!.quote,
            name: testimonials[0]!.name,
            role: testimonials[0]!.title,
            company: testimonials[0]!.company,
            image: testimonials[0]!.image,
          }}
          ctaLabel="Browse case studies"
          ctaHref="/our-work"
        />

        <section id="home-case-studies" className="section-compact border-y border-[var(--color-border)] band-neutral-subtle">
          <div className="container-site">
            <div className="flex flex-wrap items-start justify-between gap-4 sm:items-end sm:gap-5">
              <div>
                <h2>{homepageCopy.caseStudiesTitle}</h2>
                <p className="copy-support-strong mt-3 max-w-[56ch] text-base">
                  Real examples of teams finding clarity and getting work moving again.
                </p>
              </div>
              <TrackedLink
                href="/our-work"
                eventName="section_cta_clicked"
                eventData={{
                  surface_id: "home_featured_work",
                  cta_id: "home_featured_work_view_all",
                  cta_label: "See all case studies",
                  cta_variant: "secondary",
                  destination: "/our-work",
                }}
                className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-[var(--color-accent-strong)]"
              >
                See all case studies
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <HomeCaseStudyRotator studies={homeCaseStudies} />
          </div>
        </section>

        <section
          id="home-research"
          className="section-space border-t border-[var(--color-border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-surface)_96%,white_4%)_0%,color-mix(in_srgb,var(--color-surface-muted)_60%,white_40%)_100%)]"
        >
          <div className="container-site">
            <div className="flex flex-wrap items-start justify-between gap-4 sm:items-end sm:gap-5">
              <div>
                <h2>{homepageCopy.knowledgeTitle}</h2>
                <p className="copy-support-strong mt-3 max-w-[56ch] text-base">
                  We publish short briefs from delivery work and outside research so you can choose your next move faster.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                    Top reads this week
                  </span>
                  {homeResearchQuickLinks.map((link) => (
                    <TrackedLink
                      key={link.slug}
                      href={`/research/${link.slug}`}
                      eventName="article_opened"
                      eventData={{
                        source: "home_research_top_reads",
                        slug: link.slug,
                      }}
                      className="inline-flex min-h-8 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm font-medium text-[var(--color-accent-strong)]"
                    >
                      {link.label}
                    </TrackedLink>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <TrackedLink
                  href="/research#start-with-this"
                  eventName="section_cta_clicked"
                  eventData={{
                    surface_id: "home_featured_briefings",
                    cta_id: "home_featured_briefings_start_with_this",
                    cta_label: "Start with this",
                    cta_variant: "secondary",
                    destination: "/research#start-with-this",
                  }}
                  className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-[var(--color-accent-strong)]"
                >
                  Start with this
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  href="/research/library"
                  eventName="section_cta_clicked"
                  eventData={{
                    surface_id: "home_featured_briefings",
                    cta_id: "home_featured_briefings_browse_all",
                    cta_label: "Browse all research",
                    cta_variant: "secondary",
                    destination: "/research/library",
                  }}
                  className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-[var(--color-text-subtle)] hover:text-[var(--color-accent-strong)]"
                >
                  Browse all research
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </div>
            </div>

            <HomeResearchRotator articles={homeResearchFeaturedArticles} />

            <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-sm font-medium text-[var(--color-text)]">Where we look</p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                We review major labs, standards bodies, and universities each week.
              </p>
              <ResearchSourcesMarquee
                sources={homeResearchSourcesPreview}
                compact
                animate
                className="mt-3"
              />
              <p className="mt-2 text-xs text-[var(--color-text-subtle)]">
                These sources inform our view. They don&apos;t endorse our conclusions.
              </p>
            </div>
          </div>
        </section>

        <HomeNextStepOptions />
      </main>
      <Footer variant="home" />
    </>
  )
}



