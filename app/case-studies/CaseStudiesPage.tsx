"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./caseStudies.module.css";

type MetaItem = [icon: string, label: string, value: string];
type Preview = {
  kind: "website-intake" | "social-grid" | "dashboard" | "formation-platform" | "elder-care";
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
  aside: { kind: "photo"; text: string; visual: "inbox" | "archive" | "spreadsheet" | "ecosystem" | "discharge" } | { kind: "quote"; text: string; cite: string };
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
  hidden?: boolean;
  tab: string;
  category: string;
  artifact: string;
  workStatus: "Based on real work" | "Real work";
  title: string;
  dek: string;
  meta: MetaItem[];
  note: string;
  liveUrl?: string;
  preview: Preview;
  starting: TextSection;
  opportunity: TextSection;
  solutionTitle: string;
  solutionCopy: string;
  solutions: Solution[];
  impactTitle: string;
  impactLabel?: string;
  impactCopy: string;
  impacts: [string, string, string][];
  next: string;
  nextAction: string;
  nextHref?: string;
  takeawayTitle: string;
  takeaway: string[];
  closer: string;
};

const cases: CaseStudy[] = [
  {
    slug: "powerwashing",
    tab: "Powerwashing company",
    category: "Small business",
    artifact: "Website + intake",
    workStatus: "Based on real work",
    title: "From One-Off Jobs to Commercial Contracts.",
    dek: "How we repositioned a growing powerwashing company from ‘call us for a driveway’ to a credible commercial-service partner, with a cleaner quote flow, stronger positioning, and a path to recurring work.",
    meta: [["◉", "Industry", "Exterior cleaning"], ["◷", "Timeframe", "3-hour sprint"], ["▣", "Deliverable", "Website + quote flow"], ["↗", "Status", "Deployed landing page"]],
    note: "Based on real client work involving a new website, commercial positioning, and a streamlined quote process. Names, industry, and identifying details have been changed, but the underlying challenges, strategy, and deliverables reflect the original engagement.",
    preview: {
      kind: "website-intake",
      name: "Northline Wash Co.", nav: ["Residential", "Commercial", "Fleet", "About"], button: "Request a quote",
      title: "Pressure Washing Built for Property Managers, Businesses & Homes.",
      copy: "Fast estimates. Clear scopes. Recurring commercial service when you need it.", actions: ["Get my estimate", "Commercial services"],
      deviceTitle: "Request a quote", fields: ["Property type", "Service needed", "Approx. square footage", "Upload photos +"], deviceButton: "Continue",
      stats: [["24h", "Quote response goal"], ["3", "Service pathways"], ["B2B", "Commercial positioning"], ["1", "Clean intake flow"]],
    },
    starting: {
      label: "The starting point", title: "The company had momentum. The customer experience was still manual.",
      paragraphs: ["Northline had strong word-of-mouth and a growing book of residential work, but every new lead started the same way: a text, a phone call, a handful of photos, and several messages back and forth just to understand the job.", "The problem was not demand. With no website, the business had no place to present its capabilities, explain how it worked, or show larger prospects that it was ready for more substantial opportunities."],
      panelTitle: "Key challenges", bullets: ["Quotes were assembled manually from texts, photos, and calls.", "With no website, prospects had no way to see the company as capable of higher-value commercial work.", "Property managers had no clear path to request recurring service.", "Service areas, minimums, and job types were explained repeatedly in DMs.", "The brand looked capable, but not yet ‘contract ready.’"],
      aside: { kind: "photo", text: "Before: great work, fragmented intake.", visual: "inbox" },
    },
    opportunity: {
      label: "The opportunity", title: "Build for the business they were becoming, not the business they started as.",
      paragraphs: ["With no existing website to redesign, the sprint started from a blank page. The opportunity was to create a digital front door around where growth could realistically come from next: recurring property maintenance, storefronts, loading areas, apartment communities, equipment yards, and other commercial accounts."],
      panelTitle: "Opportunity areas", bullets: ["Create distinct residential and commercial service pathways.", "Use the quote form to qualify jobs before anyone picks up the phone.", "Introduce recurring-service language and contract-friendly positioning.", "Surface trust signals: insurance, service areas, capabilities, and response expectations.", "Preserve the owner’s approachable local-business feel while raising perceived professionalism."],
      aside: { kind: "quote", text: "I don’t just want more driveway jobs. I want the site to make us look ready for the bigger work.", cite: "The business owner" },
    },
    solutionTitle: "A digital front door designed for the next stage of growth.",
    solutionCopy: "The prototype made service selection clearer, reduced repetitive conversations, and gave commercial prospects a reason to see Northline as a vendor built to handle contracts.",
    solutions: [
      { title: "Residential services", copy: "Simple packages with clear expectations and photo-led quoting.", kind: "chart", metrics: [["3", "Core packages"], ["24h", "Response goal"]] },
      { title: "Commercial programs", copy: "A dedicated pathway for recurring cleaning, properties, and facility work.", kind: "chart", metrics: [["B2B", "Positioning"], ["Recurring", "Service option"]] },
      { title: "Quote intake", copy: "Collect job type, property type, size, frequency, and photos before the call.", kind: "calendar", hot: [5] },
    ],
    impactTitle: "Less explaining. Better leads. A more credible path upmarket.",
    impactCopy: "The prototype is designed to save owner time immediately while preserving a clear path for individual residential clients and making commercial and recurring work feel like a natural part of the company, not an afterthought.",
    impacts: [["▧", "Cleaner leads", "Useful information captured before the first call."], ["↗", "Upmarket positioning", "Commercial prospects see a company built to serve them."], ["◫", "Repeat work", "Recurring-service language opens the door to contracts."], ["◷", "Time savings", "Fewer repetitive back-and-forth conversations."]],
    next: "Launch on the owner’s domain, connect intake notifications, and add lightweight CRM follow-up if lead volume justifies it.", nextAction: "Launch the full site",
    takeawayTitle: "Sometimes the next stage of growth is hard to reach because you can’t quite see it yet.",
    takeaway: ["If your business already has strong work, repeat customers, and word-of-mouth, the answer is not always ‘work harder’ or ‘run more ads.’ Sometimes the bottleneck is that the business still looks and operates like the version you started with.", "For Northline, the next step was commercial positioning, clearer service pathways, and a quote experience built for bigger, repeatable work. Your next step may be different. The point is to make it visible enough that you can build toward it on purpose."],
    closer: "Proto Sprint helps turn ‘we’re ready for something bigger’ into something concrete enough to see, test, and act on.",
  },
  {
    slug: "historical-society", tab: "Historical society", category: "Strategy / content", artifact: "Social media kit", workStatus: "Based on real work",
    title: "The Archive Is the Content Strategy.", dek: "How a small historical society could turn decades of photographs, oral histories, maps, lectures, and volunteer knowledge into a 90-day content operating system a tiny team could actually run.",
    meta: [["◉", "Organization", "Cultural nonprofit"], ["◷", "Timeframe", "90-day launch plan"], ["▣", "Deliverable", "Content operating system"], ["↺", "Constraint", "Tiny team"]], note: "Based on real strategy and content-systems work. Names, industry, and identifying details have been changed, but the underlying challenges, process, and deliverables reflect the original engagement.",
    preview: { kind: "social-grid", name: "River City Historical Society", nav: ["Stories", "Archive", "Visit", "Events"], button: "Explore the archive", title: "12,000 Photos. 86 Oral Histories. One Story Engine.", copy: "A 90-day publishing rhythm that turns existing archival material into useful, repeatable, measurable content.", actions: ["View the plan", "See sample posts"], deviceTitle: "This week", fields: ["Then & now", "Oral history", "Map story", "Visit River City"], deviceButton: "Open calendar", stats: [["90", "Days planned"], ["5", "Content pillars"], ["1→8", "Repurpose ratio"], ["2h", "Weekly ops target"]] },
    starting: { label: "The starting point", title: "The organization had more content than it could ever create, and still struggled to post.", paragraphs: ["River City’s archive was enormous: digitized photos, scanned maps, recorded interviews, old newspapers, lecture recordings, and knowledgeable volunteers. Yet the social channels were inconsistent because every post was treated like a brand-new creative project.", "The organization did not need more ideas. It needed a repeatable way to select, package, approve, publish, and learn from the material it already owned."], panelTitle: "Key challenges", bullets: ["Posting depended on whoever had time that week.", "Long-form material was rarely repurposed.", "No consistent content pillars or audience rhythm existed.", "Approval happened ad hoc, creating bottlenecks.", "Success was measured mostly by likes instead of organizational goals."], aside: { kind: "photo", text: "Rich archive, inconsistent publishing system.", visual: "archive" } },
    opportunity: { label: "The opportunity", title: "Treat the archive like a product backlog.", paragraphs: ["The breakthrough was to stop asking, ‘What should we post?’ and instead define a small set of repeatable formats that could draw from the archive every week."], panelTitle: "Content pillars", bullets: ["Then & Now: archival photos paired with current locations.", "Voices of River City: short oral-history clips with captions.", "Map Stories: one place, one map, one surprising historical detail.", "Ask the Archive: audience questions answered by staff or volunteers.", "Visit / Join: event, membership, donation, and volunteer conversion posts."], aside: { kind: "quote", text: "We don’t have a content shortage. We have a decision-making shortage.", cite: "Fictional executive director" } },
    solutionTitle: "A 90-day system the team could run without becoming a media company.", solutionCopy: "The deliverable combined strategy and execution artifacts: a content calendar, example feed, repurposing workflow, asset templates, approval rules, KPI definitions, and a short weekly review checklist.",
    solutions: [{ title: "90-day editorial calendar", copy: "A repeatable weekly rhythm with room for events, anniversaries, and timely local stories.", kind: "calendar", hot: [0, 2, 4, 8, 10, 14, 17] }, { title: "Sample social feed", copy: "A visual system that makes archival material feel consistent without making every post identical.", kind: "feed" }, { title: "Repurposing engine", copy: "One 20-minute oral history → long video → 4 reels → 3 quote cards → newsletter story → web archive entry.", kind: "chart", metrics: [["1", "Source asset"], ["8+", "Outputs"]] }],
    impactTitle: "More consistency without asking a small team to work like a newsroom.", impactCopy: "The goal is not ‘post more.’ It is to turn existing institutional knowledge into a durable audience system that supports visits, memberships, donations, volunteers, and public relevance.", impacts: [["▦", "Consistency", "A planned rhythm replaces last-minute posting."], ["↺", "Reuse", "Long-form archive material creates multiple outputs."], ["◷", "Capacity fit", "The workflow is designed around a tiny team."], ["↗", "Useful KPIs", "Measure visits, signups, saves, watch time, and conversions."]],
    next: "Run the 90-day pilot, keep the formats that earn attention or conversion, and simplify the ones that cost too much time.", nextAction: "Run the 90-day pilot",
    takeawayTitle: "Social media does not have to be hard, corny, or an endless stream of AI slop.", takeaway: ["Most organizations are already sitting on the raw material: history, mission, expertise, people, events, stories, photos, recordings, and years of institutional knowledge. The problem is usually not a lack of content. It is a lack of structure.", "With a handful of repeatable formats, a realistic cadence, a repurposing workflow, and clear rules for what gets made each week, a small team can show up consistently without pretending to be a full-time media company or spending a fortune to look busy online."], closer: "You do not need to fumble around for something to post. You need a content system built around what your organization already has and what it actually cares about.",
  },
  {
    slug: "apprenticeship-dashboard", tab: "Trade apprenticeship program", category: "Data / operations", artifact: "Dashboard", workStatus: "Based on real work",
    title: "The Data Was Already There. The Decisions Weren’t.", dek: "How a regional trade apprenticeship program could turn an increasingly cursed collection of spreadsheets into a practical readiness dashboard without forcing staff to abandon the tools they already know.",
    meta: [["◉", "Industry", "Workforce development"], ["◷", "Timeframe", "Prototype sprint"], ["▣", "Deliverable", "Operational dashboard"], ["⇄", "Data source", "Existing Excel files"]], note: "Based on real dashboard and operations work. Names, industry, and identifying details have been changed, but the underlying workflow, decision needs, and prototype reflect the original engagement.",
    preview: { kind: "dashboard", name: "Regional Trades Alliance", nav: ["Overview", "Apprentices", "Employers", "Milestones"], button: "Export follow-up list", title: "Apprenticeship Readiness Dashboard", copy: "See who is on pace, who needs follow-up, which certifications are expiring, and where employer placements are getting stuck.", actions: ["View at-risk", "Filter by cohort"], deviceTitle: "Today’s follow-ups", fields: ["12 · Missing training hours", "8 · Certification expiring", "6 · Employer placement gap", "3 · Attendance concern"], deviceButton: "Open action list", stats: [["214", "Active apprentices"], ["87%", "On pace"], ["29", "Need follow-up"], ["12", "Certs expiring soon"]] },
    starting: { label: "The starting point", title: "The spreadsheets worked. Then someone needed an answer.", paragraphs: ["Staff already tracked apprentices, employers, classroom attendance, job-site hours, certifications, milestones, safety training, and completion. The problem was that the information lived across multiple tabs and files designed for recordkeeping, not decision-making.", "Every operational question became a small research project: Which apprentices are falling behind? Which certifications expire this month? Which employers have open capacity? Who needs a call today?"], panelTitle: "Key challenges", bullets: ["Important indicators were spread across multiple sheets.", "Staff relied on memory to know who needed follow-up.", "Leadership reporting required manual filtering and copy-paste work.", "Milestones and expiring credentials were easy to miss.", "A full software replacement would create more disruption than value."], aside: { kind: "photo", text: "Existing workflow: good records, poor visibility.", visual: "spreadsheet" } },
    opportunity: { label: "The opportunity", title: "Keep Excel. Add a decision layer.", paragraphs: ["Instead of starting with ‘replace the spreadsheet,’ the prototype started with the questions staff actually needed answered every day. The dashboard became a layer above the current process: read the existing data, standardize it, and surface action."], panelTitle: "Decision questions", bullets: ["Who is on pace, behind, or at risk right now?", "Which certifications or milestones need action in the next 30 days?", "Which cohorts have attendance or completion problems?", "Where are employer placements or job-site hours becoming bottlenecks?", "What does leadership need to see weekly without asking staff to build another report?"], aside: { kind: "quote", text: "I know the answer is in the spreadsheet. I just shouldn’t need twenty minutes to find it.", cite: "Fictional program director" } },
    solutionTitle: "A dashboard that answers ‘who needs attention?’ before anyone opens a spreadsheet.", solutionCopy: "The prototype focused on readiness, risk, and upcoming action. Staff could still maintain the underlying files, while the dashboard converted those records into a common operational view.",
    solutions: [{ title: "Program health", copy: "At-a-glance readiness across the entire apprenticeship pipeline.", kind: "metrics", metrics: [["214", "Active"], ["87%", "On pace"], ["29", "Follow-up"], ["12", "Expiring certs"]] }, { title: "Cohort health", copy: "Compare attendance, milestones, hours, and completion risk by cohort.", kind: "chart", metrics: [["7", "Cohorts"], ["3", "Need attention"]] }, { title: "Action queue", copy: "A generated list for the people who actually need a call, email, document, or intervention.", kind: "calendar", hot: [0, 7, 10, 14], cells: ["12", "8", "6", "3", "2", "1", "0", "!", "✓", "✓", "!", "✓", "✓", "✓", "!", "✓", "✓", "✓", "✓", "✓", "✓"] }],
    impactTitle: "Same data. Faster decisions. Less operational drag.", impactCopy: "A useful operational dashboard does not need to become a giant software implementation. The first win is simply making existing information visible enough that staff can act on it.", impacts: [["◉", "Shared visibility", "Staff and leadership work from the same operational picture."], ["!", "Earlier intervention", "Risk and expiring milestones surface before they become crises."], ["◷", "Less reporting work", "Routine questions no longer require spreadsheet archaeology."], ["⇄", "No rip-and-replace", "Existing tools can remain while value is proven."]],
    next: "Connect the dashboard to a shared source file, define data-quality rules, and automate only the pieces that prove worth automating.", nextAction: "Connect the data",
    takeawayTitle: "Too big for Sally’s spreadsheet. Not quite ready for an enterprise software suite. That is a real stage.", takeaway: ["A lot of organizations live in this middle ground. The current systems technically work. The data exists. People know the process. But getting a useful answer means opening six tabs, filtering three sheets, asking the one person who remembers how everything fits together, and hoping nobody needs a report by lunch.", "Before replacing everything, there is another option: build a decision layer on top of what already works. A focused dashboard or internal tool can turn existing data into visibility, alerts, priorities, and next actions without forcing a giant software implementation."], closer: "The question is not just ‘Do we have the data?’ It is ‘Are we using it to make decisions, or are we dumping it somewhere and hoping nobody asks?’",
  },
  {
    slug: "digital-emmaus", tab: "Digital Emmaus", category: "Product strategy / media", artifact: "Platform prototype", workStatus: "Real work",
    hidden: true,
    title: "One Journey Through a Fragmented Content Ecosystem.",
    dek: "How Digital Emmaus turned a broad platform vision into a focused, working product for discovering Catholic video, books, audio, publishers, and guided formation in one coherent experience.",
    meta: [["◉", "Industry", "Catholic media"], ["⌁", "Scope", "Responsive web MVP"], ["▣", "Deliverable", "Prototype + build spec"], ["↗", "Status", "Working prototype"]],
    note: "Digital Emmaus is a real product concept and working prototype. Its name, industry, product strategy, and design have not been fictionalized. Publisher names and sample content shown inside the prototype are used illustratively and remain the property of their respective owners.",
    liveUrl: "https://digital-emmaus.vercel.app",
    preview: { kind: "formation-platform", name: "Digital Emmaus", nav: ["Home", "Browse", "Publisher Channels", "My Library"], button: "My account", title: "One journey for faith formation.", copy: "Discover trusted Catholic formation and continue across video, books, and audio in one place.", actions: ["Watch now", "Explore the library"], deviceTitle: "Continue your journey", fields: ["Video", "Books", "Audio", "Formation paths"], deviceButton: "Browse all", stats: [["1", "Unified account"], ["3", "Media formats"], ["1", "Shared library"], ["∞", "Formation paths"]] },
    starting: {
      label: "The starting point", title: "The content was everywhere. The formation journey was nowhere.",
      paragraphs: ["Catholic publishers and ministries already produce a deep catalog of trusted video, books, audio, courses, and teaching. But audiences encounter that material across separate websites, apps, stores, video platforms, email lists, and subscription systems. Every publisher may have something valuable, while the person looking for guidance still has to know where to search.", "The challenge was also structural. Any shared platform had to make discovery easier without reducing publishers to anonymous content suppliers or asking them to surrender ownership, branding, editorial control, and their direct relationship with audiences."],
      panelTitle: "Key challenges", bullets: ["Content was fragmented across publishers, formats, storefronts, and accounts.", "People often searched by a life question or formation goal, not by media type.", "A unified experience still needed to preserve visible publisher identity.", "The long-term subscription vision introduced rights, billing, and entitlement complexity.", "The first release needed to prove value without attempting the entire platform at once."],
      aside: { kind: "photo", text: "Many trusted sources. Many formats. No shared journey.", visual: "ecosystem" },
    },
    opportunity: {
      label: "The opportunity", title: "Become the discovery and distribution layer, not another publisher.",
      paragraphs: ["Digital Emmaus could create a coherent layer across independently owned content: one account, one library, one search experience, persistent progress, premium publisher channels, and guided formation paths that move naturally between video, reading, and audio.", "The strategic move was to launch around a licensed free catalog first. That creates something useful for audiences, gives publishers a new distribution channel, and produces real evidence about discovery, engagement, and referrals before paid channels or a network-wide membership add unnecessary complexity."],
      panelTitle: "Product principles", bullets: ["Organize discovery around questions, topics, teachers, and formation goals.", "Treat video, books, and audio as parts of one journey instead of separate silos.", "Give every publisher a recognizable home inside the shared system.", "Make free content feel premium and subscription-ready from the beginning.", "Build rights and entitlement logic into the plan while deferring paid checkout."],
      aside: { kind: "quote", text: "Digital Emmaus does not need to own the content. It needs to make fragmented content feel coherent.", cite: "Digital Emmaus product strategy" },
    },
    solutionTitle: "A working product with a disciplined path from free catalog to platform.",
    solutionCopy: "The work paired a responsive product prototype with a detailed implementation specification. Together they make the consumer experience, publisher proposition, MVP boundaries, technical dependencies, and later business model tangible enough to test and build.",
    solutions: [
      { title: "One formation home", copy: "A calm, premium home for discovering and resuming video, books, audio, and formation paths across publishers.", kind: "feed", metrics: [["3", "Media formats"], ["1", "Shared journey"]] },
      { title: "Publisher channels", copy: "Branded publisher homes preserve attribution, identity, ownership, and paths to follow or support each organization.", kind: "chart", metrics: [["1", "Shared system"], ["Many", "Publisher voices"]] },
      { title: "Build-ready MVP", copy: "User roles, journeys, screens, data models, rights rules, analytics, acceptance criteria, and phased commerce were translated into an implementation plan.", kind: "calendar", hot: [0, 1, 7, 8, 14] },
    ],
    impactLabel: "The result",
    impactTitle: "A platform-sized idea became a product people can actually explore.",
    impactCopy: "Digital Emmaus now has more than a pitch. The working responsive prototype demonstrates home discovery, publisher channels, cross-format browsing, playback and reading concepts, formation paths, saved progress, and a unified library. The build specification makes the boundary between the useful first release and the larger platform explicit.",
    impacts: [["▦", "Working product", "The core experience can be clicked, challenged, and demonstrated."], ["◎", "Sharper MVP", "The free licensed catalog is separated from later paid complexity."], ["◫", "Publisher story", "The platform’s value to content owners is visible alongside the user experience."], ["↗", "Build readiness", "Product decisions are translated into flows, requirements, and release phases."]],
    next: "Validate the experience with Catholic audiences and prospective publishing partners, secure a small licensed launch catalog, and use real discovery and engagement behavior to decide which paid capabilities deserve to come next.",
    nextAction: "Explore the live prototype", nextHref: "https://digital-emmaus.vercel.app",
    takeawayTitle: "A large product vision becomes credible when the first proof is small enough to build.",
    takeaway: ["Big platform ideas often arrive as a pile of individually reasonable features: accounts, search, streaming, reading, publisher portals, subscriptions, billing, rights management, recommendations, community, and native apps. Treating all of them as version one makes the idea harder to explain, fund, validate, and ship.", "The prototype made the experience concrete while the product strategy separated what Digital Emmaus must prove now from what it may need later. That is the real work of an MVP: not making the ambition smaller, but choosing the earliest product that can produce useful evidence."],
    closer: "The point of a prototype is not to pretend the whole platform already exists. It is to make the next important decision possible.",
  },
  {
    slug: "nevada-elder-care", tab: "Nevada Elder Care Navigator", category: "Public service / care", artifact: "Product prototype", workStatus: "Real work",
    title: "From Hospital Discharge to a Care Plan Families Can Follow.",
    dek: "How Nevada Elder Care Navigator turns an overwhelming mix of discharge instructions, benefits, legal preparation, care options, and local services into a guided family journey with human help always one step away.",
    meta: [["◉", "Location", "Southern Nevada"], ["⌁", "Scope", "Product + grant strategy"], ["▣", "Deliverable", "Navigator + pilot plan"], ["↗", "Status", "Working prototype"]],
    note: "Nevada Elder Care Navigator is a real product concept and working prototype informed by firsthand family experience and real Nevada care programs. Its name, location, industry, product strategy, and design have not been fictionalized. Program information remains subject to confirmation by the responsible agencies and care partners.",
    liveUrl: "https://nveldercarenavigator.netlify.app",
    preview: { kind: "elder-care", name: "Nevada Elder Care Navigator", nav: ["My path", "Care plan", "Nevada programs"], button: "Request a callback", title: "What’s happening with your family right now?", copy: "Choose the situation that feels closest. We’ll turn it into a practical care path and connect you with a Nevada navigator whenever you want one.", actions: ["Leaving the hospital", "I’m not sure where to start"], deviceTitle: "Mary’s care path", fields: ["Leaving the hospital", "Need more help at home", "Need help paying for care", "Looking for a safe place to live"], deviceButton: "Build my care path", stats: [["4", "Care phases"], ["1", "Reusable profile"], ["48h", "First action plan"], ["1 tap", "Human handoff"]] },
    starting: {
      label: "The starting point", title: "A family crisis arrived with paperwork, phone numbers, and no shared plan.",
      paragraphs: ["Families often enter elder care through a crisis. A relative is hospitalized, discharge begins moving quickly, and the family suddenly has to understand rehabilitation, home health, medication changes, mobility, legal authority, benefits, long-term affordability, and care settings in a matter of days.", "Nevada already has programs, navigators, providers, legal resources, and caregiver support. The missing piece was digital infrastructure around those services: one place to understand what matters now, save the family’s situation, and carry that context from one step or conversation to the next."],
      panelTitle: "Key challenges", bullets: ["Families had to learn an unfamiliar care system during an emotional crisis.", "Hospital discharge, benefits, legal preparation, and long-term care felt like separate problems.", "Program names and acronyms assumed knowledge families did not yet have.", "Useful information was scattered across paperwork, websites, agencies, and phone calls.", "Human navigators were available, but each new conversation could begin by reconstructing the same basic facts."],
      aside: { kind: "photo", text: "The programs exist. Families may not know which ones could apply.", visual: "discharge" },
    },
    opportunity: {
      label: "The opportunity", title: "Let families learn the system by navigating their own situation.",
      paragraphs: ["The product begins with plain-language situations rather than program names: leaving the hospital, needing more help at home, paying for care, finding a safe place to live, or renewing benefits. Each answer teaches the family why the issue matters while adding structured information to a reusable care profile.", "Self-service remains optional. At every meaningful point, the family can call a navigator, request a callback or referral, and send the work they already completed with appropriate consent. The software helps with orientation and preparation. People remain responsible for the complex, clinical, legal, and relationship-based decisions."],
      panelTitle: "Product principles", bullets: ["Start with what is happening to the family, not an agency or acronym.", "Explain why each question matters instead of presenting a silent intake form.", "Turn answers into actions for today, this week, and longer term.", "Keep the care profile useful before, during, and after a navigator call.", "Never trap a family in self-service when human support is the better next step."],
      aside: { kind: "quote", text: "We turn the brochure they hand you at the hospital into a plan.", cite: "Nevada Elder Care Navigator product vision" },
    },
    solutionTitle: "A digital front door for the care network that already exists.",
    solutionCopy: "The working prototype connects situational entry, guided education, a personalized care path, Nevada program information, persistent planning, and a consent-based navigator handoff. A parallel grant and partnership strategy identifies how the concept could move from prototype to a Clark County pilot.",
    solutions: [
      { title: "Learn while navigating", copy: "Plain-language questions explain why mobility, cognition, caregiver availability, housing, insurance, and legal preparation affect the path ahead.", kind: "calendar", hot: [0, 1, 2, 7, 8] },
      { title: "Mary’s care plan", copy: "Answers become a practical timeline for today, this week, and longer term, with local resources attached to the relevant action.", kind: "chart", metrics: [["3", "Time horizons"], ["1", "Shared plan"]] },
      { title: "Human handoff", copy: "With consent, a navigator receives the family’s structured situation and priorities instead of asking them to begin again from the start.", kind: "metrics", metrics: [["1 tap", "Request help"], ["0", "Lost context"]] },
    ],
    impactLabel: "The result",
    impactTitle: "A personal care-navigation problem became a testable public-service product.",
    impactCopy: "The prototype demonstrates the full service relationship, not just a resource directory. Families can orient themselves, learn through guided questions, generate a care plan, review possible Nevada programs, and bring a human navigator into the process with their context intact. The pilot strategy also makes prospective partners, ownership, funding, and implementation responsibilities discussable before production begins.",
    impacts: [["⌖", "Family clarity", "An unfamiliar system becomes a sequence of understandable next steps."], ["◎", "Better handoffs", "Navigators can begin with a structured picture of the family’s needs."], ["↺", "Care continuity", "The same profile can support discharge, benefits, placement, and renewals."], ["$", "Pilot readiness", "The product is paired with partner roles, a grant stack, and a staged launch plan."]],
    next: "Validate the flow with Nevada families, care navigators, hospital social workers, and community partners, then refine the data-sharing model and pursue funding for a focused Clark County pilot.",
    nextAction: "Explore the live prototype", nextHref: "https://nveldercarenavigator.netlify.app",
    takeawayTitle: "Prototypes change the conversation.",
    takeaway: ["A memo, pitch deck, or grant narrative asks everyone in the room to imagine the same thing. A prototype gives them something real to react to. That makes gaps easier to spot, possibilities easier to explain, and collaboration easier to start.", "Here, the navigator becomes a durable working artifact for conversations with leadership, partner organizations, community stakeholders, foundations, and potential grant collaborators. People can click it, challenge it, improve it, and decide what it would take to make it real."],
    closer: "Sometimes the fastest way to earn buy-in is to stop describing the idea and let people experience it.",
  },
];

