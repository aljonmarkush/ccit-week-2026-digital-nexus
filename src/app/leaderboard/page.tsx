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
  note?: string;
}

export default function LiveLeaderboard() {
  const [updates, setUpdates] = useState<ScoreUpdate[]>([]);

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
          note: item.note || "",
        }));
        setUpdates(formatted);
      }
    } catch (err) {
      console.error("Fetch exception:", err);
    }
  };

  useEffect(() => {
    fetchScores();

    // Listen for real-time updates from Supabase
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

  // Compute standings totals by group_id
  const totalsMap: { [key: string]: { points: number; updates: number } } = {};
  updates.forEach((item) => {
    const key = item.groupId;
    if (!totalsMap[key]) {
      totalsMap[key] = { points: 0, updates: 0 };
    }
    totalsMap[key].points += item.points;
    totalsMap[key].updates += 1;
  });

  const standings = Object.keys(totalsMap)
    .map((id) => ({
      id,
      name: id === "404" ? "404 NOT FOUND" : id === "retry" ? "RETRY" : id.toUpperCase(),
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
        <span className="live-status-note">Updates as score entries are saved</span>
      </div>

      {!hasScores && (
        <div className="live-empty">
          <Trophy size={32} />
          <h3>THE RACE STARTS HERE.</h3>
          <p>No group points have been recorded yet. Authorized organizers can add daily activity points in the Admin → Scores page.</p>
        </div>
      )}

      {hasScores && (
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

      {hasScores && (
        <div className="live-recent">
          <h3>
            <Activity size={16} /> RECENT DAILY UPDATES
          </h3>
          {[...updates].reverse().slice(0, 5).map((item) => (
            <div className="live-recent-item" key={item.id}>
              <span>{item.date}</span>
              <strong>{item.groupId === "404" ? "404 NOT FOUND" : item.groupId === "retry" ? "RETRY" : item.groupId.toUpperCase()}</strong>
              <span>{item.activity || "Daily activity"}</span>
              <b>+{item.points}</b>
            </div>
          ))}
        </div>
      )}

      <p className="live-board-footnote">
        Synced live with Supabase database. Real-time updates active.
      </p>
    </div>
  );
}