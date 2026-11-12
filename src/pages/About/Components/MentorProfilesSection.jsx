import { ArrowUpRight, GraduationCap, MapPin, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mentorProfiles } from "../../../assets/mentorProfiles";

export default function MentorProfilesSection() {
  return (
    <section className="public-content public-about-team">
      <div className="public-section-heading">
        <p className="public-eyebrow"><GraduationCap aria-hidden="true" /> MEET THE MENTORS</p>
        <h2>Guidance from students who have been there.</h2>
        <p>Explore their application journeys, acceptance letters, and school sessions.</p>
      </div>

      <div className="mentor-profile-grid">
        {mentorProfiles.map((mentor) => (
          <Dialog key={mentor.name}>
            <DialogTrigger asChild>
              <button
                type="button"
                className={`mentor-profile-card${mentor.cardImageIsDocument ? " mentor-profile-card-document" : ""}${mentor.name.startsWith("Leulseged") ? " mentor-profile-card-featured" : ""}`}
              >
                <span className="mentor-profile-card-image">
                  <img src={mentor.cardImage} alt={mentor.cardImageAlt} loading="eager" />
                </span>
                <span className="mentor-profile-card-copy">
                  <strong>{mentor.name}</strong>
                  <span><MapPin aria-hidden="true" />{mentor.location}</span>
                  <span className="mentor-profile-open">View profile <ArrowUpRight aria-hidden="true" /></span>
                </span>
              </button>
            </DialogTrigger>
            <DialogContent
              className="mentor-profile-dialog"
              showCloseButton={false}
              style={{ translate: "none" }}
            >
              <DialogClose className="mentor-profile-close" aria-label="Close mentor profile">
                <X aria-hidden="true" />
              </DialogClose>
              <DialogHeader className="mentor-profile-dialog-header">
                <p className="public-eyebrow"><GraduationCap aria-hidden="true" /> MENTOR PROFILE</p>
                <DialogTitle>{mentor.name}</DialogTitle>
                <DialogDescription><MapPin aria-hidden="true" />{mentor.location}</DialogDescription>
              </DialogHeader>

              <div className="mentor-profile-bio">
                <p>{mentor.summary}</p>
                <section>
                  <h3>Admitted to</h3>
                  <ul>
                    {mentor.admissions.map((admission) => <li key={admission}>{admission}</li>)}
                  </ul>
                </section>
              </div>

              <section className="mentor-profile-evidence">
                <h3>Acceptance letters</h3>
                <p>Original admission documents with personal contact details hidden.</p>
                <div className="mentor-profile-letter-grid">
                  {mentor.letters.map(({ title, image }) => (
                    <a href={image} target="_blank" rel="noreferrer" key={image}>
                      <img src={image} alt={`${title} acceptance letter`} loading="lazy" />
                      <span>{title}<ArrowUpRight aria-hidden="true" /></span>
                    </a>
                  ))}
                </div>
              </section>

              {mentor.sessions.length > 0 && (
                <section className="mentor-profile-evidence">
                  <h3>School sessions</h3>
                  <div className="mentor-profile-session-grid">
                    {mentor.sessions.map(({ title, image }) => (
                      <figure key={image}>
                        <img src={image} alt={title} loading="lazy" />
                        <figcaption>{title}</figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
