"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

const chapters = [
  { id: "overview", label: "Overview" },
  { id: "why-default-accept", label: "Why Default Accept" },
  { id: "goal", label: "Goal" },
  { id: "concept", label: "Concept" },
  { id: "research", label: "Research" },
  { id: "design", label: "Design" },
  { id: "impact", label: "Experiment impact" },
  { id: "evaluative-research", label: "Evaluative research" },
  { id: "whats-next", label: "What’s next" },
] as const;

type ChapterId = (typeof chapters)[number]["id"];

export default function CaseChapterNav() {
  const [active, setActive] = useState<ChapterId>("overview");
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      frame = 0;
      let current: ChapterId = "overview";
      const readingLine = Math.min(360, window.innerHeight * 0.42);
      for (const chapter of chapters) {
        const section = document.getElementById(chapter.id);
        if (section && section.getBoundingClientRect().top <= readingLine) current = chapter.id;
      }
      setActive(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const tabs = tabsRef.current;
    const selected = tabs?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!tabs || !selected) return;
    const tabBounds = selected.getBoundingClientRect();
    const scrollBounds = tabs.getBoundingClientRect();
    if (tabBounds.left < scrollBounds.left || tabBounds.right > scrollBounds.right) {
      tabs.scrollBy({
        left: tabBounds.left < scrollBounds.left
          ? tabBounds.left - scrollBounds.left
          : tabBounds.right - scrollBounds.right,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  }, [active]);

  const goToChapter = (event: MouseEvent<HTMLAnchorElement>, id: ChapterId) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const section = document.getElementById(id);
    if (!section) return;
    event.preventDefault();
    section.scrollIntoView({ behavior: "instant", block: "start" });
    window.history.pushState(null, "", `#${id}`);
    setActive(id);
  };

  return <div className="case-chapter-nav-position">
    <nav className="case-chapter-nav" aria-label="Case study chapters">
      <a className="case-chapter-back" href="/projects/">← <span>Projects</span></a>
      <span className="case-chapter-divider" aria-hidden="true" />
      <div className="case-chapter-tabs" ref={tabsRef}>
        {chapters.map(({ id, label }) => <a
          key={id}
          href={`#${id}`}
          title={label}
          aria-current={active === id ? "location" : undefined}
          className={active === id ? "is-active" : undefined}
          onClick={(event) => goToChapter(event, id)}
        ><span>{label}</span></a>)}
      </div>
    </nav>
  </div>;
}
