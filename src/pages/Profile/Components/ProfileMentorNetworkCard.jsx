import { NavLink } from "react-router";
import { Users, ArrowRight, DollarSign, Globe, Award, Sparkles } from "lucide-react";

export default function ProfileMentorNetworkCard() {
  return (
    <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-6 sm:p-7 text-[var(--ink)] shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[12px] font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
            <Users className="w-3.5 h-3.5 text-[var(--green)]" />
            <span>MENTOR NETWORK</span>
          </div>
          <h2 className="mt-1 font-['Lexend'] text-xl font-bold text-[var(--ink)]">
            Ready to mentor other students?
          </h2>
          <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-[var(--ink-secondary)] max-w-xl">
            Share what you have learned. Apply to join the Negus mentor network.
          </p>
        </div>
        <NavLink
          to="/mentor/apply"
          className="public-button public-button-secondary text-[14px] px-5 py-2.5 min-h-[44px] shrink-0 inline-flex items-center gap-2 self-start"
        >
          <span>Learn about mentoring</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        <div className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
          <strong className="font-['Lexend'] text-[13.5px] font-bold text-[var(--ink)] flex items-center gap-1.5 mb-1">
            <DollarSign className="w-3.5 h-3.5 text-[var(--green)]" /> Earn from Experience
          </strong>
          <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
            Hourly paid online guidance starting at $15/hr, scaling with student reviews.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
          <strong className="font-['Lexend'] text-[13.5px] font-bold text-[var(--ink)] flex items-center gap-1.5 mb-1">
            <Globe className="w-3.5 h-3.5 text-[var(--yellow)]" /> Work From Anywhere
          </strong>
          <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
            100% remote sessions scheduled around your own university exam timetable.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
          <strong className="font-['Lexend'] text-[13.5px] font-bold text-[var(--ink)] flex items-center gap-1.5 mb-1">
            <Award className="w-3.5 h-3.5 text-[var(--green)]" /> Strengthen Your CV
          </strong>
          <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
            Demonstrate real mentorship and admissions advising leadership for grad school.
          </p>
        </div>
      </div>
    </section>
  );
}
