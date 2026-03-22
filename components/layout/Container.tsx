import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  as?: "div" | "section" | "header" | "footer"
  children: ReactNode
}

export function Container({ as = "div", className, children, ...props }: ContainerProps) {
  const Component = as
  return (
    <Component className={cn("container-site", className)} {...props}>
      {children}
    </Component>
  )
}
