import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from "prism-ui-headless-react";
import DocSection from "../components/DocSection";
import ComponentPreview from "../components/ComponentPreview";
import CodeBlock from "../components/CodeBlock";

const npmCode = `import { Tabs, TabsList, TabsTrigger, TabsPanel } from "prism-ui-headless-react";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList className="tabs-list">
        <TabsTrigger className="tabs-trigger" value="account">
          Account
        </TabsTrigger>
        <TabsTrigger className="tabs-trigger" value="password">
          Password
        </TabsTrigger>
      </TabsList>
      <TabsPanel value="account">
        <p>Make changes to your account here.</p>
      </TabsPanel>
      <TabsPanel value="password">
        <p>Change your password here.</p>
      </TabsPanel>
    </Tabs>
  );
}`;

const cdnCode = `<!-- No framework needed! Just HTML + CSS + JS -->
<link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react/prism-ui.css">
<script src="https://unpkg.com/prism-ui-headless-react/prism-ui.js"></script>

<!-- Tabs: data-default sets the initially active tab -->
<div data-component="tabs" data-default="account">
  <div data-component="tabs-list">
    <button data-component="tabs-trigger" data-value="account">
      Account
    </button>
    <button data-component="tabs-trigger" data-value="password">
      Password
    </button>
    <button data-component="tabs-trigger" data-value="settings">
      Settings
    </button>
  </div>
  <div data-component="tabs-content" data-value="account">
    <p>Make changes to your account here.</p>
  </div>
  <div data-component="tabs-content" data-value="password">
    <p>Change your password here.</p>
  </div>
  <div data-component="tabs-content" data-value="settings">
    <p>Manage your notification preferences.</p>
  </div>
</div>

<!-- That's it! PrismUI.js auto-wires tab switching,
     keyboard navigation, and ARIA attributes. -->`;

const reactCode = npmCode;

const htmlCode = `<!-- Prism UI renders role="tablist", role="tab", role="tabpanel" -->
<div data-component="tabs">
  <div role="tablist" aria-orientation="horizontal">
    <button
      role="tab"
      aria-selected="true"
      data-state="active"
      data-value="account"
    >
      Account
    </button>
    <button
      role="tab"
      aria-selected="false"
      data-state="inactive"
      data-value="password"
    >
      Password
    </button>
  </div>
  <div role="tabpanel" data-state="active" data-value="account">
    <p>Make changes to your account here.</p>
  </div>
  <div role="tabpanel" data-state="inactive" data-value="password" hidden>
    <p>Change your password here.</p>
  </div>
</div>

<style>
  [role="tablist"] {
    display: flex; gap: 4px; padding: 4px;
    background: #27272a; border-radius: 8px; width: fit-content;
  }
  [role="tab"] {
    padding: 6px 14px; border-radius: 6px;
    border: none; background: transparent;
    color: #a1a1aa; cursor: pointer;
  }
  [role="tab"][data-state="active"] {
    background: #09090b; color: #fafafa;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
  [role="tabpanel"] { padding: 16px 0; color: #a1a1aa; }
</style>`;

export default function TabsDocs() {
  return (
    <DocSection>
      <h1>Tabs</h1>
      <p>
        Keyboard-accessible tabs with automatic ARIA wiring. Arrow keys navigate
        between triggers, and each panel is linked via aria-controls and
        aria-labelledby.
      </p>

      <h2>Preview</h2>
      <ComponentPreview
        tabs={[
          { label: "NPM", code: npmCode },
          { label: "CDN", code: cdnCode, language: "html" },
          { label: "HTML", code: htmlCode, language: "html" },
        ]}
      >
        <div style={{ width: "100%" }}>
          <Tabs defaultValue="account">
            <TabsList className="demo-tabs" orientation="horizontal">
              <TabsTrigger className="demo-tabs-trigger" value="account">
                Account
              </TabsTrigger>
              <TabsTrigger className="demo-tabs-trigger" value="password">
                Password
              </TabsTrigger>
              <TabsTrigger className="demo-tabs-trigger" value="settings">
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsPanel value="account">
              Make changes to your account here. Update your display name and
              email.
            </TabsPanel>
            <TabsPanel value="password">
              Change your password here. Use at least 8 characters.
            </TabsPanel>
            <TabsPanel value="settings">
              Manage your notification preferences and privacy settings.
            </TabsPanel>
          </Tabs>
        </div>
      </ComponentPreview>

      <h2>Installation</h2>
      <h3>Via NPM</h3>
      <CodeBlock language="bash" code="pnpm add prism-ui-headless-react" />
      <h3>Via CDN (Framework-Agnostic)</h3>
      <CodeBlock
        language="html"
        code={`<!-- Just CSS + JS — works with any framework or plain HTML -->
<link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react/prism-ui.css">
<script src="https://unpkg.com/prism-ui-headless-react/prism-ui.js"></script>`}
      />

      <h2>API Reference</h2>
      <table className="api-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>Tabs</code>
            </td>
            <td>Root provider — manages active value state.</td>
          </tr>
          <tr>
            <td>
              <code>TabsList</code>
            </td>
            <td>
              Container for triggers. Renders <code>role="tablist"</code>.
            </td>
          </tr>
          <tr>
            <td>
              <code>TabsTrigger</code>
            </td>
            <td>
              Individual tab button. Renders <code>role="tab"</code>.
            </td>
          </tr>
          <tr>
            <td>
              <code>TabsPanel</code>
            </td>
            <td>
              Content panel. Renders <code>role="tabpanel"</code>.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Keyboard</h2>
      <table className="api-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>ArrowLeft</code> / <code>ArrowRight</code>
            </td>
            <td>Move focus and select adjacent tab.</td>
          </tr>
          <tr>
            <td>
              <code>Home</code>
            </td>
            <td>Focus first tab.</td>
          </tr>
          <tr>
            <td>
              <code>End</code>
            </td>
            <td>Focus last tab.</td>
          </tr>
          <tr>
            <td>
              <code>Tab</code>
            </td>
            <td>Move focus out of the tablist.</td>
          </tr>
        </tbody>
      </table>

      <h2>Data Attributes</h2>
      <table className="api-table">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Values</th>
            <th>On</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>data-state</code>
            </td>
            <td>
              <code>"active" | "inactive"</code>
            </td>
            <td>TabsTrigger, TabsPanel</td>
          </tr>
          <tr>
            <td>
              <code>data-value</code>
            </td>
            <td>The tab's value string</td>
            <td>TabsTrigger, TabsPanel</td>
          </tr>
        </tbody>
      </table>
    </DocSection>
  );
}
