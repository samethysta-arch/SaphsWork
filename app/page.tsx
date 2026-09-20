const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const projects = [
  { title: "Allocation Job Card", type: "Driver experience", image: asset("/project-covers/allocation-job-card.png"), className: "project-allocation" },
  { title: "Dax Design Library", type: "Design system", image: asset("/project-covers/dax-design-library.png"), className: "project-dax" },
  { title: "Pickup and Delivery Photo Validation", type: "Service design", image: asset("/project-covers/pickup-delivery-validation.png"), className: "project-photo-validation" },
  { title: "L3 Design Agentic Loop", type: "AI design operations", image: asset("/project-covers/l3-design-agentic-loop.png"), className: "project-agentic" },
];

const roles = [
  { company: "Grab Singapore", role: "Product Design Lead", date: "May 2024 — Today", mark: asset("/profile-assets/grab.png") },
  { company: "Gojek", role: "Design Manager", date: "April 2023 — April 2024", mark: asset("/profile-assets/gojek.png") },
  { company: "Gojek", role: "Senior Product Designer", date: "May 2018 — April 2023", mark: asset("/profile-assets/gojek.png") },
  { company: "Tokopedia", role: "Product Designer", date: "2016 — 2018", mark: asset("/profile-assets/duolingo.png") },
];

export default function Home() {
  return <main className="portfolio-shell">
    <aside className="profile-rail" aria-label="About Saphira Amethysta"><div className="profile-inner">
      <section className="intro-block" id="about">
        <div className="identity"><img className="avatar" src={asset("/profile-assets/saphira-avatar.png")} alt="" /><div><h1>Saphira Amethysta</h1><p>Product Designer Lead at Grab</p></div></div>
        <p className="bio">I’m a digital designer based in Singapore with over 9 years of experience crafting thoughtful, visually driven digital experiences.</p>
        <p className="availability"><span>✓</span> Available for work</p>
        <a className="contact-button" href="mailto:saphira.amethysta@gmail.com">Get in touch <span>↗</span></a>
      </section>
      <section className="info-section"><h2>Education</h2><div className="simple-row"><strong>M.Eng Design Science</strong><span>Chiba University (千葉大学) 2016</span></div></section>
      <section className="info-section"><h2>Experience</h2><div className="role-list">{roles.map((item) => <article className="role" key={item.company + item.role}><img className="company-mark" src={item.mark} alt="" /><div><strong>{item.company}</strong><span>{item.role} · {item.date}</span>{item.role === "Design Manager" && <p>Led the Driver Platform team and five product designers, shaping product strategy and research roadmaps.</p>}{item.role === "Senior Product Designer" && <p>Designed financial and home experiences for drivers across Indonesia and Singapore.</p>}</div></article>)}</div></section>
      <section className="info-section"><h2>Tools</h2><div className="tool-list"><div><img src={asset("/profile-assets/figma.png")} alt="" /><span><strong>Figma</strong>General design tool</span></div><div><img src={asset("/profile-assets/codex.png")} alt="" /><span><strong>ChatGPT and Codex</strong>AI Agent</span></div><div><img src={asset("/profile-assets/maze.png")} alt="" /><span><strong>Maze</strong>Usability testing tool</span></div></div></section>
      <section className="info-section"><h2>Language</h2><div className="simple-row"><strong>English (IELTS 7.0)</strong><strong>Japanese (N4)</strong></div></section>
      <footer><span>Singapore · GMT+8</span><a href="#about">Back to top ↑</a></footer>
    </div></aside>
    <section className="work-wall" aria-label="Selected work">
      <div className="work-heading"><span>Selected work</span><span>2020—2026</span></div>
      <div className="project-grid">{projects.map((project, index) => <PixelLink className={`project-card ${project.className}`} href="/work" key={project.title} aria-label={`${project.title}, ${project.type}`}><img src={project.image} alt="" /><div className="project-meta"><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{project.title}</strong><small>{project.type}</small></div><b>↗</b></div></PixelLink>)}</div>
      <div className="work-end"><p>More thoughtful work is always in progress.</p><a href="mailto:saphira.amethysta@gmail.com">Let’s work together ↗</a></div>
    </section>
  </main>;
}
import PixelLink from "../components/PixelLink";
