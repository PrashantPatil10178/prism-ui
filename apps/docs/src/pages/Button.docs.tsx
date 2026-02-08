import { Button, ToastProvider, useToast, Toaster } from "@prism-ui/react";
import DocSection from "../components/DocSection";
import ComponentPreview from "../components/ComponentPreview";
import CodeBlock from "../components/CodeBlock";

const npmCode = `import { Button } from "prism-ui-headless-react";

export function ButtonDemo() {
  return (
    <Button className="btn" onClick={() => alert("Clicked!")}>
      Click me
    </Button>
  );
}`;

const cdnCode = `<!-- No framework needed! Just HTML + CSS + JS -->
<link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react@latest/dist/prism-ui.css">

<!-- All button variants, just with data attributes -->
<button data-component="button" data-variant="primary" data-size="md"
  onclick="alert('Clicked!')">
  Click me
</button>

<button data-component="button" data-variant="secondary" data-size="md">
  Secondary
</button>

<button data-component="button" data-variant="destructive" data-size="lg">
  Delete
</button>

<button data-component="button" data-variant="outline" data-size="sm">
  Outline
</button>

<!-- Disabled state -->
<button data-component="button" data-variant="primary" disabled>
  Disabled
</button>`;

const reactCode = npmCode;

const htmlCode = `<!-- Prism UI renders a <button> with data attributes -->
<button
  type="button"
  data-component="button"
  data-variant="primary"
  data-size="md"
  class="btn"
>
  Click me
</button>

<style>
  .btn {
    padding: 8px 16px;
    border-radius: 8px;
    background: #fafafa;
    color: #09090b;
    font-weight: 500;
    border: none;
    cursor: pointer;
  }
  .btn:hover { opacity: 0.9; }
  .btn[data-disabled="true"] { opacity: 0.5; cursor: not-allowed; }
  .btn[data-loading="true"] { opacity: 0.7; }
</style>`;

const variantsCode = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="success">Success</Button>`;

const sizesCode = `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon">⚡</Button>`;

const loadingCode = `<Button loading>Saving...</Button>
<Button disabled>Unavailable</Button>`;

function ButtonWithToast() {
  const { addToast } = useToast();
  return (
    <Button
      className="demo-button"
      variant="primary"
      onClick={() =>
        addToast({
          title: "Button clicked!",
          description: "This toast was triggered by the button.",
          type: "success",
          duration: 3000,
        })
      }
    >
      Click me
    </Button>
  );
}

export default function ButtonDocs() {
  return (
    <DocSection>
      <h1>Button</h1>
      <p>
        An accessible, headless button component with built-in loading and
        disabled states. Style it however you want — Prism UI provides behavior,
        you bring the design.
      </p>

      <h2>Preview</h2>
      <ComponentPreview
        tabs={[
          { label: "NPM", code: npmCode },
          { label: "CDN", code: cdnCode, language: "html" },
          { label: "HTML", code: htmlCode, language: "html" },
        ]}
      >
        <ToastProvider>
          <ButtonWithToast />
          <Toaster className="toaster-container" />
        </ToastProvider>
        <Button className="demo-button" loading>
          Saving...
        </Button>
        <Button className="demo-button" disabled>
          Disabled
        </Button>
      </ComponentPreview>

      <h2>Variants</h2>
      <p>
        The <code>variant</code> prop sets <code>data-variant</code> on the
        element, so you can style each variant with CSS.
      </p>
      <ComponentPreview tabs={[{ label: "React", code: variantsCode }]}>
        <Button className="demo-button" variant="primary">
          Primary
        </Button>
        <Button className="demo-button" variant="secondary">
          Secondary
        </Button>
        <Button className="demo-button" variant="destructive">
          Destructive
        </Button>
        <Button className="demo-button" variant="outline">
          Outline
        </Button>
        <Button className="demo-button" variant="ghost">
          Ghost
        </Button>
        <Button className="demo-button" variant="success">
          Success
        </Button>
      </ComponentPreview>

      <h2>Sizes</h2>
      <p>
        Control size via the <code>size</code> prop. Outputs{" "}
        <code>data-size</code> for CSS targeting.
      </p>
      <ComponentPreview tabs={[{ label: "React", code: sizesCode }]}>
        <Button className="demo-button" size="sm">
          Small
        </Button>
        <Button className="demo-button" size="md">
          Medium
        </Button>
        <Button className="demo-button" size="lg">
          Large
        </Button>
        <Button className="demo-button" size="icon">
          ⚡
        </Button>
      </ComponentPreview>

      <h2>Loading &amp; Disabled</h2>
      <ComponentPreview tabs={[{ label: "React", code: loadingCode }]}>
        <Button className="demo-button" loading>
          Saving...
        </Button>
        <Button className="demo-button" disabled>
          Unavailable
        </Button>
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
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>variant</code>
            </td>
            <td>
              <code>{`"primary" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "success"`}</code>
            </td>
            <td>
              <code>"primary"</code>
            </td>
            <td>Sets data-variant for CSS styling.</td>
          </tr>
          <tr>
            <td>
              <code>size</code>
            </td>
            <td>
              <code>{`"sm" | "md" | "lg" | "icon"`}</code>
            </td>
            <td>
              <code>"md"</code>
            </td>
            <td>Sets data-size for CSS styling.</td>
          </tr>
          <tr>
            <td>
              <code>disabled</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>Disables pointer and keyboard actions.</td>
          </tr>
          <tr>
            <td>
              <code>loading</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>Sets aria-busy and data-loading.</td>
          </tr>
          <tr>
            <td>
              <code>as</code>
            </td>
            <td>
              <code>ElementType</code>
            </td>
            <td>
              <code>"button"</code>
            </td>
            <td>Polymorphic — render as any element.</td>
          </tr>
          <tr>
            <td>
              <code>className</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>—</td>
            <td>Your CSS class for styling.</td>
          </tr>
        </tbody>
      </table>

      <h2>Data Attributes</h2>
      <table className="api-table">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>data-component</code>
            </td>
            <td>
              <code>"button"</code>
            </td>
            <td>Always present for selector targeting.</td>
          </tr>
          <tr>
            <td>
              <code>data-variant</code>
            </td>
            <td>Variant string</td>
            <td>Matches the variant prop.</td>
          </tr>
          <tr>
            <td>
              <code>data-size</code>
            </td>
            <td>Size string</td>
            <td>Matches the size prop.</td>
          </tr>
          <tr>
            <td>
              <code>data-loading</code>
            </td>
            <td>
              <code>"true"</code>
            </td>
            <td>Present when loading.</td>
          </tr>
          <tr>
            <td>
              <code>data-disabled</code>
            </td>
            <td>
              <code>"true"</code>
            </td>
            <td>Present when disabled.</td>
          </tr>
        </tbody>
      </table>
    </DocSection>
  );
}
