# Prism UI

<div align="center">
  <strong>Production-Ready Headless React Components</strong>
  <br />
  <br />
  <em>Zero visual opinions. Complete accessibility. Infinite flexibility.</em>
  <br />
  <br />
  
  [![npm version](https://img.shields.io/npm/v/prism-ui-headless-react.svg)](https://www.npmjs.com/package/prism-ui-headless-react)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
</div>

<br />

Prism UI is a headless React component system designed for teams building multiple products with different design systems. It provides **behavior and accessibility** without forcing visual constraints—bring your own styles, tokens, and brand.

> **Latest Release:** v1.3.0 - CDN support with vanilla JS, all docs examples verified, full TypeScript support

## ✨ Why Prism UI?

Modern teams need consistent behavior without visual lock-in. Prism UI solves this by:

- 🎯 **Headless Architecture** — Components render semantic HTML with zero CSS
- ♿ **Accessibility First** — WCAG 2.1 AA compliant with comprehensive ARIA support
- 🎨 **Style Agnostic** — Use CSS-in-JS, CSS Modules, Tailwind, or vanilla CSS
- 🔧 **Customizable** — Full control over markup via polymorphic `as` prop
- ⚡ **Performance** — Tree-shakeable, zero dependencies beyond React
- 📦 **Type Safe** — Written in TypeScript with complete type definitions

## 📦 Monorepo Structure

```
prism-ui/
├─ packages/
│  └─ ui/              # @prism-ui/react - Headless component library
├─ apps/
│  ├─ demo/            # Interactive showcase with theme switching
│  └─ docs/            # Full documentation site
├─ turbo.json          # Turborepo pipeline configuration
├─ package.json        # Workspace root configuration
└─ pnpm-workspace.yaml # pnpm workspace definition
```

## 🚀 Quick Start

### Installation

#### For React Projects

```bash
npm install prism-ui-headless-react
# or
pnpm add prism-ui-headless-react
# or
yarn add prism-ui-headless-react
```

#### CDN for Vanilla JS

```html
<!-- Include Toast script -->
<script src="https://unpkg.com/prism-ui-headless-react@latest/dist/toast-vanilla.js"></script>

<script>
  // Initialize Toast
  PrismToast.init();
  
  // Show a toast
  PrismToast.show({
    title: 'Success!',
    description: 'Your changes have been saved.',
    variant: 'success'
  });
</script>
```

### Development Setup

Clone and install dependencies:

```bash
git clone https://github.com/PrashantPatil10178/prism-ui.git
cd prism-ui
pnpm install
```

Run all apps in development mode:

```bash
pnpm dev
```

This starts:

- **Demo app** at `http://localhost:3000` - Interactive component showcase
- **Docs site** at `http://localhost:3001` - Full documentation with examples

### Individual Apps

```bash
# Run demo app only
pnpm dev --filter demo

# Run docs site only
pnpm dev --filter docs

# Build the UI package
pnpm build --filter @prism-ui/react

# Run all tests
pnpm test

# Build everything for production
pnpm build
```

## 📖 Components

### Currently Available

- **Button** — Interactive button with loading and disabled states
- **Card** — Flexible content container with header/body/footer
- **Dialog** — Accessible modal with backdrop and focus management
- **Input** — Form field with label, helper text, and error handling
- **Tabs** — Keyboard-navigable tab interface with ARIA support
- **Toast** — Notification system with React hooks and vanilla JS CDN support

### Features

✅ **React & Vanilla JS** — Use with React hooks or plain JavaScript CDN  
✅ **TypeScript First** — Full type safety with IntelliSense support  
✅ **Verified Examples** — All documentation examples tested and working  
✅ **Zero Dependencies** — No external runtime dependencies beyond React  
✅ **Tree-shakeable** — Import only what you need

## 🎯 Design Principles

1. **Behavior over appearance** — We handle interactions, you handle visuals
2. **Accessibility is not optional** — Every component meets WCAG 2.1 AA
3. **Minimal API surface** — Simple props, maximum flexibility
4. **Progressive enhancement** — Works with SSR, hydration, and client-side
5. **Type safety** — Full TypeScript support with excellent IntelliSense

## 📚 Documentation

Visit the [live documentation site](https://r4c8go8k88w8c8s044gs84c8.crmaster.in) or run locally:

```bash
pnpm dev --filter docs
```

Explore:

- **Getting Started** — Installation and basic usage
- **Component API** — Props, data attributes, and ARIA patterns
- **React Examples** — Complete working examples with React
- **CDN Examples** — Vanilla JavaScript usage without build tools
- **Theming Guide** — Style components with CSS variables
- **Accessibility** — WCAG 2.1 AA compliance details

## 🚀 Deployment

### Deploying to Coolify

The monorepo is configured for easy deployment to Coolify using Nixpacks:

**Quick Deploy:**

1. Create new Application in Coolify
2. Connect your Git repository
3. Set **Base Directory**: `/` (root)
4. Set **Publish Directory**: `/apps/docs/dist` (for docs) or `/apps/demo/dist` (for demo)
5. Add environment variable: `APP_NAME=docs` (or `demo`)
6. Deploy!

For detailed deployment instructions, see [COOLIFY_DEPLOYMENT.md](./COOLIFY_DEPLOYMENT.md)

### Manual Deployment

Build for production:

```bash
# Build docs
pnpm --filter=docs build

# Build demo
pnpm --filter=demo build

# Serve with any static file server
npx serve apps/docs/dist -l 3001 -s
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

```bash
# Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/prism-ui.git
cd prism-ui

# Install dependencies
pnpm install

# Create a branch
git checkout -b feature/your-feature-name

# Make your changes and test
pnpm dev
pnpm test
pnpm build

# Commit and push
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

### Guidelines

- Follow existing code style and patterns
- Add tests for new components
- Update documentation for API changes
- Ensure accessibility standards are met
- All examples must work (verified before merging)

### Reporting Issues

Found a bug? Please [open an issue](https://github.com/PrashantPatil10178/prism-ui/issues) with:
- Component name and version
- Steps to reproduce
- Expected vs actual behavior
- Code example if possible

## 📄 License

MIT © Prism UI Team

Free to use in personal and commercial projects.

---

<div align="center">
  <br />
  <strong>Built with ❤️ using React, TypeScript, and Turborepo</strong>
  <br />
  <br />
  <a href="https://github.com/PrashantPatil10178/prism-ui">GitHub</a> •
  <a href="https://www.npmjs.com/package/prism-ui-headless-react">npm</a> •
  <a href="https://r4c8go8k88w8c8s044gs84c8.crmaster.in">Documentation</a>
</div>
## 🎨 Usage Example

Import components and use them with your own styles:

```jsx
import { Button } from 'prism-ui-headless-react';

function App() {
  return (
    <Button 
      className="my-button"
      loading={false}
      disabled={false}
      onClick={() => console.log('Clicked!')}
    >
      Click Me
    </Button>
  );
}
```

Style with CSS, Tailwind, or any styling solution:

```css
.my-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.my-button[data-loading="true"] {
  opacity: 0.6;
  cursor: wait;
}

.my-button[data-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.my-button:hover:not([data-disabled="true"]) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
```

### Data Attributes for Styling

All components expose their state through data attributes:

- `data-loading` — Button loading state
- `data-disabled` — Disabled state
- `data-invalid` — Input validation state
- `data-open` — Dialog/Tab open state
- `data-variant` — Toast variant (success, error, warning, info)

This allows you to style components based on their behavior without JavaScript.
```

## 🛠️ Development

### Monorepo Commands

```bash
# Install all dependencies
pnpm install

# Run all apps in dev mode
pnpm dev

# Build everything
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck
```

### Working with Individual Apps

```bash
# Demo app (port 3000)
pnpm dev --filter demo
pnpm build --filter demo

# Docs site (port 3001)
pnpm dev --filter docs
pnpm build --filter docs

# UI package
pnpm build --filter @prism-ui/react
pnpm test --filter @prism-ui/react
```

### Project Structure

```
prism-ui/
├─ apps/
│  ├─ demo/              # Interactive showcase (Vite + React)
│  │  ├─ src/
│  │  ├─ package.json
│  │  └─ vite.config.ts
│  └─ docs/              # Documentation site (Vite + React + React Router)
│     ├─ src/
│     │  ├─ pages/       # Component documentation pages
│     │  └─ components/  # Docs-specific components
│     ├─ package.json
│     └─ vite.config.ts
├─ packages/
│  └─ ui/                # @prism-ui/react component library
│     ├─ src/
│     │  ├─ button.tsx
│     │  ├─ card.tsx
│     │  ├─ dialog.tsx
│     │  ├─ input.tsx
│     │  ├─ tabs.tsx
│     │  ├─ toast.tsx
│     │  └─ toast-vanilla.js  # CDN build
│     ├─ package.json    # Published as prism-ui-headless-react
│     └─ tsup.config.ts  # Build configuration
├─ nixpacks.toml         # Coolify deployment config
├─ turbo.json            # Turborepo pipeline
├─ pnpm-workspace.yaml   # Workspace definition
└─ package.json          # Root package with workspace scripts
```

## 🏗️ Architecture

### Theming Strategy

Prism UI exposes component state via data attributes, allowing flexible styling without modifying library code:

```css
/* Theme with CSS variables */
:root {
  --button-bg: #667eea;
  --button-text: white;
}

[data-theme="dark"] {
  --button-bg: #764ba2;
  --button-text: #f0f0f0;
}

/* Style based on state */
.button {
  background: var(--button-bg);
  color: var(--button-text);
}

.button[data-loading="true"] { /* loading styles */ }
.button[data-disabled="true"] { /* disabled styles */ }
```

### Build Configuration

- **Bundler**: tsup (fast TypeScript bundler)
- **Outputs**: ESM, CJS, and vanilla JS CDN bundle
- **TypeScript**: Full type definitions included
- **Tree-shaking**: Import only what you use

### Key Design Decisions

1. **Headless-only** — Separation of behavior and presentation
2. **Data attributes** — Explicit state exposure for CSS styling
3. **Composition-first** — Flexible APIs for complex use cases
4. **Zero dependencies** — No runtime deps beyond React (for React components)
5. **Vite-based apps** — Fast development with HMR and optimized builds

## 📦 Publishing

The `packages/ui` is published to npm as `prism-ui-headless-react`.

### Current Version: v1.3.0

**What's New in v1.3.0:**
- ✅ CDN support with `toast-vanilla.js` for vanilla JavaScript usage
- ✅ All documentation examples verified and fixed (Button, Card, Input, Toast, Dialog)
- ✅ Fixed data attribute inconsistencies (`data-part` vs `data-slot`)
- ✅ Improved TypeScript types and exports
- ✅ Production-ready with comprehensive testing

### Publishing Workflow

```bash
cd packages/ui

# Update version in package.json
# Then build and publish
pnpm build
npm login
npm publish --access public
```

### Versioning Strategy

Following [Semantic Versioning](https://semver.org/):

- **Major (x.0.0)** — Breaking API changes
- **Minor (1.x.0)** — New features, backward compatible
- **Patch (1.3.x)** — Bug fixes and minor improvements

### Package Configuration

The package uses a dual-name strategy:
- **Workspace name**: `@prism-ui/react` (for local development)
- **Published name**: `prism-ui-headless-react` (on npm)

This is configured in `packages/ui/package.json`:

```json
{
  "name": "@prism-ui/react",
  "publishConfig": {
    "name": "prism-ui-headless-react"
  }
}
```

## 🔄 Upgrade & Maintenance

### Upgrading Prism UI

```bash
# Check for updates
npm outdated prism-ui-headless-react

# Update to latest version
npm install prism-ui-headless-react@latest

# Or with pnpm
pnpm update prism-ui-headless-react
```

### Migration Guide

When upgrading:

1. Review the [CHANGELOG](./CHANGELOG.md) for breaking changes
2. Check data attribute updates (e.g., v1.3.0 fixed `data-slot` → `data-part`)
3. Test your app thoroughly, especially if you style based on data attributes
4. Update TypeScript types if using custom wrappers

### Maintenance Strategy

- Regular security updates
- Documentation kept in sync with code
- All examples tested before release
- Semantic versioning for predictable upgrades

## Key design decisions

- Headless-only components to preserve separation of concerns.
- Explicit state exposure with `data-*` attributes for styling.
- Composition-first APIs for flexibility in consuming apps.
- Vite-based demo and docs for fast iteration and static hosting.
