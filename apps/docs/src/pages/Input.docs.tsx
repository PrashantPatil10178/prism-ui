import { Input } from "prism-ui-headless-react";
import DocSection from "../components/DocSection";
import ComponentPreview from "../components/ComponentPreview";
import CodeBlock from "../components/CodeBlock";

const npmCode = `import { Input } from "prism-ui-headless-react";

export function InputDemo() {
  return (
    <Input
      className="field"
      label="Email"
      helperText="We'll never share your email."
      placeholder="you@example.com"
      type="email"
    />
  );
}`;

const cdnCode = `<!-- No framework needed! Just HTML + CSS -->
<link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react/prism-ui.css">

<div data-component="input-wrapper">
  <label data-component="input-label" for="email">Email</label>
  <input
    data-component="input"
    id="email"
    type="email"
    placeholder="you@example.com"
    aria-describedby="email-hint"
  />
  <p data-component="input-hint" id="email-hint">
    We'll never share your email.
  </p>
</div>

<!-- Error state example -->
<div data-component="input-wrapper">
  <label data-component="input-label" data-required="true" for="password">
    Password
  </label>
  <input
    data-component="input"
    data-error="true"
    id="password"
    type="password"
    placeholder="Enter your password"
    aria-invalid="true"
    aria-describedby="password-error"
  />
  <p data-component="input-error" id="password-error">
    Password must be at least 8 characters
  </p>
</div>`;

const reactCode = npmCode;

const htmlCode = `<!-- Prism UI renders a labeled input with ARIA wiring -->
<div data-component="input" class="field">
  <label for="email" data-part="label">Email</label>
  <input
    id="email"
    type="email"
    placeholder="you@example.com"
    aria-describedby="email-helper"
    data-part="control"
  />
  <p id="email-helper" data-part="helper">
    We'll never share your email.
  </p>
</div>

<style>
  .field { display: grid; gap: 6px; }
  .field input {
    padding: 10px 14px;
    border: 1px solid #27272a;
    border-radius: 8px;
    background: #09090b;
    color: #fafafa;
    outline: none;
  }
  .field input:focus {
    border-color: #d4d4d8;
    box-shadow: 0 0 0 2px rgba(212,212,216,0.1);
  }
  .field [data-part="label"] { font-weight: 500; }
  .field [data-part="helper"] { font-size: 0.85rem; color: #a1a1aa; }
  .field [data-part="error"] { font-size: 0.85rem; color: #ef4444; }
</style>`;

const errorCode = `<Input
  label="Password"
  error="Password must be at least 8 characters"
  invalid
  type="password"
  placeholder="Enter your password"
/>`;

export default function InputDocs() {
  return (
    <DocSection>
      <h1>Input</h1>
      <p>
        A form field with label, helper text, and error handling. Compound
        subcomponents allow full layout control while maintaining semantics and
        ARIA wiring.
      </p>

      <h2>Preview</h2>
      <ComponentPreview
        tabs={[
          { label: "NPM", code: npmCode },
          { label: "CDN", code: cdnCode, language: "html" },
          { label: "HTML", code: htmlCode, language: "html" },
        ]}
      >
        <div style={{ width: "100%", maxWidth: 380 }}>
          <Input
            className="demo-input"
            label="Email"
            helperText="We'll never share your email."
            placeholder="you@example.com"
            type="email"
          />
        </div>
      </ComponentPreview>

      <h2>Error State</h2>
      <ComponentPreview tabs={[{ label: "React", code: errorCode }]}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <Input
            className="demo-input"
            label="Password"
            error="Password must be at least 8 characters"
            invalid
            type="password"
            placeholder="Enter your password"
          />
        </div>
      </ComponentPreview>

      <h2>Installation</h2>
      <h3>Via NPM</h3>
      <CodeBlock language="bash" code="pnpm add prism-ui-headless-react" />
      <h3>Via CDN (Framework-Agnostic)</h3>
      <CodeBlock
        language="html"
        code={`<!-- Just CSS — works with any framework or plain HTML -->
<link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react/prism-ui.css">`}
      />

      <h2>API Reference</h2>
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
              <code>label</code>
            </td>
            <td>
              <code>ReactNode</code>
            </td>
            <td>Label text — rendered with htmlFor linking.</td>
          </tr>
          <tr>
            <td>
              <code>helperText</code>
            </td>
            <td>
              <code>ReactNode</code>
            </td>
            <td>Supporting text — announced via aria-describedby.</td>
          </tr>
          <tr>
            <td>
              <code>error</code>
            </td>
            <td>
              <code>ReactNode</code>
            </td>
            <td>Error message — shown with aria-live polite.</td>
          </tr>
          <tr>
            <td>
              <code>invalid</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>Marks the input as invalid (sets aria-invalid).</td>
          </tr>
        </tbody>
      </table>

      <h2>Slots</h2>
      <table className="api-table">
        <thead>
          <tr>
            <th>Subcomponent</th>
            <th>Data Attribute</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>InputRoot</code>
            </td>
            <td>
              <code>data-component="input"</code>
            </td>
            <td>Root container.</td>
          </tr>
          <tr>
            <td>
              <code>InputLabel</code>
            </td>
            <td>
              <code>data-part="label"</code>
            </td>
            <td>The label element.</td>
          </tr>
          <tr>
            <td>
              <code>InputControl</code>
            </td>
            <td>
              <code>data-part="control"</code>
            </td>
            <td>The input element.</td>
          </tr>
          <tr>
            <td>
              <code>InputHelperText</code>
            </td>
            <td>
              <code>data-part="helper"</code>
            </td>
            <td>Helper text below input.</td>
          </tr>
          <tr>
            <td>
              <code>InputError</code>
            </td>
            <td>
              <code>data-part="error"</code>
            </td>
            <td>Error text with aria-live.</td>
          </tr>
        </tbody>
      </table>
    </DocSection>
  );
}
