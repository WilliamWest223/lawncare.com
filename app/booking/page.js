import BookingForm from "@/components/BookingForm";

export const metadata = { title: "Book a Visit — Lewis Lawn Care" };

export default function BookingPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Book online</span>
          <h1 className="display-lg" style={{ margin: "14px 0 16px" }}>
            Pick a day. We&apos;ll bring<br />the <span className="italic-accent">mowers</span>.
          </h1>
          <p className="lede">
            Live availability — if a slot shows, it&apos;s yours. Booked slots disappear
            automatically so we never double-book your street.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <BookingForm />
        </div>
      </section>
    </main>
  );
}
