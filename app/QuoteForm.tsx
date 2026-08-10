"use client";

import { useState, type FormEvent } from "react";

const CLEAN_CITY_SMS = "sms:+17024458839";

const propertyTypes = [
  "HOA / Community",
  "Apartment / Multifamily",
  "Retail / Office",
  "Warehouse / Loading dock",
  "Residential home",
  "Other property",
];

const surfaceOptions = [
  "Sidewalks / walkways",
  "Breezeways / stairs",
  "Driveways / parking",
  "Pavers / patios",
  "Storefront / entry",
  "Loading docks",
  "Dumpster pads",
  "Pool decks",
  "Building exterior",
];

const cadenceOptions = ["One-time cleaning", "Monthly", "Quarterly", "Recurring — recommend it"];
const timingOptions = ["As soon as possible", "Within 2 weeks", "Within 30 days", "Planning ahead"];

type EstimateData = {
  propertyType: string;
  propertyName: string;
  size: string;
  cadence: string;
  timing: string;
  address: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  details: string;
};

const initialData: EstimateData = {
  propertyType: "",
  propertyName: "",
  size: "",
  cadence: "",
  timing: "",
  address: "",
  name: "",
  company: "",
  phone: "",
  email: "",
  details: "",
};

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<EstimateData>(initialData);
  const [surfaces, setSurfaces] = useState<string[]>([]);

  function update(field: keyof EstimateData, value: string) {
    setData((current) => ({ ...current, [field]: value }));
  }

  function toggleSurface(surface: string) {
    setSurfaces((current) =>
      current.includes(surface)
        ? current.filter((item) => item !== surface)
        : [...current, surface],
    );
  }

  const stepReady =
    step === 1
      ? Boolean(data.propertyType && data.propertyName.trim())
      : step === 2
        ? Boolean(surfaces.length && data.cadence && data.timing)
        : Boolean(data.name.trim() && data.phone.trim() && data.address.trim());

  function nextStep() {
    if (stepReady) setStep((current) => Math.min(3, current + 1));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stepReady) return;

    const message = [
      "Hi Clean City, I'd like a free pressure washing estimate.",
      "",
      "PROPERTY",
      `${data.propertyName} — ${data.propertyType}`,
      `Location: ${data.address}`,
      `Company / HOA: ${data.company || "Not provided"}`,
      `Approx. size: ${data.size || "Not sure"}`,
      "",
      "CLEANING SCOPE",
      `Surfaces: ${surfaces.join(", ")}`,
      `Cadence: ${data.cadence}`,
      `Timing: ${data.timing}`,
      `Notes: ${data.details || "None"}`,
      "",
      `Name: ${data.name}`,
      `Callback number: ${data.phone}`,
      `Email: ${data.email || "Not provided"}`,
    ].join("\n");

    window.location.href = `${CLEAN_CITY_SMS}?body=${encodeURIComponent(message)}`;
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="form-progress" aria-label={`Free estimate step ${step} of 3`}>
        <div className="form-progress-copy">
          <span>Free estimate builder</span>
          <strong>Step {step} / 3</strong>
        </div>
        <div className="form-progress-track" aria-hidden="true"><span style={{ width: `${(step / 3) * 100}%` }} /></div>
        <div className="form-step-labels" aria-hidden="true">
          {[[1, "Property"], [2, "Scope"], [3, "Contact"]].map(([number, label]) => (
            <span className={step === number ? "is-active" : step > number ? "is-done" : ""} key={number}>{number}. {label}</span>
          ))}
        </div>
      </div>

      {step === 1 && (
        <section className="form-step" aria-labelledby="property-step-title">
          <div className="form-step-heading">
            <span>01 / Property profile</span>
            <h3 id="property-step-title">What type of property needs cleaning?</h3>
            <p>This gives Clean City the right starting point for access, equipment, and scope.</p>
          </div>

          <fieldset>
            <legend>Property type *</legend>
            <div className="choice-grid property-choice-grid">
              {propertyTypes.map((type) => (
                <label className="radio-card" key={type}>
                  <input checked={data.propertyType === type} name="propertyType" onChange={() => update("propertyType", type)} type="radio" value={type} />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="form-grid">
            <label className="text-field form-wide">
              <span>Property name or short description *</span>
              <input autoComplete="organization" onChange={(event) => update("propertyName", event.target.value)} placeholder="Example: Desert Ridge Apartments or two-story home" value={data.propertyName} />
            </label>
            <label className="text-field form-wide">
              <span>Approximate area or property size</span>
              <input onChange={(event) => update("size", event.target.value)} placeholder="Square footage, number of buildings, or ‘not sure’" value={data.size} />
            </label>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="form-step" aria-labelledby="scope-step-title">
          <div className="form-step-heading">
            <span>02 / Cleaning scope</span>
            <h3 id="scope-step-title">What needs attention?</h3>
            <p>Select every surface that applies, then tell us how often and how soon.</p>
          </div>

          <fieldset>
            <legend>Surfaces to clean *</legend>
            <div className="surface-grid">
              {surfaceOptions.map((surface) => (
                <label className="check-card" key={surface}>
                  <input checked={surfaces.includes(surface)} onChange={() => toggleSurface(surface)} type="checkbox" value={surface} />
                  <span>{surface}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Service cadence *</legend>
            <div className="choice-grid cadence-grid">
              {cadenceOptions.map((cadence) => (
                <label className="radio-card" key={cadence}>
                  <input checked={data.cadence === cadence} name="cadence" onChange={() => update("cadence", cadence)} type="radio" value={cadence} />
                  <span>{cadence}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Preferred timing *</legend>
            <div className="choice-grid timing-grid">
              {timingOptions.map((timing) => (
                <label className="radio-card" key={timing}>
                  <input checked={data.timing === timing} name="timing" onChange={() => update("timing", timing)} type="radio" value={timing} />
                  <span>{timing}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>
      )}

      {step === 3 && (
        <section className="form-step" aria-labelledby="contact-step-title">
          <div className="form-step-heading">
            <span>03 / Location + contact</span>
            <h3 id="contact-step-title">Where should we follow up?</h3>
            <p>Add the service location and best callback details. Your request will open as a ready-to-send text.</p>
          </div>

          <div className="form-grid">
            <label className="text-field"><span>Name *</span><input autoComplete="name" onChange={(event) => update("name", event.target.value)} placeholder="Your name" value={data.name} /></label>
            <label className="text-field"><span>Phone *</span><input autoComplete="tel" inputMode="tel" onChange={(event) => update("phone", event.target.value)} placeholder="(702) 555-0123" type="tel" value={data.phone} /></label>
            <label className="text-field"><span>Company or HOA</span><input autoComplete="organization" onChange={(event) => update("company", event.target.value)} placeholder="Optional" value={data.company} /></label>
            <label className="text-field"><span>Email</span><input autoComplete="email" onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" type="email" value={data.email} /></label>
            <label className="text-field form-wide"><span>Property address, city, or ZIP *</span><input autoComplete="street-address" onChange={(event) => update("address", event.target.value)} placeholder="Service location in the Las Vegas area" value={data.address} /></label>
            <label className="text-field form-wide"><span>Access notes, stains, or anything else</span><textarea onChange={(event) => update("details", event.target.value)} placeholder="Tell us about priority areas, access restrictions, water availability, or ideal service windows." rows={4} value={data.details} /></label>
          </div>

          <div className="quote-summary">
            <span>Estimate request summary</span>
            <dl>
              <div><dt>Property</dt><dd>{data.propertyName} · {data.propertyType}</dd></div>
              <div><dt>Surfaces</dt><dd>{surfaces.join(", ")}</dd></div>
              <div><dt>Cadence</dt><dd>{data.cadence}</dd></div>
              <div><dt>Timing</dt><dd>{data.timing}</dd></div>
            </dl>
          </div>
        </section>
      )}

      <div className="form-submit-row">
        <p>No obligation. Final pricing is confirmed after Clean City reviews the property and cleaning scope.</p>
        <div className="form-nav">
          {step > 1 && <button className="form-back" onClick={() => setStep((current) => current - 1)} type="button">Back</button>}
          {step < 3 ? (
            <button className="button form-button" disabled={!stepReady} onClick={nextStep} type="button">Continue <span aria-hidden="true">→</span></button>
          ) : (
            <button className="button form-button" disabled={!stepReady} type="submit">Review &amp; text request <span aria-hidden="true">↗</span></button>
          )}
        </div>
      </div>
    </form>
  );
}
