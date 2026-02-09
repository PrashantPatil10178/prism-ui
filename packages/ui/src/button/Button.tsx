import {
  type ButtonHTMLAttributes,
  type ElementType,
  forwardRef,
  type ReactNode,
} from "react";
import { useButton } from "./useButton";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"
  | "success";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "className">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as,
      children,
      className,
      disabled,
      loading,
      type,
      onClick,
      variant = "primary",
      size = "md",
      style,
      ...props
    },
    ref,
  ) => {
    const Component = (as ?? "button") as ElementType;
    const behavior = useButton<HTMLButtonElement>({
      disabled,
      loading,
      onClick,
    });

    const baseStyles: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontFamily: "inherit",
      fontWeight: 500,
      borderRadius: "0.5rem",
      border: "1px solid transparent",
      cursor: "pointer",
      transition: "all 0.15s ease",
      whiteSpace: "nowrap",
      lineHeight: 1,
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={className}
        type={type ?? "button"}
        data-component="button"
        data-variant={variant}
        data-size={size}
        style={baseStyles}
        {...behavior}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = "Button";
