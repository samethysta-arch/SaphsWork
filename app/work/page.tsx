import PixelLink from "../../components/PixelLink";
import InteractiveCaseHero from "../../components/InteractiveCaseHero";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const metrics = [
  ["Effective Acceptance Rate (EAR)", "Whether more dispatched jobs are ultimately accepted; the clearest signal that Default Accept reduces cherry-picking."],
  ["Fulfilment Rate (FR)", "Whether the marketplace fulfils more passenger demand after the acceptance-mode change."],
  ["Driver cancellation rate", "A guardrail for jobs accepted by timeout and cancelled after allocation."],
  ["Driver retention and online time", "A guardrail for unintended withdrawal or reduced supply."],
];

const method = [
  ["Frame the opportunity", "Aligned business goals, driver needs, guardrails and success metrics."],
  ["Initial design", "Mapped the job-card system and translated the latest Auto-Accept pattern into Default Accept."],
  ["Phase 1 rollout", "Launched in selected Indonesian cities and monitored marketplace behaviour."],
  ["Evaluation and hypothesis", "Combined behavioural data with qualitative research to identify comprehension and control gaps."],
  ["Synthesise and iterate", "Converted findings into clearer consequences, alerts, recovery states and Turbo-value cues."],
];

const findings = [
  ["/work-assets/dal/turbo-graphicon.png", "Turbo remains the preferred experience", "Greater earnings and flexibility are the main pulls of Turbo."],
  ["/work-assets/dal/timer-universal.svg", "Default Accept comprehension looks strong", "Drivers understand that doing nothing until the timer ends means the job proceeds."],
  ["/work-assets/jacket.png", "Muscle memory initially hid the button change", "Once noticed, drivers agreed the proposed design communicated free-cancel more clearly."],
  ["/work-assets/driver-jacket.png", "Drivers preferred a screen takeover", "It lets them make an intentional choice before the job auto-accepts."],
];

const impact = [
  ["↑", "Effective Acceptance Rate (EAR)", "Default Accept improved EAR by +8.20pp in Semarang and +3.43pp in Palembang."],
  ["↓", "Fulfilment Rate (FR)", "FR declined across all three markets, from −0.38pp to −1.55pp; the decline was more material in Mataram."],
  ["↑", "Guardrail — Driver cancellation rate", "Timeout-accepted jobs were cancelled roughly 2–3× more often than explicitly accepted jobs."],
  ["✓", "Guardrail — Driver retention and online time", "Early data showed no broad driver-withdrawal signal; Turbo online hours were stable or increased."],
];

function Visual({ src, alt }: { src: string; alt: string }) {
  return <img className="study-visual" src={asset(src)} alt={alt} />;
}

