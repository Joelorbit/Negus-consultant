import React, { useState } from "react";
import { Link } from "react-router";
import { FileUser, FileVideo2 } from "lucide-react";
import { ArrowRight, ArrowUpRight, Check, Spark, Award, FileText } from "../icons";

const SAMPLE_ESSAYS = [
  {
    university: "Harvard University",
    prompt: "Common App Personal Statement — Overcoming Educational Barriers in Ethiopia",
    wordCount: "648 Words",
    excerpt: "Walking past the dusty library shelves in Addis Ababa, I realized that true education is not merely receiving facts, but constructing solutions...",
  },
  {
    university: "Amherst College",
    prompt: "Supplemental Essay — Intellectual Curiosity & Physics Research",
    wordCount: "520 Words",
    excerpt: "When the regional lab lacked modern optical sensors, my peers and I assembled lenses from discarded overhead projectors to measure light refraction...",
  },
  {
    university: "Williams College",
    prompt: "Why Williams & Impacting the Future of East African Tech",
    wordCount: "480 Words",
    excerpt: "At Williams, the Oxford-style tutorial system will allow me to challenge assumptions, debate mathematical modeling, and prepare for leadership...",
  },
  {
    university: "New York University (NYU Abu Dhabi)",
    prompt: "Full Need-Based Aid Statement & Global Citizenship",
    wordCount: "590 Words",
    excerpt: "Growing up in a multilingual home taught me that translation is more than words—it is empathy. NYU's international community matches my ambition...",
  },
];

