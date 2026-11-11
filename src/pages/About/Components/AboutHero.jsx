import { NavLink } from "react-router";
import { GraduationCap, ArrowRight, BookOpen, Check } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="public-page-hero">
      <div className="public-page-hero-inner">
        <p className="public-eyebrow">
          <GraduationCap className="w-4 h-4 text-[var(--yellow)]" /> ABOUT NEGUS CONSULTANTS
        </p>
        <h1 className="public-page-title">
          Demystifying global admissions for <em>ambitious scholars.</em>
        </h1>
        <p className="public-page-copy">
          Negus Consultants is an educational consultancy based in Addis Ababa, Ethiopia. We equip high-achieving scholars with the strategic roadmap, essay coaching, and financial aid positioning required to win competitive international scholarships.
        </p>
        <div className="public-page-actions">
          <NavLink
            to="/packages"
            className="public-button public-button-primary text-[14px] min-h-11 px-6 py-3 inline-flex items-center gap-2"
          >
            <span>Explore Scholarship Tracks</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
          <NavLink
            to="/courses"
            className="public-button public-button-secondary text-[14px] min-h-11 px-6 py-3 inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Course Library</span>
          </NavLink>
        </div>
        <div className="public-hero-note">
          <Check className="w-4 h-4 text-[var(--green)] inline mr-1" />
          <span>Addis Ababa flagship advising · Fully accessible online worldwide</span>
        </div>
      </div>
    </section>
  );
}
