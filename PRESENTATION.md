# Developer Test: Headless UI & Theming System

## Presentation Outline (30 Minutes)

This document outlines the structure for a 30-minute technical presentation explaining the `PrismUI` monorepo setup, architectural decisions, and how it fulfills the Headless UI developer test requirements.

---

### 1. Introduction & Architecture (5 Mins)

**One-Liner:** "A production-grade, headless component library built for multi-brand scalability."

**Key Talking Points:**

- **Monorepo Structure (TurboRepo):**
  - Efficient build system caching.
  - Clear separation of concerns:
    - `packages/ui`: The brain (Logic, A11y, Structure).
    - `apps/demo`: The verification (Consumers, Theming).
    - `apps/docs`: The manual (Documentation, Examples).
- **Tech Stack:**
  - React + TypeScript (Strict typing).
  - Vite (Fast development).
  - Vitest (Unit & A11y testing).

**Visual:** Show the folder structure (`apps/` vs `packages/`).

---

### 2. The "Headless" Philosophy (7 Mins)

**Core Concept:** "Components own the _behavior_ and _structure_. Consumers own the _pixel_."

**Deep Dive: The `Card` Component:**

- **Structure:** Encapsulated semantic HTML (header, body, footer).
- **Behavior:** Interactive states (focus, hover structure) handled via props.
- **Styling Contract:**
  - **No bundled styles:** We don't ship "blue" buttons or "rounded" cards.
  - **Data Attributes:** We expose state via `data-variant="primary"`, `data-loading="true"`, `data-interactive`.
  - **Why?** Allows `Brand A` to use CSS Modules and `Brand B` to use Tailwind without fighting library specificity.

**Code Example:**

```tsx
// Inside Card.tsx
<div
  data-component="card"
  data-variant={variant}
  data-interactive={interactive}
>
  {children}
</div>
```

---

### 3. Theming Strategy (8 Mins)

**Requirement:** "Switch themes without modifying the library."

**Implementation:**

- **CSS Variables Layer:** The "API" for design tokens.
- **Theme Injection:**
  - Distinct CSS files: `themes/brand-a.css` vs `themes/brand-b.css`.
  - Dynamic loading via `document.documentElement.dataset.theme`.
- **Demo:**
  - Show the "Theme Switcher" in the Demo App.
  - Highlight how the **same** `<Button variant="primary" />` component radically changes appearance (color, border-radius, shadow) instantly because it targets the underlying data attributes.

**Visual:** Split screen of Brand A vs Brand B.

---

### 4. Component Showcase (5 Mins)

**Required Components:**

- **Button:**
  - Handles `loading` states (aria-busy), disabling, and keyboard focus.
  - Polymorphic support (`as` prop) for rendering links as buttons.
- **Card:**
  - Layout container with variant support (`outlined`, `elevated`, `ghost`).

**Additional Components:**

- **Dialog/Modal:** Focus trapping, escape key handling.
- **Tabs:** Keyboard navigation (arrow keys), ARIA roles (`tablist`, `tabpanel`).
- **Input:** Validation states, support text, accessible labelling.

---

### 5. Quality & Maintainability (3 Mins)

**Testing:**

- **Functional:** `vitest` ensures clicking a disabled button does nothing.
- **Accessibility:** `vitest-axe` runs automated WCAG checks on every render.

**Versioning & Reuse:**

- **NPM Publishing:** Configured via `publishConfig`.
- **Versioning:** Semantic Versioning (SemVer). Breaking API changes = Major version bump. Visual changes = Consumer responsibility (safe upgrades).

---

### 6. Q&A (2 Mins)

**Potential Questions to Prep For:**

- _Q: Why not use Tailwind inside the library?_
  - A: To ensure true portability. If the consumer uses styled-components, Tailwind would be bloat.
- _Q: How do I handle complex animations?_
  - A: The library exposes state (`data-state="open"`), the consumer attaches CSS transitions to that state.
