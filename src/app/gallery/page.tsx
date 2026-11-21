"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Camera, Sparkles, Filter, X, ZoomIn } from "lucide-react";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: "Championship Turf Cricket Finals",
      category: "Matches",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Golden Trophy Presentation Ceremony",
      category: "Events",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Volleyball Court Spike Showdown",
      category: "Moments",
      image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Intense Badminton Indoor Rally",
      category: "Matches",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Tactical Chess Grandmaster Move",
      category: "Moments",
      image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Futsal Turf Speed Sprint",
      category: "Matches",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 7,
      title: "Torch Lighting Ceremony Opening",
      category: "Events",
      image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 8,
      title: "Team Celebration & Medal Victory",
      category: "Moments",
      image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === "All" || item.category.toLowerCase() === activeFilter.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col font-sans selection:bg-[#247BFF] selection:text-white">
      <Navbar />

      {/* 8. GALLERY HERO - EXACT MATCH TO MOCKUP 8 */}
      <section className="relative overflow-hidden pt-16 pb-12 bg-gradient-to-b from-[#0C0E14] to-[#07090F] border-b border-[rgba(187,216,255,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
            Gallery
          </h1>
          <p className="mt-2 text-slate-400 text-sm max-w-lg mx-auto">
            Capturing the passion, victory rallies, and memorable championship milestones.
          </p>

          {/* Filter Pills matching Mockup 8: [All] [Matches] [Events] [Moments] */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {["All", "Matches", "Events", "Moments"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab
                    ? "bg-[#247BFF] text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]"
                    : "bg-[#111827] text-slate-300 hover:bg-[#2C1650] border border-[#3C1D6B]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PHOTO MOSAIC GRID matching Mockup 8 */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item.image)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#0C0E14] border border-[rgba(187,216,255,0.15)] hover:border-[#247BFF]/50 transition-all cursor-pointer shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono font-bold uppercase text-[#247BFF] block">
                  {item.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-[#247BFF]/50">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:text-[#247BFF]"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={selectedPhoto} alt="Enlarged view" className="w-full h-auto max-h-[85vh] object-contain" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}