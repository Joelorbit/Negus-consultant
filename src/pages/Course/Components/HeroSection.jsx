import { ArrowRight, Book, Search } from "iconoir-react";
import { NavLink } from "react-router";

export function HeroSection({ searchTerm, onSearchChange }) {
  return (
    <section className="public-page-hero course-page-hero">
      <div className="public-page-hero-inner">
        <p className="public-eyebrow"><Book aria-hidden="true" /> THE NEGUS COURSE LIBRARY</p>
        <h1 className="public-page-title">Build your skills. Move your application <em>forward.</em></h1>
        <p className="public-page-copy">
          Learn at your own pace with practical lessons for scholarships, university applications, and the tests that open more doors.
        </p>
        <form className="public-course-search" onSubmit={(event) => {
          event.preventDefault();
          document.getElementById("course-results")?.scrollIntoView({ behavior: "smooth" });
        }}>
          <Search aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search courses and topics"
            aria-label="Search courses and topics"
          />
          <button type="submit">Find a course <ArrowRight aria-hidden="true" /></button>
        </form>
        <div className="public-page-actions course-hero-links">
          <NavLink className="public-button public-button-secondary" to="/packages">Get application support</NavLink>
        </div>
      </div>
    </section>
  );
}
