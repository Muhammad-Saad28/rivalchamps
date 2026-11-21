import { NextRequest, NextResponse } from "next/server";
import { fetchFromDatabase } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const isAuthed = await isAuthenticated();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized access: Administrator login required" }, { status: 401 });
    }

    const db = await fetchFromDatabase();
    const registrations = db.registrations;

    // Build CSV headers and rows
    const headers = [
      "Registration ID",
      "Sport ID",
      "Sport Name",
      "Team / Squad Name",
      "Captain / Athlete Name",
      "UET Registration Number",
      "Department",
      "Semester",
      "Phone / WhatsApp",
      "Email Address",
      "Status",
      "Submitted At"
    ];

    const escapeCsv = (str: string | undefined | null) => {
      if (str === null || str === undefined) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = registrations.map((r) => {
      const sportObj = db.sports.find(s => s.id === r.sport_id);
      const sportName = sportObj ? sportObj.name : r.sport_id;
      return [
        escapeCsv(r.id),
        escapeCsv(r.sport_id),
        escapeCsv(sportName),
        escapeCsv(r.team_name || "Individual"),
        escapeCsv(r.captain_name),
        escapeCsv(r.captain_reg_no),
        escapeCsv(r.department),
        escapeCsv(r.semester),
        escapeCsv(r.contact_number),
        escapeCsv(r.email),
        escapeCsv(r.status),
        escapeCsv(r.submitted_at),
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\r\n");
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `uet_cs_sports_gala_registrations_${dateStr}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Export CSV error", error);
    return NextResponse.json({ error: "Failed to generate CSV export" }, { status: 500 });
  }
}
