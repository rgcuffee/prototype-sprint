"use client";

import { useMemo, useState } from "react";
import styles from "./promisePath.module.css";

type View = "path" | "stability" | "team";
type Role = "family" | "manager";

type Pillar = {
  id: string;
  number: string;
  title: string;
  prompt: string;
  actions: string[];
  tone: "rose" | "gold" | "blue" | "sage";
};

const phases = [
  { number: "01", title: "Welcome & safety", note: "Safe place, urgent needs", state: "done" },
  { number: "02", title: "Documents & benefits", note: "IDs, assistance, health", state: "done" },
  { number: "03", title: "Income plan", note: "Work, training, childcare", state: "current" },
  { number: "04", title: "Housing match", note: "Budget, search, application", state: "next" },
  { number: "05", title: "Move-in ready", note: "Lease, utilities, home kit", state: "later" },
  { number: "06", title: "Stay stable", note: "12-month family plan", state: "later" },
] as const;

const todayTasks = [
  {
    id: "work-card",
    title: "Upload Jordan’s renewed work card",
    detail: "Needed before the new shift can be confirmed.",
    owner: "Jordan",
    tag: "Due today",
  },
  {
    id: "childcare-hours",
    title: "Confirm childcare hours for the new schedule",
    detail: "Sofia can call the provider with you.",
    owner: "Jordan + Sofia",
    tag: "15 minutes",
  },
];

const weekTasks = [
  {
    id: "income-floor",
    title: "Set the family’s weekly take-home floor",
    detail: "Use the budget worksheet to choose a number that protects rent and food.",
    owner: "Jordan",
    tag: "This week",
  },
  {
    id: "housing-docs",
    title: "Build the housing application folder",
    detail: "Income proof, IDs, references, and the explanation letter in one place.",
    owner: "Family team",
    tag: "Before Friday",
  },
];

const pillars: Pillar[] = [
  {
    id: "income",
    number: "01",
    title: "Income that lasts",
    prompt: "How will income stay dependable when life changes?",
    tone: "rose",
    actions: [
      "Keep 30 hours of dependable work each week",
      "Complete food-handler certification",
      "Update the resume with the new role",
      "Ask for the 90-day wage review in writing",
      "Identify one backup employer within the bus route",
      "Build a two-week income buffer",
      "Review the schedule before accepting extra shifts",
      "Check income progress with Sofia each month",
    ],
  },
  {
    id: "childcare",
    number: "02",
    title: "Childcare & school",
    prompt: "What makes work and school predictable for everyone?",
    tone: "gold",
    actions: [
      "Confirm childcare for every regular shift",
      "Name two approved backup caregivers",
      "Keep school contacts in the family folder",
      "Set a morning departure routine",
      "Review school attendance every Friday",
      "Plan care for school closure days",
      "Keep subsidy renewal dates visible",
      "Ask children what feels unsettled each week",
    ],
  },
  {
    id: "housing",
    number: "03",
    title: "Housing security",
    prompt: "What keeps the new home affordable and safe?",
    tone: "blue",
    actions: [
      "Keep rent below the agreed family ceiling",
      "Read the lease with the housing navigator",
      "Photograph the move-in condition",
      "Put rent and utility dates on one calendar",
      "Learn the landlord’s repair request process",
      "Check the home for child safety needs",
      "Keep renter documents in one folder",
      "Create a plan before any payment is late",
    ],
  },
  {
    id: "transport",
    number: "04",
    title: "Reliable transportation",
    prompt: "How will everyone reach work, school, and care?",
    tone: "sage",
    actions: [
      "Map the weekday route to work",
      "Test the school-to-childcare handoff",
      "Keep two weeks of bus fare available",
      "Identify a backup ride for late shifts",
      "Save the paratransit eligibility number",
      "Set a monthly vehicle savings amount",
      "Keep emergency ride contacts current",
      "Review commute changes before moving",
    ],
  },
  {
    id: "health",
    number: "05",
    title: "Health & recovery",
    prompt: "What protects the family’s energy, care, and recovery?",
    tone: "sage",
    actions: [
      "Choose a primary care clinic near home",
      "Keep prescriptions current during move-in",
      "Protect one low-demand evening each week",
      "Schedule overdue child wellness visits",
      "Save crisis and after-hours care numbers",
      "Keep insurance renewal dates visible",
      "Plan meals for the busiest work nights",
      "Tell Sofia when stress disrupts sleep for a week",
    ],
  },
  {
    id: "budget",
    number: "06",
    title: "Benefits & budget",
    prompt: "How will the family see pressure before it becomes crisis?",
    tone: "blue",
    actions: [
      "Make a complete monthly housing budget",
      "Renew every eligible benefit on time",
      "Review spending together every Sunday",
      "Build a $500 first emergency reserve",
      "Set utilities to reminder or autopay",
      "Keep one list of debts and due dates",
      "Use tax filing and credit coaching support",
      "Call before borrowing for an emergency",
    ],
  },
  {
    id: "routine",
    number: "07",
    title: "Family routine",
    prompt: "Which small routines make home feel steady?",
    tone: "gold",
    actions: [
      "Hold a ten-minute Sunday family check-in",
      "Post the school and work week together",
      "Prepare bags and clothes the night before",
      "Keep one shared home-care list",
      "Protect a weekly no-cost family activity",
      "Notice one win at each check-in",
      "Reset the home together on Saturdays",
      "Adjust routines after any schedule change",
    ],
  },
  {
    id: "support",
    number: "08",
    title: "Support circle",
    prompt: "Who can help before a hard week becomes an emergency?",
    tone: "rose",
    actions: [
      "Name three people the family can call",
      "Stay connected to one community group",
      "Schedule monthly check-ins with Sofia",
      "Ask for help before rent is seven days away",
      "Keep school and childcare allies updated",
      "Know the after-hours housing support number",
      "Offer one realistic way to help another family",
      "Revisit the support circle every three months",
    ],
  },
];