const caseOrder = ["nevada-elder-care", "powerwashing", "apprenticeship-dashboard", "historical-society"];
const visibleCases = cases
  .filter(study => !study.hidden)
  .sort((a, b) => caseOrder.indexOf(a.slug) - caseOrder.indexOf(b.slug));

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

function WebsiteIntakePreview({ preview }: { preview: Preview }) {
  return (
    <div className={`${styles.mockHero} ${styles.intakeHero}`}>
      <div className={styles.mockCopy}><h2>{preview.title}</h2><p>{preview.copy}</p><div><b>{preview.actions[0]}</b><span>{preview.actions[1]}</span></div></div>
      <div className={styles.intakeForm}>
        <div className={styles.intakeHead}><span>New quote request</span><b>Step 1 of 2</b></div>
        <h3>Tell us about the property.</h3>
        <div>{preview.fields.map((field, index) => <span className={index === preview.fields.length - 1 ? styles.uploadField : ""} key={field}>{field}<b>{index === preview.fields.length - 1 ? "+" : "⌄"}</b></span>)}</div>
        <button type="button" tabIndex={-1}>{preview.deviceButton}<b>→</b></button>
      </div>
    </div>
  );
}

function SocialGridPreview({ preview }: { preview: Preview }) {
  const posts = ["Then & now", "Oral history", "Map story", "Archive find", "River voices", "Visit River City", "On this day", "From the vault", "Ask the archive"];
  return (
    <div className={styles.socialHero}>
      <div className={styles.socialTop}><div className={styles.socialAvatar}>RC</div><div><b>rivercityarchive</b><span>River City Historical Society</span></div><button type="button" tabIndex={-1}>Follow</button><i>•••</i></div>
      <div className={styles.socialBio}><div><b>12K</b><span>photos</span></div><div><b>86</b><span>oral histories</span></div><div><b>90</b><span>days planned</span></div><p>{preview.copy}</p></div>
      <div className={styles.socialTabs}><span>▦ POSTS</span><span>▣ REELS</span><span>♙ TAGGED</span></div>
      <div className={styles.socialPosts}>{posts.map((post, index) => <article key={post} className={index % 3 === 1 ? styles.warmPost : index % 4 === 0 ? styles.lightPost : ""}><span>{post}</span><small>{index % 2 === 0 ? "ARCHIVE / STORY" : "RIVER CITY"}</small></article>)}</div>
    </div>
  );
}

