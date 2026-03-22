import Image from "next/image"
import { researchSourcesTracked } from "@/content/knowledge"
import { cn } from "@/lib/utils"
import {
  sourceBrandColor,
  sourceLogoAssetByName,
  sourceLogoTreatmentByName,
  sourceIconPathByName,
  sourceMonogram,
  withAlpha,
  type ResearchSourceName,
} from "@/lib/research-sources"

type ResearchSourcesMarqueeProps = {
  sources?: readonly ResearchSourceName[]
  compact?: boolean
  animate?: boolean
  edgeFade?: boolean
  className?: string
  trackClassName?: string
}

export function ResearchSourcesMarquee({
  sources = researchSourcesTracked,
  compact = false,
  animate = true,
  edgeFade = true,
  className,
  trackClassName,
}: ResearchSourcesMarqueeProps) {
  const sourceSets = animate ? ([sources, sources] as const) : ([sources] as const)

  return (
    <div
      className={cn(
        animate ? "overflow-hidden" : "overflow-visible",
        "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]",
        edgeFade ? "research-logo-marquee-wrap" : "research-logo-marquee-no-mask",
        className,
      )}
    >
      <div
        className={cn(
          "research-logo-marquee-host",
          "flex items-center gap-2 px-2 py-2.5",
          animate ? "min-w-max" : "w-full flex-wrap",
          animate ? "research-logo-marquee" : "",
          compact ? "py-2" : "py-2.5",
          trackClassName,
        )}
      >
        {sourceSets.map((set, setIndex) => (
          <div key={`set-${setIndex}`} className="contents">
            {animate ? <div aria-hidden="true" className="w-12 shrink-0" /> : null}
            {set.map((source) => {
              const brandColor = sourceBrandColor(source)
              const logoAsset = sourceLogoAssetByName[source]
              const showWordmarkOnly =
                Boolean(logoAsset) &&
                (sourceLogoTreatmentByName[source] ?? "wordmark") === "wordmark"
              return (
                <div
                  key={`${setIndex}-${source}`}
                  aria-hidden={animate ? setIndex === 1 : undefined}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 text-xs font-medium text-[var(--color-text)]",
                    compact ? "min-h-9" : "min-h-10",
                  )}
                >
                  {logoAsset && showWordmarkOnly ? (
                    <Image
                      src={logoAsset}
                      alt=""
                      width={120}
                      height={24}
                      className={cn(
                        "w-auto shrink-0 object-contain opacity-90",
                        compact ? "h-4 max-w-[5.8rem]" : "h-[18px] max-w-[6.4rem]",
                      )}
                    />
                  ) : logoAsset ? (
                    <Image
                      src={logoAsset}
                      alt=""
                      width={24}
                      height={24}
                      className={cn(
                        "shrink-0 object-contain opacity-90",
                        compact ? "h-4 w-4" : "h-5 w-5",
                      )}
                    />
                  ) : sourceIconPathByName[source] ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className={cn("shrink-0 fill-current", compact ? "h-4 w-4" : "h-5 w-5")}
                      style={{ color: withAlpha(brandColor, 0.9) }}
                    >
                      <path d={sourceIconPathByName[source]} />
                    </svg>
                  ) : (
                    <span
                      aria-hidden="true"
                      style={{
                        borderColor: withAlpha(brandColor, 0.35),
                        backgroundColor: withAlpha(brandColor, 0.12),
                        color: withAlpha(brandColor, 0.9),
                      }}
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-semibold tracking-[0.03em]"
                    >
                      {sourceMonogram(source)}
                    </span>
                  )}
                  {!showWordmarkOnly ? (
                    <>
                      <span
                        aria-hidden="true"
                        className={cn("rounded-full", compact ? "h-1.5 w-1.5" : "h-1.5 w-1.5")}
                        style={{ backgroundColor: withAlpha(brandColor, 0.95) }}
                      />
                      <span className="whitespace-nowrap text-[color-mix(in_srgb,var(--color-text-subtle)_40%,var(--color-text)_60%)]">
                        {source}
                      </span>
                    </>
                  ) : null}
                </div>
              )
            })}
          </div>
        ))}
        {animate ? <div aria-hidden="true" className="w-12 shrink-0" /> : null}
      </div>
    </div>
  )
}
