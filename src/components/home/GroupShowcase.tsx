import Link from "next/link";
import { ArrowUpRight, Binary } from "lucide-react";
import { groups } from "@/data/groups";

export default function GroupShowcase() {
  return (
    <div className="group-grid">
      {groups.map((g, i) => (
        <article key={g.id} className={`group-card group-${g.id}`}>
          <div className="group-top">
            <span>GROUP / 0{i + 1}</span>
            <Binary size={22} />
          </div>
          <div className="group-number">0{i + 1}</div>
          <h3>{g.name}</h3>
          <p className="group-tagline">“{g.tagline}”</p>
          <p>{g.description}</p>
          <Link href="/groups" className="text-link">
            Meet the group <ArrowUpRight size={16} />
          </Link>
        </article>
      ))}
    </div>
  );
}