import { NavLink } from "react-router";
import { GraduationCap, ArrowRight, BookOpen } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="public-page-hero">
      <div className="public-page-hero-inner">
        <p className="public-eyebrow">
          <GraduationCap className="w-4 h-4 text-[var(--yellow)]" /> ABOUT NEGUS CONSULTANTS
        </p>
        <h1 className="public-page-title">
          Helping Ethiopian students reach the world's universities.
        </h1>
        <p className="public-page-copy">
          Practical guidance, real student experience, and wider access to international education.
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
            <span>Browse courses</span>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
