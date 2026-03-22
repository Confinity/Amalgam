import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

type ClusterProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode
}

export function Cluster({ className, children, ...props }: ClusterProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)} {...props}>
      {children}
    </div>
  )
}
