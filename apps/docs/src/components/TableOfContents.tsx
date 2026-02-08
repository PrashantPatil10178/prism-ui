import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const pageContainer = document.querySelector(".page-container");
    if (!pageContainer) return;

    const headingElements = pageContainer.querySelectorAll("h2, h3");
    const items: TocItem[] = [];

    headingElements.forEach((heading) => {
      if (!heading.id) {
        // Generate ID from text
        heading.id =
          heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || "";
      }

      items.push({
        id: heading.id,
        title: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
      });
    });

    setHeadings(items);

    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" },
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="toc">
      <div className="toc-title">On This Page</div>
      <nav className="toc-nav">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`toc-link${heading.level === 3 ? " toc-link-sub" : ""}${
              activeId === heading.id ? " toc-link-active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {heading.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
