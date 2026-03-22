import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

type GridProps = ComponentPropsWithoutRef<"div"> & {
  columns?: 1 | 2 | 3 | 4
  children: ReactNode
}

const columnClass = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
}

export function Grid({ columns = 3, className, children, ...props }: GridProps) {
  return (
    <div className={cn("grid gap-4 md:gap-5 lg:gap-6", columnClass[columns], className)} {...props}>
      {children}
    </div>
  )
}
