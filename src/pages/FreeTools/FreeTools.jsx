import { useState } from "react";
import { NavLink } from "react-router";
import {
  ArrowRight,
  Book,
  MediaVideo,
  Page,
  Sparks,
} from "iconoir-react";
import { toast } from "sonner";
import { SUPPORT_TELEGRAM_URL } from "../../config/supportContact";
import { useCreateContactMessage } from "../../hooks/useContactMessages";
import "../public-pages.css";

const VIDEOS = [
  {
    title: "Scholarship application roadmap",
    brief: "Screen recording from a past Negus online scholarship training.",
    embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?rel=0",
  },
  {
    title: "CSS Profile walkthrough highlights",
    brief: "Key moments from a live financial-aid clinic.",
    embedUrl: "https://www.youtube.com/embed/HcOc7P5BMi4?rel=0",
  },
  {
    title: "Common App activities that stand out",
    brief: "Mentor tips from a prior cohort session.",
    embedUrl: "https://www.youtube.com/embed/UB1O30fR-EE?rel=0",
  },
];

const ESSAYS = [
  {
    topic: "Overcoming limited resources to lead a school club",
    university: "Williams College",
    excerpt: "Show the constraint, the decision you made, and the measurable change that followed.",
  },
  {
    topic: "Why community health work shaped my major",
    university: "Howard University",
    excerpt: "Connect a specific moment in your community to the questions you want to study.",
  },
  {
    topic: "Building a silent-zone library culture at school",
    university: "NYU Abu Dhabi",
    excerpt: "Use a small, concrete initiative to reveal how you listen, organize, and bring people in.",
  },
];

export default function FreeToolsPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [essayOpen, setEssayOpen] = useState(null);
  const { mutateAsync: createContactMessage } = useCreateContactMessage();

  const unlock = async (event) => {
    event.preventDefault();
    if (!email.trim() || !phone.trim()) {
      toast.error("Email and phone are required to unlock free tools.");
      return;
    }
    setSubmitting(true);
    try {
      await createContactMessage({
        name: email.split("@")[0] || "Free tools visitor",
        email: email.trim(),
        subject: "Free tools access request",
        message: `Free tools requested. Phone: ${phone.trim()}`,
      });
      setUnlocked(true);
      toast.success("Access unlocked. Explore the free resources below.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "We could not unlock the tools right now. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="public-page">
      <section className="public-page-hero">
        <div className="public-page-hero-inner">
          <p className="public-eyebrow">
            <Sparks aria-hidden="true" /> FREE TOOLS & LEAD ACCESS
          </p>
          <h1 className="public-page-title">
            A taste of Negus resources — then we stay in <em>touch.</em>
          </h1>
          <p className="public-page-copy">
            Preview YouTube training recordings, sample essays, CV Builder, and blogs.
            Share your email and phone so we can send the full library and guidance for your next step.
          </p>
        </div>
      </section>

      <section className="public-content" style={{ maxWidth: "920px" }}>
        {!unlocked ? (
          <form
            onSubmit={unlock}
            className="public-empty-state"
            style={{
              justifyItems: "stretch",
              maxWidth: "640px",
              margin: "0 auto 40px",
              gridTemplateColumns: "1fr",
            }}
          >
            <h3>Get access</h3>
            <p>Enter a reachable email and phone number to receive the full free library and follow-up guidance.</p>
            <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{
                  minHeight: "48px",
                  border: "1px solid var(--line-strong)",
                  borderRadius: "9px",
                  padding: "0 14px",
                  background: "var(--white)",
                  color: "var(--ink)",
                  font: "14px var(--font-body)",
                }}
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                style={{
                  minHeight: "48px",
                  border: "1px solid var(--line-strong)",
                  borderRadius: "9px",
                  padding: "0 14px",
                  background: "var(--white)",
                  color: "var(--ink)",
                  font: "14px var(--font-body)",
                }}
              />
            </div>
            <button type="submit" className="public-button public-button-primary" disabled={submitting}>
              {submitting ? "Unlocking…" : "Get access"}
            </button>
          </form>
        ) : (
          <p
            className="public-eyebrow"
            style={{ justifyContent: "center", marginBottom: "28px", color: "var(--ink-secondary)" }}
          >
            ACCESS UNLOCKED — EXPLORE BELOW
          </p>
        )}

        <div>
          <div className="public-section-heading">
            <p className="public-eyebrow">
              <MediaVideo aria-hidden="true" /> YOUTUBE VIDEOS
            </p>
            <h2>Past training recordings</h2>
            <p>Scholarship training recordings you can preview now. Scroll the row on smaller screens.</p>
          </div>
          <div
            className="free-tools-video-grid"
            style={{
              marginBottom: "48px",
            }}
          >
            {VIDEOS.map((video) => (
              <div
                key={video.title}
                className="free-tools-video-card"
              >
                <iframe
                  style={{
                    aspectRatio: "16/9",
                    borderRadius: "12px",
                    width: "100%",
                    border: 0,
                  }}
                  src={video.embedUrl}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <strong style={{ font: "700 15px/1.3 var(--font-display)", color: "var(--ink)" }}>{video.title}</strong>
                <span style={{ color: "var(--ink-muted)", fontSize: "13px", lineHeight: 1.5 }}>{video.brief}</span>
              </div>
            ))}
          </div>

          <div className="public-section-heading">
            <p className="public-eyebrow">
              <Page aria-hidden="true" /> SAMPLE WORKED ESSAYS
            </p>
            <h2>Essay topic + university</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: "48px",
            }}
          >
            {ESSAYS.map((essay) => (
              <article
                key={essay.topic}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "16px",
                  padding: "20px",
                  background: "var(--white)",
                  display: "grid",
                  gap: "10px",
                }}
              >
                <h3 style={{ margin: 0, font: "700 16px/1.35 var(--font-display)", color: "var(--ink)" }}>
                  {essay.topic}
                </h3>
                <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: "13px" }}>{essay.university}</p>
                <button
                  type="button"
                  className="public-button public-button-secondary"
                  onClick={() => setEssayOpen(essayOpen === essay.topic ? null : essay.topic)}
                >
                  {essayOpen === essay.topic ? "Hide" : "Read tip"}
                </button>
                {essayOpen === essay.topic && (
                  <p style={{ margin: 0, color: "var(--ink-secondary)", fontSize: "13px", lineHeight: 1.55 }}>
                    {essay.excerpt}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            <article className="public-empty-state">
              <h3>CV Builder</h3>
              <p>We’re building a guided academic CV builder with scholarship-ready prompts and export.</p>
              <span className="public-eyebrow" style={{ justifyContent: "center", marginTop: "8px" }}>
                COMING SOON
              </span>
            </article>
            <article className="public-empty-state">
              <h3>Blogs & tips</h3>
              <p>Practical articles on applications, essays, testing, and studying abroad.</p>
              <NavLink className="public-button public-button-secondary" to="/blogs">
                <Book aria-hidden="true" /> Read blogs
              </NavLink>
            </article>
          </div>
        </div>
      </section>

      <section className="public-page-cta">
        <p className="public-eyebrow">READY FOR MORE?</p>
        <h2>Sign up so we can guide your next move.</h2>
        <p>Create an account for course access, or message the team for a free call.</p>
        <div className="public-page-actions">
          <NavLink className="public-button public-button-light" to="/register">
            Sign up
          </NavLink>
          <a
            className="public-button public-button-outline-light"
            href={SUPPORT_TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            Free call on Telegram
          </a>
        </div>
      </section>
    </main>
  );
}
