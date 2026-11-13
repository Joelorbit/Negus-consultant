import { Link, NavLink } from "react-router";
import {
  ArrowRight,
  Calendar,
  GraduationCap,
  Community,
  CheckCircle,
} from "iconoir-react";
import { SUPPORT_TELEGRAM_URL } from "../../config/supportContact";
import { testimonialPhotos } from "../../assets/testimonialPhotos";
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
    thumbnail: "/thumbnail/full_course.jpg",
    mentors: "Negus admissions mentors",
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
    thumbnail: "/assets/training/photo_2026-01-13_11-55-38.jpg",
    mentors: "Essay coaches from the Negus admissions team",
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
    thumbnail: "/assets/training/photo_2025-11-29_09-18-06.jpg",
    mentors: "Negus visa-preparation mentors",
  },
];

export default function TrainingPage() {
  return (
    <main className="public-page">
      <section className="public-page-hero training-page-hero">
        <div className="public-page-hero-inner training-hero-grid">
          <div className="training-overview">
            <p className="public-eyebrow"><Community aria-hidden="true" /> ABOUT THE TRAINING</p>
            <h1 className="public-page-title">Practical training for your next <em>application step.</em></h1>
            <p className="public-page-copy">
              Build confidence in scholarship research, application writing, and interviews through structured, practical sessions.
            </p>
          </div>
          <figure className="training-visual-card">
            <img
              src="/assets/training/photo_2026-01-13_11-55-38.jpg"
              alt="Students attending a scholarship session at their school"
            />
            <figcaption>
              <span className="public-eyebrow">LEARNING, TOGETHER</span>
              Practical guidance, shared in the classroom.
            </figcaption>
          </figure>
          <a className="public-button public-button-primary training-explore-link" href="#training-catalog">
            Explore trainings <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="public-content" id="training-catalog">
        <div className="public-section-heading">
          <p className="public-eyebrow">TRAINING CATALOG</p>
          <h2>Ongoing sessions first. Completed ones keep their testimonials.</h2>
          <p>
            Compare upcoming sessions and completed recordings. Open a training for its
            schedule, mentors, and registration details.
          </p>
        </div>

        <div className="training-card-grid">
          {TRAININGS.map((item) => (
            <article
              key={item.id}
              className="home-card training-card"
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
              <div className="training-card-image" style={{ aspectRatio: "16 / 10", overflow: "hidden", background: "var(--green-subtle)" }}>
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
                    className={`training-status-pill ${item.status === "open" ? "is-open" : "is-ended"}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      borderRadius: "999px",
                      padding: "4px 10px",
                      font: "700 11px/1.2 var(--font-display)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.status === "open" ? (
                      <>
                        <CheckCircle width={12} height={12} aria-hidden="true" /> Registration open
                      </>
                    ) : (
                      "Ended · recordings by request"
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
                <p className="training-card-mentors">
                  <GraduationCap width={16} height={16} aria-hidden="true" />
                  <span>{item.mentors}</span>
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

      <section className="public-content training-essay-pricing">
        <div className="public-section-heading">
          <p className="public-eyebrow">COURSE SUPPORT PACKAGES</p>
          <h2>Choose the support timeline that works for you.</h2>
        </div>
        <div className="training-price-grid">
          {[["6-Month Course Support Package", "1,870 ETB"], ["2-Year Course Support Package", "2,900 ETB"]].map(([name, price]) => (
            <article className="training-price-card" key={name}>
              <span>{name}</span><strong>{price}</strong>
              <a className="public-button public-button-secondary" href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noreferrer">Ask about this package</a>
            </article>
          ))}
        </div>
      </section>

      <section className="public-content training-testimonials">
        <div className="public-section-heading">
          <p className="public-eyebrow">STUDENT VOICES</p>
          <h2>Hear from students who trained with Negus.</h2>
        </div>
        <div className="testimonial-media-grid">
          {testimonialPhotos.map(({ name, image }) => (
            <article className="testimonial-media-card" key={name}>
              <a href={image} target="_blank" rel="noreferrer" aria-label={`Open ${name}'s full testimonial`}>
                <img src={image} alt={`${name}'s student testimonial`} loading="lazy" />
              </a>
              <div className="testimonial-media-copy"><h3>{name}</h3></div>
            </article>
          ))}
        </div>
        <div className="public-page-actions"><Link className="public-button public-button-secondary" to="/testimonials">See all testimonials</Link></div>
      </section>

      <section className="public-page-cta">
        <p className="public-eyebrow">YOUR NEXT STEP</p>
        <h2>Find the training that fits your goals.</h2>
        <p>Compare upcoming sessions and choose where you want to begin.</p>
        <div className="public-page-actions">
          <a className="public-button public-button-light" href="#training-catalog">Explore trainings <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>
    </main>
  );
}
