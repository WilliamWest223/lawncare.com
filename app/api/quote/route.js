import { NextResponse } from "next/server";
import { insert } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, lawnSize, services, frequency, estimate } = body;
    if (!name || !email || !lawnSize || !services?.length) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const entry = await insert("quotes", {
      name, email, phone: phone || "", address: address || "",
      lawnSize, services, frequency: frequency || "one-time", estimate,
    });
    return NextResponse.json({ ok: true, id: entry.id, estimate });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
