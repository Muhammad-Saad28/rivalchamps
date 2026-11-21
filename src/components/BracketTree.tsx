"use client";

import React from "react";
import { Trophy, Flame, ChevronRight, Crown } from "lucide-react";
import { Competition } from "@/types";

interface BracketProps {
  competitions: Competition[];
  sportName: string;
}

export default function BracketTree({ competitions, sportName }: BracketProps) {
  // Categorize fixtures by round
  const quarters = competitions.filter((c) => c.round === "Quarter Final" || c.title.toLowerCase().includes("quarter"));
  const semis = competitions.filter((c) => c.round === "Semi Final" || c.title.toLowerCase().includes("semi"));
  const finals = competitions.filter((c) => c.round === "Final" || c.title.toLowerCase().includes("final"));

  return (
    <div className="bg-white rounded-2xl border border-[#DCE7F2] p-6 shadow-sm overflow-x-auto">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#DCE7F2]">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#1769AA]" />
          <h3 className="font-extrabold text-base uppercase text-[#101D35]">
            {sportName} — Knockout Championship Bracket
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Visual Match Progression
        </span>
      </div>

      <div className="flex items-stretch justify-start min-w-[700px] gap-8 pb-4">
        
        {/* Column 1: Quarter Finals */}
        <div className="flex-1 flex flex-col justify-around space-y-4">
          <div className="text-[11px] font-mono font-bold uppercase text-[#1769AA] tracking-wider text-center pb-2 border-b border-[#DCE7F2]">
            Quarter Finals
          </div>
          {quarters.length > 0 ? (
            quarters.map((m) => (
              <div key={m.id} className="p-3 rounded-xl border border-[#DCE7F2] bg-[#F4F7FB] text-xs shadow-sm space-y-1.5">
                <div className="flex items-center justify-between font-bold text-[#101D35]">
                  <span className="truncate">{m.team_a || "TBD"}</span>
                  <span className="font-mono text-slate-700">{m.score_a || "-"}</span>
                </div>
                <div className="flex items-center justify-between font-bold text-[#101D35] border-t border-[#DCE7F2] pt-1">
                  <span className="truncate">{m.team_b || "TBD"}</span>
                  <span className="font-mono text-slate-700">{m.score_b || "-"}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1">
                  <span>{m.status}</span>
                  <span>{m.venue}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-[#DCE7F2] text-center text-xs text-slate-400 font-mono">
              Quarter fixtures loading...
            </div>
          )}
        </div>

        {/* Column 2: Semi Finals */}
        <div className="flex-1 flex flex-col justify-around space-y-4">
          <div className="text-[11px] font-mono font-bold uppercase text-[#1769AA] tracking-wider text-center pb-2 border-b border-[#DCE7F2]">
            Semi Finals
          </div>
          {semis.length > 0 ? (
            semis.map((m) => (
              <div key={m.id} className="p-3 rounded-xl border-2 border-[#1769AA]/30 bg-white text-xs shadow-md space-y-1.5">
                <div className="flex items-center justify-between font-bold text-[#101D35]">
                  <span className="truncate">{m.team_a || "QF 1 Winner"}</span>
                  <span className="font-mono text-[#1769AA] font-extrabold">{m.score_a || "-"}</span>
                </div>
                <div className="flex items-center justify-between font-bold text-[#101D35] border-t border-[#DCE7F2] pt-1">
                  <span className="truncate">{m.team_b || "QF 2 Winner"}</span>
                  <span className="font-mono text-[#1769AA] font-extrabold">{m.score_b || "-"}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1">
                  <span className="text-[#1769AA] font-bold">{m.status}</span>
                  <span>{m.venue}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-[#DCE7F2] text-center text-xs text-slate-400 font-mono">
              Semi finals scheduled after QF
            </div>
          )}
        </div>

        {/* Column 3: Grand Final */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <div className="text-[11px] font-mono font-bold uppercase text-amber-600 tracking-wider text-center pb-2 border-b border-amber-200 flex items-center justify-center gap-1">
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            <span>Grand Championship Final</span>
          </div>
          {finals.length > 0 ? (
            finals.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl border-2 border-amber-400 bg-amber-50/50 text-xs shadow-lg space-y-2">
                <div className="flex items-center justify-between font-extrabold text-[#101D35] text-sm">
                  <span>{m.team_a || "SF 1 Champion"}</span>
                  <span className="font-mono text-amber-700">{m.score_a || "-"}</span>
                </div>
                <div className="flex items-center justify-between font-extrabold text-[#101D35] text-sm border-t border-amber-200 pt-1.5">
                  <span>{m.team_b || "SF 2 Champion"}</span>
                  <span className="font-mono text-amber-700">{m.score_b || "-"}</span>
                </div>
                <div className="text-[10px] font-mono text-amber-800 flex items-center justify-between pt-1">
                  <span className="font-bold">STATUS: {m.status}</span>
                  <span>{m.venue}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 rounded-2xl border-2 border-dashed border-amber-300 text-center text-xs text-amber-700 font-mono">
              Final showdown awaits semifinal winners!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
