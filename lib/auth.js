import crypto from "crypto";

const PASSWORD = process.env.ADMIN_PASSWORD || "lewis2026";

export function sessionToken() {
  return crypto.createHash("sha256").update(`llc-session:${PASSWORD}`).digest("hex");
}

export function checkPassword(pw) {
  return typeof pw === "string" && pw === PASSWORD;
}

export function isAuthed(request) {
  const cookie = request.cookies.get("llc_admin");
  return cookie?.value === sessionToken();
}
