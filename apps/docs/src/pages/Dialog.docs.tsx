import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Button,
} from "@prism-ui/react";
import DocSection from "../components/DocSection";
import ComponentPreview from "../components/ComponentPreview";
import CodeBlock from "../components/CodeBlock";

const npmCode = `import { useState } from "react";
import {
  Dialog, DialogTrigger, DialogContent,
  DialogTitle, DialogDescription, DialogClose,
} from "prism-ui-headless-react";

export function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="btn">Open Dialog</DialogTrigger>
      <DialogContent className="dialog">
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone.
        </DialogDescription>
        <DialogClose className="btn">Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
}`;

const cdnCode = `<!-- No framework needed! Just HTML + CSS + JS -->
<link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react@latest/dist/prism-ui.css">
<script src="https://unpkg.com/prism-ui-headless-react@latest/dist/prism-ui.js"></script>

<!-- Trigger button: data-dialog-trigger points to dialog id -->
<button data-component="button" data-variant="primary"
  data-dialog-trigger="confirm-dialog">
  Open Dialog
</button>

<!-- Dialog: hidden by default, opened via PrismUI.openDialog() -->
<div id="confirm-dialog" data-component="dialog-content" data-state="closed">
  <div data-part="dialog-header">
    <h2 data-part="dialog-title">Are you absolutely sure?</h2>
    <p data-part="dialog-description">
      This action cannot be undone.
    </p>
  </div>
  <div data-part="dialog-body">
    This will permanently delete your account.
  </div>
  <div data-part="dialog-footer">
    <button data-component="button" data-variant="outline"
      data-dialog-close="confirm-dialog">Cancel</button>
    <button data-component="button" data-variant="destructive"
      data-dialog-close="confirm-dialog">Delete</button>
  </div>
</div>

<!-- That's it! PrismUI.js auto-wires open/close, backdrop,
     focus trap, and Escape key handling. -->`;

const reactCode = npmCode;

const htmlCode = `<!-- Prism UI uses the native <dialog> element -->
<button onclick="document.querySelector('#my-dialog').showModal()">
  Open Dialog
</button>

<dialog id="my-dialog" data-component="dialog" data-state="closed">
  <h2>Are you sure?</h2>
  <p>This action cannot be undone.</p>
  <button onclick="document.querySelector('#my-dialog').close()">
    Close
  </button>
</dialog>

<style>
  dialog {
    border: 1px solid #27272a;
    border-radius: 12px;
    padding: 24px;
    background: #0a0a0c;
    color: #fafafa;
    max-width: 420px;
  }
  dialog::backdrop {
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
  }
</style>`;

function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="demo-button" data-variant="primary">
        Open Dialog
      </DialogTrigger>
      {open && (
        <div className="demo-dialog-backdrop" onClick={() => setOpen(false)} />
      )}
      <DialogContent className="demo-dialog">
        <DialogTitle style={{ fontSize: "1.1rem", fontWeight: 600 }}>
          Are you absolutely sure?
        </DialogTitle>
        <DialogDescription
          style={{ color: "var(--muted-foreground)", margin: "8px 0 16px" }}
        >
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <DialogClose className="demo-button">Cancel</DialogClose>
          <Button
            className="demo-button"
            variant="destructive"
            onClick={() => setOpen(false)}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function DialogDocs() {
  return (
    <DocSection>
      <h1>Dialog</h1>
      <p>
        An accessible modal dialog built on the native{" "}
        <code>&lt;dialog&gt;</code> element. Provides focus trapping,
        Escape-to-close, backdrop click, and proper ARIA roles automatically.
      </p>

      <h2>Preview</h2>
      <ComponentPreview
        tabs={[
          { label: "NPM", code: npmCode },
          { label: "CDN", code: cdnCode, language: "html" },
          { label: "HTML", code: htmlCode, language: "html" },
        ]}
      >
        <DialogDemo />
      </ComponentPreview>

      <h2>Installation</h2>
      <h3>Via NPM</h3>
      <CodeBlock language="bash" code="pnpm add prism-ui-headless-react" />
      <h3>Via CDN (Framework-Agnostic)</h3>
      <CodeBlock
        language="html"
        code={`<!-- Just CSS + JS — works with any framework or plain HTML -->
<link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react@latest/dist/prism-ui.css">
<script src="https://unpkg.com/prism-ui-headless-react@latest/dist/prism-ui.js"></script>`}
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
              <code>Dialog</code>
            </td>
            <td>Root provider — manages open state.</td>
          </tr>
          <tr>
            <td>
              <code>DialogTrigger</code>
            </td>
            <td>Button that opens the dialog.</td>
          </tr>
          <tr>
            <td>
              <code>DialogContent</code>
            </td>
            <td>
              The modal panel (renders a <code>&lt;dialog&gt;</code>).
            </td>
          </tr>
          <tr>
            <td>
              <code>DialogTitle</code>
            </td>
            <td>Heading — connected via aria-labelledby.</td>
          </tr>
          <tr>
            <td>
              <code>DialogDescription</code>
            </td>
            <td>Description — connected via aria-describedby.</td>
          </tr>
          <tr>
            <td>
              <code>DialogClose</code>
            </td>
            <td>Button that closes the dialog.</td>
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
              <code>"open" | "closed"</code>
            </td>
            <td>DialogContent, DialogTrigger</td>
          </tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <ul>
        <li>Focus is trapped inside the dialog when open.</li>
        <li>
          Pressing <strong>Escape</strong> closes the dialog.
        </li>
        <li>Clicking the backdrop closes the dialog.</li>
        <li>Title and description are linked via ARIA attributes.</li>
      </ul>
    </DocSection>
  );
}
