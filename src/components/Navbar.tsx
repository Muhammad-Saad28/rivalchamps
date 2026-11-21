"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Shield, Menu, X, ChevronDown, UserCheck, Sparkles } from "lucide-react";
import GlobalSearchModal from "./GlobalSearchModal";
import CountdownBar from "./CountdownBar";

function NavbarContent() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsDropdown, setSportsDropdown] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Sports", href: "/sports", hasDropdown: true },
    { name: "Rules", href: "/rules" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Schedule & Results", href: "/schedule" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <CountdownBar />
      <GlobalSearchModal />
      <nav className="sticky top-0 z-50 bg-[#07090F]/60 backdrop-blur-2xl border-b border-[#BBD8FF]/15 shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] supports-[backdrop-filter]:bg-[#07090F]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: UET CS Crest & Brand */}
            <Link href="/" className="flex items-center group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#111827] border border-[#BBD8FF]/25 flex items-center justify-center p-1.5 overflow-hidden shadow-[0_0_25px_rgba(36,123,255,0.35)] group-hover:border-[#398BFF] transition-all">
                <img 
                  src="/logo.jpg" 
                  alt="UET CS Sports Gala Logo" 
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform" 
                />
              </div>
            </Link>

            {/* Middle: Obsidian Electric Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1.5 text-sm font-semibold tracking-wide">
              {navLinks.map((link) => {
                const isActive = pathname ? (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) : false;
                
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setSportsDropdown(true)}
                      onMouseLeave={() => setSportsDropdown(false)}
                    >
                      <Link
                        href={link.href}
                        className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 border ${
                          isActive
                            ? "bg-[#111827] text-white border-[#398BFF]/40 shadow-[0_0_15px_rgba(36,123,255,0.25)]"
                            : "text-slate-300 border-transparent hover:text-white hover:bg-[#111827]/60 hover:border-[#BBD8FF]/15"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sportsDropdown ? "rotate-180 text-[#398BFF]" : "text-[#BBD8FF]/60"}`} />
                      </Link>

                      {sportsDropdown && (
                        <div className="absolute top-full left-0 w-52 rounded-xl bg-[#0C0E14] border border-[#BBD8FF]/20 py-2 shadow-2xl z-50 backdrop-blur-xl mt-1">
                          <Link href="/sports" className="block px-4 py-2 text-xs text-slate-200 hover:bg-[#111827] hover:text-[#BBD8FF] transition-colors">
                            All 24 Disciplines
                          </Link>
                          <Link href="/sports?category=Male" className="block px-4 py-2 text-xs text-slate-200 hover:bg-[#111827] hover:text-[#BBD8FF] transition-colors">
                            Male Tournaments
                          </Link>
                          <Link href="/sports?category=Female" className="block px-4 py-2 text-xs text-slate-200 hover:bg-[#111827] hover:text-[#BBD8FF] transition-colors">
                            Female Tournaments
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg transition-all border ${
                      isActive
                        ? "bg-[#111827] text-white border-[#398BFF]/40 shadow-[0_0_15px_rgba(36,123,255,0.25)]"
                        : "text-slate-300 border-transparent hover:text-white hover:bg-[#111827]/60 hover:border-[#BBD8FF]/15"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right: Actions (Leads & Admin) */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/lead/login"
                className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white px-4 py-2.5 rounded-md bg-[#111827]/80 hover:bg-[#111827] border border-[#BBD8FF]/20 hover:border-[#398BFF] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(36,123,255,0.25)]"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#247BFF]" />
                <span>Leads</span>
              </Link>

              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider bg-[#111827]/80 hover:bg-[#111827] text-slate-200 hover:text-white border border-[#BBD8FF]/25 hover:border-[#398BFF] hover:shadow-[0_0_20px_rgba(36,123,255,0.4)] transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)]"
              >
                <Shield className="w-3.5 h-3.5 text-[#398BFF]" />
                <span>Admin</span>
              </Link>
            </div>

            {/* Mobile menu hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/admin/login"
                className="p-2 rounded-md bg-[#111827] text-[#247BFF] border border-[#BBD8FF]/20 text-xs"
              >
                <Shield className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md bg-[#111827] text-white border border-[#BBD8FF]/20"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#247BFF]" /> : <Menu className="w-6 h-6 text-[#247BFF]" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#07090F]/85 backdrop-blur-2xl border-b border-[#BBD8FF]/15 shadow-2xl px-6 py-6 space-y-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-white hover:text-[#BBD8FF]">
              Home
            </Link>
            <Link href="/sports" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-white hover:text-[#BBD8FF]">
              Sports
            </Link>
            <Link href="/rules" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-white hover:text-[#BBD8FF]">
              Rules
            </Link>
            <Link href="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-white hover:text-[#BBD8FF]">
              Leaderboard
            </Link>
            <Link href="/schedule" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-white hover:text-[#BBD8FF]">
              Schedule & Results
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-white hover:text-[#BBD8FF]">
              About
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="w-full h-20 bg-[#07090F]" />}>
      <NavbarContent />
    </Suspense>
  );
}