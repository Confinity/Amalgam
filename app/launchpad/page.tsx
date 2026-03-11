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

type LaunchpadPageProps = {
  searchParams?: {
    stage?: string | string[]
    pressure?: string | string[]
  }
}

export default function LaunchpadPage({ searchParams }: LaunchpadPageProps) {
  const stage = Array.isArray(searchParams?.stage)
    ? searchParams?.stage[0]
    : searchParams?.stage
  const pressure = Array.isArray(searchParams?.pressure)
    ? searchParams?.pressure[0]
    : searchParams?.pressure

  return (
    <>
      <Navigation primaryCtaLabel="Book a strategy call" />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <LaunchpadStageNavigator
          initialStageParam={stage}
          initialPressureParam={pressure}
        />
      </main>
      <Footer />
    </>
  )
}