export default function CeoFreeToolsSection() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [selectedEssay, setSelectedEssay] = useState<typeof SAMPLE_ESSAYS[0] | null>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setUnlocked(true);
    }
  };

  return (
    <section className="ceo-free-tools-section" id="free-tools-home">
      <style>{`
        .ceo-free-tools-section {
          position: relative;
          width: 100%;
          padding: clamp(56px, 7vw, 96px) clamp(20px, 4vw, 56px);
          max-width: 1440px;
          margin: 0 auto;
          background: color-mix(in srgb, var(--green-subtle) 50%, var(--paper));
          border-radius: 36px;
          border: 1px solid rgba(18, 61, 43, 0.12);
        }

        .ceo-tools-head {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 40px;
        }

        .ceo-tools-eyebrow {
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
          margin-bottom: 12px;
        }

        .ceo-tools-title {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: clamp(28px, 3.4vw, 42px);
          font-weight: 900;
          color: #123d2b;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
        }

        .ceo-tools-subhead {
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: clamp(15px, 1.2vw, 17px);
          color: #56745f;
          line-height: 1.6;
        }

        /* Lead Capture Gate Banner */
        .ceo-lead-gate-card {
          max-width: 760px;
          margin: 0 auto 52px;
          background: #ffffff;
          border: 1.5px solid rgba(18, 61, 43, 0.16);
          border-radius: 24px;
          padding: clamp(24px, 3vw, 36px);
          box-shadow: 0 12px 36px rgba(18, 61, 43, 0.08);
          text-align: center;
        }

        .ceo-lead-form {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 18px;
          flex-wrap: wrap;
        }

        .ceo-lead-input {
          flex: 1;
          min-width: 200px;
          height: 48px;
          padding: 0 18px;
          border-radius: 12px;
          border: 1.5px solid rgba(18, 61, 43, 0.2);
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 14px;
          color: #123d2b;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .ceo-lead-input:focus {
          border-color: #123d2b;
        }

        .ceo-lead-btn {
          height: 48px;
          padding: 0 26px;
          border-radius: 12px;
          background: #123d2b;
          color: #ffffff;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 14px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(18, 61, 43, 0.2);
        }

        .ceo-lead-btn:hover {
          background: #19523b;
          transform: translateY(-1px);
        }

        /* 4 Resources Grid */
        .ceo-tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: 24px;
        }

        .ceo-resource-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1.5px solid rgba(18, 61, 43, 0.12);
          padding: 24px;
          box-shadow: 0 8px 24px rgba(18, 61, 43, 0.04);
          transition: transform 0.2s ease, border-color 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .ceo-resource-card:hover {
          transform: translateY(-3px);
          border-color: #123d2b;
        }

        .ceo-resource-badge {
          display: inline-block;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 11px;
          font-weight: 700;
          color: #123d2b;
          background: var(--green-subtle);
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 12px;
        }

        .ceo-resource-card h3 {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 19px;
          font-weight: 800;
          color: #123d2b;
          margin: 0 0 8px;
        }

        .ceo-resource-icon {
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          margin-bottom: 14px;
          border: 1px solid rgba(18, 61, 43, 0.12);
          border-radius: 14px;
          background: var(--green-subtle);
          color: #123d2b;
        }

        .ceo-resource-icon svg {
          width: 22px;
          height: 22px;
        }

        .ceo-resource-card p {
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 13.5px;
          line-height: 1.55;
          color: #56745f;
          margin: 0 0 18px;
        }

        .ceo-resource-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 13px;
          font-weight: 700;
          color: #123d2b;
          text-decoration: none;
          cursor: pointer;
        }

        .ceo-resource-action:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="ceo-tools-head">
        <div className="ceo-tools-eyebrow">
          <Spark width={12} height={12} />
          <span>FREE RESOURCES & LEAD GENERATION</span>
        </div>
        <h2 className="ceo-tools-title">Scholarship Tools & Resources</h2>
        <p className="ceo-tools-subhead">
          Access past video trainings, proven Common App essays, and resume builders to jumpstart your international applications.
        </p>
      </div>

      {/* Lead Capture Gate */}
      <div className="ceo-lead-gate-card">
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, color: "#123d2b", margin: "0 0 6px" }}>
          {unlocked ? "🎉 Resources Unlocked! Browse below." : "Enter your email or phone to unlock full access:"}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#56745f", margin: 0 }}>
          {unlocked ? "You can now read full sample essays and watch workshop archives." : "Get instant access to 7+ YouTube video recordings, sample essays, and our CV template."}
        </p>

        {!unlocked && (
          <form onSubmit={handleUnlock} className="ceo-lead-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="ceo-lead-input"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone / Telegram (optional)"
              className="ceo-lead-input"
            />
            <button type="submit" className="ceo-lead-btn">
              Unlock All Tools
            </button>
          </form>
        )}
      </div>

      {/* 4 Core Resources from CEO Brief */}
      <div className="ceo-tools-grid">
        {/* Resource 1: YouTube Recordings Archive */}
        <div className="ceo-resource-card">
          <div>
            <span className="ceo-resource-icon"><FileVideo2 aria-hidden="true" /></span>
            <span className="ceo-resource-badge">VIDEO ARCHIVE</span>
            <h3>Past Online Trainings</h3>
            <p>
              7–10 recorded sessions covering digital SAT math pacing, Common App activity lists, and CSS Profile tax forms.
            </p>
          </div>
          <Link to="/free-tools" className="ceo-resource-action">
            <span>Browse Free Tools &amp; Recordings</span>
            <ArrowRight width={14} height={14} />
          </Link>
        </div>

        {/* Resource 2: Sample Worked Essays */}
        <div className="ceo-resource-card">
          <div>
            <span className="ceo-resource-badge">PROVEN ESSAYS</span>
            <h3>Accepted Student Essays</h3>
            <p>
              Inspect essays that helped Ethiopian scholars win full rides at Harvard, Amherst, Williams, and NYU.
            </p>
          </div>
          <Link to="/free-tools" className="ceo-resource-action">
            <span>Read Sample Essays ({SAMPLE_ESSAYS.length})</span>
            <ArrowRight width={14} height={14} />
          </Link>
        </div>

        {/* Resource 3: CV Builder */}
        <div className="ceo-resource-card">
          <div>
            <span className="ceo-resource-icon"><FileUser aria-hidden="true" /></span>
            <span className="ceo-resource-badge">CAREER & ADMISSIONS</span>
            <h3>Academic CV & Resume Builder</h3>
            <p>
              Build an American-standard 1-page academic resume formatted for Common App admissions committees and scholarships.
            </p>
          </div>
          <Link to="/free-tools" className="ceo-resource-action">
            <span>Open Free Tools / CV Builder</span>
            <ArrowRight width={14} height={14} />
          </Link>
        </div>

        {/* Resource 4: Admissions Blogs & Guides */}
        <div className="ceo-resource-card">
          <div>
            <span className="ceo-resource-badge">EXPERT JOURNAL</span>
            <h3>Scholarship Guides & Strategy</h3>
            <p>
              In-depth articles written by our senior consultants on standardized testing dates, visa questions, and financial aid.
            </p>
          </div>
          <Link to="/blogs" className="ceo-resource-action">
            <span>Browse All Blogs</span>
            <ArrowRight width={14} height={14} />
          </Link>
        </div>
      </div>

      {/* Sample Essay Modal */}
      {selectedEssay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedEssay(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#fffdf6] rounded-3xl p-7 md:p-8 border border-[#123d2b]/20 shadow-2xl max-h-[85vh] overflow-y-auto text-[#123d2b]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#123d2b]/10 mb-4">
              <span className="px-3 py-1 bg-[#123d2b] text-[#d1bd82] rounded-full text-xs font-bold uppercase">
                {selectedEssay.university}
              </span>
              <button
                type="button"
                onClick={() => setSelectedEssay(null)}
                className="text-xs font-bold text-[#56745f] hover:text-[#123d2b]"
              >
                ✕ Close
              </button>
            </div>
            <h4 className="font-display font-bold text-lg text-[#123d2b] mb-1">
              {selectedEssay.prompt}
            </h4>
            <span className="text-xs text-[#56745f] block mb-4">
              {selectedEssay.wordCount} · Verified Admit File
            </span>
            <div className="p-4 bg-white rounded-xl border border-[#123d2b]/10 text-sm leading-relaxed text-[#204533] mb-5">
              "{selectedEssay.excerpt}"
            </div>
            <div className="flex gap-2">
              {SAMPLE_ESSAYS.map((essay) => (
                <button
                  key={essay.university}
                  type="button"
                  onClick={() => setSelectedEssay(essay)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedEssay.university === essay.university
                      ? "bg-[#123d2b] text-white"
                      : "bg-white border border-[#123d2b]/15 text-[#123d2b]"
                  }`}
                >
                  {essay.university}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
