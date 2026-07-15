"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES, FREQUENCIES, estimateTotal } from "@/lib/services";

export default function QuoteCalculator() {
  const params = useSearchParams();
  const preselect = params.get("service");

  const [lawnSize, setLawnSize] = useState(6000);
  const [selected, setSelected] = useState(
    preselect && SERVICES.some((s) => s.id === preselect) ? [preselect] : ["mowing"]
  );
  const [frequency, setFrequency] = useState("biweekly");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [msg, setMsg] = useState(null);
  const [sending, setSending] = useState(false);

  const estimate = estimateTotal(lawnSize, selected, frequency);

  const toggle = (id) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setMsg(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lawnSize, services: selected, frequency, estimate }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setMsg({ ok: true, text: "Quote locked in! We'll confirm on-site within 48 hours." });
      setForm({ name: "", email: "", phone: "", address: "" });
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="two-col">
      <form className="form-card" onSubmit={submit}>
        <div className="field" style={{ marginBottom: 24 }}>
          <label>Lawn size — {lawnSize.toLocaleString()} sq ft</label>
          <input
            type="range" min="1000" max="40000" step="500"
            value={lawnSize}
            onChange={(e) => setLawnSize(Number(e.target.value))}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.6 }}>
            <span>Small city lot</span><span>Estate</span>
          </div>
        </div>

        <div className="field" style={{ marginBottom: 24 }}>
          <label>Services</label>
          <div className="chips">
            {SERVICES.map((s) => (
              <button
                type="button" key={s.id}
                className={`chip ${selected.includes(s.id) ? "active" : ""}`}
                onClick={() => toggle(s.id)}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="field" style={{ marginBottom: 28 }}>
          <label>Frequency</label>
          <div className="chips">
            {FREQUENCIES.map((f) => (
              <button
                type="button" key={f.id}
                className={`chip ${frequency === f.id ? "active" : ""}`}
                onClick={() => setFrequency(f.id)}
              >
                {f.label}{f.multiplier < 1 ? ` · save ${Math.round((1 - f.multiplier) * 100)}%` : ""}
              </button>
            ))}
          </div>
        </div>

        <div className="form-grid">
          <div className="field">
            <label>Name *</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Lewis" />
          </div>
          <div className="field">
            <label>Email *</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
          </div>
          <div className="field">
            <label>Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 555-0134" />
          </div>
          <div className="field">
            <label>Address</label>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="123 Green St" />
          </div>
          <div className="full">
            <button className="btn btn-solid" disabled={sending || selected.length === 0} style={{ width: "100%", justifyContent: "center" }}>
              {sending ? "Sending…" : `Lock in my $${estimate} quote`}
            </button>
          </div>
          {msg && <div className={`form-msg full ${msg.ok ? "ok" : "err"}`}>{msg.text}</div>}
        </div>
      </form>

      <aside className="estimate-panel">
        <div className="kpi-label" style={{ marginBottom: 10 }}>Your estimate</div>
        <div className="estimate-num">${estimate}</div>
        <div style={{ opacity: 0.7, fontSize: 14, margin: "6px 0 22px" }}>
          per {frequency === "one-time" ? "job" : "visit"} · confirmed on-site, never higher
        </div>
        {selected.map((id) => {
          const s = SERVICES.find((x) => x.id === id);
          return (
            <div className="estimate-row" key={id}>
              <span>{s.name}</span>
              <span>${Math.round(s.base + s.perSqft * lawnSize)}</span>
            </div>
          );
        })}
        {frequency !== "one-time" && (
          <div className="estimate-row" style={{ color: "var(--gold)" }}>
            <span>Recurring discount</span>
            <span>−{Math.round((1 - FREQUENCIES.find((f) => f.id === frequency).multiplier) * 100)}%</span>
          </div>
        )}
        <p style={{ fontSize: 13, opacity: 0.6, marginTop: 22 }}>
          Estimates are based on lawn size averages. A crew lead confirms every quote
          in person — if anything changes, it changes down, not up.
        </p>
      </aside>
    </div>
  );
}
