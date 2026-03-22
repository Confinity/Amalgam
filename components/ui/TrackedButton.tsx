"use client"

import { track } from "@vercel/analytics"
import type { MouseEvent } from "react"
import {
  Button,
  type LinkButtonProps,
  type NativeButtonProps,
} from "@/components/ui/Button"

type TrackValue = string | number | boolean

type TrackedLinkButtonProps = Omit<LinkButtonProps, "onClick"> & {
  onClick?: LinkButtonProps["onClick"]
  eventName: string
  eventData?: Record<string, TrackValue>
}

type TrackedNativeButtonProps = Omit<NativeButtonProps, "onClick"> & {
  onClick?: NativeButtonProps["onClick"]
  eventName: string
  eventData?: Record<string, TrackValue>
}

type TrackedButtonProps = TrackedLinkButtonProps | TrackedNativeButtonProps

export function TrackedButton({
  eventName,
  eventData,
  ...rest
}: TrackedButtonProps) {
  if ("href" in rest && rest.href) {
    const { onClick, ...props } = rest as TrackedLinkButtonProps
    return (
      <Button
        {...props}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          track(eventName, eventData)
          onClick?.(event)
        }}
      />
    )
  }

  const { onClick, ...props } = rest as TrackedNativeButtonProps

  return (
    <Button
      {...props}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        track(eventName, eventData)
        onClick?.(event)
      }}
    />
  )
}
