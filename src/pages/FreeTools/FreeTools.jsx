import { useState } from "react";
import { NavLink } from "react-router";
import {
  ArrowRight,
  Book,
  MediaVideo,
  Page,
  Sparks,
} from "iconoir-react";
import { SUPPORT_TELEGRAM_URL } from "../../config/supportContact";
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
    topic: "Overcoming educational barriers through community action",
    university: "Harvard University",
    excerpt: "Worked sample: When our school library closed after the rainy season damaged its roof, I started a shared reading hour under the science-lab veranda. At first, six students came. I asked each one to bring a book, a question, and one younger student. By the end of the term, the reading hour had become a student-run exchange with a rotating shelf and weekly discussion.",
    lesson: "Show the constraint, the choice you made, and the change that followed. A strong essay lets the reader see your character through action.",
  },
  {
    topic: "Intellectual curiosity and physics research",
    university: "Amherst College",
    excerpt: "Worked sample: I first became interested in light when a cracked phone screen turned the afternoon sun into a row of colors on my desk. Without a laboratory, I rebuilt the experiment with cardboard, a water glass, and a discarded lens. The measurements were imperfect, but each error gave me a better question about what I was actually observing.",
    lesson: "Use a specific question and the imperfect materials you had to reveal how you think, not only what you achieved.",
  },
  {
    topic: "Building a silent-zone library culture at school",
    university: "NYU Abu Dhabi",
    excerpt: "Worked sample: Our library was busy, but it was rarely quiet enough for anyone to study. I did not begin with a rule. I began by asking students when they needed focus and what would make the space feel shared rather than controlled. We tested one silent hour, posted the schedule in Amharic and English, and adjusted it after listening to the students who used the room most.",
    lesson: "A small initiative can reveal listening, organization, and community-building more clearly than a list of titles.",
  },
  {
    topic: "Why Williams and the future of East African technology",
    university: "Williams College",
    excerpt: "Worked sample: I want to study technology where the question is never separated from the people it serves. In my community, a reliable solution is often not the most advanced one; it is the one that can be repaired, explained, and shared. Williams appeals to me because close discussion and broad study would let me connect computing with the human questions behind access.",
    lesson: "Name the specific learning environment you want, then connect it to the questions your experience has already taught you to ask.",
  },
];

export default function FreeToolsPage() {
  const [essayOpen, setEssayOpen] = useState(null);

  return (
    <main className="public-page">
      <section className="public-page-hero">
        <div className="public-page-hero-inner">
          <p className="public-eyebrow">
            <Sparks aria-hidden="true" /> FREE TOOLS & LEAD ACCESS
          </p>
          <h1 className="public-page-title">
            Free resources for your next <em>application step.</em>
          </h1>
          <p className="public-page-copy">
            Browse practical application tools, essay examples, and past scholarship training recordings.
          </p>
        </div>
      </section>

      <section className="public-content" style={{ maxWidth: "920px" }}>
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
            className="free-tools-essay-grid"
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
                className="free-tools-essay-card"
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "16px",
                  padding: "20px",
                  background: "var(--white)",
                  display: "grid",
                  gap: "10px",
                }}
              >
                <img className="free-tools-essay-image" src="/common_app.png" alt="Common App essay resources" />
                <div className="free-tools-essay-icon"><Page aria-hidden="true" /></div>
                <h3 style={{ margin: 0, font: "700 16px/1.35 var(--font-display)", color: "var(--ink)" }}>
                  {essay.topic}
                </h3>
                <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: "13px" }}>{essay.university}</p>
                <button
                  type="button"
                  className="public-button public-button-secondary"
                  onClick={() => setEssayOpen(essayOpen === essay.topic ? null : essay.topic)}
                >
                  {essayOpen === essay.topic ? "Hide sample" : "Read sample"}
                </button>
                {essayOpen === essay.topic && (
                  <div className="free-tools-essay-reading">
                    <p>{essay.excerpt}</p>
                    <strong>What to notice</strong>
                    <p>{essay.lesson}</p>
                  </div>
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
            <article className="free-tools-document-card">
              <div className="free-tools-essay-icon"><Page aria-hidden="true" /></div>
              <h3>CV Builder</h3>
              <p>We’re building a guided academic CV builder with scholarship-ready prompts and export.</p>
              <span className="public-eyebrow" style={{ justifyContent: "center", marginTop: "8px" }}>
                COMING SOON
              </span>
            </article>
            <article className="free-tools-document-card">
              <div className="free-tools-essay-icon"><Book aria-hidden="true" /></div>
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
        <h2>Want a clear plan for your application?</h2>
        <p>Start with the Negus course or contact our team on Telegram.</p>
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
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
