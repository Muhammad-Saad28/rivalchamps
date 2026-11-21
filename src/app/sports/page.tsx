"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, ChevronRight, Search, Users } from "lucide-react";
import { Sport } from "@/types";
import { getSportImage } from "@/lib/images";

export default function SportsPage() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Team" | "Individual">("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/gala")
      .then((res) => res.json())
      .then((json) => {
        setSports(json.sports || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading sports list", err);
        setLoading(false);
      });
  }, []);

  const isIndividualSport = (sport: Sport) => {
    const individualSlugs = ["table-tennis", "chess", "badminton", "arm-wrestling", "snooker", "sprint", "pushups"];
    return individualSlugs.some((s) => sport.slug.toLowerCase().includes(s)) || sport.participation_limit <= 2;
  };

  const filteredSports = sports.filter((sp) => {
    const matchesSearch = sp.name.toLowerCase().includes(search.toLowerCase()) || sp.description.toLowerCase().includes(search.toLowerCase());
    if (filter === "All") return matchesSearch;
    if (filter === "Individual") return matchesSearch && isIndividualSport(sp);
    if (filter === "Team") return matchesSearch && !isIndividualSport(sp);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col font-sans selection:bg-[#247BFF] selection:text-white">
      <Navbar />

      {/* 3. SPORTS LIST HERO */}
      <section className="relative overflow-hidden pt-16 pb-12 bg-gradient-to-b from-[#0C0E14] to-[#07090F] border-b border-[#BBD8FF]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
            Our Sports
          </h1>
          <p className="mt-3 text-[#BBD8FF] text-xs sm:text-sm max-w-lg mx-auto font-mono uppercase tracking-wider font-semibold">
            Choose your battleground from 24 official sports disciplines.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {(["All", "Team", "Individual"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === tab
                    ? "bg-[#247BFF] text-white shadow-[0_0_20px_rgba(36,123,255,0.6)]"
                    : "bg-[#111827] text-slate-300 hover:bg-[#1f293d] border border-[#BBD8FF]/20"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#BBD8FF] absolute left-4 top-3" />
            <input
              type="text"
              placeholder="Search sports disciplines or rules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#111827] border border-[#BBD8FF]/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#398BFF] focus:shadow-[0_0_15px_rgba(36,123,255,0.3)]"
            />
          </div>
        </div>
      </section>

      {/* SPORTS GRID */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {loading ? (
          <div className="text-center py-24 text-slate-400 font-mono flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-[#247BFF] border-t-transparent rounded-full animate-spin" />
            Loading sports arena...
          </div>
        ) : filteredSports.length === 0 ? (
          <div className="text-center py-20 gaussian-dark-card rounded-2xl p-8 max-w-md mx-auto border border-[#BBD8FF]/30">
            <Trophy className="w-10 h-10 text-[#247BFF] mx-auto mb-2" />
            <h3 className="text-lg font-bold text-[#090D1A]">No Sports Found</h3>
            <p className="text-xs text-slate-600 mt-1">Try clearing your search term or switching filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSports.map((sp) => {
              const img = getSportImage(sp.slug, sp.category);
              return (
                <Link
                  key={sp.id}
                  href={`/sports/${sp.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-[#0C0E14] border border-[#BBD8FF]/15 hover:border-[#398BFF] transition-all flex flex-col shadow-lg hover:shadow-[0_0_25px_rgba(36,123,255,0.25)] hover:-translate-y-1"
                >
                  {/* Photo with Dark Overlay and Glow */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111827]">
                    <img
                      src={img}
                      alt={sp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E14] via-transparent to-transparent opacity-90" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#111827]/90 border border-[#BBD8FF]/25 text-[10px] font-mono font-bold uppercase tracking-wider text-[#BBD8FF]">
                      {sp.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#BBD8FF] transition-colors">
                        {sp.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {sp.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#BBD8FF]/10 flex items-center justify-between text-xs text-[#398BFF]">
                      <span className="text-slate-400 text-[11px] truncate mr-2">{sp.venue}</span>
                      <div className="flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform shrink-0">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}