"use client";

import { useEffect, useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const layers = [
  { src: "hero-navigation.png", alt: "Navigation screen", className: "h1", depth: 11 },
  { src: "hero-manual.png", alt: "Manual accept screen", className: "h2", depth: 18 },
  { src: "hero-rider.png", alt: "Driver partner", className: "h3", depth: 9 },
  { src: "hero-drivers.png", alt: "Drivers beside a motorcycle", className: "h4", depth: 15 },
  { src: "hero-rear.png", alt: "Driver on the road", className: "h5", depth: 12 },
  { src: "hero-car.png", alt: "Job card in a car", className: "h6", depth: 20 },
  { src: "hero-dashboard.png", alt: "Driver app dashboard", className: "h7", depth: 14 },
];

export default function InteractiveCaseHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const items = Array.from(hero.querySelectorAll<HTMLElement>("[data-parallax-depth]"));
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    let frame = 0;
    let active = true;

    const render = () => {
      if (active) {
        velocity.x = (velocity.x + (target.x - current.x) * 0.055) * 0.78;
        velocity.y = (velocity.y + (target.y - current.y) * 0.055) * 0.78;
        current.x += velocity.x;
        current.y += velocity.y;
        items.forEach((item) => {
          const depth = Number(item.dataset.parallaxDepth ?? 0);
          item.style.transform = `translate3d(${current.x * depth}px, ${current.y * depth}px, 0)`;
        });
      }
      frame = active ? window.requestAnimationFrame(render) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      target.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      target.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    const onPointerLeave = () => { target.x = 0; target.y = 0; };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      hero.classList.toggle("motion-paused", !active);
      if (active && !frame) frame = window.requestAnimationFrame(render);
    }, { threshold: 0.01 });

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    observer.observe(hero);
    frame = window.requestAnimationFrame(render);

    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <section ref={heroRef} className="study-hero" aria-labelledby="case-title">
    <div className="hero-collage" aria-hidden="true">
      {layers.map(({ src, alt, className, depth }) => <div key={src} className={`hero-layer ${className}`} data-parallax-depth={depth}>
        <img src={`${basePath}/work-assets/hero/${src}`} alt={alt} />
      </div>)}
    </div>
    <h1 id="case-title">Default Accept</h1>
    <span className="study-rule" />
    <p>Booking experience design</p>
    <img className="hero-actions" src={`${basePath}/work-assets/skip-continue.png`} alt="Skip and continue actions" />
  </section>;
}
