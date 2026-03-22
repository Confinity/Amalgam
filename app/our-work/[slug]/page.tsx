import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudyDetailPage } from "@/components/case-studies/CaseStudyDetailPage"
import { caseStudies } from "@/content/caseStudies"
import { summarizeCaseStudyText } from "@/lib/case-studies-data"
import { getCaseStudyPath } from "@/lib/case-study-system"
import { absoluteUrl } from "@/lib/site-config"

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

  const canonicalPath = getCaseStudyPath(study.slug)
  const title = `${study.source.headline} | Amalgam`
  const description = summarizeCaseStudyText(`${study.source.problem} ${study.source.outcome}`, {
    maxSentences: 2,
    maxChars: 158,
  })
  const keywords = [
    study.company,
    study.industry,
    study.problem,
    study.stage,
    study.service,
    ...study.source.technologies,
  ]

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    category: "Our Work",
    keywords,
    openGraph: {
      type: "article",
      url: absoluteUrl(canonicalPath),
      title,
      description,
      images: [
        {
          url: absoluteUrl(study.source.heroImageSrc),
          alt: study.source.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(study.source.heroImageSrc)],
    },
  }
}

export default async function OurWorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug)

  if (!study) {
    notFound()
  }

  return <CaseStudyDetailPage study={study} sourceRoute="our_work" />
}
