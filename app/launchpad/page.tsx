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
  searchParams?: Promise<{
    stage?: string | string[]
    pressure?: string | string[]
  }>
}

export default async function LaunchpadPage({ searchParams }: LaunchpadPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const stage = Array.isArray(resolvedSearchParams?.stage)
    ? resolvedSearchParams?.stage[0]
    : resolvedSearchParams?.stage
  const pressure = Array.isArray(resolvedSearchParams?.pressure)
    ? resolvedSearchParams?.pressure[0]
    : resolvedSearchParams?.pressure

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
