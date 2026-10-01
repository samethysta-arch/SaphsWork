"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PixelLink from "./PixelLink";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path.startsWith("/deck-assets/") ? `/Asset%20Citadel/${path.slice("/deck-assets/".length)}` : path}`;

type SlideKind =
  | "cover" | "archive" | "section" | "people" | "challenge" | "media"
  | "compare" | "impact" | "install" | "workshop" | "phones" | "collage"
  | "review" | "loop" | "learning" | "context" | "closing";

type Slide = {
  id: string;
  kind: SlideKind;
  section: string;
  title?: string;
  body?: string;
  media?: string;
  mediaAlt?: string;
  focus?: number;
  sectionIndex?: number;
  sectionFrom?: number;
};

const slides: Slide[] = [
  { id: "cover", kind: "cover", section: "Introduction" },
  { id: "archive", kind: "archive", section: "Introduction", title: "Dax Design Library", body: "Sep 2026" },
  { id: "where", kind: "section", section: "Where did this come from?", title: "Where did this come from?", sectionIndex: 0 },
  { id: "two-designers", kind: "people", section: "Where did this come from?", title: "I was starting without knowing anything." },
  { id: "burn-credits", kind: "challenge", section: "Where did this come from?", title: "Burn Credits", body: "Then we repeat the same process for every project.", focus: 0 },
  { id: "fine-tuning", kind: "challenge", section: "Where did this come from?", title: "Stress over fine tuning", body: "After prompting, we still need to fine-tune the output, update the assets, and wire the screens manually.", focus: 1 },
  { id: "time", kind: "challenge", section: "Where did this come from?", title: "Time", body: "Since Codex builds each screen from scratch, every screen takes time to generate.", focus: 2 },
  { id: "building", kind: "section", section: "What are we building?", title: "What are we building?", sectionIndex: 1, sectionFrom: 0 },
  { id: "retrieve", kind: "media", section: "What are we building?", title: "What if we could search an entire library?", body: "Prompt the screens to retrieve", media: "/deck-assets/Prompt.svg", mediaAlt: "A code prompt requesting existing DAX screens" },
  { id: "ready", kind: "media", section: "What are we building?", title: "Wait less than 2 mins for a ready-to-use prototype", body: "The library retrieves a proven journey instead of rebuilding every screen.", media: "/deck-assets/Part 2-1.gif", mediaAlt: "Codex retrieving screens from the DAX library" },
  { id: "comparison", kind: "compare", section: "What are we building?", title: "Result with the same intent to create Homescreen, Offer, and Pickup" },
  { id: "impact", kind: "impact", section: "What are we building?", title: "A reusable product substrate" },
  { id: "start", kind: "section", section: "How to start?", title: "How to start?", sectionIndex: 2, sectionFrom: 1 },
  { id: "install", kind: "install", section: "How to start?", title: "Install the library once. Retrieve the right journey whenever you need it." },
  { id: "atlas", kind: "media", section: "How to start?", title: "Find all the prototypes from the driver app.", body: "The same skill can be used from the tools where the team already works.", media: "/deck-assets/Part 3-1.gif", mediaAlt: "DAX library integrated into the team workflow" },
  { id: "use", kind: "section", section: "How do we use this library?", title: "How do we use the library?", sectionIndex: 3, sectionFrom: 2 },
  { id: "non-designer", kind: "section", section: "How non-designers use the library", title: "How non-designers use the library", sectionIndex: 3, sectionFrom: 2 },
  { id: "masterclass", kind: "workshop", section: "How non-designers use the library", title: "Our first Vibecoding Prototyping Masterclass is officially wrapped!" },
  { id: "journey", kind: "phones", section: "How non-designers use the library", title: "Some of the result from stakeholder" },
  { id: "workbench", kind: "collage", section: "How non-designers use the library", title: "Build, compare, and refine in context" },
  { id: "post-workshop", kind: "collage", section: "How non-designers use the library", title: "What happened post-workshop?", body: "Teams kept using the library as a starting point for new experiments." },
  { id: "designer-divider", kind: "section", section: "How designers use the library", title: "How designers use the library", sectionIndex: 3, sectionFrom: 2 },
  { id: "designer", kind: "review", section: "How designers use the library", title: "Quick review" },
  { id: "bundle", kind: "media", section: "How designers use the library", title: "Build a demo bundle or contribute to the library", body: "Designers curate the blueprint and keep the retrieval context useful.", media: "/deck-assets/Part 3-1.gif", mediaAlt: "Designer reviewing DAX library screens" },
  { id: "prototype", kind: "media", section: "How designers use the library", title: "Demo in real phone", body: "Retrieved journeys stay testable across code, device, and design.", media: "/deck-assets/Part 3-2.gif", mediaAlt: "DAX prototype running on a real phone" },
  { id: "bridge", kind: "loop", section: "How designers use the library", title: "design hub", body: "design studio" },
  { id: "developer-one", kind: "media", section: "How designers use the library", title: "Retrieve the journey into the coding workspace", media: "/deck-assets/Part 2-2.gif", mediaAlt: "Code workspace showing retrieved screens" },
  { id: "developer-two", kind: "media", section: "How designers use the library", title: "Adapt the screens without losing their context", media: "/deck-assets/Part 2-3.gif", mediaAlt: "Code workspace adapting a DAX screen" },
  { id: "developer-three", kind: "media", section: "How designers use the library", title: "Keep the prototype and blueprint connected", media: "/deck-assets/Part 2-4.gif", mediaAlt: "Code workspace and DAX prototype" },
  { id: "learn", kind: "section", section: "What did we learn?", title: "What did we learn?", sectionIndex: 4, sectionFrom: 3 },
  { id: "lessons", kind: "learning", section: "What did we learn?", title: "What did we learn?" },
  { id: "context", kind: "context", section: "What did we learn?", title: "The workflow works when the agent understands the product context." },
  { id: "close", kind: "closing", section: "Closing", title: "Would love to hear your thoughts!" },
];

