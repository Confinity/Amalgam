import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BriefcaseBusiness, MapPin, Sparkles } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { careerCultureSignals, careerRoles } from "@/lib/careers-data"

export const metadata: Metadata = {
  title: "Careers at Amalgam",
  description:
    "Explore open roles at Amalgam and contact the team directly about current opportunities.",
  alternates: {
    canonical: "/careers",
  },
}

export default function CareersPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-28">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute left-0 top-16 h-64 w-64 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                Careers
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Want to do meaningful work with a small, high-trust team?
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We care about clear thinking, strong execution, and real client outcomes.
                If that sounds like your style, review the open roles below.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact?interest=careers"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
                >
                  Ask about this role
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="mailto:hello@amalgam-inc.com?subject=Careers%20Inquiry"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Email directly
                </a>
              </div>
            </div>

            <div className="support-panel rounded-[30px] p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Snapshot
              </p>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>{careerRoles.length} current openings from the published legacy listing.</p>
                <p>Remote-first operating model with direct collaboration.</p>
                <p>Small-team environment where ownership and professionalism matter.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                Open roles
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Roles you can step into now
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Role titles, summaries, and ranges below are sourced from the prior
                published careers listing.
              </p>
            </div>

            <div className="grid gap-8">
              {careerRoles.map((role) => (
                <article key={role.id} className="rounded-[30px] border border-border bg-background p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                      <Sparkles className="h-3.5 w-3.5" />
                      {role.team}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/35 px-3 py-1 text-xs font-medium text-muted-foreground">
                      <BriefcaseBusiness className="h-3.5 w-3.5" />
                      {role.employmentType}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/35 px-3 py-1 text-xs font-medium text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {role.location}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold text-foreground">{role.title}</h3>
                  <p className="mt-2 text-sm font-medium text-teal">
                    Compensation range: {role.compensationRange}
                  </p>
                  <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">
                    {role.summary}
                  </p>

                  <div className="mt-6 rounded-[24px] border border-border bg-secondary/25 p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      What you&apos;ll do
                    </p>
                    <ul className="mt-4 space-y-3">
                      {role.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact?interest=careers"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                    >
                      Ask about this role
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={`mailto:hello@amalgam-inc.com?subject=${encodeURIComponent(`Career Inquiry - ${role.title}`)}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      Email application details
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/35 py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                You&apos;ll fit well here if
              </p>
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                You&apos;ll fit here if ownership and clarity matter to you
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {careerCultureSignals.map((signal) => (
                <div key={signal.title} className="rounded-[28px] border border-border bg-background p-7">
                  <h3 className="text-xl font-semibold text-foreground">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {signal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-foreground py-20 lg:py-24">
          <div className="mx-auto max-w-[900px] px-6 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Next step
            </p>
            <h2 className="text-3xl font-semibold text-background text-balance md:text-4xl">
              Interested in one of these roles? Let&apos;s talk.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-background/72">
              Use the contact page to start a conversation with the team. Include
              the role title and a short note on fit.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact?interest=careers"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:hello@amalgam-inc.com?subject=Careers%20Inquiry"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-background/20 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
              >
                Email hello@amalgam-inc.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