function DashboardPreview({ preview }: { preview: Preview }) {
  return (
    <div className={styles.dashboardHero}>
      <aside className={styles.dashboardSide}><strong>RTA</strong><span className={styles.sideActive}>▦</span><span>◎</span><span>⌁</span><span>▣</span><i>RC</i></aside>
      <div className={styles.dashboardMain}>
        <div className={styles.dashboardTop}><div><small>PROGRAM OPERATIONS</small><h2>{preview.title}</h2></div><button type="button" tabIndex={-1}>{preview.button}</button></div>
        <div className={styles.dashboardKpis}>{preview.stats.map(([value, label], index) => <div key={label}><span>{label}</span><b>{value}</b><i className={index > 1 ? styles.kpiAlert : ""}>{index === 0 ? "+18 this year" : index === 1 ? "+4% this month" : "Needs action"}</i></div>)}</div>
        <div className={styles.dashboardLower}>
          <div className={styles.cohortChart}><div><b>Cohort readiness</b><span>LAST 6 MONTHS</span></div><div className={styles.chartBars}>{[58,66,62,74,81,87].map((height, index) => <i key={height} style={{ height: `${height}%` }}><span>{["Mar","Apr","May","Jun","Jul","Aug"][index]}</span></i>)}</div></div>
          <div className={styles.actionQueue}><div><b>{preview.deviceTitle}</b><span>29 OPEN</span></div>{preview.fields.map((field, index) => <p key={field}><i className={index < 2 ? styles.urgentDot : ""} />{field}<b>›</b></p>)}</div>
        </div>
      </div>
    </div>
  );
}

