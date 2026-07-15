import Link from "next/link";
import Reveal from "@/components/Reveal";
import LawnScene from "@/components/LawnScene";
import BeforeAfter from "@/components/BeforeAfter";
import { SERVICES } from "@/lib/services";

const TESTIMONIALS = [
  { quote: "Our yard went from the worst on the block to the one people slow down to look at. Worth every penny.", name: "Margaret H.", where: "Maple Grove", initials: "MH" },
  { quote: "They show up when they say they will, the crew is polite, and the stripes are ridiculous. Ten out of ten.", name: "Dan & Priya K.", where: "Riverside", initials: "DK" },
  { quote: "The instant quote tool told me the price before I ever picked up the phone. That's how it should work.", name: "Terrence W.", where: "Oak Hill", initials: "TW" },
];

const MARQUEE = "Mowing · Fertilization · Cleanups · Landscape Design · Aeration · Irrigation · ";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-content">
          <span className="eyebrow" data-stagger="1">Family-run since 2009</span>
          <h1 className="display-xl" data-stagger="2">
            Lawns worth<br />
            <span className="outline">lingering</span> on.
          </h1>
          <p className="lede" data-stagger="3">
            Lewis Lawn Care turns tired yards into the best-looking address on the street —
            mowing, feeding, designing, and defending every blade like it&apos;s our own.
          </p>
          <div className="hero-ctas" data-stagger="4">
            <Link href="/quote" className="btn btn-gold">Get an instant quote →</Link>
            <Link href="/booking" className="btn btn-ghost-light">Book a visit</Link>
          </div>
          <div className="hero-stats" data-stagger="5">
            <div><div className="stat-num">1,200+</div><div className="stat-label">Lawns transformed</div></div>
            <div><div className="stat-num">15 yrs</div><div className="stat-label">In business</div></div>
            <div><div className="stat-num">4.9★</div><div className="stat-label">Average rating</div></div>
            <div><div className="stat-num">48 hr</div><div className="stat-label">Quote turnaround</div></div>
          </div>
        </div>
        <svg className="hero-grass" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden>
          <path d="M0,90 L0,60 Q30,20 40,60 Q60,10 70,55 Q90,25 100,60 Q120,5 130,55 Q150,30 160,60 Q180,15 190,55 Q210,28 220,60 Q240,8 250,55 Q270,25 280,60 Q300,12 310,55 Q330,30 340,60 Q360,18 370,55 Q390,26 400,60 Q420,6 430,55 Q450,28 460,60 Q480,14 490,55 Q510,30 520,60 Q540,10 550,55 Q570,24 580,60 Q600,16 610,55 Q630,30 640,60 Q660,8 670,55 Q690,26 700,60 Q720,12 730,55 Q750,28 760,60 Q780,18 790,55 Q810,30 820,60 Q840,6 850,55 Q870,25 880,60 Q900,14 910,55 Q930,28 940,60 Q960,10 970,55 Q990,26 1000,60 Q1020,16 1030,55 Q1050,30 1060,60 Q1080,8 1090,55 Q1110,24 1120,60 Q1140,12 1150,55 Q1170,28 1180,60 Q1200,18 1210,55 Q1230,30 1240,60 Q1260,6 1270,55 Q1290,25 1300,60 Q1320,14 1330,55 Q1350,28 1360,60 Q1380,10 1390,55 Q1410,26 1420,60 L1440,60 L1440,90 Z"
            fill="#0f2b1c" />
        </svg>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          <span>{MARQUEE}<em>Licensed & insured · </em>{MARQUEE}<em>Satisfaction guaranteed · </em></span>
          <span>{MARQUEE}<em>Licensed & insured · </em>{MARQUEE}<em>Satisfaction guaranteed · </em></span>
        </div>
      </div>

      {/* SERVICES */}
      <section className="section">
        <div className="wrap">
          <div className="section-head section-head-row">
            <Reveal>
              <span className="eyebrow">What we do</span>
              <h2 className="display-lg">Every service your<br />yard could ask for<span className="italic-accent">.</span></h2>
            </Reveal>
            <Reveal delay={1}>
              <Link href="/services" className="btn">All services →</Link>
            </Reveal>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i % 3}>
                <div className="service-card" data-index={`0${i + 1}`}>
                  <div className="service-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <div className="service-price">{s.price}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="section section-cream">
        <div className="wrap two-col">
          <Reveal>
            <span className="eyebrow">The Lewis difference</span>
            <h2 className="display-lg" style={{ margin: "16px 0 20px" }}>
              Drag the handle.<br />See the <span className="italic-accent">glow-up</span>.
            </h2>
            <p className="lede" style={{ marginBottom: 26 }}>
              This is a typical eight-week transformation: renovation cut, core aeration,
              overseeding, and our six-step feeding program. No filters, just fertilizer.
            </p>
            <ul style={{ listStyle: "none", display: "grid", gap: 12 }}>
              {["Free on-site assessment within 48 hours", "Fixed pricing — the quote is the invoice", "One dedicated crew for your property, every visit"].map((t) => (
                <li key={t} style={{ display: "flex", gap: 12, fontWeight: 700 }}>
                  <span style={{ color: "var(--gold)" }}>✦</span>{t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={1}>
            <BeforeAfter />
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section-dark">
        <div className="wrap">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow" style={{ color: "var(--gold-soft)" }}>How it works</span>
              <h2 className="display-lg">From overgrown to<br />outstanding in four steps</h2>
            </Reveal>
          </div>
          <div className="process-grid">
            {[
              ["Tell us about your yard", "Use the instant quote tool — lawn size, services, done. A real price in seconds."],
              ["We walk the property", "A crew lead confirms the quote on-site within 48 hours. No surprises later."],
              ["Your crew gets to work", "The same dedicated team, on the same day each week, with a checklist for your property."],
              ["You enjoy the view", "Photo updates after every visit and a satisfaction guarantee on all of it."],
            ].map(([h, p], i) => (
              <Reveal key={h} delay={i % 4 === 3 ? 3 : i % 4}>
                <div className="process-step">
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="section">
        <div className="wrap">
          <div className="section-head section-head-row">
            <Reveal>
              <span className="eyebrow">Recent work</span>
              <h2 className="display-lg">Proof, planted<span className="italic-accent"> weekly</span></h2>
            </Reveal>
            <Reveal delay={1}>
              <Link href="/gallery" className="btn">Full gallery →</Link>
            </Reveal>
          </div>
          <div className="gallery-grid">
            {[
              ["lush", "Full renovation · Maple Grove", "Mowing + fert program, 12 weeks"],
              ["golden", "New beds & borders · Riverside", "Landscape design install"],
              ["dusk", "Estate maintenance · Oak Hill", "Weekly full-service care"],
            ].map(([variant, title, sub], i) => (
              <Reveal key={title} delay={i}>
                <figure className="gallery-card">
                  <LawnScene variant={variant} />
                  <figcaption>{title}<small>{sub}</small></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section-dark">
        <div className="wrap">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow" style={{ color: "var(--gold-soft)" }}>Word of mouth</span>
              <h2 className="display-lg">The neighbors have<br />opinions<span className="italic-accent">. Good ones.</span></h2>
            </Reveal>
          </div>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i}>
                <div className="testimonial">
                  <div className="testimonial-stars">★★★★★</div>
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                  <div className="testimonial-who">
                    <div className="testimonial-avatar">{t.initials}</div>
                    <div><strong>{t.name}</strong><small>{t.where}</small></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="wrap">
          <Reveal>
            <h2>Your lawn is one quote away from its best season ever.</h2>
          </Reveal>
          <Reveal delay={1}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/quote" className="btn btn-solid">Get my instant quote</Link>
              <Link href="/booking" className="btn">Book a visit</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
