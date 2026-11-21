"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, ArrowRight, AlertCircle, KeyRound, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid administrator credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090F] text-[#E1E2EB] flex flex-col font-sans selection:bg-[#247BFF] selection:text-white relative">
      <Navbar />

      {/* 13. ADMIN LOGIN - Obsidian Electric Theme */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-20 relative">
        {/* Atmospheric Gaussian blurs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#247BFF]/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#398BFF]/15 blur-[150px] rounded-full pointer-events-none" />

        <div className="w-full max-w-2xl bg-[#0C0E14]/85 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-[#BBD8FF]/20 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(36,123,255,0.15)] relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Form */}
            <div className="md:col-span-8 space-y-5">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#BBD8FF] uppercase flex items-center gap-1.5 mb-1">
                  <Shield className="w-3.5 h-3.5 text-[#398BFF]" />
                  RESTRICTED CONSOLE
                </span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
                  Admin Login
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                  Access the Central Administrative Control Panel
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
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
                    placeholder="Password"
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
                    className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider btn-electric flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Authenticating..." : "Login to Console"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Electric Shield Lock Icon */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-32 h-32 rounded-3xl bg-[#111827] border border-[#BBD8FF]/30 flex items-center justify-center shadow-[0_0_40px_rgba(36,123,255,0.25)] relative group">
                <Lock className="w-16 h-16 text-[#398BFF] group-hover:scale-105 transition-transform" />
                <span className="absolute -inset-1 rounded-3xl bg-[#247BFF]/20 blur-md -z-10" />
              </div>
            </div>

          </div>

          <div className="mt-8 pt-4 border-t border-[#BBD8FF]/15 text-[11px] text-slate-400 text-center font-mono">
            Protected Administrative Console • UET CS Sports Gala 2026
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}