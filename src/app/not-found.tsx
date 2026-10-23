import Link from "next/link";
import { ArrowLeft, Terminal, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden px-6 py-20">
      {/* Background ambient neon glow & grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,57,235,0.22),transparent_65%)]" />
      <div className="hero-grid pointer-events-none opacity-40" />

      <div className="container relative z-10 max-w-xl">
        <div className="relative border border-white/10 bg-[#0e0e14]/90 p-8 text-center backdrop-blur-xl sm:p-12">
          {/* Tech corner accents */}
          <div className="pointer-events-none absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-[#C6FF33]" />
          <div className="pointer-events-none absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-[#C6FF33]" />

          {/* Status badge */}
          <div className="mb-4 inline-flex items-center gap-2 border border-[#C6FF33]/30 bg-[#C6FF33]/10 px-3 py-1 font-['Space_Grotesk'] text-[11px] font-bold tracking-[2px] text-[#C6FF33] uppercase">
            <AlertTriangle size={13} />
            <span>ERROR 404 // SIGNAL LOST</span>
          </div>

          {/* Giant Glitch / Anton 404 */}
          <h1 className="my-2 font-['Anton'] text-[clamp(80px,16vw,130px)] leading-none tracking-tight text-[#C6FF33] drop-shadow-[0_0_35px_rgba(198,255,51,0.28)]">
            404
          </h1>

          <h2 className="mb-3 font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-white sm:text-3xl">
            COORDINATES NOT FOUND
          </h2>

          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[#a1a1aa]">
            The route you attempted to access does not exist or has been
            disconnected from the Digital Nexus mainframe.
          </p>

          {/* Cyber Terminal Breadcrumb */}
          <div className="mb-8 flex items-center justify-center gap-2 border border-white/5 bg-[#050507]/80 px-4 py-2 font-mono text-xs text-[#85828e]">
            <Terminal size={14} className="text-[#7D39EB]" />
            <span>STATUS: TARGET_DESTINATION_NULL</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="button button-lime">
              <ArrowLeft size={16} />
              Return to Nexus
            </Link>
            <Link href="/events" className="button button-outline">
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}