import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
} from "@prism-ui/react";
import DocSection from "../components/DocSection";
import ComponentPreview from "../components/ComponentPreview";
import CodeBlock from "../components/CodeBlock";

const reactCode = `import { Card, CardBody, CardFooter, CardHeader } from "@prism-ui/react";

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

const htmlCode = `<!-- Prism UI renders semantic <div> elements with data attributes -->
<div data-component="card" class="card">
  <div data-slot="header">Notifications</div>
  <div data-slot="body">You have 3 unread messages.</div>
  <div data-slot="footer">
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
  .card [data-slot="header"] { font-weight: 600; margin-bottom: 8px; }
  .card [data-slot="body"] { color: #a1a1aa; }
  .card [data-slot="footer"] { margin-top: 12px; }
</style>`;

export default function CardDocs() {
  return (
    <DocSection>
      <h1>Card</h1>
      <p>
        A structural container for grouping related content. Compose with
        header, body, and footer subcomponents — each exposing data-slot
        attributes for CSS targeting.
      </p>

      <h2>Preview</h2>
      <ComponentPreview
        tabs={[
          { label: "React", code: reactCode },
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
      <CodeBlock language="bash" code="pnpm add @prism-ui/react" />

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
              <code>data-slot="header"</code>
            </td>
            <td>Title or header section.</td>
          </tr>
          <tr>
            <td>
              <code>CardBody</code>
            </td>
            <td>
              <code>data-slot="body"</code>
            </td>
            <td>Main content area.</td>
          </tr>
          <tr>
            <td>
              <code>CardFooter</code>
            </td>
            <td>
              <code>data-slot="footer"</code>
            </td>
            <td>Actions or footer area.</td>
          </tr>
        </tbody>
      </table>
    </DocSection>
  );
}
