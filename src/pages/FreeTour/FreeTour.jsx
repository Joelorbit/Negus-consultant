import { NavLink } from "react-router";
import { ArrowRight, Map, Phone } from "iconoir-react";
import { SUPPORT_TELEGRAM_URL, SUPPORT_PHONE } from "../../config/supportContact";
import "../public-pages.css";

export default function FreeTourPage() {
  return (
    <main className="public-page">
      <section className="public-page-hero">
        <div className="public-page-hero-inner">
          <p className="public-eyebrow">
            <Map aria-hidden="true" /> FREE GUIDANCE TOUR
          </p>
          <h1 className="public-page-title">
            A short orientation through Negus — no payment <em>required.</em>
          </h1>
          <p className="public-page-copy">
            Walk through how courses, trainings, packages, scholarships, and free tools fit together.
            Then book a free Telegram call if you want a human to map your next step.
          </p>
          <div className="public-page-actions">
            <a
              className="public-button public-button-primary"
              href={SUPPORT_TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Phone aria-hidden="true" /> Start free call
            </a>
            <NavLink className="public-button public-button-secondary" to="/courses">
              Self-guided tour <ArrowRight aria-hidden="true" />
            </NavLink>
          </div>
          <p className="public-hero-note">Also available by phone: {SUPPORT_PHONE}</p>
        </div>
      </section>

      <section className="public-content">
        <div className="public-section-heading">
          <p className="public-eyebrow">THE PATH</p>
          <h2>Four stops. One clear decision.</h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {[
            { step: "01", title: "Courses", body: "See what you can learn on your own schedule.", to: "/courses" },
            { step: "02", title: "Training", body: "Join live cohorts when you need structure and deadlines.", to: "/training" },
            { step: "03", title: "Packages", body: "Buy mentorship or application support with clear pricing.", to: "/packages" },
            { step: "04", title: "Free tools", body: "Taste videos, essays, and CV help before you commit.", to: "/free-tools" },
          ].map((item) => (
            <NavLink
              key={item.step}
              to={item.to}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                padding: "22px",
                background: "var(--white)",
                display: "grid",
                gap: "8px",
              }}
            >
              <span style={{ font: "800 12px var(--font-display)", color: "var(--gold-ink)", letterSpacing: "0.08em" }}>
                {item.step}
              </span>
              <strong style={{ font: "700 1.15rem/1.2 var(--font-display)", color: "var(--ink)" }}>{item.title}</strong>
              <span style={{ color: "var(--ink-muted)", fontSize: "14px", lineHeight: 1.55 }}>{item.body}</span>
            </NavLink>
          ))}
        </div>
      </section>
    </main>
  );
}
