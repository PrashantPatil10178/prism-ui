import {
  createContext,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useId,
} from "react";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within <Tabs>");
  }
  return context;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ value, defaultValue, onValueChange, children, ...props }, ref) => {
    const baseId = useId();
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? "",
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolledValue;

    const setValue = useCallback(
      (nextValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
      [onValueChange, isControlled],
    );

    const contextValue = useMemo(
      () => ({ value: currentValue, setValue, baseId }),
      [currentValue, setValue, baseId],
    );

    return (
      <div ref={ref} data-component="tabs" {...props}>
        <TabsContext.Provider value={contextValue}>
          {children}
        </TabsContext.Provider>
      </div>
    );
  },
);

Tabs.displayName = "Tabs";

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  orientation?: "horizontal" | "vertical";
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      aria-orientation={orientation}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  ),
);

TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  children: ReactNode;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, onClick, onKeyDown, ...props }, ref) => {
    const { value: currentValue, setValue, baseId } = useTabsContext();

    const setRefs = (node: HTMLButtonElement | null) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const isSelected = currentValue === value;
    const triggerId = `${baseId}-trigger-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    return (
      <button
        ref={setRefs}
        id={triggerId}
        role="tab"
        type="button"
        aria-selected={isSelected}
        aria-controls={panelId}
        tabIndex={isSelected ? 0 : -1}
        data-state={isSelected ? "active" : "inactive"}
        data-value={value}
        onClick={(event) => {
          onClick?.(event);
          setValue(value);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
            return;
          }

          event.preventDefault();
          const triggers = Array.from(
            event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
              "[role=tab]",
            ) ?? [],
          );
          const index = triggers.indexOf(event.currentTarget);
          if (index === -1 || triggers.length === 0) return;
          const nextIndex =
            event.key === "ArrowRight"
              ? (index + 1) % triggers.length
              : (index - 1 + triggers.length) % triggers.length;
          const nextTrigger = triggers[nextIndex];
          nextTrigger?.focus();
          const nextValue = nextTrigger?.getAttribute("data-value");
          if (nextValue) {
            setValue(nextValue);
          }
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ value, children, ...props }, ref) => {
    const { value: currentValue, baseId } = useTabsContext();
    const isSelected = currentValue === value;
    const triggerId = `${baseId}-trigger-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    return (
      <div
        ref={ref}
        id={panelId}
        role="tabpanel"
        aria-labelledby={triggerId}
        hidden={!isSelected}
        data-state={isSelected ? "active" : "inactive"}
        data-value={value}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabsPanel.displayName = "TabsPanel";
