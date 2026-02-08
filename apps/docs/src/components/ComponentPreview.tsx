import { type ReactNode, useState } from "react";
import CodeBlock from "./CodeBlock";

interface Tab {
  label: string;
  language?: string;
  code: string;
}

interface ComponentPreviewProps {
  children: ReactNode;
  tabs: Tab[];
}

export default function ComponentPreview({
  children,
  tabs,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="component-preview">
      <div className="preview-pane">{children}</div>
      <div className="preview-code">
        {tabs.length > 1 && (
          <div className="preview-tabs">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                className={`preview-tab${i === activeTab ? " preview-tab-active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
        <CodeBlock
          code={tabs[activeTab].code}
          language={tabs[activeTab].language ?? "tsx"}
        />
      </div>
    </div>
  );
}
