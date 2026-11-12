import { ArrowUpRight, GraduationCap, UserRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { acceptanceLetters } from "../../../assets/acceptanceLetters";
import { teamMembers } from "../../../assets/teamMembers";

export default function CourseMentorsSection() {
  return (
    <section className="public-content course-mentors-section">
      <div className="public-section-heading">
        <p className="public-eyebrow"><UserRound aria-hidden="true" /> MEET THE MENTORS</p>
        <h2>Guidance from people who know the application journey.</h2>
        <p>Open a profile to learn about each mentor and browse student acceptance-letter samples.</p>
      </div>

      <div className="course-mentor-grid">
        {teamMembers.map((mentor) => (
          <Dialog key={mentor.name}>
            <DialogTrigger asChild>
              <button type="button" className="course-mentor-card">
                <img src={mentor.image} alt="" loading="lazy" />
                <span className="course-mentor-card-copy">
                  <strong>{mentor.name}</strong>
                  <span>{mentor.experience}</span>
                  <span className="course-mentor-profile-link">View profile <ArrowUpRight aria-hidden="true" size={15} /></span>
                </span>
              </button>
            </DialogTrigger>
            <DialogContent
              overlayClassName="z-[170]"
              className="z-[180] max-h-[88vh] max-w-3xl overflow-y-auto border-[var(--line)] bg-[var(--paper)] p-5 text-[var(--ink)] sm:p-8"
            >
              <DialogHeader className="pr-8 text-left">
                <DialogTitle className="font-['Lexend'] text-2xl font-bold text-[var(--ink)]">
                  {mentor.name}
                </DialogTitle>
                <DialogDescription className="text-[var(--ink-secondary)]">
                  Mentor profile and student acceptance-letter samples
                </DialogDescription>
              </DialogHeader>

              <div className="course-mentor-profile">
                <img src={mentor.image} alt={mentor.name} />
                <div>
                  <p className="public-eyebrow"><GraduationCap aria-hidden="true" /> EXPERIENCE</p>
                  <p className="font-semibold text-[var(--ink)]">{mentor.experience}</p>
                  <p className="mt-3 leading-relaxed text-[var(--ink-secondary)]">{mentor.bio}</p>
                </div>
              </div>

              <section className="course-letter-samples">
                <h3>Student acceptance-letter samples</h3>
                <p>Open a document to read the original letter at full size.</p>
                <div className="course-letter-grid">
                  {acceptanceLetters.map(({ src, title }) => (
                    <a key={src} href={src} target="_blank" rel="noreferrer">
                      <img src={src} alt="" loading="lazy" />
                      <span>{title}<ArrowUpRight aria-hidden="true" size={14} /></span>
                    </a>
                  ))}
                </div>
              </section>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
