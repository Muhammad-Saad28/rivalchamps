"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserCheck, Shield, Lock, ArrowRight, AlertCircle, KeyRound, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LeadLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/lead-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: password || email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/lead/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid coordinator credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090F] text-[#E1E2EB] flex flex-col font-sans selection:bg-[#247BFF] selection:text-white relative">
      <Navbar />

      {/* 11. LEAD LOGIN - Obsidian Electric Theme */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-20 relative">
        {/* Ambient atmospheric Gaussian blurs */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#247BFF]/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#398BFF]/15 blur-[150px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-[#0C0E14]/85 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-[#BBD8FF]/20 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(36,123,255,0.15)] relative z-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#BBD8FF] uppercase flex items-center justify-center gap-1.5 mb-2">
              <UserCheck className="w-4 h-4 text-[#398BFF]" />
              OFFICIAL COORDINATOR PORTAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
              Sports Lead Login
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Manage your sport, live fixtures, and scorecards.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Address Input */}
            <div>
              <input
                type="text"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-xl border border-[#BBD8FF]/20 bg-[#111827] text-white placeholder-slate-400 focus:outline-none focus:border-[#398BFF] focus:shadow-[0_0_15px_rgba(36,123,255,0.3)] transition-all font-mono"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                required
                placeholder="Password (e.g. LEAD-1001)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-xl border border-[#BBD8FF]/20 bg-[#111827] text-white placeholder-slate-400 focus:outline-none focus:border-[#398BFF] focus:shadow-[0_0_15px_rgba(36,123,255,0.3)] transition-all font-mono"
              />
            </div>

            {/* Electric Blue Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider btn-electric flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Authenticating Lead..." : "Sign In to Lead Panel"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => alert("Please consult the Sports Committee secretariat for your assigned LEAD-100X passcode.")}
                className="text-xs text-slate-400 hover:text-[#BBD8FF] transition-colors"
              >
                Forgot Password or Passcode?
              </button>
            </div>
          </form>

          {/* Passcode hint */}
          <div className="mt-8 pt-4 border-t border-[#BBD8FF]/15 text-[11px] text-slate-400 text-center font-mono">
            Demo Field Lead Passcode: <span className="text-[#398BFF] font-bold">LEAD-1001</span>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}