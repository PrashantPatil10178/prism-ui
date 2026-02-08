import { type MouseEvent, type MouseEventHandler, useCallback } from "react";

export interface UseButtonOptions<T extends HTMLElement> {
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<T>;
}

export function useButton<T extends HTMLElement>({
  disabled,
  loading,
  onClick,
}: UseButtonOptions<T>) {
  const isDisabled = Boolean(disabled || loading);

  const handleClick = useCallback(
    (event: MouseEvent<T>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    },
    [isDisabled, onClick],
  );

  return {
    disabled: isDisabled,
    "aria-busy": loading || undefined,
    "aria-disabled": isDisabled || undefined,
    "data-loading": loading ? "true" : undefined,
    "data-disabled": isDisabled ? "true" : undefined,
    onClick: handleClick,
  };
}
