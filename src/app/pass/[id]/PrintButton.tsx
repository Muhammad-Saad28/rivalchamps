"use client";

import React from "react";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1769AA] hover:bg-[#101D35] text-white text-xs font-bold uppercase transition-all shadow-md"
    >
      <Printer className="w-4 h-4" />
      <span>Print / Save Athlete Pass</span>
    </button>
  );
}
