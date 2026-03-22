import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ArticleReadingProgress } from "@/components/article-reading-progress"
import { CaseStudyOutline } from "@/components/case-studies/CaseStudyOutline"
import { JsonLd } from "@/components/json-ld"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { TrackedLink } from "@/components/tracked-link"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { absoluteUrl } from "@/lib/site-config"

const pagePath = "/our-work/rebuilding-amalgam-website"

const pageTitle = "How Amalgam Rebuilt Its Website in Four Days Using AI-Assisted Engineering"

const pageDescription =
  "Amalgam rebuilt its website in four days using a structured AI-assisted engineering workflow with human oversight. The project moved the site from WordPress to Next.js and improved performance, SEO, and maintainability."

const tags = [
  "Next.js",
  "WordPress Migration",
  "AI Engineering",
  "Website Performance",
  "Software Architecture",
]

const faqItems = [
  {
    question: "Why move from WordPress to Next.js?",
    answer:
      "WordPress is excellent for content publishing, but modern frameworks like Next.js provide much tighter control over performance, rendering, and architecture. For teams prioritizing speed, scalability, and engineering flexibility, frameworks often provide a stronger foundation.",
  },
  {
    question: "Can AI-generated code actually be trusted?",
    answer:
      "AI-generated code should never be trusted blindly. In our workflow, AI operates within scoped tasks and all changes are reviewed by human engineers before being merged.",
  },
  {
    question: "How do you prevent AI agents from creating messy code?",
    answer:
      "By defining clear roles, bounded tasks, and review gates. Each model operates within a limited scope, and humans remain responsible for architecture and final decisions.",
  },
  {
    question: "How long does a WordPress to Next.js migration usually take?",
    answer:
      "Traditional rebuilds often take weeks or months. With structured AI-assisted workflows and experienced engineering oversight, that timeline can sometimes be compressed materially.",
  },
  {
    question: "Does migrating platforms hurt SEO?",
    answer:
      "Not when done properly. Preserving URL structure, metadata, and technical SEO signals ensures continuity while improving performance and crawlability.",
  },
  {
    question: "Is this workflow repeatable for client projects?",
    answer:
      "Yes. The system we tested on our own site is the same structured approach we use when modernizing client platforms.",
  },
] as const

const outcomeHighlights = [
  {
    label: "Timeline",
    value: "4 days",
    detail: "Architecture redesign through production launch.",
  },
  {
    label: "Platform shift",
    value: "WordPress to Next.js",
    detail: "A full rebuild with a cleaner technical foundation.",
  },
  {
    label: "Workflow",
    value: "AI-assisted + human-led",
    detail: "Defined model roles with senior engineering review gates.",
  },
  {
    label: "Sustained impact",
    value: "Easier to maintain",
    detail: "Every future update can ship with less friction.",
  },
] as const

const internalLinks = [
  {
    title: "See more case studies",
    description: "Browse similar situations across industries, pressures, and delivery stages.",
    href: "/our-work",
  },
  {
    title: "Read: Should you modernize or rebuild?",
    description: "A practical decision framework for teams under modernization pressure.",
    href: "/research/modernize-vs-rebuild",
  },
  {
    title: "Run the Tech Stack Audit",
    description: "Map system fragility, ownership gaps, and modernization risk before the next rebuild decision.",
    href: "/next-move/tech-stack-audit",
  },
  {
    title: "Related case: CleanItSupply",
    description: "A similar modernization engagement focused on performance and maintainability gains.",
    href: "/our-work/cleanitsupply",
  },
  {
    title: "Related case: Premier Financial Alliance",
    description: "A systems-focused engagement where architecture and operational clarity were central.",
    href: "/our-work/premier-financial-alliance",
  },
] as const

const buildTimeline = [
  {
    day: "Day 1",
    focus: "Constraint diagnosis",
    summary: "Mapped information architecture, UX consistency, and technical SEO gaps.",
  },
  {
    day: "Day 2",
    focus: "Platform foundation",
    summary: "Set up the Next.js architecture and migration structure for clean delivery.",
  },
  {
    day: "Day 3",
    focus: "System-first design",
    summary: "Locked typography, spacing rules, and reusable component patterns.",
  },
  {
    day: "Day 4",
    focus: "QA and launch",
    summary: "Ran review gates, performance checks, and production deployment.",
  },
] as const

