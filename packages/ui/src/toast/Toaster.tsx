"use client";

import { useToast } from "./ToastContext";
import { ToastData } from "./types";
import { ElementType } from "react";

export interface ToasterProps {
  className?: string; // Container class
  toastComponent?: ElementType<ToastData & { onClose: () => void }>;
}

export function Toaster({
  className,
  toastComponent: CustomToast,
}: ToasterProps) {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className={className}
      data-component="toaster"
      role="region"
      aria-label="Notifications"
      style={{
        position: "fixed",
        zIndex: 9999,
        // The consumer should handle positioning via className or style override if needed,
        // but fixed positioning is expected for a Toaster.
        // I will let className override it if provided, or defaults.
        // Actually, for "headless", I shouldn't force styles, but position:fixed is structural.
        // I'll leave it as minimal structure.
      }}
    >
      {toasts.map((toast) =>
        CustomToast ? (
          <CustomToast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ) : (
          <div
            key={toast.id}
            data-component="toast"
            data-type={toast.type}
            role="alert"
          >
            <div data-part="content">
              {toast.title && <div data-part="title">{toast.title}</div>}
              {toast.description && (
                <div data-part="description">{toast.description}</div>
              )}
            </div>
            {toast.action && (
              <button onClick={toast.action.onClick} data-part="action">
                {toast.action.label}
              </button>
            )}
            <button
              onClick={() => removeToast(toast.id)}
              data-part="close"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        ),
      )}
    </div>
  );
}
