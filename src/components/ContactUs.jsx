import React, { useState } from "react";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { apiUrl } from "../lib/axiosInstance";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(apiUrl("/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--paper)] text-[var(--ink)] py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--ink-muted)] uppercase tracking-widest font-['Lexend']">
            <MessageCircle className="w-4 h-4 text-[var(--yellow)]" /> Direct Inquiries
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold font-['Lexend'] tracking-tight text-[var(--ink)]">
            Let’s talk about your application.
          </h2>
          <p className="text-base text-[var(--ink-secondary)] leading-relaxed max-w-lg">
            Have questions about scholarships, deadlines, essay coaching, or
            mentorship? Reach out directly and an advisor will respond promptly.
          </p>

          <div className="space-y-4 pt-4">
            <a
              href="mailto:contact@negusconsultants.com"
              className="flex items-center gap-4 p-4 rounded-xl border border-[var(--line)] bg-[var(--white)] hover:border-[var(--green)] transition-colors group"
            >
              <div className="w-12 h-12 bg-[var(--green-soft)] rounded-xl flex items-center justify-center text-[var(--ink)] group-hover:bg-[var(--yellow)] transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-[var(--ink)] font-['Lexend']">
                  Email the Team
                </div>
                <div className="text-xs text-[var(--ink-muted)]">
                  contact@negusconsultants.com
                </div>
              </div>
            </a>

            <a
              href="tel:+251964730248"
              className="flex items-center gap-4 p-4 rounded-xl border border-[var(--line)] bg-[var(--white)] hover:border-[var(--green)] transition-colors group"
            >
              <div className="w-12 h-12 bg-[var(--green-soft)] rounded-xl flex items-center justify-center text-[var(--ink)] group-hover:bg-[var(--yellow)] transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-[var(--ink)] font-['Lexend']">
                  Call Primary
                </div>
                <div className="text-xs text-[var(--ink-muted)]">
                  +251 964 730 248
                </div>
              </div>
            </a>

            <a
              href="tel:+251943041418"
              className="flex items-center gap-4 p-4 rounded-xl border border-[var(--line)] bg-[var(--white)] hover:border-[var(--green)] transition-colors group"
            >
              <div className="w-12 h-12 bg-[var(--green-soft)] rounded-xl flex items-center justify-center text-[var(--ink)] group-hover:bg-[var(--yellow)] transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-[var(--ink)] font-['Lexend']">
                  Call Alternative
                </div>
                <div className="text-xs text-[var(--ink-muted)]">
                  +251 943 041 418
                </div>
              </div>
            </a>

            <a
              href="https://t.me/negushelpcenter"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-[var(--line)] bg-[var(--white)] hover:border-[var(--green)] transition-colors group"
            >
              <div className="w-12 h-12 bg-[var(--green-soft)] rounded-xl flex items-center justify-center text-[var(--ink)] group-hover:bg-[var(--yellow)] transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-[var(--ink)] font-['Lexend']">
                  Telegram Help Center
                </div>
                <div className="text-xs text-[var(--ink-muted)]">
                  @negushelpcenter
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="bg-[var(--white)] border border-[var(--line)] rounded-2xl p-8 shadow-sm">
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="text-sm text-red-700 dark:text-red-400 font-medium">
                {error}
              </span>
            </div>
          )}

          {isSubmitted && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/40 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-green-700 dark:text-green-400 font-medium">
                Thank you! Your message was received. We’ll get in touch shortly.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--ink-muted)] uppercase tracking-wider mb-1.5 font-['Lexend']">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Abebe Bekele"
                className="w-full px-4 py-3 rounded-xl bg-[var(--paper)] border border-[var(--line-strong)] text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:border-[var(--ink)] transition-colors text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--ink-muted)] uppercase tracking-wider mb-1.5 font-['Lexend']">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="abebe@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[var(--paper)] border border-[var(--line-strong)] text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:border-[var(--ink)] transition-colors text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--ink-muted)] uppercase tracking-wider mb-1.5 font-['Lexend']">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Question about SAT prep or scholarship package"
                className="w-full px-4 py-3 rounded-xl bg-[var(--paper)] border border-[var(--line-strong)] text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:border-[var(--ink)] transition-colors text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--ink-muted)] uppercase tracking-wider mb-1.5 font-['Lexend']">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us what degree you're aiming for and where you are in your application process…"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-[var(--paper)] border border-[var(--line-strong)] text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:border-[var(--ink)] transition-colors text-sm resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="public-button public-button-primary w-full justify-center"
            >
              {isSubmitting ? (
                <span>Sending Message…</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
