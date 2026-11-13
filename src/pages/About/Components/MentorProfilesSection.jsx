import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react";
import { Link } from "react-router";
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
        {mentorProfiles.map((mentor) => {
          const slug = mentor.name.toLowerCase().replaceAll(" ", "-");
          return (
            <Link
              to={`/about/mentors/${slug}`}
              className={`mentor-profile-card${mentor.cardImageIsDocument ? " mentor-profile-card-document" : ""}${mentor.name.startsWith("Leulseged") ? " mentor-profile-card-featured" : ""}`}
              key={mentor.name}
            >
              <span className="mentor-profile-card-image">
                <img src={mentor.cardImage} alt={mentor.cardImageAlt} loading="eager" />
              </span>
              <span className="mentor-profile-card-copy">
                <strong>{mentor.name}</strong>
                <span><MapPin aria-hidden="true" />{mentor.location}</span>
                <span className="mentor-profile-open">View profile <ArrowUpRight aria-hidden="true" /></span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
