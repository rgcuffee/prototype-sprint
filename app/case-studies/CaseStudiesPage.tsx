"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./caseStudies.module.css";

type MetaItem = [icon: string, label: string, value: string];
type Preview = {
  name: string;
  nav: string[];
  button: string;
  title: string;
  copy: string;
  actions: [string, string];
  deviceTitle: string;
  fields: string[];
  deviceButton: string;
  stats: [string, string][];
};
type TextSection = {
  label: string;
  title: string;
  paragraphs: string[];
  panelTitle: string;
  bullets: string[];
  aside: { kind: "photo"; text: string } | { kind: "quote"; text: string; cite: string };
};
type Solution = {
  title: string;
  copy: string;
  kind: "chart" | "calendar" | "feed" | "metrics";
  metrics?: [string, string][];
  hot?: number[];
  cells?: string[];
};
type CaseStudy = {
  slug: string;
  tab: string;
  category: string;
  title: string;
  dek: string;
  meta: MetaItem[];
  note: string;
  preview: Preview;
  starting: TextSection;
  opportunity: TextSection;
  solutionTitle: string;
  solutionCopy: string;
  solutions: Solution[];
  impactTitle: string;
  impactCopy: string;
  impacts: [string, string, string][];
  next: string;
  nextAction: string;
  takeawayTitle: string;
  takeaway: string[];
  closer: string;
};

