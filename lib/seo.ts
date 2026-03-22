import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/site-config"

type RouteMetadataInput = {
  title: string
  description: string
  canonicalPath: string
  openGraphTitle?: string
  openGraphDescription?: string
  openGraphImagePath?: string
}

function buildOpenGraphImage(path: string, alt: string) {
  return {
    url: absoluteUrl(path),
    width: 1200,
    height: 630,
    alt,
  }
}

export function buildRouteMetadata({
  title,
  description,
  canonicalPath,
  openGraphTitle,
  openGraphDescription,
  openGraphImagePath = "/opengraph-image",
}: RouteMetadataInput): Metadata {
  const pageTitle = openGraphTitle ?? title
  const pageDescription = openGraphDescription ?? description
  const image = buildOpenGraphImage(openGraphImagePath, `${pageTitle} | Amalgam`)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(canonicalPath),
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image.url],
    },
  }
}
