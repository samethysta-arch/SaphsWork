"use client";

import { useEffect, useState } from "react";

const chapters = [["overview", "Overview"], ["problem", "The problem"], ["goals", "What it enables"], ["workflow", "Workflow"], ["stakeholders", "Stakeholders"], ["designers", "Designers"], ["learnings", "Learnings"]] as const;
const recording = (name: string) => `/dax-recordings/${encodeURIComponent(name)}`;
const asset = (name: string) => `/Asset%20Citadel/${encodeURIComponent(name).replaceAll("%2F", "/")}`;

function ChapterNav() {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const update = () => {
      let current = "overview";
      for (const [id] of chapters) { const element = document.getElementById(id); if (element && element.getBoundingClientRect().top <= 240) current = id; }
      setActive(current);
    };
    window.addEventListener("scroll", update, { passive: true }); update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div className="dax-case-nav-wrap"><nav className="dax-case-nav" aria-label="Case study chapters"><a href="/projects/">← Projects</a><div>{chapters.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>)}</div></nav></div>;
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return <figure className="dax-case-figure"><img src={src} alt={alt} loading="lazy" />{caption && <figcaption>{caption}</figcaption>}</figure>;
}

export default function DaxCaseStudy() {
  return <main className="dax-case">
    <ChapterNav />

    <header className="dax-case-hero" id="overview">
      <h1>Driver Design Library</h1>
      <p className="dax-case-overline">CITADEL</p>
      <div className="dax-case-overview"><h2>Overview</h2><p>Driver app journeys were being rebuilt from scratch for each AI prototype. I created a searchable, journey-based library that lets Codex reuse existing screens, assets, and source links, making exploration faster and easier to share.</p></div>
      <dl className="dax-case-facts"><div><dt>Challenge</dt><dd>AI prototypes kept rebuilding familiar driver app journeys from scratch, consuming credits and leaving teams to replace assets and reconnect screens manually.</dd></div><div><dt>Solution</dt><dd>A searchable design library that lets an AI agent retrieve existing screens, flows, and source links, then assemble them into reusable demos.</dd></div><div><dt>Prototype comparison</dt><dd>The journey took under 2 minutes to assemble—11.3× faster and using 70–85% fewer Codex credits than a rebuild from scratch.</dd></div><div><dt>Role</dt><dd>I led the initiative, covering product framing, workflow design, prototyping, and design-team enablement.</dd></div></dl>
    </header>

    <section className="dax-case-section dax-problem" id="problem" data-scroll-reveal><div className="dax-section-marker">01 / The problem</div><div className="dax-section-body">
      <h2>Where did the idea come from?</h2>
      <div className="dax-problem-intro"><h3>01 The problem</h3><ul><li>One way our company uses AI is to create prototypes. These tools make it easy to explore ideas, but each new prototype often begins with a blank canvas.</li><li>Designers had to find the right driver app screens, replace assets, and reconnect the journey by hand.</li><li>That setup took time and used Codex credits before anyone could evaluate the product idea.</li></ul></div>
      <div className="dax-reasons"><article><img src={asset("Reason 1.svg")} alt="Credit usage table"/><h4>1. High cost</h4><p>Repeating the same setup for every project consumed a lot of credits.</p></article><article><img src={asset("Reason 2.gif")} alt="Prototype fine-tuning"/><h4>2. Time spent fine-tuning</h4><p>After prompting, we still had to fine-tune the output, update assets, and connect the screens manually.</p></article><article><img src={asset("Reason 3.svg")} alt="Time spent rebuilding a prototype"/><h4>3. Time</h4><p>Because Codex rebuilt each screen from scratch, generating a prototype took time.</p></article></div>
      <h3>02 The idea</h3><div className="dax-media-grid"><Figure src={recording("2026-11-09 15.39.59.gif")} alt="Prompting Codex to retrieve screens" caption="What if we could prompt Codex to retrieve the screens we need?"/><Figure src={recording("2026-11-09 15.40.18.gif")} alt="Ready-to-use Driver app prototype" caption="Get a ready-to-use prototype in under 2 minutes"/></div>
      <h3>03 The impact</h3><div className="dax-media-grid dax-impact-media"><Figure src={recording("2026-11-09 15.43.24.gif")} alt="Previously generated Driver app prototype" caption="Previously"/><Figure src={recording("2026-11-09 15.43.39.gif")} alt="Driver app prototype assembled with Dax Design Library" caption="With Dax Design Library"/></div>
      <div className="dax-outcomes"><article><strong>11.3× faster</strong><p>One prompt generated the full Dax journey, and the approach can be reused for other projects.</p></article><article><strong>70–85% fewer credits</strong><p>Prototype assembly used fewer Codex credits than rebuilding the journey from scratch.</p></article><article><strong>No setup</strong><p>The workflow works even when users have neither Figma MCP nor direct Figma access.</p></article></div>
    </div></section>

    <section className="dax-case-section dax-goals" id="goals" data-scroll-reveal><div><p>＋ What the library needed to make possible</p><h2>Move from a product question to a grounded, reviewable prototype while keeping people in control of the decisions.</h2></div><div className="dax-goal-list"><article><b>1</b><div><h3>Search by journey</h3><p>Start with a task or brief, then find existing driver app screens and flows that match it.</p></div></article><article><b>2</b><div><h3>Trace every source</h3><p>Keep links to Figma sources, assets, and demos alongside the retrieved designs.</p></div></article><article><b>3</b><div><h3>Review before building</h3><p>Give designers clear points to review the concept, refine the prompt, and approve the direction.</p></div></article><article><b>4</b><div><h3>Carry the work forward</h3><p>Package a shareable prototype or handoff so the team can reuse the work.</p></div></article></div></section>

    <section className="dax-case-section" id="workflow" data-scroll-reveal><div className="dax-section-marker">03 / Workflow</div><div className="dax-section-body"><h2>How to access the library</h2><h3>01 A reusable workflow through GitLab</h3><Figure src={recording("reusable-workflow-through-gitlab.gif")} alt="Installing and using the Dax Design Library workflow"/><p>Instead of asking AI to invent a screen, the workflow first finds relevant driver app designs. Designers provide the product goal and constraints; Codex retrieves and assembles the material, then helps the team iterate on it.</p><ol className="dax-steps"><li><b>1</b>Describe the product question, audience, and journey.</li><li><b>2</b>Retrieve existing screens, flows, assets, and Figma source links.</li><li><b>3</b>Review the proposed direction and refine it with human feedback.</li><li><b>4</b>Package a demo bundle or continue in Design Studio.</li></ol><h3>02 The library</h3><p>Designers can search the library by screen. It includes most screens in the Driver app, from onboarding and booking to off-transit journeys. Designers can also contribute to the library.</p><Figure src={recording("2026-11-09 15.54.55.gif")} alt="Dax library screen browser with journey filters"/></div></section>

    <section className="dax-case-section" id="stakeholders" data-scroll-reveal><div className="dax-section-body"><h2>How do non-designers use the library?</h2><h3>01 Goal</h3><h4>Help stakeholders visualise their ideas.</h4><p>Reduce reliance on designers during early exploration while preserving links to source designs and their constraints.</p><h3>02 Masterclass</h3><div className="dax-stakeholder-grid"><Figure src={recording("2026-11-09 16.15.37.gif")} alt="First Vibecoding Prototyping Masterclass"/><Figure src={recording("2026-11-09 16.16.25.gif")} alt="Workshop results from non-designer stakeholders"/></div><div className="dax-stakeholder-copy"><div><h4>Vibecoding Prototyping Masterclass</h4><p>I wrapped the first masterclass to introduce stakeholders to the tools and give them a practical starting point for trying the workflow.</p><small>First exercise: the empty Earnings screen</small></div><div><h4>The exercise</h4><p>Participants used the tools provided by the design team to prototype an empty Earnings screen and apply the workflow to a concrete example.</p><small>From shared tools to hands-on practice</small></div></div><h3>03 Post-workshop application</h3><Figure src={recording("2026-11-09 16.36.55.gif")} alt="Stakeholder prototype and feedback"/><p>Some product managers actively use the library to visualise early ideas and communicate their concepts, reducing their reliance on designers when the design team is at capacity.</p></div></section>

    <section className="dax-case-section" id="designers" data-scroll-reveal><div className="dax-section-body"><h2>How do designers use the library?</h2><div className="dax-designer-recordings"><article><h3>01 Use the skill to find screens quickly</h3><Figure src={recording("2026-11-09 18.39.35.gif")} alt="Find screen by journey and quick review workflow"/></article><article><h3>02 Contribute to the library</h3><Figure src={recording("2026-11-09 18.40.08.gif")} alt="Build a demo bundle or contribute to the library"/></article><article><h3>03 Test prototype on a phone</h3><Figure src={recording("2026-11-09 18.40.32.gif")} alt="Transfer the prototype to Xcode and test on a real phone"/></article></div></div></section>

    <section className="dax-case-section dax-learnings" id="learnings" data-scroll-reveal><div className="dax-section-body"><h2>What did we learn?</h2><div className="dax-learning-grid"><article><img className="dax-learning-icon" src="/dax-learning/start-before-value.png" alt=""/><h3>Start before you know whether it will be valuable</h3><p>Even when its long-term value was unclear, I trusted that the work would create learning—even if the library became redundant or was eventually scrapped. It helped build the habit and confidence to experiment with AI.</p></article><article><img className="dax-learning-icon" src="/dax-learning/product-blueprint.png" alt=""/><h3>Keep control of the product blueprint and understand how AI fits into your workflow.</h3><p>AI should not decide what the product is. Define the goals, rules, and milestones.</p></article><article><img className="dax-learning-icon" src="/dax-learning/prototype-substrate.png" alt=""/><h3>The prototype does not have to be the destination; it can be the substrate.</h3><p>The library’s lasting output is a portable, queryable knowledge layer about the Driver app. Prototypes are its most visible expression, while the underlying knowledge can support other products and workflows.</p></article></div></div></section>
    <footer className="dax-case-footer"><a href="/projects/">← Back to all projects</a><a href="#overview">Back to top ↑</a></footer>
  </main>;
}
