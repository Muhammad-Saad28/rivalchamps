"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Users, Shield, Target, Award, HeartHandshake, Sparkles, Flame, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { number: "10+", label: "Sports Disciplines", color: "text-white" },
    { number: "1000+", label: "Participants", color: "text-[#D946EF]" },
    { number: "5+", label: "Historical Years", color: "text-white" },
  ];

  return (
    <div className="min-h-screen bg-[#090314] text-slate-100 flex flex-col font-sans selection:bg-[#D946EF] selection:text-white">
      <Navbar />

      {/* 2. ABOUT US HERO - EXACT MATCH TO MOCKUP 2 */}
      <section className="relative overflow-hidden pt-16 pb-24 rc-mesh-bg border-b border-[#2D164E]">
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#D946EF]/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
                  About <span className="bg-gradient-to-r from-[#F97316] via-[#D946EF] to-[#8B5CF6] bg-clip-text text-transparent">RivalChamps</span>
                </h1>
                <p className="text-sm sm:text-lg font-medium text-slate-300 mt-2">
                  More Than Just a Tournament
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Uniting talent, building sportsmanship, and creating unforgettable moments. Since our inception, RivalChamps has stood as the premier athletic arena for collegiate athletes, fostering spirit, grit, and fair play across generations of competitors.
              </p>

              {/* Stats Bar directly matching Mockup 2 */}
              <div className="grid grid-cols-3 gap-6 pt-4 max-w-md">
                {stats.map((s, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className={`text-3xl sm:text-5xl font-black font-sans ${s.color}`}>
                      {s.number}
                    </span>
                    <span className="text-xs uppercase font-medium text-slate-400 mt-1">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/sports"
                  className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider rc-btn-primary flex items-center gap-2"
                >
                  <span>Explore Sports</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/rules"
                  className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider rc-btn-secondary"
                >
                  Rules & Policies
                </Link>
              </div>
            </div>

            {/* Right Graphic: Illustrated Athletes Silhouette matching Mockup 2 */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-3xl overflow-hidden rc-card border border-[#A855F7]/30 p-6 flex items-center justify-center shadow-[0_0_50px_rgba(217,70,239,0.15)]">
                
                {/* Stadium Light Beam Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#160B29] via-[#20123A] to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#D946EF]/25 rounded-full blur-[70px] pointer-events-none" />

                {/* Athlete Artwork Graphics */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/30 border border-[#8B5CF6]/50 flex items-center justify-center text-[#D946EF]">
                      <Trophy className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-[#D946EF]/30 border border-[#D946EF]/50 flex items-center justify-center text-[#D946EF]">
                      <Flame className="w-8 h-8 text-[#F97316] animate-pulse" />
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/30 border border-[#8B5CF6]/50 flex items-center justify-center text-[#D946EF]">
                      <Users className="w-6 h-6 text-[#8B5CF6]" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase text-white tracking-wide">
                      Collegiate Athletic Excellence
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      24 Sports • 31 Appointed Leads • 6 Historical Seasons of Legacy
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE PILLARS SECTION */}
      <section className="py-20 bg-[#0E061D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D946EF]">
              CHAMPIONSHIP PHILOSOPHY
            </span>
            <h2 className="text-3xl font-black uppercase text-white mt-1">
              Built on Pure Merit & Passion
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rc-card p-8 rounded-2xl border border-[#2D164E] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F97316]/20 border border-[#F97316]/40 flex items-center justify-center text-[#F97316]">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Fair Play & Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Every fixture is arbitrated under standard collegiate sporting rules by certified student leads, ensuring equal and unbiased play.
              </p>
            </div>

            <div className="rc-card p-8 rounded-2xl border border-[#2D164E] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#D946EF]/20 border border-[#D946EF]/40 flex items-center justify-center text-[#D946EF]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Inclusivity Across Categories</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Dedicated Male, Female, and Mixed categories spanning physical pitch athletics, indoor racquets, and strategic mind games.
              </p>
            </div>

            <div className="rc-card p-8 rounded-2xl border border-[#2D164E] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Inter-Batch Camaraderie</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Bringing together undergraduates, postgraduates, and faculty in an environment that celebrates friendship as much as victory.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}