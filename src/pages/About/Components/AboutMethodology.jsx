import { Sparkles, Target, Shield, Heart, Zap, Handshake } from "lucide-react";

export default function AboutMethodology() {
  const pillars = [
    {
      icon: Target,
      title: "Guide students well",
      desc: "Give students practical, honest guidance shaped by real applications and experience.",
      badge: "01",
    },
    {
      icon: Shield,
      title: "Reach more schools",
      desc: "Bring free scholarship sessions to more high schools, in person and online.",
      badge: "02",
    },
    {
      icon: Heart,
      title: "Keep information open",
      desc: "Make reliable scholarship information accessible to students and families.",
      badge: "03",
    },
    {
      icon: Zap,
      title: "Build on real experience",
      desc: "Share advice grounded in applications, outcomes, and lessons learned along the way.",
      badge: "04",
    },
    {
      icon: Handshake,
      title: "Grow partnerships",
      desc: "Work with schools and communities to create more pathways to international education.",
      badge: "05",
    },
  ];

  return (
    <section className="public-content public-about-values">
      <div className="public-about-section-heading">
        <div className="inline-flex items-center gap-2 text-[12px] font-bold text-[var(--ink-muted)] uppercase tracking-widest font-['Lexend'] mb-2">
          <Sparkles className="w-4 h-4 text-[var(--yellow)]" /> OUR GOALS
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold font-['Lexend'] text-[var(--ink)] tracking-tight">
          Practical guidance. Wider access.
        </h2>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] mt-2 max-w-xl mx-auto leading-relaxed">
          Our goals are simple: guide students well, reach more schools, and keep scholarship information accessible.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
