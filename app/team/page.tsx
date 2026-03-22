import type { Metadata } from "next"
import { TeamMemberCard } from "@/components/cards/TeamMemberCard"
import { PageHero } from "@/components/heroes/PageHero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { TeamSpecialistDirectory } from "@/components/sections/TeamSpecialistDirectory"
import { leadershipTeam, specialistTeam, teamCapabilityAreas } from "@/content/team"

export const metadata: Metadata = {
  title: "Meet the people behind the work",
  description:
    "Experienced product, engineering, and delivery leaders who work directly with your team.",
  alternates: {
    canonical: "/team",
  },
}

export default function TeamPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <PageHero
          scale="mediumLarge"
          tone="soft"
          className="pb-[60px] md:pb-[72px] lg:pb-[84px]"
          gridClassName="lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-6 xl:gap-8"
          artifactClassName="w-full max-w-[452px] lg:justify-self-end"
          title={
            <h1 className="max-w-[20ch]">
              Meet the people you work with when <span className="hero-title-accent">delivery needs to move.</span>
            </h1>
          }
          support="You&rsquo;ll work directly with experienced product, engineering, and delivery leaders."
          supportClassName="max-w-[50ch] text-[clamp(18px,1.18vw,20px)] leading-[1.6]"
          actions={<Button href="/contact">Get a recommendation</Button>}
          artifact={
            <Card variant="primary" className="p-5">
              <p className="text-sm font-semibold text-[var(--color-accent-strong)]">How we work with you</p>
              <div className="mt-3 grid gap-2">
                <div className="tile-utility p-3 text-sm text-[var(--color-text)]">
                  We listen first and find the real blocker.
                </div>
                <div className="tile-utility p-3 text-sm text-[var(--color-text)]">
                  We agree one clear plan for this week.
                </div>
                <div className="tile-utility p-3 text-sm text-[var(--color-text)]">
                  We stay close, review progress, and adjust.
                </div>
              </div>
              <p className="mt-3 text-sm text-[var(--color-text-subtle)]">
                Small core team. Specialists join when needed.
              </p>
            </Card>
          }
        />

        <section className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <h2>Where we usually help first</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {teamCapabilityAreas.map((area) => (
                <Card key={area} interactive>
                  <p className="text-sm text-[var(--color-text)]">{area}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container-site">
            <h2>Leadership</h2>
            <p className="mt-4 max-w-2xl text-base">You&rsquo;ll work with these leaders directly.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {leadershipTeam.map((member) => (
                <TeamMemberCard key={member.id} member={member} featured size="large" expertiseLimit={1} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <h2>Specialists we bring in when needed</h2>
            <p className="mt-4 max-w-2xl text-base">
              When deeper technical or operational support is needed, we bring in the right specialist.
            </p>
            <div className="mt-8">
              <TeamSpecialistDirectory members={specialistTeam} />
            </div>
          </div>
        </section>

        <FinalCtaBand
          headline="Need experienced people in the room while you execute?"
          support="Tell us what&rsquo;s happening and we&rsquo;ll recommend the clearest next step."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  )
}



