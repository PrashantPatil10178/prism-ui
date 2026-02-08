# Prism UI Toast - Vanilla JavaScript

A lightweight, zero-dependency toast notification system. No React, no build tools, just pure JavaScript.

## Features

- ✨ **Zero Dependencies** - No React, no frameworks required
- 🎨 **Fully Styleable** - CSS custom properties and data attributes
- 🚀 **Tiny Size** - Under 3KB minified
- ♿ **Accessible** - ARIA roles and keyboard support
- 🎯 **Simple API** - Just one function call

## Installation

### Via CDN

```html
<!-- Include the script -->
<script src="https://unpkg.com/@prism-ui/react@latest/dist/toast-vanilla.js"></script>

<!-- Include the styles -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@prism-ui/react@latest/dist/toast-vanilla.css"
/>
```

### Download

Download `toast-vanilla.js` and `toast-vanilla.css` and include them in your project:

```html
<script src="path/to/toast-vanilla.js"></script>
<link rel="stylesheet" href="path/to/toast-vanilla.css" />
```

## Quick Start

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/@prism-ui/react@latest/dist/toast-vanilla.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@prism-ui/react@latest/dist/toast-vanilla.css"
    />
  </head>
  <body>
    <button onclick="showToast()">Show Toast</button>

    <script>
      function showToast() {
        PrismToast.success("Success!", "Your changes have been saved.");
      }
    </script>
  </body>
</html>
```

## Usage

### Basic Types

```javascript
// Success
PrismToast.success("Success!", "Your changes have been saved.");

// Error
PrismToast.error("Error", "Something went wrong.");

// Info
PrismToast.info("Info", "Here is some information.");

// Warning
PrismToast.warning("Warning", "Please review your settings.");
```

### Advanced Options

```javascript
PrismToast.show({
  title: "File deleted",
  description: "Your file has been moved to trash.",
  type: "info",
  duration: 5000, // milliseconds (default: 5000)
  action: {
    label: "Undo",
    onClick: () => {
      console.log("Undo action");
    },
    closeOnClick: true, // Close toast after action (default: true)
  },
});
```

### Custom Duration

```javascript
// Quick toast (2 seconds)
PrismToast.show({
  title: "Quick message",
  type: "info",
  duration: 2000,
});

// Persistent toast (won't auto-dismiss)
PrismToast.show({
  title: "Important",
  type: "warning",
  duration: Infinity,
});
```

### Manual Dismiss

```javascript
// Save the toast ID
const toastId = PrismToast.info("Processing...", "Please wait.");

// Later, dismiss it manually
PrismToast.dismiss(toastId);
```

## API Reference

### Methods

#### `PrismToast.success(title, description)`

Shows a success toast.

#### `PrismToast.error(title, description)`

Shows an error toast.

#### `PrismToast.info(title, description)`

Shows an info toast.

#### `PrismToast.warning(title, description)`

Shows a warning toast.

#### `PrismToast.show(options)`

Shows a toast with full options.

**Options:**

- `title` (string, required) - Toast title
- `description` (string, optional) - Toast description
- `type` (string, default: 'info') - Toast type: 'success', 'error', 'info', 'warning'
- `duration` (number, default: 5000) - Auto-dismiss duration in milliseconds, use `Infinity` to disable
- `action` (object, optional) - Action button configuration
  - `label` (string) - Button text
  - `onClick` (function) - Click handler
  - `closeOnClick` (boolean, default: true) - Close toast after action

#### `PrismToast.dismiss(id)`

Dismisses a specific toast by ID.

## Styling

### Using CSS Variables

```css
[data-component="toast"] {
  --toast-bg: #18181b;
  --toast-border: #27272a;
  --toast-text: #fafafa;
  --toast-success: #22c55e;
  --toast-error: #ef4444;
  --toast-info: #3b82f6;
  --toast-warning: #f59e0b;
}
```

### Custom Styles

```css
/* Customize appearance */
[data-component="toast"] {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 20px;
}

[data-component="toast"][data-type="success"] {
  border-left: 4px solid #22c55e;
}

[data-part="title"] {
  font-size: 1rem;
  font-weight: 700;
}
```

### Position

The toast container is positioned at top-right by default. To change:

```css
[data-component="toaster"] {
  top: auto;
  bottom: 16px;
  left: 16px;
  right: auto;
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- IE11+ (with polyfills)

## Use Cases

Perfect for:

- 🌐 Static websites
- 📝 WordPress sites
- 🔧 PHP applications
- 📱 Landing pages
- 🎮 Games
- 🛠️ Admin panels
- Any project without React!

## Examples

Check out the [live demo](examples/toast-vanilla-demo.html) for interactive examples.

## License

MIT

---

Made with ❤️ by Prism UI Team
