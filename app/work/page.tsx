import PixelLink from "../../components/PixelLink";
import InteractiveCaseHero from "../../components/InteractiveCaseHero";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const metrics = [
  ["Effective Acceptance Rate (EAR)", "Whether more dispatched jobs are ultimately accepted; this is the clearest signal that Default Accept reduces cherry-picking."],
  ["Fulfilment Rate (FR)", "Shows whether more bookings successfully convert into completed rides."],
  ["Guardrail - Driver cancellation rate (CR)", "Default Accept should not create a sharp increase in cancellations after auto-accept."],
  ["Guardrail - Driver retention and online time", "Ensure drivers do not disengage, shorten sessions, or leave Turbo (or Grab) because they feel they have lost too much control."],
];

const method = [
  ["Frame the opportunity", "Reviewed marketplace and cross-market data to define how Manual Accept enabled cherry-picking and why Default Accept was needed.", "Design spec, PRD"],
  ["Initial design", "Designed the Default Accept MVP: auto-accept after timeout, fare visibility, Turbo-off differentiation, and clearer decline / policy states.", "Prototype, Design MVP"],
  ["[Phase 1] Release", "Used existing market evidence to assess the expected marketplace effect of reducing Manual Accept, including fulfilment, EAR, pickup distance, and driver behaviour.", ""],
  ["Evaluation and hypothesis", "Ran five moderated usability sessions with Singapore drivers to test job-card comprehension, auto-accept awareness, alerting, Turbo value, and policy fairness.", "Research"],
  ["Synthesise and iterate", "Converted findings into design changes: clearer timeout and consequence copy, actionable trip details, full-screen alerts, recovery countdowns, and tangible Turbo-value cues.", "Design"],
];

const researchFindings = [
  ["/work-assets/research-turbo-incentive.png", "Turbo remains the preferred experience", "“Greater earnings” and “Flexibility” are the main pulls of Turbo."],
  ["/work-assets/research-hourglass.png", "Auto-accept behavior is familiar in SG, so Default Accept comprehension looks strong", "Drivers understand do nothing until timer ends means job proceeds."],
  ["/work-assets/research-hand.png", "Drivers relied heavily on muscle memories, they didn’t initially notice the change in button", "However, once they noticed, they agreed the proposed design clearer in communicating free-cancel."],
  ["/work-assets/research-notification.png", "Dax generally preferred a screen takeover over push notification", "Because it allow them to make an intentional choice before the job auto-accepts."],
];

const impact = [
  ["↑", "Effective Acceptance Rate (EAR)", "Default Accept improved EAR by +8.20pp in Semarang and +3.43pp in Palembang."],
  ["↓", "Fulfilment Rate (FR)", "FR declined across all three markets, from −0.38pp to −1.55pp. The decline was small in Semarang and Palembang, and more material in Mataram."],
  ["↑", "Guardrail - Driver cancellation rate (CR)", "Jobs accepted by timeout were cancelled by drivers roughly 2–3× more often than jobs drivers explicitly accepted."],
  ["✓", "Guardrail - Driver retention and online time", "There is no broad driver-withdrawal signal in the early two-week data. Turbo online-hour was stable or increased."],
];

