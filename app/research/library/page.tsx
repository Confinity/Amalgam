import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/heroes/PageHero"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { KnowledgeLibraryFilters } from "@/components/sections/KnowledgeLibraryFilters"
import {
  featuredKnowledgeArticle,
  knowledgeArticles,
  researchTopicFamilies,
} from "@/content/knowledge"

export const metadata: Metadata = {
  title: "Research library | Amalgam",
  description: "Browse the full research library by topic and content type.",
  alternates: {
    canonical: "/research/library",
  },
}

export default function ResearchLibraryPage() {
  const featured = featuredKnowledgeArticle
  const articles = featured
    ? [featured, ...knowledgeArticles.filter((article) => article.slug !== featured.slug)]
    : knowledgeArticles

  return (
    <>
      <Navigation />
      <main id="main-content">
        <PageHero
          scale="medium"
          tone="soft"
          title={<h1>Research library</h1>}
          support="Find the right brief fast. Search, filter, and sort by topic and content type."
        />

        <section className="section-tight border-y border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="container-site">
            <p className="max-w-3xl text-sm text-[var(--color-text-muted)]">
              Start with a keyword or topic, then narrow by content type when you need to.
            </p>
            <div className="mt-4">
              <KnowledgeLibraryFilters
                topics={researchTopicFamilies}
                articles={articles}
                surfaceId="research_library_page"
              />
            </div>
          </div>
        </section>

        <FinalCtaBand
          surfaceId="research_library_final"
          headline="Want help deciding what to do next?"
          support="Tell us what&apos;s happening and we&apos;ll recommend the clearest next step."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  )
}
