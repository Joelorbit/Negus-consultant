import { testimonialPhotos } from "../../assets/testimonialPhotos";
import { Sparkles, ArrowRight } from "lucide-react";
import { NavLink } from "react-router";
import "../public-pages.css";

const studentVoiceMessages = [
  { name: "Arsema", src: "/assets/testimonials/arsema-voice.mp3" },
  { name: "Efina", src: "/assets/testimonials/efina-voice.mp3" },
];

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Hero */}
      <section className="public-page-hero">
        <div className="public-page-hero-inner">
          <p className="public-eyebrow">
            <Sparkles className="w-4 h-4 text-[var(--gold-ink)]" /> STUDENT STORIES
          </p>
          <h1 className="public-page-title">
            What students say about Negus.
          </h1>
          <p className="public-page-copy">
            Read messages shared by students about their experience with Negus training and guidance.
          </p>
          <div className="public-page-actions">
            <NavLink to="/packages" className="public-button public-button-primary">
              <span>Explore Scholarship Packages</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
            <NavLink to="/courses" className="public-button public-button-secondary">
              <span>Browse Courses</span>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="public-content testimonial-voices-section">
        <div className="public-section-heading">
          <p className="public-eyebrow"><Sparkles aria-hidden="true" /> STUDENT VOICES</p>
          <h2>Hear directly from our students.</h2>
          <p>Listen to Arsema and Efina share their experiences.</p>
        </div>
        <div className="testimonial-voice-grid">
          {studentVoiceMessages.map(({ name, src }) => (
            <article className="testimonial-voice-card" key={name}>
              <div>
                <span>STUDENT VOICE</span>
                <h3>{name}</h3>
              </div>
              <audio controls preload="none" aria-label={`Voice message from ${name}`}>
                <source src={src} type="audio/mpeg" />
                Your browser does not support audio playback.
              </audio>
            </article>
          ))}
        </div>
      </section>

      <section className="public-content testimonial-media-section">
        <div className="public-section-heading">
          <p className="public-eyebrow"><Sparkles aria-hidden="true" /> STUDENT VOICES</p>
          <h2>Student testimonials.</h2>
          <p>Open any student card to read their full message.</p>
        </div>
        <div className="testimonial-media-grid">
          {testimonialPhotos.map((student, index) => (
            <article className="testimonial-media-card" key={student.image}>
              <a href={student.image} target="_blank" rel="noreferrer" aria-label={`Open ${student.name}'s full testimonial`}>
                <img src={student.image} alt={`${student.name}'s student testimonial`} loading={index > 1 ? "lazy" : "eager"} />
              </a>
              <div className="testimonial-media-copy"><h3>{student.name}</h3></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
