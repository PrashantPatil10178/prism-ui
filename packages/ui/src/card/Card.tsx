import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

/* ─── Types ─── */
export type CardVariant = "default" | "outlined" | "elevated" | "ghost";
export type CardSize = "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /** Visual style variant */
  variant?: CardVariant;
  /** Padding preset */
  size?: CardSize;
  /** Whether the card is interactive (adds hover state) */
  interactive?: boolean;
}

/* ─── Card ─── */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = "default",
      size = "md",
      interactive,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={className}
      data-component="card"
      data-variant={variant}
      data-size={size}
      data-interactive={interactive ? "true" : undefined}
      {...props}
    >
      {children}
    </div>
  ),
);

Card.displayName = "Card";

/* ─── CardHeader ─── */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={className} data-part="header" {...props}>
      {children}
    </div>
  ),
);

CardHeader.displayName = "CardHeader";

/* ─── CardBody ─── */
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={className} data-part="body" {...props}>
      {children}
    </div>
  ),
);

CardBody.displayName = "CardBody";

/* ─── CardFooter ─── */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={className} data-part="footer" {...props}>
      {children}
    </div>
  ),
);

CardFooter.displayName = "CardFooter";