function FormationPlatformPreview({ preview }: { preview: Preview }) {
  return (
    <div className={styles.formationHero}>
      <aside className={styles.formationSide} aria-hidden="true"><strong>✦</strong><span className={styles.formationActive}>⌂</span><span>▶</span><span>▤</span><span>◉</span><span>⌕</span></aside>
      <div className={styles.formationMain}>
        <section className={styles.formationFeature}>
          <div className={styles.formationFeatureCopy}><small>FEATURED FORMATION</small><h2>{preview.title}</h2><p>{preview.copy}</p><div><b>▶ {preview.actions[0]}</b><span>＋ Library</span></div></div>
          <div className={styles.formationArt} aria-hidden="true"><i>DE</i><span>VIDEO · BOOKS · AUDIO</span></div>
        </section>
        <div className={styles.formationSectionHead}><b>{preview.deviceTitle}</b><span>View all</span></div>
        <div className={styles.formationCards} aria-hidden="true">
          <article><div><i>▶</i><small>56%</small></div><b>The Search for Happiness</b><span>Video series · 24m left</span></article>
          <article><div><i>▤</i><small>42%</small></div><b>Praying with Scripture</b><span>Book · Continue reading</span></article>
          <article><div><i>◉</i><small>08</small></div><b>The Gospel of Work</b><span>Formation path · 8 sessions</span></article>
        </div>
      </div>
    </div>
  );
}

