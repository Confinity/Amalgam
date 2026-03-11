import Image from "next/image"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ClientLogoWall } from "@/components/client-logo-wall"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { testimonials } from "@/lib/testimonials"
import { withBasePath } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "How We Work | Amalgam",
  description:
    "If building or scaling your product is getting harder than it should be, Amalgam helps you find the real blocker and move forward.",
  alternates: {
    canonical: "/services",
  },
}

const reachOutMoments = [
  { title: "Direction keeps shifting", description: "The product path is not clear enough." },
  { title: "Delivery keeps slipping", description: "The team is busy, but progress is slower." },
  { title: "Systems feel fragile", description: "Simple changes create too much risk." },
  { title: "Data is harder to trust", description: "Decisions stall when reporting is unclear." },
  { title: "Coordination is heavy", description: "Too much work is spent on handoffs." },
  { title: "The next move is unclear", description: "Leadership needs a practical path." },
]

const startPath = [
  {
    title: "Founder Review",
    description:
      "A focused engagement for a clear read and practical next step.",
    cta: "See how we work",
    href: "/founder-review",
  },
  {
    title: "Execution Sprint",
    description:
      "When direction is clear but planning is hard, we build a roadmap your team can run.",
    cta: "See how we work",
    href: "/execution-sprint",
  },
  {
    title: "Outcome Partnership",
    description:
      "When plans exist and follow-through is the risk, we stay close to execution.",
    cta: "See how we work",
    href: "/outcome-partnership",
  },
]

const deeperSupportAreas = [
  { title: "Systems and architecture", description: "Clarify boundaries and reduce avoidable friction." },
  { title: "Data confidence", description: "Strengthen trust in the numbers teams use to decide." },
  { title: "Decision alignment", description: "Keep ownership and sequencing clear across teams." },
]

const selectedTestimonials = [
  testimonials.find((item) => item.id === "mendez-pearlx"),
  testimonials.find((item) => item.id === "fitzmier-jtf"),
].filter((item): item is NonNullable<(typeof testimonials)[number]> => Boolean(item))

export default function ServicesPage() {
  return (
    <>
      <Navigation
        servicesLabel="Services"
        primaryCtaLabel="Book a strategy call"
        mobilePrompt="If building or scaling gets harder than it should, start with a strategy call."
      />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-28">
          <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-teal/16 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />
          <div className="mx-auto grid max-w-[1160px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="max-w-[660px]">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-teal">How we work</p>
              <h1 className="max-w-[20ch] text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                If building or scaling gets harder than it should, start here.
              </h1>
              <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-muted-foreground md:text-lg">
                We help you find the real blocker, make the next move clear, and keep execution moving.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact?interest=strategy-session"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 font-medium text-background transition-all hover:opacity-90 sm:w-auto"
                >
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto"
                >
                  See case studies
                </Link>
              </div>
            </div>

            <aside className="support-panel rounded-[28px] border border-border/60 p-7 lg:p-8">
              <p className="text-sm font-semibold text-foreground">Simple engagement flow</p>
              <ol className="mt-5 space-y-0">
                <li className="support-panel-item px-0 py-3 first:pt-0">
                  <p className="text-sm font-semibold text-foreground">1. Founder Review</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Start with clarity.</p>
                </li>
                <li className="support-panel-item px-0 py-3">
                  <p className="text-sm font-semibold text-foreground">2. Execution Sprint</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Build the plan your team can run.</p>
                </li>
                <li className="support-panel-item px-0 py-3 pb-0">
                  <p className="text-sm font-semibold text-foreground">3. Outcome Partnership</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Keep momentum through execution.</p>
                </li>
              </ol>
            </aside>
          </div>
        </section>

        <section className="deferred-section py-20 lg:py-24">
          <div className="mx-auto max-w-[1160px] px-6">
            <div className="mx-auto mb-12 max-w-[760px] text-center">
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">When teams usually reach out</h2>
              <p className="mx-auto mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
                These are usually signs the system needs attention.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {reachOutMoments.map((item) => (
                <article key={item.title} className="card-interactive rounded-[22px] border border-border/70 bg-white/70 p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                  <h3 className="max-w-[26ch] text-xl font-semibold leading-snug text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-work-usually-starts" className="deferred-section scroll-mt-28 border-y border-border bg-secondary/35 py-20 lg:py-24">
          <div className="mx-auto max-w-[1160px] px-6">
            <div className="mx-auto mb-12 max-w-[760px] text-center">
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">How work usually starts</h2>
              <p className="mx-auto mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
                Most engagements begin with a Founder Review, then move deeper only when needed.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {startPath.map((item, index) => (
                <article key={item.title} className="card-interactive flex h-full flex-col rounded-[24px] border border-border/70 bg-background p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">Step {index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <Link href={item.href} className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground">
                    {item.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section py-20 lg:py-24">
          <div className="mx-auto max-w-[1160px] px-6">
            <div className="mx-auto mb-12 max-w-[760px] text-center">
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">Where deeper support helps most</h2>
              <p className="mx-auto mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
                Execution improves fastest when teams clarify systems, strengthen data trust, and align decisions.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {deeperSupportAreas.map((item) => (
                <article key={item.title} className="support-panel card-interactive rounded-[24px] border border-border/60 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ClientLogoWall
          className="border-y border-border py-20 lg:py-24"
          eyebrow="Client trust"
          title="Trusted in complex execution environments"
          description="Selected work across financial services, product, operations, and large-scale technology environments."
        />

        <section className="deferred-section border-b border-border py-20 lg:py-24">
          <div className="mx-auto max-w-[1160px] px-6">
            <div className="mx-auto mb-12 max-w-[760px] text-center">
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">What clients noticed</h2>
              <p className="mt-4 text-muted-foreground">Practical support with steady follow-through.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {selectedTestimonials.map((item) => (
                <article key={item.id} className="rounded-[26px] border border-border/75 bg-white/80 p-7 shadow-[0_12px_28px_rgba(15,23,42,0.05)] lg:p-8">
                  <p className="text-2xl font-medium leading-relaxed text-foreground">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-7 flex items-center gap-4 border-t border-border/80 pt-5">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border/70 bg-secondary/50">
                      <Image src={withBasePath(item.image)} alt={`Portrait of ${item.name}`} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.title}</p>
                      <p className="text-sm font-medium text-foreground/85">{item.company}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-warm py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1160px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
            <div className="max-w-[620px]">
              <h2 className="max-w-[20ch] text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                Need a clear next step?
              </h2>
              <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
                Start with a strategy call. We&apos;ll help you choose the right move.
              </p>
            </div>
            <aside className="rounded-[28px] border border-border/70 bg-foreground p-7 shadow-[0_16px_36px_rgba(15,23,42,0.14)] lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">Start here</p>
              <p className="mt-4 text-2xl font-semibold leading-tight text-background">Book a strategy call</p>
              <p className="mt-3 text-sm leading-relaxed text-background/74">You&apos;ll get a direct response and a clear next step.</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/contact?interest=strategy-session" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90">
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/launchpad" className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-background/25 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10">
                  Find my stage
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer variant="how-we-work" />
    </>
  )
}
