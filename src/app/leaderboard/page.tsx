import LiveLeaderboard from "@/components/leaderboard/LiveLeaderboard";

export default function LeaderboardPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow"><i /> OFFICIAL STANDINGS / LIVE TRACKER</span>
          <h1>POINTS <span>DON'T LIE.</span></h1>
          <p>
            Daily group activity points appear here as organizers record updates. The leaderboard recalculates automatically.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <LiveLeaderboard />
        </div>
      </section>
    </>
  );
}