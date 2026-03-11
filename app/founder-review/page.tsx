import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Compass, FileText, Target, Zap } from "lucide-react"
import { ContextualTestimonial } from "@/components/contextual-testimonial"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Not sure what is slowing progress? Start with a Founder Review.",
  description:
    "Founder Review is a focused working engagement that gives leaders a clear read on the situation and practical next steps.",
  alternates: {
    canonical: "/founder-review",
  },
}

const fitSignals = [
  "You need a clear read before making bigger changes.",
  "Different teams have different explanations for the slowdown.",
  "Architecture, workflows, and decision flow are all contributing to friction.",
]

const deliverables = [
  {
    icon: Compass,
    title: "What is happening now",
    description: "A clear assessment of the current system and workflow reality.",
  },
  {
    icon: Target,
    title: "Where risk is building",
    description: "The issues most likely to slow progress or increase rework.",
  },
  {
    icon: FileText,
    title: "What to do next",
    description: "Practical recommendations leadership can act on quickly.",
  },
  {
    icon: Zap,
    title: "Execution path",
    description: "A realistic path into internal action, an Execution Sprint, or deeper support.",
  },
]

const process = [
  { step: "01", title: "Context", description: "Align on goals, constraints, and the decisions that matter most now." },
  { step: "02", title: "Review", description: "Review systems, workflows, and team decision flow." },
  { step: "03", title: "Synthesis", description: "Separate symptoms from core blockers." },
  { step: "04", title: "Clear path", description: "Present a clear path forward with practical next steps." },
]

export default function FounderReviewPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-28">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute left-8 top-20 h-56 w-56 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">Founder Review</p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Not sure what is slowing progress? Start with a Founder Review.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                The Founder Review is a focused working engagement where we step back, understand the system, and identify what is actually blocking progress.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact?interest=founder-review"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-all hover:opacity-90"
                >
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:bg-secondary"
                >
                  See case studies
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-border bg-background/95 p-7 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">Best first step</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Start here when clarity is low and you need a direct, practical read before bigger changes.
              </p>
              <div className="mt-5 space-y-3">
                {fitSignals.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-3xl font-semibold text-foreground text-balance">
                Clear read before bigger changes
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                Founder Review helps leadership understand what is really happening before committing to larger execution decisions.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {deliverables.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-border bg-background p-7">
                  <item.icon className="h-6 w-6 text-teal" />
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/35 py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-3xl font-semibold text-foreground text-balance">How the work happens</h2>
              <p className="mt-4 text-muted-foreground">Context -&gt; review -&gt; synthesis -&gt; clear path forward.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {process.map((item) => (
                <div key={item.step} className="rounded-[28px] border border-border bg-background p-6">
                  <span className="text-3xl font-bold text-teal/30">{item.step}</span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-foreground text-balance">Clarity quickly, not noise</h2>
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <p>This work is built to reduce confusion and speed up decisions.</p>
                <p>You leave with a practical path, not a vague report.</p>
              </div>
            </div>
            <div className="rounded-[30px] border border-border bg-foreground p-8">
              <h3 className="text-2xl font-semibold text-background">Need a clear read now?</h3>
              <p className="mt-4 text-sm leading-relaxed text-background/70">Start with a strategy call and we&apos;ll confirm if Founder Review is the right step.</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contact?interest=founder-review"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
                >
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-background/15 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
                >
                  See how we work
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContextualTestimonial
          className="deferred-section border-t border-border py-20 lg:py-24"
          eyebrow="Client perspective"
          title="What this work feels like for leadership teams"
          testimonialId="mooney-cleanitsupply"
        />
      </main>
      <Footer />
    </>
  )
}
