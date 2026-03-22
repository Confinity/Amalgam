import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ToolRoutePage } from "@/components/launchpad/ToolRoutePage"

export const metadata: Metadata = {
  title: "Is your tech stack helping or hurting?",
  description:
    "First-pass audit for stack stability, fragility, complexity, and execution risk.",
  alternates: {
    canonical: "/next-move/tech-stack-audit",
  },
}

export default function TechStackAuditPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ToolRoutePage toolId="tech-stack-audit" />
      </main>
      <Footer />
    </>
  )
}
