"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [msg, setMsg] = useState(null);
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setMsg({ ok: true, text: "Message received — we reply within one business day." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="form-grid">
        <div className="field">
          <label>Name *</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Lewis" />
        </div>
        <div className="field">
          <label>Email *</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
        </div>
        <div className="field full">
          <label>Phone</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 555-0134" />
        </div>
        <div className="field full">
          <label>Message *</label>
          <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell us about your yard…" />
        </div>
        <div className="full">
          <button className="btn btn-solid" disabled={sending} style={{ width: "100%", justifyContent: "center" }}>
            {sending ? "Sending…" : "Send message"}
          </button>
        </div>
        {msg && <div className={`form-msg full ${msg.ok ? "ok" : "err"}`}>{msg.text}</div>}
      </div>
    </form>
  );
}
