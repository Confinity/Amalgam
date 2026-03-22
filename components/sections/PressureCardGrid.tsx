import {
  AlertCircle,
  Compass,
  Gauge,
  Network,
  Route,
  ShieldCheck,
  Users2,
  Wrench,
} from "lucide-react"
import { cn } from "@/lib/utils"

type PressureCardItem = {
  title: string
  detail?: string
}

type PressureCardGridProps = {
  title: string
  support?: string
  signals: Array<string | PressureCardItem>
  className?: string
  supportClassName?: string
  gridClassName?: string
  variant?: "capability" | "timing"
  headerAlign?: "left" | "center"
}

const capabilityIcons = [Compass, Wrench, Network, Route] as const
const timingIcons = [Gauge, Users2, ShieldCheck, AlertCircle, Route, Network] as const

function normalizeSignal(signal: string | PressureCardItem): PressureCardItem {
  if (typeof signal === "string") {
    return { title: signal }
  }
  return signal
}

export function PressureCardGrid({
  title,
  support,
  signals,
  className,
  supportClassName,
  gridClassName,
  variant = "timing",
  headerAlign = "left",
}: PressureCardGridProps) {
  const normalizedSignals = signals.map((signal) => normalizeSignal(signal))
  const icons = variant === "capability" ? capabilityIcons : timingIcons

  return (
    <section className={cn("section-compact bg-[var(--color-surface)]", className)}>
      <div className="container-site">
        <h2 className={cn(headerAlign === "center" ? "mx-auto max-w-[28ch] text-center" : "")}>{title}</h2>
        {support ? (
          <p
            className={cn(
              "mt-4 max-w-2xl text-base text-[color-mix(in_srgb,var(--color-text-muted)_80%,var(--color-text)_20%)]",
              headerAlign === "center" ? "mx-auto text-center" : "",
              supportClassName,
            )}
          >
            {support}
          </p>
        ) : null}
        <ul
          className={cn(
            "mt-8 grid gap-4",
            variant === "capability" ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-3",
            gridClassName,
          )}
        >
          {normalizedSignals.map((signal, index) => {
            const Icon = icons[index % icons.length] ?? AlertCircle
            return (
              <li
                key={`${signal.title}-${index}`}
                className="card-density-light rounded-2xl border border-tier-default bg-[linear-gradient(168deg,color-mix(in_srgb,var(--color-surface)_98%,white_2%),color-mix(in_srgb,var(--color-surface-muted)_68%,white_32%))]"
              >
                <div className="flex min-h-[114px] items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-tier-soft bg-[color-mix(in_srgb,var(--color-accent-soft)_76%,white_24%)]">
                    <Icon className="h-4.5 w-4.5 text-[color-mix(in_srgb,var(--color-accent-strong)_78%,var(--color-text-subtle))]" />
                  </span>
                  <div>
                    <p className="text-base font-medium text-[var(--color-text)]">{signal.title}</p>
                    {signal.detail ? (
                      <p className="copy-clamp-3 mt-2.5 text-sm leading-5 text-[var(--color-text-muted)]">{signal.detail}</p>
                    ) : null}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
