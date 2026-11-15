import { useState } from "react";
import { NavLink } from "react-router";
import { ArrowRight, BookOpen, Check, Mail } from "lucide-react";
import { toast } from "sonner";
import { SUPPORT_TELEGRAM_URL } from "../../config/supportContact";
import { useCreateContactMessage } from "../../hooks/useContactMessages";
import "../public-pages.css";

const trackOptions = [
  { value: "sat", label: "SAT" },
  { value: "ielts", label: "IELTS" },
  { value: "both", label: "Both" },
];

const formatOptions = [
  { value: "group", label: "Group" },
  { value: "one-to-one", label: "One-to-one" },
  { value: "not-sure", label: "Not sure" },
];

const heroFeatures = [
  "Experienced tutors",
  "Small groups or one-to-one",
  "Focused score strategy",
];

export default function SatIeltsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [track, setTrack] = useState("both");
  const [format, setFormat] = useState("group");
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync: createContactMessage } = useCreateContactMessage();

  const scrollToWaitlist = () => {
    document.getElementById("sat-ielts-waitlist")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
        message: `Interest track: ${track}. Preferred format: ${format}. Phone: ${phone.trim()}`,
      });
      toast.success("You’re on the list. We’ll notify you when SAT & IELTS prep launches.");
      setName("");
      setEmail("");
      setPhone("");
      setTrack("both");
      setFormat("group");
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
    <main className="public-page sat-ielts-page">
      <section className="sat-ielts-intro">
        <div className="sat-ielts-intro-inner">
          <div className="sat-ielts-intro-copy">
            <p className="sat-ielts-eyebrow">
              <BookOpen aria-hidden="true" />
              COMING SOON · SAT &amp; IELTS TRAINING
            </p>
            <h1>
              Your dream university knows your name.
              <em> Let your score speak too.</em>
            </h1>
            <div className="sat-ielts-hero-actions">
              <button
                className="sat-ielts-primary-button"
                type="button"
                onClick={scrollToWaitlist}
              >
                Notify me at launch <ArrowRight aria-hidden="true" />
              </button>
              <NavLink className="sat-ielts-secondary-button" to="/courses">
                Explore courses now
              </NavLink>
            </div>
            <ul className="sat-ielts-feature-list">
              {heroFeatures.map((feature) => (
                <li key={feature}>
                  <Check aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="sat-ielts-score-art">
            <img
              src="/assets/sat-ielts-score-hero.png"
              alt="SAT and IELTS score targets alongside a student: SAT 1500, Reading and Writing 740, Math 760, and IELTS Academic band 8.0"
            />
          </div>
        </div>
      </section>

      <section className="sat-ielts-waitlist" id="sat-ielts-waitlist">
        <div className="sat-ielts-waitlist-texture" aria-hidden="true" />
        <div className="sat-ielts-waitlist-inner">
          <div className="sat-ielts-waitlist-copy">
            <p className="sat-ielts-classes-kicker">CLASSES START SOON</p>
            <h2>Be the first to know when SAT &amp; IELTS classes open.</h2>
            <p>
              We&apos;re putting the finishing touches on focused prep for students
              aiming high. Leave your details and we&apos;ll reach out as soon as
              enrollment begins.
            </p>
            <a
              className="sat-ielts-contact-link"
              href={SUPPORT_TELEGRAM_URL}
              rel="noreferrer"
            >
              Questions? Contact us on Telegram <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="sat-ielts-signup-card">
            <h3>Get notified at launch</h3>
            <form className="sat-ielts-form" onSubmit={onSubmit}>
              <label className="sat-ielts-field">
                <span>FULL NAME</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>

              <div className="sat-ielts-field-row">
                <label className="sat-ielts-field">
                  <span>EMAIL</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@email.com"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="sat-ielts-field">
                  <span>PHONE</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+251…"
                    autoComplete="tel"
                    required
                  />
                </label>
              </div>

              <div className="sat-ielts-option-group">
                <span className="sat-ielts-option-label">I&apos;M INTERESTED IN</span>
                <div className="sat-ielts-option-list" role="group" aria-label="Test interest">
                  {trackOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={track === option.value ? "is-selected" : ""}
                      onClick={() => setTrack(option.value)}
                      aria-pressed={track === option.value}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sat-ielts-option-group">
                <span className="sat-ielts-option-label">PREFERRED FORMAT</span>
                <div className="sat-ielts-option-list" role="group" aria-label="Preferred format">
                  {formatOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={format === option.value ? "is-selected" : ""}
                      onClick={() => setFormat(option.value)}
                      aria-pressed={format === option.value}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <button className="sat-ielts-submit" type="submit" disabled={submitting}>
                <span>{submitting ? "Saving your request…" : "Notify me at launch"}</span>
                <Mail aria-hidden="true" />
              </button>
              <p className="sat-ielts-privacy-note">
                We only use your details to tell you about enrollment.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
