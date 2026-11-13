import { useState } from "react";
import { NavLink } from "react-router";
import {
  ArrowRight,
  Book,
  MediaVideo,
  Page,
} from "iconoir-react";
import { SUPPORT_TELEGRAM_URL } from "../../config/supportContact";
import { useMe } from "../../hooks/useAuth";
import { useGetBlogs } from "../../hooks/useBlogs";
import BlogCard from "../Blogs/components/BlogCard";
import "../public-pages.css";

const NEGUS_YOUTUBE_URL = "https://www.youtube.com/@negusconsultants";
const FEATURED_VIDEOS = [
  {
    id: "ytDhlQqU384",
    title: "Complete Guide to the U.S. College Application",
    detail: "Common App, essays, and scholarships · In Amharic",
  },
  {
    id: "Qeo4Kctt_WM",
    title: "Fully Funded High School Scholarship Opportunities",
    detail: "Scholarship guidance · In Amharic",
  },
  {
    id: "35vimOLs62g",
    title: "MIT Scholarship Winner Interview & Live Q&A",
    detail: "A conversation with a scholarship recipient",
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
  const { data: user } = useMe();
  const {
    data: blogs,
    isLoading: blogsLoading,
    isError: blogsError,
    refetch: refetchBlogs,
  } = useGetBlogs({ staleTime: 60_000, retry: 1 });
  const blogPosts = Array.isArray(blogs) ? blogs.slice(0, 3) : [];

  return (
    <main className="public-page">
      <section className="public-content free-tools-content">
        <div>
          <div className="public-section-heading">
            <p className="public-eyebrow">
              <MediaVideo aria-hidden="true" /> YOUTUBE VIDEOS
            </p>
            <h2>Training videos from Negus</h2>
            <p>Browse published videos on the official Negus Consultants YouTube channel.</p>
          </div>
          <div className="free-tools-video-grid">
            {FEATURED_VIDEOS.map((video) => (
              <article className="free-tools-video-card" key={video.id}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <div>
                  <h3>{video.title}</h3>
                  <p>{video.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="public-page-actions free-tools-video-actions">
            {user ? (
              <a
                className="public-button public-button-primary"
                href={NEGUS_YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Explore more videos <ArrowRight aria-hidden="true" />
              </a>
            ) : (
              <NavLink
                className="public-button public-button-primary"
                to="/login"
                state={{ from: "/free-tools" }}
              >
                Sign in to explore more videos <ArrowRight aria-hidden="true" />
              </NavLink>
            )}
          </div>
        </div>

        <div className="free-tools-blog-section">
          <div className="public-section-heading">
            <p className="public-eyebrow"><Book aria-hidden="true" /> BLOG &amp; ADVICE</p>
            <h2>Practical guidance from the Negus team.</h2>
          </div>
          {blogsLoading ? (
            <div className="public-blog-grid" aria-label="Loading articles">
              {[0, 1, 2].map((item) => <div className="public-skeleton blog-skeleton" key={item} />)}
            </div>
          ) : blogsError ? (
            <div className="public-empty-state" role="alert">
              <h3>Articles are temporarily unavailable.</h3>
              <div className="public-page-actions">
                <button className="public-button public-button-primary" type="button" onClick={() => refetchBlogs()}>Try again</button>
                <NavLink className="public-button public-button-secondary" to="/blogs">Browse all articles</NavLink>
              </div>
            </div>
          ) : blogPosts.length ? (
            <>
              <div className="public-blog-grid">
                {blogPosts.map((post) => <BlogCard key={post.id} {...post} />)}
              </div>
              <div className="public-page-actions">
                <NavLink className="public-button public-button-secondary" to="/blogs">See all articles <ArrowRight aria-hidden="true" /></NavLink>
              </div>
            </>
          ) : (
            <div className="public-empty-state">
              <h3>New articles are on the way.</h3>
              <p>Visit the Negus journal for the latest scholarship and application advice.</p>
              <NavLink className="public-button public-button-secondary" to="/blogs">Visit the journal <ArrowRight aria-hidden="true" /></NavLink>
            </div>
          )}
        </div>

        <div>
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
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
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
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
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
          </div>
        </div>
      </section>

      <section className="public-page-cta">
        <p className="public-eyebrow">READY FOR MORE?</p>
        <h2>Want a clear plan for your application?</h2>
        <p>Start with the Negus course or contact our team on Telegram.</p>
        <div className="public-page-actions">
          <NavLink className="public-button public-button-light" to="/courses">
            Explore courses
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
