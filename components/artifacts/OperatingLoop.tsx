import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/Card"

const loop = ["Observe", "Diagnose", "Decide", "Ship"]

export function OperatingLoop() {
  return (
    <Card variant="primary" className="p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">Operating loop</p>
      <h3 className="mt-3 text-xl font-semibold">Cadence that keeps momentum</h3>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {loop.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <div className="tile-utility min-h-11 px-4 py-2 text-sm font-medium text-[var(--color-text)]">{step}</div>
            {index < loop.length - 1 ? (
              <ArrowRight className="h-4 w-4 text-[var(--color-text-subtle)]" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-[var(--color-text-muted)]">Weekly checkpoints with explicit decision ownership.</p>
    </Card>
  )
}