const sectionLabels = ["Where did this come from?", "What are we building?", "How to start?", "How do we use the library?", "What did we learn?"];

function Masthead() {
  return <header className="citadel-masthead"><strong>Dax Design Library / Citadel</strong><span>FF Design Team</span><span>Sep ‘26</span></header>;
}

function SectionWheel({ active = 0, from = active }: { active?: number; from?: number }) {
  return <div className={`citadel-wheel wheel-${active}`} aria-hidden="true"><div className="wheel-folder"><img src={asset("/deck-assets/Folder.svg")} alt="" /></div><div className="wheel-labels" style={{ "--wheel-from": from } as React.CSSProperties}>{sectionLabels.map((label, index) => <span className={index === active ? "is-active" : ""} key={label} style={{ "--wheel-i": index } as React.CSSProperties}>{label}</span>)}</div></div>;
}

function ChallengeCards({ focus = 0 }: { focus?: number }) {
  const cards = [
    { title: "Burn Credits", body: "Then we repeat the same process for every project.", media: "/deck-assets/Reason 1.svg" },
    { title: "Stress over fine tuning", body: "After prompting, we still need to fine-tune the output, update the assets, and wire the screens manually.", media: "/deck-assets/Reason 2.gif" },
    { title: "Time", body: "Since Codex builds each screen from scratch, every screen takes time to generate.", media: "/deck-assets/Reason 3.svg" },
  ];
  return <div className="citadel-challenges" style={{ "--challenge-focus": focus } as React.CSSProperties}>{cards.map((card, index) => <article className={index === focus ? "is-focus" : ""} key={card.title}><img src={asset(card.media)} alt="" /><h2>{card.title}</h2><p>{card.body}</p>{index === 2 && focus === 2 && <span className="time-panic">😱</span>}</article>)}</div>;
}

function MediaSlide({ slide }: { slide: Slide }) {
  return <div className="citadel-media-layout"><div className="citadel-media-copy"><span>{slide.section}</span><h1>{slide.title}</h1>{slide.body && <p>{slide.body}</p>}</div><figure className="citadel-media"><img src={asset(slide.media!)} alt={slide.mediaAlt ?? ""} /></figure></div>;
}

