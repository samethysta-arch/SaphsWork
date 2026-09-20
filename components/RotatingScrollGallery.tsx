"use client";

import { useEffect, useRef } from "react";

type GalleryItem = {
  title: string;
  image: string;
  alt: string;
};

const galleryItems: GalleryItem[] = [
  {
    title: "Route Overview",
    image: "/phone-screens/route-overview.png",
    alt: "Route overview screen with two stops and trip controls.",
  },
  {
    title: "Pick Up Passenger",
    image: "/phone-screens/pickup-passenger.png",
    alt: "Passenger pickup screen with map, fare, and arrival controls.",
  },
  {
    title: "Searching Bookings",
    image: "/phone-screens/searching-bookings.png",
    alt: "Home map screen searching for bookings with Turbo tips.",
  },
  {
    title: "AI Assistant",
    image: "/phone-screens/ai-assistant.png",
    alt: "AI Assistant message screen with suggested prompts.",
  },
  {
    title: "Safety Paused Modal",
    image: "/phone-screens/safety-paused-modal.png",
    alt: "Safety modal explaining bookings are paused during an alert.",
  },
  {
    title: "Go Online",
    image: "/phone-screens/go-online.png",
    alt: "Home screen with alert card, performance badge, and go online control.",
  },
  {
    title: "Deliver Order",
    image: "/phone-screens/deliver-order.png",
    alt: "Deliver order screen with customer details and delivery photo.",
  },
  {
    title: "Earned Rating",
    image: "/phone-screens/earned-rating.png",
    alt: "Earnings summary screen with rating prompt.",
  },
];

const rotations = [
  { x: 76, y: -22, z: 11 },
  { x: 62, y: 26, z: -9 },
  { x: 82, y: 14, z: 7 },
  { x: 68, y: -28, z: -12 },
];

export default function RotatingScrollGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const framesRef = useRef<Array<HTMLElement | null>>([]);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let mounted = true;
    let cleanup = () => {};

    async function initGallery() {
      const section = sectionRef.current;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!section || prefersReducedMotion) {
        section?.classList.add("is-reduced-motion");
        return;
      }

      const [{ gsap }, { ScrollTrigger }, lenisModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      if (!mounted) {
        return;
      }

      const Lenis = lenisModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.1,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const tickLenis = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickLenis);
      gsap.ticker.lagSmoothing(0);

      const frames = framesRef.current.filter(Boolean) as HTMLElement[];
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      let setWavePositions = () => {};

      const ctx = gsap.context(() => {
        setWavePositions = () => {
          const isCompact = window.innerWidth < 760;
          const amplitude = Math.min(window.innerWidth * 0.26, 320);

          frames.forEach((frame, index) => {
            const waveX = Math.sin(index * 0.92) * amplitude;
            const smallLift = Math.cos(index * 0.72) * 18;

            gsap.set(frame, {
              x: isCompact ? 0 : waveX,
              y: isCompact ? 0 : smallLift,
              force3D: true,
            });
          });
        };

        setWavePositions();

        cards.forEach((card, index) => {
          const frame = frames[index];
          const tilt = rotations[index % rotations.length];
          const isCompact = window.innerWidth < 760;
          const rotationScale = isCompact ? 0.46 : 1;
          const depthOut = isCompact ? -80 : -230;
          const depthIn = isCompact ? 28 : 120;

          gsap.set(card, {
            rotationX: tilt.x * rotationScale,
            rotationY: tilt.y * rotationScale,
            rotationZ: tilt.z * rotationScale,
            z: depthOut,
            scale: isCompact ? 0.98 : 0.92,
            filter: "blur(7px) brightness(0.66) saturate(0.82)",
            transformOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            force3D: true,
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: frame,
                start: "top bottom+=14%",
                end: "bottom top-=14%",
                scrub: 0.65,
                invalidateOnRefresh: true,
              },
            })
            .to(card, {
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
              z: depthIn,
              scale: 1,
              filter: "blur(0px) brightness(1.03) saturate(1.04)",
              ease: "none",
              duration: 0.52,
            })
            .to(card, {
              rotationX: -tilt.x * rotationScale,
              rotationY: -tilt.y * rotationScale,
              rotationZ: -tilt.z * rotationScale,
              z: depthOut,
              scale: isCompact ? 0.98 : 0.92,
              filter: "blur(7px) brightness(0.66) saturate(0.82)",
              ease: "none",
              duration: 0.48,
            });
        });

      }, section);

      const handleResize = () => {
        setWavePositions();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      cleanup = () => {
        window.removeEventListener("resize", handleResize);
        ctx.revert();
        gsap.ticker.remove(tickLenis);
        lenis.destroy();
      };
    }

    initGallery();

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="rotating-gallery"
      aria-label="Saphira Amethysta portfolio hero"
    >
      <div className="hero-overlay">
        <nav className="hero-nav" aria-label="Portfolio navigation">
          <a href="#home">
            Home <sup>01</sup>
          </a>
          <a href="#about">
            About <sup>02</sup>
          </a>
          <a className="hero-contact" href="#contact">
            <span aria-hidden="true">-&gt;</span>
            Get in touch
          </a>
        </nav>

        <div className="hero-copy">
          <p>2025/2026</p>
          <h1>Saphira Amethysta</h1>
        </div>
      </div>

      <div className="gallery-stage">
        <svg
          className="gallery-wave"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M50 0 C 2 96 98 176 50 292 C 6 400 96 500 50 612 C 6 722 96 820 50 1000" />
        </svg>

        {galleryItems.map((item, index) => (
          <figure
            className="gallery-frame"
            key={item.title}
            ref={(node) => {
              framesRef.current[index] = node;
            }}
          >
            <div
              className="gallery-card"
              ref={(node) => {
                cardsRef.current[index] = node;
              }}
            >
              <span className="gallery-card__button gallery-card__button--volume" />
              <span className="gallery-card__button gallery-card__button--action" />
              <span className="gallery-card__button gallery-card__button--power" />
              <div className="gallery-screen">
                <div className="gallery-screen__chrome" aria-hidden="true">
                  <span className="gallery-screen__island" />
                  <span className="gallery-screen__signal" />
                </div>
                <img src={item.image} alt={item.alt} loading="lazy" />
              </div>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
