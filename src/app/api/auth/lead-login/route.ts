import { NextResponse } from "next/server";
import { fetchFromDatabase, logAudit } from "@/lib/db";
import { createLeadToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { accessCode } = await request.json();

    if (!accessCode) {
      return NextResponse.json({ error: "Access Code is required" }, { status: 400 });
    }

    const cleanCode = accessCode.trim().toUpperCase();
    const db = await fetchFromDatabase();

    // Match code against leads
    const matchedLead = db.leads.find(
      (l) => l.access_code?.toUpperCase() === cleanCode
    );

    if (!matchedLead) {
      return NextResponse.json({ error: "Invalid Lead Access Code. Please contact Sports Society Head." }, { status: 401 });
    }

    // Identify assigned sports
    const assignedSports = db.sports.filter((s) => s.leadIds?.includes(matchedLead.id));

    const token = await createLeadToken(matchedLead.id, matchedLead.name);
    logAudit("LEAD_LOGGED_IN", "LEAD", `Lead ${matchedLead.name} logged into Lead Portal (${assignedSports.map(s => s.name).join(", ")})`, matchedLead.id);

    const response = NextResponse.json({
      success: true,
      lead: {
        id: matchedLead.id,
        name: matchedLead.name,
        sports: assignedSports.map((s) => ({ id: s.id, name: s.name })),
      },
    });

    response.cookies.set({
      name: "lead_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Lead login error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
