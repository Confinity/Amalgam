import Image from "next/image"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { ArticleReadingProgress } from "@/components/article-reading-progress"
import { CaseStudyOutline } from "@/components/case-studies/CaseStudyOutline"
import { JsonLd } from "@/components/json-ld"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrackedLink } from "@/components/tracked-link"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { caseStudies, type CaseStudyMeta } from "@/content/caseStudies"
import {
  buildCaseStudyExecutionSections,
  buildCaseStudyFaq,
  buildCaseStudyFinalSupport,
  buildCaseStudyFitBullets,
  buildCaseStudyInternalLinks,
  buildCaseStudyOutline,
  buildCaseStudySectionCopy,
  getCaseStudyPath,
} from "@/lib/case-study-system"
import { absoluteUrl, withBasePath } from "@/lib/site-config"

type CaseStudyDetailPageProps = {
  study: CaseStudyMeta
  sourceRoute: "our_work" | "legacy_case_studies"
}

export function CaseStudyDetailPage({ study, sourceRoute }: CaseStudyDetailPageProps) {
  const canonicalPath = getCaseStudyPath(study.slug)
  const executionSections = buildCaseStudyExecutionSections(study)
  const related = caseStudies
    .filter((item) => item.slug !== study.slug)
    .map((item) => ({
      ...item,
      score:
        (item.problem === study.problem ? 2 : 0) +
        (item.stage === study.stage ? 1 : 0) +
        (item.industry === study.industry ? 1 : 0),
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score || Number(right.featured) - Number(left.featured))
    .slice(0, 3)
  const isLogoStyleImage = study.source.heroImageSrc.startsWith("/clients/")

  const faqItems = buildCaseStudyFaq(study)
  const internalLinks = buildCaseStudyInternalLinks(study)
  const fitBullets = buildCaseStudyFitBullets(study)
  const sectionCopy = buildCaseStudySectionCopy(study)
  const articleNav = buildCaseStudyOutline(study, related.length > 0)
  const projectLinks = [
    ...internalLinks,
    ...related.slice(0, 2).map((item) => ({
      title: `Related case: ${item.company}`,
      description: item.outcome,
      href: getCaseStudyPath(item.slug),
    })),
  ].slice(0, 6)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.source.headline,
    description: study.outcome,
    url: absoluteUrl(canonicalPath),
    about: [
      { "@type": "Thing", name: study.company },
      { "@type": "Thing", name: study.problem },
      { "@type": "Thing", name: study.stage },
    ],
    keywords: [study.industry, study.problem, study.stage, ...study.source.technologies].join(", "),
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
        eventData={{ slug: study.slug, source: sourceRoute, stage: study.stage }}
      />
      <main id="main-content">
        <section className="border-b border-[var(--color-border)] pt-[160px] pb-[72px] md:pt-[180px] md:pb-[88px] lg:pt-[192px] lg:pb-[102px]">
          <div className="container-site">
            <TrackedLink
              href="/our-work"
              eventName="case_study_navigation_clicked"
              eventData={{ source: "case_study_top_back", slug: study.slug, target: "/our-work" }}
              className="inline-flex min-h-11 items-center gap-2 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </TrackedLink>

            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
              <div>
                <h1 className="max-w-[22ch] text-4xl font-semibold leading-tight md:text-5xl">
                  {study.source.headline}
                </h1>
                <p className="mt-5 max-w-[66ch] text-lg">{study.source.problem}</p>
                <p className="mt-4 max-w-[66ch] text-base text-[var(--color-text-muted)]">
                  {study.source.outcome}
                </p>
                <div className="mt-6 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2.5 py-1 text-[var(--color-text-subtle)]">
                    {study.problem}
                  </span>
                  <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2.5 py-1 text-[var(--color-text-subtle)]">
                    {study.stage}
                  </span>
                  <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2.5 py-1 text-[var(--color-text-subtle)]">
                    {study.service}
                  </span>
                  <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2.5 py-1 text-[var(--color-text-subtle)]">
                    {study.industry}
                  </span>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="#case-study-article">Read case study</Button>
                  <Button href="/contact" variant="secondary">
                    Get a recommendation
                  </Button>
                </div>
              </div>

              <Card variant="primary" className="p-6">
                <div
                  className={`overflow-hidden rounded-2xl border border-[var(--color-border)] ${
                    isLogoStyleImage ? "bg-[var(--color-surface-muted)] p-6" : "bg-[var(--color-surface)] p-4"
                  }`}
                >
                  <Image
                    src={withBasePath(study.source.heroImageSrc)}
                    alt={study.source.heroImageAlt}
                    width={880}
                    height={520}
                    className={`h-auto w-full rounded-xl ${
                      isLogoStyleImage ? "max-h-[220px] object-contain" : "object-cover"
                    }`}
                  />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">
                  What moved forward
                </p>
                <p className="mt-3 text-sm text-[var(--color-text)]">{study.source.outcome}</p>
                <dl className="mt-5 grid gap-3 text-sm text-[var(--color-text)] sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
                    <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                      Industry
                    </dt>
                    <dd className="mt-1">{study.industry}</dd>
                  </div>
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
                    <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                      Location
                    </dt>
                    <dd className="mt-1">{study.source.location}</dd>
                  </div>
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
                    <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                      Stage
                    </dt>
                    <dd className="mt-1">{study.stage}</dd>
                  </div>
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
                    <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                      Support path
                    </dt>
                    <dd className="mt-1">{study.service}</dd>
                  </div>
                </dl>
                <Button href="/contact" className="mt-5" withArrow>
                  Get a recommendation
                </Button>
              </Card>
            </div>
          </div>
        </section>

        <section className="section-tight border-b border-[var(--color-border)] bg-[linear-gradient(165deg,rgba(255,255,255,0.95),rgba(243,245,247,0.84))]">
          <div className="container-site grid gap-4 md:grid-cols-3">
            <Card className="p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Situation</p>
              <p className="mt-3 text-sm text-[var(--color-text)]">{study.source.problem}</p>
            </Card>
            <Card className="p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">What we did</p>
              <p className="mt-3 text-sm text-[var(--color-text)]">{study.source.approach}</p>
            </Card>
            <Card className="p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                What changed
              </p>
              <p className="mt-3 text-sm text-[var(--color-text)]">{study.source.outcome}</p>
            </Card>
          </div>
        </section>

        <section className="section-compact">
          <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
            <article
              id="case-study-article"
              className="rounded-[30px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-10"
            >
              <div className="mb-6 lg:hidden">
                <CaseStudyOutline
                  items={articleNav}
                  slug={study.slug}
                  pageSource={sourceRoute}
                  mode="mobile"
                />
              </div>

              <div className="rounded-[26px] border border-[var(--color-border)] bg-[linear-gradient(168deg,rgba(255,255,255,0.98),rgba(243,245,247,0.78))] p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">Overview</p>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--color-text)]">
                  <p>{study.source.overview}</p>
                  <p>{study.source.outcome}</p>
                </div>
              </div>

              <section id="context-snapshot" className="mt-10">
                <h2 className="text-2xl font-semibold md:text-3xl">{sectionCopy.contextTitle}</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--color-text)]">
                  <p>{study.situation}</p>
                  <p>
                    This engagement sat in a {study.stage.toLowerCase()} context and was delivered through our{" "}
                    {study.service.toLowerCase()} support model.
                  </p>
                </div>
                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3">
                    <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Company</dt>
                    <dd className="mt-1 text-sm text-[var(--color-text)]">{study.company}</dd>
                  </div>
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3">
                    <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Industry</dt>
                    <dd className="mt-1 text-sm text-[var(--color-text)]">{study.industry}</dd>
                  </div>
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3">
                    <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Location</dt>
                    <dd className="mt-1 text-sm text-[var(--color-text)]">{study.source.location}</dd>
                  </div>
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3">
                    <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Pressure</dt>
                    <dd className="mt-1 text-sm text-[var(--color-text)]">{study.problem}</dd>
                  </div>
                </dl>
              </section>

              <section id="what-needed-to-change" className="mt-10">
                <h2 className="text-2xl font-semibold md:text-3xl">{sectionCopy.pressureTitle}</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--color-text)]">
                  <p>{study.source.problem}</p>
                  <p>{sectionCopy.pressureSupport}</p>
                  <p>{study.source.overview}</p>
                </div>
                {study.source.challenges.length > 0 ? (
                  <>
                    <p className="mt-5 text-sm font-medium text-[var(--color-text)]">
                      Core constraints we had to address
                    </p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--color-text)] marker:text-[var(--color-accent-strong)]">
                      {study.source.challenges.map((challenge) => (
                        <li key={challenge}>{challenge}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </section>

              <section id="how-we-structured-the-work" className="mt-10">
                <h2 className="text-2xl font-semibold md:text-3xl">{sectionCopy.structureTitle}</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--color-text)]">
                  <p>{study.source.approach}</p>
                  <p>{sectionCopy.structureSupport}</p>
                </div>
                {study.source.technologies.length > 0 ? (
                  <div className="mt-5">
                    <p className="text-sm font-medium text-[var(--color-text)]">
                      Core technologies and system elements
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {study.source.technologies.map((technology) => (
                        <span
                          key={`${study.slug}-${technology}`}
                          className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1 text-xs text-[var(--color-text-subtle)]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>

              {executionSections.map((section, index) => (
                <section key={section.id} id={section.id} className="mt-10">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
                    {index === 0
                      ? "First move"
                      : index === executionSections.length - 1
                        ? "Final move"
                        : "Next move"}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{section.title}</h2>
                  <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_252px] lg:items-start">
                    <div className="space-y-4 text-base leading-relaxed text-[var(--color-text)]">
                      <p>{section.description}</p>
                      {section.result ? <p>{section.result.description}</p> : null}
                    </div>
                    <div className="space-y-3">
                      {section.challenge ? (
                        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                            Pressure addressed
                          </p>
                          <p className="mt-2 text-sm text-[var(--color-text)]">{section.challenge}</p>
                        </div>
                      ) : null}
                      {section.result ? (
                        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                            Change unlocked
                          </p>
                          <p className="mt-2 text-base font-semibold text-[var(--color-text)]">
                            {section.result.value}
                          </p>
                          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                            {section.result.description}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>
              ))}

              <section id="what-changed" className="mt-10">
                <h2 className="text-2xl font-semibold md:text-3xl">{sectionCopy.outcomesTitle}</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--color-text)]">
                  <p>{study.source.outcome}</p>
                  <p>{sectionCopy.outcomesSupport}</p>
                </div>
                {study.source.results.length > 0 ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {study.source.results.map((result) => (
                      <div
                        key={`${result.metric}-${result.value}`}
                        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4"
                      >
                        <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                          {result.metric}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold">{result.value}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                          {result.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>

              <section id="where-this-fits" className="mt-10">
                <h2 className="text-2xl font-semibold md:text-3xl">{sectionCopy.fitTitle}</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--color-text)] marker:text-[var(--color-accent-strong)]">
                  {fitBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </section>

              {related.length > 0 ? (
                <section id="similar-situations" className="mt-10">
                  <h2 className="text-2xl font-semibold md:text-3xl">Similar situations</h2>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
                    Additional case studies with comparable pressure patterns, operating context, or
                    delivery stage.
                  </p>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {related.map((item) => (
                      <Card
                        key={item.id}
                        as={TrackedLink}
                        href={getCaseStudyPath(item.slug)}
                        eventName="case_study_related_clicked"
                        eventData={{
                          source: "case_study_article_related",
                          slug: study.slug,
                          target_slug: item.slug,
                        }}
                        interactive
                        className="p-4"
                      >
                        <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                          {item.problem}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">
                          {item.company}
                        </p>
                        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{item.outcome}</p>
                      </Card>
                    ))}
                  </div>
                </section>
              ) : null}
            </article>

            <aside className="space-y-4 lg:sticky lg:top-28">
              <Card className="p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                  Reading map
                </p>
                <CaseStudyOutline
                  items={articleNav}
                  slug={study.slug}
                  pageSource={sourceRoute}
                  mode="desktop"
                />
              </Card>

              <Card variant="primary" className="p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">
                  Project profile
                </p>
                <div className="mt-3 grid gap-2 text-sm text-[var(--color-text)]">
                  <div className="tile-utility p-3">Pressure: {study.problem}</div>
                  <div className="tile-utility p-3">Stage: {study.stage}</div>
                  <div className="tile-utility p-3">Service path: {study.service}</div>
                  <div className="tile-utility p-3">Location: {study.source.location}</div>
                </div>
                <Button href="/contact" withArrow className="mt-4 w-full">
                  Get a recommendation
                </Button>
              </Card>
            </aside>
          </div>
        </section>

        <section className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <h2>Outcome highlights</h2>
            <p className="mt-3 max-w-3xl text-base">
              The clearest shifts in the system, workflow, and operating confidence after the work
              moved.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {study.source.results.map((result) => (
                <Card key={`${result.metric}-${result.value}`}>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                    {result.metric}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[var(--color-text)]">{result.value}</p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{result.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-compact">
          <div className="container-site">
            <h2>FAQ</h2>
            <p className="mt-3 max-w-3xl text-base">
              Common questions from teams facing similar pressure, implementation choices, and
              operating constraints.
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
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-tight border-y border-[var(--color-border)] bg-[linear-gradient(165deg,rgba(255,255,255,0.95),rgba(243,245,247,0.84))]">
          <div className="container-site">
            <h2>Related reads and next steps</h2>
            <p className="mt-3 max-w-3xl text-base">
              Use this case study as a starting point, then branch into the closest next move,
              supporting guidance, or comparable work.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projectLinks.map((item) => (
                <Card
                  key={item.title}
                  as={TrackedLink}
                  href={item.href}
                  eventName="our_work_internal_link_clicked"
                  eventData={{ source: "case_study_internal_links", slug: study.slug, target: item.href }}
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
          surfaceId={`our_work_case_study_${study.slug}`}
          tone="dark"
          headline="Seeing something similar?"
          support={buildCaseStudyFinalSupport(study)}
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />

        <section className="section-tight border-t border-[var(--color-border)]">
          <div className="container-site flex justify-end">
            <TrackedLink
              href="/our-work"
              eventName="case_study_navigation_clicked"
              eventData={{ source: "case_study_bottom_back", slug: study.slug, target: "/our-work" }}
              className="inline-flex min-h-11 items-center gap-2 py-2 text-sm text-[var(--color-accent-strong)]"
            >
              Back to case-study library
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

