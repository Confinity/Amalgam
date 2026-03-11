"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import {
  additionalClientNames,
  clientLogosById,
  rotatingClientLogoSets,
  type ClientLogo,
  type RotatingClientLogoMode,
} from "@/lib/client-logos"
import { withBasePath } from "@/lib/site-config"

type ClientLogoWallProps = {
  eyebrow?: string
  title: string
  description: string
  className?: string
  showCaseStudiesCta?: boolean
}

const MOBILE_QUERY = "(max-width: 767px)"
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"
const DESKTOP_HOLD_MS = 5500
const MOBILE_HOLD_MS = 6000
const TRANSITION_MS = 1000
const CARD_STAGGER_MS = 140

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

function LogoCard({
  logo,
  interactive = true,
}: {
  logo: ClientLogo
  interactive?: boolean
}) {
  const cardClassName = `client-logo-card ${
    interactive && logo.href ? "client-logo-card--interactive" : ""
  } group relative ${logo.cardClassName ?? ""}`
  const frame = (
    <div
      className={`client-logo-frame relative mx-auto h-11 w-full ${
        logo.imageClassName ?? ""
      }`}
    >
      <Image
        src={withBasePath(logo.src)}
        alt={logo.alt}
        fill
        sizes="(min-width: 1024px) 260px, (min-width: 768px) 220px, 46vw"
        className="client-logo object-contain object-center"
      />
    </div>
  )

  if (!interactive || !logo.href) {
    return <div className={cardClassName}>{frame}</div>
  }

  if (logo.href.startsWith("http")) {
    return (
      <a
        href={logo.href}
        aria-label={`Visit ${logo.name}`}
        target="_blank"
        rel="noreferrer"
        className={cardClassName}
      >
        {frame}
      </a>
    )
  }

  return (
    <Link
      href={logo.href}
      aria-label={`Read the ${logo.name} case study`}
      className={cardClassName}
    >
      {frame}
    </Link>
  )
}

export function ClientLogoWall({
  eyebrow,
  title,
  description,
  className = "",
  showCaseStudiesCta = false,
}: ClientLogoWallProps) {
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)

  const mode: RotatingClientLogoMode = isMobile ? "mobile" : "desktop-tablet"
  const states = rotatingClientLogoSets[mode]
  const holdMs = isMobile ? MOBILE_HOLD_MS : DESKTOP_HOLD_MS
  const staggeredDuration = TRANSITION_MS + CARD_STAGGER_MS * 3

  const [activeStateIndex, setActiveStateIndex] = useState(0)
  const [nextStateIndex, setNextStateIndex] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isHoverPaused, setIsHoverPaused] = useState(false)
  const [isFocusPaused, setIsFocusPaused] = useState(false)

  const isPaused = isHoverPaused || isFocusPaused
  const safeActiveStateIndex = states.length > 0 ? activeStateIndex % states.length : 0
  const safeNextStateIndex =
    nextStateIndex === null || states.length === 0
      ? null
      : nextStateIndex % states.length

  useEffect(() => {
    if (states.length <= 1 || prefersReducedMotion || isPaused || isTransitioning) {
      return
    }

    const rotateTimer = window.setTimeout(() => {
      const nextIndex = (safeActiveStateIndex + 1) % states.length
      setNextStateIndex(nextIndex)
      setIsTransitioning(true)
    }, holdMs)

    return () => window.clearTimeout(rotateTimer)
  }, [
    holdMs,
    isPaused,
    isTransitioning,
    prefersReducedMotion,
    safeActiveStateIndex,
    states.length,
  ])

  useEffect(() => {
    if (!isTransitioning || nextStateIndex === null) {
      return
    }

    const settleTimer = window.setTimeout(() => {
      setActiveStateIndex(nextStateIndex)
      setNextStateIndex(null)
      setIsTransitioning(false)
    }, staggeredDuration)

    return () => window.clearTimeout(settleTimer)
  }, [isTransitioning, nextStateIndex, staggeredDuration])

  const activeLogos = useMemo(
    () =>
      (states[safeActiveStateIndex] ?? [])
        .map((id) => clientLogosById[id])
        .filter((logo): logo is ClientLogo => Boolean(logo)),
    [safeActiveStateIndex, states],
  )

  const nextLogos = useMemo(
    () =>
      safeNextStateIndex === null
        ? []
        : (states[safeNextStateIndex] ?? [])
            .map((id) => clientLogosById[id])
            .filter((logo): logo is ClientLogo => Boolean(logo)),
    [safeNextStateIndex, states],
  )

  return (
    <section className={`client-experience ${className}`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mx-auto max-w-[720px] text-center">
          {eyebrow ? (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-teal">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold text-foreground text-balance">{title}</h2>
          <p className="mx-auto mt-3 max-w-[42ch] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div
          className="client-logo-rotator mt-[30px]"
          data-mobile={isMobile ? "true" : "false"}
          data-transitioning={isTransitioning ? "true" : "false"}
          data-reduced-motion={prefersReducedMotion ? "true" : "false"}
          onMouseEnter={() => setIsHoverPaused(true)}
          onMouseLeave={() => setIsHoverPaused(false)}
          onFocusCapture={() => setIsFocusPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsFocusPaused(false)
            }
          }}
        >
          <div
            className={`client-logo-rotator__viewport ${
              isTransitioning && !prefersReducedMotion ? "is-breathing" : ""
            } ${isMobile ? "is-mobile" : "is-desktop-tablet"}`}
          >
            <div className={`client-logo-rotator__layer ${isMobile ? "is-mobile" : ""}`}>
              {activeLogos.map((logo, index) => (
                <div
                  key={`active-${logo.id}`}
                  className={`client-logo-rotator__item ${
                    isTransitioning && !prefersReducedMotion ? "is-outgoing" : "is-static"
                  }`}
                  style={{ ["--logo-delay" as string]: `${index * CARD_STAGGER_MS}ms` }}
                >
                  <LogoCard logo={logo} />
                </div>
              ))}
            </div>

            {isTransitioning && !prefersReducedMotion ? (
              <div className={`client-logo-rotator__layer client-logo-rotator__layer--incoming ${isMobile ? "is-mobile" : ""}`} aria-hidden="true">
                {nextLogos.map((logo, index) => (
                  <div
                    key={`next-${logo.id}`}
                    className={`client-logo-rotator__item is-incoming ${
                      isMobile ? "is-mobile" : ""
                    }`}
                    style={{ ["--logo-delay" as string]: `${index * CARD_STAGGER_MS}ms` }}
                  >
                    <LogoCard logo={logo} interactive={false} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <p className="client-experience__additional">
          <span className="text-muted-foreground/70">Additional experience includes </span>
          <span className="text-muted-foreground">
            {additionalClientNames.join(", ")}.
          </span>
        </p>

        {showCaseStudiesCta ? (
          <div className="mt-5 text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
            >
              See case studies
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
