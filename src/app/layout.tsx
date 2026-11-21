import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UET CS Sports Gala 2026 | RivalChamps 3.0",
  description: "Built to Compete. Born to Win. The central sports management & championship platform for UET Computer Science Department.",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#07090F] text-[#E1E2EB] selection:bg-[#247BFF] selection:text-white relative overflow-x-hidden">
        {/* ========================================================================= */}
        {/* VIBRANT BLUE & LUMINOUS WHITE GAUSSIAN BLUR SYSTEM */}
        {/* Layered high-voltage blue spotlights + diffused white cores */}
        {/* ========================================================================= */}

        {/* 1. UPPER HERO ATMOSPHERE */}
        {/* Luminous White Core Top-Center */}
        <div 
          className="fixed top-[-180px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] lg:w-[1300px] h-[450px] lg:h-[650px] bg-white/[0.18] rounded-full blur-[140px] pointer-events-none z-0" 
          aria-hidden="true" 
        />
        {/* High-Voltage Electric Sky Blue Spotlight */}
        <div 
          className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1200px] lg:w-[1500px] h-[550px] lg:h-[800px] bg-[#247BFF]/[0.32] rounded-full blur-[160px] pointer-events-none z-0" 
          aria-hidden="true" 
        />
        {/* Neon Cobalt Secondary Flare */}
        <div 
          className="fixed top-[5%] right-[5%] w-[450px] lg:w-[700px] h-[450px] lg:h-[700px] bg-[#398BFF]/[0.28] rounded-full blur-[150px] pointer-events-none z-0" 
          aria-hidden="true" 
        />
        {/* Pure Ice White Highlight Spot Left */}
        <div 
          className="fixed top-[15%] left-[2%] w-[350px] lg:w-[550px] h-[350px] lg:h-[550px] bg-white/[0.12] rounded-full blur-[130px] pointer-events-none z-0" 
          aria-hidden="true" 
        />

        {/* 2. MID-PAGE & DASHBOARD ATMOSPHERE */}
        {/* Mid Electric Blue Aura */}
        <div 
          className="fixed top-[40%] left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] lg:w-[1400px] h-[500px] lg:h-[700px] bg-[#247BFF]/[0.24] rounded-full blur-[170px] pointer-events-none z-0" 
          aria-hidden="true" 
        />
        {/* Mid Diffused White Radiant Core */}
        <div 
          className="fixed top-[45%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] lg:w-[1100px] h-[350px] lg:h-[500px] bg-white/[0.14] rounded-full blur-[140px] pointer-events-none z-0" 
          aria-hidden="true" 
        />
        {/* Mid-Left Cobalt Blue Ambient */}
        <div 
          className="fixed top-[55%] left-[-100px] w-[500px] lg:w-[750px] h-[500px] lg:h-[750px] bg-[#0272E4]/[0.26] rounded-full blur-[160px] pointer-events-none z-0" 
          aria-hidden="true" 
        />

        {/* 3. LOWER SECTION & FOOTER ATMOSPHERE */}
        {/* Lower Electric Sky Blue Glow */}
        <div 
          className="fixed bottom-[8%] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1200px] lg:w-[1500px] h-[450px] lg:h-[650px] bg-[#398BFF]/[0.28] rounded-full blur-[160px] pointer-events-none z-0" 
          aria-hidden="true" 
        />
        {/* Lower Diffused White Core */}
        <div 
          className="fixed bottom-[4%] left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] lg:w-[1200px] h-[350px] lg:h-[500px] bg-white/[0.15] rounded-full blur-[130px] pointer-events-none z-0" 
          aria-hidden="true" 
        />
        {/* Lower-Right Deep Electric Accent */}
        <div 
          className="fixed bottom-[-50px] right-[-50px] w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-[#247BFF]/[0.25] rounded-full blur-[150px] pointer-events-none z-0" 
          aria-hidden="true" 
        />

        {/* Main Content Layer */}
        <div className="relative z-10 flex-1 flex flex-col">
          <SplashScreen />
          {children}
        </div>
      </body>
    </html>
  );
}