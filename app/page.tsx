import { Suspense } from "react";
import { BookingPathSync } from "./BookingPathSync";

const FIT_CALL_URL = "/?start=fit#booking";
const SPRINT_REQUEST_URL = "/?start=sprint#booking";
const CONTACT_URL =
  "mailto:hello@prototypesprint.studio?subject=Prototype%20Sprint%20inquiry";

const outcomes = [
  {
    number: "01",
    title: "Working prototype",
    copy: "A focused product experience people can click, use, and react to.",
    preview: "product",
  },
  {
    number: "02",
    title: "Landing page",
    copy: "A clear, high-converting home for your idea and its next step.",
    preview: "landing",
  },
  {
    number: "03",
    title: "Brand starter",
    copy: "A practical visual system that makes an early product feel coherent.",
    preview: "brand",
  },
  {
    number: "04",
    title: "Social launch kit",
    copy: "Messaging and reusable assets to help you begin talking about it.",
    preview: "social",
  },
];

const menuGroups = [
  {
    label: "Product & prototype",
    items: [
      "Interactive prototype",
      "Core user flow",
      "Web app MVP",
      "Internal tool",
      "Dashboard",
      "Workflow automation",
      "API-powered experience",
      "Database-backed app",
    ],
  },
  {
    label: "Landing & launch",
    items: [
      "Landing page",
      "Waitlist page",
      "Product messaging",
      "Basic SEO",
      "Lead capture",
      "Analytics setup",
      "Social sharing setup",
      "Custom domain launch",
    ],
  },
  {
    label: "Brand & story",
    items: [
      "Brand starter",
      "Simple wordmark",
      "Color & type system",
      "UI brand application",
      "Launch messaging",
      "Social launch kit",
      "Product screenshots",
      "Launch content plan",
    ],
  },
];

const prices = [
  {
    name: "Prototype Sprint",
    time: "3 hours",
    price: "$500",
    note: "For new ideas",
    description:
      "Focus the concept, build the highest-value outcome, and ship when practical.",
    featured: true,
  },
  {
    name: "Iteration Session",
    time: "2 hours",
    price: "$300",
    note: "For focused improvements",
    description:
      "Refine an existing prototype, implement feedback, or tackle a small feature.",
  },
  {
    name: "Iteration Sprint",
    time: "3 hours",
    price: "$450",
    note: "For a substantial next round",
    description:
      "Expand a key workflow, prepare for a demo, or move a prototype closer to launch.",
  },
];

const audiences = [
  ["Founder with an idea", "Turn the thing you keep describing into something people can actually react to."],
  ["Small team", "Test a workflow, tool, or customer experience without starting a six-month project."],
  ["Nonprofit or ministry", "Explore a digital program or resource before committing to a major build."],
  ["Existing product team", "Prototype a feature quickly before it enters the main roadmap."],
];

