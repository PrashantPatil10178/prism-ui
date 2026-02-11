import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
} from "prism-ui-headless-react";
import DocSection from "../components/DocSection";
import ComponentPreview from "../components/ComponentPreview";
import CodeBlock from "../components/CodeBlock";

const npmCode = `import { Card, CardBody, CardFooter, CardHeader } from "prism-ui-headless-react";

export function CardDemo() {
  return (
    <Card className="card">
      <CardHeader>Notifications</CardHeader>
      <CardBody>You have 3 unread messages.</CardBody>
      <CardFooter>
        <button>Mark all as read</button>
      </CardFooter>
    </Card>
  );
}`;

const cdnCode = `<!-- No framework needed! Just HTML + CSS -->
<link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react/prism-ui.css">

<div data-component="card">
  <div data-part="card-header">
    <h3 data-part="card-title">Notifications</h3>
    <p data-part="card-description">You have 3 unread messages.</p>
  </div>
  <div data-part="card-content">
    Review your messages to stay up to date with your team.
  </div>
  <div data-part="card-footer">
    <button data-component="button" data-variant="primary" data-size="sm">
      Mark all as read
    </button>
  </div>
</div>`;

const reactCode = npmCode;

const htmlCode = `<!-- Prism UI renders semantic <div> elements with data attributes -->
<div data-component="card" class="card">
  <div data-part="card-header">Notifications</div>
  <div data-part="card-content">You have 3 unread messages.</div>
  <div data-part="card-footer">
    <button>Mark all as read</button>
  </div>
</div>

<style>
  .card {
    border: 1px solid #27272a;
    border-radius: 8px;
    padding: 16px;
    background: #0a0a0c;
  }
  .card [data-part="card-header"] { font-weight: 600; margin-bottom: 8px; }
  .card [data-part="card-content"] { color: #a1a1aa; }
  .card [data-part="card-footer"] { margin-top: 12px; }
</style>`;

export default function CardDocs() {
  return (
    <DocSection>
      <h1>Card</h1>
      <p>
        A structural container for grouping related content. Compose with
        header, body, and footer subcomponents — each exposing data-part
        attributes for CSS targeting.
      </p>

      <h2>Preview</h2>
      <ComponentPreview
        tabs={[
          { label: "NPM", code: npmCode },
          { label: "CDN", code: cdnCode, language: "html" },
          { label: "HTML", code: htmlCode, language: "html" },
        ]}
      >
        <Card className="demo-card" style={{ width: "100%", maxWidth: 380 }}>
          <CardHeader className="demo-card-header">Notifications</CardHeader>
          <CardBody style={{ color: "var(--muted-foreground)" }}>
            You have 3 unread messages. Review them to stay up to date.
          </CardBody>
          <CardFooter className="demo-card-footer">
            <Button className="demo-button">Mark all as read</Button>
          </CardFooter>
        </Card>
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

      <h2>Composition</h2>
      <p>
        All subcomponents are optional. Use <code>CardHeader</code>,{" "}
        <code>CardBody</code>, and <code>CardFooter</code> in any combination,
        or nest your own content directly inside <code>Card</code>.
      </p>

      <h2>API Reference</h2>
      <table className="api-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Data Attribute</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>Card</code>
            </td>
            <td>
              <code>data-component="card"</code>
            </td>
            <td>Root container element.</td>
          </tr>
          <tr>
            <td>
              <code>CardHeader</code>
            </td>
            <td>
              <code>data-part="card-header"</code>
            </td>
            <td>Title or header section.</td>
          </tr>
          <tr>
            <td>
              <code>CardBody</code>
            </td>
            <td>
              <code>data-part="card-content"</code>
            </td>
            <td>Main content area.</td>
          </tr>
          <tr>
            <td>
              <code>CardFooter</code>
            </td>
            <td>
              <code>data-part="card-footer"</code>
            </td>
            <td>Actions or footer area.</td>
          </tr>
        </tbody>
      </table>
    </DocSection>
  );
}
