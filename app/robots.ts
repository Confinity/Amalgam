import { MetadataRoute } from "next"
import { SITE_URL, absoluteUrl } from "@/lib/site-config"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE_URL,
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
