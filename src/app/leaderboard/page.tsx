"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Medal, Award, Flame, Search, ArrowUpDown } from "lucide-react";
import confetti from "canvas-confetti";
import LeaderboardCharts from "@/components/LeaderboardCharts";
import { Session } from "@/types";

export default function LeaderboardPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>("session-fall-2026");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("25-26");

  useEffect(() => {
    fetch("/api/gala")
      .then((res) => res.json())
      .then((json) => {
        setSessions(json.sessions || []);
        if (json.sessions && json.sessions.length > 0) {
          setSelectedSessionId(json.sessions[json.sessions.length - 1].id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading sessions", err);
        setLoading(false);
      });
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#F97316", "#247BFF", "#F59E0B"],
    });
  };

  const currentSession = sessions.find((s) => s.id === selectedSessionId) || sessions[0];
  const rankings: any[] = [
    { position: 1, team_name: "Alpha Squad", total_points: 120, played: 8, gold_count: 5, silver_count: 2, bronze_count: 1, wins: 7 },
    { position: 2, team_name: "Phoenix", total_points: 110, played: 8, gold_count: 3, silver_count: 4, bronze_count: 1, wins: 6 },
    { position: 3, team_name: "Titans", total_points: 105, played: 8, gold_count: 2, silver_count: 3, bronze_count: 3, wins: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col font-sans selection:bg-[#247BFF] selection:text-white">
      <Navbar />

      {/* 6. LEADERBOARD HERO - EXACT MATCH TO MOCKUP 6 */}
      <section className="relative overflow-hidden pt-16 pb-12 bg-gradient-to-b from-[#0C0E14] to-[#07090F] border-b border-[rgba(187,216,255,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
            Leaderboard
          </h1>
          <p className="mt-2 text-slate-400 text-sm max-w-lg mx-auto">
            Championship standings, accumulated medal tallies, and historical victory archives.
          </p>

          {/* Session Tabs matching Mockup 6: [23-24] [24-25] [25-26] */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {["23-24", "24-25", "25-26"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  triggerCelebration();
                }}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab
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

      {/* MAIN LEADERBOARD CONTAINER WITH 3D TROPHY PODIUM matching Mockup 6 */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Rankings Table matching Mockup 6 */}
          <div className="lg:col-span-8 bg-[#0C0E14] border border-[#BBD8FF]/15 rounded-3xl p-6 sm:p-8 border border-[rgba(187,216,255,0.15)] shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-[rgba(187,216,255,0.15)]">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#247BFF]">OVERALL STANDINGS</span>
                <h3 className="text-xl font-bold text-white mt-0.5">Top Contenders ({activeTab})</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-mono font-bold">
                SESSION LIVE
              </span>
            </div>

            {/* Table Header matching Mockup 6: [#] [Team] [Points] [Played] */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[rgba(187,216,255,0.15)] text-[11px] font-mono uppercase text-slate-400">
                    <th className="py-3 px-3">#</th>
                    <th className="py-3 px-3">Team</th>
                    <th className="py-3 px-3 text-right">Points</th>
                    <th className="py-3 px-3 text-right">Played</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(187,216,255,0.15)]/60">
                  {rankings.map((r: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#111827]/60 transition-colors group cursor-pointer"
                      onClick={triggerCelebration}
                    >
                      <td className="py-4 px-3 font-mono font-bold text-[#247BFF]">
                        {r.position || idx + 1}
                      </td>
                      <td className="py-4 px-3 font-bold text-white flex items-center gap-2">
                        {idx === 0 && <span className="text-lg">🥇</span>}
                        {idx === 1 && <span className="text-lg">🥈</span>}
                        {idx === 2 && <span className="text-lg">🥉</span>}
                        <span>{r.team_name}</span>
                      </td>
                      <td className="py-4 px-3 text-right font-mono font-black text-white text-base">
                        {r.total_points}
                      </td>
                      <td className="py-4 px-3 text-right font-mono text-slate-400">
                        {r.played || r.wins || 8}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: 3D Championship Podium & Trophy from Mockup 6 */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden bg-[#0C0E14] border border-[#BBD8FF]/15 border border-[#398BFF]/30 p-6 flex flex-col items-center justify-end text-center shadow-[0_0_50px_rgba(245,158,11,0.2)]">
              
              {/* Podium Lights */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#F59E0B]/25 rounded-full blur-[70px] pointer-events-none" />

              {/* Golden Trophy */}
              <div className="relative z-10 mb-6 trophy-glow">
                <Trophy className="w-28 h-28 text-[#F59E0B] mx-auto animate-bounce" style={{ animationDuration: "3s" }} />
              </div>

              {/* 3-Tier Step Podium Graphics matching Mockup 6 */}
              <div className="relative z-10 w-full flex items-end justify-center gap-2">
                {/* 2nd Place Step */}
                <div className="w-20 h-16 rounded-t-xl bg-[#2C1650] border border-[#3C1D6B] flex flex-col items-center justify-center">
                  <span className="text-xs font-mono font-bold text-slate-300">2</span>
                  <span className="text-[9px] font-mono text-slate-400">SILVER</span>
                </div>
                {/* 1st Place Step (Tallest) */}
                <div className="w-24 h-24 rounded-t-xl bg-gradient-to-t from-[#F97316]/40 via-[#F59E0B]/40 to-[#2C1650] border border-[#F59E0B]/60 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-base font-mono font-black text-[#F59E0B]">1</span>
                  <span className="text-[10px] font-mono font-bold text-white">CHAMPION</span>
                </div>
                {/* 3rd Place Step */}
                <div className="w-20 h-12 rounded-t-xl bg-[#111827] border border-[#3C1D6B] flex flex-col items-center justify-center">
                  <span className="text-xs font-mono font-bold text-amber-600">3</span>
                  <span className="text-[9px] font-mono text-slate-400">BRONZE</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RECHARTS DATA VISUALIZATION */}
        <section className="bg-[#0C0E14] border border-[#BBD8FF]/15 rounded-3xl p-6 sm:p-10 border border-[rgba(187,216,255,0.15)]">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase text-[#247BFF]">
              MEDAL DISTRIBUTION ANALYTICS
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Visual Medal Breakdown by Squad
            </h3>
          </div>
          <LeaderboardCharts entries={rankings} sessionName={activeTab} />
        </section>

      </main>

      <Footer />
    </div>
  );
}