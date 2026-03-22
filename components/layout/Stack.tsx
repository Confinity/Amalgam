import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

type StackProps = ComponentPropsWithoutRef<"div"> & {
  gap?: "xs" | "sm" | "md" | "lg" | "xl"
  children: ReactNode
}

const gapClass = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
}

export function Stack({ gap = "md", className, children, ...props }: StackProps) {
  return (
    <div className={cn("flex flex-col", gapClass[gap], className)} {...props}>
      {children}
    </div>
  )
}
