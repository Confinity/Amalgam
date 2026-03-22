import { Card } from "@/components/ui/Card"

const columns = [
  { label: "30 days", items: ["Stabilize top bottleneck", "Define owner map"] },
  { label: "60 days", items: ["Reduce integration drag", "Tighten reporting trust"] },
  { label: "90 days", items: ["Scale reliable cadence", "Prepare next growth layer"] },
]

export function RoadmapSlice() {
  return (
    <Card variant="primary" className="p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">Roadmap slice</p>
      <h3 className="mt-3 text-xl font-semibold">30 / 60 / 90 execution path</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {columns.map((column) => (
          <div key={column.label} className="tile-utility p-3">
            <p className="text-sm font-semibold text-[var(--color-text)]">{column.label}</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-[var(--color-text-muted)]">
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  )
}
