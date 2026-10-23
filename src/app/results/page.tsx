import type { Metadata } from "next";
import { Award, ShieldCheck, Trophy, Sparkles, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Official Results & Standings",
  description:
    "Verified final scores, judge-certified rankings, and competitive event results for CCIT Week 2026: Digital Nexus.",
};

export default function ResultsPage() {
  return (
    <>
      {/* ELEVATED RESULTS HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#050507] py-20 lg:py-24">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute right-10 top-0 h-[400px] w-[400px] rounded-full bg-[#7D39EB]/20 blur-[130px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[320px] w-[320px] rounded-full bg-[#C6FF33]/10 blur-[110px]" />
        <div className="hero-grid pointer-events-none opacity-40" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Cyber Eyebrow Badge */}
            <div className="mb-6 inline-flex items-center gap-2.5 border border-[#C6FF33]/30 bg-[#C6FF33]/10 px-3.5 py-1.5 font-['Space_Grotesk'] text-[11px] font-bold tracking-[2.4px] text-[#C6FF33] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C6FF33] shadow-[0_0_8px_#C6FF33]" />
              THE OFFICIAL RECORD // VERIFIED
            </div>

            {/* Headline */}
            <h1 className="my-4 font-['Anton'] text-[clamp(52px,7.5vw,96px)] leading-[0.92] tracking-tight text-white">
              RESULTS, <span className="text-[#C6FF33] drop-shadow-[0_0_35px_rgba(198,255,51,0.25)]">VERIFIED.</span>
            </h1>

            <p className="text-sm leading-relaxed text-[#a1a1aa] sm:text-base">
              Official standings, judge-certified competition scores, and final event podiums will be securely published here upon committee authorization.
            </p>

            {/* Status Telemetry */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 border border-white/10 bg-[#0e0e14]/80 px-3.5 py-1.5 text-xs text-[#d4d4d9]">
                <ShieldCheck size={15} className="text-[#C6FF33]" />
                <span>Committee Authorized Only</span>
              </div>
              <div className="flex items-center gap-2 border border-white/10 bg-[#0e0e14]/80 px-3.5 py-1.5 text-xs text-[#d4d4d9]">
                <Trophy size={15} className="text-[#7D39EB]" />
                <span>Podiums &amp; Special Awards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cyber Bottom Rule Bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/5 bg-[#08080c]/60 px-6 py-2 text-[10px] tracking-[2px] text-[#6b6975]">
          <span>INTEGRITY VERIFICATION MATRIX</span>
          <span>STATUS // AWAITING FINAL TALLY</span>
        </div>
      </section>

      {/* RESULTS CONTENT SECTION */}
      <section className="relative bg-[#07070b] py-20 lg:py-24">
        <div className="container relative z-10 max-w-3xl">
          {/* Glassmorphic Container with Chamfered Corners */}
          <div className="relative border border-white/10 bg-[#0e0e14]/85 p-8 backdrop-blur-xl sm:p-12">
            <div className="pointer-events-none absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-[#C6FF33]" />
            <div className="pointer-events-none absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-[#C6FF33]" />

            {/* Top Indicator */}
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-['Space_Grotesk'] text-xs font-bold tracking-wider text-white uppercase">
                <Sparkles size={14} className="text-[#C6FF33]" />
                <span>Official Tally Feed</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#85828e]">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Pending Judge Sign-off</span>
              </div>
            </div>

            {/* Enhanced Empty State Box */}
            <div className="empty-state border border-dashed border-white/10 bg-[#050507]/60 p-10 text-center sm:p-14">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#C6FF33]/10 text-[#C6FF33] shadow-[0_0_20px_rgba(198,255,51,0.15)]">
                <Award size={36} />
              </div>
              <h3 className="font-['Anton'] text-2xl font-normal tracking-wide text-white sm:text-3xl">
                Official results are not available yet.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-[#a1a1aa] sm:text-sm">
                Results will appear here immediately after judges’ scores are audited, verified, and authorized for public publication.
              </p>

              {/* Terminal Notice */}
              <div className="mx-auto mt-8 inline-flex items-center gap-2 border border-white/5 bg-white/[0.02] px-4 py-2 font-mono text-[11px] text-[#777]">
                <AlertCircle size={13} className="text-[#7D39EB]" />
                <span>SECURE_SCORE_VAULT // STATUS: LOCKED</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}