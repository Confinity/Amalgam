import type { ReactNode } from "react"
import { Container } from "@/components/layout/Container"
import { Cluster } from "@/components/layout/Cluster"
import { cn } from "@/lib/utils"

type PageHeroProps = {
  eyebrow?: string
  title: ReactNode
  support: string
  scale?: "large" | "mediumLarge" | "medium"
  tone?: "soft" | "warm" | "plain"
  showGlow?: boolean
  helper?: string
  actions?: ReactNode
  artifact?: ReactNode
  className?: string
  gridClassName?: string
  contentClassName?: string
  supportClassName?: string
  actionsClassName?: string
  helperClassName?: string
  eyebrowClassName?: string
  artifactClassName?: string
  titleClassName?: string
  afterContent?: ReactNode
  afterContentClassName?: string
}

export function PageHero({
  title,
  support,
  scale = "mediumLarge",
  tone = "soft",
  showGlow,
  helper,
  actions,
  artifact,
  className,
  gridClassName,
  contentClassName,
  supportClassName,
  actionsClassName,
  helperClassName,
  artifactClassName,
  titleClassName,
  afterContent,
  afterContentClassName,
}: PageHeroProps) {
  const toneClass =
    tone === "plain" ? "hero-page-plain" : tone === "warm" ? "hero-page-warm" : "hero-page-soft"
  const shouldShowGlow = showGlow ?? tone !== "plain"

  const titleScaleClass =
    scale === "large"
      ? "[&_h1]:text-[clamp(46px,5vw,64px)] [&_h1]:font-semibold [&_h1]:leading-[1.03] [&_h1]:tracking-[-0.024em]"
      : scale === "medium"
        ? "[&_h1]:text-[clamp(34px,3.6vw,46px)] [&_h1]:font-semibold [&_h1]:leading-[1.08] [&_h1]:tracking-[-0.02em]"
        : "[&_h1]:text-[clamp(40px,4.3vw,56px)] [&_h1]:font-semibold [&_h1]:leading-[1.05] [&_h1]:tracking-[-0.022em]"

  const supportScaleClass =
    scale === "large"
      ? "max-w-[48ch] text-[clamp(18px,1.2vw,20px)] leading-[1.56]"
      : scale === "medium"
        ? "max-w-[46ch] text-[clamp(16px,1.05vw,18px)] leading-[1.58]"
        : "max-w-[48ch] text-[clamp(17px,1.1vw,19px)] leading-[1.58]"

  const rhythmClass =
    scale === "large"
      ? "pt-[136px] pb-[64px] md:pt-[152px] md:pb-[76px] lg:pt-[166px] lg:pb-[90px]"
      : scale === "mediumLarge"
        ? "pt-[140px] pb-[66px] md:pt-[156px] md:pb-[80px] lg:pt-[170px] lg:pb-[94px]"
        : "pt-[138px] pb-[64px] md:pt-[154px] md:pb-[78px] lg:pt-[168px] lg:pb-[92px]"

  return (
    <section
      className={cn(
        "hero-home-surface relative overflow-hidden border-b border-[var(--color-border)]",
        rhythmClass,
        toneClass,
        className,
      )}
    >
      {shouldShowGlow ? (
        <>
          <div className="pointer-events-none absolute -left-24 -top-32 h-[360px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(27,167,161,0.16)_0%,transparent_72%)]" />
          <div className="pointer-events-none absolute right-[-120px] top-2 h-[360px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(100,116,139,0.14)_0%,transparent_74%)]" />
        </>
      ) : null}
      <Container>
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,1fr)] lg:items-start lg:gap-9 xl:gap-11",
            artifact ? "" : "lg:grid-cols-1",
            gridClassName,
          )}
        >
          <div className={cn("max-w-[42rem]", contentClassName)}>
            <div className={cn(titleScaleClass, titleClassName)}>{title}</div>
            <p
              className={cn(
                "mt-5 text-[var(--color-text-muted)]",
                supportScaleClass,
                supportClassName,
              )}
            >
              {support}
            </p>
            {actions ? <Cluster className={cn("mt-6 gap-3", actionsClassName)}>{actions}</Cluster> : null}
            {helper ? (
              <p className={cn("mt-5 text-sm text-[var(--color-text-subtle)]", helperClassName)}>{helper}</p>
            ) : null}
          </div>

          {artifact ? (
            <div className={cn("section-reveal w-full lg:max-w-[460px] lg:justify-self-end", artifactClassName)}>
              {artifact}
            </div>
          ) : null}
        </div>

        {afterContent ? <div className={cn("mt-10", afterContentClassName)}>{afterContent}</div> : null}
      </Container>
    </section>
  )
}
