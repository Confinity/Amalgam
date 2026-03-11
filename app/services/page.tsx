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
    "How working with Amalgam starts: from a short triage call to deeper diagnostic and execution support when it clearly makes sense.",
  alternates: {
    canonical: "/services",
  },
}

const reachOutMoments = [
  {
    title: "Your systems are harder to trust",
    description:
      "What used to work now feels fragile, manual, or unpredictable.",
  },
  {
    title: "Integrations keep creating drag",
    description: "Too many moving parts. Not enough reliability.",
  },
  {
    title: "Product delivery is slower than it should be",
    description:
      "The team is working hard, but progress is harder to predict.",
  },
  {
    title: "Technical priorities are misaligned",
    description:
      "The business needs movement, but the systems picture is unclear.",
  },
  {
    title: "The next move isn't obvious anymore",
    description:
      "Leadership knows something is off but needs a clearer path forward.",
  },
  {
    title: "You need senior support quickly",
    description: "Not more theory. Clear judgment and practical next steps.",
  },
]

const startPath = [
  {
    title: "15-minute triage call",
    description:
      "A quick conversation to understand the situation and see whether a deeper discussion makes sense.",
    cta: "Book a strategy call",
    href: "/contact?interest=strategy-session",
  },
  {
    title: "Strategy call",
    description:
      "If the situation is worth exploring, we take a deeper look at the context, pressure points, and possible paths forward.",
    cta: "Book a strategy call",
    href: "/contact?interest=strategy-session",
  },
  {
    title: "Diagnostic review",
    description:
      "If the situation needs diagnosis, we analyze systems, architecture, and execution patterns before larger work begins.",
    cta: "See the process",
    href: "/founder-review",
  },
  {
    title: "Execution support",
    description:
      "Once the path is clear, we help move work forward through focused execution support or longer-term partnership.",
    cta: "See what comes next",
    href: "/outcome-partnership",
  },
]

const deeperSupportAreas = [
  {
    title: "Systems and architecture",
    description:
      "When the underlying structure creates fragility, drag, or avoidable rework.",
  },
  {
    title: "Data trust and operating signal",
    description:
      "When teams cannot trust what they are seeing or how decisions are made.",
  },
  {
    title: "Execution and operating rhythm",
    description:
      "When priorities, ownership, and coordination slow progress across the team.",
  },
]

const selectedTestimonials = [
  testimonials.find((item) => item.id === "mendez-pearlx"),
  testimonials.find((item) => item.id === "fitzmier-jtf"),
].filter((item): item is NonNullable<(typeof testimonials)[number]> => Boolean(item))

export default function ServicesPage() {
  return (
    <>
      <Navigation
        servicesLabel="How We Work"
        primaryCtaLabel="Book a strategy call"
        mobilePrompt="If releases are slowing and the root cause is not obvious, start with a quick 15-minute triage call."
      />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border py-20 lg:py-28">
          <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-teal/16 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />
          <div className="mx-auto grid max-w-[1160px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="max-w-[660px]">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-teal">
                How we work
              </p>
              <h1 className="max-w-[20ch] text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Are your releases slipping even though your team is working hard?
              </h1>
              <div className="mt-6 max-w-[56ch] space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  If work keeps stalling between product, engineering, and
                  operations, we help you find exactly where the drag is coming
                  from.
                </p>
                <p>
                  Start with a short triage call. If deeper work makes sense,
                  we map the path and move with you.
                </p>
              </div>
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
              <p className="text-sm font-semibold text-foreground">
                Most teams start here
              </p>
              <ol className="mt-5 space-y-0">
                <li className="support-panel-item px-0 py-3 first:pt-0">
                  <p className="text-sm font-semibold text-foreground">
                    1. 15-minute triage
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Quick fit check.
                  </p>
                </li>
                <li className="support-panel-item px-0 py-3">
                  <p className="text-sm font-semibold text-foreground">
                    2. Strategy call
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    If the situation is worth exploring further.
                  </p>
                </li>
                <li className="support-panel-item px-0 py-3">
                  <p className="text-sm font-semibold text-foreground">
                    3. Scope + pricing
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Shared only after we understand the problem properly.
                  </p>
                </li>
                <li className="support-panel-item px-0 py-3 pb-0">
                  <p className="text-sm font-semibold text-foreground">
                    4. Deeper support
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Diagnostic review, focused sprint, or ongoing partnership.
                  </p>
                </li>
              </ol>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                We avoid large proposals before understanding the problem.
              </p>
            </aside>
          </div>
        </section>

        <section className="deferred-section py-20 lg:py-24">
          <div className="mx-auto max-w-[1160px] px-6">
            <div className="mx-auto mb-12 max-w-[760px] text-center">
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
                When teams usually reach out
              </h2>
              <p className="mx-auto mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
                Usually when product delivery is slowing and the root cause is no
                longer obvious.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {reachOutMoments.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[22px] border border-border/70 bg-white/70 p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                >
                  <h3 className="max-w-[26ch] text-xl font-semibold leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-work-usually-begins"
          className="deferred-section scroll-mt-28 border-y border-border bg-secondary/35 py-20 lg:py-24"
        >
          <div className="mx-auto max-w-[1160px] px-6">
            <div className="mx-auto mb-12 max-w-[760px] text-center">
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
                How work usually begins
              </h2>
              <p className="mx-auto mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
                Start small. Go deeper only when the situation actually needs
                it.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {startPath.map((item, index) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col rounded-[24px] border border-border/70 bg-background p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                  >
                    {item.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
              <p className="mx-auto mt-8 max-w-[62ch] text-center text-sm leading-relaxed text-muted-foreground">
                Deeper work is scoped and priced after the triage call, once
                the situation is clear.
              </p>
          </div>
        </section>

        <section className="deferred-section py-20 lg:py-24">
          <div className="mx-auto max-w-[1160px] px-6">
            <div className="mx-auto mb-12 max-w-[760px] text-center">
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
                Where deeper support usually helps
              </h2>
              <p className="mx-auto mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
                Once the situation is clear, we focus on the areas that
                actually improve execution.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {deeperSupportAreas.map((item) => (
                <article
                  key={item.title}
                  className="support-panel rounded-[24px] border border-border/60 p-6"
                >
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
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
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
                What clients noticed
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {selectedTestimonials.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[26px] border border-border/75 bg-white/80 p-7 shadow-[0_12px_28px_rgba(15,23,42,0.05)] lg:p-8"
                >
                  <p className="text-2xl font-medium leading-relaxed text-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-7 flex items-center gap-4 border-t border-border/80 pt-5">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border/70 bg-secondary/50">
                      <Image
                        src={withBasePath(item.image)}
                        alt={`Portrait of ${item.name}`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm font-medium text-foreground/85">
                        {item.company}
                      </p>
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
                Want a clear read on why your shipping engine feels slow right now?
              </h2>
              <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
                Start with a short call. If the situation needs deeper
                analysis, we will show you the right next step.
              </p>
            </div>
            <aside className="rounded-[28px] border border-border/70 bg-foreground p-7 shadow-[0_16px_36px_rgba(15,23,42,0.14)] lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
                START HERE
              </p>
              <p className="mt-4 text-2xl font-semibold leading-tight text-background">
                Book a strategy call
              </p>
              <p className="mt-3 text-sm leading-relaxed text-background/74">
                Quick fit check. Clear next step. No large proposal too early.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contact?interest=strategy-session"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
                >
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#how-work-usually-begins"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-background/25 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
                >
                  See how the process works
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

