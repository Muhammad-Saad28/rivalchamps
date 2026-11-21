"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Trophy, BookOpen, Users, Calendar, ArrowRight, X } from "lucide-react";
import { Sport, Rule, Lead, Competition } from "@/types";

export default function GlobalSearchModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<{
    sports: Sport[];
    rules: Rule[];
    leads: Lead[];
    competitions: Competition[];
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && !data) {
      fetch("/api/gala")
        .then((res) => res.json())
        .then((json) => {
          setData({
            sports: json.sports || [],
            rules: json.rules || [],
            leads: json.leads || [],
            competitions: json.competitions || [],
          });
        })
        .catch((e) => console.error("Search data load error", e));
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingSports = q && data
    ? data.sports.filter((s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)).slice(0, 4)
    : [];

  const matchingRules = q && data
    ? data.rules.filter((r) => r.title.toLowerCase().includes(q) || r.content.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const matchingLeads = q && data
    ? data.leads.filter((l) => l.name.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const matchingCompetitions = q && data
    ? data.competitions.filter((c) => c.title.toLowerCase().includes(q) || c.team_a?.toLowerCase().includes(q) || c.team_b?.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const totalResults = matchingSports.length + matchingRules.length + matchingLeads.length + matchingCompetitions.length;

  const navigateTo = (path: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-2xl border border-[#DCE7F2] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#DCE7F2] flex items-center gap-3 bg-[#F4F7FB]">
          <Search className="w-5 h-5 text-[#1769AA]" />
          <input
            type="text"
            autoFocus
            placeholder="Search sports, rules, coordinators, matches (e.g. 'cricket', 'badminton', 'pass', 'lead')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-[#101D35] focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[450px] overflow-y-auto p-4 space-y-4 text-xs">
          {!q ? (
            <div className="py-10 text-center text-slate-400 space-y-2">
              <span className="font-mono text-xs uppercase text-[#1769AA] block font-bold">
                GLOBAL SPOTLIGHT SEARCH
              </span>
              <p className="text-xs text-slate-500">
                Type any keyword or press <kbd className="px-2 py-0.5 rounded bg-slate-200 font-mono text-[10px]">ESC</kbd> to close.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-10 text-center text-slate-400 font-mono">
              No matching records found across sports gala database.
            </div>
          ) : (
            <>
              {/* Sports Matches */}
              {matchingSports.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#1769AA] block mb-2">
                    Sports Disciplines
                  </span>
                  <div className="space-y-1.5">
                    {matchingSports.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => navigateTo(`/sports/${s.slug}`)}
                        className="w-full p-2.5 rounded-lg bg-[#F4F7FB] hover:bg-[#1769AA] hover:text-white text-left transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-[#1769AA] group-hover:text-white" />
                          <span className="font-bold">{s.name} ({s.category})</span>
                        </div>
                        <span className="text-[11px] opacity-75">{s.venue}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Competition Fixtures */}
              {matchingCompetitions.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#1769AA] block mb-2">
                    Matches & Competitions
                  </span>
                  <div className="space-y-1.5">
                    {matchingCompetitions.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => navigateTo("/schedule")}
                        className="w-full p-2.5 rounded-lg bg-[#F4F7FB] hover:bg-[#1769AA] hover:text-white text-left transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#1769AA] group-hover:text-white" />
                          <span className="font-bold">{c.title}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-700 font-mono group-hover:text-black">
                            {c.status}
                          </span>
                        </div>
                        <span className="font-mono text-[11px]">{c.score_a || "-"} : {c.score_b || "-"}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rules Matches */}
              {matchingRules.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#1769AA] block mb-2">
                    Rules & Guidelines
                  </span>
                  <div className="space-y-1.5">
                    {matchingRules.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => navigateTo("/rules")}
                        className="w-full p-2.5 rounded-lg bg-[#F4F7FB] hover:bg-[#1769AA] hover:text-white text-left transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-[#1769AA] group-hover:text-white" />
                          <span className="font-bold">{r.title}</span>
                        </div>
                        <span className="text-[10px] uppercase font-mono">{r.category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Leads Matches */}
              {matchingLeads.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#1769AA] block mb-2">
                    Coordinators & Field Marshals
                  </span>
                  <div className="space-y-1.5">
                    {matchingLeads.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => navigateTo("/sports")}
                        className="w-full p-2.5 rounded-lg bg-[#F4F7FB] hover:bg-[#1769AA] hover:text-white text-left transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#1769AA] group-hover:text-white" />
                          <span className="font-bold">{l.name}</span>
                        </div>
                        <span className="text-[10px] font-mono">Lead Marshal</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#F4F7FB] border-t border-[#DCE7F2] flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Press ESC to exit</span>
          <span>Tip: Click any entry to jump directly</span>
        </div>
      </div>
    </div>
  );
}
