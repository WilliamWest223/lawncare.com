"use client";

import { useEffect, useState } from "react";
import { SERVICES } from "@/lib/services";

const TABS = [
  { id: "quotes", label: "Quote requests" },
  { id: "bookings", label: "Bookings" },
  { id: "messages", label: "Messages" },
];

const STATUS_OPTIONS = {
  quotes: ["new", "contacted", "done"],
  bookings: ["new", "confirmed", "completed", "cancelled"],
  messages: ["new", "contacted", "done"],
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [data, setData] = useState({ quotes: [], bookings: [], messages: [] });
  const [tab, setTab] = useState("quotes");

  const load = async () => {
    const res = await fetch("/api/admin/data");
    if (res.ok) {
      setData(await res.json());
      setAuthed(true);
    }
    setChecked(true);
  };

  useEffect(() => { load(); }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoginErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      load();
    } else {
      setLoginErr("Wrong password.");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
  };

  const setStatus = async (collection, id, status) => {
    await fetch("/api/admin/data", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection, id, status }),
    });
    load();
  };

  if (!checked) return <main className="admin-shell"><div className="wrap">Loading…</div></main>;

  if (!authed) {
    return (
      <main className="admin-shell">
        <div className="wrap">
          <form className="form-card login-card" onSubmit={login}>
            <span className="eyebrow">Owner login</span>
            <h1 className="display-md" style={{ margin: "12px 0 22px" }}>Lewis HQ</h1>
            <div className="field" style={{ marginBottom: 16 }}>
              <label>Password</label>
              <input
                type="password" value={password} autoFocus
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            {loginErr && <div className="form-msg err" style={{ marginBottom: 16 }}>{loginErr}</div>}
            <button className="btn btn-solid" style={{ width: "100%", justifyContent: "center" }}>
              Sign in
            </button>
            <p style={{ fontSize: 13, opacity: 0.55, marginTop: 16 }}>
              Default password: <code>lewis2026</code> — change it in <code>.env.local</code>.
            </p>
          </form>
        </div>
      </main>
    );
  }

  const pipeline = data.quotes.reduce((sum, q) => sum + (Number(q.estimate) || 0), 0);
  const rows = data[tab] || [];

  return (
    <main className="admin-shell">
      <div className="wrap">
        <div className="section-head-row">
          <div>
            <span className="eyebrow">Lewis HQ</span>
            <h1 className="display-md" style={{ marginTop: 10 }}>Leads &amp; bookings</h1>
          </div>
          <button className="btn" onClick={logout}>Sign out</button>
        </div>

        <div className="kpi-row">
          <div className="kpi"><div className="estimate-num">{data.quotes.length}</div><div className="kpi-label">Quote requests</div></div>
          <div className="kpi"><div className="estimate-num">{data.bookings.length}</div><div className="kpi-label">Bookings</div></div>
          <div className="kpi"><div className="estimate-num">{data.messages.length}</div><div className="kpi-label">Messages</div></div>
          <div className="kpi"><div className="estimate-num">${pipeline.toLocaleString()}</div><div className="kpi-label">Quoted pipeline</div></div>
        </div>

        <div className="admin-tabs">
          {TABS.map((t) => (
            <button key={t.id} className={`chip ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              {t.label} ({(data[t.id] || []).length})
            </button>
          ))}
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Contact</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan="4" style={{ textAlign: "center", padding: 40, opacity: 0.6 }}>
                  Nothing here yet — leads will appear as soon as they come in.
                </td></tr>
              )}
              {rows.map((r) => (
                <tr key={r.id}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {new Date(r.createdAt).toLocaleDateString()}<br />
                    <small style={{ opacity: 0.6 }}>{new Date(r.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
                  </td>
                  <td>
                    <strong>{r.name}</strong><br />
                    <small>{r.email}{r.phone ? ` · ${r.phone}` : ""}</small>
                    {r.address ? <><br /><small style={{ opacity: 0.6 }}>{r.address}</small></> : null}
                  </td>
                  <td>
                    {tab === "quotes" && (
                      <>
                        <strong>${r.estimate}</strong> · {Number(r.lawnSize).toLocaleString()} sq ft · {r.frequency}<br />
                        <small>{(r.services || []).map((id) => SERVICES.find((s) => s.id === id)?.name || id).join(", ")}</small>
                      </>
                    )}
                    {tab === "bookings" && (
                      <>
                        <strong>{r.service}</strong> · {r.date} at {r.timeSlot}
                        {r.notes ? <><br /><small style={{ opacity: 0.7 }}>{r.notes}</small></> : null}
                      </>
                    )}
                    {tab === "messages" && <small>{r.message}</small>}
                  </td>
                  <td>
                    <span className={`badge ${r.status}`}>{r.status}</span>
                    <div style={{ marginTop: 8 }}>
                      <select
                        value={r.status}
                        onChange={(e) => setStatus(tab, r.id, e.target.value)}
                        style={{ fontSize: 13, padding: "5px 8px", borderRadius: 8, border: "1px solid var(--line)" }}
                      >
                        {STATUS_OPTIONS[tab].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
