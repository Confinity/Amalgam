import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ToolAssessment } from "@/components/tool-assessment"

export const metadata: Metadata = {
  title: "Are you actually ready for AI adoption?",
  description:
    "A sober first-pass checklist for deciding whether your workflows, ownership, and data foundations are actually ready for meaningful AI usage.",
  alternates: {
    canonical: "/launchpad/ai-readiness-checklist",
  },
}

export default function AIReadinessChecklistPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="border-b border-border py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <Link
              href="/launchpad/tools"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Launchpad tools
            </Link>
          </div>
        </section>
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <ToolAssessment toolId="ai-readiness-checklist" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
