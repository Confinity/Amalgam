import { Card } from "@/components/ui/Card"

const entries = [
  {
    date: "Mon",
    decision: "Prioritize integration reliability over feature expansion",
    owner: "Product + Engineering",
  },
  {
    date: "Tue",
    decision: "Consolidate reporting source before KPI review",
    owner: "Data",
  },
  {
    date: "Thu",
    decision: "Run sprint on dependency bottleneck",
    owner: "Delivery",
  },
]

export function DecisionLog() {
  return (
    <Card variant="primary" className="p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">Decision log</p>
      <h3 className="mt-3 text-xl font-semibold">Recent execution decisions</h3>
      <ul className="mt-5 space-y-3">
        {entries.map((entry) => (
          <li key={entry.decision} className="tile-utility p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">{entry.date}</p>
            <p className="mt-1 text-sm text-[var(--color-text)]">{entry.decision}</p>
            <p className="mt-1 text-xs text-[var(--color-text-subtle)]">Owner: {entry.owner}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}
