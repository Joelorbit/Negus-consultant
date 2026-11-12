import {
  GeorgetownCrest,
  WilliamsCrest,
  DrexelCrest,
  HowardCrest,
  HultCrest,
  NyuCrest,
  SarahLawrenceCrest,
  CanisiusCrest,
  ClarkCrest,
} from "../../Home/universityLogos";
import { Award } from "lucide-react";

export default function AboutAcceptanceShowcase() {
  const acceptances = [
    { name: "Georgetown", loc: "Washington, D.C.", award: "$85k/yr Award", Crest: GeorgetownCrest },
    { name: "Williams College", loc: "Massachusetts", award: "Full Financial Aid", Crest: WilliamsCrest },
    { name: "Drexel University", loc: "Philadelphia, PA", award: "$145k Scholarship", Crest: DrexelCrest },
    { name: "Howard University", loc: "Washington, D.C.", award: "Full Tuition", Crest: HowardCrest },
    { name: "NYU Abu Dhabi", loc: "Abu Dhabi & NYC", award: "Full Need-Based Aid", Crest: NyuCrest },
    { name: "Hult International", loc: "Boston & London", award: "$120k Merit Grant", Crest: HultCrest },
    { name: "Sarah Lawrence", loc: "New York", award: "Full Institutional Aid", Crest: SarahLawrenceCrest },
    { name: "Canisius University", loc: "New York", award: "$95k Presidential", Crest: CanisiusCrest },
    { name: "Clark University", loc: "Massachusetts", award: "Global Scholars Award", Crest: ClarkCrest },
  ];

  return (
    <section className="public-content public-about-acceptances py-12">
      <div className="public-about-section-heading">
        <div className="inline-flex items-center gap-2 text-[12px] font-bold text-[var(--ink-muted)] uppercase tracking-widest font-['Lexend'] mb-2">
          <Award className="w-4 h-4 text-[var(--yellow)]" /> VERIFIED OUTCOMES
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold font-['Lexend'] text-[var(--ink)] tracking-tight">
          Where Negus scholars study today.
        </h2>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] mt-2 max-w-xl mx-auto leading-relaxed">
          Our applicants have earned admissions and full financial packaging from premier universities worldwide.
        </p>
      </div>

      <div className="about-acceptance-scroller">
        {/* `Crest` is used as a JSX element below; core no-unused-vars cannot see JSX tag usage. */}
        {/* eslint-disable-next-line no-unused-vars */}
        {acceptances.map(({ name, loc, award, Crest }) => (
          <a
            key={name}
            href="/courses"
            className="about-acceptance-card"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <Crest className="w-10 h-10 object-contain" />
            </div>
            <div>
              <strong className="font-['Lexend'] text-[13px] sm:text-sm font-bold text-[var(--ink)] block line-clamp-1">
                {name}
              </strong>
              <span className="text-[12px] text-[var(--ink-muted)] block mt-1">
                {loc}
              </span>
            </div>
            <span className="inline-flex items-center text-[12px] font-['Lexend'] font-bold text-[var(--gold-ink)] bg-[var(--yellow-soft)] border border-[var(--line)] px-3.5 py-1.5 rounded-full">
              ★ {award}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
