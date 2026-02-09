import {
  createContext,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type ButtonHTMLAttributes,
  useContext,
  useMemo,
  useId,
} from "react";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogId: string;
  titleId: string;
  descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within <Dialog>");
  }
  return context;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const baseId = useId();
  const value = useMemo(
    () => ({
      open,
      setOpen: onOpenChange,
      dialogId: `dialog-${baseId}`,
      titleId: `dialog-${baseId}-title`,
      descriptionId: `dialog-${baseId}-description`,
    }),
    [open, onOpenChange, baseId],
  );
  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { setOpen, open, dialogId } = useDialogContext();

    return (
      <button
        ref={ref}
        className={className}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        data-state={open ? "open" : "closed"}
        onClick={(event) => {
          onClick?.(event);
          setOpen(true);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

DialogTrigger.displayName = "DialogTrigger";

export interface DialogContentProps extends HTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  className?: string;
}

export const DialogContent = forwardRef<HTMLDialogElement, DialogContentProps>(
  ({ children, className, ...props }, ref) => {
    const { open, setOpen, dialogId, titleId, descriptionId } =
      useDialogContext();
    const labelledBy = props["aria-labelledby"] ?? titleId;
    const describedBy = props["aria-describedby"] ?? descriptionId;

    return (
      <dialog
        ref={ref}
        id={dialogId}
        open={open}
        role="dialog"
        aria-modal={open}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        data-component="dialog"
        data-state={open ? "open" : "closed"}
        className={className}
        onClose={() => setOpen(false)}
        {...props}
      >
        {children}
      </dialog>
    );
  },
);

DialogContent.displayName = "DialogContent";

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className, id, style, ...props }, ref) => {
    const { titleId } = useDialogContext();

    const baseStyles: React.CSSProperties = {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
      margin: 0,
      ...style,
    };

    return (
      <h2
        ref={ref}
        id={id ?? titleId}
        className={className}
        data-part="title"
        style={baseStyles}
        {...props}
      >
        {children}
      </h2>
    );
  },
);

DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ children, className, id, style, ...props }, ref) => {
  const { descriptionId } = useDialogContext();

  const baseStyles: React.CSSProperties = {
    fontSize: "0.875rem",
    lineHeight: 1.6,
    margin: "0.5rem 0 0",
    ...style,
  };

  return (
    <p
      ref={ref}
      id={id ?? descriptionId}
      className={className}
      data-part="description"
      style={baseStyles}
      {...props}
    >
      {children}
    </p>
  );
});

DialogDescription.displayName = "DialogDescription";

export interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    return (
      <button
        ref={ref}
        className={className}
        type="button"
        onClick={(event) => {
          onClick?.(event);
          setOpen(false);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

DialogClose.displayName = "DialogClose";
