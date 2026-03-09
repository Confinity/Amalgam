const githubRepository = process.env.GITHUB_REPOSITORY ?? "Confinity/Amalgam"
const repositoryOwner = githubRepository.split("/")[0]?.toLowerCase() ?? "confinity"
const repositoryName = githubRepository.split("/")[1] ?? "Amalgam"
const isGithubActions = process.env.GITHUB_ACTIONS === "true"

export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? `/${repositoryName}` : "")

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  (isGithubActions ? `https://${repositoryOwner}.github.io` : "https://amalgam-inc.com")

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `${SITE_ORIGIN}${BASE_PATH}`

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path
  }

  return `${BASE_PATH}${path}`
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return `${SITE_ORIGIN}${withBasePath(path)}`
}
