"use client";

import { useEffect } from "react";

export default function ScrollRevealObserver() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return;

    const pending = new Set(targets);
    const Observer = (window as unknown as { IntersectionObserver?: typeof IntersectionObserver }).IntersectionObserver;
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    const reveal = (target: HTMLElement) => {
      if (!pending.delete(target)) return;
      target.classList.add("is-revealed");
      observer?.unobserve(target);
    };

    targets.forEach((target) => {
      target.classList.add("scroll-reveal-ready");
    });

    if (Observer) {
      observer = new Observer((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        });
      }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });
      targets.forEach((target) => observer?.observe(target));
    } else {
      const update = () => {
        frame = 0;
        pending.forEach((target) => {
          const bounds = target.getBoundingClientRect();
          if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > window.innerHeight * 0.08) reveal(target);
        });
      };
      const scheduleUpdate = () => {
        if (!frame) frame = window.requestAnimationFrame(update);
      };
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate, { passive: true });
      update();
      return () => {
        observer?.disconnect();
        window.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", scheduleUpdate);
        if (frame) window.cancelAnimationFrame(frame);
        targets.forEach((target) => target.classList.remove("scroll-reveal-ready", "is-revealed"));
      };
    }

    return () => {
      observer?.disconnect();
      targets.forEach((target) => target.classList.remove("scroll-reveal-ready", "is-revealed"));
    };
  }, []);

  return null;
}
