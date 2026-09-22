import PixelLink from "../../components/PixelLink";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * The complete Figma cover preserves the approved case-study composition.
 * Figma-only photography and research artefacts intentionally remain in this
 * source image; approved DAL assets are retained in public/work-assets/dal.
 */
export default function WorkPage() {
  return <main className="figma-case-study">
    <div className="figma-case-canvas">
      <img
        src={`${basePath}/work-assets/default-accept-figma.png`}
        alt="Default Accept case study: booking experience design, research, design decisions, and outcomes."
      />
      <PixelLink href="/" className="figma-home-link" aria-label="Return to portfolio home" />
    </div>
  </main>;
}
