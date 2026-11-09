import { PageFrame } from "../components/FormoChrome";

const projects = [{title:"Default Accept",subtitle:"Driver app",year:"2026",href:"/work",image:"/project-covers/allocation-job-card.webp"}];

export default function Home() {
  return <PageFrame><main className="formo-page home-page">
    <section className="home-hero" data-scroll-reveal>
      <p className="eyebrow">✳ Based in Singapore, available for reallocation</p>
      <div className="home-intro"><h1>Product Design Lead with 9+ years designing complex products.</h1><p>Builds AI-assisted workflows (a reusable prototyping library and a pilot agentic PRD-to-handover loop) and leads across teams, previously as Design Manager of Gojek’s Driver Platform team.</p><a href="/about">About me ↗</a></div>
    </section>
    <section className="selected-work" data-scroll-reveal><header><h2>Selected Work</h2><span>The work I’m proud of</span></header><div className="portfolio-grid">{projects.map((p)=><a className="portfolio-card" href={p.href} key={p.title}><img src={p.image} alt="Default Accept driver booking interface"/><div><h3>{p.title}</h3><span>{p.subtitle} · {p.year}</span><b>↗</b></div></a>)}</div></section>
    <section className="tools-section" data-scroll-reveal><header><h2>Tools</h2><span>My daily kits</span></header><div className="tools-grid">{[["figma.png","Figma"],["codex.png","Codex"],["maze.png","Maze"],["codex.png","Cursor"],["codex.png","ChatGPT"]].map(([img,label])=><div key={label}><img src={`/profile-assets/${img}`} alt=""/><span>{label}</span></div>)}</div></section>
  </main></PageFrame>;
}
