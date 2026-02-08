import { type ReactNode, useState, createContext, useContext } from "react";

const TabContext = createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
} | null>(null);

interface TabbedContentProps {
  defaultTab?: string;
  children: ReactNode;
}

export function TabbedContent({
  defaultTab = "react",
  children,
}: TabbedContentProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabbed-content">{children}</div>
    </TabContext.Provider>
  );
}

interface TabSwitcherProps {
  tabs: Array<{ id: string; label: string }>;
}

export function TabSwitcher({ tabs }: TabSwitcherProps) {
  const context = useContext(TabContext);
  if (!context)
    throw new Error("TabSwitcher must be used within TabbedContent");

  return (
    <div className="tab-switcher">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-switcher-btn${context.activeTab === tab.id ? " active" : ""}`}
          onClick={() => context.setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

interface TabPanelProps {
  value: string;
  children: ReactNode;
}

export function TabPanel({ value, children }: TabPanelProps) {
  const context = useContext(TabContext);
  if (!context) throw new Error("TabPanel must be used within TabbedContent");

  if (context.activeTab !== value) return null;

  return <div className="tab-panel">{children}</div>;
}
