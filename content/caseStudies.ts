import {
  caseStudies as caseStudyLibrary,
  summarizeCaseStudyText,
  type CaseStudy,
} from "@/lib/case-studies-data"

export type CaseStudyStage =
  | "Ideate & Prioritize"
  | "Validate & De-risk"
  | "Build & Ship"
  | "Productize & Systemize"
  | "Scale & Stabilize"

export type CaseStudyProblemTag =
  | "Delivery slipping"
  | "Direction unclear"
  | "Systems fragile"
  | "It's hard to trust the data"
  | "Coordination is slowing work"
  | "Modernization pressure"

export type CaseStudyMeta = {
  id: string
  slug: string
  company: string
  industry: string
  stage: CaseStudyStage
  service: "Founder Review" | "Expert Guidance" | "Outcome Partnership"
  problem: CaseStudyProblemTag
  context: string
  challenge: string
  whatMovedForward: string
  whyMattered: string
  situation: string
  outcome: string
  featured: boolean
  source: CaseStudy
}

const slugMap: Record<
  string,
  {
    stage: CaseStudyStage
    service: "Founder Review" | "Expert Guidance" | "Outcome Partnership"
    problem: CaseStudyProblemTag
  }
> = {
  "confinity": {
    stage: "Ideate & Prioritize",
    service: "Founder Review",
    problem: "Direction unclear",
  },
  "pearlx": {
    stage: "Build & Ship",
    service: "Expert Guidance",
    problem: "Delivery slipping",
  },
  "premier-financial-alliance": {
    stage: "Productize & Systemize",
    service: "Expert Guidance",
    problem: "It's hard to trust the data",
  },
  "mt-bank": {
    stage: "Scale & Stabilize",
    service: "Outcome Partnership",
    problem: "Modernization pressure",
  },
  "barclays-bank-us": {
    stage: "Productize & Systemize",
    service: "Expert Guidance",
    problem: "Systems fragile",
  },
  "john-templeton-foundation": {
    stage: "Validate & De-risk",
    service: "Founder Review",
    problem: "It's hard to trust the data",
  },
  "cleanitsupply": {
    stage: "Scale & Stabilize",
    service: "Outcome Partnership",
    problem: "Coordination is slowing work",
  },
  "constructive-built-environment": {
    stage: "Build & Ship",
    service: "Expert Guidance",
    problem: "Delivery slipping",
  },
  "admin-partners": {
    stage: "Productize & Systemize",
    service: "Expert Guidance",
    problem: "Systems fragile",
  },
  "moodys": {
    stage: "Scale & Stabilize",
    service: "Outcome Partnership",
    problem: "Coordination is slowing work",
  },
  "sofi": {
    stage: "Scale & Stabilize",
    service: "Outcome Partnership",
    problem: "Delivery slipping",
  },
  "tiaa": {
    stage: "Scale & Stabilize",
    service: "Outcome Partnership",
    problem: "Coordination is slowing work",
  },
  "finra": {
    stage: "Productize & Systemize",
    service: "Expert Guidance",
    problem: "Modernization pressure",
  },
}

function normalizeCaseStudy(study: CaseStudy): CaseStudyMeta {
  const mapped = slugMap[study.slug] ?? {
    stage: "Build & Ship",
    service: "Expert Guidance",
    problem: "Delivery slipping" as CaseStudyProblemTag,
  }

  return {
    id: study.id,
    slug: study.slug,
    company: study.client,
    industry: study.industry,
    stage: mapped.stage,
    service: mapped.service,
    problem: mapped.problem,
    context: summarizeCaseStudyText(study.overview, {
      maxSentences: 1,
      maxChars: 130,
    }),
    challenge: summarizeCaseStudyText(study.problem, {
      maxSentences: 1,
      maxChars: 128,
    }),
    whatMovedForward: summarizeCaseStudyText(study.outcome, {
      maxSentences: 1,
      maxChars: 126,
    }),
    whyMattered: summarizeCaseStudyText(
      study.results[0]?.description ??
      study.results[1]?.description ??
        study.outcome,
      {
        maxSentences: 1,
        maxChars: 128,
      },
    ),
    situation: summarizeCaseStudyText(study.problem, {
      maxSentences: 1,
      maxChars: 170,
    }),
    outcome: summarizeCaseStudyText(study.outcome, {
      maxSentences: 1,
      maxChars: 170,
    }),
    featured: study.featured,
    source: study,
  }
}

export const caseStudies = caseStudyLibrary.map(normalizeCaseStudy)

const homepageCaseStudyOrder = [
  "moodys",
  "sofi",
  "barclays-bank-us",
  "premier-financial-alliance",
  "pearlx",
  "confinity",
] as const

function orderCaseStudiesForHomepage(studies: CaseStudyMeta[]) {
  const bySlug = new Map(studies.map((study) => [study.slug, study]))
  const pinned = homepageCaseStudyOrder
    .map((slug) => bySlug.get(slug))
    .filter((study): study is CaseStudyMeta => Boolean(study))
  const pinnedSlugs = new Set(pinned.map((study) => study.slug))
  const remaining = studies.filter((study) => !pinnedSlugs.has(study.slug))
  return [...pinned, ...remaining]
}

export const homeCaseStudies = orderCaseStudiesForHomepage(caseStudies)

const featuredCaseStudyOrder = ["moodys", "barclays-bank-us", "sofi"] as const

export const featuredCaseStudies = featuredCaseStudyOrder
  .map((slug) => caseStudies.find((study) => study.slug === slug))
  .filter((study): study is CaseStudyMeta => Boolean(study))

export const caseStudyFilters = {
  problem: [...new Set(caseStudies.map((item) => item.problem))].sort(),
  stage: [...new Set(caseStudies.map((item) => item.stage))],
  industry: [...new Set(caseStudies.map((item) => item.industry))].sort(),
  service: [...new Set(caseStudies.map((item) => item.service))],
}
