import type { Metadata } from "next"
import { ArtifactPreview } from "@/components/artifacts/ArtifactPreview"
import { PageHero } from "@/components/heroes/PageHero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrackedButton } from "@/components/ui/TrackedButton"
import { Card } from "@/components/ui/Card"
import { TrustBand } from "@/components/ui/TrustBand"
import { EngagementTimeline } from "@/components/sections/EngagementTimeline"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { PressureCardGrid } from "@/components/sections/PressureCardGrid"
import { deeperSupportAreas } from "@/content/offers"
import { serviceSignals } from "@/content/site"
import { clientLogos } from "@/lib/client-logos"
import { buildRouteMetadata } from "@/lib/seo"
import { testimonials } from "@/lib/testimonials"

export const metadata: Metadata = buildRouteMetadata({
  title: "Execution Support Services: Founder Review, Expert Guidance, Outcome Partnership",
  description:
    "Choose the support that fits your situation: clear read, expert guidance, or ongoing outcome partnership.",
  canonicalPath: "/services",
})

export default function ServicesPage() {
  return (
    <>
      <Navigation servicesLabel="What we offer" primaryCtaLabel="Get a recommendation" />
      <main id="main-content">
        <PageHero
          eyebrow="What we offer"
          scale="mediumLarge"
          tone="soft"
          className="hero-depth-service"
          title={
            <h1 className="max-w-[19ch]">
              If building or scaling gets harder than it should, <span className="hero-title-accent">start here.</span>
            </h1>
          }
          support="When building or scaling gets messy, we help you see what's stuck and what to do next."
          supportClassName="copy-support-strong max-w-[46ch]"
          actions={
            <>
              <TrackedButton
                href="/contact"
                withArrow
                eventName="strategy_call_clicked"
                eventData={{
                  surface_id: "services_hero",
                  cta_id: "services_hero_strategy_call",
                  cta_label: "Get a recommendation",
                  destination: "/contact",
                }}
              >
                Get a recommendation
              </TrackedButton>
              <TrackedButton
                href="/our-work"
                variant="secondary"
                eventName="hero_cta_clicked"
                eventData={{
                  surface_id: "services_hero",
                  cta_id: "services_hero_view_work",
                  cta_label: "See case studies",
                  cta_variant: "secondary",
                  destination: "/our-work",
                }}
              >
                See case studies
              </TrackedButton>
            </>
          }
          artifact={<ArtifactPreview type="system-map" />}
        />

        <PressureCardGrid
          title="When teams usually reach out"
          support="These are common moments when teams need a clearer next step to move forward."
          className="section-space border-y border-[var(--color-border)] bg-[var(--color-surface)]"
          supportClassName="max-w-[44ch]"
          gridClassName="mt-10"
          signals={serviceSignals}
          variant="timing"
          headerAlign="center"
        />

        <EngagementTimeline className="section-space border-y border-[var(--color-border)] band-neutral-subtle" />

        <section className="section-space border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="container-site">
            <div className="mx-auto max-w-[45rem] text-center">
              <h2>Where deeper support helps most</h2>
              <p className="copy-support-strong mt-4 text-base">
                Once we find what&apos;s blocking progress, we go deeper where it will help the most.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {deeperSupportAreas.map((area) => (
                <Card key={area.title} interactive>
                  <h3 className="text-[1.38rem] font-semibold leading-tight">{area.title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-text-muted)]">{area.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <TrustBand
          eyebrow="Proof"
          title="Trusted when execution gets hard"
          support="We've worked with teams when getting the next decision right really mattered."
          tone="chapter"
          logos={clientLogos.map((logo) => ({
            name: logo.name,
            src: logo.src,
            href: logo.href,
          }))}
          testimonial={{
            quote: testimonials[1]!.quote,
            name: testimonials[1]!.name,
            role: testimonials[1]!.title,
            company: testimonials[1]!.company,
            image: testimonials[1]!.image,
          }}
          ctaLabel="See case studies"
          ctaHref="/our-work"
        />

        <FinalCtaBand
          surfaceId="services_final"
          headline="Need a clear next step?"
          support="Tell us what's happening and we'll recommend your clearest next step."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />
      </main>
      <Footer variant="how-we-work" />
    </>
  )
}

