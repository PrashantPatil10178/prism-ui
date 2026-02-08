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

    return (
      <Component
        ref={ref}
        className={className}
        type={type ?? "button"}
        data-component="button"
        data-variant={variant}
        data-size={size}
        {...behavior}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = "Button";
