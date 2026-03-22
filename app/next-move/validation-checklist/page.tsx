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
  title: "Validation checklist",
  description: "Reduce uncertainty before committing harder with a practical validation checklist.",
  alternates: {
    canonical: "/next-move/validation-checklist",
  },
}

export default function ValidationChecklistPage() {
  const sections = [
    {
      id: "assumptions",
      title: "Assumptions to test",
      fields: [
        {
          id: "assumption-critical",
          label: "Critical assumption to validate first",
          placeholder: "State the assumption that would most affect your direction.",
        },
        {
          id: "assumption-risk",
          label: "Why this assumption is risky",
          placeholder: "Explain what happens if this assumption is wrong.",
        },
      ],
    },
    {
      id: "evidence",
      title: "Evidence plan",
      fields: [
        {
          id: "evidence-needed",
          label: "Evidence needed to decide",
          placeholder: "Define what signal quality is required before committing harder.",
        },
        {
          id: "test-method",
          label: "Test method",
          placeholder: "Capture the method you will use to gather that evidence.",
        },
      ],
    },
    {
      id: "thresholds",
      title: "Decision thresholds",
      fields: [
        {
          id: "pass-threshold",
          label: "Pass threshold",
          placeholder: "What outcome means continue?",
        },
        {
          id: "stop-guidance",
          label: "Stop or continue guidance",
          placeholder: "Define what to do if evidence is weak or mixed.",
        },
      ],
    },
  ]

  return (
    <>
      <Navigation primaryCtaLabel="Get a recommendation" />
      <main id="main-content">
        <PageHero
          eyebrow="Stage 2 artifact"
          scale="medium"
          tone="plain"
          title={<h1 className="max-w-[20ch]">Validation checklist</h1>}
          support="Pressure-test evidence quality, assumptions, and decision thresholds before deeper build investment."
          helper="Best when the direction exists but evidence still needs to get strong enough for a harder commit."
          actions={
            <>
              <Button href="https://calendly.com/ryan-amalgam-inc/30min" withArrow>
                Talk through Founder Review
              </Button>
              <Button href="/next-move" variant="secondary">
                Return to Your Next Move
              </Button>
            </>
          }
          artifact={<ArtifactPreview type="execution-brief" />}
          artifactClassName="w-full max-w-[430px] lg:justify-self-end"
          gridClassName="lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
          afterContent={
            <RouteHighlightsStrip
              items={[
                {
                  label: "Best owner",
                  value: "Founder or product lead",
                  detail: "Keep one decision-maker accountable for what must be proven next.",
                },
                {
                  label: "What you build",
                  value: "A practical validation plan",
                  detail: "Document the evidence needed, the method, and the thresholds for continue or stop.",
                },
                {
                  label: "Best next support path",
                  value: "Founder Review",
                  detail: "Use direct support if the team still needs help defining what actually has to be proven.",
                  href: "/founder-review",
                },
              ]}
            />
          }
        />

        <StageArtifactBuilder
          stageId="validate-derisk"
          stageName="Validate & De-risk"
          toolId="validation_checklist"
          toolName="Validation Plan"
          outputName="Validation decision artifact"
          intro="Create a practical validation plan with assumptions, evidence, and explicit stop or continue criteria."
          sections={sections}
        />

        <FinalCtaBand
          headline="Want stronger confidence before investing further?"
          support="Founder Review helps define what must be proven and what should happen next."
          primary={{ label: "Talk through Founder Review", href: "https://calendly.com/ryan-amalgam-inc/30min" }}
        />
      </main>
      <Footer />
    </>
  )
}


