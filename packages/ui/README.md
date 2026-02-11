# prism-ui-headless-react

Headless, accessible UI primitives for React with optional CDN usage.

Published package on npm: `prism-ui-headless-react`

## Install

```bash
npm install prism-ui-headless-react
# or
pnpm add prism-ui-headless-react
# or
yarn add prism-ui-headless-react
```

## React usage

```tsx
import {
  Button,
  Card,
  Dialog,
  Input,
  Tabs,
  toast,
} from "prism-ui-headless-react";
import "prism-ui-headless-react/styles";

export function Example() {
  return <Button>Click me</Button>;
}
```

CSS entry points (both are supported):

```ts
import "prism-ui-headless-react/styles";
// or
import "prism-ui-headless-react/prism-ui.css";
```

## CDN usage

### CSS

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/prism-ui-headless-react/prism-ui.css"
/>
```

### React global bundle

```html
<script
  crossorigin
  src="https://unpkg.com/react@19/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"
></script>
<script src="https://unpkg.com/prism-ui-headless-react@latest/dist/index.global.js"></script>
```

### Vanilla interactivity helper

```html
<script src="https://unpkg.com/prism-ui-headless-react/prism-ui.js"></script>
```

### Toast-only vanilla bundle

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/prism-ui-headless-react/toast-vanilla.css"
/>
<script src="https://unpkg.com/prism-ui-headless-react/toast-vanilla.js"></script>
```

## Exports

- `prism-ui-headless-react` -> React component exports
- `prism-ui-headless-react/styles` -> default CSS file
- `prism-ui-headless-react/prism-ui.css` -> CSS file alias
- `prism-ui-headless-react/prism-ui.js` -> vanilla behavior bundle
- `prism-ui-headless-react/toast-vanilla.css` -> toast CSS
- `prism-ui-headless-react/toast-vanilla.js` -> toast JS

## Development

```bash
pnpm build --filter prism-ui-headless-react
pnpm test --filter prism-ui-headless-react
pnpm lint --filter prism-ui-headless-react
```

## License

MIT
