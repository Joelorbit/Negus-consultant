import { useState } from "react";
import { Plus, Minus, HelpCircle } from "iconoir-react";

export const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What does Negus Consultants do?",
      answer:
        "Negus Consultants helps students plan university applications, improve essays, find scholarship and financial-aid options, prepare for standardized tests, and receive mentorship through important application milestones.",
    },
    {
      question: "Where is your office located?",
      answer:
        "Negus Consultants works with students online globally and offers in-person learning options in Addis Ababa, Ethiopia. Contact the team to confirm the format available for your specific track.",
    },
    {
      question: "Why should we trust Negus and how can we be sure?",
      answer:
        "We have a proven, documented track record of guiding students successfully to leading universities worldwide with significant scholarship awards. We operate with full transparency and provide genuine student testimonials and admit profiles.",
    },
    {
      question: "Is it possible to pay after receiving a service?",
      answer:
        "To ensure dedicated advisor time and high-quality one-on-one preparation, payment is confirmed prior to service delivery. Flexible milestone installments are available on comprehensive application packages.",
    },
    {
      question: "What is your success rate?",
      answer:
        "Our students have earned admissions and full-tuition awards from top institutions including Georgetown, Williams College, Drexel, Hult, and Howard. We focus on matching each student with the best-fit scholarship strategy.",
    },
    {
      question: "How long does the application process take?",
      answer:
        "The timeline depends on the chosen service. Focused essay reviews take 1–2 weeks, while end-to-end application and scholarship roadmaps typically run across 3–9 months ahead of university deadlines.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="negus-faq-wrap">
      <style>{`
        .negus-faq-wrap {
          max-width: 820px;
          margin: 0 auto;
          width: 100%;
        }

        .negus-faq-head {
          text-align: center;
          margin-bottom: 40px;
        }

        .negus-faq-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--gold-ink);
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .negus-faq-title {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--ink);
          margin: 0 0 10px;
          line-height: 1.15;
        }

        .negus-faq-subtitle {
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 15px;
          color: var(--ink-muted);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .negus-faq-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--line);
        }

        .negus-faq-row {
          border-bottom: 1px solid var(--line);
          transition: background-color 0.2s ease;
        }

        .negus-faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 22px 4px;
          background: transparent;
          border: 0;
          text-align: left;
          cursor: pointer;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.015em;
          color: var(--ink);
          transition: color 0.2s ease;
        }

        .negus-faq-question:hover {
          color: var(--yellow);
        }

        .negus-faq-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--ink-secondary);
          transition: transform 0.25s var(--ease-spring, cubic-bezier(0.16, 1, 0.3, 1)),
                      border-color 0.2s ease,
                      color 0.2s ease;
        }

        .negus-faq-question:hover .negus-faq-icon {
          border-color: var(--green);
          color: var(--ink);
        }

        .negus-faq-answer {
          overflow: hidden;
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--ink-secondary);
          padding: 0 4px 22px;
          animation: faqFadeIn 0.25s ease-out;
        }

        @keyframes faqFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="negus-faq-head">
        <div className="negus-faq-eyebrow">
          <HelpCircle width={16} height={16} /> Clear Answers
        </div>
        <h2 className="negus-faq-title">Frequently Asked Questions</h2>
        <p className="negus-faq-subtitle">
          Everything you need to know about our packages, mentorship tracks, and
          how we support applicants.
        </p>
      </div>

      <div className="negus-faq-list" role="region" aria-label="FAQ questions">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div className="negus-faq-row" key={faq.question}>
              <button
                type="button"
                className="negus-faq-question"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span className="negus-faq-icon" aria-hidden="true">
                  {isOpen ? (
                    <Minus width={15} height={15} />
                  ) : (
                    <Plus width={15} height={15} />
                  )}
                </span>
              </button>
              {isOpen && (
                <div className="negus-faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
