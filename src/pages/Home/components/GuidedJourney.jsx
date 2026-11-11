import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const ROUTES = [
  {
    id: "explore",
    label: "I am just exploring",
    title: "Start with free guidance",
    description: "Watch training videos, read practical advice, and understand the scholarship process before committing.",
    commitment: "Free to explore",
    to: "/free-tools",
    action: "Explore free tools",
  },
  {
    id: "learn",
    label: "I want to learn step by step",
    title: "Build your scholarship skills",
    description: "Follow structured courses at your own pace, then return to your profile to track access and progress.",
    commitment: "Self-paced learning",
    to: "/courses",
    action: "Browse courses",
  },
  {
    id: "mentor",
    label: "I need a mentor",
    title: "Get focused human guidance",
    description: "Meet mentors, compare support options, and choose the level of accountability that fits your situation.",
    commitment: "Mentor-led support",
    to: "/mentors",
    action: "Meet mentors",
  },
  {
    id: "apply",
    label: "I want full application support",
    title: "Move from plan to submission",
    description: "Choose an application package with clear milestones, payment steps, and support through your application journey.",
    commitment: "Milestone-based packages",
    to: "/packages",
    action: "Compare packages",
  },
];

export default function GuidedJourney() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = ROUTES.find((route) => route.id === selectedId);

  return (
    <section
      aria-labelledby="guided-journey-title"
      style={{
        padding: "var(--section-y) var(--gutter)",
        background: "var(--green-subtle)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        color: "var(--ink)",
      }}
    >
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ maxWidth: "720px", marginBottom: "28px" }}>
          <p className="eyebrow-tag" style={{ color: "var(--gold-ink)", marginBottom: "12px" }}>
            YOUR NEXT STEP
          </p>
          <h2
            id="guided-journey-title"
            style={{
              margin: 0,
              color: "var(--ink)",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
            }}
          >
            Tell us what you need. We’ll show you where to begin.
          </h2>
          <p style={{ margin: "14px 0 0", color: "var(--ink-secondary)", fontSize: "16px", lineHeight: 1.65 }}>
            You can start free. Create an account only when you are ready to apply, buy a package, or save your progress.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
          }}
        >
          {ROUTES.map((route) => {
            const active = selectedId === route.id;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => setSelectedId(route.id)}
                aria-pressed={active}
                style={{
                  minHeight: "112px",
                  padding: "20px",
                  borderRadius: "var(--radius-md)",
                  border: `1px solid ${active ? "var(--yellow)" : "var(--line)"}`,
                  background: active ? "var(--yellow-soft)" : "var(--paper)",
                  color: "var(--ink)",
                  textAlign: "left",
                  cursor: "pointer",
                  font: "800 16px/1.3 var(--font-display)",
                  letterSpacing: "-0.02em",
                  boxShadow: active ? "var(--shadow-card)" : "var(--shadow-sm)",
                  transform: active ? "translateY(-2px)" : "none",
                  transition: "transform .2s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease",
                }}
              >
                {active && <CheckCircle2 size={16} aria-hidden="true" style={{ float: "right" }} />}
                <span>{route.label}</span>
              </button>
            );
          })}
        </div>

        {selected && (
          <div
            style={{
              marginTop: "18px",
              padding: "24px",
              borderRadius: "var(--radius-lg)",
              background: "var(--paper)",
              color: "var(--ink)",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: "20px",
              alignItems: "center",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div>
              <p style={{ margin: 0, color: "var(--gold-ink)", font: "800 11px/1.2 var(--font-display)", letterSpacing: ".08em", textTransform: "uppercase" }}>
                Recommended starting point
              </p>
              <h3 style={{ margin: "8px 0 6px", font: "800 22px/1.25 var(--font-display)" }}>{selected.title}</h3>
              <p style={{ margin: 0, color: "var(--ink-secondary)", lineHeight: 1.6 }}>{selected.description}</p>
              <span style={{ display: "inline-block", marginTop: "12px", color: "var(--green)", font: "700 13px var(--font-display)" }}>
                {selected.commitment}
              </span>
            </div>
            <Link
              to={selected.to}
              className="btn-dark-hero"
              style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              {selected.action} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
