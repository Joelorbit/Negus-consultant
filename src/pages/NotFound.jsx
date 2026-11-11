import { ArrowRight } from "iconoir-react";
import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <main className="public-page">
      <section className="public-page-hero">
        <div className="public-page-hero-inner">
          <p className="public-eyebrow">404 · PAGE NOT FOUND</p>
          <h1 className="public-page-title">This page isn’t part of the <em>plan.</em></h1>
          <p className="public-page-copy">The address may have changed. Head back to Negus or explore the courses and support available.</p>
          <div className="public-page-actions">
            <NavLink className="public-button public-button-primary" to="/">Back to homepage <ArrowRight aria-hidden="true" /></NavLink>
            <NavLink className="public-button public-button-secondary" to="/courses">Explore courses</NavLink>
          </div>
        </div>
      </section>
    </main>
  );
}
