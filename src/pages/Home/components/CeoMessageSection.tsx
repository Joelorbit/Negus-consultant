import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, Play } from "../icons";

export default function CeoMessageSection() {
  const [isMessagePlaying, setIsMessagePlaying] = useState(false);

  return (
    <section className="ceo-message-section" id="overview">
      <style>{`
        .ceo-message-section {
          --section-english: "Outfit", "Benaiah", sans-serif;
          --section-amharic: "Benaiah", "Menbere", sans-serif;
          position: relative;
          width: 100%;
          padding: clamp(24px, 3vw, 40px) clamp(20px, 4vw, 56px) clamp(48px, 6vw, 84px);
          max-width: 1440px;
          margin: 0 auto;
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

        .ceo-video-card {
          position: relative;
          background: #ffffff;
          border-radius: 24px;
          border: 1.5px solid rgba(18, 61, 43, 0.15);
          box-shadow: 0 16px 40px -8px rgba(18, 61, 43, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: clamp(24px, 3vw, 36px);
        }

        .ceo-video-screen {
          position: relative;
          width: 100%;
          flex: 1 1 auto;
          min-height: 0;
          border-radius: 18px;
          overflow: hidden;
          background: #0d1e15;
          margin-bottom: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        }

        .ceo-video-screen iframe,
        .ceo-video-screen button,
        .ceo-video-screen img {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .ceo-video-screen button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          overflow: hidden;
          background: #0d1e15;
          cursor: pointer;
        }

        .ceo-video-screen img {
          object-fit: cover;
          opacity: 0.85;
          transition: transform 0.35s ease, opacity 0.35s ease;
        }

        .ceo-video-screen button:hover img {
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
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .ceo-video-screen button:hover .ceo-video-play-btn {
          transform: scale(1.1);
          background: #19523b;
        }

        .ceo-video-play-label {
          position: absolute;
          bottom: 14px;
          left: 50%;
          padding: 8px 13px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 999px;
          background: rgba(8, 24, 15, 0.72);
          color: #fff;
          font: 700 12px/1 var(--font-display, 'Lexend', sans-serif);
          letter-spacing: 0.02em;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .ceo-video-screen button:focus-visible {
          outline: 3px solid #d1bd82;
          outline-offset: -5px;
        }

        .ceo-video-copy {
          text-align: center;
        }

        .ceo-video-copy h3 {
          font-family: var(--section-amharic);
          font-size: 28px;
          font-weight: 800;
          color: #123d2b;
          margin: 0 0 8px;
          text-align: center;
        }

        .ceo-video-copy p {
          font-family: var(--section-amharic);
          font-size: 14.5px;
          line-height: 1.6;
          color: #315a43;
          margin: 0;
          text-align: center;
        }

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
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
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

      `}</style>

      <div className="ceo-message-grid">
        <div className="ceo-video-card">
          <div className="ceo-video-screen">
            {isMessagePlaying ? (
              <iframe
                src="https://www.youtube-nocookie.com/embed/ldL5J1EnlZg?autoplay=1&rel=0"
                title="Negus Consultants scholarship message"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsMessagePlaying(true)}
                aria-label="Play the Negus Consultants scholarship message"
              >
                <img
                  src="https://img.youtube.com/vi/ldL5J1EnlZg/hqdefault.jpg"
                  alt="Preview of the Negus Consultants scholarship message"
                  loading="lazy"
                />
                <span className="ceo-video-play-btn" aria-hidden="true">
                  <Play width={26} height={26} fill="currentColor" style={{ marginLeft: "3px" }} />
                </span>
                <span className="ceo-video-play-label">Play message</span>
              </button>
            )}
          </div>
          <div className="ceo-video-copy">
            <h3>መልእክት አለን</h3>
            <p>
              ኢትዮጵያውያን ተማሪዎችን ለተለያዩ የኢንተርናሽናል ስኮላርሺፖች ብቁ ማድረግ ዋና አላማችን ነው።
            </p>
          </div>
        </div>

        <div className="ceo-tiles-stack">
          <Link to="/training" className="ceo-category-tile">
            <div className="ceo-tile-info">
              <span className="ceo-tile-num">01</span>
              <div className="ceo-tile-text">
                <strong>Online Trainings</strong>
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
                <strong>Free Tools</strong>
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
                <strong>Scholarship Courses</strong>
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
                <strong>SAT & IELTS</strong>
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
                <strong>About Us</strong>
                <span>2+ years of guidance, verified results & senior mentors</span>
              </div>
            </div>
            <div className="ceo-tile-arrow">
              <ArrowUpRight width={16} height={16} />
            </div>
          </Link>
        </div>
      </div>

    </section>
  );
}
