import { defineConfig } from "tsup";

export default defineConfig([
  // ESM and CJS builds for npm
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    outExtension({ format }) {
      return { js: format === "cjs" ? ".cjs" : ".js" };
    },
    dts: true,
    clean: true,
    sourcemap: true,
    target: "es2020",
    external: ["react", "react-dom"],
  },
  // UMD build for CDN usage (includes React as external global)
  {
    entry: ["src/index.ts"],
    format: ["iife"],
    outExtension() {
      return { js: ".global.js" };
    },
    globalName: "PrismUI",
    clean: false,
    sourcemap: true,
    target: "es2020",
    external: ["react", "react-dom"],
    // Map external deps to global variables
    footer: {
      js: "if (typeof window !== 'undefined') { window.PrismUI = PrismUI; }",
    },
  },
]);
