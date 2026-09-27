"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PixelLink from "./PixelLink";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

type Slide = {
  id: string;
  eyebrow?: string;
  title: string;
  body?: string;
  kind: "cover" | "origin" | "statement" | "gallery" | "library" | "workflow" | "install" | "learning" | "closing";
};

const slides: Slide[] = [
  { id: "cover", kind: "cover", title: "Dax Design Library", body: "A shared language for designing driver experiences" },
  { id: "origin", kind: "origin", eyebrow: "01 / Origin", title: "Where did this come from?", body: "Years of designing for drivers left us with a rich archive of decisions, patterns and lessons. Most of it lived across files and in people’s heads." },
  { id: "signals", kind: "gallery", eyebrow: "Field archive", title: "Built from the road, not the boardroom", body: "Real journeys, real trade-offs and real constraints became the source material for the library." },
  { id: "problem", kind: "statement", eyebrow: "The friction", title: "The work was reusable. Finding it wasn’t.", body: "Teams repeatedly searched for patterns, reconstructed context and solved familiar interface problems from scratch." },
  { id: "building", kind: "library", eyebrow: "02 / The library", title: "What are we building?", body: "A living collection of proven driver patterns, paired with the context that makes them useful." },
  { id: "system", kind: "gallery", eyebrow: "Inside the collection", title: "Patterns with a point of view", body: "Every entry connects UI, market context, research evidence and the design choices behind it." },
  { id: "use", kind: "workflow", eyebrow: "03 / In practice", title: "How do we use the library?", body: "Start with an existing pattern. Read the evidence. Adapt it to the journey. Contribute what the team learns next." },
  { id: "codex", kind: "workflow", eyebrow: "Design with agents", title: "How can you use it?", body: "The same knowledge can guide both designers and coding agents, turning shared decisions into working interfaces faster." },
  { id: "install", kind: "install", eyebrow: "Get started", title: "Install skills from the GitLab repo.", body: "Bring the library’s guidance into your local workflow, then invoke the skill when a driver pattern is relevant." },
  { id: "stress", kind: "gallery", eyebrow: "A working prototype", title: "Stress over fine tuning", body: "Since Codex builds each screen from scratch, every screen takes time to generate." },
  { id: "learned", kind: "learning", eyebrow: "04 / Retrospective", title: "What did we learn?", body: "The library becomes more valuable when it carries reasoning, not just polished components." },
  { id: "principles", kind: "learning", eyebrow: "What we learned", title: "Context is the reusable part", body: "Clear boundaries help agents. Examples build confidence. Teams still need room to make judgment calls." },
  { id: "close", kind: "closing", title: "Dax Design Library", body: "Built to help good driver experiences travel further." },
];

const imagery = [
  "/work-assets/hero/hero-car.png",
  "/work-assets/hero/hero-navigation.png",
  "/work-assets/hero/hero-rider.png",
  "/work-assets/dal/default-accept-offer.png",
  "/work-assets/dal/turbo-offer.png",
  "/work-assets/current-changes.png",
];

function Masthead() {
  return <header className="deck-masthead"><strong>Dax Design Library <span>/ Citadel</span></strong><span>FF Design Team</span><span>Sep ’26</span></header>;
}

