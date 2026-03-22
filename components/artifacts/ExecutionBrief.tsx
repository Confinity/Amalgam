import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/Card"

const STEPS = [
  {
    label: "What we review first",
    body: "We review product, delivery, systems, and constraints to find the real blocker.",
  },
  {
    label: "What we lock in together",
    body: "We set priorities and tradeoffs before execution starts.",
  },
  {
    label: "What you approve to start",
    body: "You get a clear brief with findings, recommendations, and a 30-60 day plan.",
  },
] as const

export function ExecutionBrief() {
  return (
    <Card
      variant="primary"
      className="border-[color-mix(in_srgb,var(--color-border)_78%,var(--color-primary)_22%)] bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(246,248,251,0.92))] p-6 shadow-[0_14px_32px_rgba(15,23,42,0.1)]"
    >
      <div className="motion-safe:[animation:section-reveal_190ms_cubic-bezier(0.22,1,0.36,1)_both]">
        <span className="inline-flex w-fit rounded-full border border-[color-mix(in_srgb,var(--color-accent-strong)_32%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-soft)_66%,white_34%)] px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em] text-[var(--color-accent-strong)]">
          Sample recommendation
        </span>

        <h3 className="mt-3 text-[1.24rem] font-semibold leading-[1.24] text-[var(--color-text)]">
          A sample next-move brief
        </h3>

        <p className="mt-2 max-w-[40ch] text-sm text-[color-mix(in_srgb,var(--color-text-subtle)_92%,var(--color-text)_8%)]">
          We review the full picture, align on the first decision, and map a plan your team can run right away.
        </p>

        <div className="brand-key-row mt-3 rounded-xl border border-tier-emphasis bg-[color-mix(in_srgb,var(--color-accent-soft)_54%,white_46%)] px-3 py-2.5">
          <span aria-hidden="true" className="brand-key-dot" />
          <p className="text-sm text-[color-mix(in_srgb,var(--color-text-subtle)_62%,var(--color-text)_38%)]">
            <span className="font-semibold text-[var(--color-text)]">Result:</span> one recommendation and a 30-60 day execution plan.
          </p>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-[16px] border border-[color-mix(in_srgb,var(--color-border)_74%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_98%,white_2%)]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-7 left-[26px] top-7 w-px bg-[color-mix(in_srgb,var(--color-border)_30%,transparent)]"
          />

          <ol className="divide-y divide-[color-mix(in_srgb,var(--color-border)_46%,transparent)]">
            {STEPS.map((step, index) => (
              <li
                key={step.label}
                style={{ animationDelay: `${40 + index * 50}ms` }}
                className={cn(
                  "px-4 py-3.5 motion-safe:[animation:section-reveal_180ms_cubic-bezier(0.22,1,0.36,1)_both]",
                  index === 0
                    ? "bg-[color-mix(in_srgb,var(--color-accent-soft)_12%,white_88%)]"
                    : "bg-[color-mix(in_srgb,var(--color-surface)_97%,white_3%)]",
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "relative z-[1] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                      index === 0
                        ? "bg-[color-mix(in_srgb,var(--color-accent-strong)_20%,white_80%)] text-[var(--color-accent-strong)]"
                        : "bg-[color-mix(in_srgb,var(--color-border)_64%,white_36%)] text-[color-mix(in_srgb,var(--color-text-subtle)_82%,var(--color-text)_18%)]",
                    )}
                  >
                    {index + 1}
                  </span>

                  <div className="min-h-[88px]">
                    <p className="text-[12px] font-semibold tracking-[0.02em] text-[color-mix(in_srgb,var(--color-text-subtle)_42%,var(--color-text)_58%)]">
                      {step.label}
                    </p>
                    <p className="mt-1.5 max-w-[40ch] text-[0.85rem] leading-[1.36] text-[color-mix(in_srgb,var(--color-text)_88%,var(--color-text-subtle)_12%)]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-3 text-xs text-[color-mix(in_srgb,var(--color-text-subtle)_90%,var(--color-text)_10%)]">
          We start with the brief, then execute only after your approval.
        </p>
      </div>
    </Card>
  )
}
