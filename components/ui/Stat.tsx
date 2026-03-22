import { cn } from "@/lib/utils"

type StatProps = {
  label: string
  value: string
  className?: string
}

export function Stat({ label, value, className }: StatProps) {
  return (
    <div className={cn("tile-utility", className)}>
      <p className="text-3xl font-semibold text-[var(--color-text)] md:text-4xl">{value}</p>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{label}</p>
    </div>
  )
}
