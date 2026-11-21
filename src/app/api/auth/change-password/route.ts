import { NextResponse } from "next/server";
import { isAuthenticated, getAdminEmail, verifyAdminPassword, hashPassword, updateStoredAdminPassword } from "@/lib/auth";
import { logAudit } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const isAuthed = await isAuthenticated();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized access: Administrator login required" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters long" }, { status: 400 });
    }

    const isCurrentValid = await verifyAdminPassword(currentPassword);
    if (!isCurrentValid) {
      logAudit("FAILED_PASSWORD_CHANGE", "AUTH", "Failed attempt to change administrator password: invalid current password");
      return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
    }

    const newHash = await hashPassword(newPassword);
    updateStoredAdminPassword(newHash);

    logAudit("ADMIN_PASSWORD_CHANGED", "AUTH", `Password successfully updated for ${getAdminEmail()}`);

    return NextResponse.json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error("Change password error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
