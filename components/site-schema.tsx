const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Amalgam",
  url: "https://amalgam-inc.com",
  image: "https://amalgam-inc.com/opengraph-image",
  logo: "https://amalgam-inc.com/brand/amalgam-logo.webp",
  description:
    "Senior operators helping founders and versatilists untangle complex systems and restore delivery velocity.",
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
  url: "https://amalgam-inc.com",
  description:
    "Senior operators helping founders and versatilists untangle complex systems and restore delivery velocity.",
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