function Visual({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img className={`study-visual ${className}`} src={asset(src)} alt={alt} />;
}

function Steps({ items }: { items: string[][] }) {
  return <div className="step-list">{items.map(([title, text], i) => <div key={title}><i>{i + 1}</i><span><b>{title}</b><small>{text}</small></span></div>)}</div>;
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
        <p>Drivers are originally allowed to choose their acceptance mode; Auto-accept (AA) and Manual (auto-reject). Drivers in (Turbo) New Auto-accept are more productive with higher trip per hour (TPOH), and across experiment in H1 2026, Turbo users accounted for 57% of online hours and 67% of rides. On the other hands, cherry-picking is breaking the marketplace. Drivers on Manual Accept (MA) selectively accept only the most profitable ones, and it has cascading effect:</p>

        <div className="finding-grid lead-findings"><div><img src={asset("/work-assets/accept-decline.png")} alt="" /><h4>Auto-accept Dax, segment that gives us most benefit, feel they get “left-over” job</h4><p>Worse jobs get flushed to remaining drivers, triggering a negative feedback loop.</p></div><div><img src={asset("/work-assets/charger.png")} alt="" /><h4>High fuel costs are making cherry-picking more aggressive</h4><p>Far pick up become especially costly and frequent.</p></div></div>

        <h3>Supporting experiment</h3><p>We ran experiment in Philippines, Malaysia and Singapore. Cross-market evidence supports the direction to replace Manual (auto-reject) with Default-Accept (DA). When we enforce AA, it shows positive impact to business metrics, in the meantime re-allowing MA shows a negative impact.</p>
        <div className="market-list"><div><img src={asset("/work-assets/dal/flag-philippines.svg")} alt="Philippines" /><span><b>Enforce auto-accept as the single acceptance mode for Manila drivers</b><small>Delivered +5.4% rides, increase in Fulfillment Rates, and ~24% decrease in time to pickup.</small></span></div><div><img src={asset("/work-assets/dal/flag-malaysia.svg")} alt="Malaysia" /><span><b>Re-allowing Manual in Klang Valley (previously force auto-accept)</b><small>Fulfillment Rates dropped 1pp, and pickup distance increased 13%.</small></span></div><div><img src={asset("/work-assets/dal/flag-singapore.svg")} alt="Singapore" /><span><b>Re-allowing Manual (previously force auto-accept)</b><small>EAR dropped 15pp among active PHV drivers.</small></span></div></div>

        <h3>Goal</h3><p>Create a Default Accept experience that improves marketplace behaviour while keeping Turbo desirable and reduce Manual Accept-led cherry-picking.</p>
        <Steps items={metrics} />
        <h3>Method</h3><div className="method-list-html">{method.map(([title, text, output], i) => <div key={title}><i>{i + 1}</i><span><b>{title}</b><small>{text}</small>{output && <em>{output}</em>}</span></div>)}</div>

        <section id="design"><h2 className="section-title">Initial design</h2><h3>Design principle</h3><p>Drivers need enough information and control to make safe, informed decisions, especially while driving. However, Manual Accept makes it easier to cherry-pick jobs, which harms fulfilment and marketplace health. The challenge was to introduce automatic acceptance without making drivers feel that control had been removed unfairly. The design also needed to make clear:</p>
          <ol className="principle-list"><li>That a job will auto-accept when the timer expires. It needs to alerted drivers.</li><li>What “Continue,” “Skip,” reject, cancel, and ignore actions mean.</li><li>Position Turbo as the preferred driving mode.</li><li>Drivers need a clear alert to reduce timeout-based accepts and the risk of cancellations after acceptance.</li></ol>
          <h3>Concept: Blocks of Job Card</h3><p>We currently have multiple job-card variants. To reduce drivers’ cognitive load and simplify the underlying architecture, we’re standardising the job card as a modular block with e configurable elements as follow, while the Default Accept design follows the latest Auto Accept pattern.</p>
          <div className="variant-row"><b></b><figure><img src={asset("/work-assets/manual-card.png")} alt="Manual job card" /><figcaption>MANUAL</figcaption></figure><figure><img src={asset("/work-assets/compact-card.png")} alt="New Auto-Accept job card" /><figcaption>(NEW) AUTO-ACCEPT</figcaption></figure><figure><img src={asset("/work-assets/default-card.png")} alt="Default Accept job card" /><figcaption>DEFAULT-ACCEPT</figcaption></figure></div>
          <div className="comparison-table"><div><b>Expandability</b><span>Expanded</span><span>Compact</span><span>Hybrid</span></div><div><b>Ignore effect</b><span>Auto-reject</span><span>Auto-accept</span><span>Auto-accept</span></div><div><b>Reject effect</b><span>Penalty applied</span><span>Free cancel</span><span>Penalty applied</span></div></div>
          <h3>Design</h3><Visual src="/work-assets/expand-collapse.png" alt="Expanded and collapsed job cards" /><h4 className="visual-label">Alert concepting</h4><Visual src="/work-assets/platforms.png" alt="Android and iOS alert concepts" /><h4 className="visual-label">Design changes for Turbo</h4><Visual src="/work-assets/current-changes.png" alt="Current and proposed Turbo design" />
        </section>

        <section id="research"><h2 className="section-title">Research</h2><h3>Objective</h3><p>Evaluate how DAX interpret and react to the Default Accept experience, and the implication to Turbo as the preferred driving mode Before rollout, we need to understand whether drivers see Turbo as clearly more valuable than DA, understand what actions trigger penalties, and feel that the downgrade experience is fair but meaningful.</p>
          <h4 className="signal-title">Usability</h4><p>Drivers understand that the job auto-accepts after timeout. Drivers can quickly scan meaningful trip information. Drivers understand the consequences of declining, ignoring, or cancelling. Drivers perceive the downgrade and recovery path as fair.</p>
          <h4 className="signal-title">Success signals</h4><p>Drivers can explain auto-accept behaviour unaided. Drivers distinguish Turbo benefits from Default Accept limitations. Drivers can identify policy consequences and recovery states. Drivers consider Turbo worth retaining for tangible earnings or operational benefits.</p>
          <h4 className="visual-label">Participants</h4><Visual src="/work-assets/participants.png" alt="Research participants" /><h4 className="visual-label">Key findings</h4>
          <div className="finding-grid">{researchFindings.map(([icon, title, text]) => <div key={title}><img src={asset(icon)} alt="" /><h4>{title}</h4><p>{text}</p></div>)}</div>
        </section>

        <section id="impact"><h2 className="section-title">Post-release Impact</h2><p>Default Accept (DA) to replace MA was launched in Indonesia (Palembang, Semarang and Mataram) on 11 August 2026. While EAR improved, Dax post-acceptance cancellation rate was 2–5pp higher, and (Driver induced passenger cancel) DIPC’s contribution to passenger post-allocation cancellations doubled.</p>
          <Visual src="/work-assets/impact-chart.png" alt="Default Accept post-release impact chart" className="impact-chart" />
          <div className="impact-list">{impact.map(([mark, title, text]) => <div key={title}><i>{mark}</i><span><b>{title}</b><small>{text}</small></span></div>)}</div>

          <h2 className="section-title">Evaluative Research</h2><h4 className="visual-label">Objective</h4><p>Default Accept (DA), which replaces Manual Accept (MA), was launched in Indonesia, specifically in Palembang, Semarang, and Mataram, on 11 August 2026. While EAR improved, DAX post-acceptance cancellation rates increased by 2–5 pp. DIPC’s contribution to passenger post-allocation cancellations also doubled. Beyond evaluating driver sentiment and gathering qualitative insights, this research aims to understand the factors behind the increase in post-acceptance cancellation rates.</p>
          <h4 className="visual-label">Methods</h4>
          <div className="participant-strip">{[["eval-palembang-turbo.png","Palembang, Turbo"],["eval-semarang-turbo.png","Semarang, Turbo"],["eval-palembang-manual.png","Palembang, MANUAL"],["eval-semarang-manual.png","SEMARANG, MANUAL"]].map(([src,label])=><figure key={src}><img src={asset(`/work-assets/${src}`)} alt=""/><figcaption>{label}</figcaption></figure>)}</div>
          <div className="research-methods"><div><img src={asset("/work-assets/help-centre.png")} alt=""/><span><b>Rebot (AI-Robo-Call)</b><p>Provides the broad early signal: awareness of DA, self-reported accidental acceptance, alert and timer experience, and behavioural adaptation.</p><small>Palembang: 178 · Semarang: 56</small></span></div><div><img src={asset("/work-assets/microphone.png")} alt=""/><span><b>FGD</b><p>Explains the behavioural mechanisms behind the Rebot patterns and the observed rise in post-allocation CR. The drivers are segmented based on Turbo-heavy and MA-heavy group.</p><small>Palembang: 6 · Semarang: 6</small></span></div></div>

          <h4 className="visual-label">Key insights</h4><span className="study-pill">Overall sentiment</span>
          <div className="insight-split insight-sentiment"><div><img src={asset("/work-assets/sentiment-semarang.png")} alt="Semarang sentiment"/><img src={asset("/work-assets/sentiment-palembang.png")} alt="Palembang sentiment"/></div><span><b>Most drivers recognise DA = auto-accept.<br/>Semarang has positive sentiment as DA prevents Account Timeout due to missed bookings.</b><p>However, Palembang has neutral sentiment towards tolerating, since DA made them required active attention to decline.</p><p>Most MA-heavy dax in FGD are single-app and didn’t express an intention to start dual-apping.</p></span></div>

          <span className="study-pill">What made post-acceptance cancel and DIPC?</span>
          <div className="insight-card"><b>Across 2 cities, 14% of offers timed out. After a time-out accept, most drivers continue the booking; some cancel only when the pickup is too far (&gt;2~3 km).</b><p>Main reasons for time-out accept:</p><div className="insight-split compact"><img src={asset("/work-assets/timeout-accept.png")} alt="Timeout acceptance"/><ol><li>Driving in traffic or rain;</li><li>On a break, praying, refuelling, or using the restroom.</li><li>Finishing another trip or receiving a stacked booking;</li><li>Dealing with low volume, a missed ringtone, weak signal, or a slow device;</li></ol></div></div>

          <div className="insight-card"><b>Additionally, the resistance (negative sentiment towards DA) mainly come from the missed bookings due to late awareness when booking come</b><div className="insight-split compact"><img src={asset("/work-assets/alert-timer.png")} alt="Default Accept alert and timer"/><Steps items={[["They are accustomed to their own alert tone.","The tone is perceived as too soft, inaudible, or absent. Additionally there’s a bug in production where the drivers can’t set their customise ringtones"],["Drivers perceived DA’s timer as 10s, while the duration in reality is 15s","This aligns with data: Across Semarang and Palembang, the middle 80% have just 9–13 seconds to notice, assess, and act; Mataram is similar at 9–14 seconds."]]} /></div></div>

          <span className="study-pill">USABILITY</span><div className="insight-split usability"><img src={asset("/work-assets/usability-buttons.png")} alt="Button usability comparison"/><span><b>🤔 Drivers use muscle memory for actions, hence didn’t initially notice the change in button</b><p>Similar with findings in Singapore, they relied mainly on button position: left = cancel/reject, right = accept.</p><p>The change itself did not feel material to drivers, they feel neutral about it. Their understanding largely came from prior education through Inbox or official communications.</p></span></div>

          <h2 className="section-title">What’s next</h2><Visual src="/work-assets/whats-next.png" alt="Default Accept next phase" className="whats-next"/><div className="closing-copy"><b>Default Accept proved that increasing acceptance is possible without broad driver withdrawal: EAR improved in Semarang and Palembang, and drivers generally understood the auto-accept model.</b><p>However, Timeout-accepted jobs were more likely to become later cancellations or DIPC. The next phase focused on turning passive timeout acceptance into informed acceptance:</p><ol><li>Improve the decision moment, by A/B Test an 18-second timer.</li><li>More noticeable/customisable alerts</li><li>Expand to Delivery bookings</li></ol></div>
        </section>
      </article>
      <nav className="study-anchor" aria-label="On this page"><a href="#overview">Overview</a><a href="#design">Design</a><a href="#research">Research</a><a href="#impact">Impact</a></nav>
    </div>
  </main>;
}
