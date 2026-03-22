"use client"

import type { KeyboardEvent } from "react"
import { cn } from "@/lib/utils"

export type TabItem = {
  id: string
  label: string
}

type TabsProps = {
  items: TabItem[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function Tabs({ items, value, onChange, className }: TabsProps) {
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = items.findIndex((item) => item.id === value)
    if (currentIndex < 0) {
      return
    }

    if (event.key === "ArrowRight") {
      event.preventDefault()
      onChange(items[(currentIndex + 1) % items.length]!.id)
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault()
      onChange(items[(currentIndex - 1 + items.length) % items.length]!.id)
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Tabs"
      onKeyDown={onKeyDown}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {items.map((item) => {
        const selected = item.id === value
        return (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={selected}
            aria-controls={`panel-${item.id}`}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              "interactive min-h-11 rounded-full border px-4 text-sm font-medium",
              selected
                ? "border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
