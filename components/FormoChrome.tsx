import type { ReactNode } from "react";
import ScrollRevealObserver from "./ScrollRevealObserver";

const cv = "/assets/Saphira_Amethysta_Resume_Apple_ATS.pdf";

export function SiteHeader() {
  return <header className="formo-header"><a href="/" aria-label="Saphira Amethysta home"><img src="/profile-assets/saphira-avatar.png" alt="" /></a><nav aria-label="Main navigation"><a href="/projects">Projects</a><a href="/about">About</a><a className="cv-link" href={cv} download>Download CV ↗</a></nav><details className="mobile-nav"><summary aria-label="Open navigation">☰</summary><nav aria-label="Mobile navigation"><a href="/projects">Projects</a><a href="/about">About</a><a className="cv-link" href={cv} download>Download CV ↗</a></nav></details></header>;
}

export function SiteFooter() {
  return <footer className="formo-footer" data-scroll-reveal><h2>More thoughtful work is always in progress.</h2><a className="connection" href="/contact">Make a connection ↗</a><div className="footer-columns"><div><b>Navigate</b><a href="/">Home</a><a href="/projects">Projects</a><a href="/about">About</a><a href="/contact">Contact</a></div><div><b>Connect</b><a href="https://www.behance.net/saphiraamethysta" target="_blank" rel="noreferrer">Behance ↗</a><a href="https://www.linkedin.com/in/saphiraamethysta" target="_blank" rel="noreferrer">LinkedIn ↗</a></div><div><b>Based in</b><span>Singapore · SGT</span></div></div></footer>;
}

export function PageFrame({ children, showHeader = true }: { children: ReactNode; showHeader?: boolean }) {
  return <><ScrollRevealObserver />{showHeader && <SiteHeader />}{children}<SiteFooter /></>;
}
