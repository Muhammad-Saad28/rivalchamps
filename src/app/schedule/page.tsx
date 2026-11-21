"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Trophy, Clock, CheckCircle2, AlertCircle, Filter, Radio } from "lucide-react";
import { Competition, Sport } from "@/types";

export default function SchedulePage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [sessionFilter, setSessionFilter] = useState("All");
  const [selectedSport, setSelectedSport] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gala")
      .then((res) => res.json())
      .then((json) => {
        setCompetitions(json.competitions || []);
        setSports(json.sports || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading schedule", err);
        setLoading(false);
      });
  }, []);

  const getSportName = (sportId: string) => {
    const s = sports.find((sp) => sp.id === sportId);
    return s ? s.name : "Sport Competition";
  };

  const filteredCompetitions = competitions.filter((comp) => {
    const matchesSport = selectedSport === "all" || comp.sport_id === selectedSport;
    return matchesSport;
  });

  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col font-sans selection:bg-[#247BFF] selection:text-white">
      <Navbar />

      {/* 5. SCHEDULE / FIXTURES - EXACT MATCH TO MOCKUP 5 */}
      <section className="relative overflow-hidden pt-16 pb-12 bg-gradient-to-b from-[#0C0E14] to-[#07090F] border-b border-[rgba(187,216,255,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
            Tournament Schedule
          </h1>
          <p className="mt-2 text-slate-400 text-sm max-w-lg mx-auto">
            Live pitch fixtures, scheduled timelines, and verified tournament results.
          </p>

          {/* Session Tabs matching Mockup 5: [All] [23-24] [24-25] [25-26] */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {["All", "23-24", "24-25", "25-26"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSessionFilter(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  sessionFilter === tab
                    ? "bg-[#247BFF] text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]"
                    : "bg-[#111827] text-slate-300 hover:bg-[#2C1650] border border-[#3C1D6B]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN FIXTURE LIST WITH STADIUM BACKDROP matching Mockup 5 */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-[#0C0E14] border border-[#BBD8FF]/15 border border-[rgba(187,216,255,0.15)] p-6 sm:p-10 shadow-2xl">
          
          {/* Stadium Pitch Ambient Lighting from Mockup 5 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090F] via-[#1E0D36]/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none overflow-hidden">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/30 via-[#247BFF]/20 to-transparent" />
          </div>

          <div className="relative z-10 space-y-6">
            
            {/* Header & Filter Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[rgba(187,216,255,0.15)] gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#247BFF] tracking-wider">
                  ARENA TIMELINES
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Official Fixtures & Final Showdowns
                </h3>
              </div>

              {/* Sport Discipline Filter */}
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="px-4 py-2 text-xs rounded-xl border border-[#3C1D6B] bg-[#0C0E14] text-white focus:outline-none focus:border-[#247BFF] cursor-pointer"
              >
                <option value="all">All Sports ({sports.length})</option>
                {sports.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="text-center py-20 text-slate-400 font-mono flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-[#247BFF] border-t-transparent rounded-full animate-spin" />
                Loading schedule...
              </div>
            ) : filteredCompetitions.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#111827] border border-[#3C1D6B] flex items-center justify-center mx-auto text-[#247BFF]">
                  <Calendar className="w-8 h-8 text-[#247BFF]" />
                </div>
                <h4 className="text-lg font-bold text-white">Upcoming Fixtures Under Preparation</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Appointed field leads publish finalized brackets and match dates directly via the Field Marshal Panel.
                </p>
                <div className="p-4 max-w-lg mx-auto rounded-xl bg-[#0C0E14] border border-[rgba(187,216,255,0.15)] text-xs text-slate-300 text-left space-y-2">
                  <div className="font-bold text-[#F59E0B]">Featured Upcoming Championship Schedule:</div>
                  <div className="flex justify-between py-1 border-b border-[rgba(187,216,255,0.15)]">
                    <span>⚽ Football Finals</span>
                    <span className="font-mono text-slate-400">24 Dec, 2026 • 4:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>🏀 Basketball Semis</span>
                    <span className="font-mono text-slate-400">25 Dec, 2026 • 6:00 PM</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCompetitions.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-5 rounded-2xl bg-[#0C0E14] border border-[rgba(187,216,255,0.15)] hover:border-[#247BFF]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#111827] border border-[#3C1D6B] flex items-center justify-center text-[#247BFF] shrink-0">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold uppercase text-[#247BFF] block">
                          {getSportName(comp.sport_id)} • {comp.category}
                        </span>
                        <h4 className="text-base font-bold text-white mt-0.5">{comp.title}</h4>
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {new Date(comp.match_date).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="px-4 py-2 rounded-xl bg-[#111827] border border-[#3C1D6B] text-center font-mono">
                        {comp.score_a || comp.score_b ? (
                          <span className="text-lg font-bold text-[#F59E0B]">
                            {comp.score_a || "0"} : {comp.score_b || "0"}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 font-bold uppercase">VS</span>
                        )}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#247BFF]/20 border border-[#247BFF]/40 text-[#247BFF] text-[10px] font-mono font-bold uppercase tracking-wider">
                        {comp.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}