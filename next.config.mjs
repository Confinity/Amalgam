/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"
const repository =
  process.env.SITE_REPOSITORY ?? process.env.GITHUB_REPOSITORY ?? "Confinity/Amalgam"
const repositoryName = repository.split("/")[1] ?? "Amalgam"
const basePath = isGithubActions ? `/${repositoryName}` : ""

const nextConfig = {
  output: isGithubActions ? "export" : undefined,
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
  cleanDistDir: true,
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
