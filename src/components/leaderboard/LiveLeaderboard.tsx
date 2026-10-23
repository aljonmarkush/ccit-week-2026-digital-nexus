"use client";
import { useEffect, useState } from "react";
import { Activity, Radio, Trophy } from "lucide-react";
import { readScoreUpdates, totalsFromUpdates, type ScoreUpdate } from "@/lib/live-scores";

export default function LiveLeaderboard() {
  const [updates, setUpdates] = useState<ScoreUpdate[]>([]);
  useEffect(() => {
    const refresh = () => setUpdates(readScoreUpdates());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("ccit-scores-updated", refresh);
    return () => { window.removeEventListener("storage", refresh); window.removeEventListener("ccit-scores-updated", refresh); };
  }, []);
  const standings = totalsFromUpdates(updates);
  const hasScores = updates.length > 0;
  return <div className="live-board-wrap">
    <div className="live-board-status"><span className="live-dot"/><Radio size={15}/> LIVE SCOREBOARD <span className="live-status-note">Updates as score entries are saved</span></div>
    {!hasScores && <div className="live-empty"><Trophy size={32}/><h3>THE RACE STARTS HERE.</h3><p>No group points have been recorded yet. Authorized organizers can add daily activity points in the Admin → Scores page.</p></div>}
    {hasScores && <div className="live-board-list">{standings.map((group, index) => <article className={`live-board-row rank-${index + 1}`} key={group.id}>
      <div className="live-rank">{String(index + 1).padStart(2, "0")}</div><div className="live-group-name"><strong>{group.name}</strong><span>{group.updates} score {group.updates === 1 ? "update" : "updates"}</span></div>
      <div className="live-points"><strong>{group.points.toLocaleString()}</strong><span>POINTS</span></div>
      <div className="live-meter"><span style={{ width: `${Math.max(3, (group.points / Math.max(1, standings[0]?.points)) * 100)}%` }}/></div>
    </article>)}</div>}
    {hasScores && <div className="live-recent"><h3><Activity size={16}/> RECENT DAILY UPDATES</h3>{[...updates].reverse().slice(0, 5).map(item => <div className="live-recent-item" key={item.id}><span>{item.date}</span><strong>{item.groupId === "404" ? "404 NOT FOUND" : item.groupId === "retry" ? "RETRY" : "CTRL C:V"}</strong><span>{item.activity || "Daily activity"}</span><b>+{item.points}</b></div>)}</div>}
    <p className="live-board-footnote">Prototype mode: updates sync across tabs in the same browser. For true multi-device live updates, connect Supabase Realtime and enforce administrator authentication before publishing.</p>
  </div>;
}
