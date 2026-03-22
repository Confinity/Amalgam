import Link from "next/link"
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type BaseProps = {
  variant?: "primary" | "secondary" | "tertiary"
  size?: "md" | "lg"
  fullWidth?: boolean
  withArrow?: boolean
  children: ReactNode
  className?: string
}

export type LinkButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string
  }

export type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined
  }

export type ButtonProps = LinkButtonProps | NativeButtonProps

const variantClass = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-pressed)]",
  secondary:
    "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-surface-muted)_52%,white_48%)]",
  tertiary:
    "text-[var(--color-text-muted)] hover:text-[var(--color-accent-strong)]",
}

const sizeClass = {
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    withArrow = false,
    className,
    children,
    ...rest
  } = props

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-150 focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] active:translate-y-px",
    variantClass[variant],
    sizeClass[size],
    fullWidth && "w-full",
    variant === "tertiary" && "min-h-11 rounded-none px-0 py-2",
    className,
  )

  const content = (
    <>
      <span>{children}</span>
      {withArrow ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
    </>
  )

  if ("href" in props && props.href) {
    const { href, ...linkProps } = rest as Omit<
      LinkButtonProps,
      keyof BaseProps | "children"
    >
    // Use a native anchor for in-page hash navigation so same-page section jumps
    // scroll reliably in dev/review contexts.
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes} {...linkProps}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} prefetch={false} className={classes} {...linkProps}>
        {content}
      </Link>
    )
  }

  const nativeProps = rest as Omit<
    NativeButtonProps,
    keyof BaseProps | "children" | "href"
  >
  const { type, ...buttonProps } = nativeProps
  return (
    <button type={type ?? "button"} className={classes} {...buttonProps}>
      {content}
    </button>
  )
}

