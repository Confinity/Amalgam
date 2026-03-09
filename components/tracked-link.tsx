"use client"

import type { ComponentPropsWithoutRef } from "react"
import Link, { type LinkProps } from "next/link"
import { track } from "@vercel/analytics"

type TrackedLinkProps = LinkProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> & {
    eventName: string
    eventData?: Record<string, string | number | boolean>
  }

export function TrackedLink({
  eventName,
  eventData,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        track(eventName, eventData)
        onClick?.(event)
      }}
    >
      {children}
    </Link>
  )
}