function ElderCarePreview({ preview }: { preview: Preview }) {
  return (
    <div className={styles.elderMobileHero}>
      <div className={styles.elderMobileCopy}>
        <span>GUIDED CARE NAVIGATION</span>
        <h2>Start with what’s happening right now.</h2>
        <p>Plain-language situations become a short, practical care path for the next 48 hours and beyond.</p>
        <div><i>♥</i><b>A real person can help at any step.</b></div>
      </div>
      <div className={styles.elderPhone} role="img" aria-label={`Mobile interface from the live ${preview.name} prototype`} />
    </div>
  );
}

function ProductPreview({ preview }: { preview: Preview }) {
  return (
    <div className={`${styles.preview} ${preview.kind === "dashboard" ? styles.dashboardPreview : ""} ${preview.kind === "elder-care" ? styles.elderPreview : ""}`} aria-label={`Prototype preview for ${preview.name}`}>
      {preview.kind !== "dashboard" && preview.kind !== "elder-care" && <div className={styles.mockHeader}><strong>{preview.name}</strong><div>{preview.nav.map(item => <span key={item}>{item}</span>)}</div><b>{preview.button}</b></div>}
      {preview.kind === "website-intake" && <WebsiteIntakePreview preview={preview} />}
      {preview.kind === "social-grid" && <SocialGridPreview preview={preview} />}
      {preview.kind === "dashboard" && <DashboardPreview preview={preview} />}
      {preview.kind === "formation-platform" && <FormationPlatformPreview preview={preview} />}
      {preview.kind === "elder-care" && <ElderCarePreview preview={preview} />}
      {preview.kind !== "dashboard" && preview.kind !== "elder-care" && <div className={styles.stats}>{preview.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>}
    </div>
  );
}

function StartingVisual({ visual, text }: { visual: "inbox" | "archive" | "spreadsheet" | "ecosystem" | "discharge"; text: string }) {
  return (
    <figure className={`${styles.startingVisual} ${styles[`${visual}Visual`]}`}>
      {visual === "inbox" && (
        <div className={styles.inboxWindow} aria-hidden="true">
          <div className={styles.artifactTop}><b>Messages</b><span>Edit</span></div>
          <div className={styles.messageSearch}>⌕&nbsp;&nbsp;Search messages</div>
          <div className={styles.messageList}>
            {[
              ["JM", "How much for a driveway?", "Can I send a few photos?", "9:42"],
              ["RP", "3 storefronts, monthly", "Do you offer recurring service?", "8:18"],
              ["KL", "What areas do you cover?", "We have two properties nearby.", "Mon"],
            ].map(([initials, title, copy, time], index) => <div className={styles.messageRow} key={title}><i>{initials}</i><p><b>{title}</b><span>{copy}</span></p><small>{time}{index < 2 && <em />}</small></div>)}
          </div>
          <div className={styles.inboxTrail}><span>4 photos</span><i>+</i><span>2 calls</span><i>+</i><span>6 DMs</span><b>one quote</b></div>
        </div>
      )}
      {visual === "archive" && (
        <div className={styles.staleFeed} aria-hidden="true">
          <div className={styles.artifactTop}><b>rivercityhistory</b><span>Following</span></div>
          <div className={styles.staleProfile}><i>RC</i><p><b>River City Historical Society</b><span>243 posts&nbsp;&nbsp;·&nbsp;&nbsp;1,108 followers</span></p></div>
          <div className={styles.stalePosts}>
            <div><small>1968</small><b>Main Street</b></div><div><span>▶</span><b>Oral history</b></div><div><small>MAP 04</small><b>River district</b></div>
          </div>
          <div className={styles.staleQuestion}><small>LAST POST: 47 WEEKS AGO</small><b>When was the last time someone posted? Who has the login?</b></div>
        </div>
      )}
      {visual === "spreadsheet" && (
        <div className={styles.sheetWindow} aria-hidden="true">
          <div className={styles.artifactTop}><b>Apprentice tracking.xlsx</b><span>Saved</span></div>
          <div className={styles.sheetTabs}><b>Apprentices</b><span>Hours</span><span>Certs</span><span>Employers</span></div>
          <div className={styles.sheetGrid}>
            {["NAME", "COHORT", "HOURS", "CERT EXP.", "A. Reed", "2025-A", "812", "11/18/26", "M. Diaz", "2025-A", "644", "03/02/27", "J. Price", "2024-C", "1,204", "06/18/26", "T. Hall", "2025-B", "530", "?"].map((cell, index) => <span key={`${cell}-${index}`}>{cell}</span>)}
          </div>
          <div className={styles.sheetQuestion}><small>THE DATA IS HERE</small><b>Wait, Tom’s certification is expired?</b><span>20 min to answer</span></div>
        </div>
      )}
      {visual === "ecosystem" && (
        <div className={styles.ecosystemMap} aria-hidden="true">
          <div className={styles.artifactTop}><b>Open browser tabs</b><span>4 different sources</span></div>
          <div className={styles.ecosystemSources}>
            <div><i>▶</i><p><b>Publisher video</b><span>Separate app</span></p></div>
            <div><i>▤</i><p><b>Catholic books</b><span>Another store</span></p></div>
            <div><i>◉</i><p><b>Audio teaching</b><span>Podcast feed</span></p></div>
            <div><i>✦</i><p><b>Formation course</b><span>New login</span></p></div>
          </div>
          <div className={styles.ecosystemQuestion}><span>RECENT SEARCH</span><b>Where do I begin, and how do I keep going?</b></div>
        </div>
      )}
      {visual === "discharge" && (
        <div className={styles.dischargeDesk} aria-hidden="true">
          <div className={styles.artifactTop}><b>Family notes</b><span>Trying to figure this out</span></div>
          <div className={styles.careNotepad}>
            <div className={styles.notepadHeading}><small>AFTER HOSPITAL DISCHARGE</small><b>Long-term care programs?</b></div>
            <div className={styles.notepadList}>
              <p><i>1</i><span>Nevada Medicaid</span><em>income limits? assets?</em></p>
              <p><i>2</i><span>Home-based services</span><em>waitlist?</em></p>
              <p><i>3</i><span>Veterans benefits</span><em>does Dad qualify?</em></p>
              <p><i>4</i><span>Care navigator</span><em>which office?</em></p>
            </div>
            <div className={styles.notepadCalls}><span>CALL:</span> Medicaid · 211 · Care Connection</div>
            <div className={styles.notepadQuestion}>Which one actually applies to us?</div>
          </div>
        </div>
      )}
      <figcaption>{text}</figcaption>
    </figure>
  );
}

function StorySection({ section }: { section: TextSection }) {
  return (
    <section className={styles.storySection}>
      <div className={styles.shell}>
        <div className={styles.sectionIntro}><p>{section.label}</p><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <span key={paragraph}>{paragraph}</span>)}</div>
        <div className={styles.contentGrid}>
          <div className={styles.panel}><h3>{section.panelTitle}</h3><ul>{section.bullets.map(item => <li key={item}><b aria-hidden="true">◎</b><span>{item}</span></li>)}</ul></div>
          {section.aside.kind === "photo" ? <StartingVisual visual={section.aside.visual} text={section.aside.text} /> : <figure className={styles.quote}><blockquote>“{section.aside.text}”</blockquote><figcaption>{section.aside.cite}</figcaption></figure>}
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
              <p className={styles.eyebrow}>Case study <span>{study.category}</span><span className={styles.artifactBadge}>{study.artifact}</span><span className={styles.workBadge}>{study.workStatus}</span></p>
              <h1>{study.title}</h1><p className={styles.dek}>{study.dek}</p>
              <div className={styles.meta}>{study.meta.map(([icon, label, value]) => <div key={label}><i>{icon}</i><span><b>{label}</b><small>{value}</small></span></div>)}</div>
              <p className={styles.note}>{study.note}</p>
              {study.liveUrl && <a className={styles.livePrototype} href={study.liveUrl} target="_blank" rel="noreferrer">Explore the live prototype <Arrow /></a>}
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
          <div className={styles.sectionIntro}><p>{study.impactLabel ?? "The impact · projected"}</p><h2>{study.impactTitle}</h2><span>{study.impactCopy}</span></div>
          <div className={styles.impactGrid}>
            <div className={styles.impacts}>{study.impacts.map(([icon, title, copy]) => <div key={title}><i>{icon}</i><b>{title}</b><p>{copy}</p></div>)}</div>
            <aside className={styles.next}><span>What’s next</span><p>{study.next}</p>{study.nextHref ? <a href={study.nextHref} target="_blank" rel="noreferrer">{study.nextAction} <Arrow /></a> : <Link href="/?start=sprint#booking">{study.nextAction} <Arrow /></Link>}</aside>
          </div>
        </div>
      </section>
      <section className={styles.takeaway}><div className={styles.shell}><div><p>So what does this mean for you?</p><h2>{study.takeawayTitle}</h2>{study.takeaway.map(item => <span key={item}>{item}</span>)}<strong>{study.closer}</strong></div></div></section>
    </main>
  );
}

