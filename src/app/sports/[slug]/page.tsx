"use client";

import React, { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, User, ArrowLeft, Trophy, CheckCircle, ArrowRight, BookOpen, Shield, Flame } from "lucide-react";
import BracketTree from "@/components/BracketTree";
import { Sport, Rule, Lead, Competition } from "@/types";
import { getSportImage } from "@/lib/images";

function SportDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [sport, setSport] = useState<(Sport & { leadIds: string[] }) | null>(null);
  const [assignedLeads, setAssignedLeads] = useState<Lead[]>([]);
  const [sportRules, setSportRules] = useState<Rule[]>([]);
  const [fixtures, setFixtures] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch("/api/gala")
      .then((res) => res.json())
      .then((json) => {
        const foundSport = (json.sports || []).find((s: any) => s.slug === slug);
        if (foundSport) {
          setSport(foundSport);
          const leads = (json.leads || []).filter((l: Lead) => foundSport.leadIds?.includes(l.id));
          setAssignedLeads(leads);
          const rules = (json.rules || []).filter((r: Rule) => r.sport_id === foundSport.id);
          setSportRules(rules);
          const comps = (json.competitions || []).filter((c: Competition) => c.sport_id === foundSport.id);
          setFixtures(comps);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sport detail fetch error", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center font-mono text-xs text-slate-400 flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-[#247BFF] border-t-transparent rounded-full animate-spin" />
        Loading Arena Specifications...
      </div>
    );
  }

  if (!sport) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-xl font-bold text-white">Sport Discipline Not Found</h2>
        <Link href="/sports" className="mt-4 inline-block px-6 py-2.5 rc-btn-primary rounded-xl text-xs font-bold uppercase">
          Back to Sports
        </Link>
      </div>
    );
  }

  const sportHeroImage = getSportImage(sport.slug, sport.category);

  return (
    <>
      {/* 4. SPORT DETAIL HERO - EXACT MATCH TO MOCKUP 4 */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-[#0C0E14] to-[#07090F] border-b border-[rgba(187,216,255,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#247BFF] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sports List</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Title, Rules • Format • Schedule, Description, [View Rules] Button */}
            <div className="lg:col-span-7 space-y-5">
              <span className="px-3 py-1 rounded-full bg-[#247BFF]/20 border border-[#247BFF]/40 text-[#247BFF] text-xs font-mono font-bold uppercase tracking-wider">
                {sport.category} Discipline
              </span>
              
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
                {sport.name}
              </h1>

              {/* Tagline matching Mockup 4 */}
              <p className="text-sm sm:text-base font-semibold text-[#F59E0B] tracking-wide">
                Rules • Format • Schedule
              </p>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                {sport.description || "A fast-paced competitive sport that brings out the best in you."}
              </p>

              {/* Action Buttons matching Mockup 4 */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="#rules"
                  className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider rc-btn-purple"
                >
                  View Rules
                </a>
                <Link
                  href={`/registration?sport=${sport.id}`}
                  className="px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider rc-btn-primary flex items-center gap-2"
                >
                  <span>Register Squad</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Arena Details */}
              <div className="pt-4 flex items-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#247BFF]" />
                  {sport.venue}
                </span>
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#F59E0B]" />
                  Capacity: {sport.participation_limit} Teams / Athletes
                </span>
              </div>
            </div>

            {/* Right Column: Sport Visual with Stadium Angle matching Mockup 4 */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-3xl overflow-hidden bg-[#0C0E14] border border-[#BBD8FF]/15 border border-[#398BFF]/30 shadow-[0_0_50px_rgba(217,70,239,0.2)]">
                <img
                  src={sportHeroImage}
                  alt={sport.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-bold uppercase tracking-wider font-mono text-[#247BFF]">{sport.name}</span>
                  <span className="px-2 py-0.5 rounded bg-[#07090F]/80 border border-[#247BFF]/30 text-[10px] uppercase font-mono font-bold text-[#F59E0B]">
                    OFFICIAL BRACKET
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Details & Rules */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12">
        
        {/* Tournament Bracket Tree */}
        <section className="bg-[#0C0E14] border border-[#BBD8FF]/15 rounded-2xl p-6 sm:p-8 border border-[rgba(187,216,255,0.15)]">
          <h2 className="text-xl font-bold uppercase text-white pb-4 border-b border-[rgba(187,216,255,0.15)] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#F59E0B]" />
            <span>Tournament Knockout Bracket</span>
          </h2>
          <div className="mt-6">
            <BracketTree competitions={fixtures} sportName={sport.name} />
          </div>
        </section>

        {/* Rules & Leads Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Rules Section */}
          <div id="rules" className="lg:col-span-2 bg-[#0C0E14] border border-[#BBD8FF]/15 rounded-2xl p-6 sm:p-8 border border-[rgba(187,216,255,0.15)] space-y-6">
            <h2 className="text-xl font-bold uppercase text-white pb-4 border-b border-[rgba(187,216,255,0.15)] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#247BFF]" />
              <span>Official Match Rules & Regulations</span>
            </h2>

            {sportRules.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 font-mono">
                Standard collegiate guidelines apply to this discipline. Final rule clarifications will be given during the captains' technical briefing.
              </div>
            ) : (
              <div className="space-y-4">
                {sportRules.map((r) => (
                  <div key={r.id} className="p-4 rounded-xl bg-[#0C0E14] border border-[rgba(187,216,255,0.15)] text-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#247BFF]/20 text-[#247BFF] font-bold uppercase">
                        {r.category}
                      </span>
                      <h4 className="font-bold text-white text-sm">{r.title}</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{r.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assigned Leads Sidebar */}
          <div className="bg-[#0C0E14] border border-[#BBD8FF]/15 rounded-2xl p-6 border border-[rgba(187,216,255,0.15)] space-y-4 h-fit">
            <h3 className="text-base font-bold uppercase text-white pb-3 border-b border-[rgba(187,216,255,0.15)] flex items-center gap-2">
              <User className="w-4 h-4 text-[#F59E0B]" />
              <span>Appointed Sports Leads</span>
            </h3>

            {assignedLeads.length === 0 ? (
              <p className="text-xs text-slate-400">Coordinators will be announced soon.</p>
            ) : (
              <div className="space-y-3">
                {assignedLeads.map((ld) => (
                  <div key={ld.id} className="p-3.5 rounded-xl bg-[#0C0E14] border border-[rgba(187,216,255,0.15)] space-y-1">
                    <span className="font-bold text-white text-sm block">{ld.name}</span>
                    <span className="text-[11px] text-[#247BFF] font-mono block">Field Coordinator</span>
                    {ld.phone && <span className="text-xs text-slate-400 block font-mono">{ld.phone}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default function SportDetailPage() {
  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col font-sans selection:bg-[#247BFF] selection:text-white">
      <Navbar />
      <Suspense fallback={<div className="py-24 text-center font-mono text-xs text-slate-500">Loading sport details...</div>}>
        <SportDetailContent />
      </Suspense>
      <Footer />
    </div>
  );
}