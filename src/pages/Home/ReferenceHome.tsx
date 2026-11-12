import React from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  GraduationCap,
  Spark,
  Telegram,
} from "./icons";
import {
  GeorgetownCrest,
  WilliamsCrest,
  DrexelCrest,
  HowardCrest,
  HultCrest,
  NyuCrest,
  SarahLawrenceCrest,
  CanisiusCrest,
  ClarkCrest,
} from "./universityLogos";
import CeoHero from "./components/CeoHero";
import CeoMessageSection from "./components/CeoMessageSection";
import CeoFreeToolsSection from "./components/CeoFreeToolsSection";
import { Reveal, CountUp, ScrollProgress, PixelRain } from "./components/HomeLife";

export default function ReferenceHome() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)" }}>
      {/* Film grain effect */}
      <div className="film-grain" aria-hidden="true" />

      <ScrollProgress />

      {/* Authentic CEO Classroom Hero (Page 1 Sketch with Amharic Headline & Teaching Photo) */}
      <CeoHero />


      {/* Marquee Ribbon */}
      <div className="marquee-ribbon" aria-label="Negus core service tracks">
        <div className="marquee-track">
          <span>ESSAY COACHING</span>
          <i>✦</i>
          <span>ONE-ON-ONE MENTORSHIP</span>
          <i>✦</i>
          <span>FULL APPLICATION SUPPORT</span>
          <i>✦</i>
          <span>EDUCATIONAL COURSES</span>
          <i>✦</i>
          <span>DIGITAL SAT MASTERY</span>
          <i>✦</i>
          <span>CSS PROFILE & FINANCIAL AID</span>
          <i>✦</i>
          <span>VISA INTERVIEW PREPARATION</span>
          <i>✦</i>
        </div>
        <div className="marquee-track" aria-hidden="true">
          <span>ESSAY COACHING</span>
          <i>✦</i>
          <span>ONE-ON-ONE MENTORSHIP</span>
          <i>✦</i>
          <span>FULL APPLICATION SUPPORT</span>
          <i>✦</i>
          <span>EDUCATIONAL COURSES</span>
          <i>✦</i>
          <span>DIGITAL SAT MASTERY</span>
          <i>✦</i>
          <span>CSS PROFILE & FINANCIAL AID</span>
          <i>✦</i>
          <span>VISA INTERVIEW PREPARATION</span>
          <i>✦</i>
        </div>
      </div>

      {/* "መልእክት አለን" Founder Video Message & 5 Category Tiles (Page 2 Sketch) */}
      <CeoMessageSection />

      {/* Proven Track Record & Trust Bar (Pure Light Theme) */}
      <section className="section-shell" style={{ paddingTop: "54px", paddingBottom: "64px" }}>
        <div className="eyebrow-tag" style={{ justifyContent: "center", marginBottom: "28px" }}>
          THE NUMBERS BEHIND THE MISSION
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "20px",
            textAlign: "center",
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          {[
            { value: "30,000+", color: "#123d2b", label: "Students and families reached" },
            { value: "2,000+", color: "#19523b", label: "Students guided" },
            { value: "10+", color: "#123d2b", label: "Universities that admitted our students" },
          ].map((stat, i) => (
            <Reveal
              key={stat.label}
              className="home-card"
              delay={i * 120}
              style={{
                padding: "26px 20px",
                borderRadius: "20px",
                background: "#ffffff",
                border: "1.5px solid rgba(18, 61, 43, 0.14)",
                boxShadow: "0 10px 28px rgba(18, 61, 43, 0.08)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <strong
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 3.8vw, 42px)",
                  fontWeight: 900,
                  color: stat.color,
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </strong>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#56745f",
                  letterSpacing: "-0.01em",
                  marginTop: "6px",
                  display: "block",
                  maxWidth: "190px",
                }}
              >
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Free Tools & Lead Capture Gate (Page 5 Sketch) */}
      <CeoFreeToolsSection />

      {/* Places Our Students Have Been Accepted To (Creative University Acceptance Showcase) */}
      <section className="section-shell home-grid-paper" style={{ paddingTop: "44px", paddingBottom: "54px" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 32px" }}>
          <div className="eyebrow-tag" style={{ justifyContent: "center", marginBottom: "12px" }}>
            VERIFIED ACCEPTANCES &amp; MERIT AWARDS
          </div>
          <h2 className="display-title" style={{ fontSize: "clamp(28px, 3.6vw, 42px)", margin: "0 0 12px" }}>
            Places our students have been accepted to.
          </h2>
          <p style={{ color: "var(--ink-secondary)", fontSize: "15px", lineHeight: "1.65", margin: 0 }}>
            Official institutions where Ethiopian scholars guided by Negus secured competitive admissions and life-changing scholarship packaging.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "20px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {[
            { name: "Georgetown", loc: "Washington, D.C.", award: "$85k/yr Award", Crest: GeorgetownCrest },
            { name: "Williams College", loc: "Massachusetts", award: "Full Financial Aid", Crest: WilliamsCrest },
            { name: "Drexel University", loc: "Philadelphia, PA", award: "$145k Scholarship", Crest: DrexelCrest },
            { name: "Howard University", loc: "Washington, D.C.", award: "Full Tuition", Crest: HowardCrest },
            { name: "NYU Abu Dhabi", loc: "Abu Dhabi & NYC", award: "Full Need-Based Aid", Crest: NyuCrest },
            { name: "Hult International", loc: "Boston & London", award: "$120k Merit Grant", Crest: HultCrest },
            { name: "Sarah Lawrence", loc: "New York", award: "Full Institutional Aid", Crest: SarahLawrenceCrest },
            { name: "Canisius University", loc: "New York", award: "$95k Presidential", Crest: CanisiusCrest },
            { name: "Clark University", loc: "Massachusetts", award: "Global Scholars Award", Crest: ClarkCrest },
          ].map(({ name, loc, award, Crest }, i) => (
            <Reveal
              key={name}
              variant="stamp"
              className="home-card"
              delay={80 + (i % 5) * 90}
              style={{
                padding: "22px 18px",
                borderRadius: "16px",
                background: "var(--white)",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Crest style={{ width: "42px", height: "42px" }} />
              </div>
              <div>
                <strong
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    lineHeight: 1.25,
                  }}
                >
                  {name}
                </strong>
                <span
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: "var(--ink-muted)",
                    marginTop: "3px",
                  }}
                >
                  {loc}
                </span>
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.02em",
                  color: "var(--gold-ink)",
                  background: "var(--yellow-soft)",
                  padding: "7px 12px",
                  borderRadius: "9999px",
                  border: "1px solid var(--line)",
                }}
              >
                ★ {award}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The 3 Core Pillars of Winning Scholarships */}
      <section className="section-shell home-grid-paper" style={{ paddingTop: "40px", paddingBottom: "54px" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px" }}>
          <div className="eyebrow-tag" style={{ justifyContent: "center", marginBottom: "12px" }}>
            THE NEGUS METHOD
          </div>
          <h2 className="display-title" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: "0 0 16px" }}>
            A structured path to debt-free global education.
          </h2>
          <p style={{ color: "var(--ink-secondary)", fontSize: "16px", lineHeight: "1.7", margin: "0 auto" }}>
            Modeled after the world&apos;s leading scholarship advisory frameworks, engineered specifically for Ethiopian scholars.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {/* Pillar 1 */}
          <Reveal
            className="home-card"
            delay={100}
            style={{
              padding: "32px 26px",
              borderRadius: "18px",
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              textAlign: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <span className="home-num-ghost" aria-hidden="true">01</span>
            <div className="home-method-track" aria-hidden="true"><span className="home-method-fill" /></div>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--green-soft)",
                color: "var(--ink)",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: "13px",
                fontFamily: "var(--font-display)",
              }}
            >
              01
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              Profile & University Targeting
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "14.5px", lineHeight: "1.65", margin: 0 }}>
              We match your academic credentials and financial aid requirements with international universities offering massive institutional scholarships and grants.
            </p>
          </Reveal>

          {/* Pillar 2 */}
          <Reveal
            className="home-card"
            delay={260}
            style={{
              padding: "32px 26px",
              borderRadius: "18px",
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              textAlign: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <span className="home-num-ghost" aria-hidden="true">02</span>
            <div className="home-method-track" aria-hidden="true"><span className="home-method-fill" /></div>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--yellow-soft)",
                color: "var(--gold-ink)",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: "13px",
                fontFamily: "var(--font-display)",
              }}
            >
              02
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              Essay & Narrative Mastery
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "14.5px", lineHeight: "1.65", margin: 0 }}>
              Transform your personal background into unforgettable Common App essays and supplements that capture the hearts and votes of admissions committees.
            </p>
          </Reveal>

          {/* Pillar 3 */}
          <Reveal
            className="home-card"
            delay={420}
            style={{
              padding: "32px 26px",
              borderRadius: "18px",
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              textAlign: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <span className="home-num-ghost" aria-hidden="true">03</span>
            <div className="home-method-track" aria-hidden="true"><span className="home-method-fill" /></div>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--green-soft)",
                color: "var(--ink)",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: "13px",
                fontFamily: "var(--font-display)",
              }}
            >
              03
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              1-on-1 Scholar Mentorship
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "14.5px", lineHeight: "1.65", margin: 0 }}>
              Work directly with an Ethiopian scholar currently attending a top global university who personally guides every deadline, document, and interview.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Course Preview (CEO homepage sketch — intro video + 3 cards + Explore) */}
      <section className="section-shell" id="courses" style={{ paddingTop: "36px", paddingBottom: "40px" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 28px" }}>
          <div className="eyebrow-tag" style={{ justifyContent: "center", marginBottom: "12px" }}>
            COURSE PREVIEW
          </div>
          <h2 className="display-title" style={{ fontSize: "clamp(28px, 3.6vw, 42px)", margin: "0 0 12px" }}>
            Start with an intro, then pick a course.
          </h2>
          <p style={{ color: "var(--ink-secondary)", fontSize: "15px", lineHeight: "1.65", margin: 0 }}>
            Watch how Negus teaches, then explore three featured courses — including free YouTube tracks.
          </p>
        </div>

        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto 22px",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid var(--line)",
            background: "#0d1e15",
            aspectRatio: "16 / 8.5",
            display: "grid",
            placeItems: "center",
            position: "relative",
          }}
        >
          <img
            src="/hero-teaching.jpg"
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }}
            loading="lazy"
          />
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "24px", color: "#fffdf6" }}>
            <p style={{ margin: "0 0 10px", font: "800 11px/1.2 var(--font-display)", letterSpacing: "0.14em", color: "var(--yellow)" }}>
              INTRO VIDEO
            </p>
            <p style={{ margin: 0, maxWidth: "420px", font: "600 1.05rem/1.45 var(--font-display)" }}>
              A short orientation to scholarships, courses, and how the Negus classroom works.
            </p>
            <Link
              to="/courses"
              className="btn-dark-hero"
              style={{ marginTop: "18px", background: "var(--yellow)", color: "#123d2b", borderColor: "var(--yellow)" }}
            >
              <span>Open course library</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            maxWidth: "1100px",
            margin: "0 auto 28px",
          }}
        >
          {[
            { title: "Scholarship Application Foundations", meta: "Free on YouTube", to: "/courses" },
            { title: "Common App & Activities Studio", meta: "Free on YouTube", to: "/courses" },
            { title: "Full Aid Packaging Intensive", meta: "Paid · Add to cart", to: "/packages" },
          ].map((course) => (
            <Link
              key={course.title}
              to={course.to}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                overflow: "hidden",
                background: "var(--white)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{ aspectRatio: "16/10", background: "linear-gradient(135deg, #123d2b, #2a5940)" }} />
              <div style={{ padding: "16px 18px 18px" }}>
                <strong style={{ display: "block", font: "700 15px/1.35 var(--font-display)", color: "var(--ink)" }}>
                  {course.title}
                </strong>
                <span style={{ display: "block", marginTop: "6px", color: "var(--ink-muted)", fontSize: "12.5px" }}>
                  {course.meta}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/courses" className="btn-dark-hero">
            <span>Explore all courses</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Featured Packages Preview */}
      <section className="section-shell" style={{ paddingTop: "36px", paddingBottom: "54px" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 36px" }}>
          <div className="eyebrow-tag" style={{ justifyContent: "center", marginBottom: "12px" }}>
            FLAGSHIP PACKAGES
          </div>
          <h2 className="display-title" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: "0 0 14px" }}>
            Guidance for every application stage.
          </h2>
          <p style={{ color: "var(--ink-secondary)", fontSize: "15.5px", lineHeight: "1.7", margin: "0" }}>
            Transparent pricing in Ethiopian Birr (ETB) with flexible milestones.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto 36px",
          }}
        >
          {/* Card 1 */}
          <Reveal
            className="home-card"
            delay={100}
            style={{
              padding: "32px 26px",
              borderRadius: "18px",
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.12em", color: "var(--ink-muted)", textTransform: "uppercase" }}>
                PACKAGE 01 · FOCUSED
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, margin: "10px 0 6px", color: "var(--ink)" }}>
                Essay Writing Intensive
              </h3>
              <p style={{ color: "var(--ink-secondary)", fontSize: "14px", lineHeight: "1.6", margin: "0 0 18px" }}>
                Comprehensive structure feedback, brainstorming sessions, and line-by-line polishing for personal statements and supplements.
              </p>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 800, color: "var(--ink)", marginBottom: "20px" }}>
                2,000 <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink-muted)" }}>ETB</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: "10px", fontSize: "13px", color: "var(--ink-secondary)" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><Check width={15} height={15} style={{ color: "var(--primary)" }} /> Common App Personal Statement</li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><Check width={15} height={15} style={{ color: "var(--primary)" }} /> Up to 3 Supplemental Essays</li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><Check width={15} height={15} style={{ color: "var(--primary)" }} /> Voice & Grammar Polish</li>
              </ul>
            </div>
            <Link
              to="/packages"
              className="btn-dark-hero"
              style={{ width: "100%", justifyContent: "center", textAlign: "center" }}
            >
              <span>Explore package</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>

          {/* Card 2 - Most Popular */}
          <Reveal
            className="home-card"
            delay={240}
            style={{
              padding: "32px 26px",
              borderRadius: "18px",
              background: "var(--white)",
              border: "2px solid var(--yellow)",
              boxShadow: "var(--shadow-card)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div
              className="home-popular-pulse"
              style={{
                position: "absolute",
                top: "-12px",
                right: "24px",
                background: "var(--yellow)",
                color: "#123d2b",
                fontFamily: "var(--font-display)",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "8px 14px",
                borderRadius: "9999px",
              }}
            >
              ★ MOST POPULAR
            </div>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.12em", color: "var(--gold-ink)", textTransform: "uppercase" }}>
                PACKAGE 02 · COMPLETE
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, margin: "10px 0 6px", color: "var(--ink)" }}>
                Full Application Support
              </h3>
              <p style={{ color: "var(--ink-secondary)", fontSize: "14px", lineHeight: "1.6", margin: "0 0 18px" }}>
                End-to-end guidance from university shortlisting and financial aid forms to essays, test strategy, and visa interview training.
              </p>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 800, color: "var(--ink)", marginBottom: "20px" }}>
                25,000 <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink-muted)" }}>ETB</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: "10px", fontSize: "13px", color: "var(--ink-secondary)" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><Check width={15} height={15} style={{ color: "var(--gold-ink)" }} /> 10-15 Target University List</li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><Check width={15} height={15} style={{ color: "var(--gold-ink)" }} /> Full Essay & Activity Coaching</li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><Check width={15} height={15} style={{ color: "var(--gold-ink)" }} /> CSS Profile & ISFAA Aid Filing</li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><Check width={15} height={15} style={{ color: "var(--gold-ink)" }} /> Mock Visa Interview Preparation</li>
              </ul>
            </div>
            <Link
              to="/packages"
              className="btn-dark-hero"
              style={{
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                background: "var(--yellow)",
                color: "#123d2b",
                borderColor: "var(--yellow)",
              }}
            >
              <span>Get full support</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>

          {/* Card 3 */}
          <Reveal
            className="home-card"
            delay={380}
            style={{
              padding: "32px 26px",
              borderRadius: "18px",
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.12em", color: "var(--ink-muted)", textTransform: "uppercase" }}>
                PACKAGE 03 · GUIDANCE
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, margin: "10px 0 6px", color: "var(--ink)" }}>
                Scholar Mentorship Track
              </h3>
              <p style={{ color: "var(--ink-secondary)", fontSize: "14px", lineHeight: "1.6", margin: "0 0 18px" }}>
                Personalized 1-on-1 milestone calls, accountability check-ins, and direct advice from an admitted scholar mentor.
              </p>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 800, color: "var(--ink)", marginBottom: "20px" }}>
                4,000 <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink-muted)" }}>ETB</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: "10px", fontSize: "13px", color: "var(--ink-secondary)" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><Check width={15} height={15} style={{ color: "var(--primary)" }} /> 1-on-1 Mentorship Sessions</li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><Check width={15} height={15} style={{ color: "var(--primary)" }} /> Application Strategy & Timing</li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><Check width={15} height={15} style={{ color: "var(--primary)" }} /> Milestone Reviews & Feedback</li>
              </ul>
            </div>
            <Link
              to="/packages"
              className="btn-dark-hero"
              style={{ width: "100%", justifyContent: "center", textAlign: "center" }}
            >
              <span>Explore package</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            to="/packages"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-display)",
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--ink)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            <span>Compare all packages and services</span>
            <ArrowRight width={14} height={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="section-shell" style={{ paddingTop: "36px", paddingBottom: "54px" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 36px" }}>
          <div className="eyebrow-tag" style={{ justifyContent: "center", marginBottom: "12px" }}>
            NEGUS ACADEMY
          </div>
          <h2 className="display-title" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: "0 0 14px" }}>
            Learn at your own pace.
          </h2>
          <p style={{ color: "var(--ink-secondary)", fontSize: "15.5px", lineHeight: "1.7", margin: "0" }}>
            Practical video masterclasses and toolkits designed by admitted scholars.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto 36px",
          }}
        >
          {/* Course 1 */}
          <Reveal className="home-card" delay={100} style={{
              borderRadius: "18px",
              overflow: "hidden",
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
            }}>
            <div
              className="home-course-banner"
              style={{
                height: "170px",
                background: "linear-gradient(135deg, #123d2b, #2a5940)",
                display: "grid",
                placeItems: "center",
                color: "var(--yellow)",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "18px",
                letterSpacing: "0.05em",
                textAlign: "center",
                padding: "20px",
              }}
            >
              ESSAYS & STORYTELLING
            </div>
            <div style={{ padding: "24px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--gold-ink)", textTransform: "uppercase" }}>MASTERCLASS</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700, margin: "8px 0 10px", color: "var(--ink)" }}>
                The Winning Common App Essay
              </h3>
              <p style={{ color: "var(--ink-secondary)", fontSize: "13.5px", lineHeight: "1.6", margin: "0 0 18px" }}>
                Step-by-step frameworks for brainstorming unique essay topics, crafting gripping opening hooks, and avoiding cliches.
              </p>
              <Link to="/courses" style={{ color: "var(--ink-secondary)", fontWeight: 700, fontSize: "13.5px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                Watch lessons <ArrowRight width={14} height={14} />
              </Link>
            </div>
          </Reveal>

          {/* Course 2 */}
          <Reveal className="home-card" delay={240} style={{
              borderRadius: "18px",
              overflow: "hidden",
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
            }}>
            <div
              className="home-course-banner"
              style={{
                height: "170px",
                background: "linear-gradient(135deg, #1f2f25, #35503f)",
                display: "grid",
                placeItems: "center",
                color: "var(--yellow)",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "18px",
                letterSpacing: "0.05em",
                textAlign: "center",
                padding: "20px",
              }}
            >
              FINANCIAL AID & CSS
            </div>
            <div style={{ padding: "24px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--gold-ink)", textTransform: "uppercase" }}>GUIDE</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700, margin: "8px 0 10px", color: "var(--ink)" }}>
                CSS Profile & ISFAA Aid Mastery
              </h3>
              <p style={{ color: "var(--ink-secondary)", fontSize: "13.5px", lineHeight: "1.6", margin: "0 0 18px" }}>
                How international students accurately document household income, apply for fee waivers, and unlock institutional aid.
              </p>
              <Link to="/courses" style={{ color: "var(--ink-secondary)", fontWeight: 700, fontSize: "13.5px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                Watch lessons <ArrowRight width={14} height={14} />
              </Link>
            </div>
          </Reveal>

          {/* Course 3 */}
          <Reveal className="home-card" delay={380} style={{
              borderRadius: "18px",
              overflow: "hidden",
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
            }}>
            <div
              className="home-course-banner"
              style={{
                height: "170px",
                background: "linear-gradient(135deg, #182820, #2c4436)",
                display: "grid",
                placeItems: "center",
                color: "var(--yellow)",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "18px",
                letterSpacing: "0.05em",
                textAlign: "center",
                padding: "20px",
              }}
            >
              DIGITAL SAT & TESTS
            </div>
            <div style={{ padding: "24px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--gold-ink)", textTransform: "uppercase" }}>TEST PREP</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700, margin: "8px 0 10px", color: "var(--ink)" }}>
                1500+ Digital SAT Strategy
              </h3>
              <p style={{ color: "var(--ink-secondary)", fontSize: "13.5px", lineHeight: "1.6", margin: "0 0 18px" }}>
                Proven techniques for adaptive testing pacing, hard math shortcuts, and evidence-based reading analysis.
              </p>
              <Link to="/courses" style={{ color: "var(--ink-secondary)", fontWeight: 700, fontSize: "13.5px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                Watch lessons <ArrowRight width={14} height={14} />
              </Link>
            </div>
          </Reveal>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            to="/courses"
            className="btn-dark-hero"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
          >
            <span>Browse all courses</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Verified Student Wins & Testimonials */}
      <section className="section-shell home-grid-paper" style={{ paddingTop: "36px", paddingBottom: "54px" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 36px" }}>
          <div className="eyebrow-tag" style={{ justifyContent: "center", marginBottom: "12px" }}>
            PROVEN RESULTS
          </div>
          <h2 className="display-title" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: "0 0 14px" }}>
            Real students. Real scholarships.
          </h2>
          <p style={{ color: "var(--ink-secondary)", fontSize: "15.5px", lineHeight: "1.7", margin: "0" }}>
            Hear from Ethiopian scholars who partnered with Negus to earn admissions and institutional awards worldwide.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {/* Testimonial 1 */}
          <Reveal className="home-card" delay={100} style={{
              padding: "28px",
              borderRadius: "18px",
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <p style={{ fontStyle: "italic", color: "var(--ink-secondary)", fontSize: "15px", lineHeight: "1.7", margin: "0 0 20px" }}>
              &ldquo;Overall throughout the program I have learned so many things.&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid var(--line)", paddingTop: "16px" }}>
            <img src="/assets/testimonials/photo_2026-11-12_11-26-18.jpg" alt="Arsema" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
              <div>
                <strong style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "14px", color: "var(--ink)" }}>Arsema</strong>
                <span style={{ fontSize: "12.5px", color: "var(--gold-ink)", fontWeight: 600 }}>Negus student</span>
              </div>
            </div>
            <audio controls src="/assets/arema.ogg" style={{ width: "100%", height: "30px", marginTop: "14px" }} aria-label="Arsema testimonial" />
          </Reveal>

          {/* Testimonial 2 */}
          <Reveal className="home-card" delay={240} style={{
              padding: "28px",
              borderRadius: "18px",
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <p style={{ fontStyle: "italic", color: "var(--ink-secondary)", fontSize: "15px", lineHeight: "1.7", margin: "0 0 20px" }}>
              Listen to Efina share her experience with Negus.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid var(--line)", paddingTop: "16px" }}>
                <img src="/assets/testimonials/photo_2026-11-12_11-26-48.jpg" alt="Efina" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
              <div>
                  <strong style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "14px", color: "var(--ink)" }}>Efina</strong>
                  <span style={{ fontSize: "12px", color: "var(--ink-secondary)", fontWeight: 600 }}>Negus student</span>
              </div>
            </div>
            <audio controls src="/assets/efina.ogg" style={{ width: "100%", height: "30px", marginTop: "14px" }} aria-label="Efina testimonial" />
          </Reveal>

          {/* Testimonial 3 */}
          <Reveal className="home-card" delay={380} style={{
              padding: "28px",
              borderRadius: "18px",
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <p style={{ fontStyle: "italic", color: "var(--ink-secondary)", fontSize: "15px", lineHeight: "1.7", margin: "0 0 20px" }}>
              &ldquo;From standardized test preparation to financial paperwork, having a mentor who had already succeeded made all the difference. I recommend Negus to anyone serious about studying abroad.&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid var(--line)", paddingTop: "16px" }}>
              <img src="/assets/testimonials/photo_2026-11-12_11-26-53.jpg" alt="Yosef" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
              <div>
                <strong style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "14px", color: "var(--ink)" }}>Yosef M.</strong>
                <span style={{ fontSize: "12.5px", color: "var(--gold-ink)", fontWeight: 600 }}>Drexel University · $145,000 Award</span>
              </div>
            </div>
          </Reveal>
        </div>
        <div style={{ textAlign: "center", marginTop: "26px" }}>
          <Link to="/testimonials" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--ink)", fontWeight: 700, fontSize: "13px", textDecoration: "none", borderBottom: "1px solid var(--yellow)", paddingBottom: "4px" }}>See all testimonials <ArrowRight width={14} height={14} /></Link>
        </div>
      </section>

      {/* Free Advisory Assessment CTA */}
      <section className="section-shell" style={{ paddingTop: "36px", paddingBottom: "70px" }}>
        <Reveal
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            borderRadius: "24px",
            background: "linear-gradient(135deg, var(--white) 0%, var(--green-soft) 100%)",
            border: "1px solid var(--line-strong)",
            padding: "clamp(36px, 5vw, 64px) clamp(24px, 4vw, 56px)",
            textAlign: "center",
            boxShadow: "var(--shadow-card)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <PixelRain />
          <div className="eyebrow-tag" style={{ justifyContent: "center", marginBottom: "14px", color: "var(--yellow)" }}>
            NEXT STEP
          </div>
          <h2 className="display-title" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", margin: "0 0 16px" }}>
            Ready to win your scholarship?
          </h2>
          <p style={{ color: "var(--ink-secondary)", fontSize: "16px", lineHeight: "1.7", maxWidth: "600px", margin: "0 auto 32px" }}>
            Speak directly with an advisor or connect with our community on Telegram to get your profile evaluated for upcoming scholarship deadlines.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px" }}>
            <a
              href="https://t.me/negushelpcenter"
              target="_blank"
              rel="noreferrer"
              className="btn-dark-hero"
              style={{ background: "var(--yellow)", color: "#123d2b", borderColor: "var(--yellow)" }}
            >
              <Telegram width={16} height={16} />
              <span>Chat on Telegram</span>
            </a>
            <Link to="/packages" className="btn-dark-hero">
              <span>View Packages</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
