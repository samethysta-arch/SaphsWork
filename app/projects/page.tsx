import { PageFrame } from "../../components/FormoChrome";

export const metadata = { title: "Projects", description: "Selected product design projects by Saphira Amethysta." };

export default function ProjectsPage(){return <PageFrame><main className="formo-page listing-page"><h1 data-scroll-reveal>All Projects</h1><div className="listing-project-grid"><div aria-hidden="true"/><div className="listing-project-stack">
  <a className="portfolio-card" data-scroll-reveal href="/work"><div className="listing-project-meta"><h2>Default Accept</h2><span>Driver app <i aria-hidden="true">＋</i> 2026</span></div><div className="listing-project-media"><img src="/project-covers/allocation-job-card.webp" alt="Default Accept driver booking interface"/></div></a>
  <a className="portfolio-card" data-scroll-reveal href="/work/dax-design-library/"><div className="listing-project-meta"><h2>Dax Design Library</h2><span>AI Fluency <i aria-hidden="true">＋</i> 2026</span></div><div className="listing-project-media listing-project-media-portrait"><img src="/project-covers/dax-design-library.webp" alt="Dax Design Library project cover"/></div></a>
</div></div></main></PageFrame>}
