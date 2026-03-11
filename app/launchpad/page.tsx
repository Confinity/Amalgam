import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { LaunchpadStageNavigator } from "@/components/launchpad-stage-navigator"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "From idea to scale: find your stage and next move.",
  description:
    "Launchpad helps builders quickly understand where they are in the journey and what to do next.",
  alternates: {
    canonical: "/launchpad",
  },
}

export default function LaunchpadPage() {
  return (
    <>
      <Navigation primaryCtaLabel="Book a strategy call" />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <LaunchpadStageNavigator />
      </main>
      <Footer />
    </>
  )
}
