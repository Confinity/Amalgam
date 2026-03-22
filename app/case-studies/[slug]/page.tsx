import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudyDetailPage } from "@/components/case-studies/CaseStudyDetailPage"
import { caseStudies } from "@/content/caseStudies"
import { summarizeCaseStudyText } from "@/lib/case-studies-data"
import { getCaseStudyPath } from "@/lib/case-study-system"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug)

  if (!study) {
    return { title: "Case study not found" }
  }

  return {
    title: `${study.source.headline} | Amalgam`,
    description: summarizeCaseStudyText(`${study.source.problem} ${study.source.outcome}`, {
      maxSentences: 2,
      maxChars: 158,
    }),
    alternates: {
      canonical: getCaseStudyPath(study.slug),
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

export default async function LegacyCaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug)

  if (!study) {
    notFound()
  }

  return <CaseStudyDetailPage study={study} sourceRoute="legacy_case_studies" />
}
