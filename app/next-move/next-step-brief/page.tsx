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
  title: "Next-step brief",
  description: "Clarify opportunity, assumptions, and decision criteria before committing harder.",
  alternates: {
    canonical: "/next-move/next-step-brief",
  },
}

export default function NextStepBriefPage() {
  const sections = [
    {
      id: "opportunity",
      title: "Chosen opportunity",
      fields: [
        {
          id: "opportunity-focus",
          label: "What opportunity are we choosing right now?",
          placeholder: "Describe one opportunity worth focused execution.",
        },
        {
          id: "customer-signal",
          label: "What signal makes this worth pursuing?",
          placeholder: "Capture the strongest signal you have so far.",
        },
      ],
    },
    {
      id: "assumptions",
      title: "Core assumptions",
      fields: [
        {
          id: "assumption-one",
          label: "Top assumption that must be true",
          placeholder: "State the highest-risk assumption in one sentence.",
        },
        {
          id: "assumption-two",
          label: "Second assumption worth testing early",
          placeholder: "Capture the next uncertainty that could block progress.",
        },
      ],
    },
    {
      id: "decision-frame",
      title: "Decision frame",
      fields: [
        {
          id: "decision-criteria",
          label: "Decision criteria for this week",
          placeholder: "Define what will make this a yes, no, or pause.",
        },
        {
          id: "next-test",
          label: "Next test or move",
          placeholder: "Write the immediate test or action the team should run.",
        },
      ],
    },
  ]

  return (
    <>
      <Navigation primaryCtaLabel="Get a recommendation" />
      <main id="main-content">
        <PageHero
          eyebrow="Stage 1 artifact"
          scale="medium"
          tone="plain"
          title={<h1 className="max-w-[20ch]">Next-step brief</h1>}
          support="Use this brief to tighten opportunity framing before work expands."
          helper="Best when you have multiple possible directions and need one cleaner decision frame before more work begins."
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
          artifact={<ArtifactPreview type="decision-log" />}
          artifactClassName="w-full max-w-[430px] lg:justify-self-end"
          gridClassName="lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
          afterContent={
            <RouteHighlightsStrip
              items={[
                {
                  label: "Best owner",
                  value: "Founder or product lead",
                  detail: "Use one accountable owner so the decision frame stays clear.",
                },
                {
                  label: "What you build",
                  value: "A one-page decision artifact",
                  detail: "Capture the opportunity, assumptions, and the next test in one working brief.",
                },
                {
                  label: "Best next support path",
                  value: "Founder Review",
                  detail: "Use direct support if the situation is still too noisy to sharpen alone.",
                  href: "/founder-review",
                },
              ]}
            />
          }
        />

        <StageArtifactBuilder
          stageId="ideate-prioritize"
          stageName="Ideate & Prioritize"
          toolId="next_step_brief"
          toolName="Next-Step Brief"
          outputName="Decision artifact"
          intro="Turn early ambiguity into a practical next-step brief you can share with your team."
          sections={sections}
        />

        <FinalCtaBand
          headline="Want a direct read before committing resources?"
          support="Founder Review gives you a structured read on the blocker and the best next move."
          primary={{ label: "Talk through Founder Review", href: "https://calendly.com/ryan-amalgam-inc/30min" }}
        />
      </main>
      <Footer />
    </>
  )
}