export function CaseStudiesPage() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const selectFromHash = () => {
      const slug = window.location.hash.slice(1);
      const index = visibleCases.findIndex(study => study.slug === slug);
      if (index >= 0) setActive(index);
    };
    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => window.removeEventListener("hashchange", selectFromHash);
  }, []);
  const selectCase = (index: number) => {
    setActive(index);
    window.history.replaceState(null, "", `#${visibleCases[index].slug}`);
    window.requestAnimationFrame(() => document.getElementById("case-picker")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  return (
    <div className={styles.page}>
      <header className={styles.siteHeader}>
        <Link className={styles.brand} href="/" aria-label="Proto Sprint home"><span>PS</span><span><strong>Proto Sprint</strong><small>Ideas into real products.</small></span></Link>
        <nav aria-label="Main navigation"><Link href="/#how-it-works">How it works</Link><Link href="/#menu">Sprint menu</Link><Link className={styles.current} href="/case-studies">Case studies</Link><Link href="/#pricing">Pricing</Link></nav>
        <Link className={styles.headerButton} href="/?start=fit#booking">Free fit call <Arrow /></Link>
      </header>
      <div className={styles.switcherWrap} id="case-picker"><div className={styles.switcher} role="tablist" aria-label="Choose a case study">{visibleCases.map((study, index) => <button role="tab" aria-selected={active === index} className={active === index ? styles.active : ""} key={study.slug} onClick={() => selectCase(index)}><span>0{index + 1}</span>{study.tab}</button>)}</div></div>
      <CaseStudyView study={visibleCases[active]} />
      <footer className={styles.footer}><div className={styles.footerTop}><Link className={styles.brand} href="/"><span>PS</span><span><strong>Proto Sprint</strong><small>Ideas into real products.</small></span></Link><p>Modern tools. Founder-owned. Built for speed.</p><Link href="/?start=fit#booking">Start with a free fit call <Arrow /></Link></div><div className={styles.footerBottom}><p>Fictionalized details are disclosed within each case study. Real products are identified where shown.</p><span>Proto Sprint · 2026</span></div></footer>
    </div>
  );
}
