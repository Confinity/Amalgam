import { cn } from "@/lib/utils"

type OutcomeStatProps = {
  label: string
  value: string
  detail: string
  className?: string
}

export function OutcomeStat({ label, value, detail, className }: OutcomeStatProps) {
  return (
    <article className={cn("card-secondary", className)}>
      <p className="text-xs tracking-[0.14em] uppercase text-[var(--color-text-subtle)]">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-[var(--color-text)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{detail}</p>
    </article>
  )
}
