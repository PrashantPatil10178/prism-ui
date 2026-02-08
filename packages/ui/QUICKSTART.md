# Quick Publish Commands

## 🚀 Ready to Publish!

### From project root:

```bash
cd packages/ui
```

### First-time publish:

```bash
npm login
npm publish --access public
```

### Update & publish new version:

```bash
# Make your changes, then:
pnpm build
pnpm test

# Bump version
npm version patch  # 1.0.0 → 1.0.1
# or minor: 1.0.0 → 1.1.0
# or major: 1.0.0 → 2.0.0

npm publish
```

## 📦 Package Info

- **Name:** `@prism-ui/react`
- **Version:** `1.0.0`
- **Size:** 78.8 KB (compressed), 412.6 KB (unpacked)
- **Bundles:**
  - ESM: 17.15 KB (dist/index.js)
  - CJS: 20.09 KB (dist/index.cjs)
  - CDN/IIFE: 101.93 KB (dist/index.global.js)

## 🌐 After Publishing

### npm install

```bash
npm install @prism-ui/react
```

### CDN (unpkg)

```html
<script src="https://unpkg.com/@prism-ui/react@latest/dist/index.global.js"></script>
```

### CDN (jsDelivr)

```html
<script src="https://cdn.jsdelivr.net/npm/@prism-ui/react@latest/dist/index.global.js"></script>
```

## ✅ Pre-Publish Verification

```bash
# From packages/ui/
npm pack --dry-run     # Check what files will be published
pnpm build            # Ensure fresh build
pnpm test             # All tests passing
```

## 📚 Documentation

- Full guide: `PUBLISHING.md`
- CDN test: `cdn-test.html` (open in browser to test locally)
- Package docs: `README.md`
