import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Introduction from "./pages/Introduction.tsx";
import Theming from "./pages/Theming.tsx";
import ButtonDocs from "./pages/Button.docs.tsx";
import CardDocs from "./pages/Card.docs.tsx";
import DialogDocs from "./pages/Dialog.docs.tsx";
import InputDocs from "./pages/Input.docs.tsx";
import TabsDocs from "./pages/Tabs.docs.tsx";
import ToastDocs from "./pages/Toast.docs.tsx";
import UpgradeGuide from "./pages/Upgrade.tsx";
import Versioning from "./pages/Versioning.tsx";
import TableOfContents from "./components/TableOfContents.tsx";

const gettingStarted = [
  { to: "/", label: "Introduction", end: true },
  { to: "/theming", label: "Theming" },
];

const components = [
  { to: "/button", label: "Button" },
  { to: "/card", label: "Card" },
  { to: "/dialog", label: "Dialog" },
  { to: "/input", label: "Input" },
  { to: "/tabs", label: "Tabs" },
  { to: "/toast", label: "Toast" },
];

const maintenance = [
  { to: "/versioning", label: "Versioning" },
  { to: "/upgrade", label: "Upgrade Guide" },
];

function SidebarSection({
  label,
  items,
}: {
  label: string;
  items: { to: string; label: string; end?: boolean }[];
}) {
  return (
    <>
      <div className="sidebar-section-label">{label}</div>
      <nav>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className={isLanding ? "landing-layout" : "layout"}>
      {!isLanding && (
        <aside className="sidebar">
          <h2>
            <NavLink
              to="/"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <svg
                width="16"
                height="16"
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
            </NavLink>
          </h2>
          <SidebarSection label="Getting Started" items={gettingStarted} />
          <SidebarSection label="Components" items={components} />
          <SidebarSection label="Maintenance" items={maintenance} />
        </aside>
      )}
      <main className={isLanding ? "landing-content" : "content"}>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/theming" element={<Theming />} />
          <Route path="/button" element={<ButtonDocs />} />
          <Route path="/card" element={<CardDocs />} />
          <Route path="/dialog" element={<DialogDocs />} />
          <Route path="/input" element={<InputDocs />} />
          <Route path="/tabs" element={<TabsDocs />} />
          <Route path="/toast" element={<ToastDocs />} />
          <Route path="/versioning" element={<Versioning />} />
          <Route path="/upgrade" element={<UpgradeGuide />} />
        </Routes>
      </main>
      {!isLanding && <TableOfContents />}
    </div>
  );
}
