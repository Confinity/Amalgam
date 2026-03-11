import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ReviewModeLazy } from "@/components/review-mode-lazy"
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
    default: "Amalgam | From idea to scale - without the chaos.",
    template: "%s | Amalgam",
  },
  applicationName: "Amalgam",
  description:
    "Amalgam helps founders, entrepreneurs, and product teams turn ideas into real products and working systems.",
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
    "product execution",
    "strategy and delivery",
    "technical leadership",
    "product systems",
    "execution",
    "delivery momentum",
    "architecture",
    "technical debt",
    "enterprise modernization",
    "systems leadership",
  ],
  authors: [{ name: "Amalgam Inc." }],
  creator: "Amalgam Inc.",
  publisher: "Amalgam Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Amalgam",
    title: "Amalgam - From idea to scale without the chaos",
    description:
      "Senior execution support for founders, entrepreneurs, and teams building real products and systems.",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Amalgam - Experienced support for complex systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amalgam - From idea to scale without the chaos",
    description:
      "Senior execution support for founders, entrepreneurs, and teams building real products and systems.",
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
        <ReviewModeLazy />
        {analyticsEnabled ? <Analytics /> : null}
      </body>
    </html>
  )
}

