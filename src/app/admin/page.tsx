"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, Users, Megaphone, ShieldCheck, ArrowUpRight, Lock, LogIn, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Stats state
  const [stats, setStats] = useState({
    scoreUpdates: 0,
    registrations: 0,
    announcements: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    checkAdminSession();
  }, []);

  async function checkAdminSession() {
    setLoadingAuth(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Verify against ccit_admins table
      const { data: adminRecord } = await supabase
        .from("ccit_admins")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (adminRecord) {
        setIsAdmin(true);
        fetchDatabaseMetrics();
      }
    }
    setLoadingAuth(false);
  }

  async function fetchDatabaseMetrics() {
    setStatsLoading(true);
    const [scoresRes, regsRes, annRes] = await Promise.all([
      supabase.from("group_score_updates").select("*", { count: "exact", head: true }),
      supabase.from("registrations").select("*", { count: "exact", head: true }),
      supabase.from("announcements").select("*", { count: "exact", head: true }),
    ]);

    setStats({
      scoreUpdates: scoresRes.count || 0,
      registrations: regsRes.count || 0,
      announcements: annRes.count || 0,
    });
    setStatsLoading(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert("Login error: " + error.message);
      setAuthLoading(false);
      return;
    }

    if (data.user) {
      // Check if user exists in ccit_admins table
      const { data: adminRecord } = await supabase
        .from("ccit_admins")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      if (adminRecord) {
        setIsAdmin(true);
        fetchDatabaseMetrics();
      } else {
        alert("Access Denied: This account is not authorized as a CCIT Admin.");
        await supabase.auth.signOut();
      }
    }
    setAuthLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsAdmin(false);
  }

  if (loadingAuth) {
    return (
      <section className="page-content py-24">
        <div className="container text-center text-xs text-[#aaa]">
          Verifying Nexus security clearance...
        </div>
      </section>
    );
  }

  // ORGANIZER LOGIN SCREEN
  if (!isAdmin) {
    return (
      <section className="page-content py-20">
        <div className="container max-w-md">
          <div className="border border-white/10 bg-[#0e0e14] p-8 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-2 text-[11px] font-bold tracking-[2px] text-[var(--lime)] uppercase">
              <Lock size={16} /> ORGANIZER ACCESS
            </div>
            <h2 className="font-['Anton'] text-3xl mb-2 text-white">ADMIN LOGIN</h2>
            <p className="text-xs text-[#a1a1aa] mb-6">
              Enter your authorized organizer credentials to manage the Digital Nexus platform.
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <label className="text-xs text-[#d4d4d9]">
                Email Address
                <input
                  type="email"
                  className="w-full mt-1 bg-[#050507] border border-white/10 p-3 text-white text-sm focus:border-[var(--lime)] outline-none"
                  placeholder="organizer@ccit.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="text-xs text-[#d4d4d9]">
                Password
                <input
                  type="password"
                  className="w-full mt-1 bg-[#050507] border border-white/10 p-3 text-white text-sm focus:border-[var(--lime)] outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <button type="submit" className="button button-lime mt-2 w-full justify-center py-3" disabled={authLoading}>
                {authLoading ? "Authenticating..." : <><LogIn size={16} /> Authorize Login</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // ORGANIZER COMMAND CENTER OVERVIEW
  return (
    <section className="page-content py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="eyebrow text-[var(--lime)]">// ORGANIZER COMMAND</span>
            <h2 className="content-title text-3xl font-['Anton'] mt-1">SYSTEM OVERVIEW</h2>
          </div>
          <button
            onClick={handleLogout}
            className="score-delete flex items-center gap-2 px-3 py-2 text-xs"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>

        {/* Live Metrics Grid */}
        <div className="admin-preview grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="admin-tile p-6 bg-[#0e0e14] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Trophy size={20} className="text-[var(--lime)]" />
              <span className="text-[10px] text-[#85828e] tracking-wider uppercase">Scores Logged</span>
            </div>
            <b>{statsLoading ? "..." : stats.scoreUpdates}</b>
            <span>Recorded score entries</span>
          </div>

          <div className="admin-tile p-6 bg-[#0e0e14] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Users size={20} className="text-[#7D39EB]" />
              <span className="text-[10px] text-[#85828e] tracking-wider uppercase">Registrations</span>
            </div>
            <b>{statsLoading ? "..." : stats.registrations}</b>
            <span>Total participant sign-ups</span>
          </div>

          <div className="admin-tile p-6 bg-[#0e0e14] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Megaphone size={20} className="text-[var(--lime)]" />
              <span className="text-[10px] text-[#85828e] tracking-wider uppercase">Announcements</span>
            </div>
            <b>{statsLoading ? "..." : stats.announcements}</b>
            <span>Active live broadcasts</span>
          </div>
        </div>

        {/* Live Status Notification */}
        <div className="admin-warning flex items-start gap-3 bg-[rgba(198,255,51,0.05)] border border-[rgba(198,255,51,0.2)] p-4 text-xs text-[#d9e9ae]">
          <ShieldCheck size={18} className="text-[var(--lime)] shrink-0 mt-0.5" />
          <div>
            <strong className="block text-white mb-1">Supabase Database Connected &amp; Secure</strong>
            Logged in as primary event organizer. All score adjustments, announcements, and registrations synchronize in real-time.
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
          <Link className="button button-lime" href="/admin/scores">
            Manage Scores <ArrowUpRight size={16} />
          </Link>
          <Link className="button button-outline" href="/admin/registrations">
            View Registrations <ArrowUpRight size={16} />
          </Link>
          <Link className="button button-outline" href="/admin/announcements">
            Publish Announcement <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}