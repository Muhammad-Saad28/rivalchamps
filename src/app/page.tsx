"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Bell, 
  ChevronRight, 
  Radio, 
  Flame, 
  Sparkles,
  Users,
  Shield,
  Layers,
  Award,
  Zap,
  Target,
  Clock,
  Activity,
  CheckCircle2,
  ChevronLeft,
  BookOpen,
  MessageCircle,
  Phone,
  Search
} from "lucide-react";
import confetti from "canvas-confetti";
import { Sport, Announcement, Competition, Lead, Rule } from "@/types";
import { initialSports } from "@/lib/data";

export default function HomePage() {
  const [data, setData] = useState<{
    sports: (Sport & { leadIds: string[] })[];
    leads: Lead[];
    rules: Rule[];
    competitions: Competition[];
    announcements: Announcement[];
  } | null>(null);

  const [selectedSportId, setSelectedSportId] = useState<string>("");
  const [sportFilterCategory, setSportFilterCategory] = useState<string>("All");

  const [loading, setLoading] = useState(true);

  // Exact Countdown matching design
  const [countdown, setCountdown] = useState({
    days: 48,
    hours: 12,
    minutes: 36,
    seconds: 27,
  });

  useEffect(() => {
    fetch("/api/gala")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (json.sports && json.sports.length > 0) {
          setSelectedSportId(json.sports[0].id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gala fetch error", err);
        setLoading(false);
      });

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerBlast = () => {
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#247BFF", "#398BFF", "#BBD8FF", "#FFFFFF"],
    });
  };

  const carouselRef = useRef<HTMLDivElement>(null);

  // 3D Gyroscope/Tilt interaction for Hero Image
  const [tilt, setTilt] = useState({ x: 0, y: 0, rx: 0, ry: 0, isHovered: false });
  const heroCardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gyroscope tilt angles (-18 to +18 deg)
    const rotateY = ((x - centerX) / centerX) * 16;
    const rotateX = -((y - centerY) / centerY) * 16;
    // Perspective light position offset
    const posX = ((x - centerX) / centerX) * 20;
    const posY = ((y - centerY) / centerY) * 20;

    setTilt({ x: posX, y: posY, rx: rotateX, ry: rotateY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, rx: 0, ry: 0, isHovered: false });
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const sportsList = (data?.sports && data.sports.length > 0) ? data.sports : initialSports;
  const leadsList = data?.leads || [];
  const rulesList = data?.rules || [];

  const activeSport = sportsList.find((s) => s.id === selectedSportId) || sportsList[0];
  const activeSportLeads = leadsList.filter((l) => activeSport?.leadIds?.includes(l.id));
  const activeSportRules = rulesList.filter((r) => r.sport_id === activeSport?.id);

  const formatWhatsAppUrl = (phone?: string) => {
    if (!phone) return null;
    const cleanNumber = phone.replace(/[^0-9]/g, "");
    const waNumber = cleanNumber.startsWith("0") ? "92" + cleanNumber.slice(1) : cleanNumber;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello! I'm inquiring about ${activeSport?.name || "Sports Gala 2026"}.`)}`;
  };

  const getSportIcon = (name: string, slug: string): string => {
    const s = (name + " " + slug).toLowerCase();
    if (s.includes("badminton")) return "🏸";
    if (s.includes("cricket")) return "🏏";
    if (s.includes("football") || s.includes("soccer")) return "⚽";
    if (s.includes("basketball")) return "🏀";
    if (s.includes("table-tennis") || s.includes("table tennis")) return "🏓";
    if (s.includes("chess")) return "♟️";
    if (s.includes("human ludo")) return "👥";
    if (s.includes("ludo")) return "🎲";
    if (s.includes("scavenger")) return "🧭";
    if (s.includes("tennis ball throw") || s.includes("throw")) return "🎾";
    if (s.includes("sack race")) return "🥔";
    if (s.includes("race") || s.includes("sprint")) return "🏃";
    if (s.includes("arm wrestling") || s.includes("arm-wrestling")) return "💪";
    if (s.includes("musical chair")) return "🪑";
    if (s.includes("weight")) return "⚖️";
    if (s.includes("height")) return "📏";
    if (s.includes("blindfold")) return "🙈";
    if (s.includes("tug of war") || s.includes("tug-of-war")) return "🪢";
    return "🏆";
  };

  // Top 5 Leaderboard Standings
  const topLeaderboard = [
    { rank: 1, team: "CS Warriors", points: 120, gold: 5, silver: 2, bronze: 1 },
    { rank: 2, team: "Tech Titans", points: 110, gold: 4, silver: 3, bronze: 1 },
    { rank: 3, team: "Engg Stars", points: 98, gold: 3, silver: 2, bronze: 2 },
    { rank: 4, team: "CS Legends", points: 90, gold: 3, silver: 1, bronze: 1 },
    { rank: 5, team: "UET Knights", points: 85, gold: 2, silver: 3, bronze: 1 },
  ];

  // Latest Announcements
  const announcementsList = [
    {
      date: "NOV 28",
      title: "Registration Deadline Extended!",
      desc: "You can now register until Nov 30, 2026.",
    },
    {
      date: "NOV 25",
      title: "Match Schedule Updated",
      desc: "Check the latest fixtures for all sports.",
    },
    {
      date: "NOV 20",
      title: "Welcome to UET CS Sports Gala 2026!",
      desc: "Let the games begin!",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090F] text-[#E1E2EB] flex flex-col font-sans selection:bg-[#247BFF] selection:text-white relative">
      <Navbar />

      {/* ======================================================== */}
      {/* 1. HERO SECTION */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden pt-12 pb-24 border-b border-[#BBD8FF]/15">
        {/* Hero Background Image & Overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/hero-bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/90 via-[#07090F]/65 to-[#07090F]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090F]/90 via-transparent to-[#07090F]/90" />
        </div>
        
        {/* Ambient atmospheric Gaussian blurs */}
        <div className="absolute top-[10%] right-[15%] w-[550px] h-[550px] bg-[#398BFF]/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] left-[10%] w-[450px] h-[450px] bg-[#afc6ff]/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div 
                onClick={triggerBlast}
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#11131A] border border-[#BBD8FF]/25 text-[#BBD8FF] text-xs font-mono font-bold tracking-widest uppercase hover:border-[#398BFF] transition-all shadow-[0_0_20px_rgba(36,123,255,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#398BFF]" />
                <span>CHAMPIONSHIP PLATFORM 2026</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#247BFF] animate-ping" />
              </div>

              <div>
                <h1 className="text-5xl sm:text-7xl font-black uppercase italic tracking-tight text-white leading-none font-sans drop-shadow-2xl">
                  BUILT TO COMPETE. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#247BFF] via-[#398BFF] to-[#BBD8FF] drop-shadow-[0_0_35px_rgba(57,139,255,0.5)]">
                    BORN TO WIN.
                  </span>
                </h1>
                
                <p className="mt-3 text-xs sm:text-sm font-mono uppercase tracking-widest text-[#BBD8FF] font-semibold">
                  ONE CAMPUS. COUNTLESS COMPETITORS. ONE CHAMPIONSHIP.
                </p>
              </div>

              {/* Event Metadata Chips */}
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-200 pt-1">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#111827] border border-[#BBD8FF]/20 shadow-[0_0_15px_rgba(36,123,255,0.2)]">
                    <Calendar className="w-4 h-4 text-[#247BFF]" />
                  </div>
                  <span className="font-bold uppercase tracking-wider font-mono text-white">DECEMBER 3–4, 2026</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#111827] border border-[#BBD8FF]/20 shadow-[0_0_15px_rgba(36,123,255,0.2)]">
                    <MapPin className="w-4 h-4 text-[#247BFF]" />
                  </div>
                  <span className="font-bold uppercase tracking-wider font-mono text-white">UET LAHORE</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/registration"
                  className="px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider btn-electric flex items-center gap-2"
                >
                  <span>REGISTER NOW</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </Link>

                <Link
                  href="/sports"
                  className="px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-obsidian-ghost"
                >
                  EXPLORE SPORTS
                </Link>
              </div>

            </div>

            {/* Right Column: 3D Gyroscope Hero Image */}
            <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-center">
              
              {/* 3D Gyroscopic Floating Container - Hero Athletes Showcase */}
              <div 
                ref={heroCardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-[680px] h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center cursor-pointer select-none"
                style={{ perspective: "1200px" }}
              >
                {/* Atmospheric Glow behind Image */}
                <div 
                  className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#247BFF]/35 to-[#398BFF]/45 blur-[100px] pointer-events-none transition-transform duration-300"
                  style={{
                    transform: `translate(${tilt.x * 1.5}px, ${tilt.y * 1.5}px)`
                  }}
                />

                {/* The 3D Gyroscope Transform Canvas */}
                <div 
                  className="relative w-full h-full flex items-center justify-center transition-all ease-out"
                  style={{
                    transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${tilt.isHovered ? "40px" : "0px"})`,
                    transformStyle: "preserve-3d",
                    transitionDuration: tilt.isHovered ? "120ms" : "600ms"
                  }}
                >
                  <img
                    src="/hero-image.png"
                    alt="UET CS Sports Gala Hero"
                    className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] filter contrast-105 scale-105 sm:scale-110 lg:scale-115 transition-transform duration-300"
                    style={{
                      transform: `translateZ(${tilt.isHovered ? "70px" : "25px"}) scale(${tilt.isHovered ? 1.05 : 1})`,
                      filter: `drop-shadow(${tilt.x * -1}px ${tilt.y * -1 + 30}px 40px rgba(36,123,255,0.45))`
                    }}
                  />

                  {/* Dynamic Shimmer Specular Light */}
                  {tilt.isHovered && (
                    <div 
                      className="absolute inset-0 pointer-events-none rounded-3xl opacity-40 mix-blend-overlay transition-opacity"
                      style={{
                        background: `radial-gradient(circle at ${50 + tilt.x * 2}% ${50 + tilt.y * 2}%, rgba(255,255,255,0.7) 0%, transparent 60%)`
                      }}
                    />
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. CHAMPIONSHIP DISCIPLINES SPORTS TICKER (MARQUEE) */}
      {/* ======================================================== */}
      <section className="relative py-4 z-10 overflow-hidden bg-[#0A0E18] border-y border-[#1E293B] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.8)]">
        {/* Deep, Rich Oceanic Night Blue Ambient Blooms */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Deep Navy/Midnight Blue base glow */}
          <div className="absolute -top-[60%] -left-[10%] w-[480px] h-[360px] bg-[#1E3A8A]/35 blur-[95px] rounded-full" />
          {/* Rich Cobalt Indigo bloom */}
          <div className="absolute -bottom-[60%] -right-[10%] w-[520px] h-[380px] bg-[#1D4ED8]/30 blur-[100px] rounded-full" />
          <div className="absolute top-[10%] left-[45%] w-[350px] h-[250px] bg-[#0284C7]/15 blur-[90px] rounded-full" />
        </div>

        {/* Soft edge gradient fades matching dark aesthetic */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#0A0E18] via-[#0A0E18]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#0A0E18] via-[#0A0E18]/80 to-transparent z-10 pointer-events-none" />

        <div className="w-full overflow-hidden select-none relative z-10">
          <div className="animate-sports-ltr flex items-center gap-3.5">
            {/* Double the list for infinite continuous left-to-right looping */}
            {[...sportsList, ...sportsList].map((sport, index) => {
              const icon = getSportIcon(sport.name, sport.slug);
              return (
                <div
                  key={`${sport.id || sport.slug}-${index}`}
                  className="gaussian-cloud-card shrink-0 flex flex-col items-center justify-center px-4 py-2.5 rounded-2xl min-w-[100px] pointer-events-none cursor-default shadow-md"
                >
                  <span className="relative z-10 text-2xl drop-shadow-sm">{icon}</span>
                  <span className="relative z-10 text-[11px] font-bold text-[#090D1A] mt-1.5 text-center whitespace-nowrap">
                    {sport.name.replace(/ — (Male|Female)/i, "")}
                  </span>
                  {sport.category && (
                    <span className="relative z-10 text-[8px] font-mono font-bold text-[#1D5AB8] uppercase tracking-widest mt-0.5">
                      {sport.category}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. TWO-COLUMN LAYOUT: GAMES DETAILS (RULES & LEADS) ON LEFT & LIVE UPDATES ON RIGHT */}
      {/* ======================================================== */}
      <section className="py-14 bg-[#07090F] border-b border-[#BBD8FF]/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: GAMES DETAILS (RULES & LEADS WITH WHATSAPP) - 7 COLS */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Main Games Details Gaussian Card */}
              <div className="gaussian-dark-card p-6 sm:p-7 border border-[#BBD8FF]/40 space-y-6">
                
                {/* Header: Title and Category Filter */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#BBD8FF]/30">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-50 border border-[#BBD8FF]/50 text-[#1D5AB8] shadow-sm">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black uppercase tracking-wider text-[#090D1A] font-sans">
                        GAMES &amp; DISCIPLINE DETAILS
                      </h3>
                      <p className="text-[11px] text-slate-600 font-medium">
                        Official match guidelines, discipline rules &amp; direct coordinator contacts
                      </p>
                    </div>
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-[#BBD8FF]/40 shrink-0 self-start sm:self-auto">
                    {["All", "Male", "Female"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSportFilterCategory(cat)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                          sportFilterCategory === cat
                            ? "bg-[#247BFF] text-white shadow-sm"
                            : "text-slate-600 hover:text-[#090D1A]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sport Selector Chips */}
                <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {sportsList
                    .filter((sp) => sportFilterCategory === "All" || sp.category === sportFilterCategory)
                    .map((sp) => {
                      const isSelected = sp.id === activeSport?.id;
                      return (
                        <button
                          key={sp.id}
                          onClick={() => setSelectedSportId(sp.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border ${
                            isSelected
                              ? "bg-gradient-to-r from-[#247BFF] to-[#398BFF] text-white border-transparent shadow-[0_4px_15px_rgba(36,123,255,0.35)]"
                              : "bg-white/80 hover:bg-white text-slate-700 border-[#BBD8FF]/40 hover:border-[#247BFF]/50"
                          }`}
                        >
                          <span>{getSportIcon(sp.name, sp.slug)}</span>
                          <span>{sp.name}</span>
                        </button>
                      );
                    })}
                </div>

                {/* Active Sport Overview Card */}
                {activeSport && (
                  <div className="relative z-10 space-y-5">
                    
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#BBD8FF]/40 shadow-sm space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getSportIcon(activeSport.name, activeSport.slug)}</span>
                          <div>
                            <h4 className="text-lg font-black uppercase text-[#090D1A] tracking-tight">
                              {activeSport.name}
                            </h4>
                            <span className="text-[10px] font-mono font-bold uppercase text-[#1D5AB8]">
                              Category: {activeSport.category} Tournament
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/sports/${activeSport.slug}`}
                          className="text-xs font-bold text-[#1D5AB8] hover:text-[#0272E4] transition-colors flex items-center gap-1 self-start sm:self-auto"
                        >
                          <span>View Full Arena Page</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {activeSport.description}
                      </p>

                      <div className="pt-2 border-t border-[#BBD8FF]/30 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#1D5AB8]" />
                          <strong className="text-[#090D1A]">Venue:</strong> {activeSport.venue}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-[#1D5AB8]" />
                          <strong className="text-[#090D1A]">Capacity:</strong> {activeSport.participation_limit} teams / athletes
                        </span>
                      </div>
                    </div>

                    {/* Rules & Guidelines Section */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#BBD8FF]/40 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#BBD8FF]/30">
                        <Shield className="w-4 h-4 text-[#1D5AB8]" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#090D1A]">
                          RULES &amp; REGULATIONS SUMMARY
                        </h4>
                      </div>

                      {activeSport.rules_summary ? (
                        <div className="p-3.5 rounded-xl bg-blue-50/60 border border-[#BBD8FF]/40 text-xs text-slate-800 leading-relaxed font-sans">
                          {activeSport.rules_summary}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-600 italic">
                          Standard collegiate rules apply. Direct match regulations will be announced by the referee.
                        </p>
                      )}

                      {/* Detailed Rules if available */}
                      {activeSportRules.length > 0 && (
                        <div className="space-y-2 pt-1">
                          {activeSportRules.map((rule) => (
                            <div key={rule.id} className="p-3 rounded-xl bg-white border border-[#BBD8FF]/40 text-xs">
                              <span className="text-[10px] font-mono font-bold uppercase text-[#1D5AB8] block mb-1">
                                {rule.title}
                              </span>
                              <p className="text-slate-700 leading-snug">{rule.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Appointed Sports Leads & Direct WhatsApp Section */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#BBD8FF]/40 shadow-sm space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#BBD8FF]/30">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#1D5AB8]" />
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#090D1A]">
                            APPOINTED SPORTS LEADS &amp; CONTACTS
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-[#1D5AB8] font-bold">
                          Click number for WhatsApp
                        </span>
                      </div>

                      {activeSportLeads.length === 0 ? (
                        <p className="text-xs text-slate-600 italic py-2">
                          Coordinators are being finalized for this discipline.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {activeSportLeads.map((lead) => {
                            const waUrl = formatWhatsAppUrl(lead.phone);
                            return (
                              <div
                                key={lead.id}
                                className="p-3.5 rounded-xl bg-white border border-[#BBD8FF]/40 hover:border-[#247BFF]/60 transition-all shadow-sm flex flex-col justify-between space-y-2"
                              >
                                <div>
                                  <span className="font-bold text-sm text-[#090D1A] block">
                                    {lead.name}
                                  </span>
                                  <span className="text-[10px] font-mono font-semibold uppercase text-[#1D5AB8] block">
                                    Discipline Coordinator
                                  </span>
                                </div>

                                {lead.phone ? (
                                  <div className="pt-2 border-t border-[#BBD8FF]/30">
                                    <a
                                      href={waUrl || `tel:${lead.phone}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#075E54] hover:text-[#128C7E] transition-all group w-full justify-between"
                                    >
                                      <span className="flex items-center gap-1.5 font-mono text-xs font-bold">
                                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                                        <span>{lead.phone}</span>
                                      </span>
                                      <span className="text-[9px] font-mono font-black uppercase text-[#25D366] bg-[#25D366]/15 px-1.5 py-0.5 rounded group-hover:bg-[#25D366] group-hover:text-white transition-all">
                                        CHAT
                                      </span>
                                    </a>
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-slate-400 italic">No phone listed</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* RIGHT COLUMN: LIVE UPDATES & MATCH TELEMETRY - 5 COLS */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="gaussian-dark-card p-6 sm:p-7 border border-[#BBD8FF]/40 flex flex-col justify-between space-y-5">
                
                {/* Header */}
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#BBD8FF]/30">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#1D5AB8]" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#090D1A]">
                      LIVE UPDATES
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#247BFF]/15 border border-[#247BFF]/40 text-[#164E9E] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#247BFF] electric-live-dot" />
                    LIVE
                  </span>
                </div>

                {/* Match 1: Football */}
                <div className="relative z-10 p-4 rounded-2xl bg-white/80 border border-[#BBD8FF]/40 space-y-2 shadow-sm hover:border-[#247BFF]/50 transition-colors">
                  <span className="text-[10px] font-mono font-bold text-[#1D5AB8] uppercase block">
                    Football — Male (Group Stage)
                  </span>
                  
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2 text-[#090D1A]">
                      <span className="text-base">⚽</span>
                      <span>CS Warriors</span>
                    </div>
                    <div className="px-3 py-1 rounded-md bg-white border border-[#247BFF]/30 text-[#164E9E] font-mono font-black text-sm shadow-inner">
                      1 - 0
                    </div>
                    <div className="flex items-center gap-2 text-right text-[#090D1A]">
                      <span>Tech Titans</span>
                      <span className="text-base">🛡️</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono text-slate-500">UET Main Ground</span>
                    <span className="text-[10px] font-mono text-[#1D5AB8] font-bold">32&apos;</span>
                  </div>
                </div>

                {/* Match 2: Basketball */}
                <div className="relative z-10 p-4 rounded-2xl bg-white/80 border border-[#BBD8FF]/40 space-y-2 shadow-sm hover:border-[#247BFF]/50 transition-colors">
                  <span className="text-[10px] font-mono font-bold text-[#1D5AB8] uppercase block">
                    Basketball — Female (Semi-Final)
                  </span>
                  
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2 text-[#090D1A]">
                      <span className="text-base">🏀</span>
                      <span>CS Queens</span>
                    </div>
                    <div className="px-3 py-1 rounded-md bg-white border border-[#247BFF]/30 text-[#164E9E] font-mono font-black text-sm shadow-inner">
                      12 - 9
                    </div>
                    <div className="flex items-center gap-2 text-right text-[#090D1A]">
                      <span>Engg Girls</span>
                      <span className="text-base">⭐</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono text-slate-500">Basketball Court 2</span>
                    <span className="text-[10px] font-mono text-[#1D5AB8] font-bold">Q2 (6:14)</span>
                  </div>
                </div>

                {/* Match 3: Badminton */}
                <div className="relative z-10 p-4 rounded-2xl bg-white/80 border border-[#BBD8FF]/40 space-y-2 shadow-sm hover:border-[#247BFF]/50 transition-colors">
                  <span className="text-[10px] font-mono font-bold text-[#1D5AB8] uppercase block">
                    Badminton — Male (Quarter-Final)
                  </span>
                  
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2 text-[#090D1A]">
                      <span className="text-base">🏸</span>
                      <span>Ahmad (CS)</span>
                    </div>
                    <div className="px-3 py-1 rounded-md bg-white border border-[#247BFF]/30 text-[#164E9E] font-mono font-black text-sm shadow-inner">
                      21 - 18
                    </div>
                    <div className="flex items-center gap-2 text-right text-[#090D1A]">
                      <span>Zubair (EE)</span>
                      <span className="text-base">⚡</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono text-slate-500">Gymnasium Court 1</span>
                    <span className="text-[10px] font-mono text-[#1D5AB8] font-bold">Set 2</span>
                  </div>
                </div>

                <div className="relative z-10 pt-2 text-right">
                  <Link
                    href="/schedule"
                    className="text-xs font-bold text-[#164E9E] hover:text-[#0272E4] transition-colors flex items-center justify-end gap-1"
                  >
                    <span>View Full Schedule &amp; Live Fixtures</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. CALL TO ACTION BANNER */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden py-10 bg-gradient-to-r from-[#0C0E14] via-[#111827] to-[#0C0E14] border-y border-[#BBD8FF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#11131A] border border-[#BBD8FF]/30 flex items-center justify-center shadow-[0_0_30px_rgba(36,123,255,0.35)] shrink-0">
              <Trophy className="w-9 h-9 text-[#247BFF]" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#BBD8FF] block">
                THE ULTIMATE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase italic text-white tracking-tight">
                SPORTS CHAMPIONSHIP
              </h2>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Compete. Represent. Make History.
              </p>
            </div>
          </div>

          <Link
            href="/registration"
            className="px-9 py-4 rounded-xl font-black text-xs uppercase tracking-wider btn-electric flex items-center gap-2 shadow-[0_0_30px_rgba(36,123,255,0.5)] shrink-0"
          >
            <span>JOIN THE CHAMPIONSHIP</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Link>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. ALL CARDS WITH EXACT GAUSSIAN BLUR EFFECT (USER IMAGE) */}
      {/* ======================================================== */}
      <section className="py-24 bg-[#07090F] border-b border-[#BBD8FF]/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#BBD8FF]">
              CHAMPIONSHIP ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mt-1.5 tracking-tight font-sans">
              Designed For Athletic Victory
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Equipped with live field arbitration, digital athlete credential verification, and comprehensive tournament telemetry.
            </p>
          </div>

          {/* Cards using EXACT GAUSSIAN CLOUD EFFECT from uploaded photo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Exact replica of user's uploaded image */}
            <div className="gaussian-cloud-card p-8 sm:p-10 flex flex-col justify-between min-h-[340px]">
              <div className="relative z-10 space-y-6">
                
                {/* Translucent Soft Blue Squircle Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#BBD8FF]/50 border border-[#93C5FD]/60 flex items-center justify-center text-[#0272E4] shadow-sm">
                  <Radio className="w-7 h-7" />
                </div>

                {/* Bold Heading */}
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#090D1A] tracking-tight leading-tight">
                  LIVE GROUND TELEMETRY
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  Field marshals update live scores, match minutes, cards, and foul commentary directly from the match pitch in real-time.
                </p>
              </div>

              {/* Bottom Soft Pill Tag */}
              <div className="relative z-10 pt-6">
                <span className="cloud-card-badge">
                  100% REAL-TIME DB SYNC
                </span>
              </div>
            </div>

            {/* Card 2: QR Athlete Passes */}
            <div className="gaussian-cloud-card p-8 sm:p-10 flex flex-col justify-between min-h-[340px]">
              <div className="relative z-10 space-y-6">
                
                <div className="w-14 h-14 rounded-2xl bg-[#BBD8FF]/50 border border-[#93C5FD]/60 flex items-center justify-center text-[#0272E4] shadow-sm">
                  <Shield className="w-7 h-7" />
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#090D1A] tracking-tight leading-tight">
                  DIGITAL ATHLETE PASSES
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  Instant QR-coded credentials guarantee that only verified, currently enrolled Computer Science students step onto the pitch.
                </p>
              </div>

              <div className="relative z-10 pt-6">
                <span className="cloud-card-badge">
                  STUDENT ID VERIFIED
                </span>
              </div>
            </div>

            {/* Card 3: 6-Session Historical Archives */}
            <div className="gaussian-cloud-card p-8 sm:p-10 flex flex-col justify-between min-h-[340px]">
              <div className="relative z-10 space-y-6">
                
                <div className="w-14 h-14 rounded-2xl bg-[#BBD8FF]/50 border border-[#93C5FD]/60 flex items-center justify-center text-[#0272E4] shadow-sm">
                  <Layers className="w-7 h-7" />
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#090D1A] tracking-tight leading-tight">
                  HISTORICAL ARCHIVES
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  Track batch rivalries across 6 sessions from 2023 through 2026 with point shifts and interactive medal distribution analytics.
                </p>
              </div>

              <div className="relative z-10 pt-6">
                <span className="cloud-card-badge">
                  2023 TO 2026 ARCHIVE
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. TOURNAMENT VENUES WITH GAUSSIAN DIFFUSION */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#0C0E14] border-b border-[#BBD8FF]/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#BBD8FF]">
                COLLEGIATE GROUNDS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1">
                Official Tournament Venues
              </h2>
            </div>
            <Link
              href="/sports"
              className="text-xs font-bold uppercase tracking-wider text-[#BBD8FF] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All 24 Venues</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Main Cricket Ground", sport: "Hardball & Tapeball Turf", capacity: "1,500 Spectators", img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop" },
              { name: "Indoor Gymnasium & Courts", sport: "Badminton, Table Tennis & Arm Wrestling", capacity: "600 Spectators", img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop" },
              { name: "Main Football Ground Arena", sport: "11v11 Turf & 7v7 Futsal", capacity: "2,000 Spectators", img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop" },
              { name: "CS Department Activity Center", sport: "Chess, Ludo & Mind Sports", capacity: "300 Participants", img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=600&auto=format&fit=crop" },
            ].map((venue, idx) => (
              <div key={idx} className="gaussian-dark-card overflow-hidden border border-[#BBD8FF]/40 flex flex-col group shadow-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img src={venue.img} alt={venue.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#111827]/90 border border-[#BBD8FF]/40 text-[10px] font-mono text-white font-bold">
                    OFFICIAL VENUE
                  </span>
                </div>
                <div className="relative z-10 p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="font-bold text-[#090D1A] text-sm leading-snug group-hover:text-[#164E9E] transition-colors">{venue.name}</h4>
                    <p className="text-xs text-[#1D5AB8] font-mono mt-1 font-semibold">{venue.sport}</p>
                  </div>
                  <div className="pt-2 border-t border-[#BBD8FF]/20 text-[11px] text-slate-500 font-mono">
                    Capacity: {venue.capacity}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}