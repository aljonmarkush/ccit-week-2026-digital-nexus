"use client";
import { FormEvent, useEffect, useState } from "react";
import { Activity, Save, Trash2, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { groups } from "@/data/groups"; // Imported directly from your data source!

type ScoreUpdate = {
  id: string;
  group_id: string;
  points: number;
  activity: string;
  note: string;
  event_date: string;
  updated_at: string;
  updated_by?: string;
};

export default function AdminScores() {
  const [updates, setUpdates] = useState<ScoreUpdate[]>([]);
  // Initialize with the first official group ID
  const [groupId, setGroupId] = useState(groups[0]?.id || "group-1");
  const [points, setPoints] = useState("10");
  const [activity, setActivity] = useState("Daily group activity");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [updatedBy, setUpdatedBy] = useState("CCIT Organizer");
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchScores();

    const channel = supabase
      .channel("admin-score-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "group_score_updates" },
        () => {
          fetchScores();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchScores() {
    setLoading(true);
    const { data, error } = await supabase
      .from("group_score_updates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching scores:", error.message);
    } else {
      setUpdates(data || []);
    }
    setLoading(false);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const numeric = Number(points);
    if (!Number.isFinite(numeric) || numeric < 0 || numeric > 10000) return;

    setSuccessMsg("");

    const { error } = await supabase.from("group_score_updates").insert([
      {
        group_id: groupId, // Stores the official group id/name
        points: numeric,
        activity: activity.trim(),
        note: note.trim(),
        event_date: date,
      },
    ]);

    if (error) {
      alert("Error saving score: " + error.message);
    } else {
      setSuccessMsg(`Successfully added +${numeric} pts!`);
      setNote("");
      fetchScores();
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this score update? Group totals will recalculate.")) return;

    const { error } = await supabase
      .from("group_score_updates")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting score: " + error.message);
    } else {
      fetchScores();
    }
  }

  // Calculate totals dynamically using official groups data
  const totalsMap = groups.map((group) => {
    const groupUpdates = updates.filter((u) => u.group_id === group.id || u.group_id === group.name);
    const totalPoints = groupUpdates.reduce((sum, u) => sum + (u.points || 0), 0);
    return {
      id: group.id,
      name: group.name,
      points: totalPoints,
      updates: groupUpdates.length,
    };
  });

  const totals = totalsMap.sort((a, b) => b.points - a.points);

  return (
    <section className="page-content">
      <div className="container">
        <span className="eyebrow"><i /> ORGANIZER TOOLS</span>
        <h2 className="content-title">LIVE GROUP SCORE MANAGEMENT</h2>
        <p className="admin-intro">
          Add daily points for completed activities, attendance, teamwork, group spirit, or other organizer-approved measures. Every saved entry instantly updates the Supabase database and public leaderboard.
        </p>

        <div className="admin-warning" style={{ borderColor: "rgba(198,255,51,0.3)" }}>
          <ShieldCheck size={16} style={{ color: "var(--lime)" }} />
          <span>Supabase live database connected: Scores sync securely across all devices and judges in real-time.</span>
        </div>

        {successMsg && (
          <div className="admin-warning" style={{ background: "rgba(198,255,51,0.1)", marginTop: "15px" }}>
            <ShieldCheck size={16} style={{ color: "var(--lime)" }} />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="score-admin-grid">
          <form className="score-entry-form" onSubmit={submit}>
            <h3>
              <Activity size={18} /> ADD DAILY SCORE UPDATE
            </h3>
            <label>
              Group
              <select value={groupId} onChange={(e) => setGroupId(e.target.value)}>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-two-col">
              <label>
                Points to add
                <input
                  type="number"
                  min="0"
                  max="10000"
                  step="1"
                  required
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                />
              </label>
              <label>
                Date
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
            </div>
            <label>
              Activity completed
              <input
                required
                maxLength={100}
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="e.g. Booth setup, attendance"
              />
            </label>
            <label>
              Reason / notes
              <textarea
                maxLength={500}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Describe the accomplishment and why these points were awarded."
                rows={3}
              />
            </label>
            <label>
              Recorded by
              <input
                value={updatedBy}
                onChange={(e) => setUpdatedBy(e.target.value)}
                maxLength={80}
              />
            </label>
            <button className="button button-lime" type="submit">
              <Save size={16} /> Save points &amp; update leaderboard
            </button>
          </form>

          <div className="score-totals-card">
            <h3>LIVE TOTALS</h3>
            {totals.map((group, index) => (
              <div className="score-total-line" key={group.id}>
                <span className="score-total-rank">{index + 1}</span>
                <div>
                  <strong>{group.name}</strong>
                  <small>{group.updates} recorded updates</small>
                </div>
                <b>{group.points.toLocaleString()}</b>
              </div>
            ))}
            <p>Totals are calculated dynamically from Supabase database entries.</p>
          </div>
        </div>

        <div className="score-history">
          <div className="score-history-head">
            <h3>DAILY SCORE HISTORY</h3>
            <span>{updates.length} entries</span>
          </div>
          {loading ? (
            <p className="score-history-empty">Synchronizing score records...</p>
          ) : updates.length === 0 ? (
            <p className="score-history-empty">No entries yet. Add the first daily group score above.</p>
          ) : (
            <div className="score-history-list">
              {updates.map((item) => {
                const matchedGroup = groups.find((g) => g.id === item.group_id || g.name === item.group_id);
                return (
                  <article className="score-history-item" key={item.id}>
                    <div className="score-history-main">
                      <div>
                        <strong>{matchedGroup ? matchedGroup.name : item.group_id}</strong>
                        <span>
                          {item.event_date} · {item.activity}
                        </span>
                        {item.note && <p>{item.note}</p>}
                        <small>Recorded via Supabase Live Sync</small>
                      </div>
                      <b>+{item.points}</b>
                    </div>
                    <button
                      type="button"
                      className="score-delete"
                      onClick={() => remove(item.id)}
                      aria-label="Delete score update"
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}