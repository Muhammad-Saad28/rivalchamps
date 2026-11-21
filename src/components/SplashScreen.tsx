"use client";

import React, { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [isSplitting, setIsSplitting] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 48,
    hours: 12,
    minutes: 36,
    seconds: 27,
  });

  useEffect(() => {
    // Disable browser scroll restoration and ensure window is reset to top on reload/mount
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    const scrollLockTimer = setInterval(() => {
      window.scrollTo(0, 0);
    }, 50);

    // Trigger the split door animation after 4.8s (giving users ample time to read and absorb)
    const splitTimer = setTimeout(() => {
      setIsSplitting(true);
    }, 4800);

    // Completely remove from DOM after the split animation finishes (6.0s)
    const endTimer = setTimeout(() => {
      clearInterval(scrollLockTimer);
      setShow(false);
    }, 6000);

    return () => {
      clearInterval(timer);
      clearInterval(scrollLockTimer);
      clearTimeout(splitTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden font-sans">
      
      {/* ======================================================== */}
      {/* TOP HALF DOOR (Slides upward on split) */}
      {/* Deep Obsidian Background with rich layered electric blue and white gaussian glows */}
      {/* ======================================================== */}
      <div 
        className={`absolute top-0 left-0 w-full h-[50%] bg-[#07090F] border-b border-[#398BFF]/40 transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isSplitting ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Deep Obsidian Background Texture */}
        <div className="absolute inset-0 bg-[#07090F]" />
        
        {/* Layered Gaussian atmospheric spotlights matching the website */}
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[450px] bg-white/[0.12] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[900px] sm:w-[1400px] h-[550px] bg-[#247BFF]/[0.28] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[400px] bg-[#398BFF]/[0.22] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-[20%] left-[8%] w-[450px] h-[350px] bg-white/[0.08] rounded-full blur-[110px] pointer-events-none" />

        {/* High-Voltage Laser Beam at the split junction */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#398BFF] to-transparent shadow-[0_0_20px_#247BFF]" />
      </div>

      {/* ======================================================== */}
      {/* BOTTOM HALF DOOR (Slides downward on split) */}
      {/* Deep Obsidian Background with rich layered electric blue and white gaussian glows */}
      {/* ======================================================== */}
      <div 
        className={`absolute bottom-0 left-0 w-full h-[50%] bg-[#07090F] border-t border-[#398BFF]/40 transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isSplitting ? "translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Deep Obsidian Background Texture */}
        <div className="absolute inset-0 bg-[#07090F]" />

        {/* Layered Gaussian atmospheric spotlights matching the website */}
        <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1300px] h-[500px] bg-[#398BFF]/[0.26] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[380px] bg-white/[0.12] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[400px] bg-[#0272E4]/[0.24] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[8%] w-[450px] h-[350px] bg-[#247BFF]/[0.18] rounded-full blur-[110px] pointer-events-none" />

        {/* High-Voltage Laser Beam at the split junction */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#398BFF] to-transparent shadow-[0_0_20px_#247BFF]" />
      </div>

      {/* ======================================================== */}
      {/* CENTERPIECE: GLASS EMBEDDED LOGO + VIBRANT TIMER CARD */}
      {/* ======================================================== */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-all duration-700 px-4 ${
          isSplitting ? "opacity-0 scale-110 blur-md" : "opacity-100 scale-100"
        }`}
      >
        {/* Radiant Ambient Core Behind Logo */}
        <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#247BFF]/35 to-[#398BFF]/45 blur-[100px] animate-pulse pointer-events-none" />

        {/* Premium Obsidian Glass Logo Badge */}
        <div className="relative group mb-5">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#111827]/90 border-2 border-[#BBD8FF]/40 backdrop-blur-xl flex items-center justify-center p-2 overflow-hidden shadow-[0_0_45px_rgba(36,123,255,0.65),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <img 
              src="/logo.jpg" 
              alt="UET CS Sports Gala Logo" 
              className="w-full h-full object-cover rounded-2xl shadow-inner" 
            />
          </div>
          <span className="absolute -inset-1.5 rounded-3xl bg-[#398BFF]/40 blur-lg -z-10 animate-ping opacity-70" />
        </div>

        {/* Championship Brand Typography */}
        <div className="text-center space-y-1.5 mb-7">
          <h1 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-white leading-none font-sans drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            UET CS SPORTS GALA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#247BFF] via-[#398BFF] to-[#BBD8FF] drop-shadow-[0_0_30px_rgba(57,139,255,0.6)]">
              2026
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-[#BBD8FF] font-bold">
            BUILT TO COMPETE • BORN TO WIN
          </p>
        </div>

        {/* High-Contrast Obsidian Glass Countdown Capsule with Electric Blue Accent */}
        <div className="relative w-full max-w-[500px] p-6 sm:p-7 rounded-3xl bg-[#0C0E14]/85 backdrop-blur-2xl border border-[#BBD8FF]/30 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(36,123,255,0.25)] flex flex-col items-center gap-4 overflow-hidden">
          {/* Subtle Inner Corner Gaussian Spots */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#247BFF]/25 blur-[40px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-36 h-36 bg-[#398BFF]/25 blur-[45px] pointer-events-none" />

          {/* Header Live Indicator */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#247BFF] electric-live-dot" />
            <span className="text-[11px] sm:text-xs font-mono font-black uppercase tracking-[0.2em] text-[#BBD8FF]">
              CHAMPIONSHIP STARTS IN
            </span>
          </div>

          {/* Numerical Ticking Blocks with Crisp High-Contrast Typography */}
          <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-7 font-mono w-full">
            <div className="text-center">
              <span className="text-3xl sm:text-4xl font-black text-white block leading-none drop-shadow-md">
                {countdown.days}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-1.5 block font-bold">
                DAYS
              </span>
            </div>
            <span className="text-[#398BFF] font-black text-2xl -mt-4">:</span>
            <div className="text-center">
              <span className="text-3xl sm:text-4xl font-black text-white block leading-none drop-shadow-md">
                {countdown.hours}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-1.5 block font-bold">
                HOURS
              </span>
            </div>
            <span className="text-[#398BFF] font-black text-2xl -mt-4">:</span>
            <div className="text-center">
              <span className="text-3xl sm:text-4xl font-black text-white block leading-none drop-shadow-md">
                {countdown.minutes}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-1.5 block font-bold">
                MINS
              </span>
            </div>
            <span className="text-[#398BFF] font-black text-2xl -mt-4">:</span>
            <div className="text-center">
              <span className="text-3xl sm:text-4xl font-black text-[#398BFF] block leading-none drop-shadow-[0_0_18px_rgba(57,139,255,0.9)]">
                {countdown.seconds.toString().padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#BBD8FF] mt-1.5 block font-bold">
                SECS
              </span>
            </div>
          </div>
        </div>

        {/* Loading Telemetry Pill */}
        <div className="mt-6 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111827]/80 border border-[#BBD8FF]/20 text-[10px] font-mono font-bold text-slate-300 tracking-widest uppercase shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#398BFF] animate-pulse" />
          <span>ENTERING THE ARENA...</span>
        </div>

      </div>
    </div>
  );
}
