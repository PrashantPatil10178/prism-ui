import { type ReactNode } from "react";

export default function DocSection({ children }: { children: ReactNode }) {
  return <section className="page-section">{children}</section>;
}
