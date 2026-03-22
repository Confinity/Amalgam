import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { ArtifactPreview } from "@/components/artifacts/ArtifactPreview"
import { PageHero } from "@/components/heroes/PageHero"
import { StageArtifactBuilder } from "@/components/launchpad/StageArtifactBuilder"
import { Navigation } from "@/components/navigation"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { RouteHighlightsStrip } from "@/components/sections/RouteHighlightsStrip"
import { Button } from "@/components/ui/Button"

export const metadata: Metadata = {
  title: "Scale readiness check",
  description: "Assess decision drag and operating reliability as complexity rises.",
  alternates: {
    canonical: "/next-move/scale-readiness-check",
  },
}

export default function ScaleReadinessCheckPage() {
  const sections = [
    {
      id: "alignment-risks",
      title: "Alignment risks",
      fields: [
        {
          id: "decision-drag",
          label: "Where is decision drag showing up?",
          placeholder: "Capture the most visible alignment bottleneck across teams.",
        },
        {
          id: "ownership-gap",
          label: "Ownership gap driving escalation",
          placeholder: "Identify where ownership is unclear or overlapping.",
        },
      ],
    },
    {
      id: "reliability-risks",
      title: "Reliability risks",
      fields: [
        {
          id: "reliability-friction",
          label: "Reliability risk to watch now",
          placeholder: "Describe the most serious reliability issue emerging with growth.",
        },
        {
          id: "reporting-trust",
          label: "Reporting trust risk",
          placeholder: "Note where numbers are hard to trust for decisions.",
        },
      ],
    },
    {
      id: "stabilization",
      title: "Stabilization focus",
      fields: [
        {
          id: "immediate-focus",
          label: "Immediate stabilization focus",
          placeholder: "State one concrete priority for the next 30 days.",
        },
        {
          id: "operating-consistency",
          label: "How you will hold operating consistency",
          placeholder: "Define cadence, owner, and escalation rules.",
        },
      ],
    },
  ]

  return (
    <>
      <Navigation primaryCtaLabel="Get a recommendation" />
      <main id="main-content">
        <PageHero
          eyebrow="Stage 5 artifact"
          scale="medium"
          tone="plain"
          title={<h1 className="max-w-[20ch]">Scale readiness check</h1>}
          support="Check where decision drag and reliability risk are building as teams and systems grow."
          helper="Best when the work is active, complexity is rising, and the business needs a clearer read on what could destabilize momentum next."
          actions={
            <>
              <Button href="/contact?interest=outcome-partnership" withArrow>
                Talk through Outcome Partnership
              </Button>
              <Button href="/next-move" variant="secondary">
                Return to Your Next Move
              </Button>
            </>
          }
          artifact={<ArtifactPreview type="operating-loop" />}
          artifactClassName="w-full max-w-[430px] lg:justify-self-end"
          gridClassName="lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
          afterContent={
            <RouteHighlightsStrip
              items={[
                {
                  label: "Best owner",
                  value: "Founder, operator, or cross-functional lead",
                  detail: "Use one owner who can see the alignment, ownership, and reliability picture together.",
                },
                {
                  label: "What you build",
                  value: "A decision-drag risk map",
                  detail: "Surface alignment, escalation, and reliability risks before they compound further.",
                },
                {
                  label: "Best next support path",
                  value: "Outcome Partnership",
                  detail: "Use continuity support if complexity is already affecting active execution across teams.",
                  href: "/outcome-partnership",
                },
              ]}
            />
          }
        />

        <StageArtifactBuilder
          stageId="scale-stabilize"
          stageName="Scale & Stabilize"
          toolId="scale_readiness_check"
          toolName="Decision-Drag Risk Map"
          outputName="Scale readiness artifact"
          intro="Map alignment and reliability risks before complexity compounds."
          sections={sections}
        />

        <FinalCtaBand
          headline="Need steadier execution as complexity grows?"
          support="Outcome Partnership keeps senior judgment close to the work so momentum holds at scale."
          primary={{ label: "Talk through Outcome Partnership", href: "/contact?interest=outcome-partnership" }}
        />
      </main>
      <Footer />
    </>
  )
}


