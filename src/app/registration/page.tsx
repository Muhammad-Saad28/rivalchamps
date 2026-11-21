"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, ShieldCheck, AlertCircle, ArrowRight, Trophy, Sparkles, User, Hash, Mail, Phone } from "lucide-react";
import { Sport } from "@/types";

function RegistrationForm() {
  const searchParams = useSearchParams();
  const preselectedSport = searchParams.get("sport") || "";

  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    sport_id: preselectedSport || "sp-cricket-m",
    team_name: "",
    captain_name: "",
    captain_reg_no: "",
    department: "Computer Science",
    semester: "3rd",
    contact_number: "",
    email: "",
  });

  useEffect(() => {
    fetch("/api/gala")
      .then((res) => res.json())
      .then((json) => {
        setSports(json.sports || []);
        if (preselectedSport && json.sports.some((s: Sport) => s.id === preselectedSport)) {
          setFormData((prev) => ({ ...prev, sport_id: preselectedSport }));
        } else if (json.sports && json.sports.length > 0 && !preselectedSport) {
          setFormData((prev) => ({ ...prev, sport_id: json.sports[0].id }));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading gala data", err);
        setLoading(false);
      });
  }, [preselectedSport]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/gala?action=submit-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit registration");
      }

      setSuccess(data.registration);
    } catch (err: any) {
      setError(err.message || "An error occurred during submission");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      {success ? (
        <div className="bg-[#0C0E14] border border-[#BBD8FF]/15 rounded-3xl border border-emerald-500/40 p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(16,185,129,0.15)] max-w-xl mx-auto">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
            CONFIRMATION REFERENCE: {success.id}
          </span>
          <h2 className="text-3xl font-black uppercase text-white mt-2">
            Registration Submitted!
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Your squad entry for <strong>{formData.team_name || formData.captain_name}</strong> has been secured in the database.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`/pass/${success.id}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl rc-btn-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>View Official Event Pass</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                setSuccess(null);
                setFormData({
                  sport_id: sports[0]?.id || "sp-cricket-m",
                  team_name: "",
                  captain_name: "",
                  captain_reg_no: "",
                  department: "Computer Science",
                  semester: "3rd",
                  contact_number: "",
                  email: "",
                });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl rc-btn-secondary text-xs font-bold uppercase tracking-wider"
            >
              Submit Another
            </button>
          </div>
        </div>
      ) : (
        /* 9. REGISTRATION - EXACT MATCH TO MOCKUP 9 */
        <div className="bg-[#0C0E14] border border-[#BBD8FF]/15 rounded-3xl border border-[rgba(187,216,255,0.15)] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Form Fields matching Mockup 9 */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
                  Team Registration
                </h1>
                <p className="mt-1 text-sm text-slate-300">
                  Join the competition and be a part of RivalChamps!
                </p>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Team Name Input matching Mockup 9 */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Team Name"
                    value={formData.team_name}
                    onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#3C1D6B] bg-[#0C0E14] text-white placeholder-slate-400 focus:outline-none focus:border-[#247BFF]"
                  />
                </div>

                {/* Sport Discipline Dropdown matching Mockup 9 */}
                <div>
                  <select
                    required
                    value={formData.sport_id}
                    onChange={(e) => setFormData({ ...formData, sport_id: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#3C1D6B] bg-[#0C0E14] text-white focus:outline-none focus:border-[#247BFF] cursor-pointer"
                  >
                    <option value="" disabled>Select Sport</option>
                    {sports.map((sp) => (
                      <option key={sp.id} value={sp.id}>
                        {sp.name} ({sp.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Captain Name Input matching Mockup 9 */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Captain Name"
                    value={formData.captain_name}
                    onChange={(e) => setFormData({ ...formData, captain_name: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#3C1D6B] bg-[#0C0E14] text-white placeholder-slate-400 focus:outline-none focus:border-[#247BFF]"
                  />
                </div>

                {/* Additional University Details in 2 cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Registration No (e.g. 2023-CS-101)"
                    value={formData.captain_reg_no}
                    onChange={(e) => setFormData({ ...formData, captain_reg_no: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#3C1D6B] bg-[#0C0E14] text-white placeholder-slate-400 focus:outline-none focus:border-[#247BFF]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp"
                    value={formData.contact_number}
                    onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#3C1D6B] bg-[#0C0E14] text-white placeholder-slate-400 focus:outline-none focus:border-[#247BFF]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider rc-btn-primary flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Saving Registration...</span>
                    ) : (
                      <>
                        <span>Register Team</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Illustrated Athletes Group from Mockup 9 */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-[4/3] rounded-3xl overflow-hidden bg-[#0C0E14] border border-[#BBD8FF]/15 border border-[#398BFF]/30 p-6 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(249,115,22,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#111827] to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#F97316]/20 rounded-full blur-[70px] pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#F97316]/30 via-[#247BFF]/30 to-[#BBD8FF]/30 border border-[#247BFF]/40 flex items-center justify-center mx-auto text-[#F59E0B]">
                    <Trophy className="w-10 h-10 text-[#F59E0B]" />
                  </div>
                  <h3 className="text-lg font-black uppercase text-white tracking-wide">
                    Official Squad Pass
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Submitting this form generates an authorized digital QR Event Pass for ground match access.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col font-sans selection:bg-[#247BFF] selection:text-white">
      <Navbar />
      <Suspense fallback={<div className="py-24 text-center font-mono text-xs text-slate-400">Loading form...</div>}>
        <RegistrationForm />
      </Suspense>
      <Footer />
    </div>
  );
}