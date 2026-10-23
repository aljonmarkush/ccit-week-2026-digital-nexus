import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EventItem } from "@/types";

export default function EventCard({ event, index }: { event: EventItem; index: number }) {
  return (
    <article className="event-card">
      <div className="event-card-top">
        <span className="category-pill">{event.category}</span>
        <span className="event-index">0{index + 1}</span>
      </div>

      <div className="event-art">
        <span className="art-orbit" />
        <span className="art-glyph">
          {["?", "✳", "▦", "⌘", "◉", "♟", "✦", "⌁", "★"][index % 9]}
        </span>
        <span className="art-line" />
      </div>

      <h3>{event.title}</h3>
      <p>{event.description}</p>

      <Link href={`/events/${event.slug}`} className="text-link">
        View mechanics <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}