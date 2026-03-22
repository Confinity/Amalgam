import type { Metadata, Viewport } from "next"
import { Suspense } from "react"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ReviewModeLazy } from "@/components/review-mode-lazy"
import { SiteSchema } from "@/components/site-schema"
import { SITE_URL, absoluteUrl, withBasePath } from "@/lib/site-config"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const analyticsEnabled = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1"

export const metadata: Metadata = {
  title: {
    default: "Amalgam | Move from idea to scale without the chaos",
    template: "%s | Amalgam",
  },
  applicationName: "Amalgam",
  description:
    "Amalgam helps founders and product teams move from idea to scale without the chaos.",
  metadataBase: new URL(SITE_URL),
  category: "product and systems execution",
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
    "founder review",
    "focused intervention",
    "outcome partnership",
    "product execution",
    "systems clarity",
    "delivery friction",
  ],
  authors: [{ name: "Amalgam Inc." }],
  creator: "Amalgam Inc.",
  publisher: "Amalgam Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Amalgam",
    title: "Amalgam | Move from idea to scale without the chaos",
    description:
      "Clear read, right next step, and practical senior support for teams under execution pressure.",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Amalgam execution clarity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amalgam | Move from idea to scale without the chaos",
    description:
      "Clear read and practical next-step support for founders and product teams.",
    images: [absoluteUrl("/opengraph-image")],
  },
}

export const viewport: Viewport = {
  themeColor: "#172033",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--color-text-inverse)]"
        >
          Skip to content
        </a>
        <SiteSchema />
        {children}
        <Suspense fallback={null}>
          <ReviewModeLazy />
        </Suspense>
        {analyticsEnabled ? <Analytics /> : null}
      </body>
    </html>
  )
}
