import React from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Check } from "../icons";

export default function CeoHero() {
  const scrollToExplore = () => {
    const el = document.getElementById("overview") || document.getElementById("courses");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="ceo-hero-section">
      <style>{`
        .ceo-hero-section {
          --hero-english: "Outfit", "Benaiah", sans-serif;
          --hero-amharic: "Benaiah", "Menbere", sans-serif;
          position: relative;
          width: 100%;
          min-height: min(820px, calc(100svh - 74px));
          display: flex;
          align-items: center;
          padding: 0 0 clamp(42px, 5vw, 76px) clamp(20px, 4vw, 56px);
          max-width: none;
          margin: 0 auto;
          overflow: hidden;
        }

        .ceo-hero-grid {
          display: grid;
          grid-template-columns: minmax(320px, 0.72fr) minmax(0, 1.28fr);
          align-items: center;
          gap: clamp(18px, 3vw, 48px);
          width: 100%;
        }

        @media (max-width: 860px) {
          .ceo-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .ceo-hero-image-wrap {
            width: 100%;
            margin-right: 0;
          }
        }

        /* Left Content Column */
        .ceo-hero-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .ceo-hero-title {
          font-family: var(--hero-english);
          font-size: clamp(44px, 5.2vw, 78px);
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: -0.06em;
          color: #123d2b;
          margin: 0 0 22px;
          text-wrap: balance;
        }

        .ceo-hero-title span {
          display: block;
          color: #1a523b;
          position: relative;
          width: fit-content;
          margin-inline: auto;
        }

        .ceo-hero-title span + span {
          margin-top: 0.06em;
        }

        .ceo-hero-amharic {
          font-family: var(--hero-amharic);
          font-weight: 800;
          letter-spacing: -0.015em;
        }

        .ceo-hero-title span::after {
          content: "";
          position: absolute;
          left: 0;
          right: 2%;
          bottom: 1px;
          height: 11px;
          z-index: -1;
          background: #d1bd82;
          transform: skewX(-8deg);
          opacity: 0.72;
        }

        .ceo-hero-subhead {
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: clamp(15.5px, 1.4vw, 18px);
          line-height: 1.6;
          color: #315a43;
          margin: 0 0 24px;
          max-width: 580px;
          text-wrap: balance;
        }

        .ceo-hero-checklist {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 0 0 32px;
          text-align: left;
        }

        .ceo-hero-check-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--hero-english);
          font-size: 13.5px;
          font-weight: 600;
          color: #123d2b;
        }

        .ceo-hero-check-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #123d2b;
          color: #d1bd82;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(18, 61, 43, 0.2);
        }

        .ceo-hero-check-icon svg {
          width: 12px;
          height: 12px;
        }

        .ceo-hero-actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          width: min(100%, 500px);
          margin-bottom: 36px;
        }

        .ceo-hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-width: 0;
          min-height: 52px;
          padding: 0 16px;
          background: #123d2b;
          color: #ffffff !important;
          border-radius: 9999px;
          font-family: var(--hero-english);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.01em;
          border: 1.5px solid #123d2b;
          box-shadow: 0 4px 16px rgba(18, 61, 43, 0.24);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ceo-hero-btn-primary:hover {
          background: #19523b;
          border-color: #19523b;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(18, 61, 43, 0.32);
        }

        .ceo-hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-width: 0;
          min-height: 52px;
          padding: 0 16px;
          background: #ffffff;
          color: #123d2b;
          border-radius: 9999px;
          font-family: var(--hero-english);
          font-size: 15px;
          font-weight: 700;
          border: 1.5px solid rgba(18, 61, 43, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .ceo-hero-btn-secondary:hover {
          background: var(--green-subtle);
          border-color: #123d2b;
          transform: translateY(-2px);
        }

        /* Stats Row */
        .ceo-hero-metrics {
          display: flex;
          align-items: center;
          gap: clamp(20px, 3vw, 36px);
          padding-top: 24px;
          border-top: 1px solid rgba(18, 61, 43, 0.12);
          width: 100%;
          max-width: 580px;
          justify-content: center;
          text-align: center;
        }

        .ceo-metric-item {
          display: flex;
          flex-direction: column;
        }

        .ceo-metric-val {
          font-family: var(--hero-english);
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 900;
          color: #123d2b;
          line-height: 1.1;
        }

        .ceo-metric-label {
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 12px;
          color: #56745f;
          font-weight: 600;
          margin-top: 2px;
        }

        /* Right Photo Column (with Left Pixel-by-Pixel Gradient Fade) */
        .ceo-hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .ceo-hero-image-wrap {
          position: relative;
          width: calc(100% + 8vw);
          margin-right: -8vw;
          max-width: none;
          min-height: clamp(560px, 58vw, 820px);
          border-radius: 0;
          overflow: hidden;
          background: transparent;
          isolation: isolate;
        }

        .ceo-hero-image-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(90deg, var(--paper) 0%, color-mix(in srgb, var(--paper) 86%, transparent) 11%, transparent 42%),
            linear-gradient(0deg, var(--paper) 0%, transparent 13%),
            linear-gradient(180deg, var(--paper) 0%, transparent 11%);
        }

        .ceo-hero-img {
          width: 100%;
          height: clamp(560px, 58vw, 820px);
          min-height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
          transform: scale(1.04);
          transform-origin: center;
          mask-image: linear-gradient(to right, transparent 0%, black 34%, black 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 34%, black 100%);
        }

        @media (max-width: 860px) {
          .ceo-hero-section {
            --paper: #07130e;
            min-height: min(900px, 100svh);
            padding: 32px 22px 220px;
            color: #fff;
            background: #07130e;
          }

          .ceo-hero-grid {
            display: block;
          }

          .ceo-hero-right {
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;
          }

          .ceo-hero-image-wrap {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            min-height: 100%;
            margin: 0;
          }

          .ceo-hero-image-wrap::after {
            background:
              linear-gradient(180deg, rgba(7, 19, 14, 0.08) 0%, rgba(7, 19, 14, 0.18) 30%, rgba(7, 19, 14, 0.88) 71%, #07130e 100%),
              linear-gradient(90deg, rgba(7, 19, 14, 0.35), transparent 62%);
          }

          .ceo-hero-img {
            height: 100%;
            min-height: 100%;
            object-position: 64% center;
            mask-image: none;
            -webkit-mask-image: none;
          }

          .ceo-hero-left {
            align-items: center;
            width: min(100%, 680px);
            margin-inline: auto;
            color: #fff;
          }

          .ceo-hero-title {
            max-width: 680px;
            color: #fff;
            margin-bottom: 20px;
            font-size: clamp(38px, 10.5vw, 68px);
            line-height: 1.12;
            letter-spacing: -0.045em;
            text-shadow: 0 3px 28px rgba(0, 0, 0, 0.35);
          }

          .ceo-hero-title span {
            color: #fff;
          }

          .ceo-hero-title span::after {
            background: #d1bd82;
          }

          .ceo-hero-subhead {
            width: min(100%, 590px);
            max-width: 590px;
            color: rgba(255, 255, 255, 0.86);
            margin-bottom: 28px;
            font-size: clamp(15px, 3.9vw, 18px);
            line-height: 1.68;
            text-shadow: 0 2px 18px rgba(0, 0, 0, 0.42);
          }

          .ceo-hero-checklist {
            width: min(100%, 520px);
            color: #fff;
            text-align: center;
            align-items: center;
            gap: 12px;
            margin-bottom: 30px;
          }

          .ceo-hero-check-item {
            color: rgba(255, 255, 255, 0.88);
            justify-content: center;
            text-align: center;
          }

          .ceo-hero-metrics {
            border-top-color: rgba(255, 255, 255, 0.24);
          }

          .ceo-metric-val {
            color: #fff;
          }

          .ceo-metric-label {
            color: rgba(255, 255, 255, 0.65);
          }

          .ceo-hero-subhead {
            max-width: 590px;
          }
        }

        /* ── Mobile portrait (≤ 640px) ── */
        @media (max-width: 640px) {
          .ceo-hero-section {
            --paper: #07130e;
            min-height: calc(100svh - 74px);
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            background: #07130e;
          }

          .ceo-hero-image-wrap::after {
            background:
              linear-gradient(180deg, rgba(7, 19, 14, 0.42) 0%, rgba(7, 19, 14, 0.48) 28%, rgba(7, 19, 14, 0.66) 52%, rgba(7, 19, 14, 0.84) 78%, #07130e 100%),
              linear-gradient(90deg, rgba(7, 19, 14, 0.24), transparent 82%);
          }

          .ceo-hero-grid {
            display: flex;
            flex-direction: column;
            min-height: calc(100svh - 74px);
            padding: clamp(24px, 4.5svh, 44px) 0 calc(24px + env(safe-area-inset-bottom));
          }

          .ceo-hero-left {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 0;
            /* optical center: 45/55 split so content feels lifted */
            padding-bottom: 8svh;
          }

          .ceo-hero-title {
            margin: 0 0 16px;
            font-size: clamp(42px, 11.6vw, 56px);
            line-height: 1.14;
            letter-spacing: -0.02em;
          }

          .ceo-hero-title span {
            white-space: nowrap;
          }

          .ceo-hero-title span::after {
            height: 13px;
            bottom: 2px;
          }

          .ceo-hero-subhead {
            margin: 0 0 22px;
            font-size: 15px;
            line-height: 1.58;
          }

          .ceo-hero-checklist {
            width: min(100%, 440px);
            margin: 0 auto 28px;
            gap: 9px;
            align-items: stretch;
            text-align: left;
          }

          .ceo-hero-check-item {
            justify-content: flex-start;
            text-align: left;
            font-size: 14px;
          }

          .ceo-hero-actions {
            gap: 12px;
            margin-bottom: 0;
          }

          .ceo-hero-btn-primary,
          .ceo-hero-btn-secondary {
            min-height: 56px;
            padding-inline: 14px;
            font-size: 15px;
          }

          .ceo-hero-metrics {
            gap: clamp(16px, 5vw, 28px);
            padding-top: 18px;
            margin-top: 28px;
            margin-bottom: 0;
          }

          .ceo-metric-label {
            font-size: 11px;
          }

          .ceo-hero-check-icon {
            width: 21px;
            height: 21px;
            background: #fff;
            color: #123d2b;
          }

          .ceo-hero-check-icon svg {
            width: 13px;
            height: 13px;
          }
        }

        /* ── Short mobile screens (≤ 640px AND ≤ 700px tall) ── */
        @media (max-width: 640px) and (max-height: 700px) {
          .ceo-hero-grid {
            padding-top: 18px;
            padding-bottom: calc(16px + env(safe-area-inset-bottom));
          }

          .ceo-hero-left {
            padding-bottom: 5svh;
          }

          .ceo-hero-title {
            margin-bottom: 8px;
            font-size: clamp(36px, 10vw, 44px);
            line-height: 1.12;
          }

          .ceo-hero-subhead {
            margin-bottom: 14px;
            font-size: 14px;
            line-height: 1.45;
          }

          .ceo-hero-checklist {
            margin-bottom: 18px;
            gap: 6px;
          }

          .ceo-hero-check-item {
            font-size: 13px;
          }

          .ceo-hero-btn-primary,
          .ceo-hero-btn-secondary {
            min-height: 50px;
          }

          .ceo-hero-metrics {
            margin-top: 18px;
            padding-top: 14px;
            gap: 14px;
          }
        }

        /* ── Narrow phones (≤ 380px, any height) ── */
        @media (max-width: 380px) {
          .ceo-hero-section {
            padding: 0 16px;
          }

          .ceo-hero-grid {
            padding-top: 20px;
            padding-bottom: calc(18px + env(safe-area-inset-bottom));
          }

          .ceo-hero-title {
            margin-bottom: 10px;
            font-size: clamp(34px, 10.4vw, 40px);
            line-height: 1.12;
          }

          .ceo-hero-subhead {
            margin-bottom: 16px;
            font-size: 13.5px;
            line-height: 1.45;
          }

          .ceo-hero-checklist {
            gap: 7px;
            margin-bottom: 22px;
          }

          .ceo-hero-check-item {
            gap: 8px;
            font-size: 13px;
          }

          .ceo-hero-check-icon {
            width: 19px;
            height: 19px;
          }

          .ceo-hero-actions {
            gap: 10px;
          }

          .ceo-hero-btn-primary,
          .ceo-hero-btn-secondary {
            min-height: 52px;
            padding-inline: 10px;
            font-size: 13.5px;
          }

          .ceo-hero-metrics {
            gap: 12px;
            padding-top: 14px;
            margin-top: 22px;
          }

          .ceo-metric-val {
            font-size: 19px;
          }

          .ceo-metric-label {
            font-size: 10px;
          }
        }

      `}</style>

      <div className="ceo-hero-grid">
        {/* Left Column: Authentic CEO Headline & Scholarship Pitch */}
        <div className="ceo-hero-left">
          <h1 className="ceo-hero-title">
            <span className="ceo-hero-amharic">የነገ ህልምዎን</span>
            <span className="ceo-hero-amharic">ዛሬ ከንጉስ ጋር</span>
          </h1>

          <p className="ceo-hero-subhead">
            <span className="ceo-hero-amharic">ኢትዮጵያውያን ተማሪዎችን ለተለያዩ የኢንተርናሽናል ስኮላርሺፖች ብቁ ማድረግ ዋና አላማችን ነው።</span>
          </p>

          <div className="ceo-hero-checklist">
            <div className="ceo-hero-check-item">
              <span className="ceo-hero-check-icon"><Check width={12} height={12} /></span>
              <span>High School Scholarship (UWC / ALA) Trainings</span>
            </div>
            <div className="ceo-hero-check-item">
              <span className="ceo-hero-check-icon"><Check width={12} height={12} /></span>
              <span>Bachelor&apos;s / University Scholarship Trainings</span>
            </div>
            <div className="ceo-hero-check-item">
              <span className="ceo-hero-check-icon"><Check width={12} height={12} /></span>
              <span>Essay &amp; IELTS Training (Group and 1-on-1)</span>
            </div>
          </div>

          <div className="ceo-hero-actions">
            <button type="button" onClick={scrollToExplore} className="ceo-hero-btn-primary">
              <span>Explore</span>
              <ArrowRight width={16} height={16} />
            </button>
            <Link to="/packages" className="ceo-hero-btn-secondary">
              <span>See Our Packages</span>
              <ArrowUpRight width={15} height={15} />
            </Link>
          </div>

          <div className="ceo-hero-metrics">
            <div className="ceo-metric-item">
              <span className="ceo-metric-val">30,000</span>
              <span className="ceo-metric-label">Audience reached</span>
            </div>
            <div className="ceo-metric-item">
              <span className="ceo-metric-val">180+</span>
              <span className="ceo-metric-label">Trainings delivered</span>
            </div>
            <div className="ceo-metric-item">
              <span className="ceo-metric-val">2+</span>
              <span className="ceo-metric-label">Years of impact</span>
            </div>
          </div>
        </div>

        {/* Right Column: Classroom Teaching Photo with Left-Fadeout Mask */}
        <div className="ceo-hero-right">
          <div className="ceo-hero-image-wrap">
            <img
              src="/hero-teaching.jpg"
              alt="Negus classroom teaching session with Ethiopian scholars"
              className="ceo-hero-img"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
