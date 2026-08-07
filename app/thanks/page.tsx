import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sprint request received — Prototype Sprint",
  description: "Your Prototype Sprint request has been received.",
};

export default function ThanksPage() {
  return (
    <main className="thanks-page">
      <div className="thanks-card">
        <Link className="brand" href="/" aria-label="Prototype Sprint home">
          <span className="brand-badge">PS</span>
          <span className="brand-copy"><strong>Prototype Sprint</strong><small>Ideas into real products.</small></span>
        </Link>
        <span className="thanks-number">01</span>
        <p className="section-kicker">Sprint request received</p>
        <h1>Good. The idea is already moving.</h1>
        <p>We will review your chosen starting path, goal, and priorities, then follow up with fit-call or sprint scheduling, the right pre-sprint checklist, and shared Google Drive handoff setup.</p>
        <div><Link className="button" href="/checklists">Start the readiness checklist <span aria-hidden="true">↗</span></Link><Link className="button button-secondary" href="/">Back to the site</Link></div>
      </div>
    </main>
  );
}