const initialCompleted = new Set([
  "income-0",
  "income-1",
  "childcare-0",
  "childcare-1",
  "housing-0",
  "health-0",
  "budget-0",
  "budget-1",
  "budget-2",
  "routine-0",
  "support-0",
  "support-1",
]);

function Brand() {
  return (
    <a className={styles.brand} href="https://fplv.org" target="_blank" rel="noreferrer" aria-label="Family Promise of Las Vegas website">
      <span className={styles.brandMark} aria-hidden="true"><span>FP</span></span>
      <span className={styles.brandWords}>
        <strong>Family Promise</strong>
        <small>of Las Vegas</small>
      </span>
    </a>
  );
}

function AppHeader({ role, setRole, activeView, setActiveView }: { role: Role; setRole: (role: Role) => void; activeView: View; setActiveView: (view: View) => void }) {
  return (
    <>
      <header className={styles.topbar}>
        <Brand />
        {role === "family" ? (
          <nav className={styles.primaryNav} aria-label="Family plan">
            <button className={activeView === "path" ? styles.navActive : ""} onClick={() => setActiveView("path")}>My path</button>
            <button className={activeView === "stability" ? styles.navActive : ""} onClick={() => setActiveView("stability")}>Stability board</button>
            <button className={activeView === "team" ? styles.navActive : ""} onClick={() => setActiveView("team")}>My team</button>
          </nav>
        ) : <span className={styles.managerTitle}>Case manager workspace</span>}
        <div className={styles.roleSwitch} aria-label="Prototype view">
          <button aria-pressed={role === "family"} className={role === "family" ? styles.roleActive : ""} onClick={() => setRole("family")}>Family</button>
          <button aria-pressed={role === "manager"} className={role === "manager" ? styles.roleActive : ""} onClick={() => setRole("manager")}>Case manager</button>
        </div>
      </header>
      <div className={styles.prototypeStrip}>
        <span><b>Promise Path</b> · Product concept</span>
        <small>Fictional family data for demonstration</small>
      </div>
    </>
  );
}

