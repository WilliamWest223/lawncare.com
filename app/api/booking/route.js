import { NextResponse } from "next/server";
import { insert, readAll } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, service, date, timeSlot, notes } = body;
    if (!name || !email || !service || !date || !timeSlot) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const existing = await readAll("bookings");
    const clash = existing.find(
      (b) => b.date === date && b.timeSlot === timeSlot && b.status !== "cancelled"
    );
    if (clash) {
      return NextResponse.json(
        { error: "That time slot is already booked. Please pick another." },
        { status: 409 }
      );
    }
    const entry = await insert("bookings", {
      name, email, phone: phone || "", address: address || "",
      service, date, timeSlot, notes: notes || "",
    });
    return NextResponse.json({ ok: true, id: entry.id });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  if (!date) return NextResponse.json({ taken: [] });
  const existing = await readAll("bookings");
  const taken = existing
    .filter((b) => b.date === date && b.status !== "cancelled")
    .map((b) => b.timeSlot);
  return NextResponse.json({ taken });
}
