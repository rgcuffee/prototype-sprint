"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ChecklistSection = {
  title: string;
  note: string;
  items: string[];
};

type Offering = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  sections: ChecklistSection[];
};

const offerings: Offering[] = [
  {
    id: "prototype",
    eyebrow: "PRODUCT & PROTOTYPE",
    title: "Prototype Sprint",
    summary: "Best for an MVP, proof of concept, core user flow, internal tool, or demo-ready product experience.",
    sections: [
      {
        title: "Focus",
        note: "Give the build a clear target.",
        items: [
          "One-sentence description of the idea",
          "Primary audience or user",
          "Problem the product should solve",
          "Single most important user flow",
          "Definition of a successful first sprint",
          "Must-haves separated from nice-to-haves",
        ],
      },
      {
        title: "Product material",
        note: "Real examples make prototypes more useful.",
        items: [
          "Sample content or realistic data",
          "Existing sketches, notes, or wireframes",
          "Reference products or interfaces",
          "Existing source code or repository access",
          "Known technical constraints",
        ],
      },
      {
        title: "Accounts & access",
        note: "Create accounts before the clock starts when applicable.",
        items: [
          "GitHub account",
          "Netlify or preferred hosting account",
          "Supabase or preferred backend account",
          "API documentation and credentials",
          "Test users and login method decision",
          "Domain or DNS access if launch is a priority",
        ],
      },
    ],
  },
  {
    id: "landing",
    eyebrow: "LANDING & LAUNCH",
    title: "Landing Page Sprint",
    summary: "Best for a product homepage, waitlist, early-access page, messaging, lead capture, or launch-ready web presence.",
    sections: [
      {
        title: "Message",
        note: "Rough notes are useful; polished copy is optional.",
        items: [
          "Product or company name",
          "Primary audience",
          "Core promise or value proposition",
          "Primary call to action",
          "Key features, outcomes, or proof points",
          "Frequently asked questions",
        ],
      },
      {
        title: "Brand & content",
        note: "Bring what exists; placeholders are fine when it does not.",
        items: [
          "Logo or wordmark files",
          "Colors and fonts",
          "Product screenshots or mockups",
          "Photos or approved image references",
          "Testimonials or client logos with permission",
          "Legal, privacy, or terms copy if required",
        ],
      },
      {
        title: "Launch access",
        note: "Required only for the services in scope.",
        items: [
          "Netlify account with form detection enabled",
          "Domain registrar or DNS access",
          "Email destination for form notifications",
          "Analytics account or measurement decision",
          "Social sharing title and description",
        ],
      },
    ],
  },
  {
    id: "brand",
    eyebrow: "BRAND & VISUAL SYSTEM",
    title: "Brand Starter",
    summary: "Best for making an early product coherent enough to launch, demo, test, and share—not replacing a full strategy engagement.",
    sections: [
      {
        title: "Position",
        note: "A useful identity begins with a clear point of view.",
        items: [
          "Current product or company name",
          "One-sentence description",
          "Primary audience",
          "Three personality words",
          "Brands that feel directionally right",
          "Visual styles or clichés to avoid",
        ],
      },
      {
        title: "Practical needs",
        note: "Prioritize where the identity must work first.",
        items: [
          "Primary logo use case",
          "Required wordmark or icon formats",
          "Prototype or landing page screens to brand",
          "Social avatar or profile needs",
          "Known accessibility requirements",
        ],
      },
      {
        title: "Existing material",
        note: "Even unfinished material helps us see the starting point.",
        items: [
          "Existing logo files",
          "Existing colors and fonts",
          "Pitch deck, website, or product screenshots",
          "Competitor or category references",
          "Final decision-maker available live",
        ],
      },
    ],
  },
  {
    id: "social",
    eyebrow: "SOCIAL & ANNOUNCEMENT",
    title: "Social Launch Kit",
    summary: "Best for turning an early product into a focused announcement, practical rollout plan, and a reusable set of launch assets.",
    sections: [
      {
        title: "Launch goal",
        note: "Decide what the first announcement should accomplish.",
        items: [
          "Launch date or timing window",
          "Primary audience and platform",
          "Desired action after someone sees the post",
          "Founder or company voice decision",
          "One clear launch message",
        ],
      },
      {
        title: "Accounts & profiles",
        note: "We can refine profiles faster when access is ready.",
        items: [
          "Chosen social platforms",
          "Available handles and naming consistency",
          "Current profile copy",
          "Profile image and banner dimensions",
          "Posting access or final publishing owner",
        ],
      },
      {
        title: "Launch material",
        note: "Use the strongest real product material available.",
        items: [
          "Product URL or prototype preview",
          "Approved product screenshots",
          "Logo and brand assets",
          "Founder story or reason for building",
          "Feature or benefit highlights",
          "Customer quote or proof with permission",
          "Questions the audience is likely to ask",
        ],
      },
    ],
  },
];

