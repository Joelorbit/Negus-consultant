import { NavLink, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  GraduationCap,
  MessageText,
} from "iconoir-react";
import { SUPPORT_TELEGRAM_URL } from "../../config/supportContact";
import "../public-pages.css";

const DETAIL = {
  "scholarship-cohort-2026": {
    title: "2026/2027 Full Scholarship Cohort Training",
    time: "Tuesdays & Saturdays · 7:00–9:00 PM EAT",
    about:
      "A structured online cohort for Ethiopian students preparing full-need applications to US and Canadian universities. Covers school list strategy, Common App, CSS Profile / ISFAA, essays, and visa readiness.",
    audience: "Grade 11–12 and gap-year applicants aiming for Fall 2027 entry.",
    contents: [
      "School list & fit strategy",
      "Common App + activities storytelling",
      "CSS Profile & financial aid packaging",
      "Essay workshops with feedback",
      "Embassy interview simulations",
    ],
    mentors: "Senior Negus mentors with verified admits and aid outcomes.",
    delivery: "Live Zoom sessions + recorded replays in Telegram for low connectivity.",
    registration:
      "Registration is open. Confirm your seat via Telegram, then complete the training fee invoice shared by the team.",
    status: "open",
    testimonials: [
      {
        quote: "The cohort made CSS Profile feel doable. I stopped guessing and started submitting with a plan.",
        name: "Hanna T.",
      },
      {
        quote: "Mock interviews were the difference. I walked into the embassy knowing exactly how to answer.",
        name: "Yonatan M.",
      },
    ],
  },
  "essay-intensive": {
    title: "Personal Statement Intensive Weekend",
    time: "Saturday–Sunday · 10:00 AM–4:00 PM EAT",
    about:
      "Two focused days to move from rough draft to polished personal statement with mentor critique rounds.",
    audience: "Students who already have a first draft and need structure, voice, and clarity.",
    contents: [
      "Narrative arc clinic",
      "Peer + mentor critique",
      "Line-edit polish session",
      "Supplement essay mapping",
    ],
    mentors: "Essay coaches from the Negus admissions team.",
    delivery: "Live online workshop with shared docs and recorded feedback notes.",
    registration: "Limited seats. Register via Telegram to receive the weekend schedule and payment link.",
    status: "open",
    testimonials: [
      {
        quote: "I rewrote my opener twice in one afternoon — and it finally sounded like me.",
        name: "Selam A.",
      },
    ],
  },
  "visa-masterclass": {
    title: "US Embassy Visa Interview Masterclass",
    time: "Completed · recordings available on request",
    about:
      "This training has ended. You can still read participant feedback and contact the team for the next visa cohort.",
    audience: "Students with admits / I-20 in progress.",
    contents: ["Document checklist", "Mock interviews", "Confidence drills"],
    mentors: "Mentors who have cleared F-1 interviews with Negus scholars.",
    delivery: "Was delivered live online; highlights available via Telegram archive.",
    registration: null,
    status: "completed",
    testimonials: [
      {
        quote: "The practice questions mirrored what I actually got asked. I felt prepared, not panicked.",
        name: "Abel K.",
      },
    ],
  },
};

export default function TrainingDetailPage() {
  const { id } = useParams();
  const training = DETAIL[id] || DETAIL["scholarship-cohort-2026"];
  const isOpen = training.status === "open";

  return (
    <main className="public-page">
      <section className="public-page-hero" style={{ textAlign: "left" }}>
        <div className="public-page-hero-inner" style={{ alignItems: "flex-start", textAlign: "left" }}>
          <NavLink
            to="/training"
            className="public-button public-button-secondary"
            style={{ marginBottom: "18px" }}
          >
            <ArrowLeft aria-hidden="true" /> All trainings
          </NavLink>
          <p className="public-eyebrow" style={{ justifyContent: "flex-start" }}>
            <GraduationCap aria-hidden="true" /> TRAINING DETAIL
          </p>
          <h1 className="public-page-title" style={{ textAlign: "left", maxWidth: "900px" }}>
            {training.title}
          </h1>
          <p className="public-page-copy" style={{ textAlign: "left", marginLeft: 0 }}>
            <Calendar aria-hidden="true" style={{ display: "inline", verticalAlign: "-3px", marginRight: "6px" }} />
            {training.time}
          </p>
        </div>
      </section>

      <section className="public-content" style={{ display: "grid", gap: "28px", maxWidth: "860px" }}>
        <article className="public-empty-state">
          <h3>About</h3>
          <p>{training.about}</p>
          <p>
            <strong>Who it’s for:</strong> {training.audience}
          </p>
          <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.7 }}>
            {training.contents.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="public-empty-state">
          <h3>Mentors</h3>
          <p>{training.mentors}</p>
        </article>

        <article className="public-empty-state">
          <h3>How it will be delivered</h3>
          <p>{training.delivery}</p>
        </article>

        <article className="public-empty-state">
          <h3>Registration details & FAQs</h3>
          <p>
            {isOpen
              ? training.registration
              : "Registration is closed for this training. Contact us to join the waitlist for the next cohort."}
          </p>
          <div className="public-page-actions">
            <a
              className="public-button public-button-primary"
              href={SUPPORT_TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              <MessageText aria-hidden="true" /> Contact us on Telegram
            </a>
          </div>
        </article>

        <article className="public-empty-state">
          <h3>Previous participant notes</h3>
          {training.testimonials.map((t) => (
            <blockquote
              key={t.name}
              style={{
                margin: 0,
                padding: "14px 16px",
                borderLeft: "3px solid var(--yellow)",
                background: "var(--green-subtle)",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <p style={{ margin: 0, color: "var(--ink)", lineHeight: 1.6 }}>&ldquo;{t.quote}&rdquo;</p>
              <cite style={{ display: "block", marginTop: "8px", color: "var(--ink-muted)", fontStyle: "normal", fontWeight: 700 }}>
                — {t.name}
              </cite>
            </blockquote>
          ))}
        </article>

        {isOpen && (
          <article
            className="public-empty-state"
            style={{ background: "var(--ink)", color: "var(--paper)", borderColor: "transparent" }}
          >
            <h3 style={{ color: "var(--paper)" }}>Registration & payment</h3>
            <p style={{ color: "color-mix(in srgb, var(--paper) 78%, transparent)" }}>
              Confirm your seat, receive the invoice, and join the cohort channel. Payment proof is verified by the Negus team before access unlocks.
            </p>
            <div className="public-page-actions">
              <a
                className="public-button public-button-light"
                href={SUPPORT_TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                <CheckCircle aria-hidden="true" /> Register now
              </a>
              <NavLink className="public-button public-button-outline-light" to="/packages">
                Prefer a package instead? <ArrowRight aria-hidden="true" />
              </NavLink>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}
