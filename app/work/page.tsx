import type { Metadata } from "next";
import InteractiveCaseHero from "../../components/InteractiveCaseHero";
import CaseChapterNav from "../../components/CaseChapterNav";
import { PageFrame } from "../../components/FormoChrome";

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

const principles = [
  "Clearly alert drivers that a job will auto-accept when the timer expires.",
  "Clarify what “Continue,” “Skip,” reject, cancel, and ignore actions mean.",
  "Position Turbo as the preferred driving mode.",
  "Reduce timeout-based acceptance and the risk of cancellations with a clear alert.",
];

const researchFindings = [
  ["Turbo remains the preferred experience", "“Greater earnings” and “Flexibility” are the main pulls of Turbo."],
  ["Auto-accept behavior is familiar in SG, so Default Accept comprehension looks strong", "Drivers understand do nothing until timer ends means job proceeds."],
  ["Drivers relied heavily on muscle memories, they didn’t initially notice the change in button", "However, once they noticed, they agreed the proposed design clearer in communicating free-cancel."],
  ["They generally preferred a screen takeover over push notification", "Because it allow them to make an intentional choice before the job auto-accepts."],
];

const impact = [
  ["↑", "Effective Acceptance Rate (EAR)", "Default Accept improved EAR by +8.20pp in Semarang and +3.43pp in Palembang."],
  ["↓", "Fulfilment Rate (FR)", "FR declined across all three markets, from −0.38pp to −1.55pp. The decline was small in Semarang and Palembang, and more material in Mataram."],
  ["↑", "Guardrail — Driver cancellation rate (CR)", "Jobs accepted by timeout were cancelled by drivers roughly 2–3× more often than jobs drivers explicitly accepted."],
  ["✓", "Guardrail — Driver retention and online time", "There is no broad driver-withdrawal signal in the early two-week data. Turbo online-hour was stable or increased."],
];

