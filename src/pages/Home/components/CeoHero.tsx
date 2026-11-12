import React from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Check, Spark } from "../icons";

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
          --hero-english: "Outfit", sans-serif;
          --hero-amharic: "Menbere", sans-serif;
          position: relative;
          width: 100%;
          min-height: min(820px, calc(100svh - 74px));
          display: flex;
          align-items: center;
          padding: clamp(38px, 5vw, 72px) 0 clamp(42px, 5vw, 76px) clamp(20px, 4vw, 56px);
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

        .ceo-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: color-mix(in srgb, var(--green-soft) 80%, transparent);
          border: 1px solid rgba(18, 61, 43, 0.15);
          border-radius: 9999px;
          font-family: var(--hero-english);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #123d2b;
          margin-bottom: 20px;
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
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 36px;
          justify-content: center;
        }

        .ceo-hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 52px;
          padding: 0 28px;
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
          gap: 8px;
          min-height: 52px;
          padding: 0 26px;
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
            padding: clamp(72px, 15vw, 112px) 22px 220px;
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

          .ceo-hero-eyebrow {
            color: #f0dfab;
            background: rgba(255, 255, 255, 0.09);
            border-color: rgba(240, 223, 171, 0.45);
            backdrop-filter: blur(12px);
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

        @media (max-width: 640px) {
          .ceo-hero-section {
            min-height: auto;
            padding: 52px 18px 98px;
          }

          .ceo-hero-eyebrow {
            margin-bottom: 16px;
            padding: 5px 11px;
            font-size: 10px;
          }

          .ceo-hero-title {
            margin-bottom: 16px;
            font-size: clamp(36px, 9.5vw, 46px);
            line-height: 1.08;
          }

          .ceo-hero-subhead {
            margin-bottom: 20px;
            font-size: 15px;
            line-height: 1.52;
          }

          .ceo-hero-checklist {
            gap: 8px;
            margin-bottom: 22px;
          }

          .ceo-hero-check-item {
            font-size: 12.5px;
          }

          .ceo-hero-actions {
            gap: 10px;
            margin-bottom: 22px;
          }

          .ceo-hero-btn-primary,
          .ceo-hero-btn-secondary {
            min-height: 48px;
            padding-inline: 20px;
            font-size: 14px;
          }

          .ceo-hero-metrics {
            gap: 10px;
            padding-top: 18px;
          }

          .ceo-metric-label {
            font-size: 10.5px;
          }
        }

      `}</style>

      <div className="ceo-hero-grid">
        {/* Left Column: Authentic CEO Headline & Scholarship Pitch */}
        <div className="ceo-hero-left">
          <div className="ceo-hero-eyebrow">
            <Spark width={14} height={14} />
            <span>Negus Admissions & Scholarship Consultants</span>
          </div>

          <h1 className="ceo-hero-title">
            <span className="ceo-hero-amharic">የነገ ህልሞን</span>
            <span className="ceo-hero-amharic">ዛሬ ከንጉስ ጋር</span>
          </h1>

          <p className="ceo-hero-subhead">
            <span className="ceo-hero-amharic">ኢትዮጵያውያን ተማሪዎችን ለተለያዩ የኢንተርናሽናል ስኮላርሺፕ ብቁ ማድረግ ዋና አላማችን ነው።</span>
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
              <span>Explore / ጀምር</span>
              <ArrowRight width={16} height={16} />
            </button>
            <Link to="/packages" className="ceo-hero-btn-secondary">
              <span>See Our Packages / ፓኬጆች</span>
              <ArrowUpRight width={15} height={15} />
            </Link>
          </div>

          <div className="ceo-hero-metrics">
            <div className="ceo-metric-item">
              <span className="ceo-metric-val">$12.8M+</span>
              <span className="ceo-metric-label">Scholarships Won</span>
            </div>
            <div className="ceo-metric-item">
              <span className="ceo-metric-val">450+</span>
              <span className="ceo-metric-label">Scholars Placed</span>
            </div>
            <div className="ceo-metric-item">
              <span className="ceo-metric-val">10+ Yrs</span>
              <span className="ceo-metric-label">Design-led guidance</span>
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
