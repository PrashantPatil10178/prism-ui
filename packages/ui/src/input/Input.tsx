import {
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
  useId,
} from "react";

/* ═══════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════ */
export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "outline" | "filled" | "ghost";

/* ═══════════════════════════════════════════════════
   InputRoot — wrapper container
   ═══════════════════════════════════════════════════ */
export interface InputRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  invalid?: boolean;
  /** Size preset applied to nested control */
  size?: InputSize;
  /** Visual variant applied to nested control */
  variant?: InputVariant;
}

export const InputRoot = forwardRef<HTMLDivElement, InputRootProps>(
  ({ children, className, invalid, size, variant, style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem",
      width: "100%",
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        data-component="input"
        data-invalid={invalid ? "true" : undefined}
        data-size={size ?? undefined}
        data-variant={variant ?? undefined}
        style={baseStyles}
        {...props}
      >
        {children}
      </div>
    );
  },
);

InputRoot.displayName = "InputRoot";

/* ═══════════════════════════════════════════════════
   InputLabel
   ═══════════════════════════════════════════════════ */
export interface InputLabelProps extends HTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
  /** Show a required indicator */
  required?: boolean;
}

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ children, className, htmlFor, required, style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1,
      userSelect: "none",
      ...style,
    };

    return (
      <label
        ref={ref}
        className={className}
        htmlFor={htmlFor}
        data-part="label"
        data-required={required ? "true" : undefined}
        style={baseStyles}
        {...props}
      >
        {children}
      </label>
    );
  },
);

InputLabel.displayName = "InputLabel";

/* ═══════════════════════════════════════════════════
   InputControl — the actual <input> element
   ═══════════════════════════════════════════════════ */
export interface InputControlProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "size"
> {
  className?: string;
  invalid?: boolean;
}

export const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  ({ className, invalid, id, ...props }, ref) => (
    <input
      ref={ref}
      id={id}
      className={className}
      data-part="control"
      aria-invalid={invalid || undefined}
      data-invalid={invalid ? "true" : undefined}
      data-disabled={props.disabled ? "true" : undefined}
      {...props}
    />
  ),
);

InputControl.displayName = "InputControl";

/* ═══════════════════════════════════════════════════
   InputTextarea — <textarea> alternative
   ═══════════════════════════════════════════════════ */
export interface InputTextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
> {
  className?: string;
  invalid?: boolean;
}

export const InputTextarea = forwardRef<
  HTMLTextAreaElement,
  InputTextareaProps
>(({ className, invalid, id, ...props }, ref) => (
  <textarea
    ref={ref}
    id={id}
    className={className}
    data-part="control"
    data-control="textarea"
    aria-invalid={invalid || undefined}
    data-invalid={invalid ? "true" : undefined}
    data-disabled={props.disabled ? "true" : undefined}
    {...props}
  />
));

InputTextarea.displayName = "InputTextarea";

/* ═══════════════════════════════════════════════════
   InputHelperText
   ═══════════════════════════════════════════════════ */
export interface InputHelperTextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

export const InputHelperText = forwardRef<
  HTMLParagraphElement,
  InputHelperTextProps
>(({ children, className, style, ...props }, ref) => {
  const baseStyles: React.CSSProperties = {
    fontSize: "0.8125rem",
    lineHeight: 1.4,
    margin: 0,
    ...style,
  };

  return (
    <p
      ref={ref}
      className={className}
      data-part="helper"
      style={baseStyles}
      {...props}
    >
      {children}
    </p>
  );
});

InputHelperText.displayName = "InputHelperText";

/* ═══════════════════════════════════════════════════
   InputError
   ═══════════════════════════════════════════════════ */
export interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

export const InputError = forwardRef<HTMLParagraphElement, InputErrorProps>(
  ({ children, className, style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      fontSize: "0.8125rem",
      lineHeight: 1.4,
      margin: 0,
      ...style,
    };

    return (
      <p
        ref={ref}
        className={className}
        data-part="error"
        aria-live="polite"
        role="alert"
        style={baseStyles}
        {...props}
      >
        {children}
      </p>
    );
  },
);

InputError.displayName = "InputError";

/* ═══════════════════════════════════════════════════
   Input — convenience wrapper (all-in-one)
   ═══════════════════════════════════════════════════ */
export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** Label text (rendered above the input) */
  label?: ReactNode;
  /** Helper text (rendered below the input) */
  helperText?: ReactNode;
  /** Error message (rendered below the input, replaces helper when present) */
  error?: ReactNode;
  className?: string;
  /** Force invalid state (also auto-set when error is provided) */
  invalid?: boolean;
  /** Size preset */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      className,
      invalid,
      id,
      size,
      variant,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy =
      [helperId, errorId].filter(Boolean).join(" ") || undefined;
    const isInvalid = Boolean(invalid || error);
    const isDisabled = Boolean(props.disabled);

    return (
      <InputRoot
        className={className}
        invalid={isInvalid}
        size={size}
        variant={variant}
        data-disabled={isDisabled ? "true" : undefined}
      >
        {label ? (
          <InputLabel htmlFor={inputId} required={required}>
            {label}
          </InputLabel>
        ) : null}
        <InputControl
          ref={ref}
          id={inputId}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          required={required}
          invalid={isInvalid}
          data-disabled={isDisabled ? "true" : undefined}
          {...props}
        />
        {helperText && !error ? (
          <InputHelperText id={helperId}>{helperText}</InputHelperText>
        ) : null}
        {error ? <InputError id={errorId}>{error}</InputError> : null}
      </InputRoot>
    );
  },
);

Input.displayName = "Input";
