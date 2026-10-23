import type { Metadata } from "next";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import ScheduleTabs from "@/components/schedule/ScheduleTabs";

export const metadata: Metadata = {
  title: "Run of Show & Schedule",
  description:
    "Explore the complete 2-day timeline, keynote tracks, and parallel competitions for CCIT Week 2026: Digital Nexus.",
};

export default function SchedulePage() {
  return (
    <>
      {/* ELEVATED SCHEDULE HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#050507] py-20 lg:py-24">
        {/* Ambient atmospheric glows */}
        <div className="pointer-events-none absolute -right-20 top-0 h-[450px] w-[450px] rounded-full bg-[#7D39EB]/20 blur-[130px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full bg-[#C6FF33]/10 blur-[110px]" />
        <div className="hero-grid pointer-events-none opacity-40" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Cyber Eyebrow Badge */}
            <div className="mb-6 inline-flex items-center gap-2.5 border border-[#C6FF33]/30 bg-[#C6FF33]/10 px-3.5 py-1.5 font-['Space_Grotesk'] text-[11px] font-bold tracking-[2.4px] text-[#C6FF33] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C6FF33] shadow-[0_0_8px_#C6FF33]" />
              TIMELINE // 2 DAYS OF ACTION
            </div>

            {/* Headline */}
            <h1 className="my-4 font-['Anton'] text-[clamp(52px,7.5vw,96px)] leading-[0.92] tracking-tight text-white">
              THE <span className="text-[#C6FF33] drop-shadow-[0_0_35px_rgba(198,255,51,0.25)]">RUN OF SHOW.</span>
            </h1>

            <p className="text-sm leading-relaxed text-[#a1a1aa] sm:text-base">
              Synchronize your calendar for the complete sequence of keynote
              sessions, competitive tracks, and collaborative exhibitions.
            </p>

            {/* Quick Status Chips */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 border border-white/10 bg-[#0e0e14]/80 px-3 py-1.5 text-xs text-[#d4d4d9]">
                <Calendar size={14} className="text-[#C6FF33]" />
                <span>Day 01 &amp; Day 02</span>
              </div>
              <div className="flex items-center gap-2 border border-white/10 bg-[#0e0e14]/80 px-3 py-1.5 text-xs text-[#d4d4d9]">
                <Clock size={14} className="text-[#7D39EB]" />
                <span>08:00 AM – 09:00 PM</span>
              </div>
              <div className="flex items-center gap-2 border border-white/10 bg-[#0e0e14]/80 px-3 py-1.5 text-xs text-[#d4d4d9]">
                <MapPin size={14} className="text-[#C6FF33]" />
                <span>Main Arena &amp; Parallel Labs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cyber Bottom Rule Bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/5 bg-[#08080c]/60 px-6 py-2 text-[10px] tracking-[2px] text-[#6b6975]">
          <span>DIGITAL NEXUS TIMELINE MATRIX</span>
          <span>SYNC STATUS // LIVE</span>
        </div>
      </section>

      {/* SCHEDULE CONTENT & TABS */}
      <section className="relative bg-[#07070b] py-16 lg:py-20">
        <div className="container relative z-10">
          {/* Glass Wrapper for ScheduleTabs */}
          <div className="relative border border-white/10 bg-[#0e0e14]/80 p-6 backdrop-blur-xl sm:p-10">
            {/* Chamfered Tech Corners */}
            <div className="pointer-events-none absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-[#C6FF33]" />
            <div className="pointer-events-none absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-[#C6FF33]" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-['Space_Grotesk'] text-xs font-bold tracking-wider text-white uppercase">
                <Sparkles size={14} className="text-[#C6FF33]" />
                <span>Active Schedule Feed</span>
              </div>
              <span className="text-[11px] text-[#85828e]">
                * Times and tracks subject to minor on-stage adjustments
              </span>
            </div>

            <ScheduleTabs />
          </div>
        </div>
      </section>
    </>
  );
}