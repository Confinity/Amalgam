import { Card } from "@/components/ui/Card"

const risks = [
  { level: "High", item: "Cross-team dependency bottleneck" },
  { level: "Medium", item: "Reporting confidence drift" },
  { level: "Low", item: "Feature sequencing uncertainty" },
]

export function RiskMap() {
  return (
    <Card variant="primary" className="p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">Risk map</p>
      <h3 className="mt-3 text-xl font-semibold">Execution risk by impact</h3>
      <div className="mt-5 space-y-3">
        {risks.map((risk) => (
          <div key={risk.item} className="tile-utility flex items-center justify-between p-3">
            <p className="text-sm text-[var(--color-text)]">{risk.item}</p>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                risk.level === "High"
                  ? "bg-[color-mix(in_srgb,var(--color-danger)_16%,white)] text-[var(--color-danger)]"
                  : risk.level === "Medium"
                    ? "bg-[color-mix(in_srgb,var(--color-warning)_16%,white)] text-[var(--color-warning)]"
                    : "bg-[color-mix(in_srgb,var(--color-success)_16%,white)] text-[var(--color-success)]"
              }`}
            >
              {risk.level}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
