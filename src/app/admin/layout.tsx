import Link from "next/link";
import { ShieldAlert, Terminal, LayoutDashboard, Trophy, Users, Megaphone } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* ELEVATED ADMIN HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#07060b] py-16 lg:py-20">
        {/* Ambient atmospheric glows */}
        <div className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] rounded-full bg-[#7D39EB]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#C6FF33]/10 blur-[100px]" />
        <div className="hero-grid pointer-events-none opacity-40" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Cyber Eyebrow Badge */}
            <div className="mb-4 inline-flex items-center gap-2 border border-[#C6FF33]/30 bg-[#C6FF33]/10 px-3.5 py-1.5 font-['Space_Grotesk'] text-[11px] font-bold tracking-[2.4px] text-[#C6FF33] uppercase">
              <ShieldAlert size={14} />
              <span>COMMAND CENTER // SECURE ACCESS</span>
            </div>

            {/* Headline */}
            <h1 className="my-3 font-['Anton'] text-[clamp(44px,6.5vw,82px)] leading-[0.92] tracking-tight text-white">
              ADMIN <span className="text-[#C6FF33] drop-shadow-[0_0_35px_rgba(198,255,51,0.25)]">PORTAL.</span>
            </h1>

            <p className="mb-8 text-sm leading-relaxed text-[#a1a1aa] sm:text-base">
              Manage live scoring updates, review participant sign-ups, and broadcast official announcements directly through the Supabase database.
            </p>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] px-4 py-2.5 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#C6FF33] hover:text-[#C6FF33]"
              >
                <LayoutDashboard size={14} className="text-[#C6FF33]" />
                <span>Overview</span>
              </Link>
              <Link
                href="/admin/scores"
                className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] px-4 py-2.5 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#C6FF33] hover:text-[#C6FF33]"
              >
                <Trophy size={14} className="text-[#7D39EB]" />
                <span>Scores</span>
              </Link>
              <Link
                href="/admin/registrations"
                className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] px-4 py-2.5 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#C6FF33] hover:text-[#C6FF33]"
              >
                <Users size={14} className="text-[#C6FF33]" />
                <span>Registrations</span>
              </Link>
              <Link
                href="/admin/announcements"
                className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] px-4 py-2.5 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#C6FF33] hover:text-[#C6FF33]"
              >
                <Megaphone size={14} className="text-[#7D39EB]" />
                <span>Announcements</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Cyber Bottom Rule Bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/5 bg-[#050507]/80 px-6 py-2 text-[10px] tracking-[2px] text-[#6b6975]">
          <span className="flex items-center gap-2">
            <Terminal size={12} className="text-[#C6FF33]" /> SUPABASE ADMIN BRIDGE
          </span>
          <span>AUTH // SECURE SESSION ACTIVE</span>
        </div>
      </section>

      {/* RENDERED CHILD PAGE CONTENT */}
      <div className="relative bg-[#050507]">
        {children}
      </div>
    </div>
  );
}