function Visual({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img className={`study-visual ${className}`} src={asset(src)} alt={alt} loading="lazy" decoding="async" />;
}

function NumberedList({ items }: { items: string[] }) {
  return <ol className="study-numbered-list">{items.map((item, index) => <li key={item}><span aria-hidden="true">{index + 1}</span>{item}</li>)}</ol>;
}

export default function WorkPage() {
  return <PageFrame><main className="work-html">
    <CaseChapterNav />
    <InteractiveCaseHero />

    <article className="study-content">
      <section className="study-section overview-section" id="overview">
        <h2>Overview</h2>
        <p className="overview-lead">In H2 2026, we introduced a new job card for incoming bookings to increase acceptance rates.</p>
        <div className="case-summary" aria-label="Case study overview">
          <div><strong>Challenge</strong><p>Manual Accept encouraged cherry-picking, weakening marketplace fulfilment and leaving Auto-Accept drivers with less desirable jobs.</p></div>
          <div><strong>Solution</strong><p>Introducing Default Accept to gradually replacing Manual Accept, with fare visibility, differentiated Turbo value, and more explicit decline policy.</p></div>
          <div><strong>Early result</strong><p>EAR rose by 8.20pp in Semarang and 3.43pp in Palembang. Fulfilment declined by 0.38–1.55pp; timeout-accepted jobs were cancelled 2–3× as often as explicitly accepted jobs.</p></div>
          <div><strong>Role</strong><p>Lead designer, researcher</p></div>
        </div>
      </section>

      <section className="study-section" id="why-default-accept">
        <h2>Why shifting to Default Accept?</h2>
        <h3>01 Background</h3>
        <div className="background-feature">
          <Visual src="/work-assets/initial-design.webp" alt="Manual and Auto-Accept job cards for a multi-stop booking" className="initial-design-visual" />
          <div className="background-copy">
            <p>Currently, drivers could choose between Auto-Accept (AA) and Manual Accept (MA, which auto-rejects).</p>
            <p>Drivers using Turbo with New Auto-Accept were more productive, with higher trips per online hour (TPOH).</p>
            <p>In H1 2026, Turbo users accounted for 57% of online hours and 67% of rides.</p>
            <p>At the same time, cherry-picking harmed the marketplace: drivers using Manual Accept selectively accepted the most profitable jobs, creating a cascading effect.</p>
          </div>
        </div>

        <h3>02 Experiment results</h3>
        <p>Before we purposed this initiative, we ran experiments in the Philippines, Malaysia, and Singapore. Evidence across these markets supported replacing Manual Accept (auto-reject) with Default Accept (DA). Enforcing Auto-Accept improved business metrics, while re-allowing Manual Accept had a negative impact.</p>
        <div className="market-list">
          <div><img src={asset("/work-assets/dal/flag-philippines.svg")} alt="Philippines" /><span><b>Enforced Auto-Accept as the single acceptance mode for Manila drivers</b><small>Rides increased by 5.4%, fulfilment improved, and time to pickup decreased by about 24%.</small></span></div>
          <div><img src={asset("/work-assets/dal/flag-malaysia.svg")} alt="Malaysia" /><span><b>Re-allowed Manual Accept in Klang Valley after enforcing Auto-Accept</b><small>Fulfilment fell by 1pp, and pickup distance increased by 13%.</small></span></div>
          <div><img src={asset("/work-assets/dal/flag-singapore.svg")} alt="Singapore" /><span><b>Re-allowed Manual Accept after enforcing Auto-Accept</b><small>EAR fell by 15pp among active PHV drivers.</small></span></div>
        </div>
      </section>

      <section className="study-section goal-section" id="goal">
        <div className="goal-copy">
          <h2><span aria-hidden="true">＋</span> Goal</h2>
          <p className="goal-statement">Create a Default Accept experience that improves marketplace behaviour, keeps Turbo desirable, and reduces Manual Accept-led cherry-picking.</p>
        </div>
        <div className="metric-grid">{metrics.map(([title, text], i) => <div className="metric-item" key={title}><i>{i + 1}</i><span><b>{title}</b><small>{text}</small></span></div>)}</div>
      </section>

      <section className="study-section" id="concept">
        <h2>Concept</h2>
        <h3>01 Design principles</h3>
        <p>Drivers need enough information and control to make safe, informed decisions, especially while driving. However, Manual Accept makes it easier to cherry-pick jobs, which harms fulfilment and marketplace health. The challenge was to introduce automatic acceptance without making drivers feel that control had been removed unfairly.</p>
        <NumberedList items={principles} />

        <h3>02 Modularization for Job Card</h3>
        <p>We had multiple job-card variants. To reduce drivers’ cognitive load and simplify the underlying architecture, we standardised the job card as a modular block with configurable elements. Default Accept follows the latest Auto-Accept pattern.</p>
        <div className="comparison-scroll" role="region" aria-label="Job card variant comparison" tabIndex={0}>
          <table className="variant-table">
            <thead><tr><th aria-label="Comparison"></th><th><img src={asset("/work-assets/manual-card.png")} alt="Manual job card" /><span>MANUAL</span></th><th><img src={asset("/work-assets/compact-card.png")} alt="New Auto-Accept job card" /><span>AUTO-ACCEPT</span></th><th><img src={asset("/work-assets/default-card.png")} alt="Default Accept job card" /><span>DEFAULT-ACCEPT</span></th></tr></thead>
            <tbody>
              <tr><th>Expandability</th><td>Expanded</td><td>Compact</td><td>Hybrid</td></tr>
              <tr><th>Ignore effect</th><td>Auto-reject</td><td>Auto-accept</td><td>Auto-accept</td></tr>
              <tr><th>Reject effect</th><td>Penalty applied</td><td>Free cancel</td><td>Penalty applied</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="study-section" id="research">
        <h2>Research</h2>
        <div className="research-layout">
          <div className="research-row">
            <div className="research-row-title" role="heading" aria-level={3}><span>01</span> Objective</div>
            <NumberedList items={[
              "Evaluated how drivers interpreted and responded to Default Accept, and how it affected their view of Turbo as the preferred driving mode.",
              "Before rollout, we need to learn whether drivers saw Turbo as clearly more valuable than Default Accept, understood which actions triggered penalties, and considered the downgrade experience fair and meaningful.",
            ]} />
          </div>
          <div className="research-row">
            <div className="research-row-title" role="heading" aria-level={3}><span>02</span> Usability</div>
            <NumberedList items={[
              "Drivers understand that a job auto-accepts after timeout and can quickly scan the trip information.",
              "They understand the consequences of declining, ignoring, or cancelling, and consider the downgrade and recovery path fair.",
            ]} />
          </div>
          <div className="research-row">
            <div className="research-row-title" role="heading" aria-level={3}><span>03</span> Success signals</div>
            <p>Drivers can explain auto-accept behaviour without help, distinguish Turbo benefits from Default Accept limitations, identify policy consequences and recovery states, and see tangible earnings or operational benefits in keeping Turbo.</p>
          </div>
          <div className="research-row">
            <div className="research-row-title" role="heading" aria-level={3}><span>04</span> Participants</div>
            <Visual src="/work-assets/participants.gif" alt="Research participants" className="participants-visual" />
          </div>
        </div>
        <h3 className="subsection-title">Key findings</h3>
        <div className="finding-grid">{researchFindings.map(([title, text]) => <div key={title}><h4>{title}</h4><p>{text}</p></div>)}</div>
      </section>

      <section className="study-section" id="design">
        <h2>Design</h2>
        <h3>01 Alert concept</h3>
        <Visual src="/work-assets/alert-concept.webp" alt="Default Accept alert behavior on ADR and iOS" className="alert-concept-visual" />
        <h3>02 Design changes for Turbo</h3>
        <Visual src="/work-assets/default-accept-variants.webp" alt="Default Accept designs for non-Turbo and Turbo drivers" className="design-comparison-visual" />
      </section>

      <section className="study-section" id="impact">
        <h2>Experiment impact</h2>
        <Visual src="/work-assets/impact-chart.png" alt="Default Accept post-release impact chart" className="impact-chart" />
        <h3>Impact</h3>
        <p className="impact-intro">Default Accept replaced Manual Accept in Palembang, Semarang, and Mataram, Indonesia, on 11 August 2026.</p>
        <div className="impact-list">{impact.map(([mark, title, text]) => <div key={title}><i>{mark}</i><span><b>{title}</b><small>{text}</small></span></div>)}</div>
      </section>

      <section className="study-section evaluative-section" id="evaluative-research">
        <h2>Evaluative research</h2>
        <h3>01 Objective</h3>
        <p>After Default Accept launched in Palembang, Semarang, and Mataram on 11 August 2026, EAR improved but driver post-acceptance cancellation rates increased by 2–5pp. DIPC also doubled as a share of passenger post-allocation cancellations. This research explored driver sentiment and the factors behind the increase in cancellations.</p>
        <h3>02 Participants</h3>
        <div className="participant-labels"><span>Palembang, Turbo</span><span>Semarang, Turbo</span><span>Palembang, Manual Accept</span><span>Semarang, Manual Accept</span></div>
        <h3>03 Methods</h3>
        <div className="research-methods">
          <div><b>Rebot (AI-Robo-Call)</b><p>Provided an early signal of driver awareness of Default Accept, reported accidental acceptance, alert and timer experience, and behavioural adaptation.</p><small>Palembang: 178 · Semarang: 56</small></div>
          <div><b>Focus group discussions (FGD)</b><p>Explained the behaviours behind the Rebot patterns and the increase in post-allocation cancellation rates. Drivers were grouped by their use of Turbo or Manual Accept.</p><small>Palembang: 6 · Semarang: 6</small></div>
        </div>

        <h3 className="subsection-title">Key insights</h3>
        <h4>01 Overall sentiment</h4>
        <div className="insight-card">
          <b>Most drivers in the Manual Accept-heavy focus groups recognised Default Accept as auto-accept. Majority of them used only one app and did not express an intention to start using multiple apps.</b>
          <p>In Semarang, drivers responded positively because Default Accept prevented account timeouts caused by missed bookings.</p>
          <p>In Palembang, sentiment was more neutral: drivers felt they had to stay alert to decline a booking.</p>
        </div>

        <h4>02 What contributed to post-acceptance cancellations and DIPC?</h4>
        <Visual src="/work-assets/timeout-accept.png" alt="Timeout acceptance" className="insight-visual" />
        <div className="insight-card">
          <b>In both cities, 14% of offers are timed out. After a timeout acceptance, most drivers continued the booking; some cancelled when the pickup was more than 2–3 km away.</b>
          <p>Main reasons for timeout acceptance mostly something out of our control:</p>
          <NumberedList items={["Driving in traffic or rain;", "Taking a break, praying, refuelling, or using the restroom;", "Finishing another trip or receiving a stacked booking;", "Low booking volume, a missed ringtone, weak signal, or a slow device."]} />
        </div>

        <h4>03 Drivers who felt negatively about Default Accept mainly described missing bookings because they were not alerted in time.</h4>
        <Visual src="/work-assets/alert-timer.png" alt="Default Accept alert and timer" className="insight-visual" />
        <div className="finding-grid numbered-findings">
          <div><i>1</i><h4>Drivers were accustomed to their own alert tones.</h4><p>Some perceived the tone as too soft, inaudible, or absent. A production bug also prevented drivers from setting a custom ringtone.</p></div>
          <div><i>2</i><h4>Drivers perceived the timer as 10 seconds, although it lasted 15 seconds.</h4><p>Across Semarang and Palembang, the middle 80% of drivers had only 9–13 seconds to notice, assess, and act. Mataram was similar at 9–14 seconds.</p></div>
        </div>

        <h4>04 Usability</h4>
        <Visual src="/work-assets/usability-buttons.png" alt="Button usability comparison" className="usability-visual" />
        <div className="insight-card">
          <b>Drivers relied on muscle memory and did not initially notice the button change.</b>
          <p>As in the Singapore research, they relied mainly on button position: left meant cancel or reject, and right meant accept.</p>
          <p>Once noticed, the change did not feel significant; drivers were neutral about it. Their understanding largely came from prior education through Inbox or official communications.</p>
        </div>
      </section>

      <section className="study-section next-section" id="whats-next">
        <h2>What’s next</h2>
        <Visual src="/work-assets/whats-next.gif" alt="Default Accept next phase" className="whats-next" />
        <p className="next-lead">Default Accept showed that acceptance could increase without broad driver withdrawal: EAR improved in Semarang and Palembang, and drivers generally understood the auto-accept model.</p>
        <p>However, timeout-accepted jobs were more likely to result in cancellations or DIPC. The next phase focused on turning passive timeout acceptance into informed acceptance:</p>
        <NumberedList items={["Test an 18-second timer to improve the decision moment.", "Make alerts more noticeable and customisable.", "Expand to delivery bookings."]} />
      </section>
    </article>
  </main></PageFrame>;
}
