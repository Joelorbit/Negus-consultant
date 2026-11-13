export default function AboutStats() {
  const stats = [
    { value: "30,000+", label: "Students and families reached", color: "var(--gold-ink)" },
    { value: "2,000+", label: "Students guided one-to-one and in sessions", color: "var(--ink-secondary)" },
    { value: "10+", label: "Universities that admitted our students", color: "var(--ink)" },
  ];

  return (
    <section className="public-content public-about-stats">
      <div className="public-section-heading">
        <p className="public-eyebrow">IMPACT IN NUMBERS</p>
        <h2>More students can see a path forward.</h2>
      </div>
      <div className="about-stats-grid grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-center">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-2xl bg-[var(--white)] border border-[var(--line)] shadow-xs transition-transform hover:-translate-y-1"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
          >
            <strong
              style={{ color: s.color }}
              className="block font-['Lexend'] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-1.5"
            >
              {s.value}
            </strong>
            <span             className="text-[13px] sm:text-sm font-['Lexend'] font-bold text-[var(--ink)] block max-w-[220px]">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
