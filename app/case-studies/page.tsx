import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Compass,
  Filter,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { caseStudies, industries } from "@/lib/case-studies-data"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real client work across banking, fintech, energy, retail, and enterprise systems - with concrete problems, approaches, and outcomes.",
  alternates: {
    canonical: "/case-studies",
  },
}

type PageProps = {
  searchParams?: Promise<{
    industry?: string
  }>
}

const featuredCount = caseStudies.filter((study) => study.featured).length
const featuredStudies = caseStudies.filter((study) => study.featured).slice(0, 3)

export default async function CaseStudiesPage({ searchParams }: PageProps) {
  const resolvedParams = (await searchParams) ?? {}
  const selectedIndustry = industries.includes(resolvedParams.industry ?? "")
    ? resolvedParams.industry ?? null
    : null

  const filteredStudies = selectedIndustry
    ? caseStudies.filter((study) => study.industry === selectedIndustry)
    : caseStudies

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border px-6 py-20 md:py-28">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute left-10 top-24 h-64 w-64 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Case Studies
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Proof that stays grounded in the real work
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                These are not abstract capability pages. They show the kinds of
                systems, constraints, and outcomes Amalgam has handled across regulated,
                operationally demanding, and growth-stage environments.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background/90 px-5 py-5 shadow-sm">
                  <p className="text-3xl font-semibold text-foreground">{caseStudies.length}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Published case studies</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/90 px-5 py-5 shadow-sm">
                  <p className="text-3xl font-semibold text-foreground">{featuredCount}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Featured deep dives</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/90 px-5 py-5 shadow-sm">
                  <p className="text-3xl font-semibold text-foreground">{industries.length}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Industries represented</p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-border bg-background/95 p-7 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                What you will see here
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-border bg-secondary/35 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Compass className="h-5 w-5 text-teal" />
                    <p className="font-medium text-foreground">Client context and constraints</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Enough detail to understand the environment, not just the headline outcome.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/35 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-teal" />
                    <p className="font-medium text-foreground">Calm proof, not inflated claims</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Each study focuses on the situation, the work, and why it mattered.
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                If a situation feels similar to yours, the clearest next step is still a direct conversation.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-secondary/25 px-6 py-6 md:sticky md:top-[72px] md:z-40 md:backdrop-blur-sm">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0">
              <div className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>{selectedIndustry ? `Filtered by ${selectedIndustry}` : "Browse by industry"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/case-studies"
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedIndustry === null
                      ? "bg-foreground text-background"
                      : "border border-border bg-background text-muted-foreground hover:border-teal/50 hover:text-foreground"
                  }`}
                >
                  All
                </Link>
                {industries.map((industry) => (
                  <Link
                    key={industry}
                    href={`/case-studies?industry=${encodeURIComponent(industry)}`}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedIndustry === industry
                        ? "bg-foreground text-background"
                        : "border border-border bg-background text-muted-foreground hover:border-teal/50 hover:text-foreground"
                    }`}
                  >
                    {industry}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {!selectedIndustry ? (
          <section className="deferred-section px-6 py-16 md:py-20">
            <div className="mx-auto max-w-[1200px]">
              <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-teal">
                    Featured work
                  </p>
                  <h2 className="text-3xl font-semibold text-foreground">
                    A quick read on the strongest public examples
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  Use these as the fastest way to understand the kinds of situations
                  Amalgam has stepped into and improved.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {featuredStudies.map((study) => (
                  <Link
                    key={study.id}
                    href={`/case-studies/${study.slug}`}
                    className="group flex h-full flex-col rounded-[30px] border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-xl hover:shadow-teal/5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                          {study.industry}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold text-foreground transition-colors group-hover:text-teal">
                          {study.client}
                        </h3>
                      </div>
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                        {study.location}
                      </span>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      {study.problem}
                    </p>
                    <div className="mt-6 rounded-2xl border border-border bg-secondary/35 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        Outcome
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">
                        {study.outcome}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors group-hover:text-foreground">
                      Read case study
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="deferred-section px-6 py-16 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  {selectedIndustry ? `${selectedIndustry} work` : "All case studies"}
                </p>
                <h2 className="text-3xl font-semibold text-foreground">
                  {selectedIndustry
                    ? `Work in ${selectedIndustry}`
                    : "The full case study library"}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Every study is structured around context, problem, approach, and outcome so the value is easy to assess quickly.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredStudies.map((study) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[28px] border border-border bg-background transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-xl hover:shadow-teal/5"
                >
                  <div className="border-b border-border bg-secondary/20 p-6 pb-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                        <Building2 className="h-3 w-3" />
                        {study.industry}
                      </span>
                      {study.featured ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-purple/20 bg-purple/10 px-2.5 py-1 text-xs font-semibold text-purple">
                          <Sparkles className="h-3 w-3" />
                          Featured
                        </span>
                      ) : null}
                    </div>
                    <h2 className="line-clamp-2 text-xl font-semibold text-foreground transition-colors group-hover:text-teal">
                      {study.client}
                    </h2>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {study.location}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        Client context
                      </p>
                      <p className="line-clamp-2 text-sm text-foreground">{study.problem}</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                      <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        Approach
                      </p>
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {study.approach}
                      </p>
                    </div>

                    <div className="mt-auto border-t border-border pt-4">
                      <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.22em] text-teal">
                        Outcome
                      </p>
                      <p className="line-clamp-3 text-sm font-medium text-foreground">
                        {study.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border bg-secondary/15 px-6 py-4">
                    <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      View details
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-teal transition-all group-hover:gap-2">
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {filteredStudies.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-muted-foreground">
                  No case studies found for this industry.
                </p>
                <Link
                  href="/case-studies"
                  className="mt-4 inline-flex text-sm font-medium text-teal hover:underline"
                >
                  View all case studies
                </Link>
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-foreground px-6 py-20">
          <div className="mx-auto max-w-[900px] text-center">
            <h2 className="text-3xl font-bold text-background text-balance md:text-4xl">
              Facing similar complexity?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-background/70">
              Start with the Founder Review to get clarity on what is stuck, what
              is risky, and where to move first.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/founder-review"
                className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-colors hover:bg-background/90"
              >
                Start the Founder Review
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
