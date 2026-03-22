"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import { withBasePath } from "@/lib/site-config"
import { cn } from "@/lib/utils"

type TrustLogo = {
  name: string
  src: string
  href?: string
}

type RotatingLogoGridProps = {
  logos: TrustLogo[]
  className?: string
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"
const MOBILE_QUERY = "(max-width: 767px)"
const HOLD_MS = 6800
const TRANSITION_MS = 540
const STAGGER_MS = 90
const DESKTOP_SET_SIZE = 8
const MOBILE_SET_SIZE = 4

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return () => {}
      }

      const mediaQueryList = window.matchMedia(query)
      mediaQueryList.addEventListener("change", onStoreChange)
      return () => mediaQueryList.removeEventListener("change", onStoreChange)
    },
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false),
    () => false,
  )
}

function chunkLogos(logos: TrustLogo[], size: number) {
  if (size <= 0) {
    return [logos]
  }

  const chunks: TrustLogo[][] = []
  for (let index = 0; index < logos.length; index += size) {
    const chunk = logos.slice(index, index + size)

    // Keep each rotation set visually stable (e.g., always 8 on desktop)
    // by filling any short trailing set from the start of the full list.
    if (logos.length >= size && chunk.length > 0 && chunk.length < size) {
      const seen = new Set(chunk.map((logo) => logo.name))
      let sourceIndex = 0

      while (chunk.length < size && sourceIndex < logos.length) {
        const candidate = logos[sourceIndex]
        sourceIndex += 1

        if (seen.has(candidate.name)) {
          continue
        }

        chunk.push(candidate)
        seen.add(candidate.name)
      }

      // Fallback only if there are not enough unique logos.
      sourceIndex = 0
      while (chunk.length < size && logos.length > 0) {
        chunk.push(logos[sourceIndex % logos.length])
        sourceIndex += 1
      }
    }

    chunks.push(chunk)
  }
  return chunks
}

function LogoTile({ logo, interactive = true }: { logo: TrustLogo; interactive?: boolean }) {
  const tile = (
    <div className="tile-utility flex min-h-[82px] items-center justify-center px-4 py-3.5">
      <Image
        src={withBasePath(logo.src)}
        alt={`${logo.name} logo`}
        width={120}
        height={42}
        className="h-8 w-[116px] max-w-full object-contain object-center opacity-[0.96]"
      />
    </div>
  )

  if (!interactive || !logo.href) {
    return tile
  }

  return (
    <Link href={logo.href} className="interactive block rounded-[14px]">
      {tile}
    </Link>
  )
}

export function RotatingLogoGrid({ logos, className }: RotatingLogoGridProps) {
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)
  const [activeSetIndex, setActiveSetIndex] = useState(0)
  const [nextSetIndex, setNextSetIndex] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const logoSets = useMemo(() => {
    const perSet = isMobile ? MOBILE_SET_SIZE : DESKTOP_SET_SIZE
    const sets = chunkLogos(logos, perSet).filter((set) => set.length > 0)
    return sets.length > 0 ? sets : []
  }, [isMobile, logos])

  const safeActiveSetIndex = logoSets.length > 0 ? activeSetIndex % logoSets.length : 0
  const safeNextSetIndex = nextSetIndex === null || logoSets.length === 0 ? null : nextSetIndex % logoSets.length

  useEffect(() => {
    if (logoSets.length <= 1 || isPaused || prefersReducedMotion || isTransitioning) {
      return
    }

    const rotateTimer = window.setTimeout(() => {
      const nextIndex = (safeActiveSetIndex + 1) % logoSets.length
      setNextSetIndex(nextIndex)
      setIsTransitioning(true)
    }, HOLD_MS)

    return () => window.clearTimeout(rotateTimer)
  }, [isPaused, isTransitioning, logoSets.length, prefersReducedMotion, safeActiveSetIndex])

  useEffect(() => {
    if (!isTransitioning || safeNextSetIndex === null) {
      return
    }

    const maxItemsInSet = Math.max(
      logoSets[safeActiveSetIndex]?.length ?? 0,
      logoSets[safeNextSetIndex]?.length ?? 0,
      1,
    )
    const settleTimer = window.setTimeout(() => {
      setActiveSetIndex(safeNextSetIndex)
      setNextSetIndex(null)
      setIsTransitioning(false)
    }, TRANSITION_MS + STAGGER_MS * (maxItemsInSet - 1))

    return () => window.clearTimeout(settleTimer)
  }, [isTransitioning, logoSets, safeActiveSetIndex, safeNextSetIndex])

  const activeLogos = logoSets[safeActiveSetIndex] ?? []
  const incomingLogos = safeNextSetIndex === null ? [] : logoSets[safeNextSetIndex] ?? []

  return (
    <div
      className={cn("mt-7", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false)
        }
      }}
    >
      <div className="relative min-h-[172px]">
        <div
          className={cn(
            "grid grid-cols-2 gap-3 md:grid-cols-4",
            isTransitioning && !prefersReducedMotion && "absolute inset-0 pointer-events-none",
          )}
        >
          {activeLogos.map((logo, index) => (
            <div
              key={`active-${logo.name}`}
              style={
                isTransitioning && !prefersReducedMotion
                  ? {
                      transitionProperty: "opacity, transform",
                      transitionDuration: `${TRANSITION_MS}ms`,
                      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                      transitionDelay: `${index * STAGGER_MS}ms`,
                      opacity: 0,
                      transform: "translateY(6px)",
                    }
                  : undefined
              }
            >
              <LogoTile logo={logo} />
            </div>
          ))}
        </div>

        {isTransitioning && !prefersReducedMotion && incomingLogos.length > 0 ? (
          <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 gap-3 md:grid-cols-4">
            {incomingLogos.map((logo, index) => (
              <div
                key={`incoming-${logo.name}`}
                className="pointer-events-none"
                style={{
                  opacity: 0,
                  transform: "translateY(6px)",
                  animationName: "trust-logo-in",
                  animationDuration: `${TRANSITION_MS}ms`,
                  animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  animationFillMode: "forwards",
                  animationDelay: `${index * STAGGER_MS}ms`,
                }}
              >
                <LogoTile logo={logo} interactive={false} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
