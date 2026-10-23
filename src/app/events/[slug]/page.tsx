import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { events } from "@/data/events";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default function EventDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const event = events.find((e) => e.slug === slug);

  if (!event) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Link href="/events" className="text-link">
            <ArrowLeft size={15} /> All events
          </Link>
          <div className="event-detail-head">
            <div>
              <span className="eyebrow">
                <i /> {event.category.toUpperCase()} / EVENT MECHANICS
              </span>
              <h1>{event.title.toUpperCase()}</h1>
              <p>{event.description}</p>
            </div>
            <span className="category-pill">CCIT WEEK 2026</span>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container detail-columns">
          <div>
            <h2 className="content-title">JUDGING CRITERIA</h2>
            {event.criteria.length ? (
              <table className="criteria-table">
                <thead>
                  <tr>
                    <th>Criteria</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {event.criteria.map((c) => (
                    <tr key={c.name}>
                      <td>
                        {c.name}
                        <div className="criteria-bar">
                          <span style={{ width: `${c.percent}%` }} />
                        </div>
                      </td>
                      <td>{c.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="score-note">
                This activity is determined by official match results, game-specific rules, and pre-announced tie-breakers. The organizing committee must publish the full mechanics before competition begins.
              </div>
            )}

            <h2 className="content-title" style={{ marginTop: 42 }}>
              AWARDS
            </h2>
            <div className="detail-panel">
              <ul>
                {event.awards.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside>
            <div className="detail-panel">
              <h3>
                <CheckCircle2
                  size={17}
                  style={{ display: "inline", color: "var(--lime)", marginRight: 8 }}
                />
                Before you compete
              </h3>
              <ul>
                <li>Read the official mechanics and eligibility requirements.</li>
                <li>Follow instructions from the assigned facilitators and judges.</li>
                <li>Respect all participants and practice good sportsmanship.</li>
                <li>Follow announced tie-breaker and appeal procedures.</li>
              </ul>
              <p>
                Official date, venue, registration status, and organizer contact will be posted once confirmed.
              </p>
              <Link className="button button-lime" href="/registration">
                Register interest ↗
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}