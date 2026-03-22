import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ToolRoutePage } from "@/components/launchpad/ToolRoutePage"

export const metadata: Metadata = {
  title: "Are you actually ready for AI adoption?",
  description:
    "Practical checklist to evaluate readiness across workflow clarity, ownership, and data foundations.",
  alternates: {
    canonical: "/next-move/ai-readiness-checklist",
  },
}

export default function AIReadinessChecklistPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ToolRoutePage toolId="ai-readiness-checklist" />
      </main>
      <Footer />
    </>
  )
}
