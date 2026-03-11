import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  MapPin,
  Sparkles,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CaseStudiesFeaturedGrid } from "@/components/case-studies-featured-grid"
import { TestimonialStrip } from "@/components/testimonial-strip"
import { caseStudies, industries, summarizeCaseStudyText } from "@/lib/case-studies-data"

export const metadata: Metadata = {
  title: "See work in situations like yours",
  description:
    "Real client work across banking, fintech, energy, retail, and enterprise systems with clear context, approach, and outcomes.",
  alternates: {
    canonical: "/case-studies",
  },
}

const featuredStudies = caseStudies.filter((study) => study.featured)

const additionalRelationships = [
  {
    name: "Moody's",
    href: "/case-studies/moodys",
    note: "White-label name intelligence and transliteration-heavy screening support.",
  },
  {
    name: "SoFi",
    href: "/case-studies/sofi",
    note: "Operational screening and decision-support adaptation in fintech workflows.",
  },
  {
    name: "TIAA",
    href: "/case-studies/tiaa",
    note: "Technical delivery and systems support in a banking environment.",
  },
]

export default function CaseStudiesPage() {
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
                See what changed in real client situations like yours
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                See the situation, what changed, and why it mattered.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background/90 px-5 py-5 shadow-sm">
                  <p className="text-3xl font-semibold text-foreground">{caseStudies.length}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Published studies</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/90 px-5 py-5 shadow-sm">
                  <p className="text-3xl font-semibold text-foreground">{featuredStudies.length}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Featured examples</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/90 px-5 py-5 shadow-sm">
                  <p className="text-3xl font-semibold text-foreground">{industries.length}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Industries</p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-border bg-background/95 p-7 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  How to use this page
                </p>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>Start with the featured examples for a quick read.</p>
                <p>Use the full library to find situations close to your own.</p>
                <p>If it feels similar, book a strategy call and we can review your case directly.</p>
                </div>
              </div>
          </div>
        </section>

        <section className="deferred-section px-6 py-16 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Featured work
                </p>
                <h2 className="text-3xl font-semibold text-foreground">
                  Start with a few cases that show how we work
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Featured examples rotate each page load so returning visitors see broader proof.
              </p>
            </div>
            <CaseStudiesFeaturedGrid featuredStudies={featuredStudies} />
          </div>
        </section>

        <TestimonialStrip
          className="deferred-section border-t border-border bg-secondary/35 py-20 lg:py-24"
          eyebrow="Client feedback"
          title="What clients noticed in the work"
          compact
          testimonialIds={["mooney-cleanitsupply", "mendez-pearlx"]}
          maxItems={2}
        />

        <section className="deferred-section section-warm px-6 py-16 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Full library
                </p>
                <h2 className="text-3xl font-semibold text-foreground">
                  Find a case close to your situation
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Each page gives you context, what we did, and what changed.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
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
                        Situation
                      </p>
                    <p className="line-clamp-3 text-sm text-foreground">
                      {summarizeCaseStudyText(study.problem, {
                        maxSentences: 1,
                        maxChars: 155,
                      })}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                      <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        What changed
                      </p>
                      <p className="line-clamp-3 text-sm font-medium text-foreground">
                        {summarizeCaseStudyText(study.outcome, {
                          maxSentences: 1,
                          maxChars: 155,
                        })}
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
          </div>
        </section>

        <section className="deferred-section border-t border-border bg-secondary/35 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Recently added
              </p>
              <h2 className="text-2xl font-semibold text-foreground">
                Additional financial services examples
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Short reads with conservative public detail for high-sensitivity engagements.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {additionalRelationships.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-2xl border border-border bg-background px-5 py-5 transition-colors hover:border-teal/35"
                >
                  <p className="text-lg font-semibold text-foreground">{item.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-foreground px-6 py-20">
          <div className="mx-auto max-w-[900px] text-center">
            <h2 className="text-3xl font-bold text-background text-balance md:text-4xl">
              Want a second set of eyes on your situation?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-background/70">
              Start with a strategy call and we will recommend the clearest next step.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact?interest=strategy-session"
                className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-colors hover:bg-background/90"
              >
                Book a strategy call
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
