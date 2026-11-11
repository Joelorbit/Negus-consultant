import { NavLink } from "react-router";
import {
  ArrowRight,
  Calendar,
  GraduationCap,
  Community,
  Clock,
  CheckCircle,
} from "iconoir-react";
import {
  SUPPORT_TELEGRAM_URL,
  SUPPORT_PHONE,
} from "../../config/supportContact";
import "../public-pages.css";

const TRAININGS = [
  {
    id: "scholarship-cohort-2026",
    title: "2026/2027 Full Scholarship Cohort Training",
    summary:
      "Live online cohort covering Common App strategy, CSS Profile, essay narrative, and embassy interview drills.",
    audience: "Grade 11–12 & gap-year applicants",
    start: "Nov 18, 2026",
    end: "Jan 12, 2027",
    status: "open",
    thumbnail: "/hero-teaching.jpg",
  },
  {
    id: "essay-intensive",
    title: "Personal Statement Intensive Weekend",
    summary:
      "Two-day workshop to draft, critique, and polish main essays with mentor feedback rounds.",
    audience: "Students with draft essays ready",
    start: "Dec 6, 2026",
    end: "Dec 7, 2026",
    status: "open",
    thumbnail: "/testimonial.jpg",
  },
  {
    id: "visa-masterclass",
    title: "US Embassy Visa Interview Masterclass",
    summary:
      "Mock interviews, document checklists, and confidence coaching from mentors who have cleared F-1 interviews.",
    audience: "Students with admits / I-20 in progress",
    start: "Completed Sep 2026",
    end: "Completed",
    status: "completed",
    thumbnail: "/team1.jpg",
  },
];

export default function TrainingPage() {
  return (
    <main className="public-page">
      <section className="public-page-hero">
        <div className="public-page-hero-inner">
          <p className="public-eyebrow">
            <Community aria-hidden="true" /> GROUP ONLINE TRAININGS
          </p>
          <h1 className="public-page-title">
            Trainings with timelines, mentors, and clear <em>registration.</em>
          </h1>
          <p className="public-page-copy">
            Find ongoing and past Negus online trainings in one place — who they are for,
            start and end dates, and how to register before seats close.
          </p>
          <div className="public-page-actions">
            <a className="public-button public-button-primary" href="#training-catalog">
              Browse trainings <ArrowRight aria-hidden="true" />
            </a>
            <a
              className="public-button public-button-secondary"
              href={SUPPORT_TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              Free call on Telegram
            </a>
          </div>
        </div>
      </section>

      <section className="public-content" id="training-catalog">
        <div className="public-section-heading">
          <p className="public-eyebrow">TRAINING CATALOG</p>
          <h2>Ongoing sessions first. Completed ones keep their testimonials.</h2>
          <p>
            About two cards per row on desktop. Open a training to see mentors, delivery
            details, FAQs, and payment when registration is live.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {TRAININGS.map((item) => (
            <article
              key={item.id}
              className="home-card"
              style={{
                overflow: "hidden",
                borderRadius: "18px",
                border: "1px solid var(--line)",
                background: "var(--white)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: "var(--green-subtle)" }}>
                <img
                  src={item.thumbnail}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: "22px 22px 24px", display: "grid", gap: "12px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      borderRadius: "999px",
                      padding: "4px 10px",
                      font: "700 11px/1.2 var(--font-display)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      background: item.status === "open" ? "var(--yellow-soft)" : "var(--green-soft)",
                      color: "var(--ink)",
                    }}
                  >
                    {item.status === "open" ? (
                      <>
                        <CheckCircle width={12} height={12} aria-hidden="true" /> Registration open
                      </>
                    ) : (
                      "Completed"
                    )}
                  </span>
                </div>
                <h3
                  style={{
                    margin: 0,
                    font: "700 1.2rem/1.25 var(--font-display)",
                    letterSpacing: "-0.03em",
                    color: "var(--ink)",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ margin: 0, color: "var(--ink-secondary)", fontSize: "14px", lineHeight: 1.6 }}>
                  {item.summary}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "grid",
                    gap: "8px",
                    color: "var(--ink-muted)",
                    fontSize: "13px",
                  }}
                >
                  <li style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <GraduationCap width={16} height={16} aria-hidden="true" />
                    <span>For: {item.audience}</span>
                  </li>
                  <li style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <Calendar width={16} height={16} aria-hidden="true" />
                    <span>
                      {item.start}
                      {item.end && item.end !== item.start ? ` → ${item.end}` : ""}
                    </span>
                  </li>
                </ul>
                <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                  <NavLink
                    to={`/training/${item.id}`}
                    className="public-button public-button-primary"
                    style={{ width: "100%" }}
                  >
                    See more <ArrowRight aria-hidden="true" />
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="public-page-cta">
        <p className="public-eyebrow">NEED A QUICK ANSWER?</p>
        <h2>Talk with the team before you register.</h2>
        <p>
          Prefer a free call? Reach us on Telegram or phone {SUPPORT_PHONE}. Low-connectivity
          students can also follow trainings via our Telegram archive.
        </p>
        <div className="public-page-actions">
          <a
            className="public-button public-button-light"
            href={SUPPORT_TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            Free call / Telegram
          </a>
          <NavLink className="public-button public-button-outline-light" to="/packages">
            View packages <Clock aria-hidden="true" />
          </NavLink>
        </div>
      </section>
    </main>
  );
}