function SlideContent({ slide, onAdvance }: { slide: Slide; onAdvance: () => void }) {
  if (slide.kind === "cover") return <div className="citadel-cover" data-node-id="1:4397"><button className="cover-folder-button" onClick={onAdvance} aria-label="Open the Dax Design Library archive"><img className="cover-folder" src={asset("/deck-assets/Folder.svg")} alt="Blue Finder folder" /></button><span>Tap the folder to open the archive</span></div>;
  if (slide.kind === "archive") return <div className="citadel-archive" data-node-id="1:4405"><div className="archive-grid" /><h1>Dax<br/><strong>Design Library</strong></h1><time>Sep<br/><strong>2026</strong></time><img className="archive-folder" src={asset("/deck-assets/Folder.svg")} alt="" />{["/deck-assets/Reason 1.svg", "/deck-assets/Workshop 1.svg", "/deck-assets/W2.svg", "/deck-assets/Part 3-1.gif", "/deck-assets/Reason 3.svg"].map((src, index) => <img className={`archive-card archive-card-${index + 1}`} src={asset(src)} alt="" key={src} />)}<div className="archive-lines" aria-hidden="true"><i/><i/><i/><i/><i/></div></div>;
  if (slide.kind === "section") return <div className="citadel-section"><div className="section-carousel-title">{slide.sectionFrom !== undefined && <span>{sectionLabels[slide.sectionFrom]}</span>}<h1>{slide.title}</h1></div><SectionWheel active={slide.sectionIndex} from={slide.sectionFrom} /></div>;
  if (slide.kind === "people") return <div className="citadel-people"><h1>{slide.title}</h1><div aria-hidden="true"><span>👩🏻</span><span>👩🏻‍💻</span></div></div>;
  if (slide.kind === "challenge") return <ChallengeCards focus={slide.focus} />;
  if (slide.kind === "media") return <MediaSlide slide={slide} />;
  if (slide.kind === "compare") return <div className="citadel-compare"><figure><img src={asset("/deck-assets/Part 2-2.gif")} alt="Previously generated prototype"/><figcaption>Previously</figcaption></figure><h1>{slide.title}</h1><figure><img src={asset("/deck-assets/Part 2-1.gif")} alt="Prototype retrieved with the DAX design library"/><figcaption><b>↯</b> With dax-design-library</figcaption></figure></div>;
  if (slide.kind === "impact") return <div className="citadel-impact"><div><strong>11.3x</strong><h2>Faster</h2><p>One prompt generated the full DAX journey and can be reused for other projects.</p></div><div><strong>70 - 85%</strong><h2>Cheaper</h2><p>Prototype assembly uses far fewer Codex credits than rebuilding from blank.</p></div><div><strong>0 setup</strong><h2>Accessible</h2><p>Works even when the user does not have Figma MCP or Figma access.</p></div></div>;
  if (slide.kind === "install") return <div className="citadel-install"><h1>{slide.title}</h1><div className="install-steps"><article><span>1</span><img src={asset("/deck-assets/Prompt.svg")} alt="Installation prompt"/><p>Install skills from the GitLab repo.</p></article><article><span>2</span><img src={asset("/deck-assets/Part 2-1.gif")} alt="Screen retrieval command"/><p>Use <b>$find-screen-by-journey</b> to retrieve an existing prototype.</p></article><article><span>3</span><img src={asset("/deck-assets/Part 3-1.gif")} alt="DAX library demo"/><p>Open the demo and documentation to see what is available.</p></article></div></div>;
  if (slide.kind === "workshop") return <div className="citadel-workshop"><h1>{slide.title}</h1><div className="workshop-grid"><img src={asset("/deck-assets/Workshop.gif")} alt="Vibecoding masterclass"/><article><img src={asset("/deck-assets/Workshop 1.svg")} alt="Workshop exercise"/><p>Find and pull Homescreen, and Earnings from the Library.</p></article><article><img src={asset("/deck-assets/Workshop 2.svg")} alt="Duxtonized empty screen"/><p>Make sure to Duxtonize the Empty screen.</p></article></div></div>;
  if (slide.kind === "phones") return <div className="citadel-phones"><h1>{slide.title}</h1>{["/deck-assets/W1.svg", "/deck-assets/W2.svg", "/deck-assets/W3.svg", "/deck-assets/W4.svg"].map((src, index) => <img src={asset(src)} alt="Workshop prototype" key={src} style={{ "--phone-i": index } as React.CSSProperties}/>)}</div>;
  if (slide.kind === "collage") return <div className="citadel-collage"><h1>{slide.title}</h1>{slide.body && <p>{slide.body}</p>}<img src={asset("/deck-assets/Part 2-1.gif")} alt="Codex prompt"/><img src={asset("/deck-assets/Part 2-2.gif")} alt="DAX prototype"/><img src={asset("/deck-assets/Part 2-3.gif")} alt="Prototype iteration"/><img src={asset("/deck-assets/Part 2-4.gif")} alt="Prototype result"/></div>;
  if (slide.kind === "review") return <div className="citadel-review"><h1>Quick review</h1><div><article><b>01</b><h2>Find</h2><p>Start from the journey and screen you need.</p></article><article><b>02</b><h2>Retrieve</h2><p>Pull the existing product blueprint into your tool.</p></article><article><b>03</b><h2>Adapt</h2><p>Use the context, then shape it for the new problem.</p></article></div></div>;
  if (slide.kind === "loop") return <div className="citadel-loop"><span>design hub</span><i/><strong>H</strong><i/><span>design studio</span><small>one design library</small></div>;
  if (slide.kind === "learning") return <div className="citadel-learning"><article><b>01</b><h2>Start before you are certain it will be valuable</h2><p>Prototypes made the opportunity tangible and gave the team something concrete to improve.</p></article><article><b>02</b><h2>Have control of the product blueprint</h2><p>Know how the AI workflow runs inside your product and keep the source knowledge intentional.</p></article><article><b>03</b><h2>Our product doesn’t have to be the destination</h2><p>It can be the substrate—reusable context that helps many tools produce better outcomes.</p></article></div>;
  if (slide.kind === "context") return <div className="citadel-context"><figure><img src={asset("/deck-assets/Reason 2.gif")} alt="Codex working with DAX context"/></figure><figure><img src={asset("/deck-assets/Part 3-2.gif")} alt="Driver app prototype"/></figure><svg viewBox="0 0 520 260" aria-hidden="true"><path d="M28 182C119 63 237 46 351 84c63 21 91 68 131 137"/><path d="m456 202 26 19-4-34"/></svg><p>understand driver app context</p></div>;
  return <div className="citadel-closing"><div><span>👋</span><h1>{slide.title}</h1><a href="mailto:saphira.amethysta@gmail.com">Share feedback ↗</a></div><img src={asset("/deck-assets/Part 3-1.gif")} alt="DAX Design Library on a phone"/></div>;
}

