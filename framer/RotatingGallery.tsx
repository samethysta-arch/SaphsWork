import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

type GalleryItem = {
    title: string
    image: string
    alt: string
}

type MotionLibraries = {
    gsap: any
    ScrollTrigger: any
    Lenis?: any
}

type RotatingGalleryProps = {
    yearLabel: string
    heroName: string
    contactLabel: string
    image1: string
    image2: string
    image3: string
    image4: string
    image5: string
    image6: string
    image7: string
    image8: string
    smoothScroll: boolean
    galleryHeight: number
    style?: React.CSSProperties
}

const DEFAULT_ITEMS: GalleryItem[] = [
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
]

const GSAP_URL = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
const SCROLL_TRIGGER_URL =
    "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
const LENIS_URL =
    "https://cdn.jsdelivr.net/npm/lenis@1.3.25/dist/lenis.min.js"

function loadScript(src: string) {
    return new Promise<void>((resolve, reject) => {
        if (typeof document === "undefined") {
            resolve()
            return
        }

        const existing = document.querySelector<HTMLScriptElement>(
            `script[src="${src}"]`
        )

        if (existing?.dataset.ready === "true") {
            resolve()
            return
        }

        if (existing) {
            existing.addEventListener("load", () => resolve(), { once: true })
            existing.addEventListener("error", reject, { once: true })
            return
        }

        const script = document.createElement("script")
        script.src = src
        script.async = true
        script.dataset.galleryMotion = "true"
        script.addEventListener(
            "load",
            () => {
                script.dataset.ready = "true"
                resolve()
            },
            { once: true }
        )
        script.addEventListener("error", reject, { once: true })
        document.head.appendChild(script)
    })
}

async function loadMotionLibraries(): Promise<MotionLibraries> {
    const win = window as unknown as {
        gsap?: any
        ScrollTrigger?: any
        Lenis?: any
    }

    if (!win.gsap) await loadScript(GSAP_URL)
    if (!win.ScrollTrigger) await loadScript(SCROLL_TRIGGER_URL)
    if (!win.Lenis) await loadScript(LENIS_URL).catch(() => undefined)

    if (!win.gsap || !win.ScrollTrigger) {
        throw new Error("GSAP or ScrollTrigger did not load")
    }

    return {
        gsap: win.gsap,
        ScrollTrigger: win.ScrollTrigger,
        Lenis: win.Lenis,
    }
}

function usePrefersReducedMotion() {
    const [reduced, setReduced] = React.useState(false)

    React.useEffect(() => {
        if (typeof window === "undefined") return

        const media = window.matchMedia("(prefers-reduced-motion: reduce)")
        const update = () => setReduced(media.matches)
        update()
        media.addEventListener("change", update)

        return () => media.removeEventListener("change", update)
    }, [])

    return reduced
}

