import { testimonialPhotos } from "../../../assets/testimonialPhotos";

const voiceTestimonials = [
  { name: "Arsema", src: "/assets/testimonials/arsema-voice.mp3" },
  { name: "Efina", src: "/assets/testimonials/efina-voice.mp3" },
];

export default function AboutStudentVoices() {
  return (
    <section className="public-content about-student-voices">
      <div className="public-section-heading">
        <p className="public-eyebrow">WHAT OUR STUDENTS SAY</p>
        <h2>Real voices from the application journey.</h2>
      </div>

      <div className="testimonial-media-grid">
        {testimonialPhotos.map(({ name, image }) => (
          <article className="testimonial-media-card" key={name}>
            <a href={image} target="_blank" rel="noreferrer" aria-label={`View ${name}'s photo`}>
              <img src={image} alt={`${name}, a Negus student`} loading="lazy" />
            </a>
            <div className="testimonial-media-copy">
              <h3>{name}</h3>
            </div>
          </article>
        ))}
      </div>

      <div className="testimonial-voice-grid">
        {voiceTestimonials.map(({ name, src }) => (
          <article className="testimonial-voice-card" key={name}>
            <div>
              <span>STUDENT VOICE</span>
              <h3>{name}</h3>
            </div>
            <audio controls preload="none" aria-label={`${name}'s voice testimonial`}>
              <source src={src} type="audio/mpeg" />
              Your browser does not support audio playback.
            </audio>
          </article>
        ))}
      </div>
    </section>
  );
}
