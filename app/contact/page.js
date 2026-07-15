import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact — Lewis Lawn Care" };

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Contact</span>
          <h1 className="display-lg" style={{ margin: "14px 0 16px" }}>
            Talk to a human<br />who <span className="italic-accent">mows</span>.
          </h1>
          <p className="lede">
            Questions, custom projects, commercial contracts — send a note and the
            crew lead for your area will get back to you.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap two-col">
          <ContactForm />
          <div>
            <h3 className="display-md" style={{ marginBottom: 18 }}>Prefer the direct route?</h3>
            <div style={{ display: "grid", gap: 20, fontSize: 16.5 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Phone</div>
                <a href="tel:+15555550134" style={{ fontWeight: 700 }}>(555) 555-0134</a>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Email</div>
                <a href="mailto:hello@lewislawncare.com" style={{ fontWeight: 700 }}>hello@lewislawncare.com</a>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Hours</div>
                Monday–Saturday · 7am–6pm
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Service area</div>
                The greater metro area — if you&apos;re within 25 miles, you&apos;re in.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
