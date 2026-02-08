import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "@prism-ui/react";
import { CartProvider, ThemeProvider } from "./store";
import App from "./App";
import "./styles.css";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <CartProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </CartProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>,
  );
}
