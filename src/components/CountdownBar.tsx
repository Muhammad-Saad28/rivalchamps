"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Calendar, MapPin, ChevronRight, Zap } from "lucide-react";

export default function CountdownBar() {
  const [countdown, setCountdown] = useState({
    days: 48,
    hours: 12,
    minutes: 36,
    seconds: 27,
  });

  useEffect(() => {
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

  const renderCountdownItem = (index: number) => (
    <div key={index} className="inline-flex items-center gap-6 sm:gap-8 px-6 sm:px-10 shrink-0">
      {/* Event starts in tag */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#247BFF] electric-live-dot" />
        <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#BBD8FF]">
          EVENT STARTS IN
        </span>
      </div>

      {/* Numerical Countdown Blocks */}
      <div className="flex items-center gap-4 sm:gap-5 font-mono">
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-lg font-black text-white">{countdown.days}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">DAYS</span>
        </div>
        <span className="text-slate-600 font-bold">:</span>
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-lg font-black text-white">{countdown.hours}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">HOURS</span>
        </div>
        <span className="text-slate-600 font-bold">:</span>
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-lg font-black text-white">{countdown.minutes}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">MINUTES</span>
        </div>
        <span className="text-slate-600 font-bold">:</span>
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-lg font-black text-[#398BFF] drop-shadow-[0_0_12px_rgba(57,139,255,0.8)]">
            {countdown.seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#BBD8FF]">SECONDS</span>
        </div>
      </div>

      {/* Date & Venue Chip */}
      <div className="hidden md:flex items-center gap-4 text-[11px] font-mono text-slate-300 pl-2">
        <div className="flex items-center gap-1.5 text-white font-semibold">
          <Calendar className="w-3.5 h-3.5 text-[#247BFF]" />
          <span>DECEMBER 3–4, 2026</span>
        </div>
        <span className="text-slate-700">•</span>
        <div className="flex items-center gap-1.5 text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-[#398BFF]" />
          <span>UET LAHORE</span>
        </div>
      </div>

      <span className="text-[#398BFF]/40 font-bold">///</span>
    </div>
  );

  return (
    <div className="relative w-full bg-[#07090F] border-b border-[#BBD8FF]/15 overflow-hidden py-2 select-none z-50">
      {/* Background Soft Gaussian Glows */}
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-48 h-12 bg-[#247BFF]/15 blur-2xl rounded-full pointer-events-none" />
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-12 bg-[#398BFF]/15 blur-2xl rounded-full pointer-events-none" />

      {/* Left to right marquee container */}
      <div className="w-full overflow-hidden">
        <div className="animate-countdown-ltr">
          {/* Repeating sequence for infinite left-to-right looping */}
          {[0, 1, 2, 3, 4, 5].map((i) => renderCountdownItem(i))}
        </div>
      </div>
    </div>
  );
}
