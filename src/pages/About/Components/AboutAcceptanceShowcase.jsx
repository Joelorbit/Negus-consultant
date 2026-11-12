import { ArrowUpRight, Award } from "lucide-react";
import { acceptanceLetters } from "../../../assets/acceptanceLetters";

export default function AboutAcceptanceShowcase() {
  return (
    <section className="public-content public-about-acceptances py-12">
      <div className="public-about-section-heading">
        <div className="inline-flex items-center gap-2 text-[12px] font-bold text-[var(--ink-muted)] uppercase tracking-widest font-['Lexend'] mb-2">
          <Award className="w-4 h-4 text-[var(--yellow)]" /> STUDENT ACCEPTANCE LETTERS
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold font-['Lexend'] text-[var(--ink)] tracking-tight">
          A closer look at student offers.
        </h2>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] mt-2 max-w-xl mx-auto leading-relaxed">
          Browse the acceptance-letter documents shared with us. Select any letter to open it at full size.
        </p>
      </div>

      <div className="about-acceptance-scroller">
        {acceptanceLetters.map(({ src, title }) => (
          <a
            key={src}
            href={src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${title} in a new tab`}
            className="about-acceptance-card"
          >
            <img src={src} alt={title} loading="lazy" />
            <strong className="font-['Lexend'] text-[13px] sm:text-sm font-bold text-[var(--ink)]">
              {title}
            </strong>
            <span className="inline-flex items-center gap-1 text-[12px] font-['Lexend'] font-bold text-[var(--gold-ink)]">
              View letter <ArrowUpRight aria-hidden="true" size={14} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
