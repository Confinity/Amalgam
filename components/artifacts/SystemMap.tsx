import { Card } from "@/components/ui/Card"

const supportPaths = [
  {
    title: "Founder Review",
    detail: "We find the blocker and give you a clear next plan.",
  },
  {
    title: "Expert Guidance",
    detail: "We fix one key blocker and get work moving.",
  },
  {
    title: "Outcome Partnership",
    detail: "We stay close while your team builds and ships.",
  },
] as const

export function SystemMap() {
  return (
    <Card
      variant="secondary"
      className="border-[color-mix(in_srgb,var(--color-border)_84%,var(--color-primary)_16%)] bg-[linear-gradient(166deg,color-mix(in_srgb,var(--color-surface)_97%,white_3%),color-mix(in_srgb,var(--color-surface-muted)_58%,white_42%))] p-6"
    >
      <h3 className="text-[1.36rem] font-semibold leading-tight">A simple way we can help</h3>
      <p className="copy-support-strong mt-3 text-[0.95rem] leading-6">
        Start with the support that fits your situation, then go deeper only if you need to.
      </p>
      <ol className="mt-4 space-y-2.5">
        {supportPaths.map((path, index) => (
          <li
            key={path.title}
            className="border-l-2 border-[color-mix(in_srgb,var(--color-accent-strong)_36%,transparent)] pl-3"
          >
            <div>
              <p className="text-[0.97rem] font-semibold leading-6 text-[var(--color-text)]">
                {index + 1}. {path.title}
              </p>
              <p className="copy-support-strong mt-0.5 text-sm leading-5">{path.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  )
}
