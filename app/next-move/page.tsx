import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { LaunchpadExperience } from "@/components/launchpad/LaunchpadExperience"
import { Navigation } from "@/components/navigation"
import { buildRouteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildRouteMetadata({
  title: "Your Next Move: Pick the Right Stage and Next Step",
  description:
    "Choose the situation that sounds most like you, confirm the right stage, and start one useful next move.",
  canonicalPath: "/next-move",
})

export default function LaunchpadPage() {
  return (
    <>
      <Navigation primaryCtaLabel="Get a recommendation" />
      <main id="main-content">
        <LaunchpadExperience />
      </main>
      <Footer />
    </>
  )
}

