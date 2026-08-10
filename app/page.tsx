const PHONE_DISPLAY = "(818) 808-7830";
const PHONE_LINK = "tel:+18188087830";
const TEXT_LINK =
  "sms:+18188087830?body=Hi%20Rudy%2C%20I%27d%20like%20a%20quote%20for%20my%20vehicle.";
const INSTAGRAM_URL = "https://www.instagram.com/dls_mobiledetailing_/";

const services = [
  {
    number: "01",
    title: "Paint correction",
    copy: "Reduce swirls and paint defects to bring back clarity, depth, and a clean reflective finish.",
  },
  {
    number: "02",
    title: "Ceramic coating",
    copy: "Add a durable, high-gloss layer of protection that helps your finish stay easier to maintain.",
  },
  {
    number: "03",
    title: "Headlight restoration",
    copy: "Clear up cloudy, oxidized lenses for a sharper front end and cleaner light output.",
  },
  {
    number: "04",
    title: "Engine bay cleaning",
    copy: "Careful cleaning and detailing for a better-kept engine compartment from edge to edge.",
  },
  {
    number: "05",
    title: "Cutting",
    copy: "Targeted machine correction for paint that needs more than a standard wash and wax.",
  },
  {
    number: "06",
    title: "Polishing",
    copy: "Refine gloss and smooth out the finish for paint that looks deeper, cleaner, and brighter.",
  },
];

const gallery = [
  {
    src: "/dls/work-rolls.jpg",
    alt: "Black Rolls-Royce with a freshly detailed reflective finish",
    label: "Gloss, restored",
    className: "gallery-wide",
  },
  {
    src: "/dls/work-porsche.jpg",
    alt: "Blue Porsche after exterior detailing",
    label: "Paint, dialed in",
    className: "gallery-square",
  },
  {
    src: "/dls/work-wash.jpg",
    alt: "Black Porsche covered in foam during a mobile detail",
    label: "Care in progress",
    className: "gallery-square",
  },
  {
    src: "/dls/work-ferrari.jpg",
    alt: "Close detail of a polished red Ferrari badge",
    label: "Every detail counts",
    className: "gallery-tall",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="DLS Mobile Detailing home">
          <img src="/dls/logo.jpg" alt="" />
          <span>
            <strong>DLS</strong>
            <small>Mobile Detailing</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#work">Recent work</a>
          <a href="#process">How it works</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="button button-small" href={TEXT_LINK}>
          Get a quote <Arrow />
        </a>
      </header>

      <section className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> San Fernando Valley · Mobile detailing</p>
          <h1>
            Precision detailing, <em>delivered.</em>
          </h1>
          <p className="hero-lede">
            From paint correction and polishing to ceramic coatings and the details most shops skip, DLS brings hands-on care straight to your driveway.
          </p>
          <div className="hero-actions">
            <a className="button" href={TEXT_LINK}>
              Text Rudy for a quote <Arrow />
            </a>
            <a className="text-link" href={PHONE_LINK}>
              Call {PHONE_DISPLAY}
            </a>
          </div>
          <div className="hero-proof" aria-label="Service highlights">
            <span><b>01</b> We come to you</span>
            <span><b>02</b> One-on-one service</span>
            <span><b>03</b> Built around your vehicle</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img
              src="/dls/hero-rolls.jpg"
              alt="White Rolls-Royce after a mobile detail by DLS"
            />
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <span>SFV</span>
            <small>Mobile service</small>
          </div>
          <div className="hero-caption">
            <span>Real work. Real vehicles.</span>
            <span>By appointment</span>
          </div>
        </div>
      </section>

      <div className="statement-band">
        <p>
          Your car does not need another rushed wash. It needs the right attention, in the right places, from someone who cares how it leaves.
        </p>
      </div>

      <section className="services section-light" id="services">
        <div className="section-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="section-kicker">Services</p>
              <h2>The right finish starts with the right process.</h2>
            </div>
            <p>
              Every vehicle is different. Tell us what you are driving, what you want to improve, and where you are located. We will recommend the right service and scope.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <span className="service-number">{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <span className="service-plus" aria-hidden="true">+</span>
              </article>
            ))}
          </div>

          <div className="service-cta">
            <p>Not sure what your paint needs?</p>
            <a href={TEXT_LINK}>Send a photo and ask Rudy <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-heading work-heading">
          <div>
            <p className="section-kicker">Recent work</p>
            <h2>Proof lives in the reflection.</h2>
          </div>
          <a className="text-link light-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Follow the work on Instagram <Arrow />
          </a>
        </div>

        <div className="gallery-grid">
          {gallery.map((image) => (
            <figure className={`gallery-card ${image.className}`} key={image.src}>
              <img src={image.src} alt={image.alt} />
              <figcaption>
                <span>{image.label}</span>
                <span>DLS Mobile Detailing</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="process section-light" id="process">
        <div className="section-shell process-layout">
          <div className="process-intro">
            <p className="section-kicker">How it works</p>
            <h2>Simple to book. Personal from start to finish.</h2>
            <p>
              No confusing package maze. Start with your vehicle and your goal, then get a clear recommendation for the work that makes sense.
            </p>
            <a className="button dark-button" href={TEXT_LINK}>
              Start with a text <Arrow />
            </a>
          </div>

          <ol className="process-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Send the details</h3>
                <p>Text your vehicle, your location, what you want addressed, and a few photos if you have them.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Confirm the scope</h3>
                <p>Rudy will recommend the right approach, answer your questions, and coordinate the appointment.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>We come to you</h3>
                <p>DLS brings the detail to your location in the San Fernando Valley and handles the work with care.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="about section-shell">
        <div className="about-card">
          <div className="about-logo">
            <img src="/dls/logo.jpg" alt="DLS Mobile Detailing logo" />
          </div>
          <div className="about-copy">
            <p className="section-kicker">Meet DLS</p>
            <h2>Owner-led. Detail-obsessed.</h2>
            <p>
              DLS Mobile Detailing is Rudy De Los Santos&apos;s hands-on mobile detailing service for the San Fernando Valley. You get a direct conversation, a recommendation built around your car, and care that shows in the final finish.
            </p>
            <div className="about-links">
              <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@dls_mobiledetailing_</a>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta" id="contact">
        <div className="section-shell final-cta-inner">
          <p className="section-kicker">Ready when you are</p>
          <h2>Let&apos;s get your car looking right.</h2>
          <p>Send your vehicle, your location, and what you want to improve. Rudy will take it from there.</p>
          <div className="final-actions">
            <a className="button" href={TEXT_LINK}>Text for a quote <Arrow /></a>
            <a className="button button-outline" href={PHONE_LINK}>Call {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <a className="footer-brand" href="#top">
            <img src="/dls/logo.jpg" alt="" />
            <span><strong>DLS</strong> Mobile Detailing</span>
          </a>
          <p>Mobile detailing across the San Fernando Valley.</p>
          <div className="footer-links">
            <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
          </div>
          <small>© 2026 DLS Mobile Detailing</small>
        </div>
      </footer>

      <div className="mobile-contact-bar">
        <a href={PHONE_LINK}>Call</a>
        <a href={TEXT_LINK}>Text for a quote <Arrow /></a>
      </div>
    </main>
  );
}
