import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { cn } from "@/lib/utils"

type CardProps<T extends ElementType = "article"> = {
  as?: T
  variant?: "primary" | "secondary" | "utility"
  interactive?: boolean
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">

const variantClass = {
  primary: "card-primary card-density-heavy",
  secondary: "card-secondary card-density-standard",
  utility: "tile-utility card-density-light",
}

export function Card<T extends ElementType = "article">({
  as,
  variant = "secondary",
  interactive = false,
  className,
  children,
  ...props
}: CardProps<T>) {
  const Component = (as ?? "article") as ElementType

  return (
    <Component
      className={cn(variantClass[variant], interactive && "interactive", className)}
      {...props}
    >
      {children}
    </Component>
  )
}
