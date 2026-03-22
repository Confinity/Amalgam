import Link from "next/link"
import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type ChipProps = {
  selected?: boolean
  href?: string
  className?: string
  children: React.ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">

export function Chip({ selected = false, href, className, children, ...props }: ChipProps) {
  const classes = cn(
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors duration-150",
    selected
      ? "border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
