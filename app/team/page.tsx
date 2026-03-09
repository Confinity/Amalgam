import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  teamGroups,
  teamMembers,
  unifiedTeamPortraitBackgroundClass,
  unifiedTeamPortraitClasses,
  unifiedTeamPortraits,
} from "@/lib/team-members"
import { withBasePath } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the Amalgam team across architecture, engineering, delivery, legal, and HR.",
  alternates: {
    canonical: "/team",
  },
}

const stats = [
  { value: "2012", label: "Founded" },
  { value: String(teamMembers.length), label: "Core team members" },
  { value: "3", label: "Operating groups" },
  { value: "Experienced", label: "Default level of engagement" },
]

const practiceAreas = [
  "Systems architecture",
  "Data and integrations",
  "Delivery recovery",
  "Growth and operations",
  "DevOps and platform",
  "Legal and HR",
]

const founderName = "Neeraj"
const heroShowcaseOrder = ["Neeraj", "Ryan", "Sumita", "Vikas", "Naren", "Parul"] as const
const heroShowcaseMembers = heroShowcaseOrder
  .map((name) => teamMembers.find((member) => member.name === name))
  .filter((member): member is (typeof teamMembers)[number] => Boolean(member))

export default function TeamPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border pt-32 pb-20">
          <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,rgba(0,191,166,0.07)_0%,rgba(255,255,255,0)_62%)]" />
          <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-[140%] rounded-full bg-teal/10 blur-3xl" />
          <div className="absolute right-0 top-24 h-72 w-72 -translate-x-12 rounded-full bg-purple/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-[1200px] gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="mb-6 inline-flex rounded-full border border-teal/15 bg-background/85 px-4 py-1.5 text-sm font-medium text-teal shadow-sm backdrop-blur">
                Our Team
              </span>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Experienced leaders who help teams move complex work forward
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Amalgam stays intentionally small and experienced. The team spans product,
                architecture, engineering, delivery, operations, and leadership.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact?interest=strategy-session"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-all hover:bg-foreground/90"
                >
                  Book a free strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/80 px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Read our story
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {practiceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {heroShowcaseMembers.map((member, index) => (
                  <div
                    key={member.name}
                    className={`overflow-hidden rounded-[28px] border border-border bg-background shadow-sm ${
                      index % 3 === 1 ? "sm:translate-y-8" : ""
                    }`}
                  >
                    <div
                      className={`relative aspect-[4/4.3] overflow-hidden ${unifiedTeamPortraitBackgroundClass}`}
                    >
                      <Image
                        src={withBasePath(unifiedTeamPortraits[member.name] ?? member.image)}
                        alt={member.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
                        className={unifiedTeamPortraitClasses[member.name] ?? "object-contain object-bottom px-5 pt-6 pb-0 md:px-6 md:pt-7"}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(252,252,250,0.06),rgba(252,252,250,0.18))]" />
                    </div>
                    <div className="border-t border-border px-4 py-3">
                      <p className="text-sm font-semibold text-foreground">
                        {member.fullName ?? member.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-12 max-w-[1200px] px-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-background/90 px-5 py-5 shadow-sm backdrop-blur"
                >
                  <p className="text-3xl font-bold text-teal md:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {teamGroups.map((group, groupIndex) => {
          const members = teamMembers.filter((member) => member.group === group.id)

          return (
            <section
              key={group.id}
              className={`deferred-section px-6 py-20 ${groupIndex % 2 === 1 ? "bg-secondary/45" : "section-warm"}`}
            >
              <div className="mx-auto max-w-[1200px]">
                <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-teal">
                      {group.eyebrow}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground text-balance">
                      {group.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {group.description}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {members.length} {members.length === 1 ? "person" : "people"}
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {members.map((member) => (
                    <div
                      key={member.name}
                      className="group overflow-hidden rounded-3xl border border-border bg-background transition-all hover:-translate-y-1 hover:border-teal/50 hover:shadow-xl hover:shadow-teal/5"
                    >
                      <div
                        className={`relative aspect-[4/4.2] overflow-hidden ${unifiedTeamPortraitBackgroundClass}`}
                      >
                        <Image
                          src={withBasePath(unifiedTeamPortraits[member.name] ?? member.image)}
                          alt={member.imageAlt}
                          fill
                          sizes="(min-width: 1280px) 28vw, (min-width: 768px) 50vw, 100vw"
                          className={`${unifiedTeamPortraitClasses[member.name] ?? "object-contain object-bottom px-5 pt-6 pb-0 md:px-6 md:pt-7"} transition-transform duration-500 group-hover:scale-[1.02]`}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(252,252,250,0.06),rgba(252,252,250,0.18))]" />
                      </div>

                      <div className="p-6">
                        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                          {group.eyebrow}
                        </p>
                        {member.name === founderName ? (
                          <p className="mt-2 inline-flex rounded-full border border-teal/25 bg-teal/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">
                            Founder
                          </p>
                        ) : null}
                        <h3 className="mt-3 text-xl font-bold text-foreground">
                          {member.fullName ?? member.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-teal">{member.role}</p>

                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {member.bio}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {member.specialties.slice(0, 3).map((specialty) => (
                            <span
                              key={specialty}
                              className="rounded-full border border-border bg-muted/70 px-2.5 py-1 text-xs text-muted-foreground"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>

                        {member.funFact ? (
                          <p className="mt-4 border-t border-border pt-4 text-xs italic text-muted-foreground">
                            {member.funFact}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        <section className="deferred-section border-t border-border bg-foreground px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-background md:text-4xl">
              Need experienced support in the room?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-background/70">
              Start with a strategy call if your systems are slowing the business
              down, or reach out directly if you already know where you need help.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact?interest=strategy-session"
                className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-colors hover:bg-background/90"
              >
                Book a free strategy call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-background/30 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
