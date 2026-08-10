"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import styles from "./yardVision.module.css";

type Answers = {
  area: string;
  zip: string;
  goal: string;
  style: string;
  features: string[];
  budget: string;
  timing: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const initialAnswers: Answers = {
  area: "",
  zip: "",
  goal: "",
  style: "",
  features: [],
  budget: "",
  timing: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const steps = ["Space", "Vision", "Features", "Details", "Review"];

const areaOptions = [
  { value: "Backyard", label: "Backyard", note: "A private space to relax and gather", art: "backyard" },
  { value: "Front yard", label: "Front yard", note: "Curb appeal that feels like home", art: "frontyard" },
  { value: "Front + backyard", label: "Both spaces", note: "A cohesive whole-property plan", art: "both" },
];

const goals = [
  ["Outdoor living", "More reasons to spend time outside"],
  ["Low maintenance", "A great yard without another chore"],
  ["Curb appeal", "A stronger first impression"],
  ["Kid + pet friendly", "Durable, comfortable and safe"],
  ["Water smart", "Beautiful choices for the desert"],
  ["Something else", "Start with your own idea"],
];

const styleOptions = [
  ["Desert modern", "Clean lines · native texture", "desert"],
  ["Resort retreat", "Lush layers · quiet luxury", "resort"],
  ["Warm + natural", "Soft edges · earthy materials", "natural"],
  ["Not sure yet", "Let the designer guide me", "unsure"],
];

const featureOptions = [
  "Artificial turf",
  "Pavers + patios",
  "Desert planting",
  "Landscape lighting",
  "Fire pit",
  "Putting green",
  "Irrigation",
  "Dog run",
  "Retaining wall",
  "Water feature",
  "Outdoor kitchen",
  "Shade structure",
];

const budgetOptions = ["Under $10k", "$10k–$25k", "$25k–$50k", "$50k+"];
const timingOptions = ["As soon as possible", "1–3 months", "3–6 months", "Just exploring"];

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return <span aria-hidden="true">{direction === "left" ? "←" : "→"}</span>;
}

export function YardVisionForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [files, setFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  const toggleFeature = (feature: string) => {
    setAnswers((current) => ({
      ...current,
      features: current.features.includes(feature)
        ? current.features.filter((item) => item !== feature)
        : [...current.features, feature],
    }));
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []).slice(0, 5);
    setFiles(selected.map((file) => file.name));
  };

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(answers.area && answers.zip.trim().length >= 5);
    if (step === 1) return Boolean(answers.goal && answers.style);
    if (step === 2) return answers.features.length > 0;
    if (step === 3) {
      return Boolean(
        answers.budget &&
          answers.timing &&
          answers.name.trim() &&
          answers.email.includes("@") &&
          answers.phone.trim(),
      );
    }
    return true;
  }, [answers, step]);

  const projectText = useMemo(() => {
    const featureList = answers.features.join(", ");
    return `Hi Ed — I created a Yard Vision brief for a ${answers.area.toLowerCase()} project in ${answers.zip}. My main goal is ${answers.goal.toLowerCase()}, with a ${answers.style.toLowerCase()} direction. Features: ${featureList}. Budget: ${answers.budget}. Timing: ${answers.timing}.`;
  }, [answers]);

  const onNext = () => {
    if (!canContinue) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < steps.length - 1) {
      onNext();
      return;
    }
    setSubmitted(true);
  };

  const restart = () => {
    setAnswers(initialAnswers);
    setFiles([]);
    setStep(0);
    setSubmitted(false);
  };

  return (
    <main className={styles.page}>
      <aside className={styles.brandPanel}>
        <a className={styles.brand} href="https://www.showreadylandscape.biz/" target="_blank" rel="noreferrer">
          <span className={styles.brandMark}>SR</span>
          <span>
            <strong>SHOW READY</strong>
            <small>LANDSCAPE · LAS VEGAS</small>
          </span>
        </a>

        <div className={styles.brandCopy}>
          <p className={styles.kicker}>Yard Vision Builder</p>
          <h1>Plan a yard you’ll actually use.</h1>
          <p>
            Share your space, style and must-haves. We’ll turn them into a focused brief for a free on-site conversation.
          </p>
        </div>

        <div className={styles.landscapeArt} aria-hidden="true">
          <span className={styles.sun} />
          <span className={styles.path} />
          <span className={styles.plantOne}>✦</span>
          <span className={styles.plantTwo}>✦</span>
          <span className={styles.plantThree}>✦</span>
          <span className={styles.plotLabel}>YOUR SPACE</span>
        </div>

        <div className={styles.ownerNote}>
          <span className={styles.ownerAvatar}>EW</span>
          <span>
            <small>Your project goes to</small>
            <strong>Ed Whitesell · Owner</strong>
          </span>
          <a href="tel:+17028079788" aria-label="Call Ed at 702-807-9788">↗</a>
        </div>
      </aside>

      <section className={styles.formPanel}>
        <div className={styles.formShell}>
          <header className={styles.mobileBrand}>
            <span className={styles.brandMark}>SR</span>
            <span><strong>SHOW READY</strong><small>LANDSCAPE · LAS VEGAS</small></span>
          </header>

          {!submitted && (
            <div className={styles.progressWrap}>
              <div className={styles.progressMeta}>
                <span>PROJECT BRIEF</span>
                <strong>{String(step + 1).padStart(2, "0")} / 05</strong>
              </div>
              <div className={styles.progressTrack} aria-label={`Step ${step + 1} of ${steps.length}`}>
                {steps.map((item, index) => (
                  <span
                    className={index <= step ? styles.progressActive : ""}
                    key={item}
                    title={item}
                  />
                ))}
              </div>
            </div>
          )}

          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successSeal}>✓</div>
              <p className={styles.stepLabel}>BRIEF READY</p>
              <h2>Your yard has a starting point.</h2>
              <p className={styles.intro}>
                Here’s the clean project summary Ed would receive. In a live version, the homeowner’s photos and contact details would arrive with it.
              </p>
              <div className={styles.successCard}>
                <div><small>SPACE</small><strong>{answers.area}</strong></div>
                <div><small>VISION</small><strong>{answers.goal}</strong></div>
                <div><small>STYLE</small><strong>{answers.style}</strong></div>
                <div><small>BUDGET</small><strong>{answers.budget}</strong></div>
                <div className={styles.wide}><small>MUST-HAVES</small><strong>{answers.features.join(" · ")}</strong></div>
              </div>
              <a className={styles.primaryButton} href={`sms:+17028079788?&body=${encodeURIComponent(projectText)}`}>
                Text this brief to Ed <Arrow />
              </a>
              <button className={styles.textButton} type="button" onClick={restart}>Start another yard brief</button>
              <p className={styles.prototypeNote}>Prototype only — no information was submitted.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              {step === 0 && (
                <fieldset className={styles.step}>
                  <legend>
                    <span className={styles.stepLabel}>STEP ONE · THE SPACE</span>
                    <strong>Where should we start?</strong>
                    <small>Choose the part of your property you want to transform.</small>
                  </legend>
                  <div className={styles.areaGrid}>
                    {areaOptions.map((option) => (
                      <label className={`${styles.areaCard} ${answers.area === option.value ? styles.selected : ""}`} key={option.value}>
                        <input type="radio" name="area" value={option.value} checked={answers.area === option.value} onChange={() => setAnswer("area", option.value)} />
                        <span className={`${styles.areaArt} ${styles[option.art]}`} aria-hidden="true"><i /><i /><i /></span>
                        <strong>{option.label}</strong>
                        <small>{option.note}</small>
                        <span className={styles.check}>✓</span>
                      </label>
                    ))}
                  </div>
                  <label className={styles.textField}>
                    <span>PROJECT ZIP CODE</span>
                    <input inputMode="numeric" maxLength={5} placeholder="89135" value={answers.zip} onChange={(event) => setAnswer("zip", event.target.value.replace(/\D/g, ""))} />
                    <small>Show Ready serves homeowners throughout the Las Vegas Valley.</small>
                  </label>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset className={styles.step}>
                  <legend>
                    <span className={styles.stepLabel}>STEP TWO · THE VISION</span>
                    <strong>What should this space do for you?</strong>
                    <small>We’ll use your goal and style to shape the first conversation.</small>
                  </legend>
                  <span className={styles.groupLabel}>PRIMARY GOAL</span>
                  <div className={styles.goalGrid}>
                    {goals.map(([label, note]) => (
                      <label className={`${styles.choiceRow} ${answers.goal === label ? styles.selected : ""}`} key={label}>
                        <input type="radio" name="goal" checked={answers.goal === label} onChange={() => setAnswer("goal", label)} />
                        <span><strong>{label}</strong><small>{note}</small></span>
                        <i>✓</i>
                      </label>
                    ))}
                  </div>
                  <span className={styles.groupLabel}>STYLE DIRECTION</span>
                  <div className={styles.styleGrid}>
                    {styleOptions.map(([label, note, art]) => (
                      <label className={`${styles.styleCard} ${answers.style === label ? styles.selected : ""}`} key={label}>
                        <input type="radio" name="style" checked={answers.style === label} onChange={() => setAnswer("style", label)} />
                        <span className={`${styles.styleArt} ${styles[art]}`} aria-hidden="true"><i /><i /><i /></span>
                        <strong>{label}</strong>
                        <small>{note}</small>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className={styles.step}>
                  <legend>
                    <span className={styles.stepLabel}>STEP THREE · THE WISHLIST</span>
                    <strong>What belongs in your new yard?</strong>
                    <small>Pick as many as you like. This is a starting point, not a commitment.</small>
                  </legend>
                  <div className={styles.featureGrid}>
                    {featureOptions.map((feature, index) => (
                      <label className={`${styles.featureCard} ${answers.features.includes(feature) ? styles.selected : ""}`} key={feature}>
                        <input type="checkbox" checked={answers.features.includes(feature)} onChange={() => toggleFeature(feature)} />
                        <span className={styles.featureNumber}>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{feature}</strong>
                        <span className={styles.plus}>{answers.features.includes(feature) ? "✓" : "+"}</span>
                      </label>
                    ))}
                  </div>
                  <p className={styles.selectionCount}>{answers.features.length || "No"} feature{answers.features.length === 1 ? "" : "s"} selected</p>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset className={styles.step}>
                  <legend>
                    <span className={styles.stepLabel}>STEP FOUR · THE DETAILS</span>
                    <strong>Help us make the visit useful.</strong>
                    <small>A budget range and a few photos let Ed arrive with better ideas.</small>
                  </legend>
                  <span className={styles.groupLabel}>COMFORTABLE INVESTMENT</span>
                  <div className={styles.pillGrid}>
                    {budgetOptions.map((budget) => (
                      <label className={answers.budget === budget ? styles.selected : ""} key={budget}>
                        <input type="radio" name="budget" checked={answers.budget === budget} onChange={() => setAnswer("budget", budget)} />
                        <span>{budget}</span>
                      </label>
                    ))}
                  </div>
                  <span className={styles.groupLabel}>IDEAL TIMING</span>
                  <div className={styles.pillGrid}>
                    {timingOptions.map((timing) => (
                      <label className={answers.timing === timing ? styles.selected : ""} key={timing}>
                        <input type="radio" name="timing" checked={answers.timing === timing} onChange={() => setAnswer("timing", timing)} />
                        <span>{timing}</span>
                      </label>
                    ))}
                  </div>
                  <label className={styles.uploadBox}>
                    <input type="file" accept="image/*" multiple onChange={handleFiles} />
                    <span className={styles.uploadIcon}>＋</span>
                    <span><strong>{files.length ? `${files.length} photo${files.length === 1 ? "" : "s"} ready` : "Add a few yard photos"}</strong><small>{files.length ? files.join(" · ") : "JPG or PNG · up to 5 photos"}</small></span>
                  </label>
                  <div className={styles.contactGrid}>
                    <label className={styles.textField}><span>NAME</span><input autoComplete="name" placeholder="Your name" value={answers.name} onChange={(event) => setAnswer("name", event.target.value)} /></label>
                    <label className={styles.textField}><span>PHONE</span><input autoComplete="tel" inputMode="tel" placeholder="(702) 555-0123" value={answers.phone} onChange={(event) => setAnswer("phone", event.target.value)} /></label>
                    <label className={`${styles.textField} ${styles.fullField}`}><span>EMAIL</span><input autoComplete="email" inputMode="email" placeholder="you@example.com" value={answers.email} onChange={(event) => setAnswer("email", event.target.value)} /></label>
                    <label className={`${styles.textField} ${styles.fullField}`}><span>ANYTHING ED SHOULD KNOW?</span><textarea placeholder="Shade, access, HOA deadlines, pets, existing issues…" value={answers.notes} onChange={(event) => setAnswer("notes", event.target.value)} /></label>
                  </div>
                </fieldset>
              )}

              {step === 4 && (
                <fieldset className={styles.step}>
                  <legend>
                    <span className={styles.stepLabel}>STEP FIVE · YOUR BRIEF</span>
                    <strong>Here’s the project at a glance.</strong>
                    <small>Review the details before creating your homeowner brief.</small>
                  </legend>
                  <div className={styles.reviewCard}>
                    <div className={styles.reviewTop}>
                      <div><small>PROJECT</small><strong>{answers.area}</strong><span>{answers.zip} · {answers.timing}</span></div>
                      <button type="button" onClick={() => setStep(0)}>Edit</button>
                    </div>
                    <div className={styles.reviewGrid}>
                      <div><small>PRIMARY GOAL</small><strong>{answers.goal}</strong></div>
                      <div><small>STYLE</small><strong>{answers.style}</strong></div>
                      <div><small>INVESTMENT</small><strong>{answers.budget}</strong></div>
                      <div><small>PHOTOS</small><strong>{files.length ? `${files.length} attached` : "Add on consultation"}</strong></div>
                    </div>
                    <div className={styles.reviewFeatures}>
                      <small>WISHLIST</small>
                      <div>{answers.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
                    </div>
                    <div className={styles.reviewContact}>
                      <span className={styles.ownerAvatar}>{answers.name.slice(0, 2).toUpperCase()}</span>
                      <div><strong>{answers.name}</strong><small>{answers.email} · {answers.phone}</small></div>
                    </div>
                  </div>
                  <div className={styles.privacyNote}><span>⌁</span><p><strong>Prototype privacy note</strong>This demo keeps the information in your browser and does not send it anywhere.</p></div>
                </fieldset>
              )}

              <footer className={styles.formActions}>
                {step > 0 ? (
                  <button className={styles.backButton} type="button" onClick={() => setStep((current) => current - 1)}><Arrow direction="left" /> Back</button>
                ) : <span />}
                <button className={styles.primaryButton} type="submit" disabled={!canContinue}>
                  {step === steps.length - 1 ? "Create my yard brief" : "Continue"} <Arrow />
                </button>
              </footer>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
