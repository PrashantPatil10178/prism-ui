import DocSection from "../components/DocSection";

export default function UpgradeGuide() {
  return (
    <DocSection>
      <h1>Upgrade guide</h1>
      <ol>
        <li>Review the changelog for breaking changes.</li>
        <li>Update package versions with pnpm update.</li>
        <li>Run tests in consuming apps to validate integration.</li>
      </ol>
      <p>
        Avoid direct DOM styling in shared components. Prefer className-based
        tokens so that upgrades remain compatible across themes.
      </p>
    </DocSection>
  );
}
