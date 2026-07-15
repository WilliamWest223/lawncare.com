"use client";

import { useEffect, useState } from "react";
import { SERVICES } from "@/lib/services";

const SLOTS = ["8:00 AM", "9:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "",
    service: "Free assessment", date: "", timeSlot: "", notes: "",
  });
  const [taken, setTaken] = useState([]);
  const [msg, setMsg] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!form.date) return;
    fetch(`/api/booking?date=${form.date}`)
      .then((r) => r.json())
      .then((d) => setTaken(d.taken || []))
      .catch(() => setTaken([]));
  }, [form.date]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.timeSlot) {
      setMsg({ ok: false, text: "Pick a time slot first." });
      return;
    }
    setSending(true);
    setMsg(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setMsg({ ok: true, text: `Booked! See you ${form.date} at ${form.timeSlot}. Confirmation sent to ${form.email}.` });
      setForm({ name: "", email: "", phone: "", address: "", service: "Free assessment", date: "", timeSlot: "", notes: "" });
      setTaken([]);
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="form-card" onSubmit={submit} style={{ maxWidth: 760, margin: "0 auto" }}>
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
          <label>Property address</label>
          <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="123 Green St" />
        </div>
        <div className="field">
          <label>Service *</label>
          <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
            <option>Free assessment</option>
            {SERVICES.map((s) => <option key={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Date *</label>
          <input required type="date" min={minDate()} value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value, timeSlot: "" })} />
        </div>
        {form.date && (
          <div className="field full">
            <label>Time slot *</label>
            <div className="slots">
              {SLOTS.map((slot) => (
                <button
                  type="button" key={slot}
                  disabled={taken.includes(slot)}
                  className={`slot ${form.timeSlot === slot ? "active" : ""}`}
                  onClick={() => setForm({ ...form, timeSlot: slot })}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="field full">
          <label>Anything we should know?</label>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Gate codes, dogs, trouble spots…" />
        </div>
        <div className="full">
          <button className="btn btn-solid" disabled={sending} style={{ width: "100%", justifyContent: "center" }}>
            {sending ? "Booking…" : "Confirm my booking"}
          </button>
        </div>
        {msg && <div className={`form-msg full ${msg.ok ? "ok" : "err"}`}>{msg.text}</div>}
      </div>
    </form>
  );
}
