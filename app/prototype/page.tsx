import type { Metadata } from "next";
import styles from "./prototype.module.css";

export const metadata: Metadata = {
  title: "Saphira’s Work — Interactive Prototype",
  description: "Explore Saphira Amethysta’s interactive portfolio prototype.",
};

const prototypeUrl = "https://www.figma.com/proto/RX6aJ8A1sKWRV4YfelSgbw/Saphira-s-Work?node-id=1-4397&viewport=-3226%2C-81%2C0.24&t=T0Ko3E43aTTCe9xB-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A4397&page-id=0%3A1&show-proto-sidebar=1";
const embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(prototypeUrl)}`;

export default function PrototypePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.backLink} href="/" aria-label="Back to Saphira’s portfolio">← <span>Back to portfolio</span></a>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>SAPHIRA AMETHYSTA · INTERACTIVE PROTOTYPE</p>
          <h1>Explore the experience</h1>
        </div>
      </header>
      <section className={styles.player} aria-label="Interactive Figma prototype">
        <iframe
          className={styles.frame}
          src={embedUrl}
          title="Interactive prototype of Saphira’s Work"
          allow="fullscreen; clipboard-read; clipboard-write; autoplay"
          allowFullScreen
        />
      </section>
    </main>
  );
}
