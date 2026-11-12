import { Users, GraduationCap, Award } from "lucide-react";
import { teamMembers } from "../../../assets/teamMembers";

export default function AboutTeamSection() {
  return (
    <section className="public-content public-about-team">
      <div className="public-about-section-heading">
        <div className="inline-flex items-center gap-2 text-[12px] font-bold text-[var(--ink-muted)] uppercase tracking-widest font-['Lexend'] mb-2">
          <Users className="w-4 h-4 text-[var(--yellow)]" /> OUR TEAM
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold font-['Lexend'] text-[var(--ink)] tracking-tight">
          Guided by scholars who walked the path.
        </h2>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] mt-2 max-w-xl mx-auto leading-relaxed">
          Our mentors have personally navigated international admissions and won full institutional merit and need-based scholarships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="p-7 rounded-3xl bg-[var(--white)] border border-[var(--line)] shadow-xs text-center flex flex-col items-center justify-between transition-all hover:shadow-md hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-[var(--line)] shadow-sm"
                  onError={(e) => {
                    e.target.src = "/testimonial.jpg";
                  }}
                />
                <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[var(--yellow)] text-[#111613] flex items-center justify-center shadow-xs">
                  <GraduationCap className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-['Lexend'] font-bold text-lg sm:text-xl text-[var(--ink)] mb-1">
                {member.name}
              </h3>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--green-soft)] text-[var(--ink-secondary)] text-[12px] font-['Lexend'] font-bold mb-4 border border-[var(--line)]">
                <Award className="w-3.5 h-3.5" />
                <span>{member.experience}</span>
              </div>
              <p className="text-[13px] sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
