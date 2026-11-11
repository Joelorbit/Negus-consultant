import { useState } from "react";
import { NavLink } from "react-router";
import { ArrowRight, BookStack, Mail, Phone } from "iconoir-react";
import { toast } from "sonner";
import { SUPPORT_TELEGRAM_URL } from "../../config/supportContact";
import { useCreateContactMessage } from "../../hooks/useContactMessages";
import "../public-pages.css";

export default function SatIeltsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [track, setTrack] = useState("both");
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync: createContactMessage } = useCreateContactMessage();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please share your name, email, and phone so we can notify you.");
      return;
    }
    setSubmitting(true);
    try {
      await createContactMessage({
        name: name.trim(),
        email: email.trim(),
        subject: "SAT and IELTS launch notification",
        message: `Interest track: ${track}. Phone: ${phone.trim()}`,
      });
      toast.success("You’re on the list. We’ll notify you when SAT & IELTS prep launches.");
      setName("");
      setEmail("");
      setPhone("");
      setTrack("both");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "We could not save your request right now. Please try again.",
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
            <BookStack aria-hidden="true" /> SAT & IELTS PREPARATION
          </p>
          <h1 className="public-page-title">
            Digital SAT & Academic IELTS prep is <em>coming soon.</em>
          </h1>
          <p className="public-page-copy">
            We’re building a dedicated track for Digital SAT 1500+ and IELTS Band 8.0+ with drills,
            timed practice, and mentor feedback. Leave your details and we’ll notify you at launch.
          </p>
        </div>
      </section>

      <section className="public-content" style={{ maxWidth: "720px" }}>
        <div className="public-empty-state" style={{ justifyItems: "stretch" }}>
          <p className="public-eyebrow" style={{ justifyContent: "flex-start", marginBottom: 0 }}>
            NOTIFY ME
          </p>
          <h3>Get launch access before the open enrollment wave.</h3>
          <p>
            Share a reachable email and phone. We’ll message you when enrollment opens — and you can
            still use our courses, trainings, and free tools in the meantime.
          </p>

          <form onSubmit={onSubmit} style={{ display: "grid", gap: "14px", marginTop: "8px" }}>
            <label style={{ display: "grid", gap: "6px" }}>
              <span style={{ font: "700 12px var(--font-display)", color: "var(--ink-muted)", letterSpacing: "0.06em" }}>
                FULL NAME
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="public-course-search"
                style={{ width: "100%", minHeight: "48px", padding: "0 14px" }}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label style={{ display: "grid", gap: "6px" }}>
              <span style={{ font: "700 12px var(--font-display)", color: "var(--ink-muted)", letterSpacing: "0.06em" }}>
                EMAIL
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "48px",
                  border: "1px solid var(--line-strong)",
                  borderRadius: "9px",
                  padding: "0 14px",
                  background: "var(--white)",
                  color: "var(--ink)",
                  font: "14px var(--font-body)",
                }}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </label>
            <label style={{ display: "grid", gap: "6px" }}>
              <span style={{ font: "700 12px var(--font-display)", color: "var(--ink-muted)", letterSpacing: "0.06em" }}>
                PHONE
              </span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "48px",
                  border: "1px solid var(--line-strong)",
                  borderRadius: "9px",
                  padding: "0 14px",
                  background: "var(--white)",
                  color: "var(--ink)",
                  font: "14px var(--font-body)",
                }}
                placeholder="+251…"
                autoComplete="tel"
              />
            </label>
            <label style={{ display: "grid", gap: "6px" }}>
              <span style={{ font: "700 12px var(--font-display)", color: "var(--ink-muted)", letterSpacing: "0.06em" }}>
                INTEREST
              </span>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "48px",
                  border: "1px solid var(--line-strong)",
                  borderRadius: "9px",
                  padding: "0 14px",
                  background: "var(--white)",
                  color: "var(--ink)",
                  font: "14px var(--font-body)",
                }}
              >
                <option value="sat">Digital SAT</option>
                <option value="ielts">Academic IELTS</option>
                <option value="both">Both SAT & IELTS</option>
              </select>
            </label>
            <button
              type="submit"
              className="public-button public-button-primary"
              disabled={submitting}
              style={{ justifyContent: "center" }}
            >
              {submitting ? "Saving…" : "Notify me at launch"}
              {!submitting && <Mail aria-hidden="true" />}
            </button>
          </form>
        </div>

        <div className="public-page-actions" style={{ justifyContent: "center", marginTop: "28px" }}>
          <NavLink className="public-button public-button-secondary" to="/courses">
            Explore courses now <ArrowRight aria-hidden="true" />
          </NavLink>
          <a
            className="public-button public-button-secondary"
            href={SUPPORT_TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            <Phone aria-hidden="true" /> Free call
          </a>
        </div>
      </section>
    </main>
  );
}
