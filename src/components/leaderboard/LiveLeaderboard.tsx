"use client";
import { useEffect, useState } from "react";
import { Activity, Radio, Trophy } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { groups } from "@/data/groups";

type ScoreUpdate = {
  id: string;
  group_id: string;
  points: number;
  activity: string;
  event_date: string;
  created_at: string;
};

export default function LiveLeaderboard() {
  const [updates, setUpdates] = useState<ScoreUpdate[]>([]);
  const [groupPoints, setGroupPoints] = useState<Record<string, number>>({});

  const fetchScores = async () => {
    const { data, error } = await supabase
      .from("group_score_updates")
      .select("*");

    if (!error && data) {
      setUpdates(data);
      const totals: Record<string, number> = {};
      data.forEach((item: ScoreUpdate) => {
        const key = item.group_id;
        totals[key] = (totals[key] || 0) + Number(item.points || 0);
      });
      setGroupPoints(totals);
    }
  };

  useEffect(() => {
    fetchScores();

    // Real-time synchronization channel
    const channel = supabase
      .channel("public-group-scores")
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

  // Compute standings based on registered groups or score keys
  const standings = groups
    .map((g) => {
      const points = (groupPoints[g.id] || 0) + (groupPoints[g.name] || 0);
      const groupUpdatesCount = updates.filter(
        (u) => u.group_id === g.id || u.group_id === g.name
      ).length;
      return {
        id: g.id,
        name: g.name,
        points,
        updates: groupUpdatesCount,
      };
    })
    .sort((a, b) => b.points - a.points);

  const hasScores = updates.length > 0;
  const topScore = standings[0]?.points || 1;

  return (
    <div className="live-board-wrap">
      <div className="live-board-status">
        <span className="live-dot" />
        <Radio size={15} /> LIVE SCOREBOARD{" "}
        <span className="live-status-note">Synced live with Supabase database</span>
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
                    width: `${Math.max(3, (group.points / Math.max(1, topScore)) * 100)}%`,
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
              <span>{item.event_date || item.created_at?.split("T")[0]}</span>
              <strong>{item.group_id.toUpperCase()}</strong>
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