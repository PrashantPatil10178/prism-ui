import { Link } from "react-router-dom";

export default function Introduction() {
  return (
    <>
      <div className="landing-grid-bg" />

      <nav className="landing-navbar">
        <div className="landing-logo">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          prism/ui
        </div>
        <div className="landing-nav-links">
          <Link to="/button" className="landing-nav-link">
            Docs
          </Link>
          <Link to="/button" className="landing-nav-link">
            Components
          </Link>
          <Link to="/theming" className="landing-nav-link">
            Theming
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-nav-link"
          >
            GitHub
          </a>
        </div>
        <Link to="/button" className="landing-btn-primary">
          Get Started
        </Link>
      </nav>

      <section className="landing-hero">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "9999px",
            background: "#09090b",
            border: "1px solid #27272a",
            color: "#a1a1aa",
            fontSize: "0.85rem",
            fontWeight: 500,
            cursor: "default",
            zIndex: 10,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Powering Headless Design
        </div>

        <h1 className="landing-title" style={{ marginTop: "32px" }}>
          Build your component library.
          <br />
          <span style={{ color: "#71717a" }}>Not your styling opinions.</span>
        </h1>

        <p className="landing-subtitle">
          Beautifully accessible, headless React components. Drop into any
          project with zero CSS opinions. You own every pixel.
        </p>

        <div className="landing-actions">
          <Link to="/button" className="landing-action-btn action-btn-light">
            Get Started
          </Link>
          <div className="landing-action-btn action-btn-dark">
            npx @prism-ui/react init
          </div>
        </div>

        <div className="landing-terminal-wrapper">
          <div className="landing-terminal">
            <div className="terminal-header">
              <div className="terminal-dot dot-red" />
              <div className="terminal-dot dot-yellow" />
              <div className="terminal-dot dot-green" />
              <div className="terminal-title">~/my-app</div>
            </div>
            <div className="terminal-body">
              <span className="t-line">
                <span className="t-muted">$</span> pnpm add @prism-ui/react
              </span>
              <span className="t-line">
                <span className="t-green">✔</span> Added 1 package in 320ms
              </span>
              <span className="t-line">&nbsp;</span>
              <span className="t-line">
                <span className="t-blue">import</span>
                {" { Button, Card, Dialog } "}
                <span className="t-blue">from</span>
                {" '@prism-ui/react'"}
              </span>
              <span className="t-line">&nbsp;</span>
              <span className="t-line">
                <span className="t-muted">{"// "}</span>
                <span className="t-muted">Zero CSS. Full control.</span>
              </span>
              <span className="t-line">
                {"<"}
                <span className="t-blue">Button</span>{" "}
                <span className="t-yellow">variant</span>
                {'="primary"'} <span className="t-yellow">size</span>
                {'="md"'}
                {">"}
              </span>
              <span className="t-line">{"  Ship It"}</span>
              <span className="t-line">
                {"</"}
                <span className="t-blue">Button</span>
                {">"}
              </span>
              <span className="t-line">&nbsp;</span>
              <span className="t-line">
                <span className="t-muted">$</span> _
                <span className="t-cursor" />
              </span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="landing-features">
          <div className="landing-feature-card">
            <div className="landing-feature-icon">🎯</div>
            <div className="landing-feature-title">Truly Headless</div>
            <div className="landing-feature-desc">
              Zero CSS shipped. Components expose behavior and structure — you
              bring the design.
            </div>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">♿</div>
            <div className="landing-feature-title">Accessible</div>
            <div className="landing-feature-desc">
              WCAG 2.1 AA compliant. Keyboard navigation, ARIA roles, and screen
              reader support built in.
            </div>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">🎨</div>
            <div className="landing-feature-title">Multi-Theme</div>
            <div className="landing-feature-desc">
              One library, infinite themes. Switch brands with CSS variables —
              no library changes needed.
            </div>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">📦</div>
            <div className="landing-feature-title">Tree Shakeable</div>
            <div className="landing-feature-desc">
              Import only what you use. ESM and CJS builds with full TypeScript
              declarations.
            </div>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">🔌</div>
            <div className="landing-feature-title">Composable</div>
            <div className="landing-feature-desc">
              Polymorphic <code>as</code> prop, slots, and data attributes.
              Build anything on top.
            </div>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">⚡</div>
            <div className="landing-feature-title">Lightweight</div>
            <div className="landing-feature-desc">
              Zero runtime dependencies. Only React as a peer dependency.
              Production-ready.
            </div>
          </div>
        </div>

        <div className="landing-footer">
          Built with precision. MIT Licensed.
        </div>
      </section>
    </>
  );
}