const cases: CaseStudy[] = [
  {
    slug: "powerwashing",
    tab: "Powerwashing company",
    category: "Small business",
    title: "From One-Off Jobs to Commercial Contracts.",
    dek: "How we repositioned a growing powerwashing company from ‘call us for a driveway’ to a credible commercial-service partner—with a cleaner quote flow, stronger positioning, and a path to recurring work.",
    meta: [["◉", "Industry", "Exterior cleaning"], ["◷", "Timeframe", "3-hour sprint"], ["▣", "Deliverable", "Website + quote flow"], ["$", "Investment", "$500 prototype"]],
    note: "Fictionalized concept case study built from common business patterns and representative Proto Sprint workflows.",
    preview: {
      name: "Northline Wash Co.", nav: ["Residential", "Commercial", "Fleet", "About"], button: "Request a quote",
      title: "Pressure Washing Built for Property Managers, Businesses & Homes.",
      copy: "Fast estimates. Clear scopes. Recurring commercial service when you need it.", actions: ["Get my estimate", "Commercial services"],
      deviceTitle: "Request a quote", fields: ["Property type", "Service needed", "Approx. square footage", "Upload photos +"], deviceButton: "Continue",
      stats: [["24h", "Quote response goal"], ["3", "Service pathways"], ["B2B", "Commercial positioning"], ["1", "Clean intake flow"]],
    },
    starting: {
      label: "The starting point", title: "The company had momentum. The customer experience was still manual.",
      paragraphs: ["Northline had strong word-of-mouth and a growing book of residential work, but every new lead started the same way: a text, a phone call, a handful of photos, and several messages back and forth just to understand the job.", "The problem was not demand. The way the business presented and processed work still looked like a one-person side hustle—even as larger opportunities were starting to appear."],
      panelTitle: "Key challenges", bullets: ["Quotes were assembled manually from texts, photos, and calls.", "The website did not distinguish residential work from higher-value commercial services.", "Property managers had no clear path to request recurring service.", "Service areas, minimums, and job types were explained repeatedly in messages.", "The brand looked capable—but not yet ‘contract ready.’"],
      aside: { kind: "photo", text: "Before: great work, fragmented intake." },
    },
    opportunity: {
      label: "The opportunity", title: "Build for the business they were becoming—not the business they started as.",
      paragraphs: ["Rather than simply making the site prettier, the sprint focused on where growth could realistically come from next: recurring property maintenance, storefronts, loading areas, apartment communities, equipment yards, and other commercial accounts."],
      panelTitle: "Opportunity areas", bullets: ["Create distinct residential and commercial service pathways.", "Use the quote form to qualify jobs before anyone picks up the phone.", "Introduce recurring-service language and contract-friendly positioning.", "Surface trust signals: insurance, service areas, capabilities, and response expectations.", "Preserve the owner’s approachable local-business feel while raising perceived professionalism."],
      aside: { kind: "quote", text: "I don’t just want more driveway jobs. I want the site to make us look ready for the bigger work.", cite: "The business owner" },
    },
    solutionTitle: "A digital front door designed for the next stage of growth.",
    solutionCopy: "The prototype made service selection clearer, reduced repetitive conversations, and gave commercial prospects a reason to see Northline as a vendor built for repeatable work.",
    solutions: [
      { title: "Residential services", copy: "Simple packages with clear expectations and photo-led quoting.", kind: "chart", metrics: [["3", "Core packages"], ["24h", "Response goal"]] },
      { title: "Commercial programs", copy: "A dedicated pathway for recurring cleaning, properties, and facility work.", kind: "chart", metrics: [["B2B", "Positioning"], ["Recurring", "Service option"]] },
      { title: "Quote intake", copy: "Collect job type, property type, size, frequency, and photos before the call.", kind: "calendar", hot: [5] },
    ],
    impactTitle: "Less explaining. Better leads. A more credible path upmarket.",
    impactCopy: "The prototype is designed to save owner time immediately while making commercial and recurring work feel like a natural part of the company—not an afterthought.",
    impacts: [["▧", "Cleaner leads", "Useful information captured before the first call."], ["↗", "Upmarket positioning", "Commercial prospects see a company built to serve them."], ["◫", "Repeat work", "Recurring-service language opens the door to contracts."], ["◷", "Time savings", "Fewer repetitive back-and-forth conversations."]],
    next: "Launch on the owner’s domain, connect intake notifications, and add lightweight CRM follow-up if lead volume justifies it.", nextAction: "Launch the full site",
    takeawayTitle: "Sometimes the next stage of growth is hard to reach because you can’t quite see it yet.",
    takeaway: ["If your business already has strong work, repeat customers, and word-of-mouth, the answer is not always ‘work harder’ or ‘run more ads.’ Sometimes the bottleneck is that the business still looks and operates like the version you started with.", "For Northline, the next step was commercial positioning, clearer service pathways, and a quote experience built for bigger, repeatable work. Your next step may be different. The point is to make it visible enough that you can build toward it on purpose."],
    closer: "Proto Sprint helps turn ‘we’re ready for something bigger’ into something concrete enough to see, test, and act on.",
  },
  {
    slug: "recovery-navigator", tab: "Disaster recovery navigator", category: "Nonprofit / government",
    title: "After the Fire: Turning Aid Into a Guided Recovery Journey.",
    dek: "How a fictional county could transform dozens of disconnected disaster-recovery resources into one resident-centered navigator—and use the prototype to align partners, define implementation, and support future funding conversations.",
    meta: [["◉", "Sector", "Emergency recovery"], ["◷", "Timeframe", "Strategy sprint + prototype"], ["▣", "Deliverable", "Navigator + funding map"], ["↗", "Goal", "Validate before build"]],
    note: "Fictionalized concept case study. Funding-path research identifies plausible sources and partners; it does not guarantee grant awards.",
    preview: { name: "Recover River County", nav: ["Immediate help", "Housing", "Financial aid", "Rebuilding"], button: "Start my recovery plan", title: "You Don’t Need to Know Which Program to Call First.", copy: "Tell us what happened, what you need right now, and where you are in the recovery process. We’ll guide you to the next best steps.", actions: ["Start my plan", "View all resources"], deviceTitle: "What do you need today?", fields: ["□ A safe place to stay", "□ Insurance / FEMA help", "□ Food / essentials", "□ Rebuilding guidance"], deviceButton: "Show my next steps", stats: [["4", "Recovery stages"], ["30+", "Partner resources"], ["1", "Resident journey"], ["∞", "Updateable resource layer"]] },
    starting: { label: "The starting point", title: "The resources existed. The recovery experience did not.", paragraphs: ["After a major wildfire, residents encountered an overwhelming ecosystem of agencies, nonprofits, insurers, utilities, housing providers, permitting offices, volunteer groups, and financial-assistance programs.", "Most organizations had useful information. Very few could answer the resident’s actual question: ‘What should I do next, given my situation?’"], panelTitle: "Key challenges", bullets: ["Resources were organized by agency—not by resident need or recovery stage.", "Eligibility rules and deadlines varied widely.", "Information changed quickly after the disaster.", "Residents repeatedly called multiple organizations to understand basic next steps.", "Leaders could describe the need, but had no tangible product to align around."], aside: { kind: "photo", text: "Fragmented ecosystem: many resources, no shared journey." } },
    opportunity: { label: "The opportunity", title: "Stop building another directory. Build a decision path.", paragraphs: ["The prototype reframed the problem around the resident’s recovery journey: immediate safety, stabilization, claims and aid, then rebuilding. Programs became inputs to the journey instead of the navigation structure itself."], panelTitle: "Opportunity areas", bullets: ["Organize resources around ‘What happened?’ and ‘What do you need now?’", "Use simple questions to surface likely eligibility before sending residents elsewhere.", "Create a time-based journey: first 72 hours → first week → first month → rebuild.", "Design a maintainable partner database so resource owners can be updated without redesigning the product.", "Use the prototype to make scope, cost, ownership, and funding needs concrete."], aside: { kind: "quote", text: "We already have a resource page. People still don’t know what to do.", cite: "Fictional county recovery lead" } },
    solutionTitle: "A recovery navigator residents can understand—and stakeholders can react to.", solutionCopy: "Instead of a vague ‘disaster app’ concept, stakeholders can click through a real journey, see the data model behind it, understand who would maintain what, and discuss funding against a concrete scope.",
    solutions: [{ title: "72-hour recovery plan", copy: "Immediate actions based on household status, damage, and urgent needs.", kind: "calendar", hot: [0, 1, 2] }, { title: "Eligibility & resource layer", copy: "Each recommendation shows why it may fit, what to prepare, and where to go next.", kind: "chart", metrics: [["30+", "Resources mapped"], ["4", "Journey stages"]] }, { title: "Funding & implementation map", copy: "Prototype → stakeholder validation → partner ownership → funding request → production.", kind: "chart", metrics: [["Phase 1", "Validate"], ["Phase 2", "Fund + build"]] }],
    impactTitle: "A better resident experience—and a more fundable conversation.", impactCopy: "The prototype is valuable even before production because it exposes missing data, ownership questions, maintenance requirements, partner dependencies, and implementation costs early—when they are still cheap to change.", impacts: [["⌖", "Resident clarity", "People see next actions, not just agency links."], ["◎", "Partner alignment", "Agencies react to the same concrete workflow."], ["▦", "Scoping clarity", "Maintenance and implementation needs become visible."], ["$", "Funding readiness", "Funders can evaluate a defined product instead of an abstract idea."]],
    next: "Validate the flow with residents and front-line partners, then use that evidence to scope production and pursue appropriate implementation funding.", nextAction: "Validate the prototype",
    takeawayTitle: "Prototypes change the conversation.", takeaway: ["A memo, pitch deck, or grant narrative asks everyone in the room to imagine the same thing. A prototype gives them something real to react to. That makes gaps easier to spot, possibilities easier to explain, and collaboration easier to start.", "Here, the navigator becomes a durable working artifact for conversations with leadership, partner organizations, community stakeholders, foundations, and potential grant collaborators. People can click it, challenge it, improve it, and decide what it would take to make it real."], closer: "Sometimes the fastest way to earn buy-in is to stop describing the idea and let people experience it.",
  },
  {
    slug: "historical-society", tab: "Historical society", category: "Strategy / content",
    title: "The Archive Is the Content Strategy.", dek: "How a small historical society could turn decades of photographs, oral histories, maps, lectures, and volunteer knowledge into a 90-day content operating system a tiny team could actually run.",
    meta: [["◉", "Organization", "Cultural nonprofit"], ["◷", "Timeframe", "90-day launch plan"], ["▣", "Deliverable", "Content operating system"], ["↺", "Constraint", "Tiny team"]], note: "Fictionalized concept case study focused on the strategy and systems side of Proto Sprint—not software for software’s sake.",
    preview: { name: "River City Historical Society", nav: ["Stories", "Archive", "Visit", "Events"], button: "Explore the archive", title: "12,000 Photos. 86 Oral Histories. One Story Engine.", copy: "A 90-day publishing rhythm that turns existing archival material into useful, repeatable, measurable content.", actions: ["View the plan", "See sample posts"], deviceTitle: "This week", fields: ["MON — Then & now", "TUE — Oral history clip", "THU — Map story", "SAT — Event / visit CTA"], deviceButton: "Open calendar", stats: [["90", "Days planned"], ["5", "Content pillars"], ["1→8", "Repurpose ratio"], ["2h", "Weekly ops target"]] },
    starting: { label: "The starting point", title: "The organization had more content than it could ever create—and still struggled to post.", paragraphs: ["River City’s archive was enormous: digitized photos, scanned maps, recorded interviews, old newspapers, lecture recordings, and knowledgeable volunteers. Yet the social channels were inconsistent because every post was treated like a brand-new creative project.", "The organization did not need more ideas. It needed a repeatable way to select, package, approve, publish, and learn from the material it already owned."], panelTitle: "Key challenges", bullets: ["Posting depended on whoever had time that week.", "Long-form material was rarely repurposed.", "No consistent content pillars or audience rhythm existed.", "Approval happened ad hoc, creating bottlenecks.", "Success was measured mostly by likes instead of organizational goals."], aside: { kind: "photo", text: "Rich archive, inconsistent publishing system." } },
    opportunity: { label: "The opportunity", title: "Treat the archive like a product backlog.", paragraphs: ["The breakthrough was to stop asking, ‘What should we post?’ and instead define a small set of repeatable formats that could draw from the archive every week."], panelTitle: "Content pillars", bullets: ["Then & Now: archival photos paired with current locations.", "Voices of River City: short oral-history clips with captions.", "Map Stories: one place, one map, one surprising historical detail.", "Ask the Archive: audience questions answered by staff or volunteers.", "Visit / Join: event, membership, donation, and volunteer conversion posts."], aside: { kind: "quote", text: "We don’t have a content shortage. We have a decision-making shortage.", cite: "Fictional executive director" } },
    solutionTitle: "A 90-day system the team could run without becoming a media company.", solutionCopy: "The deliverable combined strategy and execution artifacts: a content calendar, example feed, repurposing workflow, asset templates, approval rules, KPI definitions, and a short weekly review checklist.",
    solutions: [{ title: "90-day editorial calendar", copy: "A repeatable weekly rhythm with room for events, anniversaries, and timely local stories.", kind: "calendar", hot: [0, 2, 4, 8, 10, 14, 17] }, { title: "Sample social feed", copy: "A visual system that makes archival material feel consistent without making every post identical.", kind: "feed" }, { title: "Repurposing engine", copy: "One 20-minute oral history → long video → 4 reels → 3 quote cards → newsletter story → web archive entry.", kind: "chart", metrics: [["1", "Source asset"], ["8+", "Outputs"]] }],
    impactTitle: "More consistency without asking a small team to work like a newsroom.", impactCopy: "The goal is not ‘post more.’ It is to turn existing institutional knowledge into a durable audience system that supports visits, memberships, donations, volunteers, and public relevance.", impacts: [["▦", "Consistency", "A planned rhythm replaces last-minute posting."], ["↺", "Reuse", "Long-form archive material creates multiple outputs."], ["◷", "Capacity fit", "The workflow is designed around a tiny team."], ["↗", "Useful KPIs", "Measure visits, signups, saves, watch time, and conversions."]],
    next: "Run the 90-day pilot, keep the formats that earn attention or conversion, and simplify the ones that cost too much time.", nextAction: "Run the 90-day pilot",
    takeawayTitle: "Social media does not have to be hard, corny, or an endless stream of AI slop.", takeaway: ["Most organizations are already sitting on the raw material: history, mission, expertise, people, events, stories, photos, recordings, and years of institutional knowledge. The problem is usually not a lack of content. It is a lack of structure.", "With a handful of repeatable formats, a realistic cadence, a repurposing workflow, and clear rules for what gets made each week, a small team can show up consistently without pretending to be a full-time media company—or spending a fortune to look busy online."], closer: "You do not need to fumble around for something to post. You need a content system built around what your organization already has and what it actually cares about.",
  },
  {
    slug: "apprenticeship-dashboard", tab: "Trade apprenticeship program", category: "Data / operations",
    title: "The Data Was Already There. The Decisions Weren’t.", dek: "How a regional trade apprenticeship program could turn an increasingly cursed collection of spreadsheets into a practical readiness dashboard—without forcing staff to abandon the tools they already know.",
    meta: [["◉", "Industry", "Workforce development"], ["◷", "Timeframe", "Prototype sprint"], ["▣", "Deliverable", "Operational dashboard"], ["⇄", "Data source", "Existing Excel files"]], note: "Fictionalized concept case study illustrating how Proto Sprint can sit on top of existing workflows instead of immediately replacing them.",
    preview: { name: "Regional Trades Alliance", nav: ["Overview", "Apprentices", "Employers", "Milestones"], button: "Export follow-up list", title: "Apprenticeship Readiness Dashboard", copy: "See who is on pace, who needs follow-up, which certifications are expiring, and where employer placements are getting stuck.", actions: ["View at-risk", "Filter by cohort"], deviceTitle: "Today’s follow-ups", fields: ["12 — Missing training hours", "8 — Certification expiring", "6 — Employer placement gap", "3 — Attendance concern"], deviceButton: "Open action list", stats: [["214", "Active apprentices"], ["87%", "On pace"], ["29", "Need follow-up"], ["12", "Certs expiring soon"]] },
    starting: { label: "The starting point", title: "The spreadsheets worked—until someone needed an answer.", paragraphs: ["Staff already tracked apprentices, employers, classroom attendance, job-site hours, certifications, milestones, safety training, and completion. The problem was that the information lived across multiple tabs and files designed for recordkeeping—not decision-making.", "Every operational question became a small research project: Which apprentices are falling behind? Which certifications expire this month? Which employers have open capacity? Who needs a call today?"], panelTitle: "Key challenges", bullets: ["Important indicators were spread across multiple sheets.", "Staff relied on memory to know who needed follow-up.", "Leadership reporting required manual filtering and copy-paste work.", "Milestones and expiring credentials were easy to miss.", "A full software replacement would create more disruption than value."], aside: { kind: "photo", text: "Existing workflow: good records, poor visibility." } },
    opportunity: { label: "The opportunity", title: "Keep Excel. Add a decision layer.", paragraphs: ["Instead of starting with ‘replace the spreadsheet,’ the prototype started with the questions staff actually needed answered every day. The dashboard became a layer above the current process: read the existing data, standardize it, and surface action."], panelTitle: "Decision questions", bullets: ["Who is on pace, behind, or at risk right now?", "Which certifications or milestones need action in the next 30 days?", "Which cohorts have attendance or completion problems?", "Where are employer placements or job-site hours becoming bottlenecks?", "What does leadership need to see weekly without asking staff to build another report?"], aside: { kind: "quote", text: "I know the answer is in the spreadsheet. I just shouldn’t need twenty minutes to find it.", cite: "Fictional program director" } },
    solutionTitle: "A dashboard that answers ‘who needs attention?’ before anyone opens a spreadsheet.", solutionCopy: "The prototype focused on readiness, risk, and upcoming action. Staff could still maintain the underlying files, while the dashboard converted those records into a common operational view.",
    solutions: [{ title: "Program health", copy: "At-a-glance readiness across the entire apprenticeship pipeline.", kind: "metrics", metrics: [["214", "Active"], ["87%", "On pace"], ["29", "Follow-up"], ["12", "Expiring certs"]] }, { title: "Cohort health", copy: "Compare attendance, milestones, hours, and completion risk by cohort.", kind: "chart", metrics: [["7", "Cohorts"], ["3", "Need attention"]] }, { title: "Action queue", copy: "A generated list for the people who actually need a call, email, document, or intervention.", kind: "calendar", hot: [0, 7, 10, 14], cells: ["12", "8", "6", "3", "2", "1", "0", "!", "✓", "✓", "!", "✓", "✓", "✓", "!", "✓", "✓", "✓", "✓", "✓", "✓"] }],
    impactTitle: "Same data. Faster decisions. Less operational drag.", impactCopy: "A useful operational dashboard does not need to become a giant software implementation. The first win is simply making existing information visible enough that staff can act on it.", impacts: [["◉", "Shared visibility", "Staff and leadership work from the same operational picture."], ["!", "Earlier intervention", "Risk and expiring milestones surface before they become crises."], ["◷", "Less reporting work", "Routine questions no longer require spreadsheet archaeology."], ["⇄", "No rip-and-replace", "Existing tools can remain while value is proven."]],
    next: "Connect the dashboard to a shared source file, define data-quality rules, and automate only the pieces that prove worth automating.", nextAction: "Connect the data",
    takeawayTitle: "Too big for Sally’s spreadsheet. Not quite ready for an enterprise software suite. That is a real stage.", takeaway: ["A lot of organizations live in this middle ground. The current systems technically work. The data exists. People know the process. But getting a useful answer means opening six tabs, filtering three sheets, asking the one person who remembers how everything fits together, and hoping nobody needs a report by lunch.", "Before replacing everything, there is another option: build a decision layer on top of what already works. A focused dashboard or internal tool can turn existing data into visibility, alerts, priorities, and next actions without forcing a giant software implementation."], closer: "The question is not just ‘Do we have the data?’ It is ‘Are we using it to make decisions—or are we dumping it somewhere and hoping nobody asks?’",
  },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

function MiniVisual({ solution }: { solution: Solution }) {
  const cells = solution.cells ?? Array.from({ length: 21 }, (_, i) => String(i + 1));
  return (
    <div className={styles.miniVisual} aria-hidden="true">
      {solution.metrics && <div className={styles.miniMetrics}>{solution.metrics.map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</div>}
      {solution.kind === "chart" && <div className={styles.chart}><i /><i /><i /><i /><i /><i /><i /></div>}
      {solution.kind === "calendar" && <div className={styles.calendar}>{cells.map((cell, index) => <i className={solution.hot?.includes(index) ? styles.hot : ""} key={`${cell}-${index}`}>{cell}</i>)}</div>}
      {solution.kind === "feed" && <div className={styles.feed}>{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</div>}
    </div>
  );
}

function ProductPreview({ preview }: { preview: Preview }) {
  return (
    <div className={styles.preview} aria-label={`Prototype preview for ${preview.name}`}>
      <div className={styles.mockHeader}><strong>{preview.name}</strong><div>{preview.nav.map(item => <span key={item}>{item}</span>)}</div><b>{preview.button}</b></div>
      <div className={styles.mockHero}>
        <div className={styles.mockCopy}><h2>{preview.title}</h2><p>{preview.copy}</p><div><b>{preview.actions[0]}</b><span>{preview.actions[1]}</span></div></div>
        <div className={styles.device}><i /><h3>{preview.deviceTitle}</h3>{preview.fields.map(field => <span key={field}>{field}<b>⌄</b></span>)}<button type="button" tabIndex={-1}>{preview.deviceButton}</button></div>
      </div>
      <div className={styles.stats}>{preview.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    </div>
  );
}

function StorySection({ section }: { section: TextSection }) {
  return (
    <section className={styles.storySection}>
      <div className={styles.shell}>
        <div className={styles.sectionIntro}><p>{section.label}</p><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <span key={paragraph}>{paragraph}</span>)}</div>
        <div className={styles.contentGrid}>
          <div className={styles.panel}><h3>{section.panelTitle}</h3><ul>{section.bullets.map(item => <li key={item}><b aria-hidden="true">◎</b><span>{item}</span></li>)}</ul></div>
          {section.aside.kind === "photo" ? <div className={styles.abstractPhoto}><span>{section.aside.text}</span></div> : <figure className={styles.quote}><blockquote>“{section.aside.text}”</blockquote><figcaption>— {section.aside.cite}</figcaption></figure>}
        </div>
      </div>
    </section>
  );
}

function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <main id={study.slug} className={styles.case}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <a className={styles.back} href="#case-picker">← Browse all case studies</a>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Case study <span>{study.category}</span></p>
              <h1>{study.title}</h1><p className={styles.dek}>{study.dek}</p>
              <div className={styles.meta}>{study.meta.map(([icon, label, value]) => <div key={label}><i>{icon}</i><span><b>{label}</b><small>{value}</small></span></div>)}</div>
              <p className={styles.note}>{study.note}</p>
            </div>
            <ProductPreview preview={study.preview} />
          </div>
        </div>
      </section>
      <StorySection section={study.starting} />
      <StorySection section={study.opportunity} />
      <section className={styles.storySection}>
        <div className={styles.shell}>
          <div className={styles.sectionIntro}><p>The solution</p><h2>{study.solutionTitle}</h2><span>{study.solutionCopy}</span></div>
          <div className={styles.solutions}>{study.solutions.map((solution, index) => <article key={solution.title}><span>0{index + 1}</span><h3>{solution.title}</h3><p>{solution.copy}</p><MiniVisual solution={solution} /></article>)}</div>
        </div>
      </section>
      <section className={styles.storySection}>
        <div className={styles.shell}>
          <div className={styles.sectionIntro}><p>The impact · projected</p><h2>{study.impactTitle}</h2><span>{study.impactCopy}</span></div>
          <div className={styles.impactGrid}>
            <div className={styles.impacts}>{study.impacts.map(([icon, title, copy]) => <div key={title}><i>{icon}</i><b>{title}</b><p>{copy}</p></div>)}</div>
            <aside className={styles.next}><span>What’s next</span><p>{study.next}</p><Link href="/?start=sprint#booking">{study.nextAction} <Arrow /></Link></aside>
          </div>
        </div>
      </section>
      <section className={styles.takeaway}><div className={styles.shell}><div><p>So what does this mean for you?</p><h2>{study.takeawayTitle}</h2>{study.takeaway.map(item => <span key={item}>{item}</span>)}<strong>{study.closer}</strong></div></div></section>
    </main>
  );
}

