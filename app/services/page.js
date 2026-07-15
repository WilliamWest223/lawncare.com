import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/services";

export const metadata = { title: "Services — Lewis Lawn Care" };

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Services</span>
          <h1 className="display-lg" style={{ margin: "14px 0 16px" }}>
            One crew. Every job<br />your yard will ever need<span className="italic-accent">.</span>
          </h1>
          <p className="lede">
            Pick one service or bundle them — recurring customers save up to 15% and always
            get the same dedicated crew.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
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
                  <div style={{ marginTop: 20 }}>
                    <Link href={`/quote?service=${s.id}`} className="btn" style={{ padding: "10px 20px", fontSize: 13.5 }}>
                      Price this →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Not sure what your yard needs? We&apos;ll tell you for free.</h2>
          <Link href="/booking" className="btn btn-solid">Book a free assessment</Link>
        </div>
      </section>
    </main>
  );
}
