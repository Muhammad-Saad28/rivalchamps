"use client";

import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate?: string;
}

export default function Countdown({ targetDate = "2026-12-03T09:00:00+05:00" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 12, hours: 8, minutes: 45, seconds: 20 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      {timeBlocks.map((block, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="text-3xl sm:text-5xl font-black text-white font-mono tracking-wider drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
            {String(block.value).padStart(2, "0")}
          </div>
          <span className="text-[11px] sm:text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}