function HelpBar({ requested, onRequest }: { requested: boolean; onRequest: () => void }) {
  return (
    <div className={styles.helpbar}>
      <span className={styles.helpMessage}><i aria-hidden="true">♥</i> A real person can help at any step.</span>
      <span className={styles.helpActions}>
        <span><b>Sofia</b><small>Your family navigator</small></span>
        <button onClick={onRequest}>{requested ? "Help requested ✓" : "Ask Sofia for help"}</button>
      </span>
    </div>
  );
}

function TaskCard({ task, checked, onToggle }: { task: (typeof todayTasks)[number]; checked: boolean; onToggle: () => void }) {
  return (
    <label className={`${styles.taskCard} ${checked ? styles.taskDone : ""}`}>
      <input type="checkbox" checked={checked} onChange={onToggle} />
      <span className={styles.checkmark} aria-hidden="true">{checked ? "✓" : ""}</span>
      <span className={styles.taskCopy}>
        <strong>{task.title}</strong>
        <small>{task.detail}</small>
        <span><b>{task.owner}</b><em>{task.tag}</em></span>
      </span>
    </label>
  );
}

function PathView({ doneTasks, toggleTask, onOpenBoard }: { doneTasks: Set<string>; toggleTask: (id: string) => void; onOpenBoard: () => void }) {
  const taskCount = todayTasks.length + weekTasks.length;
  const finishedCount = [...todayTasks, ...weekTasks].filter((task) => doneTasks.has(task.id)).length;

  return (
    <>
      <section className={styles.pathHero}>
        <div>
          <p className={styles.eyebrow}>The Martinez family · Day 12</p>
          <h1>A clear path from <em>here</em> to home.</h1>
          <p className={styles.lede}>One stage at a time. You’ll always know what is next, why it matters, and who can help.</p>
        </div>
        <div className={styles.heroStatus}>
          <span className={styles.progressRing}><b>42%</b><small>to move-in ready</small></span>
          <span><b>Stage 3 of 6</b><small>Income plan</small></span>
        </div>
      </section>

      <section className={styles.phaseSection} aria-labelledby="route-heading">
        <div className={styles.sectionIntro}>
          <div><p className={styles.eyebrow}>Your route</p><h2 id="route-heading">Six stages. No guessing.</h2></div>
          <p>Stages can overlap when life requires it. Your navigator keeps the sequence understandable and adapts it with you.</p>
        </div>
        <ol className={styles.phaseRail}>
          {phases.map((phase) => (
            <li className={styles[phase.state]} key={phase.number}>
              <span className={styles.phaseDot}>{phase.state === "done" ? "✓" : phase.number}</span>
              <span><b>{phase.title}</b><small>{phase.note}</small></span>
              {phase.state === "current" ? <em>We are here</em> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.actionLayout}>
        <div>
          <div className={styles.actionHeading}>
            <div><p className={styles.eyebrow}>Stage 03 · Income plan</p><h2>Your next few steps</h2></div>
            <span>{finishedCount} of {taskCount} complete</span>
          </div>
          <div className={styles.timeGroup}>
            <div className={styles.timeLabel}><b>Today</b><small>Keep it focused</small></div>
            <div className={styles.taskList}>{todayTasks.map((task) => <TaskCard key={task.id} task={task} checked={doneTasks.has(task.id)} onToggle={() => toggleTask(task.id)} />)}</div>
          </div>
          <div className={styles.timeGroup}>
            <div className={styles.timeLabel}><b>This week</b><small>Build momentum</small></div>
            <div className={styles.taskList}>{weekTasks.map((task) => <TaskCard key={task.id} task={task} checked={doneTasks.has(task.id)} onToggle={() => toggleTask(task.id)} />)}</div>
          </div>
        </div>
        <aside className={styles.contextPanel}>
          <span className={styles.contextIcon} aria-hidden="true">i</span>
          <p className={styles.eyebrow}>Why this stage matters</p>
          <h3>Housing is easier to keep when the work plan fits the whole family.</h3>
          <p>We are matching income, childcare, transportation, and rent before asking the family to commit to a home.</p>
          <div className={styles.sharedUpdate}><span aria-hidden="true">✓</span><p><b>Shared with Sofia</b><small>Schedule constraint: school pickup at 3:15</small></p></div>
          <button className={styles.textButton} onClick={onOpenBoard}>Preview the post-move stability board →</button>
        </aside>
      </section>

      <section className={styles.handoffBanner}>
        <span className={styles.handoffNumber}>06</span>
        <div><p className={styles.eyebrow}>The handoff that matters</p><h2>Moving out is not the end of the plan.</h2><p>On move-in day, the route becomes a family-owned 8×8 stability board for the next twelve months.</p></div>
        <button onClick={onOpenBoard}>See the stability board <span>→</span></button>
      </section>
    </>
  );
}

function StabilityView({ completeActions, toggleAction }: { completeActions: Set<string>; toggleAction: (id: string) => void }) {
  const [selectedId, setSelectedId] = useState("income");
  const selected = pillars.find((pillar) => pillar.id === selectedId) ?? pillars[0];
  const selectedDone = selected.actions.filter((_, index) => completeActions.has(`${selected.id}-${index}`)).length;

  const boardItems = useMemo(() => [pillars[0], pillars[1], pillars[2], pillars[3], null, pillars[4], pillars[5], pillars[6], pillars[7]], []);

  return (
    <>
      <section className={styles.boardHero}>
        <div><p className={styles.eyebrow}>Stage 06 · Begins at move-in</p><h1>A plan to stay <em>home.</em></h1><p className={styles.lede}>The family chooses one shared goal, eight stability areas, and eight concrete actions in each. Sofia can see accepted progress—not private reflections.</p></div>
        <div className={styles.boardScore}><b>{completeActions.size}<span>/64</span></b><small>stability actions underway</small><div><span style={{ width: `${(completeActions.size / 64) * 100}%` }} /></div></div>
      </section>

      <section className={styles.boardLayout}>
        <div className={styles.boardWrap}>
          <div className={styles.boardTopline}><p><b>The Martinez family stability board</b><small>Target review · August 2027</small></p><span>Family-owned plan</span></div>
          <div className={styles.boardGrid}>
            {boardItems.map((pillar, index) => pillar ? (
              <button key={pillar.id} className={`${styles.boardPillar} ${styles[pillar.tone]} ${selectedId === pillar.id ? styles.pillarSelected : ""}`} aria-pressed={selectedId === pillar.id} onClick={() => setSelectedId(pillar.id)}>
                <span>{pillar.number}</span><b>{pillar.title}</b><small>{pillar.actions.filter((_, actionIndex) => completeActions.has(`${pillar.id}-${actionIndex}`)).length}/8 underway</small>
              </button>
            ) : (
              <div className={styles.goalCell} key={`center-${index}`}><span>Our 12-month goal</span><b>Keep our family safely housed, financially steady, and connected.</b><small>Through August 2027</small></div>
            ))}
          </div>
          <div className={styles.guardrails}>
            <article><span>♡</span><p><b>Children feel safe</b><small>Protected · weekly check-in</small></p></article>
            <article><span>◎</span><p><b>Family stays connected</b><small>Protected · Sunday routine</small></p></article>
            <article className={styles.guardrailWatch}><span>✦</span><p><b>Health & recovery</b><small>Watch · sleep is strained</small></p></article>
          </div>
        </div>

        <aside className={styles.pillarDetail} aria-live="polite">
          <div className={styles.pillarDetailHead}><span>{selected.number}</span><p><small>Selected stability area</small><b>{selected.title}</b></p><em>{selectedDone}/8</em></div>
          <p className={styles.pillarPrompt}>{selected.prompt}</p>
          <div className={styles.actionChecklist}>
            {selected.actions.map((action, index) => {
              const actionId = `${selected.id}-${index}`;
              const checked = completeActions.has(actionId);
              return <label key={actionId} className={checked ? styles.actionChecked : ""}><input type="checkbox" checked={checked} onChange={() => toggleAction(actionId)} /><span>{String(index + 1).padStart(2, "0")}</span><b>{action}</b></label>;
            })}
          </div>
        </aside>
      </section>

      <section className={styles.privacyCard}>
        <span aria-hidden="true">◉</span>
        <div><p className={styles.eyebrow}>Support without surveillance</p><h2>The family controls what becomes shared progress.</h2><p>Case managers see completed milestones, accepted plan actions, help requests, and family-approved barriers. Journal entries and private reflections stay private.</p></div>
        <button>Review sharing choices</button>
      </section>
    </>
  );
}

function TeamView({ requested, onRequest }: { requested: boolean; onRequest: () => void }) {
  return (
    <section className={styles.teamPage}>
      <div className={styles.teamIntro}><p className={styles.eyebrow}>People beside your plan</p><h1>Your family is not doing this alone.</h1><p className={styles.lede}>Ask for help, prepare for a meeting, or decide what your support team can see.</p></div>
      <div className={styles.teamGrid}>
        <article className={styles.personCard}><span>SC</span><div><p className={styles.eyebrow}>Family navigator</p><h2>Sofia Chen</h2><p>Coordinates the path, removes barriers, and reviews the family’s stability plan.</p><dl><div><dt>Next meeting</dt><dd>Thursday · 2:30 PM</dd></div><div><dt>Best contact</dt><dd>Message in Promise Path</dd></div></dl><button onClick={onRequest}>{requested ? "Request sent ✓" : "Ask Sofia for help"}</button></div></article>
        <article className={styles.meetingCard}><p className={styles.eyebrow}>Prepare together</p><h2>Thursday’s check-in</h2><ul><li><span>1</span>Confirm the childcare schedule</li><li><span>2</span>Review the take-home income floor</li><li><span>3</span>Choose the next housing search date</li></ul><button>Add a question for Sofia</button></article>
        <article className={styles.sharingCard}><p className={styles.eyebrow}>Your sharing choices</p><h2>You are sharing</h2><label><input aria-label="Share stage and milestone progress" type="checkbox" defaultChecked /><span><b>Stage and milestone progress</b><small>Helps Sofia see where the route is moving.</small></span></label><label><input aria-label="Share accepted stability actions" type="checkbox" defaultChecked /><span><b>Accepted stability actions</b><small>Only actions you add to the board.</small></span></label><label><input aria-label="Share barriers you ask for help with" type="checkbox" defaultChecked /><span><b>Barriers you ask for help with</b><small>Never inferred from private notes.</small></span></label><label><input aria-label="Share personal reflections" type="checkbox" /><span><b>Personal reflections</b><small>Off by default.</small></span></label></article>
      </div>
    </section>
  );
}

function ManagerView({ helpRequested, completeActions }: { helpRequested: boolean; completeActions: Set<string> }) {
  return (
    <main className={styles.managerPage}>
      <section className={styles.managerHero}>
        <div><p className={styles.eyebrow}>Tuesday, August 11</p><h1>Know who needs you <em>next.</em></h1><p>Progress is visible enough to support families early—without turning care into surveillance.</p></div>
        <div className={styles.managerStats}><span><b>6</b><small>active families</small></span><span><b>{helpRequested ? 2 : 1}</b><small>help requests</small></span><span><b>3</b><small>moving this month</small></span></div>
      </section>

      <section className={styles.managerGrid}>
        <article className={styles.familyFocus}>
          <div className={styles.cardTopline}><div><p className={styles.eyebrow}>Next best conversation</p><h2>The Martinez family</h2></div><span className={styles.statusPill}>{helpRequested ? "Help requested" : "On track"}</span></div>
          <div className={styles.familyMeta}><span><b>Stage 03</b><small>Income plan</small></span><span><b>Day 12</b><small>In program</small></span><span><b>{completeActions.size}/64</b><small>Future plan</small></span><span><b>Thu</b><small>Next meeting</small></span></div>
          <div className={styles.managerRail}>{phases.map((phase) => <span key={phase.number} className={styles[phase.state]}><i>{phase.state === "done" ? "✓" : phase.number}</i><small>{phase.title}</small></span>)}</div>
          <div className={styles.signalRow}>
            <span className={styles.signalIcon}>!</span>
            <div><b>Childcare confirmation is blocking the new work schedule.</b><p>Ask whether Jordan wants you to call the provider together. The family shared this barrier yesterday.</p></div>
            <button>Open family plan →</button>
          </div>
        </article>

        <aside className={styles.managerQueue}>
          <div className={styles.cardTopline}><div><p className={styles.eyebrow}>Today</p><h2>Support queue</h2></div><span>4 items</span></div>
          <ol><li><span className={styles.queueUrgent}>JM</span><p><b>Martinez family</b><small>{helpRequested ? "New help request" : "Childcare proof due in 2 days"}</small></p><em>Now</em></li><li><span>RB</span><p><b>Brown family</b><small>Housing application ready to review</small></p><em>9:40</em></li><li><span>AN</span><p><b>Nguyen family</b><small>Move-in checklist at 80%</small></p><em>Yesterday</em></li><li><span>DS</span><p><b>Smith family</b><small>30-day stability check-in</small></p><em>Fri</em></li></ol>
        </aside>

        <article className={styles.caseloadCard}>
          <div className={styles.cardTopline}><div><p className={styles.eyebrow}>Caseload map</p><h2>Families by stage</h2></div><button>View all 6</button></div>
          <div className={styles.stageBars}><div><span>Welcome & safety</span><i><b style={{ width: "18%" }} /></i><em>1</em></div><div><span>Income plan</span><i><b style={{ width: "50%" }} /></i><em>2</em></div><div><span>Housing match</span><i><b style={{ width: "28%" }} /></i><em>1</em></div><div><span>Move-in ready</span><i><b style={{ width: "28%" }} /></i><em>1</em></div><div><span>Stay stable</span><i><b style={{ width: "28%" }} /></i><em>1</em></div></div>
        </article>

        <article className={styles.visibilityCard}>
          <p className={styles.eyebrow}>Family-approved visibility</p><h2>What Sofia sees</h2><ul><li><span>✓</span>Completed route milestones</li><li><span>✓</span>Accepted stability actions</li><li><span>✓</span>Explicit help requests</li><li><span>—</span>Private notes and reflections</li></ul><p>Monitoring is designed around shared commitments and family agency, not passive observation.</p>
        </article>
      </section>
    </main>
  );
}

export function PromisePathBoard() {
  const [role, setRole] = useState<Role>("family");
  const [activeView, setActiveView] = useState<View>("path");
  const [doneTasks, setDoneTasks] = useState<Set<string>>(new Set(["work-card"]));
  const [completeActions, setCompleteActions] = useState<Set<string>>(new Set(initialCompleted));
  const [helpRequested, setHelpRequested] = useState(false);

  const toggleSetItem = (setter: React.Dispatch<React.SetStateAction<Set<string>>>, id: string) => setter((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  return (
    <div className={styles.app}>
      <AppHeader role={role} setRole={setRole} activeView={activeView} setActiveView={setActiveView} />
      {role === "family" ? (
        <>
          <HelpBar requested={helpRequested} onRequest={() => setHelpRequested(true)} />
          <main className={styles.main}>
            {activeView === "path" ? <PathView doneTasks={doneTasks} toggleTask={(id) => toggleSetItem(setDoneTasks, id)} onOpenBoard={() => setActiveView("stability")} /> : null}
            {activeView === "stability" ? <StabilityView completeActions={completeActions} toggleAction={(id) => toggleSetItem(setCompleteActions, id)} /> : null}
            {activeView === "team" ? <TeamView requested={helpRequested} onRequest={() => setHelpRequested(true)} /> : null}
          </main>
          <nav className={styles.mobileNav} aria-label="Family plan mobile navigation"><button className={activeView === "path" ? styles.navActive : ""} onClick={() => setActiveView("path")}><span>↗</span>My path</button><button className={activeView === "stability" ? styles.navActive : ""} onClick={() => setActiveView("stability")}><span>▦</span>Stability</button><button className={activeView === "team" ? styles.navActive : ""} onClick={() => setActiveView("team")}><span>♡</span>My team</button></nav>
        </>
      ) : <ManagerView helpRequested={helpRequested} completeActions={completeActions} />}
      <footer className={styles.footer}><span><b>Promise Path</b> · A concept for Family Promise of Las Vegas</span><span>Family-owned · Trauma-informed · Case-manager supported</span></footer>
    </div>
  );
}
