import PixelLink from "../../components/PixelLink";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const principles = [
  "The job will auto-accept when the timer expires.",
  "What continue, skip, reject, and cancel actions mean.",
  "Turbo benefits remain clear, tangible, and worth retaining.",
  "Drivers see a clear recovery path after a downgrade.",
];

const steps = ["Frame the opportunity", "Initial design", "Phase 1 rollout", "Evaluation and hypothesis", "Synthesis and iterate"];

export default function WorkPage() {
  return <main className="case-study">
    <nav className="case-rail" aria-label="Case study navigation">
      <PixelLink href="/" className="case-logo"><img src={asset("/work-assets/dal/dax-avatar.svg")} alt="Home" /></PixelLink><span />
      <a href="#overview">01</a><a href="#design">02</a><a href="#research">03</a>
    </nav>
    <section className="case-hero"><div className="hero-blocks" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div><p>Booking experience design</p><h1>Default Accept</h1><span className="hero-line" /></section>
    <section className="case-content" id="overview"><aside><PixelLink href="/" className="back-link"><img src={asset("/work-assets/dal/arrow-left.svg")} alt="" />Back</PixelLink></aside><article>
      <h2>In H2 2026, we introduced new type of Job Card when drivers receiving incoming booking to increase Acceptance Rate.</h2>
      <img className="case-visual" src={asset("/work-assets/job-card-variants.png")} alt="Manual, Turbo Auto-accept and Auto-accept job card variants" />
      <p>Drivers are originally allowed to choose their acceptance mode; Auto-accept (AA) and Manual (auto-reject). Drivers in Turbo New Auto-accept are more productive with higher trip per hour (TPOH), and across experiments in H1 2026, Turbo users accounted for 57% of online hours and 67% of rides.</p>
      <p>On the other hand, <b>cherry-picking is breaking the marketplace.</b> Drivers on Manual Accept selectively accept only the most profitable jobs, and it has a cascading effect.</p>
      <div className="split-notes"><div><img src={asset("/work-assets/accept-decline.png")} alt="" /><b>Marketplace health</b><span>Selective acceptance makes fulfilment less reliable for passengers.</span></div><div><img src={asset("/work-assets/driver-jacket.png")} alt="" /><b>Driver confidence</b><span>Drivers need enough information and control to make safe decisions.</span></div></div>
      <h3>Supporting experiment</h3><p>We ran experiments in Philippines, Malaysia and Singapore. Cross-market evidence supports replacing Manual (auto-reject) with Default-Accept (DA). When we enforce AA, it shows positive impact to business metrics, while re-allowing MA shows a negative impact.</p>
      <div className="markets"><span><img src={asset("/work-assets/dal/flag-philippines.svg")} alt="Philippines" />Entire auto-accept as the single acceptance mode</span><span><img src={asset("/work-assets/dal/flag-malaysia.svg")} alt="Malaysia" />Re-allowing Manual negatively impacts auto-accept</span><span><img src={asset("/work-assets/dal/flag-singapore.svg")} alt="Singapore" />Re-allowing Manual negatively impacts auto-accept</span></div>
      <h3>Goal</h3><p>Create a Default Accept experience that improves marketplace behaviour while keeping Turbo desirable and reduce Manual Accept-led cherry-picking.</p>
      <ol className="method-list">{steps.map((step) => <li key={step}>{step}</li>)}</ol>
      <section id="design"><p className="section-kicker">Initial design</p><h3>Design principle</h3><p>Drivers need enough information and control to make safe, informed decisions, especially while driving. However, Manual Accept makes it easier to cherry-pick jobs, which harms fulfilment and marketplace health. The challenge was to introduce automatic acceptance without making drivers feel that control had been removed unfairly.</p><ul>{principles.map((principle) => <li key={principle}>{principle}</li>)}</ul>
        <h3>Concept: Blocks of Job Card</h3><p>We currently have multiple job-card variants. To reduce drivers’ cognitive load and simplify the underlying architecture, we’re standardising the job card as a modular block with configurable elements.</p>
        <img className="wide-visual" src={asset("/work-assets/expand-collapse.png")} alt="Expanded and collapsed Default Accept job cards" />
        <div className="dal-offers" aria-label="Approved Default Accept and Turbo job card references from the DAX Design Library"><figure><img src={asset("/work-assets/dal/default-accept-offer.png")} alt="Default Accept job card" /><figcaption>Default Accept</figcaption></figure><figure><img src={asset("/work-assets/dal/turbo-offer.png")} alt="Turbo auto-accept job card" /><figcaption>Turbo Auto-Accept <img src={asset("/work-assets/dal/turbo-graphicon.png")} alt="" /></figcaption></figure></div>
        <img className="wide-visual" src={asset("/work-assets/current-changes.png")} alt="Current and changed Default Accept experience" />
      </section>
      <section id="research"><p className="section-kicker">Design</p><img className="wide-visual" src={asset("/work-assets/platforms.png")} alt="Default Accept on Android and iOS" /><p className="section-kicker">Research</p><h3>Objective</h3><p>Evaluate how drivers interpret and react to the Default Accept experience, and the implication to Turbo as the preferred driving mode. Before rollout, we need to understand whether drivers see Turbo as clearly more valuable than DA, understand what actions trigger penalties, and feel that the downgrade experience is fair but meaningful.</p>
        <div className="research-signals"><div><img src={asset("/work-assets/ear.png")} alt="" /><b>Usability</b><span>Drivers understand auto-accept behaviour, meaningful trip information, and consequences.</span></div><div><img src={asset("/work-assets/charger.png")} alt="" /><b>Success signals</b><span>Drivers can distinguish Turbo benefits from Default Accept limitations.</span></div></div>
      </section>
    </article></section>
  </main>;
}