const faqs = [
  {
    question: "Can you really build something in three hours?",
    answer:
      "Sometimes, yes—and occasionally more than people expect. The result depends on scope, complexity, preparation, and how quickly decisions can be made. Focused web ideas can move surprisingly far; complicated ideas may use the sprint to prove the core workflow.",
  },
  {
    question: "Is a deployed prototype guaranteed?",
    answer:
      "No. Deployment is often a realistic target for a prepared web project, but the sprint guarantees a dedicated working window—not a predetermined quantity of software. We prioritize the most useful outcome and label clearly what is functional, mocked, or incomplete.",
  },
  {
    question: "Could we build a prototype and landing page together?",
    answer:
      "Yes, when the idea is focused and the content, assets, and accounts are ready. For a more complex product, we may choose to spend the sprint on the application and handle the landing page in a later session.",
  },
  {
    question: "What could the best-case ongoing software cost?",
    answer:
      "Potentially $0 per month at prototype scale. A prepared project can use GitHub Free for the repository, Netlify Free for hosting and form submissions, and Supabase Free for a lightweight backend—provided usage stays within each plan’s limits. If you already own the domain, there may be no new domain purchase either. Paid APIs, email, payment processing, higher traffic, or production requirements can add costs, and provider terms can change.",
  },
  {
    question: "Do I need to take the free fit call first?",
    answer:
      "No. The free 15-minute Sprint Fit Call is the recommended starting point when you want to confirm scope, readiness, or whether a sprint is the right format. If your idea is already focused and you are ready to move, you can request the $500 Prototype Sprint directly. Either path starts with a short intake so the conversation is useful.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "No. You need to understand the problem and be ready to make decisions. The technical implementation happens during the sprint, with the work visible as it takes shape.",
  },
  {
    question: "Do I own the code?",
    answer:
      "That is the intent. Whenever practical, the repository, hosting, database, domain, Google Drive handoff folder, and third-party accounts are yours from the beginning. The Drive folder becomes the shared home for documentation, working materials, final exports, and handoff notes. Third-party tools and licensed materials remain subject to their own terms.",
  },
  {
    question: "Is this production-ready software?",
    answer:
      "Not automatically. Prototype Sprints are designed for validation, demos, early users, and product learning. Security, privacy, performance, accessibility, monitoring, and other production requirements should be evaluated and scoped separately.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ProductPreview({ type }: { type: string }) {
  if (type === "brand") {
    return (
      <div className="mini-preview brand-preview" aria-hidden="true">
        <div className="brand-mark">N</div>
        <div className="brand-name">NORTHLINE</div>
        <div className="swatches"><i /><i /><i /></div>
        <div className="type-sample">Aa</div>
      </div>
    );
  }

  if (type === "social") {
    return (
      <div className="mini-preview social-preview" aria-hidden="true">
        <div className="social-tile dark">NEW<br />PRODUCT<br />LAUNCH</div>
        <div className="social-tile orange">START<br />SHOWING<br />THE IDEA</div>
        <div className="social-tile lines"><i /><i /><i /></div>
        <div className="social-tile quote">“MAKE IT<br />REAL.”</div>
      </div>
    );
  }

  if (type === "landing") {
    return (
      <div className="mini-preview landing-preview" aria-hidden="true">
        <div className="mini-nav"><span>arc</span><i /><i /><b /></div>
        <div className="mini-hero-copy">Products should<br /><em>earn attention.</em></div>
        <div className="mini-button" />
        <div className="mini-card-row"><i /><i /><i /></div>
      </div>
    );
  }

  return (
    <div className="mini-preview product-preview" aria-hidden="true">
      <div className="mini-sidebar"><b>◫</b><i /><i /><i /><i /></div>
      <div className="mini-main">
        <div className="mini-top"><span>Dashboard</span><b>+</b></div>
        <div className="mini-metrics"><i /><i /><i /></div>
        <div className="mini-chart"><span /><span /><span /><span /><span /><span /><span /></div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Prototype Sprint home">
          <span className="brand-badge">PS</span>
          <span className="brand-copy">
            <strong>Prototype Sprint</strong>
            <small>Ideas into real products.</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#menu">Sprint menu</a>
          <a href="#pricing">Pricing</a>
          <a href="/checklists">Checklists</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="button button-small" href={FIT_CALL_URL}>Free fit call <Arrow /></a>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Live · Collaborative · AI-assisted</p>
            <h1>From idea to something <em>real</em> in one focused session.</h1>
            <p className="hero-lede">
              A three-hour collaborative sprint for founders and teams ready to stop
              talking about an idea and start using it.
            </p>
            <div className="hero-actions">
              <a className="button" href={FIT_CALL_URL}>Book a Free Fit Call <span>15 min</span></a>
              <a className="button button-secondary" href={SPRINT_REQUEST_URL}>Request a $500 Sprint <Arrow /></a>
            </div>
            <p className="micro-proof">
              Start with the free fit call, or request the sprint directly if your goal is already focused. Come prepared and we can aim for a deployed prototype, landing page, or both.
            </p>
          </div>

          <div className="hero-art" aria-label="Product dashboard prototype illustration">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="floating-note note-one"><b>BUILDING LIVE</b><span>decisions happen now</span></div>
            <div className="floating-note note-two"><b>03:00</b><span>focused hours</span></div>
            <div className="laptop">
              <div className="laptop-camera" />
              <div className="dashboard">
                <aside className="dash-sidebar">
                  <strong>PS</strong>
                  <span className="active" /><span /><span /><span /><span />
                  <i />
                </aside>
                <div className="dash-content">
                  <div className="dash-head"><div><small>SPRINT BOARD</small><b>Welcome back.</b></div><span>RC</span></div>
                  <div className="dash-stats">
                    <div><small>Prototype</small><strong>72%</strong><i /></div>
                    <div><small>Decisions</small><strong>14</strong><i /></div>
                    <div><small>Time left</small><strong>01:08</strong><i /></div>
                  </div>
                  <div className="dash-panel">
                    <div className="dash-panel-head"><b>Build velocity</b><small>LIVE</small></div>
                    <div className="dash-chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                  </div>
                  <div className="dash-tasks"><span><i />Primary flow</span><span><i />Landing page</span><span><i />Deploy preview</span></div>
                </div>
              </div>
              <div className="laptop-base" />
            </div>
          </div>

          <div className="value-strip" aria-label="Sprint attributes">
            <div><span className="value-icon">03</span><p><strong>3 hours</strong><small>Focused time</small></p></div>
            <div><span className="value-icon">↔</span><p><strong>Live & collaborative</strong><small>You are part of the build</small></p></div>
            <div><span className="value-icon">AI</span><p><strong>AI-assisted</strong><small>Modern tools, faster results</small></p></div>
            <div><span className="value-icon">↗</span><p><strong>Deploy when possible</strong><small>Walk away with something real</small></p></div>
          </div>
        </section>

        <section className="statement-band" aria-label="Positioning statement">
          <p>Not a giant project. Not months of meetings. Just focused time and <em>real progress.</em></p>
        </section>

        <section className="intro-section section-shell">
          <div className="section-kicker">What is a Prototype Sprint?</div>
          <div className="intro-grid">
            <h2>A working session with the work happening <em>in the room.</em></h2>
            <div>
              <p className="large-body">We clarify the idea, choose the highest-value outcome, and begin building immediately. You see the work as it happens and help steer the decisions.</p>
              <p>No long requirements phase. No disappearing for a week. Just a focused loop of thinking, deciding, building, testing, and—when the project allows—shipping.</p>
            </div>
          </div>
          <div className="truth-card">
            <span>THE PROMISE</span>
            <p>Get as far as we responsibly can toward something you can <strong>use, test, share, or demonstrate.</strong></p>
            <small>The session is time-boxed. The outcome is prioritized together.</small>
          </div>
        </section>

        <section className="process-section" id="how-it-works">
          <div className="section-shell">
            <div className="before-sprint">
              <div className="before-sprint-heading">
                <div><p className="section-kicker">Before the clock starts</p><h2>Choose. Prepare. Build.</h2></div>
                <p>Start with a free 15-minute fit call or request the $500 sprint directly. Either way, a short intake and practical checklist protect the session for decisions and building—not account setup and asset hunting.</p>
              </div>
              <ol className="booking-journey">
                <li><span>01</span><div><h3>Choose how to start</h3><p>Book the free fit call if you want to confirm scope, or request the sprint directly when you are ready to build.</p></div></li>
                <li><span>02</span><div><h3>Confirm fit & prepare</h3><p>We confirm the best next step, then you prepare the accounts, access, assets, decisions, and client-owned Google Drive handoff folder.</p><a href="/checklists">Open the checklists <Arrow /></a></div></li>
                <li><span>03</span><div><h3>Join the live session</h3><p>We confirm the priority, start the three-hour clock, and build together toward the best outcome.</p></div></li>
              </ol>
            </div>
            <div className="section-heading">
              <div><p className="section-kicker">Inside the session</p><h2>Three hours. One focused loop.</h2></div>
              <p>Preparation changes how far we can get. Once the clock starts, we protect the time and build toward the most valuable next step.</p>
            </div>
            <ol className="process-grid">
              <li><span>01</span><div className="process-line" /><h3>Focus</h3><p>Define the user, the problem, the smallest useful version, and what would make this session a win.</p><small>00:00—00:30</small></li>
              <li><span>02</span><div className="process-line" /><h3>Build live</h3><p>Design and implement immediately. You react, answer questions, and make decisions in real time.</p><small>00:30—02:15</small></li>
              <li><span>03</span><div className="process-line" /><h3>Refine</h3><p>Test the primary workflow, fix the obvious issues, and sharpen the surfaces that matter most.</p><small>02:15—02:45</small></li>
              <li><span>04</span><h3>Ship & hand off</h3><p>Deploy when practical, label what is real or mocked, and organize documentation, final materials, and next steps in your shared Drive folder.</p><small>02:45—03:00</small></li>
            </ol>
          </div>
        </section>

        <section className="outcomes-section section-shell" id="menu">
          <div className="section-heading outcomes-heading">
            <div><p className="section-kicker">Possible outcomes</p><h2>What we can build.</h2></div>
            <p>Every idea is different. A strong, prepared sprint can cover several connected outputs; a technically complex project may use the full session on one core flow.</p>
          </div>
          <div className="outcome-grid">
            {outcomes.map((outcome) => (
              <article className="outcome-card" key={outcome.title}>
                <ProductPreview type={outcome.preview} />
                <div className="outcome-card-copy"><span>{outcome.number}</span><h3>{outcome.title}</h3><p>{outcome.copy}</p></div>
              </article>
            ))}
          </div>
          <div className="possibility-callout">
            <span>AN AMBITIOUS, PREPARED-SPRINT TARGET</span>
            <strong>Working prototype <i>+</i> landing page <i>+</i> deployment</strong>
            <p>Possible when the concept is focused, the workflow is simple, and your content, accounts, and assets are ready. A target—not a guaranteed bundle.</p>
          </div>

          <div className="menu-heading">
            <div><p className="section-kicker">Pick your priorities</p><h2>Choose what matters most.</h2></div>
            <p>This is a menu, not a promise that every item fits into one session. We choose the highest-value combination together.</p>
          </div>
          <div className="menu-groups">
            {menuGroups.map((group, groupIndex) => (
              <article className="menu-group" key={group.label}>
                <div className="menu-label"><span>0{groupIndex + 1}</span><h3>{group.label}</h3></div>
                <ul>{group.items.map((item) => <li key={item}><span>+</span>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="pricing-section" id="pricing">
          <div className="section-shell">
            <div className="section-heading">
              <div><p className="section-kicker">Pricing</p><h2>Buy focused time, not a feature bundle.</h2></div>
              <p>We prioritize together and use the working window where it creates the most value. No retainer required.</p>
            </div>
            <div className="pricing-layout">
              <div className="price-grid">
                {prices.map((price) => (
                  <article className={`price-card ${price.featured ? "featured" : ""}`} key={price.name}>
                    {price.featured && <span className="popular">FIRST SPRINT</span>}
                    <div className="price-head"><h3>{price.name}</h3><span>{price.time}</span></div>
                    <strong className="price">{price.price}</strong>
                    <p>{price.description}</p>
                    <small>{price.note}</small>
                    {price.featured && <a href={SPRINT_REQUEST_URL}>Request this sprint <Arrow /></a>}
                  </article>
                ))}
              </div>
              <aside className="included-card">
                <span>EVERY SESSION INCLUDES</span>
                <ul>
                  <li><i>✓</i> Live, collaborative building</li>
                  <li><i>✓</i> Honest scope decisions</li>
                  <li><i>✓</i> Source code and created assets</li>
                  <li><i>✓</i> Client-owned Google Drive handoff space</li>
                  <li><i>✓</i> Clear functional vs. mocked handoff</li>
                  <li><i>✓</i> A recommended next step</li>
                </ul>
                <p>No surprises. No retainers.<br />Just focused time that moves the idea forward.</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="readiness-section section-shell" id="readiness">
          <div className="readiness-copy">
            <p className="section-kicker">Sprint readiness</p>
            <h2>Want to leave with something live? <em>Come ready to build.</em></h2>
            <p className="large-body">Setup work is real work. A little preparation dramatically increases how much of the sprint can go toward the product.</p>
            <div className="checklist">
              <div><span>✓</span><p><strong>Focused outcome</strong><small>Know the user, problem, and most valuable first version.</small></p></div>
              <div><span>✓</span><p><strong>Content & assets</strong><small>Bring copy, logos, sample data, and useful references.</small></p></div>
              <div><span>✓</span><p><strong>Accounts & access</strong><small>Have relevant hosting, domain, API, and service logins ready.</small></p></div>
              <div><span>✓</span><p><strong>Shared handoff folder</strong><small>Create a client-owned Google Drive folder for references, working files, documentation, and final materials.</small></p></div>
              <div><span>✓</span><p><strong>Decision-maker present</strong><small>Someone in the room can make fast, final calls.</small></p></div>
            </div>
            <a className="button button-secondary readiness-link" href="/checklists">Open the offering checklists <Arrow /></a>
          </div>
          <div className="readiness-levels">
            <article className="readiness-card ready"><span>READY TO SHIP</span><strong>Aim aggressively for a deployed first version.</strong><p>Focused idea · content · accounts · assets · fast decisions</p><i>03</i></article>
            <article className="readiness-card"><span>MOSTLY READY</span><strong>Build the core and use placeholders where necessary.</strong><p>Clear idea · most access · some content still in motion</p><i>02</i></article>
            <article className="readiness-card"><span>IDEA STAGE</span><strong>Use the sprint for clarity and a narrower proof of concept.</strong><p>Early concept · open decisions · setup still required</p><i>01</i></article>
          </div>
        </section>

        <section className="ownership-section">
          <div className="section-shell ownership-grid">
            <div>
              <p className="section-kicker light">Founder-owned by default</p>
              <h2>You own what we build.</h2>
              <p>No hostage-code handoff. Whenever practical, we build in accounts you own from the beginning. Your shared Google Drive folder keeps briefs, source material, decisions, documentation, exports, and handoff notes in one place you control.</p>
              <a className="text-link" href="#faq">Read the ownership FAQ <Arrow /></a>
            </div>
            <div className="ownership-map" aria-label="Client-owned tools and accounts">
              <div className="ownership-center"><span>YOU</span><small>OWNER</small></div>
              <div className="ownership-item item-one"><span>GH</span><p>Repository<small>Your GitHub</small></p></div>
              <div className="ownership-item item-two"><span>DB</span><p>Data<small>Your backend</small></p></div>
              <div className="ownership-item item-three"><span>↗</span><p>Hosting<small>Your account</small></p></div>
              <div className="ownership-item item-four"><span>GD</span><p>Handoff<small>Your Google Drive</small></p></div>
            </div>
          </div>
        </section>

        <section className="live-section section-shell">
          <div className="live-visual" aria-hidden="true">
            <div className="cursor-card cursor-one"><span>YOU</span><i /></div>
            <div className="cursor-card cursor-two"><span>BUILDER</span><i /></div>
            <div className="live-window">
              <div className="live-window-bar"><i /><i /><i /><span>prototype / primary-flow</span></div>
              <div className="live-window-body">
                <aside><i /><i /><i /><i /></aside>
                <div><small>STEP 02 / 04</small><h3>Choose your workspace</h3><p>We are shaping the decision together.</p><button>Continue <Arrow /></button></div>
              </div>
            </div>
          </div>
          <div className="live-copy">
            <p className="section-kicker">Why build live?</p>
            <h2>Shorten the distance between <em>idea and feedback.</em></h2>
            <p className="large-body">Instead of disappearing and guessing what you meant, we build together. You can react while the product takes shape and redirect the session toward what matters most.</p>
            <p>AI-assisted development helps us move unusually fast. The real value is knowing what to build, connecting the pieces, testing the result, and turning the output into something useful.</p>
          </div>
        </section>

        <section className="audience-section">
          <div className="section-shell">
            <div className="section-heading">
              <div><p className="section-kicker">Who it is for</p><h2>For people ready to make the idea tangible.</h2></div>
              <p>You do not need to code. You do need a problem worth solving and the willingness to make decisions.</p>
            </div>
            <div className="audience-grid">
              {audiences.map(([name, copy], index) => (
                <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{copy}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section section-shell" id="faq">
          <div className="faq-intro">
            <p className="section-kicker">FAQ</p>
            <h2>Honest answers before the clock starts.</h2>
            <p>The offer is ambitious, but the promise stays grounded. If your question is not here, start a conversation.</p>
            <a className="button button-secondary" href={CONTACT_URL}>Ask a question <Arrow /></a>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary><span>0{index + 1}</span>{faq.question}<i aria-hidden="true">+</i></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="booking-section" id="booking">
          <div className="final-grid" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          <div className="section-shell booking-layout">
            <div className="booking-copy">
              <p className="eyebrow light"><span /> 3 hours · $500 · live build</p>
              <h2>Choose how to start.</h2>
              <p>Book the free 15-minute fit call to confirm scope and readiness, or request the $500 sprint directly when the goal is already focused. Both paths begin with the same useful context.</p>
              <ol>
                <li><span>01</span>Choose a free fit call or direct sprint request</li>
                <li><span>02</span>Confirm fit and complete the checklist</li>
                <li><span>03</span>Schedule the sprint and start building</li>
              </ol>
              <small>No retainer. No guaranteed bundle. Just focused progress.</small>
            </div>
            <form
              className="booking-form"
              name="prototype-sprint-inquiry"
              action="/thanks/"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="prototype-sprint-inquiry" />
              <input type="hidden" name="subject" value="New Prototype Sprint inquiry" />
              <p className="honeypot"><label>Do not fill this out: <input name="bot-field" /></label></p>
              <div className="form-heading"><span>START HERE</span><strong>Free fit call or direct sprint?</strong></div>
              <fieldset className="start-path-options">
                <legend>Choose your starting path</legend>
                <div>
                  <label>
                    <input type="radio" name="start-path" value="Free 15-minute Sprint Fit Call" defaultChecked required />
                    <span><b>RECOMMENDED</b><strong>Free 15-minute Sprint Fit Call</strong><small>Confirm scope, readiness, and whether the sprint is a good fit.</small></span>
                  </label>
                  <label>
                    <input type="radio" name="start-path" value="Direct $500 Prototype Sprint request" required />
                    <span><b>READY TO BUILD</b><strong>Request the $500 Prototype Sprint</strong><small>Use this path when the idea and first-sprint goal are already focused.</small></span>
                  </label>
                </div>
              </fieldset>
              <Suspense fallback={null}><BookingPathSync /></Suspense>
              <div className="form-row">
                <label>First name<input name="first-name" autoComplete="given-name" required /></label>
                <label>Last name<input name="last-name" autoComplete="family-name" required /></label>
              </div>
              <label>Email<input type="email" name="email" autoComplete="email" required /></label>
              <label>Which session fits best?
                <select name="offering" defaultValue="Prototype Sprint — 3 hours / $500" required>
                  <option>Prototype Sprint — 3 hours / $500</option>
                  <option>Iteration Session — 2 hours / $300</option>
                  <option>Iteration Sprint — 3 hours / $450</option>
                  <option>Brand or launch-focused sprint</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label>What are you trying to build?<textarea name="project-summary" rows={3} required placeholder="The idea, who it is for, and the problem it solves." /></label>
              <label>What would make the first sprint a win?<textarea name="sprint-win" rows={3} required placeholder="The most valuable thing we could make clearer, working, or shareable." /></label>
              <fieldset>
                <legend>Likely priorities <small>Select any that apply.</small></legend>
                <div className="priority-options">
                  {['Prototype', 'Landing page', 'Brand starter', 'Database or login', 'Integration', 'Deployment', 'Social launch', 'Documentation & handoff'].map((priority) => (
                    <label key={priority}><input type="checkbox" name="priorities[]" value={priority} /><span>{priority}</span></label>
                  ))}
                </div>
              </fieldset>
              <label>Shared Google Drive folder <small className="field-help">Optional now; we will ask for a client-owned folder before the session.</small><input type="url" name="handoff-drive" inputMode="url" placeholder="https://drive.google.com/…" /></label>
              <label>Anything else we should know?<textarea name="notes" rows={2} /></label>
              <label className="consent-row"><input type="checkbox" name="readiness-agreement" value="I understand the sprint is time-boxed" required /><span>I understand this is a time-boxed working session, not a guaranteed feature bundle.</span></label>
              <button className="button form-submit" type="submit">Send my request <Arrow /></button>
              <p className="form-note">No payment is taken here. We use your answers to assess fit and send the right next step.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="brand footer-brand" href="#top">
            <span className="brand-badge">PS</span>
            <span className="brand-copy"><strong>Prototype Sprint</strong><small>Ideas into real products.</small></span>
          </a>
          <p>Modern tools. Founder-owned. Built for speed.</p>
          <div className="tool-list" aria-label="Common prototype tools"><span>Netlify</span><span>Supabase</span><span>GitHub</span><span>Google Drive</span><span>Stripe</span></div>
        </div>
        <div className="footer-bottom">
          <p>Prototype Sprint deliverables are not automatically production-ready software.</p>
          <div><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a><a href="/checklists">Checklists</a><a href="#faq">FAQ</a></div>
          <span>Prototype Sprint · 2026</span>
        </div>
      </footer>
    </>
  );
}
