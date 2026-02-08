import DocSection from "../components/DocSection";

export default function Versioning() {
  return (
    <DocSection>
      <h1>Versioning strategy</h1>
      <p>Prism UI follows semantic versioning.</p>
      <ul>
        <li>
          <strong>Major</strong>: breaking changes or removed APIs.
        </li>
        <li>
          <strong>Minor</strong>: new components or additive props.
        </li>
        <li>
          <strong>Patch</strong>: bug fixes and internal improvements.
        </li>
      </ul>
      <h2>Release process</h2>
      <p>
        Use Changesets to capture changes, generate changelogs, and publish
        packages consistently across the monorepo.
      </p>
    </DocSection>
  );
}
