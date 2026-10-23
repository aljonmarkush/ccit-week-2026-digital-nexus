"use client";
import { useEffect, useState } from "react";
import { Activity, Radio, Trophy } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ScoreUpdate {
  id: string;
  groupId: string;
  points: number;
  activity: string;
  date: string;
}

export default function LiveLeaderboard() {
  const [updates, setUpdates] = useState<ScoreUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchScores = async () => {
    try {
      const { data, error } = await supabase
        .from("group_score_updates")
        .select("*");

      if (error) {
        console.error("Error fetching scores:", error.message);
      } else if (data) {
        const formatted: ScoreUpdate[] = data.map((item: any) => ({
          id: item.id,
          groupId: item.group_id,
          points: Number(item.points) || 0,
          activity: item.activity || "Daily activity",
          date: item.event_date || item.created_at?.split("T")[0] || "",
        }));
        setUpdates(formatted);
      }
    } catch (err) {
      console.error("Fetch exception:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();

    // Real-time listener for score updates
    const channel = supabase
      .channel("public:group_score_updates")
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

  // Compute total standings grouped by group_id
  const totalsMap: { [key: string]: { points: number; updates: number } } = {};
  updates.forEach((item) => {
    if (!totalsMap[item.groupId]) {
      totalsMap[item.groupId] = { points: 0, updates: 0 };
    }
    totalsMap[item.groupId].points += item.points;
    totalsMap[item.groupId].updates += 1;
  });

  const standings = Object.keys(totalsMap)
    .map((id) => ({
      id,
      name: id.toUpperCase(),
      points: totalsMap[id].points,
      updates: totalsMap[id].updates,
    }))
    .sort((a, b) => b.points - a.points);

  const hasScores = updates.length > 0;

  return (
    <div className="live-board-wrap">
      <div className="live-board-status">
        <span className="live-dot" />
        <Radio size={15} /> LIVE SCOREBOARD{" "}
        <span className="live-status-note">Synced live with Supabase database</span>
      </div>

      {loading && (
        <div className="live-empty">
          <p>Loading live scores...</p>
        </div>
      )}

      {!loading && !hasScores && (
        <div className="live-empty">
          <Trophy size={32} />
          <h3>THE RACE STARTS HERE.</h3>
          <p>No group points have been recorded yet. Authorized organizers can add daily activity points in the Admin → Scores page.</p>
        </div>
      )}

      {!loading && hasScores && (
        <div className="live-board-list">
          {standings.map((group, index) => (
            <article className={`live-board-row rank-${index + 1}`} key={group.id}>
              <div className="live-rank">{String(index + 1).padStart(2, "0")}</div>
              <div className="live-group-name">
                <strong>{group.name}</strong>
                <span>{group.updates} score {group.updates === 1 ? "update" : "updates"}</span>
              </div>
              <div className="live-points">
                <strong>{group.points.toLocaleString()}</strong>
                <span>POINTS</span>
              </div>
              <div className="live-meter">
                <span
                  style={{
                    width: `${Math.max(
                      3,
                      (group.points / Math.max(1, standings[0]?.points)) * 100
                    )}%`,
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && hasScores && (
        <div className="live-recent">
          <h3>
            <Activity size={16} /> RECENT DAILY UPDATES
          </h3>
          {[...updates].reverse().slice(0, 5).map((item) => (
            <div className="live-recent-item" key={item.id}>
              <span>{item.date}</span>
              <strong>{item.groupId.toUpperCase()}</strong>
              <span>{item.activity || "Daily activity"}</span>
              <b>+{item.points}</b>
            </div>
          ))}
        </div>
      )}
      <p className="live-board-footnote">
        Production mode: connected to Supabase live database with real-time updates.
      </p>
    </div>
  );
}