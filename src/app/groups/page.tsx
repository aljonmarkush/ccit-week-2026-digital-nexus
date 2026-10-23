"use client";
import { useEffect, useState } from "react";
import { groups } from "@/data/groups";
import Link from "next/link";
import { ArrowUpRight, Binary, Trophy } from "lucide-react";
import { supabase } from "@/lib/supabase";

type ScoreUpdate = {
  group_id: string;
  points: number;
};

export default function GroupsPage() {
  const [groupPoints, setGroupPoints] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchGroupTotals() {
      const { data, error } = await supabase.from("group_score_updates").select("group_id, points");
      if (!error && data) {
        const totals: Record<string, number> = {};
        data.forEach((item: ScoreUpdate) => {
          totals[item.group_id] = (totals[item.group_id] || 0) + item.points;
        });
        setGroupPoints(totals);
      }
    }

    fetchGroupTotals();

    const channel = supabase
      .channel("public-group-scores")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "group_score_updates" },
        () => {
          fetchGroupTotals();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow"><i /> THREE IDENTITIES / ONE COMMUNITY</span>
          <h1>WHO’S YOUR <span>SQUAD?</span></h1>
          <p>
            Meet the official competing groups. Show up for your team, respect every competitor, and keep the spirit bigger than the scoreboard.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container group-page-grid">
          {groups.map((g, i) => {
            const totalScore = (groupPoints[g.id] || 0) + (groupPoints[g.name] || 0);
            return (
              <article className={`group-detail group-${g.id}`} key={g.id}>
                <div className="group-number">0{i + 1}</div>
                <div>
                  <span className="eyebrow"><i /> OFFICIAL GROUP</span>
                  <h3>{g.name}</h3>
                  <p className="group-tagline">“{g.tagline}”</p>
                  <p>{g.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-[var(--lime)] font-bold">
                    <Trophy size={14} /> Live Total: {totalScore.toLocaleString()} PTS
                  </div>
                </div>
                <Binary size={32} />
              </article>
            );
          })}
        </div>

        <div className="container" style={{ marginTop: 35 }}>
          <Link className="button button-lime" href="/leaderboard">
            View leaderboard <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}