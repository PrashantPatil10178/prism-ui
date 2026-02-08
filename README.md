# Prism UI

<div align="center">
  <strong>Production-Ready Headless React Components</strong>
  <br />
  <br />
  <em>Zero visual opinions. Complete accessibility. Infinite flexibility.</em>
</div>

<br />

Prism UI is a headless React component system designed for teams building multiple products with different design systems. It provides **behavior and accessibility** without forcing visual constraints—bring your own styles, tokens, and brand.

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

```bash
# Ibash
pnpm install
```

Run all apps in development mode:

```bash
pnpm dev
```

This starts:

- **Demo app** at `http://localhost:5173`
- **Docs site** at `http://localhost:5174`

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

### Coming Soon

- Select / Combobox
- Checkbox / Radio
- Accordion
- Tooltip
- Popover
- Toast Notifications

## 🎯 Design Principles

1. **Behavior over appearance** — We handle interactions, you handle visuals
2. **Accessibility is not optional** — Every component meets WCAG 2.1 AA
3. **Minimal API surface** — Simple props, maximum flexibility
4. **Progressive enhancement** — Works with SSR, hydration, and client-side
5. **Type safety** — Full TypeScript support with excellent IntelliSense

## 📚 Documentation

Visit the docs site locally with `pnpm dev` or explore:

- **Theming Guide** — How to style components with CSS variables
- **Component API** — Props, data attributes, and ARIA patterns
- **Examples** — Real-world usage patterns

## 🤝 Contributing

We welcome contributions! Please see our contributing guide for details.

## 📄 License

MIT © Prism UI

---

<div align="center">
  Built with ❤️ using React, TypeScript, and Turborepo
</div>
  );
}
```

Style it however you want:

```css
.my-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.my-button[data-loading="true"] {
  opacity: 0.6;
  cursor: wait;
}

.my-button[data-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
}
```

## 🛠️ Development

Install dependencies once at the root:

```
pnpm install
```

Run everything:

```
pnpm dev
```

### Demo app

```
pnpm dev --filter demo
```

### Docs site

```
pnpm dev --filter docs
```

### Build the UI package

```
pnpm build --filter @prism-ui/react
```

## Theming strategy

Prism UI exposes state via props and data attributes. Apps can style based on `data-loading`, `data-invalid`, or `data-state` without modifying library code. Themes are implemented using CSS variables and a `data-theme` attribute on the HTML root.

## Publishing workflow

`packages/ui` is independently publishable.

```
cd packages/ui
npm login
npm publish --access public
```

### Versioning

Semantic versioning is required:

- **Major** for breaking changes
- **Minor** for new components or non-breaking features
- **Patch** for bug fixes

Changesets are recommended for tracking releases.

## Upgrade & maintenance strategy

1. Review the changelog for breaking changes.
2. Update versions with `pnpm update`.
3. Run tests in consuming apps to confirm integration.

## Key design decisions

- Headless-only components to preserve separation of concerns.
- Explicit state exposure with `data-*` attributes for styling.
- Composition-first APIs for flexibility in consuming apps.
- Vite-based demo and docs for fast iteration and static hosting.
