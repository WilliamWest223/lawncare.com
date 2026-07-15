import Link from "next/link";
import Reveal from "@/components/Reveal";
import LawnScene from "@/components/LawnScene";
import BeforeAfter from "@/components/BeforeAfter";

export const metadata = { title: "Our Work — Lewis Lawn Care" };

const PROJECTS = [
  ["lush", "Full renovation · Maple Grove", "Mowing + fert program · 12 weeks"],
  ["golden", "New beds & borders · Riverside", "Landscape design install"],
  ["dusk", "Estate maintenance · Oak Hill", "Weekly full-service care"],
  ["golden", "Backyard rebuild · Cedar Park", "Aeration, overseed, irrigation"],
  ["dusk", "Corner-lot cleanup · Elm Street", "Spring cleanup + edging"],
  ["lush", "HOA common areas · The Pines", "Commercial weekly contract"],
];

export default function GalleryPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Our work</span>
          <h1 className="display-lg" style={{ margin: "14px 0 16px" }}>
            We&apos;d rather show<br />than tell<span className="italic-accent">.</span>
          </h1>
          <p className="lede">
            A sample of recent transformations. Drag the slider below to compare a real
            eight-week renovation, start to finish.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="wrap" style={{ maxWidth: 880 }}>
          <Reveal><BeforeAfter /></Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="gallery-grid">
            {PROJECTS.map(([variant, title, sub], i) => (
              <Reveal key={title} delay={i % 3}>
                <figure className="gallery-card">
                  <LawnScene variant={variant} trees={(i % 3) + 1} />
                  <figcaption>{title}<small>{sub}</small></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Want your yard in this gallery?</h2>
          <Link href="/quote" className="btn btn-solid">Start with a quote</Link>
        </div>
      </section>
    </main>
  );
}
