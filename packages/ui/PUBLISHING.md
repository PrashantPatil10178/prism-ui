# Publishing @prism-ui/react to npm

## Pre-Publication Checklist

✅ **Files Prepared:**

- `dist/` — Built bundles (ESM, CJS, CDN/IIFE)
- `README.md` — Comprehensive documentation
- `LICENSE` — MIT license
- `package.json` — Metadata configured
- `.npmignore` — Excludes dev files

✅ **Build Verified:**

```bash
pnpm --filter @prism-ui/react build
# Output: ESM (17KB), CJS (20KB), CDN/IIFE (102KB)
```

✅ **Tests Passing:**

```bash
pnpm --filter @prism-ui/react test
# All 6 tests passing
```

✅ **Type Check Clean:**

```bash
pnpm check-types
# Zero errors
```

## Step-by-Step Publishing Guide

### 1. Verify Package Contents

```bash
cd packages/ui
npm pack --dry-run
```

Expected output:

- 11 files
- ~79KB compressed, ~413KB unpacked
- Includes: dist/\*, README.md, LICENSE, package.json

### 2. Login to npm

```bash
npm login
```

Enter your credentials:

- Username
- Password
- Email
- OTP (if 2FA enabled)

### 3. Publish to npm

#### First-time publish (public scoped package):

```bash
npm publish --access public
```

#### Subsequent versions:

```bash
# Update version first
npm version patch  # 1.0.0 → 1.0.1
# or
npm version minor  # 1.0.0 → 1.1.0
# or
npm version major  # 1.0.0 → 2.0.0

# Then publish
npm publish
```

### 4. Verify Publication

```bash
# Check on npm registry
npm view @prism-ui/react

# Test installation in a new project
mkdir test-install && cd test-install
npm init -y
npm install @prism-ui/react react react-dom
```

## Using the Package

### Via npm (React Apps)

```bash
npm install @prism-ui/react
```

```tsx
import { Button, Card, Input } from "@prism-ui/react";

function App() {
  return (
    <Card data-variant="elevated">
      <Input label="Email" required />
      <Button data-variant="primary">Submit</Button>
    </Card>
  );
}
```

### Via CDN (HTML)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Prism UI Example</title>
  </head>
  <body>
    <div id="root"></div>

    <!-- Dependencies -->
    <script
      crossorigin
      src="https://unpkg.com/react@19/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"
    ></script>

    <!-- Prism UI -->
    <script src="https://unpkg.com/@prism-ui/react@1.0.0/dist/index.global.js"></script>
    <!-- Or use @latest: -->
    <!-- <script src="https://unpkg.com/@prism-ui/react@latest/dist/index.global.js"></script> -->

    <script>
      const { Button, Card, CardBody } = window.PrismUI;
      const root = ReactDOM.createRoot(document.getElementById("root"));

      root.render(
        React.createElement(
          Card,
          { "data-variant": "elevated" },
          React.createElement(
            CardBody,
            null,
            React.createElement(
              Button,
              {
                "data-variant": "primary",
                onClick: () => alert("Clicked!"),
              },
              "Click Me",
            ),
          ),
        ),
      );
    </script>

    <!-- Your CSS for styling -->
    <style>
      [data-component="button"][data-variant="primary"] {
        background: #0066ff;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
      }

      [data-component="card"] {
        background: white;
        padding: 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    </style>
  </body>
</html>
```

## CDN Providers

After publishing to npm, the package will be automatically available on:

### 1. **unpkg** (Recommended)

```html
<!-- Latest version -->
<script src="https://unpkg.com/@prism-ui/react@latest/dist/index.global.js"></script>

<!-- Specific version -->
<script src="https://unpkg.com/@prism-ui/react@1.0.0/dist/index.global.js"></script>
```

### 2. **jsDelivr**

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/@prism-ui/react@latest/dist/index.global.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@prism-ui/react@1.0.0/dist/index.global.js"></script>
```

### 3. **cdnjs** (Submit request after publishing)

Visit: https://github.com/cdnjs/packages

## Post-Publishing Checklist

- [ ] Verify package appears on [npmjs.com/package/@prism-ui/react](https://www.npmjs.com/package/@prism-ui/react)
- [ ] Test CDN URL works: `https://unpkg.com/@prism-ui/react@latest/dist/index.global.js`
- [ ] Test npm install in a fresh project
- [ ] Update repository README with npm badge
- [ ] Create a GitHub release (if using GitHub)
- [ ] Tweet/announce the release (optional)

## Version Management

Follow semantic versioning:

- **Patch** (1.0.X): Bug fixes, no API changes
- **Minor** (1.X.0): New features, backward compatible
- **Major** (X.0.0): Breaking changes

```bash
# Before publishing a new version
pnpm --filter @prism-ui/react build
pnpm --filter @prism-ui/react test
pnpm check-types

npm version patch  # or minor/major
npm publish
```

## Troubleshooting

### "You must sign in to publish"

```bash
npm login
# Enter credentials
```

### "402 Payment Required - You must sign up for private packages"

```bash
# For scoped packages (@prism-ui/*), must use --access public
npm publish --access public
```

### "403 Forbidden - Package name already exists"

- Choose a different package name in package.json
- Or claim the package if you own it

### "Version X.X.X already published"

```bash
# Update version before publishing
npm version patch
npm publish
```

## Support

- 📦 npm: https://www.npmjs.com/package/@prism-ui/react
- 📝 Issues: https://github.com/prism-ui/react/issues
- 📚 Docs: https://github.com/prism-ui/react#readme

---

**Ready to publish?** Run `npm publish --access public` from `packages/ui/` directory!