export default function DeckExperience() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const locked = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const go = useCallback((next: number) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, next));
    setActive((current) => { if (bounded === current) return current; setDirection(bounded > current ? 1 : -1); return bounded; });
  }, []);
  useEffect(() => { const index = slides.findIndex((slide) => `#${slide.id}` === window.location.hash); if (index >= 0) setActive(index); }, []);
  useEffect(() => { const hash = `#${slides[active].id}`; if (window.location.hash !== hash) window.history.replaceState(null, "", hash); }, [active]);
  useEffect(() => {
    const onHash = () => { const index = slides.findIndex((slide) => `#${slide.id}` === window.location.hash); if (index >= 0) go(index); };
    const onKey = (event: KeyboardEvent) => { if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(active + 1); } if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) { event.preventDefault(); go(active - 1); } if (event.key === "Home") { event.preventDefault(); go(0); } if (event.key === "End") { event.preventDefault(); go(slides.length - 1); } };
    const onWheel = (event: WheelEvent) => { const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX; if (locked.current || Math.abs(delta) < 28) return; locked.current = true; go(active + (delta > 0 ? 1 : -1)); window.setTimeout(() => { locked.current = false; }, 760); };
    window.addEventListener("hashchange", onHash); window.addEventListener("keydown", onKey); window.addEventListener("wheel", onWheel, { passive: true });
    return () => { window.removeEventListener("hashchange", onHash); window.removeEventListener("keydown", onKey); window.removeEventListener("wheel", onWheel); };
  }, [active, go]);
  const slide = slides[active];
  return <main className="deck-shell citadel-deck" onTouchStart={(event) => { const touch = event.touches[0]; touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null; }} onTouchEnd={(event) => { const start = touchStart.current; const touch = event.changedTouches[0]; if (!start || !touch) return; const x = start.x - touch.clientX; const y = start.y - touch.clientY; const delta = Math.abs(x) > Math.abs(y) ? x : y; if (Math.abs(delta) > 48) go(active + (delta > 0 ? 1 : -1)); touchStart.current = null; }}>
    <Masthead />
    <PixelLink className="deck-home" href="/" aria-label="Return to portfolio"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5V20h-6v-6h-4v6H4z" /></svg></PixelLink>
    <section className={`deck-stage citadel-stage direction-${direction}`} aria-live="polite" aria-atomic="true"><article className={`citadel-slide citadel-${slide.kind}`} key={slide.id} aria-label={`${slide.section}: ${slide.title ?? "Dax Design Library"}`}><SlideContent slide={slide} onAdvance={() => go(active + 1)} /></article></section>
    <nav className="deck-controls" aria-label="Slide navigation"><button onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous slide">←</button><span aria-label={`Slide ${active + 1} of ${slides.length}`}>{String(active + 1).padStart(2, "0")} <i/> {String(slides.length).padStart(2, "0")}</span><button onClick={() => go(active + 1)} disabled={active === slides.length - 1} aria-label="Next slide">→</button></nav>
    <button className="deck-restart" onClick={() => go(0)} aria-label="Restart deck">↺ <span>Restart</span></button>
    <div className="deck-progress" role="progressbar" aria-label="Deck progress" aria-valuemin={1} aria-valuemax={slides.length} aria-valuenow={active + 1}><i style={{ transform: `scaleX(${(active + 1) / slides.length})` }} /></div>
  </main>;
}
