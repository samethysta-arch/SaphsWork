import { PageFrame } from "../../components/FormoChrome";

export const metadata = { title: "About", description: "About Saphira Amethysta, Product Design Lead in Singapore." };

const experience = [
 ["Grab Singapore", "Product Design Lead", "May 2024 — Today", "Owned the end-to-end in-transit experience, using AI to accelerate research synthesis, translation, prototyping, and project management while maintaining design quality."],
 ["Gojek", "Design Manager", "April 2023 — April 2024", "Led the Driver Platform team and managed 5 Product Designers. Facilitated platform-level OKR planning with cross-functional stakeholders and drove the design and research roadmap."],
 ["Gojek", "Senior Product Designer", "May 2018 — April 2023", "Led Driver Quality and designed financial products for drivers. Spearheaded a designer-led redesign of the Driver App home screen and wayfinding."],
 ["Tokopedia", "UX Designer", "February 2017 — May 2018", "Designed digital experiences for commerce."],
];
export default function AboutPage(){return <PageFrame><main className="formo-page info-page"><p className="eyebrow">About</p><h1>Designing thoughtful experiences for complex products.</h1><p className="info-lead">I’m a digital designer based in Singapore with over 9 years of experience crafting thoughtful, visually driven digital experiences.</p><section><h2>Experience</h2>{experience.map(([company,role,date,copy])=><article className="experience-row" key={company+role}><div><h3>{company}</h3><span>{role} · {date}</span></div><p>{copy}</p></article>)}</section><section><h2>Tools</h2><div className="tools-grid">{[["figma.png","Figma"],["codex.png","Codex"],["maze.png","Maze"]].map(([img,name])=><div key={name}><img src={`/profile-assets/${img}`} alt=""/><span>{name}</span></div>)}</div></section></main></PageFrame>}