const handoffSection: ChecklistSection = {
  title: "Shared Drive & handoff",
  note: "Use one client-owned Google Drive folder as the home for sprint inputs and final delivery.",
  items: [
    "Client-owned Google Drive folder created",
    "Builder access granted before the session",
    "References, briefs, and existing documentation uploaded",
    "Content, images, and other source materials organized",
    "Folders created for Working Files and Final Handoff",
    "A handoff notes document created for links, decisions, and next steps",
  ],
};

const STORAGE_KEY = "prototype-sprint-readiness-v1";

function itemId(offeringId: string, sectionIndex: number, itemIndex: number) {
  return `${offeringId}-${sectionIndex}-${itemIndex}`;
}

export function ChecklistHub() {
  const [activeId, setActiveId] = useState(offerings[0].id);
  const [checked, setChecked] = useState<Record<string, string[]>>({});
  const [loaded, setLoaded] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setChecked(JSON.parse(saved));
      } catch {
        // The checklist still works in-memory when browser storage is unavailable.
      }
      setLoaded(true);
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // Keep the experience functional without persistence.
    }
  }, [checked, loaded]);

  const active = offerings.find((offering) => offering.id === activeId) ?? offerings[0];
  const activeSections = useMemo(() => [...active.sections, handoffSection], [active]);
  const allItemIds = useMemo(
    () => activeSections.flatMap((section, sectionIndex) => section.items.map((_, itemIndex) => itemId(active.id, sectionIndex, itemIndex))),
    [active.id, activeSections],
  );
  const activeChecked = checked[active.id] ?? [];
  const percentage = allItemIds.length ? Math.round((activeChecked.length / allItemIds.length) * 100) : 0;

  function toggle(id: string) {
    setChecked((current) => {
      const offeringChecked = current[active.id] ?? [];
      const next = offeringChecked.includes(id)
        ? offeringChecked.filter((value) => value !== id)
        : [...offeringChecked, id];
      return { ...current, [active.id]: next };
    });
  }

  function reset() {
    setChecked((current) => ({ ...current, [active.id]: [] }));
  }

  function selectTab(index: number) {
    const nextIndex = (index + offerings.length) % offerings.length;
    setActiveId(offerings[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = offerings.length - 1;

    if (nextIndex === null) return;
    event.preventDefault();
    selectTab(nextIndex);
  }

  return (
    <section className="checklist-hub section-shell" aria-labelledby="checklist-title">
      <div className="offering-tabs" role="tablist" aria-label="Choose a sprint checklist">
        {offerings.map((offering, index) => (
          <button
            type="button"
            role="tab"
            id={`checklist-tab-${offering.id}`}
            aria-selected={offering.id === active.id}
            aria-controls="checklist-panel"
            tabIndex={offering.id === active.id ? 0 : -1}
            key={offering.id}
            ref={(element) => { tabRefs.current[index] = element; }}
            onClick={() => setActiveId(offering.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            <span>0{index + 1}</span>{offering.title}
          </button>
        ))}
      </div>

      <div
        className="checklist-workspace"
        id="checklist-panel"
        role="tabpanel"
        aria-labelledby={`checklist-tab-${active.id}`}
        tabIndex={0}
      >
        <aside className="checklist-summary">
          <p>{active.eyebrow}</p>
          <h2 id="checklist-title">{active.title}</h2>
          <span>{active.summary}</span>
          <div className="progress-block" aria-live="polite">
            <div><strong>{percentage}%</strong><small>{activeChecked.length} of {allItemIds.length} ready</small></div>
            <div className="progress-track"><i style={{ width: `${percentage}%` }} /></div>
            <p>{percentage === 100 ? "You are ready to protect the full session for building." : percentage >= 60 ? "Strong foundation. Bring the remaining decisions into the sprint." : "A useful start. Keep going—or arrive ready to work through the unknowns."}</p>
          </div>
          <div className="checklist-actions">
            <button type="button" onClick={() => window.print()}>Print checklist</button>
            <button type="button" onClick={reset} disabled={activeChecked.length === 0}>Reset</button>
          </div>
          <small className="save-note">Progress saves automatically on this device.</small>
        </aside>

        <div className="checklist-sections">
          {activeSections.map((section, sectionIndex) => (
            <article key={section.title}>
              <header><span>0{sectionIndex + 1}</span><div><h3>{section.title}</h3><p>{section.note}</p></div></header>
              <div className="check-items">
                {section.items.map((item, itemIndex) => {
                  const id = itemId(active.id, sectionIndex, itemIndex);
                  const isChecked = activeChecked.includes(id);
                  return (
                    <label className={isChecked ? "checked" : ""} key={id}>
                      <input type="checkbox" checked={isChecked} onChange={() => toggle(id)} />
                      <span aria-hidden="true">✓</span>
                      <strong>{item}</strong>
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
