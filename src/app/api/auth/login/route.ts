import { NextResponse } from "next/server";
import { verifyAdminPassword, createAdminToken, getAdminEmail } from "@/lib/auth";
import { logAudit } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const expectedEmail = getAdminEmail();
    const isPasswordValid = await verifyAdminPassword(password);

    if (email.toLowerCase().trim() !== expectedEmail.toLowerCase().trim() || !isPasswordValid) {
      logAudit("FAILED_LOGIN_ATTEMPT", "AUTH", `Failed login attempt for ${email}`);
      return NextResponse.json({ error: "Invalid administrator credentials" }, { status: 401 });
    }

    const token = await createAdminToken(email);
    logAudit("ADMIN_LOGGED_IN", "AUTH", `Administrator logged in: ${email}`);

    const response = NextResponse.json({ success: true, message: "Logged in successfully" });
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
