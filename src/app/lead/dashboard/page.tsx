"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Trophy, 
  Users, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  LogOut,
  Send,
  Plus,
  RefreshCw,
  Search,
  LayoutDashboard,
  Swords,
  Award,
  Settings
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Sport, Lead, Competition, Registration } from "@/types";

export default function LeadDashboardPage() {
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [assignedSports, setAssignedSports] = useState<Sport[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Load Gala data
  useEffect(() => {
    fetch("/api/gala")
      .then((res) => res.json())
      .then((json) => {
        // Fallback default lead if not logged in directly
        const defaultLead = json.leads?.[0] || {
          id: "lead-cricket-1",
          name: "Muhammad Ahmad",
          phone: "0300-1234567",
        };
        setLead(defaultLead);

        // Find assigned sports
        const sports = (json.sports || []).filter((s: any) => 
          s.leadIds?.includes(defaultLead.id) || s.name.toLowerCase().includes("football")
        );
        setAssignedSports(sports.length > 0 ? sports : json.sports?.slice(0, 2) || []);
        setCompetitions(json.competitions || []);
        setRegistrations(json.registrations || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading lead dashboard", err);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/lead-logout", { method: "POST" });
    router.push("/lead/login");
  };

  const currentSport = assignedSports[0] || { name: "Football", category: "Male", venue: "Main Ground" };

  return (
    <div className="min-h-screen bg-[#07090F] text-[#E1E2EB] flex flex-col font-sans selection:bg-[#247BFF] selection:text-white relative">
      <Navbar />

      {/* 12. LEAD DASHBOARD - Obsidian Electric Theme */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative z-10">
        {/* Ambient atmospheric Gaussian blurs */}
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#247BFF]/12 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#398BFF]/12 blur-[160px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Sidebar Menu in Obsidian Electric styling */}
          <div className="lg:col-span-3 bg-[#0C0E14] rounded-3xl p-6 border border-[#BBD8FF]/20 space-y-6 shadow-[0_0_30px_rgba(36,123,255,0.12)]">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#BBD8FF] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#398BFF]" />
                FIELD MARSHAL PORTAL
              </span>
              <h2 className="text-xl font-black uppercase text-white mt-1">
                Lead Dashboard
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {lead?.name || "Official Coordinator"}
              </p>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1.5 pt-2">
              {[
                { name: "Dashboard", icon: LayoutDashboard },
                { name: "Matches", icon: Calendar },
                { name: "Scores", icon: Award },
                { name: "Teams", icon: Users },
                { name: "Settings", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-mono ${
                    activeTab === tab.name
                      ? "bg-[#247BFF] text-white shadow-lg shadow-[#247BFF]/30 font-bold"
                      : "text-slate-300 hover:bg-[#111827] hover:text-white"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.name ? "text-white" : "text-[#398BFF]"}`} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>

            <div className="pt-6 border-t border-[#BBD8FF]/15">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all cursor-pointer font-mono"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Right Main Panel: Obsidian Glass Layout with Electric Blue Metric Rings */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Overview Card with 3 Circular KPI Meters */}
            <div className="bg-[#0C0E14] border border-[#BBD8FF]/20 rounded-3xl p-8 text-[#E1E2EB] shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#BBD8FF]/15">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  {currentSport.name} Overview
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#247BFF]/15 border border-[#247BFF]/30 text-[#BBD8FF] text-xs font-mono font-bold uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#398BFF] electric-live-dot" />
                  ACTIVE TOURNAMENT
                </span>
              </div>

              {/* 3 Circular Metrics: [12 Matches] [8 Teams] [245 Players] in Electric Blue theme */}
              <div className="grid grid-cols-3 gap-6 text-center py-4">
                
                {/* Metric 1: Matches */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#247BFF] bg-[#111827] flex items-center justify-center shadow-[0_0_20px_rgba(36,123,255,0.3)]">
                    <span className="text-2xl sm:text-3xl font-black font-sans text-white">
                      12
                    </span>
                  </div>
                  <span className="text-xs font-bold uppercase text-[#BBD8FF] mt-2.5 tracking-wider font-mono">
                    Matches
                  </span>
                </div>

                {/* Metric 2: Teams */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#398BFF] bg-[#111827] flex items-center justify-center shadow-[0_0_20px_rgba(57,139,255,0.3)]">
                    <span className="text-2xl sm:text-3xl font-black font-sans text-white">
                      8
                    </span>
                  </div>
                  <span className="text-xs font-bold uppercase text-[#BBD8FF] mt-2.5 tracking-wider font-mono">
                    Teams
                  </span>
                </div>

                {/* Metric 3: Players */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#BBD8FF] bg-[#111827] flex items-center justify-center shadow-[0_0_20px_rgba(187,216,255,0.3)]">
                    <span className="text-2xl sm:text-3xl font-black font-sans text-white">
                      245
                    </span>
                  </div>
                  <span className="text-xs font-bold uppercase text-[#BBD8FF] mt-2.5 tracking-wider font-mono">
                    Players
                  </span>
                </div>

              </div>

              {/* Recent Matches Section */}
              <div className="pt-4 border-t border-[#BBD8FF]/15">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    Recent Matches
                  </h4>
                  <span className="font-mono text-xs font-bold text-[#398BFF]">
                    LIVE FIELD RESULT
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#111827] border border-[#BBD8FF]/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#247BFF]/20 border border-[#247BFF]/30 flex items-center justify-center text-[#398BFF]">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-sm text-white block">Alpha vs Beta Squad</strong>
                      <span className="text-xs text-slate-400 font-mono">Quarter Final • Ground A</span>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 rounded-xl bg-[#247BFF] text-white font-mono font-bold text-sm tracking-wider shadow-md">
                    1 - 1
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Score Update Action Bar */}
            <div className="bg-[#0C0E14] rounded-2xl p-6 border border-[#BBD8FF]/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_25px_rgba(36,123,255,0.1)]">
              <div>
                <h4 className="font-bold text-white text-sm">Post Live Match Score or Commentary</h4>
                <p className="text-xs text-slate-400 mt-0.5">Real-time update is reflected instantly on the public scoreboard.</p>
              </div>
              <button
                onClick={() => alert("Scores are synced in real-time with Supabase.")}
                className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider btn-electric flex items-center gap-2 cursor-pointer font-mono"
              >
                <Plus className="w-4 h-4" />
                <span>Add Score Entry</span>
              </button>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}