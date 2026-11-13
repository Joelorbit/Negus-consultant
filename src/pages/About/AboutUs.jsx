import AboutHero from "./Components/AboutHero";
import AboutMission from "./Components/AboutMission";
import AboutMethodology from "./Components/AboutMethodology";
import AboutStats from "./Components/AboutStats";
import AboutStudentVoices from "./Components/AboutStudentVoices";
import AboutAcceptanceShowcase from "./Components/AboutAcceptanceShowcase";
import MentorProfilesSection from "./Components/MentorProfilesSection";
import AboutCenterCard from "./Components/AboutCenterCard";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import "../public-pages.css";

const outreach = [
  {
    image: "leulseged-menen-speaking.jpg",
    school: "Menen Secondary Female Boarding School",
    caption: "Scholarship talk for students at Menen Secondary Female Boarding School.",
  },
  {
    image: "leulseged-menen-audience.jpg",
    school: "Menen Secondary Female Boarding School",
    caption: "Students at our Menen session learning where and how to apply abroad.",
  },
  {
    image: "leulseged-seattle-academy-lesson.jpg",
    school: "Seattle Academy",
    caption: "Lesson on scholarship opportunities and the Common App at Seattle Academy.",
  },
  {
    image: "leulseged-seattle-academy-audience.jpg",
    school: "Seattle Academy",
    caption: "Students at Seattle Academy taking notes during our scholarship session.",
  },
];

const services = [
  {
    to: "/training",
    number: "01",
    title: "Online Trainings",
    subtitle: "ስልጠናዎች",
    description: "Group cohorts, masterclasses, and interactive schedules.",
  },
  {
    to: "/free-tools",
    number: "02",
    title: "Free Tools",
    subtitle: "ነፃ መገልገያዎች",
    description: "Video recordings, sample essays, CV builder, and guides.",
  },
  {
    to: "/courses",
    number: "03",
    title: "Scholarship Courses",
    subtitle: "ኮርሶች",
    description: "Structured self-paced video modules and study plans.",
  },
  {
    to: "/sat-ielts",
    number: "04",
    title: "SAT & IELTS",
    subtitle: "ፈተና ዝግጅት",
    description: "Digital SAT drills and IELTS Academic preparation.",
  },
  {
    to: "/packages",
    number: "05",
    title: "Application Support",
    subtitle: "የማመልከቻ ድጋፍ",
    description: "Essay coaching, one-to-one mentorship, and application plans.",
  },
];

export default function AboutUs() {
  return (
    <main className="public-page public-about-page pb-20 space-y-12">
      <AboutHero />
      <AboutMission />
      <AboutMethodology />
      <AboutStats />
      <AboutStudentVoices />
      <AboutAcceptanceShowcase />

      <section className="public-content public-about-outreach">
        <div className="public-section-heading">
          <p className="public-eyebrow">OUTREACH TOURS</p>
          <h2>Taking scholarships to the classroom.</h2>
          <p>
            We visit high schools across Ethiopia to show students what scholarships
            exist, how the Common App works, and how to choose the right universities.
          </p>
        </div>
        <div className="about-outreach-grid">
          {outreach.map(({ image, school, caption }) => (
            <figure key={image}>
              <img src={`/assets/mentor-profiles/sessions/${image}`} alt={caption} loading="lazy" />
              <figcaption>
                <strong>{school}</strong>
                <span>{caption}</span>
              </figcaption>
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
          {services.map(({ to, number, title, subtitle, description }) => (
            <Link className="about-service-card" to={to} key={to}>
              <span className="about-service-number">{number}</span>
              <span className="about-service-title">{title} <i>/</i></span>
              <span className="about-service-subtitle">{subtitle}</span>
              <span className="about-service-description">{description}</span>
              <span className="about-service-arrow" aria-hidden="true"><ArrowUpRight /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="about-community-banner" aria-labelledby="about-community-title">
        <img className="about-community-image" src="/hero-teaching.jpg" alt="" loading="lazy" />
        <div className="about-community-shade" />
        <div className="about-community-content">
          <div className="about-community-copy">
            <p className="public-eyebrow">JOIN OUR COMMUNITY</p>
            <h2 id="about-community-title">Daily scholarship updates, straight to you.</h2>
            <p>
              Join our Telegram channel or follow us on TikTok for new opportunities
              and practical advice—in Amharic and English.
            </p>
            <div className="about-community-actions">
              <a className="public-button public-button-light" href="https://t.me/NEGUSCONSULTANTS" target="_blank" rel="noreferrer">
                Join our Telegram channel <ArrowUpRight aria-hidden="true" />
              </a>
              <a className="public-button public-button-outline-light" href="https://www.tiktok.com/@negus.consultant" target="_blank" rel="noreferrer">
                Follow us on TikTok <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <MentorProfilesSection />
      <AboutCenterCard />
    </main>
  );
}
