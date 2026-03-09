import { MetadataRoute } from "next"
import { caseStudies } from "@/lib/case-studies-data"
import { knowledgeBriefs } from "@/lib/knowledge-briefs"
import { launchpadStaticRoutes } from "@/lib/launchpad"
import { absoluteUrl } from "@/lib/site-config"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/team",
    "/services",
    "/founder-review",
    "/execution-sprint",
    "/outcome-partnership",
    "/case-studies",
    "/knowledge",
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
            route === "/launchpad"
          ? 0.9
          : 0.8,
  }))

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: absoluteUrl(`/case-studies/${study.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const knowledgeRoutes: MetadataRoute.Sitemap = knowledgeBriefs.map((brief) => ({
    url: absoluteUrl(`/knowledge/${brief.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...caseStudyRoutes, ...knowledgeRoutes]
}
