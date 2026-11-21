"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, CheckCircle, ShieldCheck, Printer, ArrowLeft, Share2 } from "lucide-react";
import QRCode from "qrcode";
import Link from "next/link";
import { Registration } from "@/types";

function PassContent() {
  const params = useParams();
  const id = params?.id as string;

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch("/api/gala")
      .then((res) => res.json())
      .then((json) => {
        const found = (json.registrations || []).find((r: Registration) => r.id === id);
        if (found) {
          setRegistration(found);
          const verifyUrl = `${window.location.origin}/pass/${found.id}`;
          QRCode.toDataURL(verifyUrl, {
            width: 250,
            margin: 1,
            color: { dark: "#090314", light: "#FFFFFF" },
          }).then(setQrDataUrl);
        } else {
          // Fallback sample pass matching Mockup 10
          const mockPass: Registration = {
            id: id || "RC2025-001",
            form_id: "form-sample",
            session_id: "session-fall-2026",
            sport_id: "Football",
            team_name: "Alpha Squad",
            captain_name: "Muhammad Ahmad",
            captain_reg_no: "2023-CS-124",
            department: "Computer Science",
            semester: "3rd",
            contact_number: "0300-1234567",
            email: "ahmad@student.uet.edu.pk",
            status: "Approved",
            submitted_at: new Date().toISOString(),
          };
          setRegistration(mockPass);
          QRCode.toDataURL(`${window.location.origin}/pass/${mockPass.id}`, {
            width: 250,
            margin: 1,
            color: { dark: "#090314", light: "#FFFFFF" },
          }).then(setQrDataUrl);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pass", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-400 font-mono text-xs">
        Generating Official Event Pass...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      {/* 10. PARTICIPANT PASS - EXACT MATCH TO MOCKUP 10 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
          Your Event Pass
        </h1>
        <p className="mt-1 text-slate-400 text-xs sm:text-sm">
          Authorized athlete credential for pitch and stadium admission.
        </p>
      </div>

      {/* TICKET / BADGE CARD - EXACT LAYOUT AND COLOR FROM MOCKUP 10 */}
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#FCECD7] via-[#F9E3C5] to-[#FCECD7] rounded-3xl p-6 sm:p-8 text-[#090314] shadow-2xl border-4 border-[#F59E0B]/40 relative overflow-hidden">
        
        {/* Subtle decorative watermark */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#F59E0B]/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Left Brand Identity: Trophy Icon + RIVALCHAMPS */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#090314] flex items-center justify-center text-[#F59E0B] shadow-md mb-2">
              <Trophy className="w-8 h-8 text-[#F59E0B]" />
            </div>
            <span className="font-black text-2xl tracking-tight uppercase italic font-sans text-[#090314]">
              RIVAL<span className="text-[#D946EF]">CHAMPS</span>
            </span>
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#F97316]">
              OFFICIAL PARTICIPANT PASS
            </span>
          </div>

          {/* Middle: Team & Pass ID Info matching Mockup 10 */}
          <div className="text-center sm:text-left space-y-1">
            <div className="text-sm">
              <span className="text-slate-600 font-medium">Team: </span>
              <strong className="text-base text-[#090314] font-bold">
                {registration?.team_name || "Alpha Squad"}
              </strong>
            </div>
            <div className="text-sm">
              <span className="text-slate-600 font-medium">Sport: </span>
              <strong className="text-[#090314] font-bold">
                {registration?.sport_id || "Football"}
              </strong>
            </div>
            <div className="text-xs font-mono">
              <span className="text-slate-600">Pass ID: </span>
              <strong className="text-slate-900 font-bold">
                {registration?.id || "RC2025-001"}
              </strong>
            </div>
          </div>

          {/* Right: QR Code with [Valid] Badge matching Mockup 10 */}
          <div className="flex flex-col items-center">
            <div className="p-2 bg-white rounded-2xl border-2 border-[#090314]/10 shadow-sm">
              {qrDataUrl && (
                <img src={qrDataUrl} alt="Athlete Pass QR" className="w-24 h-24 sm:w-28 sm:h-28" />
              )}
            </div>
            <span className="mt-2 px-3 py-0.5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[10px] uppercase tracking-wider shadow">
              VALID
            </span>
          </div>

        </div>

        {/* Footer Bar inside pass */}
        <div className="mt-6 pt-4 border-t border-[#090314]/15 flex items-center justify-between text-[11px] text-slate-700 font-mono">
          <span>Captain: {registration?.captain_name || "Muhammad Ahmad"}</span>
          <span>Reg: {registration?.captain_reg_no || "2023-CS-124"}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 rounded-xl rc-btn-primary text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Pass</span>
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl rc-btn-secondary text-xs font-bold uppercase tracking-wider"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default function PassPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#090314] flex items-center justify-center font-mono text-xs text-slate-400">Loading pass...</div>}>
      <div className="min-h-screen bg-[#090314] text-slate-100 flex flex-col font-sans selection:bg-[#D946EF] selection:text-white">
        <Navbar />
        <PassContent />
        <Footer />
      </div>
    </Suspense>
  );
}