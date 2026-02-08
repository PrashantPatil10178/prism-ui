import { Link, useLocation } from "react-router-dom";
import { Button } from "@prism-ui/react";
import { useCart, useTheme, type ThemeColor } from "./store";

const themeColors: { id: ThemeColor; label: string; swatch: string }[] = [
  { id: "zinc", label: "Zinc", swatch: "#71717a" },
  { id: "rose", label: "Rose", swatch: "#f43f5e" },
  { id: "blue", label: "Blue", swatch: "#3b82f6" },
  { id: "green", label: "Green", swatch: "#22c55e" },
  { id: "orange", label: "Orange", swatch: "#f97316" },
];

export default function Header() {
  const { count } = useCart();
  const { color, mode, setColor, toggleMode } = useTheme();
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span>PrismStore</span>
        </Link>

        <nav className="header-nav">
          <Link
            to="/"
            className={`header-link${location.pathname === "/" ? " active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`header-link${location.pathname.startsWith("/products") ? " active" : ""}`}
          >
            Shop
          </Link>
        </nav>

        <div className="header-actions">
          {/* Theme color swatches */}
          <div className="theme-swatches">
            {themeColors.map((t) => (
              <button
                key={t.id}
                className={`theme-swatch${color === t.id ? " active" : ""}`}
                style={{ background: t.swatch }}
                onClick={() => setColor(t.id)}
                title={t.label}
                aria-label={`Theme: ${t.label}`}
              />
            ))}
          </div>

          {/* Dark / Light toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMode}
            aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          >
            {mode === "dark" ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </Button>

          {/* Cart */}
          <Link to="/cart" className="header-cart">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            PrismStore
          </div>
          <p>An e-commerce demo built with Prism UI headless components.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Shop</h4>
            <Link to="/products">All Products</Link>
            <Link to="/products?cat=clothing">Clothing</Link>
            <Link to="/products?cat=electronics">Electronics</Link>
            <Link to="/products?cat=accessories">Accessories</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2026 PrismStore. Built with <strong>@prism-ui/react</strong>
        </p>
      </div>
    </footer>
  );
}
