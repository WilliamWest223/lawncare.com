import { NextResponse } from "next/server";
import { insert } from "@/lib/db";

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const entry = await insert("messages", { name, email, phone: phone || "", message });
    return NextResponse.json({ ok: true, id: entry.id });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
