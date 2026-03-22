import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: "default" | "compact" | "tight"
  children: ReactNode
}

export function Section({ spacing = "default", className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        spacing === "tight"
          ? "section-tight"
          : spacing === "compact"
            ? "section-compact"
            : "section-space",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}
