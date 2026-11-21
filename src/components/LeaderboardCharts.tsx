"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { LeaderboardEntry } from "@/types";

interface ChartProps {
  entries: LeaderboardEntry[];
  sessionName: string;
}

const MEDAL_COLORS = {
  gold: "#d97706",
  silver: "#64748b",
  bronze: "#b45309",
};

export default function LeaderboardCharts({ entries, sessionName }: ChartProps) {
  const [chartView, setChartView] = useState<"points" | "medals">("points");

  if (!entries || entries.length === 0) return null;

  const chartData = entries.slice(0, 6).map((e: any) => ({
    name: (e.competitor_name || e.team_name || "Squad").replace("Batch", "B.").replace("Computer Science", "CS"),
    total_points: e.total_points || 0,
    gold: e.gold_count || 0,
    silver: e.silver_count || 0,
    bronze: e.bronze_count || 0,
  }));

  return (
    <div className="bg-white rounded-2xl border border-[#DCE7F2] p-6 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#DCE7F2] gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1769AA] block">
            VISUAL PERFORMANCE ANALYTICS
          </span>
          <h3 className="text-base font-extrabold uppercase text-[#101D35] mt-0.5">
            {sessionName} — Top Contenders Comparison
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#F4F7FB] border border-[#DCE7F2] text-xs">
          <button
            onClick={() => setChartView("points")}
            className={`px-3 py-1 rounded font-bold uppercase transition-all ${
              chartView === "points"
                ? "bg-[#1769AA] text-white shadow-sm"
                : "text-slate-600 hover:text-black"
            }`}
          >
            Points Chart
          </button>
          <button
            onClick={() => setChartView("medals")}
            className={`px-3 py-1 rounded font-bold uppercase transition-all ${
              chartView === "medals"
                ? "bg-[#1769AA] text-white shadow-sm"
                : "text-slate-600 hover:text-black"
            }`}
          >
            Medals Breakdown
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartView === "points" ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#475569" }} interval={0} angle={-15} textAnchor="end" />
              <YAxis tick={{ fontSize: 11, fill: "#475569" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#101D35", borderColor: "#233653", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
              />
              <Bar dataKey="total_points" name="Total Points" fill="#1769AA" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#475569" }} interval={0} angle={-15} textAnchor="end" />
              <YAxis tick={{ fontSize: 11, fill: "#475569" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#101D35", borderColor: "#233653", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
              <Bar dataKey="gold" name="Gold Medals" fill={MEDAL_COLORS.gold} radius={[4, 4, 0, 0]} />
              <Bar dataKey="silver" name="Silver Medals" fill={MEDAL_COLORS.silver} radius={[4, 4, 0, 0]} />
              <Bar dataKey="bronze" name="Bronze Medals" fill={MEDAL_COLORS.bronze} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
