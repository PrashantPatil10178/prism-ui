import { defineConfig } from "tsup";
import { copyFileSync } from "fs";
import { resolve } from "path";

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
    onSuccess: async () => {
      // Copy CSS and vanilla JS files to dist
      try {
        copyFileSync(resolve("src/prism-ui.css"), resolve("dist/prism-ui.css"));
        copyFileSync(resolve("src/prism-ui.js"), resolve("dist/prism-ui.js"));
        copyFileSync(
          resolve("src/toast/toast-vanilla.css"),
          resolve("dist/toast-vanilla.css"),
        );
        copyFileSync(
          resolve("src/toast/toast-vanilla.js"),
          resolve("dist/toast-vanilla.js"),
        );
        // Copy CSS type declarations
        copyFileSync(
          resolve("prism-ui.css.d.ts"),
          resolve("dist/prism-ui.css.d.ts"),
        );
        copyFileSync(
          resolve("toast-vanilla.css.d.ts"),
          resolve("dist/toast-vanilla.css.d.ts"),
        );
        console.log(
          "✅ CSS + vanilla JS files + type declarations copied to dist",
        );
      } catch (error) {
        console.error("❌ Error copying files:", error);
      }
    },
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
