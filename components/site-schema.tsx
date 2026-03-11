import { SITE_URL, absoluteUrl } from "@/lib/site-config"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Amalgam",
  url: SITE_URL,
  image: absoluteUrl("/opengraph-image"),
  logo: absoluteUrl("/brand/amalgam-logo.webp"),
  description:
    "Amalgam helps founders, operators, and enterprise teams fix architecture, integration, and delivery bottlenecks.",
  email: "hello@amalgam-inc.com",
  telephone: "+1-484-354-8498",
  foundingDate: "2012",
  address: {
    "@type": "PostalAddress",
    streetAddress: "851 Duportail Road, 2nd Floor",
    addressLocality: "Chesterbrook",
    addressRegion: "PA",
    postalCode: "19087",
    addressCountry: "US",
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Amalgam",
  url: SITE_URL,
  description:
    "Practical guidance for teams dealing with delivery bottlenecks, system risk, and cross-functional execution pressure.",
}

export function SiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationSchema, websiteSchema]),
      }}
    />
  )
}
