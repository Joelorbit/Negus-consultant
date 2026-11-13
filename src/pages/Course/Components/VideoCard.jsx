import React, { useState } from "react";
import { Lock, Clock, ArrowRight } from "iconoir-react";

export function VideoCard({ video }) {
  const [imgError, setImgError] = useState(false);

  const fallbackThumbnail = "/thumbnail/c_part_1.jpg";
  const displayThumbnail = imgError || !video.thumbnail ? fallbackThumbnail : video.thumbnail;

  return (
    <a
      className="negus-course-card"
      href={`/courses?video=${encodeURIComponent(video.id)}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${video.title} in a new tab`}
    >
      <style>{`
        .negus-course-card {
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--line);
          border-radius: var(--radius-lg, 16px);
          background: var(--white);
          color: var(--ink);
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s var(--ease-spring, cubic-bezier(0.16, 1, 0.3, 1)),
                      box-shadow 0.25s ease,
                      border-color 0.25s ease;
        }

        .negus-course-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: var(--green);
        }

        /* Thumbnail Container */
        .negus-course-thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: var(--green-soft);
          overflow: hidden;
        }

        .negus-course-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s var(--ease-spring, cubic-bezier(0.16, 1, 0.3, 1));
        }

        .negus-course-card:hover .negus-course-thumb-img {
          transform: scale(1.04);
        }

        /* Overlay */
        .negus-course-overlay {
          position: absolute;
          inset: 0;
          background: rgba(18, 61, 43, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.25s ease;
        }

        .negus-course-card:hover .negus-course-overlay {
          opacity: 1;
        }

        .negus-course-play-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--yellow);
          color: #123d2b;
          border: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 18px rgba(0,0,0,0.25);
          transform: scale(1);
          transition: transform 0.25s var(--ease-spring, cubic-bezier(0.16, 1, 0.3, 1));
        }

        .negus-course-card:hover .negus-course-play-btn {
          transform: scale(1);
        }

        /* Top status badge */
        .negus-course-status-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 9999px;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }

        .negus-course-status-badge.premium {
          background: color-mix(in srgb, #123d2b 88%, transparent);
          color: var(--yellow);
          border: 1px solid rgba(209, 189, 130, 0.3);
        }

        /* Duration tag */
        .negus-course-duration {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          border-radius: 8px;
          background: rgba(10, 24, 18, 0.85);
          color: #f3f5f2;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(8px);
        }

        /* Card Content */
        .negus-course-content {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .negus-course-eyebrow {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 8px;
        }

        .negus-course-title {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin: 0 0 10px;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          transition: color 0.2s ease;
        }

        .negus-course-card:hover .negus-course-title {
          color: var(--gold-ink);
        }

        .negus-course-desc {
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 13.5px;
          color: var(--ink-secondary);
          line-height: 1.6;
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        /* Instructor Row */
        .negus-course-instructor {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }

        .negus-course-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--yellow);
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid var(--line-strong);
        }

        .negus-course-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .negus-course-inst-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .negus-course-inst-name {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12.5px;
          font-weight: 700;
          color: var(--ink);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .negus-course-inst-title {
          font-size: 12px;
          color: var(--ink-muted);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        /* Tags */
        .negus-course-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 14px;
        }

        .negus-course-tag {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 6px;
          background: var(--green-subtle);
          color: var(--ink-muted);
          border: 1px solid var(--line);
        }

        .negus-course-unlock {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          align-self: flex-start;
          margin-top: 16px;
          color: var(--ink-secondary);
          font: 700 12px/1.3 var(--font-display, 'Lexend', sans-serif);
        }

        .negus-course-unlock svg {
          width: 15px;
          height: 15px;
          color: var(--gold-ink);
        }

        .negus-course-card:focus-visible {
          outline: 3px solid var(--gold-ink);
          outline-offset: 3px;
        }
      `}</style>

      {/* Video Thumbnail */}
      <div className="negus-course-thumb-wrap">
        <img
          src={displayThumbnail}
          alt={video.title}
          className="negus-course-thumb-img"
          onError={() => setImgError(true)}
          loading="lazy"
          decoding="async"
        />

        <span className="negus-course-status-badge premium">
          <Lock width={12} height={12} /> Locked
        </span>

        {/* Duration */}
        {video.duration && (
          <span className="negus-course-duration">
            <Clock width={12} height={12} /> {video.duration}
          </span>
        )}

        {/* Play Overlay */}
        <div className="negus-course-overlay" aria-hidden="true">
          <div className="negus-course-play-btn">
            <Lock width={20} height={20} />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="negus-course-content">
        <div className="negus-course-eyebrow">
          {video.category_name || video.category || "General"}
          {video.level && ` · ${video.level}`}
        </div>

        <h3 className="negus-course-title">{video.title}</h3>

        <p className="negus-course-desc">{video.description}</p>

        {/* Instructor Details */}
        <div className="negus-course-instructor">
          <div className="negus-course-avatar">
            {video.instructor_avatar ? (
              <img
                src={video.instructor_avatar}
                alt={video.instructor_name || "Instructor"}
              />
            ) : (
              <span>{video.instructor_name?.[0] || "N"}</span>
            )}
          </div>
          <div className="negus-course-inst-info">
            <span className="negus-course-inst-name">
              {video.instructor_name || "Negus Instructor"}
            </span>
            <span className="negus-course-inst-title">
              {video.instructor_title || "Course Mentor"}
            </span>
          </div>
        </div>

        {/* Tags */}
        {Array.isArray(video.tags) && video.tags.length > 0 && (
          <div className="negus-course-tags">
            {video.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="negus-course-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <span className="negus-course-unlock">Unlock with a package <ArrowRight aria-hidden="true" /></span>
      </div>
    </a>
  );
}
