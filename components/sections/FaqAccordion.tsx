import { cn } from "@/lib/utils"

type FaqItem = {
  question: string
  answer: string
}

type FaqAccordionProps = {
  items: FaqItem[]
  eyebrow?: string
  title?: string
  support?: string
  className?: string
}

export function FaqAccordion({
  items,
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  support,
  className,
}: FaqAccordionProps) {
  return (
    <section className={cn("section-compact", className)}>
      <div className="container-site">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
          {eyebrow}
        </p>
        <h2 className="mt-3">{title}</h2>
        {support ? <p className="mt-4 max-w-3xl text-base text-[var(--color-text-muted)]">{support}</p> : null}
        <div className="mt-8 space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[var(--color-text)]">
                <span>{item.question}</span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-border)] text-sm text-[var(--color-text-subtle)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