export default function WorkPage() {
  return <main className="work-html">
    <aside className="study-rail" aria-label="Case study navigation">
      <PixelLink href="/" className="study-brand"><img src={asset("/work-assets/dal/dax-avatar.svg")} alt="Portfolio home" /></PixelLink>
      <nav><a href="#overview">01</a><a href="#design">02</a><a href="#research">03</a><a href="#impact">04</a></nav>
      <div className="rail-bottom"><img src={asset("/work-assets/dal/gitlab.svg")} alt="" /><img src={asset("/work-assets/dal/folder.svg")} alt="" /></div>
    </aside>

    <InteractiveCaseHero />

    <div className="study-shell" id="overview">
      <aside className="study-back"><PixelLink href="/"><img src={asset("/work-assets/dal/arrow-left.svg")} alt="" />Back</PixelLink></aside>
      <article className="study-content">
        <header><h2>In H2 2026, we introduced new type of Job Card when drivers receiving incoming booking to increase Acceptance Rate.</h2></header>
        <Visual src="/work-assets/job-card-variants.png" alt="Manual, Turbo Auto-Accept and Default Accept job cards" />
        <p>Drivers are originally allowed to choose their acceptance mode; Auto-accept (AA) and Manual (auto-reject). Drivers in (Turbo) New Auto-accept are more productive with higher trip per hour (TPOH), and across experiment in H1 2026, Turbo users accounted for 57% of online hours and 67% of rides.</p>
        <p>On the other hands, <strong>cherry-picking is breaking the marketplace.</strong> Drivers on Manual Accept selectively accept only the most profitable ones, and it has cascading effect:</p>

        <div className="finding-grid lead-findings"><div><img src={asset("/work-assets/accept-decline.png")} alt="" /><h4>Auto-accept drivers feel they get “left-over” jobs</h4><p>Worse jobs get flushed to remaining drivers, triggering a negative feedback loop.</p></div><div><img src={asset("/work-assets/charger.png")} alt="" /><h4>High fuel costs make cherry-picking more aggressive</h4><p>Far pickups become especially costly and frequent.</p></div></div>

        <h3>Supporting experiment</h3><p>We ran experiment in Philippines, Malaysia and Singapore. Cross-market evidence supports the direction to replace Manual (auto-reject) with Default-Accept (DA). When we enforce AA, it shows positive impact to business metrics, while re-allowing MA shows a negative impact.</p>
        <div className="market-list"><div><img src={asset("/work-assets/dal/flag-philippines.svg")} alt="Philippines" /><span><b>Enforce auto-accept as the single acceptance mode for Manila drivers</b><small>Delivered +5.4% rides, increased fulfilment and decreased time to pickup.</small></span></div><div><img src={asset("/work-assets/dal/flag-malaysia.svg")} alt="Malaysia" /><span><b>Re-allowing Manual in Klang Valley</b><small>Fulfilment dropped and pickup distance increased.</small></span></div><div><img src={asset("/work-assets/dal/flag-singapore.svg")} alt="Singapore" /><span><b>Re-allowing Manual in Singapore</b><small>Manual acceptance weakened marketplace outcomes.</small></span></div></div>

        <h3>Goal</h3><p>Create a Default Accept experience that improves marketplace behaviour while keeping Turbo desirable and reduce Manual Accept-led cherry-picking.</p>
        <div className="step-list">{metrics.map(([title, text], i) => <div key={title}><i>{i + 1}</i><span><b>{title}</b><small>{text}</small></span></div>)}</div>
        <h3>Method</h3><div className="method-list-html">{method.map(([title, text], i) => <div key={title}><i>{i + 1}</i><span><b>{title}</b><small>{text}</small></span><em>{i < 2 ? "Design" : i === 2 ? "Launch" : "Research"}</em></div>)}</div>

        <section id="design"><h2 className="section-title">Initial design</h2><h3>Design principle</h3><p>Drivers need enough information and control to make safe, informed decisions, especially while driving. However, Manual Accept makes it easier to cherry-pick jobs, which harms fulfilment and marketplace health. The challenge was to introduce automatic acceptance without making drivers feel that control had been removed unfairly. The design also needed to make clear:</p>
          <ul><li>The job will auto-accept when the timer expires.</li><li>What continue, skip, reject and cancel actions mean.</li><li>Turbo benefits remain clear, tangible and worth retaining.</li><li>Drivers see a clear recovery path after a downgrade.</li></ul>
          <h3>Concept: Blocks of Job Card</h3><p>We currently have multiple job-card variants. To reduce drivers’ cognitive load and simplify the underlying architecture, we’re standardising the job card as a modular block with configurable elements, while Default Accept follows the latest Auto Accept pattern.</p>
          <div className="variant-row"><b>Expandability</b><figure><img src={asset("/work-assets/manual-card.png")} alt="Manual job card" /><figcaption>MANUAL</figcaption></figure><figure><img src={asset("/work-assets/compact-card.png")} alt="New Auto-Accept job card" /><figcaption>(NEW) AUTO-ACCEPT</figcaption></figure><figure><img src={asset("/work-assets/dal/default-accept-offer.png")} alt="Default Accept job card" /><figcaption>DEFAULT-ACCEPT</figcaption></figure></div>
          <div className="comparison-table"><div><b>Expandability</b><span>Expanded</span><span>Compact</span><span>Hybrid</span></div><div><b>Ignore effect</b><span>Auto-reject</span><span>Auto-accept</span><span>Auto-accept</span></div><div><b>Reject effect</b><span>Penalty applied</span><span>Free cancel</span><span>Penalty applied</span></div></div>
          <h3>Design</h3><Visual src="/work-assets/expand-collapse.png" alt="Expanded and collapsed job cards" /><h4 className="visual-label">Alert concepting</h4><Visual src="/work-assets/platforms.png" alt="Android and iOS alert concepts" /><h4 className="visual-label">Design changes for Turbo</h4><Visual src="/work-assets/current-changes.png" alt="Current and proposed Turbo design" />
        </section>

        <section id="research"><h2 className="section-title">Research</h2><h3>Objective</h3><p>Evaluate how DAX interpret and react to the Default Accept experience, and the implication to Turbo as the preferred driving mode. Before rollout, we need to understand whether drivers see Turbo as clearly more valuable than DA, understand what actions trigger penalties, and feel that the downgrade experience is fair but meaningful.</p>
          <h4 className="signal-title">Usability</h4><p>Drivers understand that the job auto-accepts after timeout. Drivers can quickly scan meaningful trip information. Drivers understand the consequences of declining, ignoring, or cancelling. Drivers perceive the downgrade and recovery path as fair.</p>
          <h4 className="signal-title">Success signals</h4><p>Drivers can explain auto-accept behaviour unaided. Drivers distinguish Turbo benefits from Default Accept limitations. Drivers can identify policy consequences and recovery states. Drivers consider Turbo worth retaining for tangible earnings or operational benefits.</p>
          <h4 className="visual-label">Participants</h4><Visual src="/work-assets/participants.png" alt="Research participants" /><h4 className="visual-label">Key findings</h4>
          <div className="finding-grid">{findings.map(([icon, title, text]) => <div key={title}><img src={asset(icon)} alt="" /><h4>{title}</h4><p>{text}</p></div>)}</div>
        </section>

        <section id="impact"><h2 className="section-title">Post-release Impact</h2><p>Default Accept (DA) to replace MA was launched in Indonesia (Palembang, Semarang and Mataram) on 11 August 2026. While EAR improved, Dax post-acceptance cancellation rate was 2–5pp higher, and Driver Induced Passenger Cancel contribution to passenger post-allocation cancellations doubled.</p>
          <div className="impact-list">{impact.map(([mark, title, text]) => <div key={title}><i>{mark}</i><span><b>{title}</b><small>{text}</small></span></div>)}</div>
          <h2 className="section-title">Evaluative Research</h2><p>The next research phase focuses on why timeout-accepted jobs lead to more post-acceptance cancellation, what information is missing at decision time, and how recovery and consequence messaging can remain fair without weakening marketplace outcomes.</p>
        </section>
      </article>
      <nav className="study-anchor" aria-label="On this page"><a href="#overview">Overview</a><a href="#design">Design</a><a href="#research">Research</a><a href="#impact">Impact</a></nav>
    </div>
  </main>;
}
