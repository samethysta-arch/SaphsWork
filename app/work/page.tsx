import type { Metadata } from "next";
import PixelLink from "../../components/PixelLink";
import InteractiveCaseHero from "../../components/InteractiveCaseHero";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

export const metadata: Metadata = {
  title: "Default Accept — Driver Experience Case Study",
  description: "How Default Accept changed driver booking acceptance, what research revealed, and how the rollout affected marketplace outcomes.",
  alternates: { canonical: "/work/" },
};

const metrics = [
  ["Effective Acceptance Rate (EAR)", "The share of dispatched jobs that are ultimately accepted. This is the clearest signal that Default Accept reduces cherry-picking."],
  ["Fulfilment Rate (FR)", "The share of bookings that successfully convert into completed rides."],
  ["Guardrail — Driver cancellation rate (CR)", "Default Accept should not cause a sharp increase in cancellations after auto-accept."],
  ["Guardrail — Driver retention and online time", "Ensure drivers do not disengage, shorten sessions, or leave Turbo (or Grab) because they feel they have lost too much control."],
];

const method = [
  ["Frame the opportunity", "Reviewed marketplace and cross-market data to understand how Manual Accept enabled cherry-picking and why Default Accept was needed.", "Design spec, PRD"],
  ["Initial design", "Designed the Default Accept MVP: auto-accept after timeout, fare visibility, Turbo-off differentiation, and clearer decline / policy states.", "Prototype, Design MVP"],
  ["Phase 1 release", "Used existing market evidence to assess the expected effect of reducing Manual Accept on fulfilment, EAR, pickup distance, and driver behaviour.", ""],
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
  return <img className={`study-visual ${className}`} src={asset(src)} alt={alt} loading="lazy" decoding="async" />;
}

function Steps({ items }: { items: string[][] }) {
  return <div className="step-list">{items.map(([title, text], i) => <div key={title}><i>{i + 1}</i><span><b>{title}</b><small>{text}</small></span></div>)}</div>;
}

