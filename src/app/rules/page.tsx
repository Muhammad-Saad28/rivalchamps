"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gavel, CheckSquare, Search, ChevronDown, ChevronUp, AlertCircle, Shield, Scale, ScrollText } from "lucide-react";
import { Rule, Sport } from "@/types";

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gala")
      .then((res) => res.json())
      .then((json) => {
        setRules(json.rules || []);
        setSports(json.sports || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Rules fetch error", err);
        setLoading(false);
      });
  }, []);

  const ruleCategories = [
    { id: "General", label: "General Rules", desc: "Universal collegiate athletic code of conduct" },
    { id: "Sport-Specific", label: "Sport-Specific Rules", desc: "Detailed tournament bylaws per discipline" },
    { id: "Conduct", label: "Code of Conduct", desc: "Sportsmanship and fair play guidelines" },
    { id: "Policies", label: "Event Policies", desc: "Attendance, ID verification and appeals" },
  ];

  const filteredRules = rules.filter((r) => {
    const matchesSport = selectedSport === "all" || (selectedSport === "general" ? !r.sport_id : r.sport_id === selectedSport);
    const matchesCategory = selectedCategory === "All" || r.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.content.toLowerCase().includes(search.toLowerCase());
    return matchesSport && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col font-sans selection:bg-[#247BFF] selection:text-white">
      <Navbar />

      {/* 7. RULES & REGULATIONS - EXACT MATCH TO MOCKUP 7 */}
      <section className="relative overflow-hidden pt-16 pb-16 bg-gradient-to-b from-[#0C0E14] to-[#07090F] border-b border-[rgba(187,216,255,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column matching Mockup 7 */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
                Rules & Regulations
              </h1>

              {/* Checklist items with golden checkboxes matching Mockup 7 */}
              <div className="space-y-4 pt-2">
                {ruleCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedCategory(cat.id === "General" ? "General" : "All")}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#0C0E14] border border-[rgba(187,216,255,0.15)] hover:border-[#247BFF]/50 transition-all cursor-pointer group"
                  >
                    <CheckSquare className="w-5 h-5 text-[#F59E0B] shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-[#247BFF] transition-colors">
                        {cat.label}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic: 3D Judge Gavel & Pedestal matching Mockup 7 */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-square rounded-3xl overflow-hidden bg-[#0C0E14] border border-[#BBD8FF]/15 border border-[#398BFF]/30 p-8 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(217,70,239,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#111827] to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#F59E0B]/20 rounded-full blur-[70px] pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#F97316]/30 via-[#F59E0B]/30 to-[#247BFF]/20 border border-[#F59E0B]/50 flex items-center justify-center shadow-lg mb-4">
                    <Gavel className="w-16 h-16 text-[#F59E0B] -rotate-12" />
                  </div>
                  <h3 className="text-lg font-black uppercase text-white tracking-wide">
                    Fair Play Arbitration
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Disciplinary committee bylaws ratified for collegiate sports gala.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RULES ACCORDION CONTAINER */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-6">
        
        {/* Notice Disclaimer */}
        <div className="p-4 rounded-xl bg-[#111827] border border-[#F59E0B]/40 text-xs text-slate-200 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-[#F59E0B] shrink-0" />
          <span>
            <strong>Official Collegiate Rules Notice:</strong> All rules below are standard collegiate regulations pending Sports Committee ratification on match day.
          </span>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search rule clauses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#0C0E14] border border-[rgba(187,216,255,0.15)] text-white placeholder-slate-400 focus:outline-none focus:border-[#247BFF]"
            />
          </div>

          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 text-xs rounded-xl bg-[#0C0E14] border border-[rgba(187,216,255,0.15)] text-white focus:outline-none focus:border-[#247BFF] cursor-pointer"
          >
            <option value="all">All Disciplines</option>
            <option value="general">General Event Rules</option>
            {sports.map((sp) => (
              <option key={sp.id} value={sp.id}>
                {sp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rules Accordion List */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-mono">Loading rules...</div>
        ) : filteredRules.length === 0 ? (
          <div className="p-12 text-center bg-[#0C0E14] border border-[#BBD8FF]/15 rounded-2xl">
            <ScrollText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="text-base font-bold text-white">No Rules Match Your Filter</h4>
            <p className="text-xs text-slate-400 mt-1">Please adjust your search or category selection.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRules.map((rule) => {
              const isExpanded = expandedRule === rule.id;
              return (
                <div
                  key={rule.id}
                  className="rounded-2xl bg-[#0C0E14] border border-[rgba(187,216,255,0.15)] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#111827]/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#247BFF]/20 text-[#247BFF] text-[10px] font-mono font-bold uppercase tracking-wider">
                        {rule.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white">{rule.title}</h4>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-300 border-t border-[rgba(187,216,255,0.15)]/60 leading-relaxed">
                      {rule.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}