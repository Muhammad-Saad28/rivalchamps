import { NextResponse } from "next/server";
import { logAudit } from "@/lib/db";

export async function POST() {
  logAudit("ADMIN_LOGGED_OUT", "AUTH", "Administrator signed out");
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete("admin_token");
  return response;
}
