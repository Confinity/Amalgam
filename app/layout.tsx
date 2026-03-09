import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteSchema } from "@/components/site-schema"
import { SITE_URL, absoluteUrl, withBasePath } from "@/lib/site-config"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const analyticsEnabled = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1"

export const metadata: Metadata = {
  title: {
    default: "Amalgam | Senior operators for complex systems",
    template: "%s | Amalgam",
  },
  applicationName: "Amalgam",
  description:
    "Amalgam helps founders, executives, and technical leaders bring clarity to complex systems, improve delivery, and move forward with confidence.",
  metadataBase: new URL(SITE_URL),
  category: "technology consulting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: withBasePath("/brand/amalgam-favicon.png"),
    shortcut: withBasePath("/brand/amalgam-favicon.png"),
    apple: withBasePath("/brand/amalgam-favicon.png"),
  },
  keywords: [
    "systems consulting",
    "technical consulting",
    "strategy consulting",
    "technical leadership",
    "operating systems",
    "execution",
    "delivery velocity",
    "architecture",
    "technical debt",
    "enterprise modernization",
    "operators",
  ],
  authors: [{ name: "Amalgam Inc." }],
  creator: "Amalgam Inc.",
  publisher: "Amalgam Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Amalgam",
    title: "Amalgam - Complex systems, clearer decisions, faster execution.",
    description:
      "Senior operators helping teams bring clarity to complex systems and move execution forward.",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Amalgam - Senior operators for complex systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amalgam - Complex systems, clearer decisions, faster execution.",
    description:
      "Senior operators helping teams bring clarity to complex systems and move execution forward.",
    images: [absoluteUrl("/opengraph-image")],
    creator: "@amalgam_inc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: "#00BFA6",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
        <SiteSchema />
        {children}
        {analyticsEnabled ? <Analytics /> : null}
      </body>
    </html>
  )
}
