import React from "react";
import {
  Video,
  CheckCircle,
  DollarSign,
  Globe,
  MessageSquare,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router";

const MentorBenefits = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    try {
      localStorage.setItem("post_login_intent", "mentor_apply");
    } catch {
      // storage unavailable – intent is best-effort only
    }
    navigate("/login", { state: { from: "/mentor/apply" } });
  };

  const benefitCards = [
    {
      icon: <DollarSign size={22} />,
      title: "Earn $15/hr+",
      desc: "Start at $15/hour with scalable earning potential.",
    },
    {
      icon: <Globe size={22} />,
      title: "Work Anywhere",
      desc: "Fully online — work from anywhere with just a computer.",
    },
    {
      icon: <TrendingUp size={22} />,
      title: "Scalable Growth",
      desc: "Grow your rates as reviews and ratings improve.",
    },
  ];

  const whyItems = [
    {
      title: "1) Earn From Your Experience",
      body: "Get hourly paid mentoring for guiding students. Start at $15/hour, and your rates can grow as you gain experience.",
    },
    {
      title: "2) Work From Anywhere",
      body: "All mentoring is fully online — all you need is a computer and internet connection.",
    },
    {
      title: "3) Build Your Professional Profile and Network",
      body: "Gain mentoring and leadership experience that strengthens your CV and future opportunities.",
    },
    {
      title: "4) Flexible & Scalable",
      body: "Choose when to work and how many students to mentor. Your earning potential grows with your experience.",
    },
    {
      title: "5) Make Real Impact",
      body: "Your mentorship can guide students to scholarships that change lives.",
    },
  ];

  const priceItems = [
    {
      title: "Starting Rate:",
      body: "All new mentors begin at $15/hour.",
    },
    {
      title: "Hourly Payment:",
      body: "Mentors are paid for each session based on the booked hours.",
    },
    {
      title: "Performance-Based Growth:",
      body: "As your reviews and ratings improve, you can submit a request to increase your hourly rate.",
    },
    {
      title: "Flexible & Scalable:",
      body: "Set your availability, earn at your own pace, and grow your income as you gain experience and positive feedback.",
    },
  ];

  const videoQuestions = [
    "1. Scholarship Type: What type of scholarship did you receive and what did it cover? (Full, Partial, Tuition-only)",
    "2. Application Strength: What were the strongest parts of your application? (Essay, Leadership, Grades, Interview, Test scores)",
    "3. Mentoring Experience: Have you helped anyone apply for scholarships? Describe briefly.",
    "4. Focus Areas: Which areas can you help students with the most? (Essay review, Interview prep, Finding scholarships, Application strategy, CV building)",
    "5. Confidence: How confident are you in your ability to mentor students successfully? (1–5 scale)",
  ];

  const interviewPoints = [
    "Verify your scholarship experience",
    "Learn more about your strengths as a mentor",
    "Understand how you can support students",
    "Explain how the platform works and the next steps",
  ];

  const requirements = [
    {
      title: "Scholarship Experience:",
      body: "Must have received a recognized scholarship (full or partial).",
    },
    {
      title: "Application Knowledge:",
      body: "Understand the scholarship application process and able to guide students.",
    },
    {
      title: "Clear Communication:",
      body: "Able to explain ideas clearly and support students professionally.",
    },
    {
      title: "Verification Required:",
      body: "Provide proof of scholarship. Only verified mentors are accepted.",
    },
  ];

  const steps = [
    "Submit application",
    "Application review",
    "Short video interview (15–25 min) to verify experience and explain next steps",
    "Approval & onboarding",
  ];

  return (
    <div className="min-h-screen bg-[var(--paper)] font-['Outfit'] text-[var(--ink)]">
      <header className="bg-[linear-gradient(135deg,var(--ink),var(--ink-secondary))] pb-28 pt-20 text-center text-[var(--paper)]">
        <div className="mx-auto w-[min(100%-48px,920px)]">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--yellow)] px-4 py-1.5 font-['Lexend'] text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink)]">
            Mentor Program
          </span>
          <h1 className="mt-6 font-['Lexend'] text-4xl font-extrabold leading-[1.35] tracking-tight md:text-5xl md:leading-[1.35]">
            Turn your scholarship experience into real impact — and real income.
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[16.5px] leading-relaxed opacity-90">
            Join our verified network of mentors and guide the next generation
            of scholars.
          </p>
          <button
            onClick={handleApplyClick}
            className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-[var(--yellow)] px-5 font-['Lexend'] text-sm font-bold text-[var(--ink)] transition-opacity hover:opacity-90"
          >
            Apply as a Mentor
          </button>
        </div>
      </header>

      <section className="mx-auto -mt-16 grid w-[min(100%-48px,1160px)] gap-6 md:grid-cols-3">
        {benefitCards.map((card, i) => (
          <div
            key={i}
            className="rounded-[18px] border border-[var(--line)] bg-[var(--white)] p-6 shadow-[var(--shadow-md)]"
          >
            <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center overflow-visible rounded-xl bg-[var(--green-soft)] text-[var(--primary)]">
              {card.icon}
            </div>
            <h3 className="mb-2 font-['Lexend'] text-lg font-bold">
              {card.title}
            </h3>
            <p className="text-[14.5px] leading-relaxed text-[var(--ink-secondary)]">
              {card.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="mx-auto w-[min(100%-48px,1160px)] py-20">
        <h2 className="mb-12 flex items-center justify-center gap-3 text-center font-['Lexend'] text-3xl font-bold">
          <Sparkles size={26} className="shrink-0 text-[var(--gold-ink)]" />
          Why Become a Mentor?
        </h2>

        <div className="mx-auto grid max-w-[880px] gap-6 sm:grid-cols-2">
          {whyItems.map((item, i) => (
            <div
              key={i}
              className={
                "rounded-[18px] border border-[var(--line)] bg-[var(--white)] p-6 shadow-[var(--shadow-sm)]" +
                (i === whyItems.length - 1 && whyItems.length % 2 === 1
                  ? " sm:col-span-2"
                  : "")
              }
            >
              <h3 className="mb-2 font-['Lexend'] text-[15px] font-bold">
                {item.title}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--ink-secondary)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--green-soft)] py-20">
        <div className="mx-auto w-[min(100%-48px,1160px)]">
          <div className="rounded-[18px] border border-[var(--line)] bg-[var(--white)] p-6 shadow-[var(--shadow-sm)] md:p-8">
            <h2 className="mb-8 font-['Lexend'] text-3xl font-bold">
              Price Setting Description
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {priceItems.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle
                    size={20}
                    className="mt-1 shrink-0 text-[var(--primary)]"
                  />
                  <p className="text-[14.5px] leading-relaxed text-[var(--ink-secondary)]">
                    <strong className="font-['Lexend'] text-[15px] font-bold text-[var(--ink)]">
                      {item.title}
                    </strong>{" "}
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-48px,1160px)] py-20">
        <h2 className="mb-10 text-center font-['Lexend'] text-3xl font-bold">
          Application Work Items
        </h2>
        <div className="grid items-start gap-6 md:grid-cols-2">
          <div className="rounded-[18px] border border-[var(--line)] bg-[var(--white)] p-6 shadow-[var(--shadow-sm)] md:p-7">
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--yellow)] font-['Lexend'] text-[15px] font-bold text-[var(--ink)]">
                1
              </span>
              <h3 className="flex items-center gap-2 font-['Lexend'] text-xl font-bold leading-snug">
                <Video size={20} className="shrink-0 text-[var(--primary)]" />
                Mentor Expertise Questions (Video Submission)
              </h3>
            </div>

            <p className="mb-5 text-[14.5px] leading-relaxed text-[var(--ink-secondary)]">
              Please submit a{" "}
              <strong className="text-[var(--ink)]">2–5 minute video</strong>{" "}
              answering the following:
            </p>

            <ol className="space-y-3 text-[14.5px] leading-relaxed text-[var(--ink-secondary)]">
              {videoQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>

            <div className="mt-6 rounded-[10px] border-l-4 border-[var(--primary)] bg-[var(--yellow-soft)] px-4 py-3 text-[13.5px] italic leading-relaxed text-[var(--ink)]">
              Tips: Camera quality doesn’t matter. Speak clearly, stay
              confident, and answer all questions.
            </div>
          </div>

          <div className="rounded-[18px] border border-[var(--line)] bg-[var(--white)] p-6 shadow-[var(--shadow-sm)] md:p-7">
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--yellow)] font-['Lexend'] text-[15px] font-bold text-[var(--ink)]">
                2
              </span>
              <h3 className="flex items-center gap-2 font-['Lexend'] text-xl font-bold leading-snug">
                <MessageSquare
                  size={20}
                  className="shrink-0 text-[var(--primary)]"
                />
                Video Interview Section - Description
              </h3>
            </div>

            <div className="space-y-4 text-[14.5px] leading-relaxed text-[var(--ink-secondary)]">
              <p>
                Thank you for applying to become a mentor on our platform.
              </p>
              <p>
                As part of the selection process, we will schedule a short
                video interview with you after careful review of your
                application. This meeting helps us:
              </p>
              <ul className="list-disc space-y-2 pl-5 marker:text-[var(--primary)]">
                {interviewPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <p>
                The interview will take approximately 15–25 minutes and will be
                conducted online.
              </p>
              <p>
                Please select the times when you are most available so we can
                schedule your interview.
              </p>
              <p>We will contact you to confirm the exact date and time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-48px,1160px)] pb-20">
        <h2 className="mb-10 font-['Lexend'] text-3xl font-bold">
          Mentor Requirements
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {requirements.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-[18px] border border-[var(--line)] bg-[var(--white)] p-6 shadow-[var(--shadow-sm)]"
            >
              <CheckCircle
                size={20}
                className="mt-1 shrink-0 text-[var(--primary)]"
              />
              <p className="text-[14.5px] leading-relaxed text-[var(--ink-secondary)]">
                <strong className="font-['Lexend'] text-[15px] font-bold text-[var(--ink)]">
                  {item.title}
                </strong>{" "}
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--white)] py-20">
        <div className="mx-auto w-[min(100%-48px,1160px)]">
          <h2 className="mb-8 font-['Lexend'] text-3xl font-bold">
            Selection Process
          </h2>
          <ol className="list-decimal space-y-3 pl-6 text-[14.5px] leading-relaxed text-[var(--ink-secondary)] marker:font-['Lexend'] marker:font-bold marker:text-[var(--primary)]">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-48px,1160px)] py-24 text-center">
        <h2 className="mb-4 font-['Lexend'] text-3xl font-bold">
          Become a Mentor Today
        </h2>
        <p className="mx-auto mb-10 max-w-[560px] text-[15px] leading-relaxed text-[var(--ink-secondary)]">
          Help students succeed while earning from your experience. Apply now
          to join our verified mentor network.
        </p>
        <button
          onClick={handleApplyClick}
          className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-[var(--ink)] px-5 font-['Lexend'] text-sm font-bold text-[var(--paper)] transition-colors hover:bg-[var(--primary)]"
        >
          Apply as a Mentor
        </button>
      </section>
    </div>
  );
};

export default MentorBenefits;
