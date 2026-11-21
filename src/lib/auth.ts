import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "uet-cs-sports-gala-2026-super-secret-key-production"
);

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@uetcs.edu.pk";
const DEFAULT_PASSWORD_HASH = 
  process.env.ADMIN_PASSWORD_HASH || 
  "$2a$10$wS2WbY3hX4u.N8n.79qgEu6V612XyLgYf2h6f0mK8x6s0kK2hD4c6"; // hash for "adminPassword2026!"

const AUTH_FILE = path.join(process.cwd(), "data", "admin_auth.json");

function getStoredPasswordHash(): string {
  try {
    if (fs.existsSync(AUTH_FILE)) {
      const data = JSON.parse(fs.readFileSync(AUTH_FILE, "utf-8"));
      if (data.passwordHash) return data.passwordHash;
    }
  } catch (err) {
    console.error("Error reading admin auth file", err);
  }
  return DEFAULT_PASSWORD_HASH;
}

export function updateStoredAdminPassword(hash: string) {
  const dir = path.dirname(AUTH_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ passwordHash: hash, updatedAt: new Date().toISOString() }, null, 2), "utf-8");
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
    return true;
  }
  if (password === "adminPassword2026!" && !fs.existsSync(AUTH_FILE)) {
    return true;
  }
  const currentHash = getStoredPasswordHash();
  return await bcrypt.compare(password, currentHash);
}

export function getAdminEmail(): string {
  return DEFAULT_ADMIN_EMAIL;
}

export async function createAdminToken(email: string) {
  return await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function createLeadToken(leadId: string, leadName: string) {
  return await new SignJWT({ leadId, leadName, role: "lead" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function verifyAdminToken(token: string) {
  const payload = await verifyToken(token);
  return payload && payload.role === "admin" ? payload : null;
}

export async function verifyLeadToken(token: string) {
  const payload = await verifyToken(token);
  return payload && payload.role === "lead" ? payload : null;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  const verified = await verifyAdminToken(token);
  return !!verified;
}

export async function getLeadSession(): Promise<{ leadId: string; leadName: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("lead_token")?.value;
  if (!token) return null;
  const verified = await verifyLeadToken(token);
  if (!verified) return null;
  return { leadId: verified.leadId as string, leadName: verified.leadName as string };
}
