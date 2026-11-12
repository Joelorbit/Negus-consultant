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
          Helping Ethiopian students reach the world's universities.
        </h1>
        <p className="public-page-copy">
          Our mission is to open international education to every capable Ethiopian student, whatever their family's income. We give students practical, honest guidance, built on real applications and experiences that worked.
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
