import { NavLink, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Play,
  MessageText,
} from "iconoir-react";
import { SUPPORT_TELEGRAM_URL } from "../../config/supportContact";
import "../public-pages.css";

const DETAIL = {
  "scholarship-cohort-2026": {
    title: "2026/2027 Full Scholarship Cohort Training",
    thumbnail: "/thumbnail/full_course.jpg",
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
    mentorProfiles: ["Leulseged Tafere", "Abrham Sinshaw"],
    delivery: "Live Zoom sessions + recorded replays in Telegram for low connectivity.",
    registration:
      "Registration is open. Confirm your seat via Telegram, then complete the training fee invoice shared by the team.",
    status: "open",
    statusLabel: "Registration open",
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
    thumbnail: "/assets/training/photo_2026-01-13_11-55-38.jpg",
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
    mentorProfiles: ["Leulseged Tafere", "Abrham Sinshaw"],
    delivery: "Live online workshop with shared docs and recorded feedback notes.",
    registration: "Limited seats. Register via Telegram to receive the weekend schedule and payment link.",
    status: "open",
    statusLabel: "Registration open",
    testimonials: [
      {
        quote: "I rewrote my opener twice in one afternoon — and it finally sounded like me.",
        name: "Selam A.",
      },
    ],
  },
  "visa-masterclass": {
    title: "US Embassy Visa Interview Masterclass",
    thumbnail: "/assets/training/photo_2025-11-29_09-18-06.jpg",
    time: "Completed · recordings available on request",
    about:
      "This training has ended. You can still read participant feedback and contact the team for the next visa cohort.",
    audience: "Students with admits / I-20 in progress.",
    contents: ["Document checklist", "Mock interviews", "Confidence drills"],
    mentors: "Mentors who have cleared F-1 interviews with Negus scholars.",
    delivery: "Was delivered live online; highlights available via Telegram archive.",
    registration: null,
    status: "completed",
    statusLabel: "Ended · recordings by request",
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
  const training = DETAIL[id];
  if (!training) {
    return (
      <main className="public-page public-content training-not-found">
        <h1>Training not found</h1>
        <p>This session may have been removed or its link may be incorrect.</p>
        <NavLink className="public-button public-button-primary" to="/training">
          <ArrowLeft aria-hidden="true" /> Back to trainings
        </NavLink>
      </main>
    );
  }
  const isOpen = training.status === "open";

  return (
    <main className="public-page">
      <section className="training-detail-hero">
        <div className="training-detail-hero-inner">
          <div className="training-detail-copy">
            <NavLink to="/training" className="training-detail-back">
              <ArrowLeft aria-hidden="true" /> All trainings
            </NavLink>
            <p className="public-eyebrow"><GraduationCap aria-hidden="true" /> TRAINING DETAIL</p>
            <h1>{training.title}</h1>
            <p className="training-detail-time"><Calendar aria-hidden="true" />{training.time}</p>
            <span className={`training-status-pill ${isOpen ? "is-open" : "is-ended"}`}>
              {isOpen ? <CheckCircle aria-hidden="true" /> : <Clock aria-hidden="true" />}
              {training.statusLabel}
            </span>
            <div className="training-detail-mentor">
              <span className="training-detail-mentor-icon"><GraduationCap aria-hidden="true" /></span>
              <div>
                <span>LEARN WITH</span>
                <strong>{training.mentors}</strong>
                {training.mentorProfiles && (
                  <div className="training-detail-mentor-links">
                    {training.mentorProfiles.map((name) => {
                      const slug = name.toLowerCase().replaceAll(" ", "-");
                      return <NavLink key={slug} to={`/about/mentors/${slug}`}>{name}<ArrowRight aria-hidden="true" /></NavLink>;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <a
            className="training-video-placeholder"
            href="https://www.youtube.com/@negusconsultants"
            target="_blank"
            rel="noreferrer"
            aria-label={`Watch Negus training videos on YouTube. ${training.title}`}
          >
            <img src={training.thumbnail} alt="" />
            <span className="training-video-placeholder-shade" />
            <span className="training-video-play"><Play aria-hidden="true" fill="currentColor" /></span>
            <span className="training-video-caption">
              <span>NEGUS ON YOUTUBE</span>
              <strong>See how our sessions work</strong>
            </span>
          </a>
        </div>
      </section>

      <section className="public-content training-detail-content">
        <div className="training-detail-main">
          <section className="training-detail-panel">
            <p className="public-eyebrow">ABOUT THIS TRAINING</p>
            <h2>Make your next application step with confidence.</h2>
            <p>{training.about}</p>
            <p className="training-detail-audience"><strong>Who it’s for</strong>{training.audience}</p>
            <h3>What you’ll work on</h3>
            <ul className="training-detail-topics">
              {training.contents.map((item) => <li key={item}><CheckCircle aria-hidden="true" />{item}</li>)}
            </ul>
          </section>

          <section className="training-detail-panel">
            <p className="public-eyebrow">THE FORMAT</p>
            <h2>How it will be delivered</h2>
            <p>{training.delivery}</p>
          </section>

          {training.testimonials.length > 0 && (
            <section className="training-detail-testimonials">
              <p className="public-eyebrow">PREVIOUS PARTICIPANT NOTES</p>
              {training.testimonials.map((t) => (
                <blockquote key={t.name}>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <cite>— {t.name}</cite>
                </blockquote>
              ))}
            </section>
          )}
        </div>

        {isOpen && (
          <aside className="training-register-card">
            <p className="public-eyebrow">REGISTRATION</p>
            <h2>Ready to join?</h2>
            <p>{training.registration}</p>
            <p className="training-admin-details">The training team will confirm the latest schedule, fees, and registration details.</p>
            <a className="public-button public-button-light" href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noreferrer">
              <MessageText aria-hidden="true" /> Ask about this training
            </a>
            <NavLink className="training-package-link" to="/packages">
              Explore course support packages <ArrowRight aria-hidden="true" />
            </NavLink>
          </aside>
        )}
        {!isOpen && (
          <aside className="training-register-card is-ended">
            <p className="public-eyebrow">THIS SESSION HAS ENDED</p>
            <h2>Interested in the next one?</h2>
            <p>Ask the team about future dates or available recordings.</p>
            <a className="public-button public-button-light" href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noreferrer">
              <MessageText aria-hidden="true" /> Contact the training team
            </a>
          </aside>
        )}
      </section>
    </main>
  );
}
