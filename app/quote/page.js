import { Suspense } from "react";
import QuoteCalculator from "@/components/QuoteCalculator";

export const metadata = { title: "Instant Quote — Lewis Lawn Care" };

export default function QuotePage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Instant quote</span>
          <h1 className="display-lg" style={{ margin: "14px 0 16px" }}>
            A real price in<br /><span className="italic-accent">thirty seconds</span>.
          </h1>
          <p className="lede">
            Slide, tap, done. No phone tag, no &ldquo;we&apos;ll get back to you.&rdquo;
            The number you see is the number we confirm.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <Suspense fallback={null}>
            <QuoteCalculator />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
