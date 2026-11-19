import crypto from "crypto";

// No fallback: without ADMIN_PASSWORD set, the admin area refuses every login.
const PASSWORD = process.env.ADMIN_PASSWORD || "";

export function sessionToken() {
  if (!PASSWORD) return null;
  return crypto.createHash("sha256").update(`llc-session:${PASSWORD}`).digest("hex");
}

export function checkPassword(pw) {
  return Boolean(PASSWORD) && typeof pw === "string" && pw === PASSWORD;
}

export function isAuthed(request) {
  const token = sessionToken();
  const cookie = request.cookies.get("llc_admin");
  return Boolean(token) && cookie?.value === token;
}
