"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Shield, MapPin, Calendar, Mail, ExternalLink, ChevronRight, UserCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#07090F] text-slate-400 border-t border-[#BBD8FF]/15 pt-16 pb-12 relative z-10 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#247BFF]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#398BFF]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#BBD8FF]/15">
          
          {/* Column 1: Brand & Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-[#111827] border border-[#BBD8FF]/25 flex items-center justify-center p-1 overflow-hidden shadow-[0_0_20px_rgba(36,123,255,0.3)] group-hover:border-[#398BFF] transition-all">
                <img 
                  src="/logo.jpg" 
                  alt="UET CS Sports Gala Logo" 
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform" 
                />
              </div>
              <div>
                <span className="font-black text-2xl tracking-wider text-white uppercase italic font-sans block leading-none">
                  UET CS
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#BBD8FF] mt-1 block">
                  SPORTS GALA 2026
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier annual athletic and tactical tournament of the Computer Science Department at UET Lahore. Where campus pride meets peak competitive performance.
            </p>

            <div className="space-y-2.5 text-xs font-mono text-slate-300 pt-1">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#247BFF] shrink-0" />
                <span>DECEMBER 3–4, 2026</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#247BFF] shrink-0" />
                <span>UET LAHORE, PAKISTAN</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#BBD8FF] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#247BFF]" />
              Tournament Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#398BFF] transition-colors" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#398BFF] transition-colors" />
                  <span>All Disciplines & Sports</span>
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#398BFF] transition-colors" />
                  <span>Official Rulebook</span>
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#398BFF] transition-colors" />
                  <span>Standings & Medal Tally</span>
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#398BFF] transition-colors" />
                  <span>Schedule & Fixtures</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#398BFF] transition-colors" />
                  <span>About Sports Gala</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Disciplines (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#BBD8FF] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#398BFF]" />
              Major Sports
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><Link href="/sports/cricket-male" className="hover:text-[#BBD8FF] transition-colors">🏏 Tape Ball Cricket</Link></li>
              <li><Link href="/sports/football-male" className="hover:text-[#BBD8FF] transition-colors">⚽ Football 7v7</Link></li>
              <li><Link href="/sports/badminton-male" className="hover:text-[#BBD8FF] transition-colors">🏸 Badminton</Link></li>
              <li><Link href="/sports/basketball-male" className="hover:text-[#BBD8FF] transition-colors">🏀 Basketball</Link></li>
              <li><Link href="/sports/table-tennis" className="hover:text-[#BBD8FF] transition-colors">🏓 Table Tennis</Link></li>
              <li><Link href="/sports/chess" className="hover:text-[#BBD8FF] transition-colors">♟️ Rapid Chess</Link></li>
              <li><Link href="/sports/tug-of-war-male" className="hover:text-[#BBD8FF] transition-colors">🪢 Tug of War</Link></li>
            </ul>
          </div>

          {/* Column 4: Portal & Leads Access (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#BBD8FF] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BBD8FF]" />
              Staff & Admin Portals
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authorized coordinators and lead organizers can manage fixtures, rosters, and live scorecard verification.
            </p>

            <div className="flex flex-col gap-2.5 pt-1">
              <Link
                href="/lead/login"
                className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#111827] border border-[#BBD8FF]/20 hover:border-[#398BFF] text-xs font-bold text-slate-200 hover:text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(36,123,255,0.25)]"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#247BFF]" />
                  <span>Sports Leads Portal</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>

              <Link
                href="/admin/login"
                className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#111827] border border-[#BBD8FF]/25 hover:border-[#398BFF] text-xs font-bold text-slate-200 hover:text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(36,123,255,0.35)]"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#398BFF]" />
                  <span>Executive Admin</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 UET CS Sports Gala. Computer Science Department, UET Lahore.
          </div>
          <div className="font-sans font-black italic uppercase tracking-wider text-white">
            PLAY <span className="text-[#247BFF]">•</span> COMPETE <span className="text-[#398BFF]">•</span> CONQUER
          </div>
        </div>

      </div>
    </footer>
  );
}