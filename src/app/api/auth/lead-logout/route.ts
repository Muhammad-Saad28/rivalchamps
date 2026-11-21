import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Lead signed out" });
  response.cookies.delete("lead_token");
  return response;
}