function SlideArtwork({ slide }: { slide: Slide }) {
  if (slide.kind === "cover") return <div className="deck-folder-scene"><div className="deck-folder"><span>DAX</span></div><p>Open archive</p></div>;
  if (slide.kind === "origin") return <div className="deck-origin-art"><span className="orbit orbit-a">Research</span><span className="orbit orbit-b">Patterns</span><span className="orbit orbit-c">Markets</span><i/><i/><i/><div className="origin-core">DAX</div></div>;
  if (slide.kind === "gallery") return <div className="deck-gallery">{imagery.slice(slide.id === "stress" ? 3 : 0, slide.id === "stress" ? 6 : 4).map((image, index) => <figure key={image} className={`deck-photo deck-photo-${index + 1}`}><img src={asset(image)} alt="" /><span>{String(index + 1).padStart(2, "0")}</span></figure>)}</div>;
  if (slide.kind === "statement") return <div className="deck-fragments" aria-hidden="true"><span>Figma</span><span>Research</span><span>UI Kit</span><span>Markets</span><span>Decisions</span></div>;
  if (slide.kind === "library") return <div className="deck-library-art"><div className="shelf shelf-a"><img src={asset("/work-assets/dal/default-accept-offer.png")} alt=""/><span>Default accept</span></div><div className="shelf shelf-b"><img src={asset("/work-assets/dal/turbo-offer.png")} alt=""/><span>Turbo offers</span></div><div className="shelf shelf-c"><img src={asset("/work-assets/job-card-variants.png")} alt=""/><span>Job cards</span></div></div>;
  if (slide.kind === "workflow") return <div className="deck-workflow" aria-hidden="true"><div><b>01</b><span>Find</span></div><i/><div><b>02</b><span>Understand</span></div><i/><div><b>03</b><span>Adapt</span></div><i/><div><b>04</b><span>Contribute</span></div></div>;
  if (slide.kind === "install") return <div className="deck-terminal"><div className="terminal-bar"><i/><i/><i/><span>dax-library — install</span></div><code><em>$</em> git clone gitlab.com/ff-design/dax-library<br/><em>$</em> cd dax-library<br/><em>$</em> ./install-skill</code><div className="terminal-ready">✓ Dax skill ready</div></div>;
  if (slide.kind === "learning") return <div className="deck-learning-art"><div><strong>{slide.id === "learned" ? "01" : "03"}</strong><span>{slide.id === "learned" ? "Evidence before polish" : "Clear boundaries"}</span></div><div><strong>{slide.id === "learned" ? "02" : "04"}</strong><span>{slide.id === "learned" ? "Patterns need context" : "Room for judgment"}</span></div></div>;
  return <div className="deck-closing-mark"><div className="mini-folder"/><span>FF / 2026</span></div>;
}

export default function DeckExperience() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const locked = useRef(false);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, next));
    setActive((current) => {
      if (bounded === current) return current;
      setDirection(bounded > current ? 1 : -1);
      return bounded;
    });
  }, []);

  useEffect(() => {
    const index = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
    if (index >= 0) setActive(index);
  }, []);

  useEffect(() => {
    const hash = `#${slides[active].id}`;
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
  }, [active]);

  useEffect(() => {
    const onHash = () => {
      const index = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
      if (index >= 0) go(index);
    };
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(active + 1); }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) { event.preventDefault(); go(active - 1); }
      if (event.key === "Home") { event.preventDefault(); go(0); }
      if (event.key === "End") { event.preventDefault(); go(slides.length - 1); }
    };
    const onWheel = (event: WheelEvent) => {
      if (locked.current || Math.abs(event.deltaY) + Math.abs(event.deltaX) < 24) return;
      locked.current = true;
      go(active + (event.deltaY + event.deltaX > 0 ? 1 : -1));
      window.setTimeout(() => { locked.current = false; }, 720);
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => { window.removeEventListener("hashchange", onHash); window.removeEventListener("keydown", onKey); window.removeEventListener("wheel", onWheel); };
  }, [active, go]);

  const slide = slides[active];
  return <main className="deck-shell" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientY ?? null; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = touchStart.current - (event.changedTouches[0]?.clientY ?? touchStart.current); if (Math.abs(delta) > 48) go(active + (delta > 0 ? 1 : -1)); touchStart.current = null; }}>
    <Masthead />
    <PixelLink className="deck-home" href="/" aria-label="Return to portfolio"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5V20h-6v-6h-4v6H4z" /></svg></PixelLink>
    <section className={`deck-stage direction-${direction}`} aria-live="polite" aria-atomic="true">
      <article className={`deck-slide slide-${slide.kind}`} key={slide.id}>
        <div className="deck-copy">{slide.eyebrow && <span className="deck-eyebrow">{slide.eyebrow}</span>}<h1>{slide.title}</h1>{slide.body && <p>{slide.body}</p>}</div>
        <SlideArtwork slide={slide} />
      </article>
    </section>
    <nav className="deck-controls" aria-label="Slide navigation"><button onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous slide">←</button><span aria-label={`Slide ${active + 1} of ${slides.length}`}>{String(active + 1).padStart(2, "0")} <i/> {String(slides.length).padStart(2, "0")}</span><button onClick={() => go(active + 1)} disabled={active === slides.length - 1} aria-label="Next slide">→</button></nav>
    <button className="deck-restart" onClick={() => go(0)} aria-label="Restart deck">↺ <span>Restart</span></button>
    <div className="deck-progress" aria-hidden="true"><i style={{ transform: `scaleX(${(active + 1) / slides.length})` }} /></div>
  </main>;
}
