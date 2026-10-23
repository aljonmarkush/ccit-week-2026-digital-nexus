import LiveLeaderboard from "@/components/leaderboard/LiveLeaderboard";

export default function LeaderboardPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <i /> OFFICIAL STANDINGS / LIVE TRACKER
          </span>
          <h1>
            POINTS DON’T <span>LIE.</span>
          </h1>
          <p>
            Daily group activity points appear here as organizers record updates. The leaderboard recalculates automatically.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <LiveLeaderboard />

          <h2 className="content-title" style={{ marginTop: 50 }}>
            DEFAULT PLACEMENT POINTS
          </h2>

          <table className="score-table">
            <thead>
              <tr>
                <th>Placement</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Champion</td>
                <td>100</td>
              </tr>
              <tr>
                <td>1st Runner-Up</td>
                <td>75</td>
              </tr>
              <tr>
                <td>2nd Runner-Up</td>
                <td>50</td>
              </tr>
              <tr>
                <td>Eligible participation</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>

          <p className="schedule-disclaimer">
            Confirm the approved activity-point policy before the event. Daily activity points can be used for participation, attendance, teamwork, spirit, and approved accomplishments. Keep criteria transparent and consistent across all groups.
          </p>
        </div>
      </section>
    </>
  );
}