import { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { TrackedLink } from "@/components/tracked-link"
import {
  getLaunchpadGuideArticles,
  getLaunchpadProgram,
  getLaunchpadTool,
  launchpadGuideCollections,
} from "@/lib/launchpad"

export const metadata: Metadata = {
  title: "Launchpad Guides",
  description:
    "Field guidance for founders, executives, and technical leaders dealing with delivery drag, fragile systems, AI readiness, unclear sequencing, and integration complexity.",
  alternates: {
    canonical: "/launchpad/guides",
  },
}

export default function LaunchpadGuidesPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="border-b border-border py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Launchpad Guides
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl">
              Practical field guidance for leaders trying to act, not just read
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Knowledge is the editorial library. Launchpad guides are grouped by
              the situations teams actually need help thinking through.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] space-y-8 px-6">
            {launchpadGuideCollections.map((collection) => {
              const articles = getLaunchpadGuideArticles(collection)
              const relatedTool = getLaunchpadTool(collection.relatedTool)
              const relatedProgram = getLaunchpadProgram(collection.relatedProgram)

              return (
                <section key={collection.id} className="rounded-[32px] border border-border bg-background p-8 lg:p-10">
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
                    <div>
                      <h2 className="text-3xl font-semibold text-foreground text-balance">
                        {collection.title}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {collection.description}
                      </p>
                      {relatedTool ? (
                        <TrackedLink
                          href={`/launchpad/${relatedTool.slug}`}
                          eventName="launchpad_path_click"
                          eventData={{ source: "launchpad_guides_collection", target: relatedTool.id }}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                        >
                          Start with {relatedTool.shortTitle}
                          <ArrowRight className="h-4 w-4" />
                        </TrackedLink>
                      ) : null}
                    </div>

                    <div className="space-y-4">
                      {articles.map((article) => (
                        <TrackedLink
                          key={article.slug}
                          href={`/knowledge/${article.slug}`}
                          eventName="launchpad_path_click"
                          eventData={{ source: "launchpad_guides_collection", target: article.slug }}
                          className="block rounded-[24px] border border-border bg-secondary/20 px-5 py-5 transition-colors hover:border-teal/35"
                        >
                          <p className="text-lg font-semibold text-foreground">{article.title}</p>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {article.description}
                          </p>
                        </TrackedLink>
                      ))}

                      {relatedProgram ? (
                        <div className="support-panel rounded-[24px] p-5">
                          <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                            If this points to deeper work
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {relatedProgram.description}
                          </p>
                          <TrackedLink
                            href={relatedProgram.href}
                            eventName="launchpad_path_click"
                            eventData={{ source: "launchpad_guides_collection", target: relatedProgram.id }}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                          >
                            {relatedProgram.ctaLabel}
                            <ArrowRight className="h-4 w-4" />
                          </TrackedLink>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
