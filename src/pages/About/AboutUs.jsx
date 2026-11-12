import AboutHero from "./Components/AboutHero";
import AboutMethodology from "./Components/AboutMethodology";
import AboutAcceptanceShowcase from "./Components/AboutAcceptanceShowcase";
import AboutTeamSection from "./Components/AboutTeamSection";
import AboutCenterCard from "./Components/AboutCenterCard";
import "../public-pages.css";

const outreach = [
  ["photo_1_2026-11-12_11-27-53.jpg", "Seattle Academy · student session"],
  ["photo_1_2026-11-12_11-28-15.jpg", "Menen School · session speaker"],
  ["photo_2025-11-29_09-18-05.jpg", "Seattle Academy · session speaker"],
  ["photo_2025-11-29_09-18-06.jpg", "Seattle Academy · student session"],
  ["photo_2026-01-13_11-55-36.jpg", "Menen School · outreach tour"],
  ["photo_2026-01-13_11-55-38.jpg", "Menen School · students"],
];

const testimonials = [
  ["Arsema", "Overall throughout the program I have learned so many things.", "photo_2026-11-12_11-26-18.jpg", "/assets/arema.ogg"],
  ["Efina", "", "photo_2026-11-12_11-26-48.jpg", "/assets/efina.ogg"],
];

export default function AboutUs() {
  return (
    <main className="public-page public-about-page pb-20 space-y-12">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Core Pillars & Methodology */}
      <AboutMethodology />

      {/* 3. University Acceptances & Crests */}
      <AboutAcceptanceShowcase />

      <section className="public-content public-about-testimonials">
        <div className="public-section-heading">
          <p className="public-eyebrow">WHAT OUR STUDENTS SAY</p>
          <h2>Progress sounds different for everyone.</h2>
        </div>
        <div className="about-testimonial-grid">
          {testimonials.map(([name, quote, image, audio]) => (
            <article className="about-testimonial-card" key={name}>
              <div className="about-testimonial-person">
                <img src={`/assets/testimonials/${image}`} alt={name} />
                <strong>{name}</strong>
              </div>
              {quote && <p>“{quote}”</p>}
              <audio controls src={audio} />
            </article>
          ))}
        </div>
        <div className="public-page-actions">
          <a className="public-button public-button-secondary" href="/testimonials">See all testimonials</a>
        </div>
      </section>

      <section className="public-content public-about-outreach">
        <div className="public-section-heading">
          <p className="public-eyebrow">OUTREACH TOURS</p>
          <h2>Taking scholarships to the classroom.</h2>
        </div>
        <div className="about-outreach-grid">
          {outreach.map(([image, caption]) => (
            <figure key={image}>
              <img src={`/assets/training/${image}`} alt={caption} />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="public-content about-school-cta">
        <div>
          <p className="public-eyebrow">INVITE US TO YOUR SCHOOL</p>
          <h2>Want us to teach at your school?</h2>
          <p>We bring free scholarship sessions to high schools, in person or online. Tell us about your school and we will plan a visit.</p>
        </div>
        <a className="public-button public-button-primary" href="https://t.me/negushelpcenter" target="_blank" rel="noreferrer">Contact Us</a>
      </section>

      <section className="public-content about-services">
        <div className="public-section-heading">
          <p className="public-eyebrow">OUR SERVICES</p>
          <h2>Choose the support that fits your next step.</h2>
        </div>
        <div className="about-service-grid">
          {[
            ["/training", "01", "Online Trainings", "ስልጠናዎች"],
            ["/free-tools", "02", "Free Tools", "ነፃ መገልገያዎች"],
            ["/courses", "03", "Scholarship Courses", "ኮርሶች"],
            ["/sat-ielts", "04", "SAT & IELTS", "ፈተና ዝግጅት"],
            ["/packages", "05", "Application Support", "የማመልከቻ ድጋፍ"],
          ].map(([to, number, title, subtitle]) => (
            <a className="about-service-card" href={to} key={to}><span>{number}</span><strong>{title}</strong><small>{subtitle}</small></a>
          ))}
        </div>
      </section>

      <section className="public-content about-community">
        <div>
          <p className="public-eyebrow">JOIN OUR COMMUNITY</p>
          <h2>Daily scholarship updates, straight to you.</h2>
          <p>Join our Telegram channel or follow us on TikTok for new opportunities and practical advice.</p>
        </div>
        <div className="about-community-actions">
          <a className="public-button public-button-primary" href="https://t.me/NEGUSCONSULTANTS" target="_blank" rel="noreferrer">Join our Telegram channel</a>
          <a className="public-button public-button-secondary" href="https://www.tiktok.com/@negus.consultant" target="_blank" rel="noreferrer">Follow us on TikTok</a>
        </div>
      </section>

      {/* 4. Team Profiles */}
      <AboutTeamSection />

      {/* 5. Addis Ababa Center & Contact Card */}
      <AboutCenterCard />
    </main>
  );
}
