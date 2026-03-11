import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  MapPin,
  Sparkles,
  Wrench,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import {
  caseStudies,
  getCaseStudyBySlug,
  summarizeCaseStudyText,
} from "@/lib/case-studies-data"
import { withBasePath } from "@/lib/site-config"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return { title: "Can't find that case study?" }
  }

  return {
    title: `${caseStudy.client} Case Study`,
    description: caseStudy.headline,
    alternates: {
      canonical: `/case-studies/${caseStudy.slug}`,
    },
    openGraph: {
      title: `${caseStudy.client} Case Study | Amalgam`,
      description: caseStudy.headline,
      url: `/case-studies/${caseStudy.slug}`,
      type: "article",
      images: [
        {
          url: caseStudy.heroImageSrc,
          alt: caseStudy.heroImageAlt,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const currentIndex = caseStudies.findIndex((study) => study.slug === slug)
  const prevStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null
  const nextStudy = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null
  const isBrandMarkHero = caseStudy.heroImageSrc.startsWith("/clients/")
  const relatedStudies = caseStudies
    .filter((study) => study.slug !== caseStudy.slug)
    .sort((left, right) => {
      const leftScore = left.industry === caseStudy.industry ? 0 : 1
      const rightScore = right.industry === caseStudy.industry ? 0 : 1

      if (leftScore !== rightScore) {
        return leftScore - rightScore
      }

      return left.client.localeCompare(right.client)
    })
    .slice(0, 3)
  const canonicalUrl = `https://amalgam-inc.com/case-studies/${caseStudy.slug}`
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://amalgam-inc.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Case Studies",
          item: "https://amalgam-inc.com/case-studies",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: caseStudy.client,
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: caseStudy.headline,
      description: caseStudy.overview,
      articleSection: "Case Studies",
      keywords: [caseStudy.industry, ...caseStudy.technologies].join(", "),
      about: [
        {
          "@type": "Thing",
          name: caseStudy.client,
        },
        {
          "@type": "Thing",
          name: caseStudy.industry,
        },
      ],
      author: {
        "@type": "Organization",
        name: "Amalgam",
      },
      publisher: {
        "@type": "Organization",
        name: "Amalgam",
        logo: {
          "@type": "ImageObject",
          url: "https://amalgam-inc.com/brand/amalgam-logo.webp",
        },
      },
      mainEntityOfPage: canonicalUrl,
      url: canonicalUrl,
    },
  ]

  return (
    <>
      <JsonLd data={schema} />
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background">
        <section className="border-b border-border px-6 py-16 md:py-24">
          <div className="mx-auto max-w-[1120px]">
            <Link
              href="/case-studies"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to case studies
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1.5 text-sm font-semibold text-teal">
                <Building2 className="h-4 w-4" />
                {caseStudy.industry}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {caseStudy.location}
              </span>
              {caseStudy.featured ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple/10 px-3 py-1.5 text-sm font-semibold text-purple">
                  <Sparkles className="h-4 w-4" />
                  Featured
                </span>
              ) : null}
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                  {caseStudy.client}
                </p>
                <h1 className="text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
                  {caseStudy.headline}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                  {summarizeCaseStudyText(caseStudy.overview, {
                    maxSentences: 2,
                    maxChars: 360,
                  })}
                </p>
                <div className="mt-8 overflow-hidden rounded-[32px] border border-border bg-secondary/35">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={withBasePath(caseStudy.heroImageSrc)}
                      alt={caseStudy.heroImageAlt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 720px, 100vw"
                      className={`${
                        isBrandMarkHero
                          ? "object-contain object-center p-8"
                          : "object-cover object-center"
                      }`}
                    />
                  </div>
                  <div className="support-panel px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      Visual context
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {isBrandMarkHero
                        ? "Client brand mark shown as context where public project imagery is limited."
                        : "Representative project imagery drawn from public client context and Amalgam&apos;s published case-study materials."}
                    </p>
                  </div>
                </div>
              </div>

              <aside className="rounded-[30px] border border-border bg-secondary/30 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  At a glance
                </p>
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-border bg-background px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      Situation
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {summarizeCaseStudyText(caseStudy.problem, {
                        maxSentences: 1,
                        maxChars: 185,
                      })}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      Amalgam&apos;s role
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {summarizeCaseStudyText(caseStudy.approach, {
                        maxSentences: 1,
                        maxChars: 185,
                      })}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-teal">
                      What changed
                    </p>
                    <p className="mt-2 text-sm leading-relaxed font-medium text-foreground">
                      {summarizeCaseStudyText(caseStudy.outcome, {
                        maxSentences: 1,
                        maxChars: 185,
                      })}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-[1120px]">
            <div className="mb-16">
              <div className="mb-6 max-w-3xl">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                  Constraints
                </p>
                <h2 className="text-2xl font-bold text-foreground">
                  The real constraints
                </h2>
              </div>
              <div className="grid gap-3">
                {caseStudy.challenges.map((challenge, index) => (
                  <div key={challenge} className="flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-foreground">
                      {index + 1}
                    </span>
                    <p className="text-foreground">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <div className="mb-6 max-w-3xl">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                  Execution
                </p>
                <h2 className="text-2xl font-bold text-foreground">What we did</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {caseStudy.solution.map((item) => (
                  <div key={item.title} className="rounded-[28px] border border-border bg-background p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal">
                        <CheckCircle2 className="h-5 w-5" />
                      </span>
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <div className="mb-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
                <div className="max-w-3xl">
                  <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                    Results
                  </p>
                  <h2 className="text-2xl font-bold text-foreground">What changed</h2>
                </div>
                <div className="rounded-[28px] border border-border bg-secondary/30 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Why it mattered
                  </p>
                  <p className="mt-2 text-sm leading-relaxed font-medium text-foreground">
                    {caseStudy.outcome}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {caseStudy.results.map((result) => (
                  <div key={`${result.metric}-${result.value}`} className="flex flex-col rounded-[28px] border border-border bg-background p-6">
                    <span className="mb-3 inline-block self-start rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {result.metric}
                    </span>
                    <p className="mb-2 text-xl font-bold text-foreground">{result.value}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {result.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <div className="mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-bold text-foreground">Technologies and Methods</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-muted/30 px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <div className="mb-6 max-w-3xl">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-teal">
                  Related proof
                </p>
                <h2 className="text-2xl font-bold text-foreground">More situations with similar pressure</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedStudies.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/case-studies/${study.slug}`}
                    className="rounded-[24px] border border-border bg-background px-5 py-5 transition-colors hover:border-teal/35"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {study.industry}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{study.client}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {summarizeCaseStudyText(study.outcome, {
                        maxSentences: 1,
                        maxChars: 145,
                      })}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-muted/30 px-6 py-8">
          <div className="mx-auto max-w-[1120px]">
            <div className="flex items-center justify-between">
              {prevStudy ? (
                <Link
                  href={`/case-studies/${prevStudy.slug}`}
                  className="group flex items-center gap-3 rounded-lg p-4 transition-colors hover:bg-background"
                >
                  <ArrowLeft className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-teal" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Previous
                    </p>
                    <p className="font-medium text-foreground transition-colors group-hover:text-teal">
                      {prevStudy.client}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextStudy ? (
                <Link
                  href={`/case-studies/${nextStudy.slug}`}
                  className="group flex items-center gap-3 rounded-lg p-4 text-right transition-colors hover:bg-background"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Next
                    </p>
                    <p className="font-medium text-foreground transition-colors group-hover:text-teal">
                      {nextStudy.client}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-teal" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>

        <section className="bg-foreground px-6 py-20">
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="text-3xl font-bold text-background text-balance md:text-4xl">
              Seeing something similar?
            </h2>
            <p className="mt-4 text-lg text-background/70">
              If the shape of this situation feels familiar, the clearest next step
              is still a conversation about where your system is stuck and what
              should move first.
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
