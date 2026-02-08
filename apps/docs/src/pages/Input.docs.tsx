import { Input } from "@prism-ui/react";
import DocSection from "../components/DocSection";
import ComponentPreview from "../components/ComponentPreview";
import CodeBlock from "../components/CodeBlock";

const reactCode = `import { Input } from "@prism-ui/react";

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

const htmlCode = `<!-- Prism UI renders a labeled input with ARIA wiring -->
<div data-component="input" class="field">
  <label for="email" data-slot="label">Email</label>
  <input
    id="email"
    type="email"
    placeholder="you@example.com"
    aria-describedby="email-helper"
    data-slot="control"
  />
  <p id="email-helper" data-slot="helper">
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
  .field [data-slot="label"] { font-weight: 500; }
  .field [data-slot="helper"] { font-size: 0.85rem; color: #a1a1aa; }
  .field [data-slot="error"] { font-size: 0.85rem; color: #ef4444; }
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
          { label: "React", code: reactCode },
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
      <CodeBlock language="bash" code="pnpm add @prism-ui/react" />

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
              <code>data-slot="label"</code>
            </td>
            <td>The label element.</td>
          </tr>
          <tr>
            <td>
              <code>InputControl</code>
            </td>
            <td>
              <code>data-slot="control"</code>
            </td>
            <td>The input element.</td>
          </tr>
          <tr>
            <td>
              <code>InputHelperText</code>
            </td>
            <td>
              <code>data-slot="helper"</code>
            </td>
            <td>Helper text below input.</td>
          </tr>
          <tr>
            <td>
              <code>InputError</code>
            </td>
            <td>
              <code>data-slot="error"</code>
            </td>
            <td>Error text with aria-live.</td>
          </tr>
        </tbody>
      </table>
    </DocSection>
  );
}
