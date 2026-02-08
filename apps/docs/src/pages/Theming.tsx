import DocSection from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";

const themeContract = `/* Define theme variables per brand */
html[data-theme="brand-a"] {
  --color-bg: #0f172a;
  --color-fg: #f8fafc;
  --color-accent: #38bdf8;
  --color-border: #1e293b;
  --color-muted: #94a3b8;
}

html[data-theme="brand-b"] {
  --color-bg: #fefcfb;
  --color-fg: #1a1a1a;
  --color-accent: #8b5cf6;
  --color-border: #e5e5e5;
  --color-muted: #666666;
}`;

const stateSelectors = `/* Style components based on state attributes */
[data-component="button"][data-loading="true"] {
  opacity: 0.7;
  cursor: wait;
}

[data-component="button"][data-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}

[data-component="input"][data-invalid="true"] input {
  border-color: #ef4444;
}

[data-component="dialog"] [data-state="open"] {
  animation: fadeIn 0.2s ease;
}

[data-component="tabs"] [data-state="active"] {
  background: var(--color-accent);
  color: var(--color-bg);
}`;

const switchTheme = `import { useEffect, useState } from "react";

function ThemeSwitcher() {
  const [theme, setTheme] = useState("brand-a");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <select onChange={(e) => setTheme(e.target.value)} value={theme}>
      <option value="brand-a">Dark</option>
      <option value="brand-b">Light</option>
    </select>
  );
}`;

export default function Theming() {
  return (
    <DocSection>
      <h1>Theming</h1>
      <p>
        Prism UI is completely headless — it ships zero CSS. Your consuming app
        provides all styles. The recommended approach is CSS custom properties
        with <code>data-theme</code> selectors.
      </p>

      <h2>Theme Contract</h2>
      <p>
        Define CSS variables per theme on the root element. Every component can
        reference these variables for consistent branding.
      </p>
      <CodeBlock language="css" code={themeContract} />

      <h2>Switching Themes</h2>
      <p>
        Set <code>data-theme</code> on the <code>&lt;html&gt;</code> element.
        All styles update instantly — no library changes needed.
      </p>
      <CodeBlock code={switchTheme} />

      <h2>State Selectors</h2>
      <p>
        Components expose data attributes for every meaningful state. Use them
        in CSS to style loading, disabled, invalid, open/closed, and
        active/inactive states.
      </p>
      <CodeBlock language="css" code={stateSelectors} />

      <h2>Available State Attributes</h2>
      <table className="api-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Attribute</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Button</td>
            <td>
              <code>data-loading</code>, <code>data-disabled</code>
            </td>
            <td>
              <code>"true"</code>
            </td>
          </tr>
          <tr>
            <td>Button</td>
            <td>
              <code>data-variant</code>, <code>data-size</code>
            </td>
            <td>Variant/size strings</td>
          </tr>
          <tr>
            <td>Input</td>
            <td>
              <code>data-invalid</code>, <code>data-disabled</code>
            </td>
            <td>
              <code>"true"</code>
            </td>
          </tr>
          <tr>
            <td>Dialog</td>
            <td>
              <code>data-state</code>
            </td>
            <td>
              <code>"open" | "closed"</code>
            </td>
          </tr>
          <tr>
            <td>Tabs</td>
            <td>
              <code>data-state</code>
            </td>
            <td>
              <code>"active" | "inactive"</code>
            </td>
          </tr>
        </tbody>
      </table>
    </DocSection>
  );
}
