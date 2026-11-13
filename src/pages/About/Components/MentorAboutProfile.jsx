import { ArrowLeft, ArrowUpRight, GraduationCap, MapPin } from "lucide-react";
import { Link, useParams } from "react-router";
import { mentorProfiles } from "../../../assets/mentorProfiles";
import "../../public-pages.css";

export default function MentorAboutProfile() {
  const { slug } = useParams();
  const mentor = mentorProfiles.find(
    (profile) => profile.name.toLowerCase().replaceAll(" ", "-") === slug,
  );

  if (!mentor) {
    return (
      <main className="public-page public-content mentor-profile-not-found">
        <h1>Mentor profile not found</h1>
        <Link className="public-button public-button-primary" to="/about">Meet our mentors</Link>
      </main>
    );
  }

  return (
    <main className="public-page mentor-about-page">
      <section className="public-content mentor-about-profile">
        <Link className="mentor-about-back" to="/about">
          <ArrowLeft aria-hidden="true" /> About Negus
        </Link>
        <div className="mentor-about-hero">
          <div className="mentor-about-photo">
            <img src={mentor.cardImage} alt={mentor.cardImageAlt} />
          </div>
          <div className="mentor-about-intro">
            <p className="public-eyebrow"><GraduationCap aria-hidden="true" /> MEET THE MENTORS</p>
            <h1>{mentor.name}</h1>
            <p className="mentor-about-location"><MapPin aria-hidden="true" />{mentor.location}</p>
            <p className="mentor-about-summary">{mentor.summary}</p>
          </div>
        </div>

        <section className="mentor-about-section">
          <h2>Application journey</h2>
          <ul className="mentor-about-admissions">
            {mentor.admissions.map((admission) => <li key={admission}>{admission}</li>)}
          </ul>
        </section>

        <section className="mentor-about-section">
          <div className="public-section-heading mentor-about-section-heading">
            <p className="public-eyebrow">ADMISSION STORIES</p>
            <h2>Acceptance letters</h2>
            <p>Original admission documents with personal contact details hidden.</p>
          </div>
          <div className="mentor-about-letters">
            {mentor.letters.map(({ title, image }) => (
              <a href={image} target="_blank" rel="noreferrer" key={image}>
                <img src={image} alt={`${title} acceptance letter`} loading="lazy" />
                <span>{title}<ArrowUpRight aria-hidden="true" /></span>
              </a>
            ))}
          </div>
        </section>

        {mentor.sessions.length > 0 && (
          <section className="mentor-about-section">
            <div className="public-section-heading mentor-about-section-heading">
              <p className="public-eyebrow">SCHOOL OUTREACH</p>
              <h2>Sharing the journey with students.</h2>
            </div>
            <div className="mentor-about-sessions">
              {mentor.sessions.map(({ title, image }) => (
                <figure key={image}>
                  <img src={image} alt={title} loading="lazy" />
                  <figcaption>{title}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
