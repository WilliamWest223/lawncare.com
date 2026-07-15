import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ color: "var(--paper)", marginBottom: 14 }}>
              <span className="brand-mark" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22V10M12 14c0-4 3-7 7-8-1 5-3 7-7 8Zm0-3C12 7 9 4 5 3c1 5 3 7 7 8Z"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Lewis Lawn Care
            </div>
            <p style={{ maxWidth: "34ch", fontSize: 15 }}>
              Family-run lawn care and landscaping. We treat every yard like it has our name on the mailbox.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/services">Services</Link>
            <Link href="/gallery">Our Work</Link>
            <Link href="/quote">Instant Quote</Link>
            <Link href="/booking">Book a Visit</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/contact">Contact</Link>
            <Link href="/admin">Owner Login</Link>
          </div>
          <div>
            <h4>Get in Touch</h4>
            <a href="tel:+15555550134">(555) 555-0134</a>
            <a href="mailto:hello@lewislawncare.com">hello@lewislawncare.com</a>
            <p style={{ fontSize: 14.5, marginTop: 8, opacity: 0.7 }}>
              Mon–Sat · 7am–6pm<br />Serving the greater metro area
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Lewis Lawn Care. All rights reserved.</span>
          <span>Licensed & insured · Satisfaction guaranteed</span>
        </div>
      </div>
    </footer>
  );
}
