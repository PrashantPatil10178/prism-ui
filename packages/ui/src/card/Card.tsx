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
      style,
      ...props
    },
    ref,
  ) => {
    const baseStyles: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      borderRadius: "0.75rem",
      overflow: "hidden",
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        data-component="card"
        data-variant={variant}
        data-size={size}
        data-interactive={interactive ? "true" : undefined}
        style={baseStyles}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

/* ─── CardHeader ─── */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      padding: "1.25rem 1.25rem 0",
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.4,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        data-part="card-header"
        style={baseStyles}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

/* ─── CardBody ─── */
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      padding: "1rem 1.25rem",
      lineHeight: 1.6,
      flex: "1 1 auto",
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        data-part="card-content"
        style={baseStyles}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardBody.displayName = "CardBody";

/* ─── CardFooter ─── */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      padding: "0 1.25rem 1.25rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginTop: "0.25rem",
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        data-part="card-footer"
        style={baseStyles}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";
