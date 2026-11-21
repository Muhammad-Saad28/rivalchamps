"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Radio, ChevronRight, Activity, ArrowRight } from "lucide-react";
import { Competition, Sport } from "@/types";

export default function LiveMatchCenter() {
  const [liveMatches, setLiveMatches] = useState<Competition[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);

  useEffect(() => {
    const fetchLive = () => {
      fetch("/api/gala?entity=competitions")
        .then((res) => res.json())
        .then((comps: Competition[]) => {
          if (Array.isArray(comps)) {
            const active = comps.filter((c) => c.status === "Live");
            setLiveMatches(active);
          }
        })
        .catch((e) => console.error("Live match fetch error", e));
    };

    fetchLive();
    const interval = setInterval(fetchLive, 10000); // 10s auto refresh for live scores
    return () => clearInterval(interval);
  }, []);

  if (liveMatches.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-4 py-3 shadow-lg border-b border-red-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-mono font-bold uppercase tracking-widest text-white border border-white/30 animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>LIVE ARENA MATCH</span>
          </div>

          <div className="text-xs sm:text-sm font-semibold flex items-center gap-2">
            <span>{liveMatches[0].title}:</span>
            <strong className="text-white bg-black/30 px-2.5 py-0.5 rounded font-mono font-extrabold text-sm tracking-wide">
              {liveMatches[0].team_a} ({liveMatches[0].score_a || "0"}) vs {liveMatches[0].team_b} ({liveMatches[0].score_b || "0"})
            </strong>
          </div>
        </div>

        <Link
          href="/schedule"
          className="text-xs font-bold uppercase tracking-wider text-white hover:text-amber-200 transition-colors flex items-center gap-1 shrink-0"
        >
          <span>Open Match Center</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