const articleNav = [
  { href: "#situation", label: "Situation" },
  { href: "#diagnose-the-real-problem", label: "Diagnose the real problem" },
  { href: "#move-to-modern-architecture", label: "Move to a modern architecture" },
  { href: "#build-design-system-first", label: "Build the design system first" },
  { href: "#ai-models-defined-roles", label: "Use AI models in clearly defined roles" },
  { href: "#humans-own-judgment", label: "Keep humans responsible for judgment" },
  { href: "#controlled-boundaries", label: "Run everything inside controlled boundaries" },
  { href: "#what-changed", label: "What changed" },
  { href: "#connects-to-work", label: "How this connects to our work" },
  { href: "#similar-situations", label: "Similar situations" },
  { href: "#faq", label: "FAQ" },
] as const

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  category: "Our Work",
  keywords: tags,
  openGraph: {
    type: "article",
    url: absoluteUrl(pagePath),
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: absoluteUrl("/brand/amalgam-logo.webp"),
        alt: "Amalgam logo centered on a neutral background.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [absoluteUrl("/brand/amalgam-logo.webp")],
  },
}

export default function RebuildingAmalgamWebsiteCaseStudyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Rebuilding the Amalgam Website in Four Days",
    description: pageDescription,
    url: absoluteUrl(pagePath),
    author: {
      "@type": "Organization",
      name: "Amalgam",
    },
    publisher: {
      "@type": "Organization",
      name: "Amalgam",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/amalgam-logo.webp"),
      },
    },
    keywords: tags.join(", "),
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <JsonLd data={[articleSchema, faqSchema]} />
      <Navigation />
      <ArticleReadingProgress
        targetId="case-study-article"
        eventName="our_work_read_depth_reached"
        eventData={{ slug: "rebuilding-amalgam-website" }}
      />
      <main id="main-content">
        <section className="border-b border-[var(--color-border)] pt-[160px] pb-[72px] md:pt-[180px] md:pb-[88px] lg:pt-[192px] lg:pb-[102px]">
          <div className="container-site">
            <Link
              prefetch={false}
              href="/our-work"
              className="inline-flex min-h-11 items-center gap-2 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>

            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-start">
              <div>
                <h1 className="max-w-[20ch] text-4xl font-semibold leading-tight md:text-5xl">
                  Rebuilding the Amalgam Website in Four Days
                </h1>
                <p className="mt-5 max-w-[62ch] text-lg">
                  How we used a structured AI-assisted engineering workflow to move from WordPress
                  to a modern Next.js platform, faster, cleaner, and easier to maintain.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1 text-xs text-[var(--color-text-subtle)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="#case-study-article">Read case study</Button>
                  <Button href="/contact" variant="secondary">
                    Get a recommendation
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-[linear-gradient(170deg,rgba(248,250,252,0.95),rgba(241,245,249,0.92))] p-6 shadow-[var(--shadow-soft)] md:p-7">
                <div className="pointer-events-none absolute -left-10 top-[-42px] h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(27,167,161,0.18),transparent_72%)]" />
                <div className="pointer-events-none absolute -right-9 bottom-[-44px] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(23,32,51,0.15),transparent_72%)]" />

                <div className="relative rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_74%,white_26%)] bg-[color-mix(in_srgb,var(--color-surface)_86%,white_14%)] p-6">
                  <Image
                    src="/brand/amalgam-logo.webp"
                    alt="Amalgam logo centered on a neutral background."
                    width={920}
                    height={255}
                    priority
                    className="mx-auto h-auto w-full max-w-[250px]"
                  />
                  <p className="mt-4 text-center text-xs uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                    WordPress to Next.js rebuild
                  </p>
                </div>

                <div className="relative mt-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Workflow map</p>
                  <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                    <li className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-xs text-[var(--color-text)]">
                      Diagnose the real problem
                    </li>
                    <li className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-xs text-[var(--color-text)]">
                      Move to a modern architecture
                    </li>
                    <li className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-xs text-[var(--color-text)]">
                      Build the design system first
                    </li>
                    <li className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-xs text-[var(--color-text)]">
                      Use AI models in clearly defined roles
                    </li>
                    <li className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-xs text-[var(--color-text)]">
                      Keep humans responsible for judgment
                    </li>
                    <li className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-xs text-[var(--color-text)]">
                      Run everything inside controlled boundaries
                    </li>
                  </ol>
                </div>

                <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Timeline</p>
                    <p className="mt-2 text-base font-semibold text-[var(--color-text)]">4 days</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Platform shift</p>
                    <p className="mt-2 text-base font-semibold text-[var(--color-text)]">WordPress to Next.js</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Operating model</p>
                    <p className="mt-2 text-base font-semibold text-[var(--color-text)]">AI-assisted, human-led</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-tight border-b border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(247,248,250,0.5),rgba(243,245,247,0.82))]">
          <div className="container-site">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">Build timeline</p>
                  <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Four-day execution log</h2>
                </div>
                <p className="max-w-[34ch] text-sm text-[var(--color-text-muted)]">
                  Speed came from sequence clarity and bounded review gates, not skipping engineering quality.
                </p>
              </div>

              <ol className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {buildTimeline.map((item) => (
                  <li
                    key={item.day}
                    className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-4"
                  >
                    <div className="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(27,167,161,0.2),transparent_72%)]" />
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">{item.day}</p>
                    <p className="mt-2 text-base font-semibold text-[var(--color-text)]">{item.focus}</p>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">{item.summary}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section-compact">
          <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <article id="case-study-article" className="rounded-[30px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-10">
              <div className="mb-6 lg:hidden">
                <CaseStudyOutline
                  items={articleNav}
                  slug="rebuilding-amalgam-website"
                  pageSource="flagship_case_study"
                  mode="mobile"
                />
              </div>

              <h2 className="text-3xl font-semibold md:text-4xl">Rebuilding the Amalgam Website in Four Days</h2>
              <div className="mt-5 space-y-5 text-base leading-relaxed text-[var(--color-text)]">
                <p>We rebuilt the Amalgam website in four days to pressure-test our own delivery system.</p>
                <p>The work combined bounded AI-assisted execution with human-owned architecture and QA decisions.</p>
                <p>The result was a cleaner platform that ships faster and is easier to maintain.</p>
              </div>

              <section id="situation" className="mt-10">
                <h3 className="text-2xl font-semibold">Situation</h3>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--color-text)]">
                  <p>Our previous site ran on WordPress and worked well early on.</p>
                  <p>
                    As the company grew, performance tuning became fragile, design consistency slipped, and structural
                    improvements started depending on plugin workarounds instead of system improvements.
                  </p>
                  <p>
                    We see this pattern often in client environments: the platform still works, but the underlying
                    structure slows execution. Our own site had reached that point.
                  </p>
                  <p>
                    So we used the same approach we apply with clients: identify the real constraint, redesign the
                    architecture, and ship the next system cleanly.
                  </p>
                </div>
              </section>

              <section className="mt-10 space-y-10">
                <div id="diagnose-the-real-problem">
                  <h3 className="text-2xl font-semibold">Diagnose the real problem</h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Before touching design or code, we reviewed the site as a system.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">We looked at:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--color-text)] marker:text-[var(--color-accent-strong)]">
                    <li>page hierarchy</li>
                    <li>navigation structure</li>
                    <li>design consistency</li>
                    <li>performance bottlenecks</li>
                    <li>technical SEO signals</li>
                    <li>long-term maintainability risk</li>
                  </ul>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Many redesigns skip this step. Changing visuals without fixing structure usually recreates the same problems later.
                  </p>
                </div>

                <div id="move-to-modern-architecture">
                  <h3 className="text-2xl font-semibold">Move to a modern architecture</h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Once the constraints were clear, we rebuilt the site on Next.js.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    This gave us much better control over:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--color-text)] marker:text-[var(--color-accent-strong)]">
                    <li>rendering strategy</li>
                    <li>performance optimization</li>
                    <li>technical SEO</li>
                    <li>development flexibility</li>
                    <li>long-term maintainability</li>
                  </ul>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    WordPress remains great for many publishing workflows, but for tighter control of performance, architecture, and delivery speed, frameworks like Next.js provide a stronger base.
                  </p>
                </div>

                <div id="build-design-system-first">
                  <h3 className="text-2xl font-semibold">Build the design system first</h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Instead of designing page by page, we built the underlying system first.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    That included defining:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--color-text)] marker:text-[var(--color-accent-strong)]">
                    <li>typography hierarchy</li>
                    <li>layout grid and spacing rules</li>
                    <li>component patterns</li>
                    <li>responsive behavior rules</li>
                    <li>color tokens and style rules</li>
                  </ul>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Once those foundations were set, building the rest of the site became much faster and more consistent. Speed without a system creates disorder; a design system preserves coherence.
                  </p>
                </div>

                <div id="ai-models-defined-roles">
                  <h3 className="text-2xl font-semibold">Use AI models in clearly defined roles</h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    A major part of the speed came from workflow structure: we used multiple models in bounded roles instead of one model trying to do everything.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Role examples:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--color-text)] marker:text-[var(--color-accent-strong)]">
                    <li>structural analysis</li>
                    <li>UX critique</li>
                    <li>component generation</li>
                    <li>refactoring</li>
                    <li>QA review</li>
                    <li>documentation support</li>
                  </ul>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Different models are better at different tasks. Intentional orchestration accelerated delivery; unbounded overlap would have created inconsistency.
                  </p>
                </div>
                <div id="humans-own-judgment">
                  <h3 className="text-2xl font-semibold">Keep humans responsible for judgment</h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    AI accelerated execution, but it did not replace engineering discipline.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Humans remained responsible for:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--color-text)] marker:text-[var(--color-accent-strong)]">
                    <li>architecture decisions</li>
                    <li>design judgment</li>
                    <li>system consistency</li>
                    <li>code review</li>
                    <li>merge approval</li>
                    <li>production readiness</li>
                  </ul>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Models accelerated options and iteration; final decisions stayed human.
                  </p>
                </div>

                <div id="controlled-boundaries">
                  <h3 className="text-2xl font-semibold">Run everything inside controlled boundaries</h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Containment was non-negotiable. Models did not get unrestricted control over the codebase.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Work was scoped by stage, reviewed before merge, and validated for performance and structure before release.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    This let us move quickly without hidden risk. AI acted as an execution layer inside a structured process, not an autonomous builder.
                  </p>
                </div>
              </section>

              <section id="what-changed" className="mt-10">
                <h3 className="text-2xl font-semibold">What changed</h3>
                <div className="mt-5 space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold">Speed</h4>
                    <p className="mt-2 text-base leading-relaxed text-[var(--color-text)]">
                      The rebuild, from architecture redesign to launch, happened in four days through parallel execution and faster iteration loops, not by skipping engineering discipline.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold">Performance</h4>
                    <p className="mt-2 text-base leading-relaxed text-[var(--color-text)]">
                      Moving to modern architecture removed core constraints: pages became faster, easier to optimize, and technical SEO became more predictable.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold">Consistency</h4>
                    <p className="mt-2 text-base leading-relaxed text-[var(--color-text)]">
                      The design system made the site more coherent: layout, spacing, and typography now follow shared rules instead of drifting page by page.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold">Maintainability</h4>
                    <p className="mt-2 text-base leading-relaxed text-[var(--color-text)]">
                      Internally, the system is now easier to extend and reason about, so future changes ship faster with less debt accumulation.
                    </p>
                  </div>
                </div>
              </section>

              <section id="connects-to-work" className="mt-10">
                <h3 className="text-2xl font-semibold">How this connects to our work</h3>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--color-text)]">
                  <p>
                    The sequence in this rebuild mirrors how we approach client pressure: understand the
                    situation, isolate the real constraint, redesign the system around that constraint, and
                    execute quickly inside clear review boundaries.
                  </p>
                  <p>
                    This same thinking now appears in a framework we recently launched on the site
                    called{" "}
                    <Link
                      href="/next-move"
                      prefetch={false}
                      className="font-medium text-[var(--color-accent-strong)] underline decoration-[color-mix(in_srgb,var(--color-accent-strong)_46%,transparent)] underline-offset-4"
                    >
                      Your Next Move
                    </Link>
                    , which helps builders understand where they are and what actually matters
                    next.
                  </p>
                </div>
              </section>

              <section id="similar-situations" className="mt-10">
                <h3 className="text-2xl font-semibold">Similar situations</h3>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                  We see this kind of challenge frequently with teams modernizing legacy platforms under delivery pressure.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--color-text)] marker:text-[var(--color-accent-strong)]">
                  <li>running WordPress sites that have become hard to optimize</li>
                  <li>modernizing older CMS-driven platforms</li>
                  <li>rebuilding marketing or product sites for performance</li>
                  <li>exploring how AI can accelerate development safely</li>
                  <li>trying to move faster without sacrificing engineering discipline</li>
                </ul>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Card
                    as={TrackedLink}
                    href="/our-work/cleanitsupply"
                    eventName="case_study_related_clicked"
                    eventData={{ source: "rebuilding_case_study_related", target_slug: "cleanitsupply" }}
                    interactive
                    className="p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Modernization pressure</p>
                    <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">CleanItSupply</p>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                      Replatformed a constrained legacy environment into a faster, more maintainable system.
                    </p>
                  </Card>
                  <Card
                    as={TrackedLink}
                    href="/our-work/premier-financial-alliance"
                    eventName="case_study_related_clicked"
                    eventData={{ source: "rebuilding_case_study_related", target_slug: "premier-financial-alliance" }}
                    interactive
                    className="p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Systems fragility</p>
                    <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">Premier Financial Alliance</p>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                      Improved platform architecture and operating reliability for a complex production workflow.
                    </p>
                  </Card>
                </div>
              </section>
            </article>

            <aside className="space-y-4 lg:sticky lg:top-28">
              <Card className="p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Reading map</p>
                <CaseStudyOutline
                  items={articleNav}
                  slug="rebuilding-amalgam-website"
                  pageSource="flagship_case_study"
                  mode="desktop"
                />
              </Card>

              <Card variant="primary" className="p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">Project format</p>
                <p className="mt-3 text-sm text-[var(--color-text)]">
                  Structured AI-assisted execution with human-owned architecture, QA, and release decisions.
                </p>
                <div className="mt-4 grid gap-2">
                  <div className="tile-utility p-3 text-sm text-[var(--color-text)]">Bounded model roles</div>
                  <div className="tile-utility p-3 text-sm text-[var(--color-text)]">Human review gates</div>
                  <div className="tile-utility p-3 text-sm text-[var(--color-text)]">Performance-first launch</div>
                </div>
              </Card>
            </aside>
          </div>
        </section>
        <section className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <h2>Outcome highlights</h2>
            <p className="mt-3 max-w-3xl text-base">
              The biggest gains were not just in launch speed. The structure of the system changed,
              which makes future changes faster and safer.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {outcomeHighlights.map((item) => (
                <Card key={item.label}>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">{item.value}</p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{item.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-compact">
          <div className="container-site">
            <h2>FAQ</h2>
            <p className="mt-3 max-w-3xl text-base">
              Common questions we hear from teams considering a similar migration.
            </p>
            <div className="mt-8 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                >
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[var(--color-text)]">
                    <span>{item.question}</span>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-border)] text-sm text-[var(--color-text-subtle)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-tight border-y border-[var(--color-border)] bg-[linear-gradient(165deg,rgba(255,255,255,0.95),rgba(243,245,247,0.84))]">
          <div className="container-site">
            <h2>Related reads and next steps</h2>
            <p className="mt-3 max-w-3xl text-base">
              Use this page as a starting point, then jump into related work, the broader rebuild
              question, or the next move for your own platform.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {internalLinks.map((item) => (
                <Card
                  key={item.title}
                  as={TrackedLink}
                  href={item.href}
                  eventName="our_work_internal_link_clicked"
                  eventData={{ source: "rebuilding_case_study", target: item.href }}
                  interactive
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-lg font-semibold text-[var(--color-text)]">{item.title}</p>
                    <ArrowUpRight className="h-4 w-4 text-[var(--color-accent-strong)]" />
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <FinalCtaBand
          surfaceId="our_work_rebuilding_amalgam_website"
          tone="dark"
          headline="Seeing something similar?"
          support="If your current platform feels slower than it should, whether that is your website, product infrastructure, or internal tooling, the work usually starts by finding the structural constraint and sequencing the next system cleanly."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  )
}



