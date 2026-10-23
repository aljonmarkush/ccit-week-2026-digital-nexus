import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Cpu,
  Zap,
  Users,
  Trophy,
  MoonStar,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import Countdown from "@/components/home/Countdown";
import GroupShowcase from "@/components/home/GroupShowcase";
import EventCard from "@/components/events/EventCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { events } from "@/data/events";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-noise" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">
              <i /> COLLEGE OF COMPUTING & INFORMATION TECHNOLOGY
            </span>
            <h1>
              CCIT WEEK <span>2026</span>
              <em>DIGITAL NEXUS</em>
            </h1>
            <p className="hero-lead">
              Innovate today.
              <br />
              <span>Transform tomorrow.</span>
            </p>
            <p className="hero-description">
              A collision of code, creativity, competition, and community. Built
              by the digital generation.
            </p>
            <div className="hero-actions">
              <Link className="button button-lime" href="/events">
                Explore events <ArrowUpRight size={17} />
              </Link>
              <Link className="button button-outline" href="/schedule">
                View schedule
              </Link>
            </div>
            <div className="hero-meta">
              <span>
                <b>03</b> COMPETING GROUPS
              </span>
              <span>
                <b>02</b> DAYS OF ACTION
              </span>
              <span>
                <b>∞</b> POSSIBILITIES
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-frame">
              <div className="visual-corner tl" />
              <div className="visual-corner br" />
              <div className="logo-disc">
                <Image
                  src="/images/ccit-logo.png"
                  alt="CCIT sports and technology logo"
                  width={340}
                  height={510}
                  priority
                />
              </div>
              <span className="orbit orbit-one" />
              <span className="orbit orbit-two" />
              <span className="visual-tag tag-top">// SYSTEM ONLINE</span>
              <span className="visual-tag tag-bottom">INNOVATION / 2026</span>
              <span className="binary binary-left">
                01001
                <br />
                10110
                <br />
                01101
              </span>
              <span className="binary binary-right">
                10110
                <br />
                01001
                <br />
                11010
              </span>
            </div>
            <div className="hero-side-label">TECH · CULTURE · COMPETITION</div>
          </div>
        </div>
        <a className="scroll-cue" href="#intro">
          <ArrowDown size={16} /> SCROLL TO EXPLORE
        </a>
        <div className="hero-bottomline">
          <span>EST. FOR THE NEXT GENERATION</span>
          <span>CCIT / 2026</span>
        </div>
      </section>

      <section id="intro" className="intro-section section-pad">
        <div className="container intro-grid">
          <div>
            <SectionHeading
              eyebrow="THE NEXT CHAPTER"
              title="MORE THAN A WEEK. A MOVEMENT."
              description="Where ideas get tested, talent gets seen, and the next generation of digital creators takes the stage."
            />
          </div>
          <div className="intro-side">
            <p>
              From competitive coding energy to creative design, strategic
              games, and unforgettable campus moments—Digital Nexus brings every
              corner of CCIT together.
            </p>
            <Link href="/about" className="text-link">
              Discover the vision <ArrowUpRight size={16} />
            </Link>
            <div className="stat-strip">
              <div>
                <Cpu />
                <b>TECH</b>
                <span>Think beyond</span>
              </div>
              <div>
                <Zap />
                <b>ENERGY</b>
                <span>Play to win</span>
              </div>
              <div>
                <Users />
                <b>UNITY</b>
                <span>Build together</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="countdown-section">
        <div className="container countdown-wrap">
          <div>
            <span className="eyebrow">
              <i /> THE COUNTDOWN
            </span>
            <h2>
              READY TO <span>CONNECT?</span>
            </h2>
            <p>Official kickoff schedule and live arena updates.</p>
          </div>
          <Countdown />
        </div>
      </section>

      <section className="section-pad events-section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="THE LINEUP"
              title="CHOOSE YOUR ARENA"
              description="Academic challenges, digital creativity, innovation, gaming, and campus culture."
            />
            <Link href="/events" className="button button-outline">
              All events <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="event-grid home-event-grid">
            {events.slice(0, 4).map((event, i) => (
              <EventCard event={event} index={i} key={event.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="groups-section section-pad">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="THREE TEAMS. ONE NEXUS."
              title="MEET YOUR COMPETITORS"
              description="Different identities. One shared mission: bring the energy and represent your group."
            />
            <Link href="/groups" className="text-link">
              Explore groups <ArrowUpRight size={16} />
            </Link>
          </div>
          <GroupShowcase />
        </div>
      </section>

      <section
        className="ccit-night-section section-pad"
        id="ccit-night"
        data-reveal-section
      >
        <div className="ccit-night-glow" />
        <div className="container ccit-night-grid">
          <div className="ccit-night-copy" data-reveal="left">
            <span className="eyebrow">
              <i /> THE GRAND FINALE
            </span>
            <p className="night-kicker">ONE NIGHT. EVERY SPOTLIGHT.</p>
            <h2>
              WELCOME TO
              <br />
              <span>CCIT NIGHT.</span>
            </h2>
            <p className="night-description">
              The celebration where talent, confidence, creativity, and CCIT
              pride take center stage. Meet the candidates, cheer for your
              group, and celebrate the people who make the Digital Nexus
              unforgettable.
            </p>
            <div className="night-tags">
              <span>
                <Sparkles size={14} /> Candidate Showcase
              </span>
              <span>
                <Trophy size={14} /> Coronation & Awards
              </span>
              <span>
                <Users size={14} /> Community Celebration
              </span>
            </div>
            <Link href="/ccit-night" className="button button-lime">
              Explore CCIT Night <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="night-poster" data-reveal="right">
            <div className="night-poster-top">
              <span>CCIT / 2026</span>
              <MoonStar size={20} />
            </div>
            <div className="night-poster-word">
              CCIT
              <br />
              <em>NIGHT</em>
            </div>
            <div className="night-poster-orbit orbit-a" />
            <div className="night-poster-orbit orbit-b" />
            <div className="night-poster-bottom">
              <span>CONFIDENCE</span>
              <span>CREATIVITY</span>
              <span>COMMUNITY</span>
            </div>
            <div className="night-poster-sticker">
              THE
              <br />
              SPOTLIGHT
              <br />
              IS YOURS
            </div>
          </div>
        </div>
      </section>

      <section
        className="organizer-section section-pad"
        id="organizers"
        data-reveal-section
      >
        <div className="container organizer-layout">
          <div className="organizer-heading" data-reveal="left">
            <span className="eyebrow">
              <i /> THE PEOPLE BEHIND THE NEXUS
            </span>
            <h2>
              BUILT BY
              <br />
              <span>THE COMMUNITY.</span>
            </h2>
            <p>
              Big ideas happen when passionate people build together. Meet the
              organizations driving the experience and bringing the CCIT
              community together.
            </p>
          </div>
          <div className="organizer-feature" data-reveal="right">
            <div className="organizer-logo-slot">
              <img
                src="/images/partners/aws-learning-club-elev8-logo.png"
                alt="AWS Learning Club — e:LEV8 logo"
              />
              <span>OFFICIAL ORGANIZER</span>
            </div>
            <div className="organizer-label">MAIN ORGANIZER</div>
            <h3>
              AWS Learning Club
              <br />
              <span>— e:LEV8</span>
            </h3>
            <p>
              The main organizing community behind CCIT Week 2026, bringing
              learners together through technology, collaboration, creativity,
              and hands-on experiences.
            </p>
            <div className="organizer-rule" />
            <div className="organizer-foot">
              <span>LEARN. BUILD. ELEVATE.</span>
              <span>
                <HeartHandshake size={16} /> LEAD ORGANIZER
              </span>
            </div>
          </div>
        </div>

        <div className="container partners-wrap" data-reveal>
          <div className="partners-heading">
            <span className="eyebrow">
              <i /> PARTNER COLLABORATION
            </span>
            <p>CREATIVE MINDS. TECHNICAL ENERGY. ONE NEXUS.</p>
          </div>
          <div className="partner-grid">
            <article className="partner-card">
              <div className="partner-logo-slot">
                <img
                  src="/images/partners/the-visuals-logo.svg"
                  alt="The Visuals logo"
                />
              </div>
              <div>
                <span className="partner-type">CREATIVE PARTNER</span>
                <h3>The Visuals</h3>
                <p>
                  Bringing visual storytelling, design energy, and creative
                  expression to the event experience.
                </p>
              </div>
              <ArrowUpRight className="partner-arrow" size={19} />
            </article>
            <article className="partner-card">
              <div className="partner-logo-slot">
                <img
                  src="/images/partners/bytes-society-logo.svg"
                  alt="Bytes Society logo"
                />
              </div>
              <div>
                <span className="partner-type">COMMUNITY PARTNER</span>
                <h3>Bytes Society</h3>
                <p>
                  Supporting collaboration, digital culture, and the spirit of a
                  connected computing community.
                </p>
              </div>
              <ArrowUpRight className="partner-arrow" size={19} />
            </article>
          </div>
        </div>
      </section>

      <section
        className="gallery-section section-pad"
        id="gallery"
        data-reveal-section
      >
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="THE NEXUS IN ACTION"
              title="MOMENTS WORTH SHOWING."
              description="Highlights, behind-the-scenes moments, high-stakes competitions, and CCIT Night under the spotlight."
            />
          </div>
          <div className="future-gallery-grid">
            <article className="future-gallery-card gallery-large">
              <img
                src="/images/gallery/event-highlights-placeholder.svg"
                alt="CCIT Week event highlights"
              />
              <div className="gallery-caption">
                <span>01 / EVENT HIGHLIGHTS</span>
                <strong>THE ENERGY OF CCIT</strong>
              </div>
            </article>
            <article className="future-gallery-card">
              <img
                src="/images/gallery/competition-placeholder.svg"
                alt="CCIT Week competitions"
              />
              <div className="gallery-caption">
                <span>02 / COMPETITIONS</span>
                <strong>BUILT TO COMPETE</strong>
              </div>
            </article>
            <article className="future-gallery-card">
              <img
                src="/images/gallery/ccit-night-placeholder.svg"
                alt="CCIT Night"
              />
              <div className="gallery-caption">
                <span>03 / CCIT NIGHT</span>
                <strong>UNDER THE SPOTLIGHT</strong>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="manifesto-section">
        <div className="container manifesto-inner">
          <div className="manifesto-label">
            <Trophy size={18} /> THE DIGITAL NEXUS MANIFESTO
          </div>
          <h2>
            DON’T JUST
            <br />
            <span>SHOW UP.</span>
            <br />
            SHOW WHAT’S NEXT.
          </h2>
          <Link href="/registration" className="button button-lime">
            Join the movement <ArrowUpRight size={17} />
          </Link>
          <div className="manifesto-stamp">
            MAKE
            <br />
            IT
            <br />
            MATTER.
          </div>
        </div>
      </section>
    </>
  );
}