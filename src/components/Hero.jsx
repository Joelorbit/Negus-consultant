import { ArrowRight } from "iconoir-react";
import { NavLink } from "react-router";

const Hero = () => (
  <>
    <section className="reference-hero section-shell" id="home">
      <div className="reference-hero-copy">
        <div className="reference-eyebrow">WELCOME TO NEGUS CONSULTANCY</div>
        <h1 className="reference-display-title">
          Study abroad.
          <br />
          <mark>With a plan built for you.</mark>
        </h1>
        <p>
          SAT and IELTS prep, university applications, essay coaching,
          scholarships, financial aid, and visa guidance—one expert team, one
          clear plan.
        </p>
        <div className="reference-hero-actions">
          <NavLink to="/register" className="reference-dark-cta">
            <span>Build My Plan</span><ArrowRight width={16} height={16} />
          </NavLink>
          <NavLink to="/packages" className="reference-link-cta">
            <span>See Our Packages</span><ArrowRight width={16} height={16} />
          </NavLink>
        </div>
      </div>

    </section>
    <div className="reference-marquee" aria-label="Negus core service tracks">
      <div className="reference-marquee-track">{["ESSAY COACHING", "ONE-ON-ONE MENTORSHIP", "FULL APPLICATION SUPPORT", "EDUCATIONAL COURSES", "DIGITAL SAT MASTERY", "IELTS ACADEMIC INTENSIVE", "CSS PROFILE & ISFAA AID", "VISA INTERVIEW SIMULATION"].map((item) => <span key={item}>{item}<i>✦</i></span>)}</div>
      <div className="reference-marquee-track" aria-hidden="true">{["ESSAY COACHING", "ONE-ON-ONE MENTORSHIP", "FULL APPLICATION SUPPORT", "EDUCATIONAL COURSES", "DIGITAL SAT MASTERY", "IELTS ACADEMIC INTENSIVE", "CSS PROFILE & ISFAA AID", "VISA INTERVIEW SIMULATION"].map((item) => <span key={item}>{item}<i>✦</i></span>)}</div>
    </div>
  </>
);

export default Hero;
