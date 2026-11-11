export default function AboutStats() {
  const stats = [
    { value: "$2.4M+", label: "Scholarships Awarded", color: "var(--gold-ink)" },
    { value: "100+", label: "Scholars Guided", color: "var(--ink-secondary)" },
    { value: "94%", label: "Top-Choice Acceptance", color: "var(--ink)" },
    { value: "1-on-1", label: "Dedicated Scholar Mentorship", color: "var(--gold-ink)" },
  ];

  return (
    <section className="public-content public-about-stats">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 text-center">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-2xl bg-[var(--white)] border border-[var(--line)] shadow-xs transition-transform hover:-translate-y-1"
          >
            <strong
              style={{ color: s.color }}
              className="block font-['Lexend'] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-1.5"
            >
              {s.value}
            </strong>
            <span className="text-[13px] sm:text-sm font-['Lexend'] font-bold text-[var(--ink)] block">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
