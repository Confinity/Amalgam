import type { Metadata } from "next"
import { PageHero } from "@/components/heroes/PageHero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrackedButton } from "@/components/ui/TrackedButton"
import { Card } from "@/components/ui/Card"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { CaseStudiesExplorer } from "@/components/sections/CaseStudiesExplorer"
import { buildRouteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildRouteMetadata({
  title: "Case Studies: How Teams Moved Forward Under Real Pressure",
  description:
    "Find case studies close to your situation, filter quickly, and see what helped teams move forward.",
  canonicalPath: "/our-work",
})

export default function OurWorkPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <PageHero
          eyebrow="Case studies"
          scale="mediumLarge"
          tone="soft"
          className="pb-[60px] md:pb-[72px] lg:pb-[84px]"
          gridClassName="lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] lg:items-center lg:gap-8 xl:gap-10"
          contentClassName="max-w-[36rem]"
          artifactClassName="w-full max-w-[380px] lg:justify-self-end"
          title={
            <h1 className="max-w-[20ch]">
              See how teams like yours <span className="hero-title-accent">moved forward.</span>
            </h1>
          }
          support="Start with a few strong examples, then narrow by your situation below."
          actions={
            <TrackedButton
              href="/contact"
              withArrow
              eventName="strategy_call_clicked"
              eventData={{
                surface_id: "our_work_hero",
                cta_id: "our_work_hero_strategy_call",
                cta_label: "Get a recommendation",
                destination: "/contact",
              }}
            >
              Get a recommendation
            </TrackedButton>
          }
          artifact={
            <Card variant="utility" className="p-4 md:p-5">
              <h2 className="text-[1.02rem] font-semibold text-[var(--color-text)]">How to use this page</h2>
              <ul className="mt-3 space-y-2 text-sm leading-[1.5] text-[var(--color-text-muted)]">
                <li>Start with a few strong examples.</li>
                <li>Use the filters when you want a closer match.</li>
                <li>Open any case study to see the situation and what changed.</li>
              </ul>
              <p className="mt-3 text-xs text-[var(--color-text-subtle)]">
                Looking for a recommendation instead? Use the button on the left.
              </p>
            </Card>
          }
        />

        <div id="case-filters-results">
          <CaseStudiesExplorer />
        </div>

        <FinalCtaBand
          surfaceId="our_work_final"
          headline="Want help thinking through your situation?"
          support="Tell us your situation and we'll recommend the clearest next step."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  )
}