export default function WorkPage() {
  return <main className="work-html">
    <aside className="study-rail" aria-label="Case study navigation">
      <PixelLink href="/" className="study-brand"><img loading="lazy" decoding="async" src={asset("/work-assets/dal/dax-avatar.svg")} alt="Portfolio home" /></PixelLink>
      <nav><a href="#overview">01</a><a href="#design">02</a><a href="#research">03</a><a href="#impact">04</a></nav>
      <div className="rail-bottom"><img loading="lazy" decoding="async" src={asset("/work-assets/dal/gitlab.svg")} alt="" /><img loading="lazy" decoding="async" src={asset("/work-assets/dal/folder.svg")} alt="" /></div>
    </aside>

    <InteractiveCaseHero />

    <div className="study-shell" id="overview">
      <aside className="study-back"><PixelLink href="/"><img loading="lazy" decoding="async" src={asset("/work-assets/dal/arrow-left.svg")} alt="" />Back</PixelLink></aside>
      <article className="study-content">
        <header><h2>In H2 2026, we introduced a new job card for incoming bookings to increase acceptance rates.</h2></header>
          <div className="case-summary" aria-label="Case study summary">
          <div><strong>Challenge</strong><p>Manual Accept encouraged cherry-picking, weakening marketplace fulfilment and leaving Auto-Accept drivers with less desirable jobs.</p></div>
          <div><strong>Design response</strong><p>Introduced Default Accept with a clear timeout, fare visibility, differentiated Turbo value, and more explicit decline and policy states.</p></div>
            <div><strong>Early results</strong><p>EAR rose by 8.20pp in Semarang and 3.43pp in Palembang. Fulfilment declined by 0.38–1.55pp; timeout-accepted jobs were cancelled 2–3× as often as explicitly accepted jobs.</p></div>
        </div>
        <Visual src="/work-assets/job-card-variants.webp" alt="Manual, Turbo Auto-Accept and Default Accept job cards" />
        <p>Drivers could choose between Auto-Accept (AA) and Manual Accept (MA, which auto-rejects). Drivers using Turbo with New Auto-Accept were more productive, with higher trips per online hour (TPOH). In H1 2026, Turbo users accounted for 57% of online hours and 67% of rides. At the same time, cherry-picking harmed the marketplace: drivers using Manual Accept selectively accepted the most profitable jobs, creating a cascading effect.</p>

        <div className="finding-grid lead-findings"><div><img loading="lazy" decoding="async" src={asset("/work-assets/accept-decline.png")} alt="" /><h4>Auto-Accept drivers felt they were getting the “leftover” jobs</h4><p>Less desirable jobs were passed to the remaining drivers, creating a negative feedback loop.</p></div><div><img loading="lazy" decoding="async" src={asset("/work-assets/charger.png")} alt="" /><h4>High fuel costs made cherry-picking more aggressive</h4><p>Long pickup distances became especially costly and frequent.</p></div></div>

        <h3>Supporting experiments</h3><p>We ran experiments in the Philippines, Malaysia, and Singapore. Evidence across these markets supported replacing Manual Accept (auto-reject) with Default Accept (DA). Enforcing Auto-Accept improved business metrics, while re-allowing Manual Accept had a negative impact.</p>
        <div className="market-list"><div><img loading="lazy" decoding="async" src={asset("/work-assets/dal/flag-philippines.svg")} alt="Philippines" /><span><b>Enforced Auto-Accept as the single acceptance mode for Manila drivers</b><small>Rides increased by 5.4%, fulfilment improved, and time to pickup decreased by about 24%.</small></span></div><div><img loading="lazy" decoding="async" src={asset("/work-assets/dal/flag-malaysia.svg")} alt="Malaysia" /><span><b>Re-allowed Manual Accept in Klang Valley after enforcing Auto-Accept</b><small>Fulfilment fell by 1pp, and pickup distance increased by 13%.</small></span></div><div><img loading="lazy" decoding="async" src={asset("/work-assets/dal/flag-singapore.svg")} alt="Singapore" /><span><b>Re-allowed Manual Accept after enforcing Auto-Accept</b><small>EAR fell by 15pp among active PHV drivers.</small></span></div></div>

        <h3>Goal</h3><p>Create a Default Accept experience that improves marketplace behaviour, keeps Turbo desirable, and reduces Manual Accept-led cherry-picking.</p>
        <Steps items={metrics} />
        <h3>Method</h3><div className="method-list-html">{method.map(([title, text, output], i) => <div key={title}><i>{i + 1}</i><span><b>{title}</b><small>{text}</small>{output && <em>{output}</em>}</span></div>)}</div>

        <section id="design"><h2 className="section-title">Initial design</h2><h3>Design principle</h3><p>Drivers need enough information and control to make safe, informed decisions, especially while driving. However, Manual Accept makes it easier to cherry-pick jobs, which harms fulfilment and marketplace health. The challenge was to introduce automatic acceptance without making drivers feel that control had been removed unfairly. The design also needed to make clear:</p>
          <ol className="principle-list"><li>Clearly alert drivers that a job will auto-accept when the timer expires.</li><li>Clarify what “Continue,” “Skip,” reject, cancel, and ignore actions mean.</li><li>Position Turbo as the preferred driving mode.</li><li>Reduce timeout-based acceptance and the risk of cancellations with a clear alert.</li></ol>
          <h3>Concept: Modular job-card blocks</h3><p>We had multiple job-card variants. To reduce drivers’ cognitive load and simplify the underlying architecture, we standardised the job card as a modular block with configurable elements. Default Accept follows the latest Auto-Accept pattern.</p>
          <div className="variant-row"><b></b><figure><img loading="lazy" decoding="async" src={asset("/work-assets/manual-card.png")} alt="Manual job card" /><figcaption>MANUAL</figcaption></figure><figure><img loading="lazy" decoding="async" src={asset("/work-assets/compact-card.png")} alt="New Auto-Accept job card" /><figcaption>(NEW) AUTO-ACCEPT</figcaption></figure><figure><img loading="lazy" decoding="async" src={asset("/work-assets/default-card.png")} alt="Default Accept job card" /><figcaption>DEFAULT-ACCEPT</figcaption></figure></div>
          <div className="comparison-table"><div><b>Expandability</b><span>Expanded</span><span>Compact</span><span>Hybrid</span></div><div><b>Ignore effect</b><span>Auto-reject</span><span>Auto-accept</span><span>Auto-accept</span></div><div><b>Reject effect</b><span>Penalty applied</span><span>Free cancel</span><span>Penalty applied</span></div></div>
          <h3>Design</h3><Visual src="/work-assets/expand-collapse.webp" alt="Expanded and collapsed job cards" /><h4 className="visual-label">Alert concepting</h4><Visual src="/work-assets/platforms.webp" alt="Android and iOS alert concepts" /><h4 className="visual-label">Design changes for Turbo</h4><Visual src="/work-assets/current-changes.webp" alt="Current and proposed Turbo design" />
        </section>

        <section id="research"><h2 className="section-title">Research</h2><h3>Objective</h3><p>We evaluated how drivers interpreted and responded to Default Accept, and how it affected their view of Turbo as the preferred driving mode. Before rollout, we needed to learn whether drivers saw Turbo as clearly more valuable than Default Accept, understood which actions triggered penalties, and considered the downgrade experience fair and meaningful.</p>
          <h4 className="signal-title">Usability</h4><p>Drivers understand that a job auto-accepts after timeout and can quickly scan the trip information. They understand the consequences of declining, ignoring, or cancelling, and consider the downgrade and recovery path fair.</p>
          <h4 className="signal-title">Success signals</h4><p>Drivers can explain auto-accept behaviour without help, distinguish Turbo benefits from Default Accept limitations, identify policy consequences and recovery states, and see tangible earnings or operational benefits in keeping Turbo.</p>
          <h4 className="visual-label">Participants</h4><Visual src="/work-assets/participants.gif" alt="Research participants" /><h4 className="visual-label">Key findings</h4>
          <div className="finding-grid">{researchFindings.map(([icon, title, text]) => <div key={title}><img loading="lazy" decoding="async" src={asset(icon)} alt="" /><h4>{title}</h4><p>{text}</p></div>)}</div>
        </section>

        <section id="impact"><h2 className="section-title">Post-release impact</h2><p>Default Accept replaced Manual Accept in Palembang, Semarang, and Mataram, Indonesia, on 11 August 2026. EAR improved, while driver post-acceptance cancellations increased by 2–5pp. Driver-induced passenger cancellations (DIPC) also doubled as a share of passenger post-allocation cancellations.</p>
          <Visual src="/work-assets/impact-chart.png" alt="Default Accept post-release impact chart" className="impact-chart" />
          <div className="impact-list">{impact.map(([mark, title, text]) => <div key={title}><i>{mark}</i><span><b>{title}</b><small>{text}</small></span></div>)}</div>

          <h2 className="section-title">Evaluative research</h2><h4 className="visual-label">Objective</h4><p>After Default Accept launched in Palembang, Semarang, and Mataram on 11 August 2026, EAR improved but driver post-acceptance cancellation rates increased by 2–5pp. DIPC also doubled as a share of passenger post-allocation cancellations. This research explored driver sentiment and the factors behind the increase in cancellations.</p>
          <h4 className="visual-label">Methods</h4>
          <div className="participant-strip">{[["eval-palembang-turbo.png","Palembang, Turbo"],["eval-semarang-turbo.png","Semarang, Turbo"],["eval-palembang-manual.png","Palembang, MANUAL"],["eval-semarang-manual.png","SEMARANG, MANUAL"]].map(([src,label])=><figure key={src}><img loading="lazy" decoding="async" src={asset(`/work-assets/${src}`)} alt=""/><figcaption>{label}</figcaption></figure>)}</div>
          <div className="research-methods"><div><img loading="lazy" decoding="async" src={asset("/work-assets/help-centre.png")} alt=""/><span><b>Rebot (AI-Robo-Call)</b><p>Provided an early signal of driver awareness of Default Accept, reported accidental acceptance, alert and timer experience, and behavioural adaptation.</p><small>Palembang: 178 · Semarang: 56</small></span></div><div><img loading="lazy" decoding="async" src={asset("/work-assets/microphone.png")} alt=""/><span><b>Focus group discussions (FGD)</b><p>Explained the behaviours behind the Rebot patterns and the increase in post-allocation cancellation rates. Drivers were grouped by their use of Turbo or Manual Accept.</p><small>Palembang: 6 · Semarang: 6</small></span></div></div>

          <h4 className="visual-label">Key insights</h4><span className="study-pill">Overall sentiment</span>
          <div className="insight-split insight-sentiment"><div><img loading="lazy" decoding="async" src={asset("/work-assets/sentiment-semarang.png")} alt="Semarang sentiment"/><img loading="lazy" decoding="async" src={asset("/work-assets/sentiment-palembang.png")} alt="Palembang sentiment"/></div><span><b>Most drivers recognised Default Accept as auto-accept.<br/>In Semarang, drivers responded positively because Default Accept prevented account timeouts caused by missed bookings.</b><p>In Palembang, sentiment was more neutral: drivers felt they had to stay alert to decline a booking.</p><p>Most drivers in the Manual Accept-heavy focus groups used only one app and did not express an intention to start using multiple apps.</p></span></div>

          <span className="study-pill">What contributed to post-acceptance cancellations and DIPC?</span>
          <div className="insight-card"><b>In two cities, 14% of offers timed out. After a timeout acceptance, most drivers continued the booking; some cancelled when the pickup was more than 2–3 km away.</b><p>Main reasons for timeout acceptance:</p><div className="insight-split compact"><img loading="lazy" decoding="async" src={asset("/work-assets/timeout-accept.png")} alt="Timeout acceptance"/><ol><li>Driving in traffic or rain;</li><li>Taking a break, praying, refuelling, or using the restroom;</li><li>Finishing another trip or receiving a stacked booking;</li><li>Low booking volume, a missed ringtone, weak signal, or a slow device.</li></ol></div></div>

          <div className="insight-card"><b>Drivers who felt negatively about Default Accept mainly described missing bookings because they were not alerted in time.</b><div className="insight-split compact"><img loading="lazy" decoding="async" src={asset("/work-assets/alert-timer.png")} alt="Default Accept alert and timer"/><Steps items={[["Drivers were accustomed to their own alert tones.","Some perceived the tone as too soft, inaudible, or absent. A production bug also prevented drivers from setting a custom ringtone."],["Drivers perceived the timer as 10 seconds, although it lasted 15 seconds.","Across Semarang and Palembang, the middle 80% of drivers had only 9–13 seconds to notice, assess, and act. Mataram was similar at 9–14 seconds."]]} /></div></div>

          <span className="study-pill">Usability</span><div className="insight-split usability"><img loading="lazy" decoding="async" src={asset("/work-assets/usability-buttons.png")} alt="Button usability comparison"/><span><b>Drivers relied on muscle memory and did not initially notice the button change.</b><p>As in the Singapore research, they relied mainly on button position: left meant cancel or reject, and right meant accept.</p><p>Once noticed, the change did not feel significant; drivers were neutral about it. Their understanding largely came from prior education through Inbox or official communications.</p></span></div>

          <h2 className="section-title">What’s next</h2><Visual src="/work-assets/whats-next.gif" alt="Default Accept next phase" className="whats-next"/><div className="closing-copy"><b>Default Accept showed that acceptance could increase without broad driver withdrawal: EAR improved in Semarang and Palembang, and drivers generally understood the auto-accept model.</b><p>However, timeout-accepted jobs were more likely to result in cancellations or DIPC. The next phase focused on turning passive timeout acceptance into informed acceptance:</p><ol><li>Test an 18-second timer to improve the decision moment.</li><li>Make alerts more noticeable and customisable.</li><li>Expand to delivery bookings.</li></ol></div>
        </section>
      </article>
      <nav className="study-anchor" aria-label="On this page"><a href="#overview">Overview</a><a href="#design">Design</a><a href="#research">Research</a><a href="#impact">Impact</a></nav>
    </div>
  </main>;
}
