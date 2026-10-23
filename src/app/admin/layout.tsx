"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldAlert, Terminal, LayoutDashboard, Trophy, Users, Megaphone, Lock, Loader2, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const adminSession = sessionStorage.getItem("ccit_admin_auth");
    if (adminSession === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Authorized organizer passcode
    if (passcode === "ccit2026admin") {
      sessionStorage.setItem("ccit_admin_auth", "true");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("ccit_admin_auth");
    setIsAuthenticated(false);
    setPasscode("");
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-[#C6FF33]" size={32} />
      </div>
    );
  }

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#07060b] border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#7D39EB]/20 blur-[80px]" />
          
          <div className="flex justify-center mb-6 relative z-10">
            <div className="h-14 w-14 rounded-xl bg-emerald-500/10 border border-[#C6FF33]/30 flex items-center justify-center text-[#C6FF33] shadow-[0_0_20px_rgba(198,255,51,0.2)]">
              <Lock size={26} />
            </div>
          </div>
          
          <h2 className="text-3xl font-anton tracking-wide text-center text-white mb-1 relative z-10">
            ADMIN <span className="text-[#C6FF33]">PORTAL.</span>
          </h2>
          <p className="text-[#a1a1aa] text-xs text-center mb-6 relative z-10">
            Enter the authorized organizer passcode to unlock secure database management.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full bg-zinc-900 border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C6FF33] transition-colors"
                required
              />
            </div>
            {error && <p className="text-red-400 text-xs text-center font-medium">Incorrect passcode. Access denied.</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#C6FF33] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#b2ef22] transition-all shadow-lg shadow-[#C6FF33]/10"
            >
              AUTHENTICATE COMMAND CENTER
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render full secured admin layout when authenticated
  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* ELEVATED ADMIN HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#07060b] py-16 lg:py-20">
        {/* Ambient atmospheric glows */}
        <div className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] rounded-full bg-[#7D39EB]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#C6FF33]/10 blur-[100px]" />

        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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

            {/* Logout Button */}
            <div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-4 py-2.5 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-red-400 transition-all hover:bg-red-500 hover:text-white"
              >
                <LogOut size={14} />
                <span>Lock Session</span>
              </button>
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