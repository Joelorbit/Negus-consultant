import { Sparkles, Target, Shield, Heart, Zap } from "lucide-react";

export default function AboutMethodology() {
  const pillars = [
    {
      icon: Target,
      title: "Our Mission",
      desc: "To empower ambitious Ethiopian students with the strategic knowledge, tools, and direct scholar guidance needed to secure life-changing international scholarships.",
      badge: "Purpose",
    },
    {
      icon: Shield,
      title: "Integrity & Truth",
      desc: "We operate with absolute transparency. We believe in candid profile evaluations, realistic institution roadmaps, and honest advisory relationships.",
      badge: "Standard",
    },
    {
      icon: Heart,
      title: "Student-First Mentorship",
      desc: "Every essay, activity list, and interview prep session is personal. We help you tell your authentic story in the most compelling, dignified voice.",
      badge: "Approach",
    },
    {
      icon: Zap,
      title: "Rigorous Strategy",
      desc: "We understand institutional admissions priorities, financial aid mechanics (CSS Profile / ISFAA), and how to position international applicants for full-ride awards.",
      badge: "Execution",
    },
  ];

  return (
    <section className="public-content public-about-values">
      <div className="public-about-section-heading">
        <div className="inline-flex items-center gap-2 text-[12px] font-bold text-[var(--ink-muted)] uppercase tracking-widest font-['Lexend'] mb-2">
          <Sparkles className="w-4 h-4 text-[var(--yellow)]" /> OUR CORE PILLARS
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold font-['Lexend'] text-[var(--ink)] tracking-tight">
          Built on proven results and genuine care.
        </h2>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] mt-2 max-w-xl mx-auto leading-relaxed">
          How we partner with each applicant to turn complex international requirements into a structured, stress-free roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[var(--white)] border border-[var(--line)] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--green-soft)] text-[var(--green)] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center text-[12px] font-['Lexend'] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[var(--yellow-soft)] text-[var(--ink)] border border-[var(--line)]">
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-['Lexend'] font-bold text-lg text-[var(--ink)] mb-2">
                  {p.title}
                </h3>
                <p className="text-[13px] sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