export default function RotatingGallery(props: RotatingGalleryProps) {
    const {
        yearLabel,
        heroName,
        contactLabel,
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        smoothScroll,
        galleryHeight,
        style,
    } = props
    const rootRef = React.useRef<HTMLElement | null>(null)
    const reducedMotion = usePrefersReducedMotion()
    const screenImages = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
    ]
    const items = DEFAULT_ITEMS.map((item, index) => ({
        ...item,
        image: screenImages[index] || item.image,
    }))

    React.useEffect(() => {
        const root = rootRef.current
        if (!root || typeof window === "undefined") return

        const cards = Array.from(
            root.querySelectorAll<HTMLElement>("[data-gallery-card]")
        )

        cards.forEach((card, index) => {
            const waveX = Math.sin(index * 0.92) * 18
            const waveY = index % 2 === 0 ? -5 : 5
            card.style.setProperty("--wave-x", `${waveX}vw`)
            card.style.setProperty("--wave-y", `${waveY}vh`)
        })

        if (reducedMotion) {
            root.dataset.motion = "reduced"
            cards.forEach((card) => {
                card.style.transform =
                    "translate3d(var(--wave-x), 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)"
                card.style.filter = "blur(0px) brightness(1) saturate(1)"
                card.style.opacity = "1"
            })
            return
        }

        root.dataset.motion = "ready"

        let cancelled = false
        let context: any
        let lenis: any
        let ticker: ((time: number) => void) | null = null

        loadMotionLibraries()
            .then(({ gsap, ScrollTrigger, Lenis }) => {
                if (cancelled || !rootRef.current) return

                gsap.registerPlugin(ScrollTrigger)

                context = gsap.context(() => {
                    if (smoothScroll && Lenis) {
                        lenis = new Lenis({
                            lerp: 0.08,
                            smoothWheel: true,
                            syncTouch: false,
                        })
                        lenis.on("scroll", ScrollTrigger.update)
                        ticker = (time: number) => lenis?.raf(time * 1000)
                        gsap.ticker.add(ticker)
                        gsap.ticker.lagSmoothing(0)
                    }

                    cards.forEach((card, index) => {
                        const direction = index % 2 === 0 ? -1 : 1
                        const distance = 180 + index * 18

                        gsap.fromTo(
                            card,
                            {
                                autoAlpha: 0.42,
                                z: -460,
                                xPercent: direction * -12,
                                y: 120,
                                rotateX: 54 * direction,
                                rotateY: -36 * direction,
                                rotateZ: 9 * direction,
                                scale: 0.78,
                                filter:
                                    "blur(16px) brightness(0.52) saturate(0.7)",
                            },
                            {
                                autoAlpha: 1,
                                z: 90,
                                xPercent: direction * 6,
                                y: -distance,
                                rotateX: -12 * direction,
                                rotateY: 18 * direction,
                                rotateZ: -4 * direction,
                                scale: 1.04,
                                filter:
                                    "blur(0px) brightness(1.08) saturate(1.12)",
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 94%",
                                    end: "bottom 12%",
                                    scrub: true,
                                },
                            }
                        )
                    })

                    ScrollTrigger.refresh()
                }, root)
            })
            .catch(() => {
                root.dataset.motion = "static"
                cards.forEach((card) => {
                    card.style.filter = "blur(0px) brightness(1) saturate(1)"
                    card.style.opacity = "1"
                })
            })

        return () => {
            cancelled = true
            context?.revert()
            if (ticker) {
                const win = window as unknown as { gsap?: any }
                win.gsap?.ticker?.remove(ticker)
            }
            lenis?.destroy?.()
        }
    }, [reducedMotion, smoothScroll])

    return (
        <section
            ref={rootRef}
            className="rg2026"
            style={
                {
                    ...style,
                    zIndex: 20,
                    "--gallery-height": `${galleryHeight}vh`,
                } as React.CSSProperties
            }
        >
            <style>{styles}</style>
            <div className="rg2026__wash" />
            <div className="rg2026__overlay">
                <nav className="rg2026__nav" aria-label="Portfolio navigation">
                    <a href="#home">
                        Home <sup>01</sup>
                    </a>
                    <a href="#about">
                        About <sup>02</sup>
                    </a>
                    <a className="rg2026__contact" href="#contact">
                        <span aria-hidden="true">-&gt;</span>
                        {contactLabel}
                    </a>
                </nav>

                <div className="rg2026__copy">
                    <p>{yearLabel}</p>
                    <h1>{heroName}</h1>
                </div>
            </div>
            <svg
                className="rg2026__path"
                viewBox="0 0 100 280"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path d="M50 0 C 12 36, 88 62, 50 96 S 12 160, 50 196 S 88 246, 50 280" />
            </svg>
            <div className="rg2026__stage">
                {items.map((item) => (
                    <article
                        className="rg2026__card"
                        data-gallery-card
                        key={item.title}
                    >
                        <span className="rg2026__button rg2026__button--volume" />
                        <span className="rg2026__button rg2026__button--action" />
                        <span className="rg2026__button rg2026__button--power" />
                        <div className="rg2026__screen">
                            <div className="rg2026__chrome" aria-hidden="true">
                                <span className="rg2026__island" />
                                <span className="rg2026__signal" />
                            </div>
                            <img
                                src={item.image}
                                alt={item.alt}
                                loading="lazy"
                            />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

RotatingGallery.defaultProps = {
    yearLabel: "2025/2026",
    heroName: "Saphira Amethysta",
    contactLabel: "Get in touch",
    image1: "/phone-screens/route-overview.png",
    image2: "/phone-screens/pickup-passenger.png",
    image3: "/phone-screens/searching-bookings.png",
    image4: "/phone-screens/ai-assistant.png",
    image5: "/phone-screens/safety-paused-modal.png",
    image6: "/phone-screens/go-online.png",
    image7: "/phone-screens/deliver-order.png",
    image8: "/phone-screens/earned-rating.png",
    smoothScroll: true,
    galleryHeight: 320,
}

addPropertyControls(RotatingGallery, {
    yearLabel: {
        type: ControlType.String,
        title: "Year",
        defaultValue: "2025/2026",
    },
    heroName: {
        type: ControlType.String,
        title: "Name",
        defaultValue: "Saphira Amethysta",
    },
    contactLabel: {
        type: ControlType.String,
        title: "Button",
        defaultValue: "Get in touch",
    },
    image1: {
        type: ControlType.Image,
        title: "Screen 1",
        defaultValue: "/phone-screens/route-overview.png",
    },
    image2: {
        type: ControlType.Image,
        title: "Screen 2",
        defaultValue: "/phone-screens/pickup-passenger.png",
    },
    image3: {
        type: ControlType.Image,
        title: "Screen 3",
        defaultValue: "/phone-screens/searching-bookings.png",
    },
    image4: {
        type: ControlType.Image,
        title: "Screen 4",
        defaultValue: "/phone-screens/ai-assistant.png",
    },
    image5: {
        type: ControlType.Image,
        title: "Screen 5",
        defaultValue: "/phone-screens/safety-paused-modal.png",
    },
    image6: {
        type: ControlType.Image,
        title: "Screen 6",
        defaultValue: "/phone-screens/go-online.png",
    },
    image7: {
        type: ControlType.Image,
        title: "Screen 7",
        defaultValue: "/phone-screens/deliver-order.png",
    },
    image8: {
        type: ControlType.Image,
        title: "Screen 8",
        defaultValue: "/phone-screens/earned-rating.png",
    },
    smoothScroll: {
        type: ControlType.Boolean,
        title: "Lenis",
        defaultValue: true,
    },
    galleryHeight: {
        type: ControlType.Number,
        title: "Height",
        defaultValue: 320,
        min: 180,
        max: 520,
        step: 10,
    },
})

const styles = `
.rg2026,
.rg2026 * {
    box-sizing: border-box;
}

.rg2026 {
    --gallery-height: 320vh;
    position: relative;
    width: 100%;
    min-height: var(--gallery-height);
    overflow: hidden;
    color: #f6efe6;
    background:
        linear-gradient(180deg, #101217 0%, #171411 42%, #101417 100%),
        repeating-linear-gradient(90deg, rgba(246, 239, 230, 0.05) 0 1px, transparent 1px 88px);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    isolation: isolate;
}

.rg2026__wash {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(115deg, rgba(121, 174, 152, 0.24), transparent 34%),
        linear-gradient(245deg, rgba(225, 124, 94, 0.18), transparent 36%);
    opacity: 0.78;
    mix-blend-mode: screen;
}

.rg2026::after {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    height: 45vh;
    pointer-events: none;
    background: linear-gradient(180deg, transparent, rgba(5, 6, 7, 0.78));
    content: "";
}

.rg2026__overlay {
    position: sticky;
    top: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: min(100% - 48px, 1472px);
    height: 100vh;
    margin: 0 auto -100vh;
    padding: 32px 0 36px;
    pointer-events: none;
}

.rg2026__nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: clamp(18px, 3vw, 42px);
    width: 100%;
    color: rgba(246, 239, 230, 0.78);
    font-size: 16px;
    font-weight: 650;
}

.rg2026__nav a {
    color: inherit;
    text-decoration: none;
    pointer-events: auto;
}

.rg2026__nav sup {
    color: rgba(246, 239, 230, 0.48);
    font-size: 0.58em;
    line-height: 0;
}

.rg2026__contact {
    display: inline-flex;
    align-items: center;
    gap: 15px;
    min-height: 56px;
    padding: 6px 22px 6px 7px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.94);
    color: #16191d !important;
    box-shadow:
        0 19px 48px rgba(0, 0, 0, 0.2),
        0 0 0 1px rgba(255, 255, 255, 0.24) inset;
}

.rg2026__contact span {
    display: grid;
    place-items: center;
    width: 43px;
    height: 43px;
    border-radius: 50%;
    background: #3158ff;
    color: #ffffff;
    font-size: 23px;
    font-weight: 400;
    line-height: 1;
}

.rg2026__copy {
    max-width: min(1152px, 100%);
    color: #f7f8f4;
}

.rg2026__copy p {
    margin: 0 0 22px;
    font-size: clamp(32px, 3.2vw, 50px);
    font-weight: 850;
    line-height: 1;
    letter-spacing: 0;
}

.rg2026__copy h1 {
    margin: 0;
    color: rgba(246, 239, 230, 0.72);
    font-size: clamp(76px, 10vw, 157px);
    font-weight: 850;
    line-height: 0.82;
    letter-spacing: 0;
}

.rg2026__path {
    position: absolute;
    inset: 10vh auto 8vh 50%;
    z-index: 1;
    width: min(38vw, 520px);
    height: calc(var(--gallery-height) - 24vh);
    transform: translateX(-50%);
    overflow: visible;
    opacity: 0.42;
    filter: drop-shadow(0 0 22px rgba(157, 219, 199, 0.2));
}

.rg2026__path path {
    fill: none;
    stroke: rgba(246, 239, 230, 0.34);
    stroke-width: 0.42;
    stroke-dasharray: 1 4;
}

.rg2026__stage {
    position: relative;
    z-index: 2;
    width: min(1160px, calc(100% - 32px));
    min-height: calc(var(--gallery-height) - 8vh);
    margin: 0 auto;
    padding: 14vh 0 18vh;
    perspective: 1400px;
    transform-style: preserve-3d;
}

.rg2026__card {
    position: relative;
    width: clamp(220px, 24vw, 300px);
    aspect-ratio: 9 / 19.5;
    margin: 18vh auto;
    padding: clamp(7px, 1vw, 10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: clamp(26px, 4vw, 40px);
    background:
        linear-gradient(90deg, #111418 0%, #62666d 4%, #20242a 9%, #0b0d10 52%, #545961 96%, #15181d 100%);
    box-shadow:
        0 42px 94px rgba(0, 0, 0, 0.46),
        0 16px 42px rgba(14, 222, 190, 0.08),
        0 0 0 1px rgba(255, 255, 255, 0.08) inset,
        0 2px 4px rgba(255, 255, 255, 0.42) inset;
    transform:
        translate3d(var(--wave-x), var(--wave-y), -320px)
        rotateX(32deg)
        rotateY(-24deg)
        rotateZ(7deg)
        scale(0.88);
    transform-style: preserve-3d;
    will-change: transform, filter, opacity;
    contain: layout;
}

.rg2026__card::before {
    position: absolute;
    inset: 6px -8px 3px 9px;
    z-index: -2;
    border-radius: inherit;
    background:
        linear-gradient(90deg, rgba(8, 9, 11, 0.95), rgba(88, 94, 104, 0.76) 64%, rgba(12, 14, 17, 0.9));
    box-shadow: 26px 38px 64px rgba(0, 0, 0, 0.36);
    content: "";
    transform: translateZ(-32px);
}

.rg2026__card::after {
    position: absolute;
    inset: 3px;
    pointer-events: none;
    border-radius: calc(clamp(26px, 4vw, 40px) - 3px);
    background: linear-gradient(115deg, rgba(255, 255, 255, 0.26), transparent 25%, transparent 68%, rgba(103, 215, 197, 0.18));
    content: "";
    mix-blend-mode: screen;
    opacity: 0.5;
    transform: translateZ(28px);
}

.rg2026__card:nth-child(3n + 1) {
    margin-left: 3vw;
}

.rg2026__card:nth-child(3n + 2) {
    margin-right: 0;
}

.rg2026__card:nth-child(3n) {
    margin-left: auto;
    margin-right: 12vw;
}

.rg2026__button {
    position: absolute;
    z-index: -1;
    width: 4px;
    border-radius: 999px;
    background: linear-gradient(180deg, #6d737c, #14171b 62%, #050607);
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.42);
    transform: translateZ(-7px);
}

.rg2026__button--volume {
    top: 22%;
    left: -4px;
    height: 50px;
}

.rg2026__button--action {
    top: 36%;
    left: -4px;
    height: 35px;
}

.rg2026__button--power {
    top: 30%;
    right: -4px;
    height: 70px;
}

.rg2026__screen {
    position: relative;
    z-index: 1;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: calc(clamp(26px, 4vw, 40px) - 7px);
    background: #07090b;
    box-shadow:
        0 0 0 5px rgba(0, 0, 0, 0.86),
        0 0 0 6px rgba(255, 255, 255, 0.06),
        0 19px 32px rgba(0, 0, 0, 0.32) inset;
    transform: translateZ(26px);
}

.rg2026__screen::before {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background:
        linear-gradient(118deg, rgba(255, 255, 255, 0.36), transparent 16%, transparent 58%, rgba(255, 255, 255, 0.08)),
        linear-gradient(0deg, rgba(0, 0, 0, 0.22), transparent 28%, rgba(255, 255, 255, 0.08));
    content: "";
    mix-blend-mode: screen;
}

.rg2026__screen::after {
    position: absolute;
    bottom: 10px;
    left: 50%;
    z-index: 3;
    width: 34%;
    height: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.72);
    content: "";
    transform: translateX(-50%);
}

.rg2026__screen img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.08) contrast(1.04);
    transform: scale(1.03);
}

.rg2026__chrome {
    position: absolute;
    top: 11px;
    right: 15px;
    left: 15px;
    z-index: 4;
    height: 19px;
    pointer-events: none;
}

.rg2026__island {
    position: absolute;
    top: 0;
    left: 50%;
    width: 34%;
    height: 17px;
    border-radius: 999px;
    background: #060708;
    box-shadow:
        0 1px 3px rgba(255, 255, 255, 0.12) inset,
        0 4px 7px rgba(0, 0, 0, 0.32);
    transform: translateX(-50%);
}

.rg2026__signal {
    position: absolute;
    top: 3px;
    right: 0;
    width: 20px;
    height: 12px;
    border: 2px solid rgba(255, 255, 255, 0.7);
    border-left: 0;
    border-radius: 1px 4px 4px 1px;
}

.rg2026__signal::before,
.rg2026__signal::after {
    position: absolute;
    content: "";
}

.rg2026__signal::before {
    top: 3px;
    left: -21px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.78);
    box-shadow:
        6px 0 0 rgba(255, 255, 255, 0.78),
        12px 0 0 rgba(255, 255, 255, 0.78);
}

.rg2026__signal::after {
    top: 3px;
    right: -4px;
    width: 2px;
    height: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.7);
}

.rg2026[data-motion="static"] .rg2026__card,
.rg2026[data-motion="reduced"] .rg2026__card {
    opacity: 1;
    filter: blur(0) brightness(1) saturate(1);
}

@media (max-width: 809px) {
    .rg2026 {
        min-height: 260vh;
    }

    .rg2026__path {
        width: 76vw;
        opacity: 0.28;
    }

    .rg2026__stage {
        width: calc(100% - 20px);
        padding-top: 10vh;
    }

    .rg2026__overlay {
        width: min(100% - 32px, 512px);
        padding: 20px 0 24px;
    }

    .rg2026__nav {
        gap: 13px;
        font-size: 13px;
    }

    .rg2026__nav > a:not(.rg2026__contact) {
        display: none;
    }

    .rg2026__contact {
        min-height: 50px;
        padding: 5px 17px 5px 6px;
        font-size: 14px;
    }

    .rg2026__contact span {
        width: 38px;
        height: 38px;
        font-size: 19px;
    }

    .rg2026__copy p {
        margin-bottom: 13px;
        font-size: clamp(23px, 8vw, 36px);
    }

    .rg2026__copy h1 {
        max-width: 100%;
        font-size: clamp(53px, 14vw, 77px);
        line-height: 0.86;
    }

    .rg2026__card {
        width: min(70vw, 244px);
        margin: 16vh auto;
    }

    .rg2026__card:nth-child(n) {
        margin-left: auto;
        margin-right: auto;
    }
}

@media (prefers-reduced-motion: reduce) {
    .rg2026__card {
        opacity: 1 !important;
        filter: blur(0) brightness(1) saturate(1) !important;
        transform: translate3d(0, 0, 0) rotate(0deg) scale(1) !important;
    }
}
`
