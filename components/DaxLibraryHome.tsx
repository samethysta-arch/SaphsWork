"use client";

import { useEffect, useRef, useState } from "react";
import PixelLink from "./PixelLink";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const studies = [
  { label: "Order check", title: "Default Accept", image: "/work-assets/hero/hero-car.png", x: 8, y: 8, size: "small" },
  { label: "Journey navigation", title: "Pickup navigation", image: "/work-assets/hero/hero-navigation.png", x: 3, y: 47, size: "medium" },
  { label: "Proof of delivery", title: "Delivery evidence", image: "/work-assets/camera.png", x: 66, y: 18, size: "large" },
  { label: "Route planning", title: "Driver routes", image: "/work-assets/hero/hero-rider.png", x: 9, y: 76, size: "medium" },
  { label: "Driver offer", title: "Turbo offers", image: "/work-assets/dal/turbo-offer.png", x: 68, y: 70, size: "small" },
];

export default function DaxLibraryHome() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    const onWheel = (event: WheelEvent) => {
      setPosition((p) => ({ x: p.x - event.deltaX * 0.18, y: p.y - event.deltaY * 0.18 }));
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [open]);

  function pointerDown(event: React.PointerEvent<HTMLElement>) {
    if (!open) return;
    drag.current = { x: event.clientX, y: event.clientY, px: position.x, py: position.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function pointerMove(event: React.PointerEvent<HTMLElement>) {
    if (!drag.current) return;
    setPosition({ x: drag.current.px + event.clientX - drag.current.x, y: drag.current.py + event.clientY - drag.current.y });
  }
  function pointerUp() { drag.current = null; }

  return <main className={`dax-library ${open ? "is-open" : ""}`} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
    <header className="dax-masthead"><strong>Dax Design Library <span>/ Citadel</span></strong><span>FF Design Team</span><span>Sep ’26</span></header>
    {!open && <section className="dax-intro" aria-labelledby="dax-title"><h1 id="dax-title" className="sr-only">Dax Design Library</h1><button className="finder-folder" onClick={() => setOpen(true)} aria-label="Open Dax Design Library"><img src={asset("/work-assets/dal/folder.svg")} alt="" /><span>Open library</span></button><p>Click to open</p></section>}
    <section className="dax-canvas" aria-hidden={!open} style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}>
      <div className="dax-grid" /><div className="canvas-title"><span>Dax Design</span><strong>Library</strong></div><time>September<br/><b>2026</b></time>
      <div className="origin-copy"><span>Built from the road, not the boardroom.</span><h2>Where did this come from?</h2></div><div className="study-connections" aria-hidden="true"><i/><i/><i/><i/></div>
      {studies.map((study, index) => <article className={`study-node study-${study.size}`} style={{ left: `${study.x}%`, top: `${study.y}%` }} key={study.title}><span>{study.label}</span><PixelLink href="/work" aria-label={`Read ${study.title} case study`}><img src={asset(study.image)} alt="" draggable={false} /><b>{String(index + 1).padStart(2, "0")}</b><em>{study.title}</em></PixelLink></article>)}
      <button className="canvas-folder" onClick={() => setOpen(false)} aria-label="Close Dax Design Library"><img src={asset("/work-assets/dal/folder.svg")} alt="" /></button>
    </section>
    <div className="dax-instructions" aria-live="polite">{open ? "Scroll to explore · Drag the canvas · Select a study" : "A field archive of driver experience work"}</div>
  </main>;
}
