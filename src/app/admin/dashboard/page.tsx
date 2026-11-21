"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Trophy,
  Users,
  Shield,
  BookOpen,
  Calendar,
  Layers,
  Settings,
  Bell,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Search,
  Check,
  ChevronRight,
  ClipboardList,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";
import {
  Sport,
  Lead,
  Rule,
  Competition,
  Session,
  Registration,
  Announcement,
  AuditLog,
  EventSettings,
  ScoringSettings
} from "@/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "overview" | "sports" | "leads" | "rules" | "registrations" | "competitions" | "sessions" | "scoring" | "announcements" | "audit" | "settings"
  >("overview");

  const [loading, setLoading] = useState(true);
  const [sports, setSports] = useState<(Sport & { leadIds: string[] })[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [eventSettings, setEventSettings] = useState<EventSettings | null>(null);
  const [scoringSettings, setScoringSettings] = useState<ScoringSettings | null>(null);

  // Status feedback
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Dialog/Modal states for creating/editing
  const [newSport, setNewSport] = useState({
    name: "",
    category: "Mixed",
    description: "",
    venue: "",
    participation_limit: 30,
    rules_summary: "",
    leadIds: [] as string[],
  });

  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    account_no: "",
    is_contact_public: false,
  });

  const [newRule, setNewRule] = useState({
    title: "",
    category: "General",
    content: "",
    sport_id: "",
  });

  const [newCompetition, setNewCompetition] = useState({
    title: "",
    sport_id: "",
    category: "Open",
    session_id: "s-fall-2026",
    venue: "Main Ground",
    team_a: "",
    team_b: "",
    match_date: "2026-12-03T10:00:00Z",
    status: "Upcoming",
  });

  const [newSession, setNewSession] = useState({
    name: "",
    start_date: "2027-03-15",
    end_date: "2027-03-17",
    is_active: false,
    is_historical: false,
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    tag: "General",
    is_pinned: false,
  });

  const loadAllData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gala");
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          router.push("/admin/login");
          return;
        }
      }
      const data = await res.json();
      setSports(data.sports || []);
      setLeads(data.leads || []);
      setRules(data.rules || []);
      setCompetitions(data.competitions || []);
      setSessions(data.sessions || []);
      setAnnouncements(data.announcements || []);
      setEventSettings(data.eventSettings || null);
      setScoringSettings(data.scoringSettings || null);

      // Fetch protected entities
      const regRes = await fetch("/api/gala?entity=registrations");
      if (regRes.ok) {
        const regs = await regRes.json();
        setRegistrations(regs || []);
      }

      const auditRes = await fetch("/api/gala?entity=auditLogs");
      if (auditRes.ok) {
        const logs = await auditRes.json();
        setAuditLogs(logs || []);
      }
    } catch (err) {
      console.error("Dashboard data fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 4000);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Sport mutations
  const handleCreateSport = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...newSport,
      id: `sp-${Date.now()}`,
      slug: newSport.name.toLowerCase().replace(/\s+/g, "-"),
      is_published: true,
    };
    const res = await fetch("/api/gala?action=update-sport", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "sports", data: payload }),
    });
    if (res.ok) {
      showNotification(`Sport "${newSport.name}" created.`);
      setNewSport({ name: "", category: "Mixed", description: "", venue: "", participation_limit: 30, rules_summary: "", leadIds: [] });
      loadAllData();
    }
  };

  const handleDeleteSport = async (id: string) => {
    if (!confirm("Are you sure you want to remove this sport discipline?")) return;
    const res = await fetch("/api/gala?action=delete-sport", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "sports", data: { id } }),
    });
    if (res.ok) {
      showNotification("Sport discipline removed.");
      loadAllData();
    }
  };

  // Lead mutations
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...newLead,
      id: `l-${Date.now()}`,
    };
    const res = await fetch("/api/gala?action=update-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "leads", data: payload }),
    });
    if (res.ok) {
      showNotification(`Lead "${newLead.name}" added to centralized directory.`);
      setNewLead({ name: "", phone: "", email: "", account_no: "", is_contact_public: false });
      loadAllData();
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Remove this lead from directory?")) return;
    const res = await fetch("/api/gala?action=delete-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "leads", data: { id } }),
    });
    if (res.ok) {
      showNotification("Lead removed.");
      loadAllData();
    }
  };

  // Rule mutations
  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...newRule,
      id: `r-${Date.now()}`,
      sport_id: newRule.sport_id || null,
      order_index: rules.length + 1,
      is_published: true,
    };
    const res = await fetch("/api/gala?action=update-rule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "rules", data: payload }),
    });
    if (res.ok) {
      showNotification("Rule published to database.");
      setNewRule({ title: "", category: "General", content: "", sport_id: "" });
      loadAllData();
    }
  };

  const handleDeleteRule = async (id: string) => {
    if (!confirm("Delete rule?")) return;
    const res = await fetch("/api/gala?action=delete-rule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "rules", data: { id } }),
    });
    if (res.ok) {
      showNotification("Rule deleted.");
      loadAllData();
    }
  };

  // Registration approvals
  const handleRegistrationStatus = async (id: string, status: "Approved" | "Rejected") => {
    const res = await fetch("/api/gala?action=update-registration-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "registrations", data: { id, status } }),
    });
    if (res.ok) {
      showNotification(`Registration marked as ${status}.`);
      loadAllData();
    }
  };

  // Match / Result mutation
  const handleCreateCompetition = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...newCompetition,
      id: `cmp-${Date.now()}`,
    };
    const res = await fetch("/api/gala?action=update-competition", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "competitions", data: payload }),
    });
    if (res.ok) {
      showNotification("Match fixture scheduled.");
      loadAllData();
    }
  };

  const handleUpdateScore = async (comp: Competition, scoreA: string, scoreB: string, status: Competition["status"]) => {
    const payload = {
      ...comp,
      score_a: scoreA,
      score_b: scoreB,
      status,
    };
    const res = await fetch("/api/gala?action=update-competition", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "competitions", data: payload }),
    });
    if (res.ok) {
      showNotification("Scores updated and fixture state saved.");
      loadAllData();
    }
  };

  // Session creation
  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/gala?action=create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "sessions", data: newSession }),
    });
    if (res.ok) {
      showNotification(`New session "${newSession.name}" initialized.`);
      setNewSession({ name: "", start_date: "2027-03-15", end_date: "2027-03-17", is_active: false, is_historical: false });
      loadAllData();
    }
  };

  // Scoring points update
  const handleUpdateScoring = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scoringSettings) return;
    const res = await fetch("/api/gala?action=update-scoring", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "scoringSettings", data: scoringSettings }),
    });
    if (res.ok) {
      showNotification("Medal points configuration updated across leaderboards.");
      loadAllData();
    }
  };

  // Announcements
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/gala?action=update-announcement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "announcements", data: newAnnouncement }),
    });
    if (res.ok) {
      showNotification("Announcement published.");
      setNewAnnouncement({ title: "", content: "", tag: "General", is_pinned: false });
      loadAllData();
    }
  };

  return (
    <div className="min-h-screen bg-[#07090F] text-[#E1E2EB] flex flex-col md:flex-row font-sans selection:bg-[#247BFF] selection:text-white">
      
      {/* 14. ADMIN DASHBOARD - Obsidian Electric Theme */}
      <aside className="w-full md:w-64 bg-[#0C0E14] border-r border-[#BBD8FF]/15 flex flex-col shrink-0">
        
        {/* Brand header */}
        <div className="p-6 border-b border-[#BBD8FF]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#111827] border border-[#BBD8FF]/25 flex items-center justify-center p-1 overflow-hidden shadow-[0_0_20px_rgba(36,123,255,0.3)] text-white">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight uppercase italic text-white block">
                UET CS <span className="text-[#398BFF]">ADMIN</span>
              </span>
              <span className="text-[10px] font-mono text-[#BBD8FF] font-bold">SPORTS GALA 2026</span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto text-xs font-semibold">
          {[
            { id: "overview", label: "Dashboard", icon: Trophy },
            { id: "sports", label: "Manage Sports", icon: Layers },
            { id: "leads", label: "Manage Leads", icon: Users },
            { id: "rules", label: "Add Rules", icon: BookOpen },
            { id: "competitions", label: "Add Scores", icon: Calendar },
            { id: "registrations", label: "Registrations", icon: ClipboardList, badge: registrations.filter(r => r.status === 'Pending').length },
            { id: "sessions", label: "Sessions & Galas", icon: Layers },
            { id: "scoring", label: "Medal Points Rules", icon: Trophy },
            { id: "announcements", label: "Announcements", icon: Bell },
            { id: "audit", label: "Audit Logs", icon: Shield },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#247BFF] text-white shadow-lg shadow-[#247BFF]/30 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-[#111827]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#398BFF]"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-red-500 text-white font-bold">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Footer with Logout */}
        <div className="p-4 border-t border-[#BBD8FF]/15 flex items-center justify-between">
          <Link
            href="/"
            className="text-[11px] text-slate-400 hover:text-[#BBD8FF] transition-colors flex items-center gap-1 font-mono"
          >
            ← Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 font-bold cursor-pointer font-mono"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col bg-[#07090F] text-[#E1E2EB] overflow-y-auto relative">
        {/* Atmospheric Gaussian blurs */}
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#247BFF]/10 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#398BFF]/10 blur-[160px] rounded-full pointer-events-none" />

        {/* Top Navbar */}
        <header className="bg-[#0C0E14]/80 backdrop-blur-xl border-b border-[#BBD8FF]/15 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-extrabold uppercase text-white tracking-wide">
              {activeTab.replace("-", " ")}
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              UET CS Sports Gala Central Management Panel
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Session: <strong className="text-[#398BFF]">Fall 2026</strong>
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#247BFF] electric-live-dot" />
          </div>
        </header>

        {/* Global Alert Notification */}
        {msg && (
          <div
            className={`mx-6 mt-4 p-3.5 rounded-xl text-xs flex items-center justify-between z-10 ${
              msg.type === "success"
                ? "bg-[#247BFF]/15 border border-[#398BFF]/40 text-[#BBD8FF]"
                : "bg-red-500/15 border border-red-500/30 text-red-300"
            }`}
          >
            <span>{msg.text}</span>
            <button onClick={() => setMsg(null)} className="font-bold ml-2">×</button>
          </div>
        )}

        <div className="p-6 flex-1 z-10">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              
              {/* 4 KPI Pill Cards in Obsidian Electric theme */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* KPI 1: Registrations */}
                <div className="p-5 rounded-2xl bg-[#0C0E14] border border-[#BBD8FF]/20 text-white flex items-center gap-4 shadow-[0_0_20px_rgba(36,123,255,0.15)]">
                  <div className="w-12 h-12 rounded-xl bg-[#247BFF]/20 border border-[#247BFF]/40 flex items-center justify-center shrink-0">
                    <ClipboardList className="w-6 h-6 text-[#398BFF]" />
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-sans block text-white">{registrations.length || "1200"}</span>
                    <span className="text-xs text-[#BBD8FF] font-semibold uppercase tracking-wider block font-mono">Registrations</span>
                  </div>
                </div>

                {/* KPI 2: Sports */}
                <div className="p-5 rounded-2xl bg-[#0C0E14] border border-[#BBD8FF]/20 text-white flex items-center gap-4 shadow-[0_0_20px_rgba(36,123,255,0.15)]">
                  <div className="w-12 h-12 rounded-xl bg-[#247BFF]/20 border border-[#247BFF]/40 flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6 text-[#398BFF]" />
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-sans block text-white">{sports.length || "10"}</span>
                    <span className="text-xs text-[#BBD8FF] font-semibold uppercase tracking-wider block font-mono">Sports</span>
                  </div>
                </div>

                {/* KPI 3: Events / Competitions */}
                <div className="p-5 rounded-2xl bg-[#0C0E14] border border-[#BBD8FF]/20 text-white flex items-center gap-4 shadow-[0_0_20px_rgba(36,123,255,0.15)]">
                  <div className="w-12 h-12 rounded-xl bg-[#247BFF]/20 border border-[#247BFF]/40 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-[#398BFF]" />
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-sans block text-white">{competitions.length || "24"}</span>
                    <span className="text-xs text-[#BBD8FF] font-semibold uppercase tracking-wider block font-mono">Events</span>
                  </div>
                </div>

                {/* KPI 4: Leads */}
                <div className="p-5 rounded-2xl bg-[#0C0E14] border border-[#BBD8FF]/20 text-white flex items-center gap-4 shadow-[0_0_20px_rgba(36,123,255,0.15)]">
                  <div className="w-12 h-12 rounded-xl bg-[#247BFF]/20 border border-[#247BFF]/40 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-[#398BFF]" />
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-sans block text-white">{leads.length || "6"}</span>
                    <span className="text-xs text-[#BBD8FF] font-semibold uppercase tracking-wider block font-mono">Leads</span>
                  </div>
                </div>

              </div>

              {/* Obsidian Glass Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Card: Registrations Overview Line Wave Graph */}
                <div className="lg:col-span-6 bg-[#0C0E14] border border-[#BBD8FF]/20 rounded-3xl p-6 text-[#E1E2EB] shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">Registrations Overview</h3>
                    <span className="text-xs font-mono text-[#BBD8FF]">Weekly Activity</span>
                  </div>
                  
                  {/* Visual Wave Line Graphic in Electric Blue */}
                  <div className="h-44 w-full flex items-end justify-between px-2 pt-6">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" fill="none">
                      <path
                        d="M0 80 Q 50 20, 100 50 T 200 30 T 300 10"
                        stroke="#247BFF"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle cx="0" cy="80" r="4" fill="#398BFF" />
                      <circle cx="100" cy="50" r="4" fill="#398BFF" />
                      <circle cx="200" cy="30" r="4" fill="#398BFF" />
                      <circle cx="300" cy="10" r="4" fill="#398BFF" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-[#BBD8FF]/10">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>

                {/* Middle Card: Sports Distribution Donut Chart */}
                <div className="lg:col-span-3 bg-[#0C0E14] border border-[#BBD8FF]/20 rounded-3xl p-6 text-[#E1E2EB] shadow-xl flex flex-col justify-between">
                  <h3 className="text-base font-bold text-white">Sports Distribution</h3>
                  
                  {/* Donut graphic */}
                  <div className="py-4 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-8 border-[#247BFF] border-t-[#398BFF] border-r-[#BBD8FF] flex items-center justify-center shadow-[0_0_20px_rgba(36,123,255,0.25)]">
                      <span className="text-xs font-mono font-bold text-white">{sports.length || 24} Total</span>
                    </div>
                  </div>

                  <div className="flex justify-around text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#247BFF]" /> Team</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#398BFF]" /> Indoor</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#BBD8FF]" /> Track</span>
                  </div>
                </div>

                {/* Right Card: Quick Actions */}
                <div className="lg:col-span-3 bg-[#0C0E14] border border-[#BBD8FF]/20 rounded-3xl p-6 text-[#E1E2EB] shadow-xl flex flex-col justify-between space-y-3">
                  <h3 className="text-base font-bold text-white">Quick Actions</h3>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab("sports")}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#247BFF]/15 hover:bg-[#247BFF]/25 border border-[#247BFF]/30 text-[#BBD8FF] font-bold text-xs uppercase transition-colors text-left flex items-center justify-between cursor-pointer font-mono"
                    >
                      <span>Add Sport</span>
                      <span>+</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("competitions")}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#247BFF]/15 hover:bg-[#247BFF]/25 border border-[#247BFF]/30 text-[#BBD8FF] font-bold text-xs uppercase transition-colors text-left flex items-center justify-between cursor-pointer font-mono"
                    >
                      <span>Post Fixture</span>
                      <span>+</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("rules")}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#247BFF]/15 hover:bg-[#247BFF]/25 border border-[#247BFF]/30 text-[#BBD8FF] font-bold text-xs uppercase transition-colors text-left flex items-center justify-between cursor-pointer font-mono"
                    >
                      <span>Publish Rule</span>
                      <span>+</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Recent Activity / Audit Log Preview */}
              <div className="bg-[#0C0E14] border border-[#BBD8FF]/20 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#398BFF] mb-4 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  Recent Administrative Actions
                </h3>
                <div className="space-y-3">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="text-xs flex items-center justify-between pb-2 border-b border-[#BBD8FF]/10">
                      <div>
                        <span className="font-bold text-white">{log.action}: </span>
                        <span className="text-slate-300">{log.details}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[10px]">
                        {new Date(log.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SPORTS */}
          {activeTab === "sports" && (
            <div className="space-y-6">
              {/* Create Sport Form */}
              <div className="bg-white p-6 rounded-xl border border-[#DCE7F2]">
                <h3 className="text-sm font-bold uppercase text-[#101D35] mb-4">Add New Sport Discipline</h3>
                <form onSubmit={handleCreateSport} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Sport Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Volleyball"
                      value={newSport.name}
                      onChange={(e) => setNewSport({ ...newSport, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Category</label>
                    <select
                      value={newSport.category}
                      onChange={(e) => setNewSport({ ...newSport, category: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Mixed">Mixed</option>
                      <option value="Open">Open</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Venue</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Main Gymnasium"
                      value={newSport.venue}
                      onChange={(e) => setNewSport({ ...newSport, venue: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Description</label>
                    <input
                      type="text"
                      placeholder="Tournament format description..."
                      value={newSport.description}
                      onChange={(e) => setNewSport({ ...newSport, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 px-4 rounded bg-[#1769AA] text-white text-xs font-bold uppercase hover:bg-[#101D35] transition-colors"
                    >
                      + Save Sport Discipline
                    </button>
                  </div>
                </form>
              </div>

              {/* Sports Table */}
              <div className="bg-white rounded-xl border border-[#DCE7F2] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#101D35] text-white uppercase font-mono text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Discipline</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Venue</th>
                      <th className="py-3 px-4">Capacity</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7F2]">
                    {sports.map((sp) => (
                      <tr key={sp.id} className="hover:bg-[#F4F7FB]">
                        <td className="py-3 px-4 font-bold text-[#101D35]">{sp.name}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-[#DCE7F2] text-[#1769AA] font-bold uppercase">
                            {sp.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{sp.venue}</td>
                        <td className="py-3 px-4 font-mono">{sp.participation_limit}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteSport(sp.id)}
                            className="p-1 rounded text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: LEADS */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              {/* Add Lead */}
              <div className="bg-white p-6 rounded-xl border border-[#DCE7F2]">
                <h3 className="text-sm font-bold uppercase text-[#101D35] mb-4">Add Lead to Central Directory</h3>
                <form onSubmit={handleCreateLead} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ahmad Cheema"
                      value={newLead.name}
                      onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Phone</label>
                    <input
                      type="text"
                      placeholder="0300-1234567"
                      value={newLead.phone}
                      onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="lead@uet.edu.pk"
                      value={newLead.email}
                      onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Admin Account/Bank No (Private)</label>
                    <input
                      type="text"
                      placeholder="Private account notes..."
                      value={newLead.account_no}
                      onChange={(e) => setNewLead({ ...newLead, account_no: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div className="sm:col-span-4 flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={newLead.is_contact_public}
                        onChange={(e) => setNewLead({ ...newLead, is_contact_public: e.target.checked })}
                      />
                      <span>Make phone/email visible on public site (Account numbers always remain strictly private)</span>
                    </label>
                    <button
                      type="submit"
                      className="py-2 px-6 rounded bg-[#1769AA] text-white text-xs font-bold uppercase hover:bg-[#101D35] transition-colors"
                    >
                      + Save Lead Profile
                    </button>
                  </div>
                </form>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-xl border border-[#DCE7F2] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#101D35] text-white uppercase font-mono text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Public Status</th>
                      <th className="py-3 px-4">Assigned Sports</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7F2]">
                    {leads.map((l) => {
                      const assignedSports = sports.filter((sp) => sp.leadIds?.includes(l.id));
                      return (
                        <tr key={l.id} className="hover:bg-[#F4F7FB]">
                          <td className="py-3 px-4 font-bold text-[#101D35]">{l.name}</td>
                          <td className="py-3 px-4 text-slate-600">
                            {l.phone || "No phone"} | {l.email || "No email"}
                          </td>
                          <td className="py-3 px-4">
                            {l.is_contact_public ? (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                                Public
                              </span>
                            ) : (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase">
                                Hidden
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {assignedSports.length > 0
                              ? assignedSports.map((s) => s.name).join(", ")
                              : "None assigned"}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteLead(l.id)}
                              className="p-1 rounded text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: RULES */}
          {activeTab === "rules" && (
            <div className="space-y-6">
              {/* Create Rule */}
              <div className="bg-white p-6 rounded-xl border border-[#DCE7F2]">
                <h3 className="text-sm font-bold uppercase text-[#101D35] mb-4">Create / Publish New Rule</h3>
                <form onSubmit={handleCreateRule} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Rule Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Over Limit Rule"
                        value={newRule.title}
                        onChange={(e) => setNewRule({ ...newRule, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Sport Association</label>
                      <select
                        value={newRule.sport_id}
                        onChange={(e) => setNewRule({ ...newRule, sport_id: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                      >
                        <option value="">General Competition Rules (All Sports)</option>
                        {sports.map((sp) => (
                          <option key={sp.id} value={sp.id}>{sp.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Category</label>
                      <select
                        value={newRule.category}
                        onChange={(e) => setNewRule({ ...newRule, category: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                      >
                        <option value="General">General</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Eligibility">Eligibility</option>
                        <option value="Penalties">Penalties</option>
                        <option value="Scoring">Scoring</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Rule Content & Instructions</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write exact bylaws, disqualification thresholds, or scoring instructions..."
                      value={newRule.content}
                      onChange={(e) => setNewRule({ ...newRule, content: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2 px-6 rounded bg-[#1769AA] text-white text-xs font-bold uppercase hover:bg-[#101D35] transition-colors"
                  >
                    + Publish Rule to Public Site
                  </button>
                </form>
              </div>

              {/* Rules List */}
              <div className="bg-white rounded-xl border border-[#DCE7F2] overflow-hidden">
                <div className="p-4 bg-[#F4F7FB] border-b border-[#DCE7F2] text-xs font-mono font-bold text-slate-600">
                  {rules.length} Published Competition Bylaws
                </div>
                <div className="divide-y divide-[#DCE7F2]">
                  {rules.map((r) => (
                    <div key={r.id} className="p-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DCE7F2] text-[#1769AA] font-bold">
                            {r.category}
                          </span>
                          <span className="text-xs font-bold text-[#101D35]">{r.title}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{r.content}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteRule(r.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REGISTRATIONS */}
          {activeTab === "registrations" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-[#DCE7F2] overflow-hidden">
                <div className="p-4 bg-[#F4F7FB] border-b border-[#DCE7F2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-700 block">
                      {registrations.length} Total Submissions
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Verified student enrollment database
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#233653] hover:bg-[#1769AA] text-white font-mono font-bold uppercase text-[11px] transition-colors shadow-sm">
                      <span>↑ Bulk Import CSV</span>
                      <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const text = await file.text();
                          const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
                          if (lines.length < 2) {
                            showNotification("CSV must contain a header row and data rows", "error");
                            return;
                          }
                          // parse CSV lines into records
                          const rows: any[] = [];
                          for (let i = 1; i < lines.length; i++) {
                            const cols = lines[i].split(",").map(c => c.replace(/^"|"$/g, '').trim());
                            if (cols.length >= 3) {
                              rows.push({
                                sport_id: cols[0] || "sp-cricket-m",
                                team_name: cols[1] || "Imported Squad",
                                captain_name: cols[2] || "Participant",
                                captain_reg_no: cols[3] || "2023-CS-000",
                                department: cols[4] || "Computer Science",
                                semester: cols[5] || "1st",
                                contact_number: cols[6] || "",
                                email: cols[7] || "",
                              });
                            }
                          }

                          const res = await fetch("/api/gala?action=bulk-import-registrations", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ data: { rows } }),
                          });

                          if (res.ok) {
                            showNotification(`Bulk imported ${rows.length} registrations!`);
                            loadAllData();
                          } else {
                            showNotification("Failed to bulk import registrations", "error");
                          }
                          e.target.value = "";
                        }}
                      />
                    </label>

                    <a
                      href="/api/admin/export-registrations"
                      download
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#101D35] hover:bg-[#1769AA] text-white font-mono font-bold uppercase text-[11px] transition-colors shadow-sm"
                    >
                      <span>↓ Download CSV Export</span>
                    </a>
                  </div>
                </div>

                {registrations.length === 0 ? (
                  <div className="p-12 text-center text-xs text-slate-400 font-mono">
                    No registrations submitted yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#101D35] text-white uppercase font-mono text-[11px]">
                        <tr>
                          <th className="py-3 px-4">Ref ID</th>
                          <th className="py-3 px-4">Team / Captain</th>
                          <th className="py-3 px-4">UET Reg No</th>
                          <th className="py-3 px-4">Contact</th>
                          <th className="py-3 px-4">Sport</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DCE7F2]">
                        {registrations.map((reg) => (
                          <tr key={reg.id} className="hover:bg-[#F4F7FB]">
                            <td className="py-3 px-4 font-mono text-slate-500">{reg.id.substring(0, 10)}...</td>
                            <td className="py-3 px-4 font-bold text-[#101D35]">
                              {reg.team_name || "Individual"}
                              <span className="block text-[10px] font-normal text-slate-500">
                                Capt: {reg.captain_name} ({reg.semester})
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono">{reg.captain_reg_no}</td>
                            <td className="py-3 px-4 text-slate-600">
                              {reg.contact_number}
                              <span className="block text-[10px] text-slate-400">{reg.email}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#DCE7F2] text-[#1769AA] font-bold">
                                {sports.find(s => s.id === reg.sport_id)?.name || reg.sport_id}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  reg.status === "Approved"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : reg.status === "Rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {reg.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right space-x-1">
                              <button
                                onClick={() => handleRegistrationStatus(reg.id, "Approved")}
                                className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold uppercase hover:bg-emerald-700"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRegistrationStatus(reg.id, "Rejected")}
                                className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold uppercase hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: SCHEDULE & SCORES */}
          {activeTab === "competitions" && (
            <div className="space-y-6">
              {/* Create fixture */}
              <div className="bg-white p-6 rounded-xl border border-[#DCE7F2]">
                <h3 className="text-sm font-bold uppercase text-[#101D35] mb-4">Create Competition Fixture</h3>
                <form onSubmit={handleCreateCompetition} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Match Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cricket Semi Final"
                      value={newCompetition.title}
                      onChange={(e) => setNewCompetition({ ...newCompetition, title: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Sport</label>
                    <select
                      value={newCompetition.sport_id}
                      onChange={(e) => setNewCompetition({ ...newCompetition, sport_id: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    >
                      <option value="">Select Sport...</option>
                      {sports.map((sp) => (
                        <option key={sp.id} value={sp.id}>{sp.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Team A</label>
                    <input
                      type="text"
                      placeholder="Team A Name"
                      value={newCompetition.team_a}
                      onChange={(e) => setNewCompetition({ ...newCompetition, team_a: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Team B</label>
                    <input
                      type="text"
                      placeholder="Team B Name"
                      value={newCompetition.team_b}
                      onChange={(e) => setNewCompetition({ ...newCompetition, team_b: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div className="sm:col-span-4 flex justify-end">
                    <button
                      type="submit"
                      className="py-2 px-6 rounded bg-[#1769AA] text-white text-xs font-bold uppercase hover:bg-[#101D35] transition-colors"
                    >
                      + Save Match Fixture
                    </button>
                  </div>
                </form>
              </div>

              {/* Enter Live Scores & Outcome */}
              <div className="space-y-4">
                {competitions.map((comp) => (
                  <div key={comp.id} className="bg-white p-5 rounded-xl border border-[#DCE7F2] shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F4F7FB] gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#1769AA] font-bold">
                          {sports.find(s => s.id === comp.sport_id)?.name || "Sport"}
                        </span>
                        <h4 className="font-extrabold text-[#101D35]">{comp.title}</h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500 uppercase">Status: {comp.status}</span>
                    </div>

                    <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                      <div className="text-center sm:text-left">
                        <span className="text-xs text-slate-400 block font-mono">CONTENDER A</span>
                        <span className="font-bold text-sm text-[#101D35]">{comp.team_a || "TBD"}</span>
                        <input
                          type="text"
                          defaultValue={comp.score_a || ""}
                          placeholder="Score A"
                          id={`score-a-${comp.id}`}
                          className="mt-2 w-24 px-2 py-1 text-center font-mono text-sm border rounded bg-[#F4F7FB]"
                        />
                      </div>

                      <div className="text-center">
                        <select
                          defaultValue={comp.status}
                          id={`status-${comp.id}`}
                          className="px-3 py-1.5 text-xs font-bold uppercase rounded border bg-white text-slate-700"
                        >
                          <option value="Upcoming">Upcoming</option>
                          <option value="Live">Live</option>
                          <option value="Completed">Completed</option>
                          <option value="Postponed">Postponed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="text-center sm:text-right">
                        <span className="text-xs text-slate-400 block font-mono">CONTENDER B</span>
                        <span className="font-bold text-sm text-[#101D35]">{comp.team_b || "TBD"}</span>
                        <input
                          type="text"
                          defaultValue={comp.score_b || ""}
                          placeholder="Score B"
                          id={`score-b-${comp.id}`}
                          className="mt-2 w-24 px-2 py-1 text-center font-mono text-sm border rounded bg-[#F4F7FB]"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#F4F7FB] flex justify-end">
                      <button
                        onClick={() => {
                          const sA = (document.getElementById(`score-a-${comp.id}`) as HTMLInputElement)?.value;
                          const sB = (document.getElementById(`score-b-${comp.id}`) as HTMLInputElement)?.value;
                          const st = (document.getElementById(`status-${comp.id}`) as HTMLSelectElement)?.value as any;
                          handleUpdateScore(comp, sA, sB, st);
                        }}
                        className="py-1.5 px-4 rounded bg-[#1769AA] text-white text-xs font-bold uppercase hover:bg-[#101D35]"
                      >
                        Publish Verified Score & Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SESSIONS */}
          {activeTab === "sessions" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-[#DCE7F2]">
                <h3 className="text-sm font-bold uppercase text-[#101D35] mb-4">Create Future Sports Gala Edition</h3>
                <form onSubmit={handleCreateSession} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Session Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Spring 2027"
                      value={newSession.name}
                      onChange={(e) => setNewSession({ ...newSession, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={newSession.start_date}
                      onChange={(e) => setNewSession({ ...newSession, start_date: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={newSession.end_date}
                      onChange={(e) => setNewSession({ ...newSession, end_date: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="py-2 px-6 rounded bg-[#1769AA] text-white text-xs font-bold uppercase hover:bg-[#101D35] transition-colors"
                    >
                      + Initialize Gala Session
                    </button>
                  </div>
                </form>
              </div>

              {/* Sessions Table */}
              <div className="bg-white rounded-xl border border-[#DCE7F2] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#101D35] text-white uppercase font-mono text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Session Name</th>
                      <th className="py-3 px-4">Dates</th>
                      <th className="py-3 px-4">State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7F2]">
                    {sessions.map((ses) => (
                      <tr key={ses.id} className="hover:bg-[#F4F7FB]">
                        <td className="py-3 px-4 font-bold text-[#101D35]">{ses.name}</td>
                        <td className="py-3 px-4 text-slate-600 font-mono">
                          {ses.start_date} to {ses.end_date}
                        </td>
                        <td className="py-3 px-4">
                          {ses.is_active ? (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold uppercase">
                              Active Current Event
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-bold uppercase">
                              Historical Record
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: SCORING SETTINGS */}
          {activeTab === "scoring" && scoringSettings && (
            <div className="bg-white p-6 rounded-xl border border-[#DCE7F2] max-w-xl">
              <h3 className="text-sm font-bold uppercase text-[#101D35] mb-2">Configure Medal Points Multipliers</h3>
              <p className="text-xs text-slate-500 mb-6">
                Leaderboards compute standings deterministically based on these point weights. Changing them recalculates championship standings.
              </p>

              <form onSubmit={handleUpdateScoring} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Gold Medal Points</label>
                  <input
                    type="number"
                    value={scoringSettings.gold_points}
                    onChange={(e) => setScoringSettings({ ...scoringSettings, gold_points: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border rounded bg-[#F4F7FB] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Silver Medal Points</label>
                  <input
                    type="number"
                    value={scoringSettings.silver_points}
                    onChange={(e) => setScoringSettings({ ...scoringSettings, silver_points: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border rounded bg-[#F4F7FB] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Bronze Medal Points</label>
                  <input
                    type="number"
                    value={scoringSettings.bronze_points}
                    onChange={(e) => setScoringSettings({ ...scoringSettings, bronze_points: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border rounded bg-[#F4F7FB] font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-[#1769AA] text-white text-xs font-bold uppercase hover:bg-[#101D35] transition-colors"
                >
                  Save & Recalculate Leaderboard
                </button>
              </form>
            </div>
          )}

          {/* TAB 9: ANNOUNCEMENTS */}
          {activeTab === "announcements" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-[#DCE7F2]">
                <h3 className="text-sm font-bold uppercase text-[#101D35] mb-4">Publish Announcement Notice</h3>
                <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Notice Title</label>
                      <input
                        type="text"
                        required
                        placeholder="Notice heading..."
                        value={newAnnouncement.title}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Category Tag</label>
                      <select
                        value={newAnnouncement.tag}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, tag: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                      >
                        <option value="General">General</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Schedule">Schedule Change</option>
                        <option value="Results">Results Alert</option>
                        <option value="Registration">Registration Notice</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Message Content</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Public notice details to broadcast on the website..."
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#DCE7F2] bg-[#F4F7FB]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-6 rounded bg-[#1769AA] text-white text-xs font-bold uppercase hover:bg-[#101D35]"
                  >
                    Broadcast Announcement
                  </button>
                </form>
              </div>

              {/* Published Announcements */}
              <div className="bg-white rounded-xl border border-[#DCE7F2] divide-y divide-[#DCE7F2]">
                {announcements.map((anc) => (
                  <div key={anc.id} className="p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DCE7F2] text-[#1769AA] font-bold uppercase">
                        {anc.tag}
                      </span>
                      <h4 className="text-xs font-bold text-[#101D35] mt-1">{anc.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{anc.content}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(anc.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: AUDIT LOGS */}
          {activeTab === "audit" && (
            <div className="bg-white rounded-xl border border-[#DCE7F2] overflow-hidden">
              <div className="p-4 bg-[#F4F7FB] border-b border-[#DCE7F2] text-xs font-mono font-bold text-slate-700">
                Administrative Audit Trail (Immutable Verification Log)
              </div>
              <div className="divide-y divide-[#DCE7F2] max-h-[600px] overflow-y-auto text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-[#F4F7FB] flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-[#1769AA] text-[11px] block">{log.action}</span>
                      <span className="text-slate-700">{log.details}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[10px] shrink-0 ml-4">
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: SETTINGS */}
          {activeTab === "settings" && eventSettings && (
            <div className="bg-white p-6 rounded-xl border border-[#DCE7F2] max-w-xl">
              <h3 className="text-sm font-bold uppercase text-[#101D35] mb-4">Event Branding & Account Notes</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const res = await fetch("/api/gala?action=update-settings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ entity: "eventSettings", data: eventSettings }),
                  });
                  if (res.ok) showNotification("Event branding & settings saved.");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Event Name</label>
                  <input
                    type="text"
                    value={eventSettings.event_name}
                    onChange={(e) => setEventSettings({ ...eventSettings, event_name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded bg-[#F4F7FB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Event Dates</label>
                  <input
                    type="text"
                    value={eventSettings.event_dates}
                    onChange={(e) => setEventSettings({ ...eventSettings, event_dates: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded bg-[#F4F7FB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Main Arena Venue</label>
                  <input
                    type="text"
                    value={eventSettings.venue}
                    onChange={(e) => setEventSettings({ ...eventSettings, venue: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded bg-[#F4F7FB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Event Accounts / Sensitive Administrative Notes (Strictly Hidden From Public Site)
                  </label>
                  <textarea
                    rows={3}
                    value={eventSettings.admin_account_notes || ""}
                    onChange={(e) => setEventSettings({ ...eventSettings, admin_account_notes: e.target.value })}
                    placeholder="Enter confidential organizer bank account details or operational remarks..."
                    className="w-full px-3 py-2 text-xs border rounded bg-[#F4F7FB]"
                  />
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-6 rounded bg-[#1769AA] text-white text-xs font-bold uppercase hover:bg-[#101D35] transition-colors"
                >
                  Save Global Settings
                </button>
              </form>

              {/* Password Management Card */}
              <div className="mt-8 pt-8 border-t border-[#DCE7F2]">
                <h3 className="text-sm font-bold uppercase text-[#101D35] mb-2">Change Administrator Password</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Update your authentication credentials for the Arena Control Panel.
                </p>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const curInput = (document.getElementById("current-pass") as HTMLInputElement)?.value;
                    const newInput = (document.getElementById("new-pass") as HTMLInputElement)?.value;
                    const confirmInput = (document.getElementById("confirm-pass") as HTMLInputElement)?.value;

                    if (!curInput || !newInput) {
                      showNotification("Please fill in both current and new password fields.", "error");
                      return;
                    }

                    if (newInput !== confirmInput) {
                      showNotification("New password and confirmation do not match.", "error");
                      return;
                    }

                    const res = await fetch("/api/auth/change-password", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ currentPassword: curInput, newPassword: newInput }),
                    });

                    const data = await res.json();
                    if (!res.ok) {
                      showNotification(data.error || "Failed to change password", "error");
                    } else {
                      showNotification("Password successfully updated!");
                      (document.getElementById("current-pass") as HTMLInputElement).value = "";
                      (document.getElementById("new-pass") as HTMLInputElement).value = "";
                      (document.getElementById("confirm-pass") as HTMLInputElement).value = "";
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      id="current-pass"
                      required
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 text-xs border rounded bg-[#F4F7FB]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">New Password</label>
                      <input
                        type="password"
                        id="new-pass"
                        required
                        placeholder="At least 8 characters"
                        className="w-full px-3 py-2 text-xs border rounded bg-[#F4F7FB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirm-pass"
                        required
                        placeholder="Re-enter new password"
                        className="w-full px-3 py-2 text-xs border rounded bg-[#F4F7FB]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded bg-[#233653] hover:bg-[#1769AA] text-white text-xs font-bold uppercase transition-colors"
                  >
                    Update Admin Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
