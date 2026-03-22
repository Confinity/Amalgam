/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"
const isLocalStaticPreview = process.env.LOCAL_STATIC_PREVIEW === "true"
const isStaticExport = isGithubActions || isLocalStaticPreview
const isDev = process.env.NODE_ENV === "development"
const repository =
  process.env.SITE_REPOSITORY ?? process.env.GITHUB_REPOSITORY ?? "Confinity/Amalgam"
const repositoryName = repository.split("/")[1] ?? "Amalgam"
const basePath = isGithubActions ? `/${repositoryName}` : ""

const nextConfig = {
  output: isStaticExport ? "export" : undefined,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_ORIGIN: isGithubActions
      ? "https://confinity.github.io"
      : "https://amalgam-inc.com",
    NEXT_PUBLIC_SITE_URL: isGithubActions
      ? `https://confinity.github.io/${repositoryName}`
      : "https://amalgam-inc.com",
  },
  images: {
    // Keep static-export compatibility while using optimized images in normal deploys.
    unoptimized: isStaticExport,
  },
  ...(!isStaticExport && {
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            ...(isDev
              ? [
                  {
                    key: "Cache-Control",
                    value: "no-store, no-cache, must-revalidate, proxy-revalidate",
                  },
                  { key: "Pragma", value: "no-cache" },
                  { key: "Expires", value: "0" },
                  { key: "Surrogate-Control", value: "no-store" },
                ]
              : []),
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "SAMEORIGIN" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            {
              key: "Permissions-Policy",
              value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
            },
          ],
        },
      ]
    },
    async redirects() {
      return [
        {
          source: "/launchpad",
          destination: "/next-move",
          permanent: true,
        },
        {
          source: "/launchpad/:path*",
          destination: "/next-move/:path*",
          permanent: true,
        },
        {
          source: "/case-studies",
          destination: "/our-work",
          permanent: true,
        },
        {
          source: "/case-studies/:path*",
          destination: "/our-work/:path*",
          permanent: true,
        },
        {
          source: "/knowledge",
          destination: "/research",
          permanent: true,
        },
        {
          source: "/knowledge/:path*",
          destination: "/research/:path*",
          permanent: true,
        },
        {
          source: "/our-take",
          destination: "/research",
          permanent: true,
        },
        {
          source: "/our-take/:path*",
          destination: "/research/:path*",
          permanent: true,
        },
        {
          source: "/ourwork",
          destination: "/our-work",
          permanent: true,
        },
        {
          source: "/aboutus",
          destination: "/about",
          permanent: true,
        },
        {
          source: "/contactus",
          destination: "/contact",
          permanent: true,
        },
        {
          source: "/schedule",
          destination: "/contact?interest=strategy-session",
          permanent: true,
        },
      ]
    },
  }),
  cleanDistDir: true,
}

export default nextConfig
