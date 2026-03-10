"use client"

import dynamic from "next/dynamic"

const ReviewMode = dynamic(
  () => import("@/components/review-mode").then((module) => module.ReviewMode),
  { ssr: false },
)

export function ReviewModeLazy() {
  return <ReviewMode />
}
