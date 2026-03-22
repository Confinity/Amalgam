import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const REVIEW_SUFFIX = "/review"
const STATIC_FILE_PATTERN = /\.[^/]+$/

function shouldBypass(pathname: string) {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    STATIC_FILE_PATTERN.test(pathname)
  )
}

function stripTrailingSlash(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1)
  }
  return pathname
}

export function middleware(request: NextRequest) {
  const currentPath = stripTrailingSlash(request.nextUrl.pathname)
  if (shouldBypass(currentPath)) {
    return NextResponse.next()
  }

  if (!currentPath.endsWith(REVIEW_SUFFIX)) {
    return NextResponse.next()
  }

  const targetPath =
    currentPath === REVIEW_SUFFIX
      ? "/"
      : currentPath.slice(0, -REVIEW_SUFFIX.length) || "/"

  const targetUrl = request.nextUrl.clone()
  targetUrl.pathname = targetPath
  targetUrl.searchParams.set("review", "true")

  return NextResponse.redirect(targetUrl)
}

export const config = {
  matcher: "/:path*",
}
