/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"
const repository =
  process.env.SITE_REPOSITORY ?? process.env.GITHUB_REPOSITORY ?? "Confinity/Amalgam"
const repositoryName = repository.split("/")[1] ?? "Amalgam"
const basePath = isGithubActions ? `/${repositoryName}` : ""

const nextConfig = {
  output: "export",
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
    unoptimized: true,
  },
  async redirects() {
    if (basePath) {
      return []
    }

    return [
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
        source: "/ourwork",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/careers",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/schedule",
        destination: "/contact?interest=strategy-session",
        permanent: false,
      },
    ]
  },
  cleanDistDir: true,
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
