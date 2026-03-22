import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ToolRoutePage } from "@/components/launchpad/ToolRoutePage"

export const metadata: Metadata = {
  title: "Is delivery drag slowing you down?",
  description:
    "Structured diagnostic to identify whether slow delivery is driven by architecture, sequencing, coordination, data quality, or integration complexity.",
  alternates: {
    canonical: "/next-move/delivery-drag-diagnostic",
  },
}

export default function DeliveryDragDiagnosticPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ToolRoutePage toolId="delivery-drag-diagnostic" />
      </main>
      <Footer />
    </>
  )
}
