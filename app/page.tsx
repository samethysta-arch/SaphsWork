import PixelLink from "../components/PixelLink";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const projects = [
  { title: "Default Accept", type: "Driver experience", image: asset("/project-covers/allocation-job-card.png"), className: "project-allocation", href: "/work" },
  { title: "Dax Design Library", type: "Design system", image: asset("/project-covers/dax-design-library.png"), className: "project-dax", href: "/prototype/" },
  { title: "Pickup and Delivery Photo Validation", type: "Service design", image: asset("/project-covers/pickup-delivery-validation.png"), className: "project-photo-validation", href: "/pickup-delivery-photo-validation/" },
  { title: "L3 Design Agentic Loop", type: "AI design operations", image: asset("/project-covers/l3-design-agentic-loop.png"), className: "project-agentic", href: "/l3-prototype/" },
];

const roles = [
  {
    company: "Grab Singapore",
    role: "Product Design Lead",
    date: "May 2024 — Today",
    mark: asset("/profile-assets/grab.png"),
    descriptions: [
      "Owned the end-to-end in-transit experience, using AI to accelerate research synthesis, translation, prototyping, and project management while maintaining design quality.",
      "Spearheaded a redesign of the driver Earnings experience to address declining driver sentiment, correct take-rate misconceptions, and help drivers understand that higher earnings per hour can coexist with lower earnings per kilometre; supporting a shift toward longer-term earnings goals.",
    ],
  },
  {
    company: "Gojek",
    role: "Design Manager",
    date: "April 2023 — April 2024",
    mark: asset("/profile-assets/gojek.png"),
    descriptions: [
      "Lead Driver Platform team, and manage 5 Product Designers. Involve in setting product strategy by facilitating OKR planning workshop with stakeholders in a platform level, and drives Design and Research roadmap.",
      "Owned self-initiatives to models best practices for data driven and identifies opportunities for designers to better incorporate data into their work.",
    ],
  },
  {
    company: "Gojek",
    role: "Senior Product Designer",
    date: "May 2018 — April 2023",
    mark: asset("/profile-assets/gojek.png"),
    descriptions: [
      "Lead Driver Quality stream in Driver Platform team. Design and deliver Financial products for drivers and contribute in improving 5.5% MTU for Benefits program in Apr 22.",
      "Spearheading a redesign for Driver App homescreen and wayfindings project, a designer driven initiatives. Released in Nov 21 in Indonesia and Jan 22 in Singapore. We saw improvement in Satisfaction score compared to prior version by 20% in Singapore and 4% in Indonesia.",
    ],
  },
  { company: "Tokopedia", role: "Product Designer", date: "2016 — 2018", mark: asset("/profile-assets/duolingo.png") },
];

export default function Home() {
  return <main className="portfolio-shell">
    <aside className="profile-rail" aria-label="About Saphira Amethysta"><div className="profile-inner">
      <section className="intro-block" id="about">
        <div className="identity"><img className="avatar" src={asset("/profile-assets/saphira-avatar.png")} alt="" /><div><h1>Saphira Amethysta</h1><p>Product Design Lead at Grab</p></div></div>
        <p className="bio">I’m a digital designer based in Singapore with over 9 years of experience crafting thoughtful, visually driven digital experiences.</p>
        <p className="availability"><span>✓</span> Available for work</p>
        <a className="contact-button" href="https://www.linkedin.com/in/saphiraamethysta" target="_blank" rel="noopener noreferrer">Get in touch <span>↗</span></a>
      </section>
      <section className="info-section"><h2>Education</h2><div className="simple-row"><strong>M.Eng Design Science</strong><span>Chiba University (千葉大学) 2016</span></div></section>
      <section className="info-section"><h2>Experience</h2><div className="role-list">{roles.map((item) => <article className="role" key={item.company + item.role}><img className="company-mark" src={item.mark} alt="" /><div><strong>{item.company}</strong><span>{item.role} · {item.date}</span>{item.descriptions?.map((description) => <p key={description}>{description}</p>)}</div></article>)}</div></section>
      <section className="info-section"><h2>Tools</h2><div className="tool-list"><div><img src={asset("/profile-assets/figma.png")} alt="" /><span><strong>Figma</strong>General design tool</span></div><div><img src={asset("/profile-assets/codex.png")} alt="" /><span><strong>ChatGPT and Codex</strong>AI Agent</span></div><div><img src={asset("/profile-assets/maze.png")} alt="" /><span><strong>Maze</strong>Usability testing tool</span></div></div></section>
      <section className="info-section"><h2>Language</h2><div className="simple-row"><strong>English (IELTS 7.0)</strong><strong>Japanese (N4)</strong></div></section>
      <footer><span>Singapore · GMT+8</span><a href="#about">Back to top ↑</a></footer>
    </div></aside>
    <section className="work-wall" aria-label="Selected work">
      <div className="work-heading"><span>Selected work</span><a className="prototype-link" href="/prototype/" style={{ color: "#17b5a6", letterSpacing: 0, textDecoration: "none", textTransform: "none" }}>Try prototype ↗</a><span>2020—2026</span></div>
      <div className="project-grid">{projects.map((project, index) => <PixelLink className={`project-card ${project.className}`} href={project.href} key={project.title} aria-label={`${project.title}, ${project.type}`}><img src={project.image} alt="" /><div className="project-meta"><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{project.title}</strong><small>{project.type}</small></div><b>↗</b></div></PixelLink>)}</div>
      <div className="work-end"><p>More thoughtful work is always in progress.</p><a href="mailto:saphira.amethysta@gmail.com">Let’s work together ↗</a></div>
    </section>
  </main>;
}
