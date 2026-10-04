import type { Metadata } from "next";
import styles from "../prototype/prototype.module.css";

export const metadata: Metadata = {
  title: "L3 Design Agentic Loop — Interactive Prototype",
  description: "Explore the interactive L3 Design Agentic Loop prototype by Saphira Amethysta.",
};

const prototypeUrl = "https://www.figma.com/proto/RX6aJ8A1sKWRV4YfelSgbw/Saphira-s-Work?page-id=0%3A1&node-id=1-6126&viewport=-3226%2C-81%2C0.24&t=ay3lpMi7IUpmmK9E-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A6126&show-proto-sidebar=0";
const embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(prototypeUrl)}`;

export default function L3PrototypePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.backLink} href="/" aria-label="Back to Saphira’s portfolio">← <span>Back to portfolio</span></a>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>SAPHIRA AMETHYSTA · L3 DESIGN AGENTIC LOOP</p>
          <h1>Explore the experience</h1>
        </div>
      </header>
      <section className={styles.player} aria-label="Interactive L3 Design Agentic Loop Figma prototype">
        <iframe
          className={styles.frame}
          src={embedUrl}
          title="Interactive L3 Design Agentic Loop prototype"
          allow="fullscreen; clipboard-read; clipboard-write; autoplay"
          allowFullScreen
        />
      </section>
    </main>
  );
}