export function CaseStudiesPage() {
  const [active, setActive] = useState(0);
  const selectCase = (index: number) => {
    setActive(index);
    window.history.replaceState(null, "", `#${cases[index].slug}`);
    window.requestAnimationFrame(() => document.getElementById("case-picker")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  return (
    <div className={styles.page}>
      <header className={styles.siteHeader}>
        <Link className={styles.brand} href="/" aria-label="Proto Sprint home"><span>PS</span><span><strong>Proto Sprint</strong><small>Ideas into real products.</small></span></Link>
        <nav aria-label="Main navigation"><Link href="/#how-it-works">How it works</Link><Link href="/#menu">Sprint menu</Link><Link className={styles.current} href="/case-studies">Case studies</Link><Link href="/#pricing">Pricing</Link><Link href="/checklists">Checklists</Link></nav>
        <Link className={styles.headerButton} href="/?start=fit#booking">Free fit call <Arrow /></Link>
      </header>
      <div className={styles.switcherWrap} id="case-picker"><div className={styles.switcher} role="tablist" aria-label="Choose a case study">{cases.map((study, index) => <button role="tab" aria-selected={active === index} className={active === index ? styles.active : ""} key={study.slug} onClick={() => selectCase(index)}><span>0{index + 1}</span>{study.tab}</button>)}</div></div>
      <CaseStudyView study={cases[active]} />
      <footer className={styles.footer}><div className={styles.footerTop}><Link className={styles.brand} href="/"><span>PS</span><span><strong>Proto Sprint</strong><small>Ideas into real products.</small></span></Link><p>Modern tools. Founder-owned. Built for speed.</p><Link href="/?start=fit#booking">Start with a free fit call <Arrow /></Link></div><div className={styles.footerBottom}><p>Case studies are fictionalized examples for layout, positioning, and copy iteration.</p><span>Proto Sprint · 2026</span></div></footer>
    </div>
  );
}
