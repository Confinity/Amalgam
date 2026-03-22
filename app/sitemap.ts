import { MetadataRoute } from "next"
import { caseStudies } from "@/lib/case-studies-data"
import { knowledgeBriefs } from "@/lib/knowledge-briefs"
import { launchpadStaticRoutes } from "@/lib/launchpad"
import { getCaseStudyPath } from "@/lib/case-study-system"
import { absoluteUrl } from "@/lib/site-config"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/team",
    "/services",
    "/founder-review",
    "/focused-intervention",
    "/outcome-partnership",
    "/our-work",
    "/our-work/rebuilding-amalgam-website",
    "/research",
    "/research/library",
    "/careers",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookie-policy",
  ]
  const allStaticPages = [...staticPages, ...launchpadStaticRoutes]

  const staticRoutes: MetadataRoute.Sitemap = allStaticPages.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/services" ||
            route === "/founder-review" ||
            route === "/next-move"
          ? 0.9
          : 0.8,
  }))

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: absoluteUrl(getCaseStudyPath(study.slug)),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const knowledgeRoutes: MetadataRoute.Sitemap = knowledgeBriefs.map((brief) => ({
    url: absoluteUrl(`/research/${brief.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...caseStudyRoutes, ...knowledgeRoutes]
}


