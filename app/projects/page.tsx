import { PageFrame } from "../../components/FormoChrome";

export const metadata = { title: "Projects", description: "Selected product design projects by Saphira Amethysta." };

export default function ProjectsPage(){return <PageFrame><main className="formo-page listing-page"><h1 data-scroll-reveal>All Projects</h1><a className="portfolio-card" data-scroll-reveal href="/work"><img src="/project-covers/allocation-job-card.webp" alt="Default Accept driver booking interface"/><div><h2>Default Accept</h2><span>Driver app · 2026</span><b>↗</b></div></a></main></PageFrame>}
