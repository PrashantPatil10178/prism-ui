import { useState } from "react";
import { ToastProvider, useToast, Toaster } from "prism-ui-headless-react";
import CodeBlock from "@/components/CodeBlock";
import ComponentPreview from "@/components/ComponentPreview";
import {
  TabbedContent,
  TabSwitcher,
  TabPanel,
} from "@/components/TabbedContent";

function ToastDemo() {
  const { addToast } = useToast();

  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <button
        className="demo-btn"
        onClick={() =>
          addToast({
            title: "Success!",
            description: "Your changes have been saved.",
            type: "success",
          })
        }
      >
        Show Success
      </button>
      <button
        className="demo-btn demo-btn-destructive"
        onClick={() =>
          addToast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            type: "error",
          })
        }
      >
        Show Error
      </button>
      <button
        className="demo-btn demo-btn-outline"
        onClick={() =>
          addToast({
            title: "Info",
            description: "This is an informational message.",
            type: "info",
          })
        }
      >
        Show Info
      </button>
      <button
        className="demo-btn demo-btn-outline"
        onClick={() =>
          addToast({
            title: "Warning",
            description: "Please review your settings.",
            type: "warning",
          })
        }
      >
        Show Warning
      </button>
    </div>
  );
}

export default function ToastDocs() {
  const npmCode = `import { ToastProvider, useToast, Toaster } from 'prism-ui-headless-react';

function App() {
  return (
    <ToastProvider>
      <YourApp />
      <Toaster className="toaster-container" />
    </ToastProvider>
  );
}

function YourComponent() {
  const { addToast } = useToast();

  return (
    <button onClick={() => addToast({
      title: 'Success!',
      description: 'Your changes have been saved.',
      type: 'success'
    })}>
      Show Toast
    </button>
  );
}`;

  const cdnCode = `<!-- No framework needed! Just HTML + CSS + JS -->
<link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react/prism-ui.css">
<script src="https://unpkg.com/prism-ui-headless-react/prism-ui.js"></script>

<!-- Trigger toasts with PrismUI.toast() or shortcuts -->
<button data-component="button" data-variant="primary"
  onclick="PrismUI.success('Success!', 'Your changes have been saved.')">
  Show Success
</button>

<button data-component="button" data-variant="destructive"
  onclick="PrismUI.error('Error', 'Something went wrong.')">
  Show Error
</button>

<button data-component="button" data-variant="outline"
  onclick="PrismUI.info('Info', 'This is informational.')">
  Show Info
</button>

<button data-component="button" data-variant="outline"
  onclick="PrismUI.warning('Warning', 'Please review your settings.')">
  Show Warning
</button>

<!-- Advanced: toast with action button -->
<script>
  PrismUI.toast({
    title: 'New update available',
    description: 'Version 2.0 is ready to install.',
    type: 'info',
    duration: 0,          // 0 = stays until dismissed
    action: 'Update Now',
    onAction: () => console.log('Updating...')
  });
</script>`;

  const reactPreviewCode = npmCode;

  const vanillaPreviewCode = `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/prism-ui-headless-react/toast-vanilla.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react/toast-vanilla.css">
</head>
<body>
  <button onclick="showToast()">Show Toast</button>
  
  <script>
    function showToast() {
      PrismToast.success('Success!', 'Your changes have been saved.');
    }
  </script>
</body>
</html>`;

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Toast</h1>
        <p className="page-description">
          A notification system for displaying temporary messages to users.
          Supports multiple types, actions, and auto-dismiss.
        </p>
      </header>

      <TabbedContent defaultTab="react">
        <TabSwitcher
          tabs={[
            { id: "react", label: "React" },
            { id: "vanilla", label: "Vanilla JS" },
          ]}
        />

        {/* REACT TAB */}
        <TabPanel value="react">
          <section className="section">
            <h2>Preview</h2>
            <ToastProvider>
              <ComponentPreview
                tabs={[
                  { label: "NPM", language: "tsx", code: npmCode },
                  { label: "CDN", language: "html", code: cdnCode },
                ]}
              >
                <ToastDemo />
                <Toaster className="toaster-preview" />
              </ComponentPreview>
            </ToastProvider>
          </section>

          <section className="section">
            <h2>Installation</h2>
            <h3>Via NPM</h3>
            <CodeBlock
              language="bash"
              code={`# npm
npm install prism-ui-headless-react

# pnpm
pnpm add prism-ui-headless-react

# yarn
yarn add prism-ui-headless-react`}
            />

            <h3>Via CDN (Framework-Agnostic)</h3>
            <CodeBlock
              language="html"
              code={`<!-- Just CSS + JS — works with any framework or plain HTML -->
<link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react/prism-ui.css">
<script src="https://unpkg.com/prism-ui-headless-react/prism-ui.js"></script>`}
            />
          </section>

          <section className="section">
            <h2>Usage</h2>
            <h3>Setup Provider</h3>
            <p>
              Wrap your app with ToastProvider and include the Toaster
              component:
            </p>
            <CodeBlock
              language="tsx"
              code={`import { ToastProvider, Toaster } from 'prism-ui-headless-react';

function App() {
  return (
    <ToastProvider>
      <YourApp />
      <Toaster className="toaster-container" />
    </ToastProvider>
  );
}`}
            />

            <h3>Trigger Toasts</h3>
            <p>Use the useToast hook to show notifications:</p>
            <CodeBlock
              language="tsx"
              code={`import { useToast } from 'prism-ui-headless-react';

function MyComponent() {
  const { addToast } = useToast();

  return (
    <button onClick={() => addToast({
      title: 'Success!',
      description: 'Operation completed.',
      type: 'success'
    })}>
      Show Toast
    </button>
  );
}`}
            />
          </section>

          <section className="section">
            <h2>Examples</h2>

            <h3>Toast Types</h3>
            <CodeBlock
              language="tsx"
              code={`// Success Toast
addToast({
  title: 'Success!',
  description: 'Your changes have been saved.',
  type: 'success'
});

// Error Toast
addToast({
  title: 'Error',
  description: 'Something went wrong.',
  type: 'error'
});

// Info Toast
addToast({
  title: 'Info',
  description: 'This is informational.',
  type: 'info'
});

// Warning Toast
addToast({
  title: 'Warning',
  description: 'Please review your settings.',
  type: 'warning'
});`}
            />

            <h3>With Actions</h3>
            <CodeBlock
              language="tsx"
              code={`addToast({
  title: 'File deleted',
  description: 'Your file has been moved to trash.',
  type: 'info',
  action: {
    label: 'Undo',
    onClick: () => {
      // Handle undo action
      console.log('Undo clicked');
    }
  }
});`}
            />

            <h3>Custom Duration</h3>
            <CodeBlock
              language="tsx"
              code={`// Custom duration (3 seconds)
addToast({
  title: 'Quick message',
  type: 'info',
  duration: 3000
});

// Persistent toast (manual dismiss only)
addToast({
  title: 'Important notice',
  type: 'warning',
  duration: Infinity
});

// Default duration is 5000ms`}
            />
          </section>

          <section className="section">
            <h2>Styling</h2>
            <p>Style toasts using data attributes:</p>
            <CodeBlock
              language="css"
              code={`/* Style via data attributes */
[data-component="toast"] {
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 8px;
  padding: 16px;
  color: #fafafa;
}

[data-component="toast"][data-type="success"] {
  border-left: 3px solid #22c55e;
}

[data-component="toast"][data-type="error"] {
  border-left: 3px solid #ef4444;
}

[data-part="title"] {
  font-weight: 600;
  font-size: 0.875rem;
}

[data-part="description"] {
  font-size: 0.8125rem;
  color: #a1a1aa;
}

[data-part="close"] {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #71717a;
  cursor: pointer;
}`}
            />
          </section>

          <section className="section">
            <h2>API Reference</h2>

            <h3>ToastProvider</h3>
            <p>Context provider for toast notifications.</p>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>children</code>
                    </td>
                    <td>
                      <code>ReactNode</code>
                    </td>
                    <td>App content</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Toaster</h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>className</code>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>-</td>
                    <td>Container class for positioning</td>
                  </tr>
                  <tr>
                    <td>
                      <code>toastComponent</code>
                    </td>
                    <td>
                      <code>ElementType</code>
                    </td>
                    <td>-</td>
                    <td>Custom toast component</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>useToast Hook</h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>addToast</code>
                    </td>
                    <td>
                      <code>(toast: ToastData) =&gt; string</code>
                    </td>
                    <td>Add a new toast, returns toast ID</td>
                  </tr>
                  <tr>
                    <td>
                      <code>removeToast</code>
                    </td>
                    <td>
                      <code>(id: string) =&gt; void</code>
                    </td>
                    <td>Remove a toast by ID</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>ToastData Options</h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>title</code>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>-</td>
                    <td>Toast title</td>
                  </tr>
                  <tr>
                    <td>
                      <code>description</code>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>-</td>
                    <td>Toast description (optional)</td>
                  </tr>
                  <tr>
                    <td>
                      <code>type</code>
                    </td>
                    <td>
                      <code>'success' | 'error' | 'info' | 'warning'</code>
                    </td>
                    <td>
                      <code>'info'</code>
                    </td>
                    <td>Toast variant</td>
                  </tr>
                  <tr>
                    <td>
                      <code>duration</code>
                    </td>
                    <td>
                      <code>number</code>
                    </td>
                    <td>
                      <code>5000</code>
                    </td>
                    <td>Auto-dismiss duration (ms), use Infinity to disable</td>
                  </tr>
                  <tr>
                    <td>
                      <code>action</code>
                    </td>
                    <td>
                      <code>{`{ label: string, onClick: () => void }`}</code>
                    </td>
                    <td>-</td>
                    <td>Optional action button</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="section">
            <h2>Accessibility</h2>
            <ul>
              <li>
                <strong>ARIA Roles:</strong> Container has{" "}
                <code>role="region"</code> and{" "}
                <code>aria-label="Notifications"</code>
              </li>
              <li>
                <strong>Alert Role:</strong> Each toast has{" "}
                <code>role="alert"</code> for screen reader announcements
              </li>
              <li>
                <strong>Keyboard:</strong> Close button is focusable and
                activatable with keyboard
              </li>
            </ul>
          </section>
        </TabPanel>

        {/* VANILLA JS TAB */}
        <TabPanel value="vanilla">
          <section className="section">
            <h2>Preview</h2>
            <ComponentPreview
              tabs={[
                { label: "HTML", language: "html", code: vanillaPreviewCode },
              ]}
            >
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#a1a1aa",
                }}
              >
                <p>
                  Open the vanilla JS demo file to see the interactive preview.
                </p>
                <p style={{ marginTop: "8px", fontSize: "0.875rem" }}>
                  <code>packages/ui/examples/toast-vanilla-demo.html</code>
                </p>
              </div>
            </ComponentPreview>
          </section>

          <section className="section">
            <h2>Installation</h2>
            <p>
              Simply include the script tag - no build tools or dependencies
              required:
            </p>
            <CodeBlock
              language="html"
              code={`<!-- Include the script -->
<script src="https://unpkg.com/prism-ui-headless-react/toast-vanilla.js"><\/script>

<!-- Include the styles -->
<link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react/toast-vanilla.css"}`}
            />
          </section>

          <section className="section">
            <h2>Usage</h2>
            <p>
              Use the global <code>PrismToast</code> object to show
              notifications:
            </p>
            <CodeBlock
              language="html"
              code={`<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/prism-ui-headless-react/toast-vanilla.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react/toast-vanilla.css">
</head>
<body>
  <button onclick="showToast()">Show Toast</button>
  
  <script>
    function showToast() {
      PrismToast.success('Success!', 'Your changes have been saved.');
    }
  </script>
</body>
</html>`}
            />
          </section>

          <section className="section">
            <h2>Examples</h2>

            <h3>Toast Types</h3>
            <CodeBlock
              language="javascript"
              code={`// Success
PrismToast.success('Success!', 'Your changes have been saved.');

// Error
PrismToast.error('Error', 'Something went wrong.');

// Info
PrismToast.info('Info', 'Here is some information.');

// Warning
PrismToast.warning('Warning', 'Please review your settings.');`}
            />

            <h3>With Actions</h3>
            <CodeBlock
              language="javascript"
              code={`PrismToast.show({
  title: 'File deleted',
  description: 'Your file has been moved to trash.',
  type: 'info',
  action: {
    label: 'Undo',
    onClick: () => {
      console.log('Undo action');
    }
  }
});`}
            />

            <h3>Custom Duration</h3>
            <CodeBlock
              language="javascript"
              code={`// Quick toast (2 seconds)
PrismToast.show({
  title: 'Quick message',
  type: 'info',
  duration: 2000
});

// Persistent toast (won't auto-dismiss)
PrismToast.show({
  title: 'Important',
  type: 'warning',
  duration: Infinity
});`}
            />

            <h3>Manual Dismiss</h3>
            <CodeBlock
              language="javascript"
              code={`// Save the toast ID
const toastId = PrismToast.info('Processing...', 'Please wait.');

// Later, dismiss it manually
PrismToast.dismiss(toastId);`}
            />
          </section>

          <section className="section">
            <h2>Styling</h2>
            <p>
              Style toasts using data attributes (same CSS works for both React
              and Vanilla JS):
            </p>
            <CodeBlock
              language="css"
              code={`/* Style via data attributes */
[data-component="toast"] {
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 8px;
  padding: 16px;
  color: #fafafa;
}

[data-component="toast"][data-type="success"] {
  border-left: 3px solid #22c55e;
}

[data-component="toast"][data-type="error"] {
  border-left: 3px solid #ef4444;
}

[data-part="title"] {
  font-weight: 600;
  font-size: 0.875rem;
}

[data-part="description"] {
  font-size: 0.8125rem;
  color: #a1a1aa;
}`}
            />
          </section>

          <section className="section">
            <h2>API Reference</h2>

            <h3>Methods</h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Parameters</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>PrismToast.success()</code>
                    </td>
                    <td>
                      <code>title, description</code>
                    </td>
                    <td>Show success toast</td>
                  </tr>
                  <tr>
                    <td>
                      <code>PrismToast.error()</code>
                    </td>
                    <td>
                      <code>title, description</code>
                    </td>
                    <td>Show error toast</td>
                  </tr>
                  <tr>
                    <td>
                      <code>PrismToast.info()</code>
                    </td>
                    <td>
                      <code>title, description</code>
                    </td>
                    <td>Show info toast</td>
                  </tr>
                  <tr>
                    <td>
                      <code>PrismToast.warning()</code>
                    </td>
                    <td>
                      <code>title, description</code>
                    </td>
                    <td>Show warning toast</td>
                  </tr>
                  <tr>
                    <td>
                      <code>PrismToast.show()</code>
                    </td>
                    <td>
                      <code>options</code>
                    </td>
                    <td>Show toast with full options</td>
                  </tr>
                  <tr>
                    <td>
                      <code>PrismToast.dismiss()</code>
                    </td>
                    <td>
                      <code>id</code>
                    </td>
                    <td>Dismiss specific toast by ID</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Options Object</h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>title</code>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>-</td>
                    <td>Toast title (required)</td>
                  </tr>
                  <tr>
                    <td>
                      <code>description</code>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>-</td>
                    <td>Toast description (optional)</td>
                  </tr>
                  <tr>
                    <td>
                      <code>type</code>
                    </td>
                    <td>
                      <code>'success' | 'error' | 'info' | 'warning'</code>
                    </td>
                    <td>
                      <code>'info'</code>
                    </td>
                    <td>Toast type</td>
                  </tr>
                  <tr>
                    <td>
                      <code>duration</code>
                    </td>
                    <td>
                      <code>number</code>
                    </td>
                    <td>
                      <code>5000</code>
                    </td>
                    <td>
                      Auto-dismiss duration in ms, use Infinity to disable
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>action</code>
                    </td>
                    <td>
                      <code>{`{ label, onClick, closeOnClick? }`}</code>
                    </td>
                    <td>-</td>
                    <td>Optional action button</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="section">
            <h2>Use Cases</h2>
            <p>Perfect for projects without React:</p>
            <ul>
              <li>Static websites</li>
              <li>WordPress sites</li>
              <li>PHP applications</li>
              <li>Landing pages</li>
              <li>Admin panels</li>
              <li>Any project without a build system</li>
            </ul>
          </section>
        </TabPanel>
      </TabbedContent>

      <section className="section">
        <h2>Data Attributes</h2>
        <p>
          These data attributes work for both React and Vanilla JS versions:
        </p>
        <div className="api-table-wrapper">
          <table className="api-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Element</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>data-component="toaster"</code>
                </td>
                <td>Container</td>
                <td>Toast container</td>
              </tr>
              <tr>
                <td>
                  <code>data-component="toast"</code>
                </td>
                <td>Toast</td>
                <td>Individual toast</td>
              </tr>
              <tr>
                <td>
                  <code>data-type</code>
                </td>
                <td>Toast</td>
                <td>Toast type: success, error, info, warning</td>
              </tr>
              <tr>
                <td>
                  <code>data-part="title"</code>
                </td>
                <td>Title</td>
                <td>Toast title element</td>
              </tr>
              <tr>
                <td>
                  <code>data-part="description"</code>
                </td>
                <td>Description</td>
                <td>Toast description element</td>
              </tr>
              <tr>
                <td>
                  <code>data-part="action"</code>
                </td>
                <td>Button</td>
                <td>Action button</td>
              </tr>
              <tr>
                <td>
                  <code>data-part="close"</code>
                </td>
                <td>Button</td>
                <td>Close button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
