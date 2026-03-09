import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteSchema } from "@/components/site-schema"
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
    "We help founders and versatilists untangle complex systems and restore delivery velocity. Start with the Founder Review - a focused diagnostic that reveals what is broken and what to fix first.",
  metadataBase: new URL("https://amalgam-inc.com"),
  category: "technology consulting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/brand/amalgam-favicon.png",
    shortcut: "/brand/amalgam-favicon.png",
    apple: "/brand/amalgam-favicon.png",
  },
  keywords: [
    "systems consulting",
    "technical consulting",
    "founder consulting",
    "execution",
    "delivery velocity",
    "architecture",
    "technical debt",
    "enterprise modernization",
    "versatilists",
  ],
  authors: [{ name: "Amalgam Inc." }],
  creator: "Amalgam Inc.",
  publisher: "Amalgam Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amalgam-inc.com",
    siteName: "Amalgam",
    title: "Amalgam - Untangle complex systems. Ship again.",
    description:
      "We help founders and versatilists untangle complex systems and restore delivery velocity.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Amalgam - Senior operators for complex systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amalgam - Untangle complex systems. Ship again.",
    description:
      "We help founders and versatilists untangle complex systems and restore delivery velocity.",
    images: ["/opengraph-image"],
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
