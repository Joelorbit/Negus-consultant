import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Play, Spark, GraduationCap, Award } from "../icons";

export default function CeoMessageSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    if (!videoModalOpen) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVideoModalOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [videoModalOpen]);

  return (
    <section className="ceo-message-section" id="overview">
      <style>{`
        .ceo-message-section {
          --section-english: "Outfit", sans-serif;
          --section-amharic: "Menbere", sans-serif;
          position: relative;
          width: 100%;
          padding: clamp(48px, 6vw, 84px) clamp(20px, 4vw, 56px);
          max-width: 1440px;
          margin: 0 auto;
        }

        .ceo-message-head {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 48px;
        }

        .ceo-message-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #d1bd82;
          background: #123d2b;
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 14px;
        }

        .ceo-message-title {
          font-family: var(--section-english);
          font-size: clamp(28px, 3.4vw, 42px);
          font-weight: 900;
          color: #123d2b;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
        }

        .ceo-message-subhead {
          font-family: var(--section-english);
          font-size: clamp(15px, 1.2vw, 17px);
          color: #56745f;
          line-height: 1.6;
        }

        .ceo-message-amharic {
          font-family: var(--section-amharic);
        }

        .ceo-message-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(24px, 3.5vw, 48px);
          align-items: stretch;
        }

        @media (max-width: 1024px) {
          .ceo-message-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Left Video Card */
        .ceo-video-card {
          position: relative;
          background: #ffffff;
          border-radius: 24px;
          border: 1.5px solid rgba(18, 61, 43, 0.15);
          box-shadow: 0 16px 40px -8px rgba(18, 61, 43, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(24px, 3vw, 36px);
        }

        .ceo-video-screen {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9.5;
          border-radius: 18px;
          background: #0d1e15;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-bottom: 24px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        }

        .ceo-video-screen img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .ceo-video-screen:hover img {
          transform: scale(1.03);
          opacity: 0.95;
        }

        .ceo-video-play-btn {
          position: absolute;
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #123d2b;
          color: #d1bd82;
          display: grid;
          place-items: center;
          box-shadow: 0 8px 28px rgba(18, 61, 43, 0.45);
          border: 3px solid #d1bd82;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .ceo-video-screen:hover .ceo-video-play-btn {
          transform: scale(1.1);
          background: #19523b;
        }

        .ceo-video-copy h3 {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 24px;
          font-weight: 800;
          color: #123d2b;
          margin: 0 0 8px;
        }

        .ceo-video-copy p {
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 14.5px;
          line-height: 1.6;
          color: #315a43;
          margin: 0;
        }

        /* Right Category Tiles Grid */
        .ceo-tiles-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
          height: 100%;
        }

        .ceo-category-tile {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          background: #ffffff;
          border: 1.5px solid rgba(18, 61, 43, 0.14);
          border-radius: 18px;
          text-decoration: none;
          color: #123d2b;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(18, 61, 43, 0.05);
        }

        .ceo-category-tile:hover {
          transform: translateX(4px);
          border-color: #123d2b;
          background: color-mix(in srgb, var(--green-soft) 40%, transparent);
          box-shadow: 0 8px 22px rgba(18, 61, 43, 0.12);
        }

        .ceo-tile-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .ceo-tile-num {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 13px;
          font-weight: 800;
          color: #56745f;
          min-width: 24px;
        }

        .ceo-tile-text strong {
          display: block;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 16px;
          font-weight: 800;
          color: #123d2b;
          line-height: 1.2;
        }

        .ceo-tile-text span {
          display: block;
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 12.5px;
          color: #56745f;
          margin-top: 2px;
        }

        .ceo-tile-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--green-subtle);
          color: #123d2b;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .ceo-category-tile:hover .ceo-tile-arrow {
          background: #123d2b;
          color: #ffffff;
          transform: translate(2px, -2px);
        }

        /* Large Featured "About Us" Tile */
        .ceo-category-tile.featured-about {
          background: #123d2b;
          color: #ffffff;
          border-color: #123d2b;
          box-shadow: 0 8px 24px rgba(18, 61, 43, 0.2);
        }

        .ceo-category-tile.featured-about .ceo-tile-text strong {
          color: #ffffff;
        }

        .ceo-category-tile.featured-about .ceo-tile-text span {
          color: #d1bd82;
        }

        .ceo-category-tile.featured-about .ceo-tile-num {
          color: #d1bd82;
        }

        .ceo-category-tile.featured-about .ceo-tile-arrow {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .ceo-category-tile.featured-about:hover {
          background: #19523b;
          border-color: #19523b;
        }

        /* Bottom Explore Button */
        .ceo-message-bottom-cta {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }

        .ceo-btn-explore-all {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 50px;
          padding: 0 32px;
          border-radius: 9999px;
          background: #ffffff;
          border: 1.5px solid #123d2b;
          color: #123d2b;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 14.5px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(18, 61, 43, 0.08);
          transition: all 0.2s ease;
        }

        .ceo-btn-explore-all:hover {
          background: #123d2b;
          color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(18, 61, 43, 0.2);
        }
      `}</style>

      {/* Section Header with Amharic Anchor */}
      <div className="ceo-message-head">
        <div className="ceo-message-eyebrow">
          <Spark width={12} height={12} />
          <span>A SPECIAL MESSAGE FROM NEGUS</span>
        </div>
        <h2 className="ceo-message-title"><span className="ceo-message-amharic">መልእክት አለን</span> — We Have a Message</h2>
        <p className="ceo-message-subhead">
          Watch our founder’s video message on navigating international university admissions, scholarship funding, and standardized testing from Addis Ababa.
        </p>
      </div>

      <div className="ceo-message-grid">
        {/* Left: Video Preview Card */}
        <div className="ceo-video-card">
          <div
            className="ceo-video-screen"
            onClick={() => setVideoModalOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Play video message"
          >
            <img
              src="/hero-teaching.jpg"
              alt="Negus Mentor Video Session"
              loading="lazy"
            />
            <button type="button" className="ceo-video-play-btn" aria-label="Play video">
              <Play width={24} height={24} style={{ marginLeft: "3px" }} />
            </button>
          </div>

          <div className="ceo-video-copy">
            <h3 className="ceo-message-amharic">የተማሪዎቻችን ስኬት የኛ ኩራት ነው!</h3>
            <p>
              Learn why 450+ Ethiopian scholars trusted Negus for full institutional aid, Common App strategy, and visa interview coaching.
            </p>
          </div>
        </div>

        {/* Right: 5 Quick-Access Category Tiles (from Page 2 Sketch) */}
        <div className="ceo-tiles-stack">
          <Link to="/training" className="ceo-category-tile">
            <div className="ceo-tile-info">
              <span className="ceo-tile-num">01</span>
              <div className="ceo-tile-text">
                <strong>Online Trainings / <span className="ceo-message-amharic">ስልጠናዎች</span></strong>
                <span>Group cohorts, masterclasses & interactive schedules</span>
              </div>
            </div>
            <div className="ceo-tile-arrow">
              <ArrowUpRight width={16} height={16} />
            </div>
          </Link>

          <Link to="/free-tools" className="ceo-category-tile">
            <div className="ceo-tile-info">
              <span className="ceo-tile-num">02</span>
              <div className="ceo-tile-text">
                <strong>Free Tools / <span className="ceo-message-amharic">ነፃ መገልገያዎች</span></strong>
                <span>Video recordings, sample essays, CV builder & guides</span>
              </div>
            </div>
            <div className="ceo-tile-arrow">
              <ArrowUpRight width={16} height={16} />
            </div>
          </Link>

          <Link to="/courses" className="ceo-category-tile">
            <div className="ceo-tile-info">
              <span className="ceo-tile-num">03</span>
              <div className="ceo-tile-text">
                <strong>Scholarship Courses / <span className="ceo-message-amharic">ኮርሶች</span></strong>
                <span>Structured self-paced video modules & syllabus</span>
              </div>
            </div>
            <div className="ceo-tile-arrow">
              <ArrowUpRight width={16} height={16} />
            </div>
          </Link>

          <Link to="/sat-ielts" className="ceo-category-tile">
            <div className="ceo-tile-info">
              <span className="ceo-tile-num">04</span>
              <div className="ceo-tile-text">
                <strong>SAT & IELTS / <span className="ceo-message-amharic">ፈተና ዝግጅት</span></strong>
                <span>Digital SAT 1500+ drills & IELTS Band 8.0+ practice</span>
              </div>
            </div>
            <div className="ceo-tile-arrow">
              <ArrowUpRight width={16} height={16} />
            </div>
          </Link>

          <Link to="/about" className="ceo-category-tile featured-about">
            <div className="ceo-tile-info">
              <span className="ceo-tile-num">05</span>
              <div className="ceo-tile-text">
                <strong>About Us / <span className="ceo-message-amharic">ስለ እኛ</span></strong>
                <span>Our 20-year history, verified results & senior mentors</span>
              </div>
            </div>
            <div className="ceo-tile-arrow">
              <ArrowUpRight width={16} height={16} />
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Exploration CTA */}
      <div className="ceo-message-bottom-cta">
        <Link to="/courses" className="ceo-btn-explore-all">
          <span>Explore All Courses & Programs</span>
          <ArrowRight width={16} height={16} />
        </Link>
      </div>

      {/* YouTube video modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden aspect-video shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0"
              title="Negus Consultants founder message"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <button
              type="button"
              onClick={() => setVideoModalOpen(false)}
              aria-label="Close founder message"
              className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white hover:bg-black"
            >
              X
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
