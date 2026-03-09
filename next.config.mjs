/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"
const repository = process.env.GITHUB_REPOSITORY ?? "Confinity/Amalgam"
const repositoryName = repository.split("/")[1] ?? "Amalgam"
const basePath = isGithubActions ? `/${repositoryName}` : ""

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
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
        destination: "/contact?interest=founder-review",
        permanent: false,
      },
    ]
  },
  cleanDistDir: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    workerThreads: false,
    webpackBuildWorker: false,
  },
}

export default nextConfig
