"use client"

import dynamic from "next/dynamic"
import { useEffect, useSyncExternalStore } from "react"
import { useSearchParams } from "next/navigation"

const ReviewMode = dynamic(
  () => import("@/components/review-mode").then((module) => module.ReviewMode),
  { ssr: false },
)

const REVIEW_MODE_STORAGE_KEY = "amalgam_review_mode"

function subscribeToReviewModeSession() {
  return () => {}
}

function getReviewModeSessionSnapshot() {
  if (typeof window === "undefined") {
    return false
  }
  return window.sessionStorage.getItem(REVIEW_MODE_STORAGE_KEY) === "true"
}

export function ReviewModeLazy() {
  const searchParams = useSearchParams()
  const fromSession = useSyncExternalStore(
    subscribeToReviewModeSession,
    getReviewModeSessionSnapshot,
    () => false,
  )

  const reviewParam = searchParams.get("review")
  const fromQuery = reviewParam !== null && reviewParam !== "false"

  useEffect(() => {
    if (fromQuery && typeof window !== "undefined") {
      window.sessionStorage.setItem(REVIEW_MODE_STORAGE_KEY, "true")
    }
  }, [fromQuery])

  const enabled = fromQuery || fromSession

  if (!enabled) {
    return null
  }

  return <ReviewMode />
}
