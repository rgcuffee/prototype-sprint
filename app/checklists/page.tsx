import type { Metadata } from "next";
import { ChecklistHub } from "./ChecklistHub";

export const metadata: Metadata = {
  title: "Pre-Sprint Checklists — Prototype Sprint",
  description:
    "Interactive readiness checklists for prototype, landing page, brand, and social launch sprints.",
};

export default function ChecklistsPage() {
  return (
    <main className="checklist-page">
      <header className="checklist-header section-shell">
        <a className="brand" href="/" aria-label="Prototype Sprint home">
          <span className="brand-badge">PS</span>
          <span className="brand-copy">
            <strong>Prototype Sprint</strong>
            <small>Ideas into real products.</small>
          </span>
        </a>
        <nav aria-label="Checklist page navigation">
          <a href="/#how-it-works">How it works</a>
          <a href="/#pricing">Pricing</a>
          <a className="button button-small" href="/?start=fit#booking">Free fit call <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <section className="checklist-hero section-shell">
        <p className="eyebrow"><span /> Working pre-sprint checklists</p>
        <h1>Come ready to <em>build.</em></h1>
        <p>Choose the offering that best matches your sprint. Check off what you already have, save your progress on this device, and bring the remaining questions into the session.</p>
      </section>
      <ChecklistHub />
      <section className="checklist-bottom-cta">
        <div className="section-shell">
          <div><p className="section-kicker light">Ready enough is enough</p><h2>You do not need every box checked.</h2></div>
          <div><p>The checklist helps us spend more of the sprint building. A client-owned Google Drive folder becomes the shared home for inputs, documentation, exports, and final handoff. If you are unsure where to begin, start with the free fit call.</p><div className="checklist-cta-actions"><a className="button button-light" href="/?start=fit#booking">Book a free fit call <span aria-hidden="true">↗</span></a><a href="/?start=sprint#booking">Ready now? Request the $500 sprint <span aria-hidden="true">↗</span></a></div></div>
        </div>
      </section>
    </main>
  );
}
