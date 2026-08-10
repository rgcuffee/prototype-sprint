import { QuoteForm } from "./QuoteForm";

const PHONE_DISPLAY = "(702) 445-8839";
const PHONE_LINK = "tel:+17024458839";
const TEXT_LINK =
  "sms:+17024458839?body=Hi%20Clean%20City%2C%20I%27d%20like%20a%20free%20pressure%20washing%20estimate.";
const INSTAGRAM_URL = "https://www.instagram.com/cleancitylv/";

const commercialProperties = [
  {
    number: "01",
    title: "HOAs & communities",
    copy: "Sidewalks, community entrances, pool decks, common areas, and high-traffic surfaces kept clean and presentable.",
  },
  {
    number: "02",
    title: "Apartments & multifamily",
    copy: "Breezeways, walkways, stairs, dumpster pads, parking areas, and shared spaces cleaned with residents and access in mind.",
  },
  {
    number: "03",
    title: "Retail, office & hospitality",
    copy: "Storefronts, entries, sidewalks, patios, and guest-facing areas cleaned to support a strong first impression.",
  },
  {
    number: "04",
    title: "Industrial & loading docks",
    copy: "Concrete floors, loading areas, service lanes, and hard-working surfaces cleaned for a safer, sharper operation.",
  },
];

const services = [
  "Concrete & sidewalks",
  "Pavers & patios",
  "Driveways & parking areas",
  "Pool decks",
  "Storefronts & entryways",
  "Loading docks",
  "Dumpster pads",
  "Building exteriors",
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Clean City Property Care home">
          <img className="brand-logo" src="/clean-city/logo.jpg" alt="" />
          <span className="brand-copy">
            <strong><b>Clean</b> City</strong>
            <small>Property Care</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#commercial">Commercial</a>
          <a href="#services">Services</a>
          <a href="#process">How it works</a>
          <a href="#estimate">Free estimate</a>
        </nav>
        <a className="header-phone" href={PHONE_LINK}>
          <span>Call or text</span>
          <strong>{PHONE_DISPLAY}</strong>
        </a>
        <a className="button button-small" href="#estimate">Get a free estimate <Arrow /></a>
      </header>

      <section className="hero">
        <img className="hero-image" src="/clean-city/commercial-floor.jpg" alt="Commercial concrete floor being professionally pressure washed" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="section-shell hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span>Las Vegas</span> Commercial + residential pressure washing</p>
            <h1>Cleaner surfaces.<br /><em>Stronger first impressions.</em></h1>
            <p className="hero-lede">
              Professional pressure washing for commercial properties, HOAs, apartment communities, loading docks, and homes across Las Vegas.
            </p>
            <div className="hero-actions">
              <a className="button" href="#estimate">Build my free estimate <Arrow /></a>
              <a className="button button-ghost" href={TEXT_LINK}>Text Clean City</a>
            </div>
            <div className="hero-trust" aria-label="Clean City service promises">
              <span><i>01</i> Free estimates</span>
              <span><i>02</i> Reliable service</span>
              <span><i>03</i> Commercial ready</span>
            </div>
          </div>

          <aside className="hero-card">
            <img src="/clean-city/logo.jpg" alt="Clean City Property Care — Commercial Pressure Washing Specialists" />
            <p>Serving Las Vegas &amp; North Las Vegas</p>
            <a href={PHONE_LINK}>{PHONE_DISPLAY} <Arrow /></a>
          </aside>
        </div>
      </section>

      <div className="service-ticker" aria-label="Clean City pressure washing services">
        <div>
          <span>HOAs</span><b>•</b><span>Apartment communities</span><b>•</b><span>Commercial properties</span><b>•</b>
          <span>Loading docks</span><b>•</b><span>Residential</span><b>•</b><span>Free estimates</span>
        </div>
      </div>

      <section className="commercial section-shell" id="commercial">
        <div className="section-heading commercial-heading">
          <div>
            <p className="section-kicker">Commercial property care / 01</p>
            <h2>Your property works hard.<br /><em>Keep it looking ready.</em></h2>
          </div>
          <div className="heading-copy">
            <p>From a resident&apos;s morning walk to a customer&apos;s first step through the door, clean exterior surfaces shape how a property feels.</p>
            <p>Clean City handles high-traffic concrete, pavers, walkways, entries, and service areas with a practical plan built around your property.</p>
          </div>
        </div>

        <div className="property-grid">
          {commercialProperties.map((property) => (
            <article className="property-card" key={property.title}>
              <span>{property.number}</span>
              <h3>{property.title}</h3>
              <p>{property.copy}</p>
              <a href="#estimate">Request a site estimate <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-section">
        <div className="proof-image-wrap">
          <img src="/clean-city/industrial-service.jpg" alt="Clean City technician pressure washing an industrial facility" />
          <span>Commercial service in action</span>
        </div>
        <div className="proof-copy">
          <p className="section-kicker">Built for property managers / 02</p>
          <h2>A clear scope.<br />A reliable clean.<br /><em>A better-looking property.</em></h2>
          <ul>
            <li><span>01</span><div><strong>Site-specific planning</strong><p>Share the property type, priority areas, access notes, and preferred timing.</p></div></li>
            <li><span>02</span><div><strong>One-time or recurring</strong><p>Book a focused cleanup or request a maintenance cadence for high-traffic areas.</p></div></li>
            <li><span>03</span><div><strong>Direct communication</strong><p>Get a clear estimate and coordinate the work directly with Clean City.</p></div></li>
          </ul>
          <a className="text-link" href="#estimate">Plan your property estimate <Arrow /></a>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-shell">
          <div className="section-heading services-heading">
            <div>
              <p className="section-kicker">What we clean / 03</p>
              <h2>One crew.<br /><em>Every high-impact surface.</em></h2>
            </div>
            <p>Tell us what is showing wear, buildup, or staining. We will help define the right cleaning scope for the property.</p>
          </div>

          <div className="service-list">
            {services.map((service, index) => (
              <div key={service}><span>{String(index + 1).padStart(2, "0")}</span><strong>{service}</strong><b aria-hidden="true">↗</b></div>
            ))}
          </div>

          <div className="photo-grid">
            <figure className="photo-tall">
              <img src="/clean-city/commercial-exterior.jpg" alt="Commercial exterior being pressure washed" />
              <figcaption>Commercial exteriors</figcaption>
            </figure>
            <figure>
              <img src="/clean-city/pool-deck.jpg" alt="Pool deck pavers being pressure washed" />
              <figcaption>Pool decks &amp; pavers</figcaption>
            </figure>
            <figure>
              <img src="/clean-city/paver-cleaning.jpg" alt="Residential paver driveway being professionally cleaned" />
              <figcaption>Residential driveways</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="residential-band">
        <div className="section-shell residential-inner">
          <div>
            <p className="section-kicker">Residential service / 04</p>
            <h2>Bring back the curb appeal.</h2>
          </div>
          <p>Driveways, sidewalks, pavers, patios, pool decks, and exterior surfaces cleaned with the same detail-minded approach.</p>
          <a className="button button-light" href="#estimate">Get a home estimate <Arrow /></a>
        </div>
      </section>

      <section className="process section-shell" id="process">
        <div className="process-heading">
          <p className="section-kicker">How it works / 05</p>
          <h2>From property details<br /><em>to a clean result.</em></h2>
        </div>
        <ol className="process-steps">
          <li><span>01</span><div><h3>Tell us about the property</h3><p>Choose the property type, surfaces, service cadence, location, and timing.</p></div></li>
          <li><span>02</span><div><h3>Get a clear estimate</h3><p>Clean City reviews the request, confirms the scope, and follows up with next steps.</p></div></li>
          <li><span>03</span><div><h3>Schedule the clean</h3><p>Coordinate access and timing, then let Clean City handle the high-impact surfaces.</p></div></li>
        </ol>
      </section>

      <section className="estimate-section" id="estimate">
        <div className="section-shell estimate-layout">
          <div className="estimate-intro">
            <p className="section-kicker">Free estimate / 06</p>
            <h2>Show us<br />the property.<br /><em>We&apos;ll build the scope.</em></h2>
            <p>Answer a few focused questions so Clean City can respond with a useful estimate, not a generic number.</p>
            <div className="estimate-contact">
              <span>Prefer to talk now?</span>
              <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
              <small>Call or text · Las Vegas, NV</small>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="final-cta">
        <div className="final-image" aria-hidden="true" />
        <div className="section-shell final-inner">
          <p className="section-kicker">Clean City Property Care</p>
          <h2>Make the first<br />impression count.</h2>
          <p>Commercial and residential pressure washing across Las Vegas and North Las Vegas.</p>
          <div>
            <a className="button button-light" href="#estimate">Start a free estimate <Arrow /></a>
            <a className="button button-ghost" href={PHONE_LINK}>Call {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <a className="footer-brand" href="#top"><img src="/clean-city/logo.jpg" alt="" /><span><strong>Clean City</strong><small>Property Care</small></span></a>
          <p>Commercial + residential pressure washing<br />Las Vegas &amp; North Las Vegas</p>
          <div className="footer-links">
            <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram <Arrow /></a>
          </div>
          <small>© 2026 Clean City Property Care</small>
        </div>
      </footer>

      <div className="mobile-contact-bar"><a href={PHONE_LINK}>Call</a><a href="#estimate">Free estimate <Arrow /></a></div>
    </main>
  );
}
