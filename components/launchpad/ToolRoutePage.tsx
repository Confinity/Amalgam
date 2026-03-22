import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ToolAssessment } from "@/components/tool-assessment"
import { PageHero } from "@/components/heroes/PageHero"
import { RouteHighlightsStrip } from "@/components/sections/RouteHighlightsStrip"
import { Button } from "@/components/ui/Button"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { getLaunchpadTool, type LaunchpadToolId } from "@/lib/launchpad"

type ToolRoutePageProps = {
  toolId: LaunchpadToolId
}

export function ToolRoutePage({ toolId }: ToolRoutePageProps) {
  const tool = getLaunchpadTool(toolId)

  return (
    <>
      <PageHero
        eyebrow="Your Next Move tool"
        scale="medium"
        tone="plain"
        title={<h1 className="max-w-[20ch]">{tool.title}</h1>}
        support={tool.description}
        helper="Use this for a first-pass read on the shape of the issue before deciding whether to self-serve or bring support in."
        actions={
          <>
            <Button href="#tool-assessment" withArrow>
              Start the assessment
            </Button>
            <Button href="/contact" variant="secondary">
              Get a recommendation
            </Button>
          </>
        }
        afterContent={
          <RouteHighlightsStrip
            items={[
              {
                label: "Best for",
                value: "Structured first-pass read",
                detail: tool.audience,
              },
              {
                label: "Time",
                value: tool.estimatedTime,
                detail: tool.questionIntro,
              },
              {
                label: "What you leave with",
                value: tool.outputLabel,
                detail: tool.completionLabel,
              },
            ]}
          />
        }
      />

      <section className="section-tight border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <div className="container-site">
          <Link
            href="/next-move/tools"
            prefetch={false}
            className="inline-flex min-h-11 items-center gap-2 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to the tool library
          </Link>
        </div>
      </section>

      <section id="tool-assessment" className="section-space">
        <div className="container-site">
          <ToolAssessment toolId={toolId} />
        </div>
      </section>

      <FinalCtaBand
        headline="Need help pressure-testing the result against your real context?"
        support="Bring the diagnostic read into a strategy call and we will walk through what should happen next."
        primary={{ label: "Get a recommendation", href: "/contact" }}
      />
    </>
  )
}



