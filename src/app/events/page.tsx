import { events } from "@/data/events";
import EventCard from "@/components/events/EventCard";

export default function EventsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <i /> THE EVENT INDEX
          </span>
          <h1>
            FIND YOUR <span>ARENA.</span>
          </h1>
          <p>
            Every challenge is a chance to create, compete, collaborate, and represent. Explore the activities and read the official mechanics before joining.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="event-grid event-grid-full">
            {events.map((event, i) => (
              <EventCard key={event.slug} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}