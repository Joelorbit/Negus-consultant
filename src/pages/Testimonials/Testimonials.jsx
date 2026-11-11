/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { testimonialsData } from "../../assets/data";
import TestimonialCard from "./Components/TestimonialCard";
import TeamSection from "./Components/TeamSection";
import { Sparkles, Trophy, ArrowRight } from "lucide-react";
import { NavLink } from "react-router";
import "../public-pages.css";

export const mentorsData = [
  {
    id: 2,
    name: "Mentor from NYU Abu Dhabi",
    title: "Admissions Mentor, NYU Abu Dhabi",
    photoUrl: "./testimonial.jpg",
    bio: "Guides students through the application process with insights from one of the most competitive institutions in the Middle East.",
    linkedIn: "#",
  },
  {
    id: 3,
    name: "Mentor from NYU Shanghai",
    title: "Admissions Mentor, NYU Shanghai",
    photoUrl: "https://htmlstream.com/preview/unify-v2.6.2/assets/img-temp/400x450/img5.jpg",
    bio: "Supports students applying to top Asian and U.S. programs, bringing experience from NYU’s Shanghai campus.",
    linkedIn: "#",
  },
  {
    id: 4,
    name: "Mentor from Drexel University",
    title: "Scholarship & Admissions Mentor, Drexel University",
    photoUrl: "https://htmlstream.com/preview/unify-v2.6.2/assets/img-temp/400x450/img5.jpg",
    bio: "Specializes in U.S. admissions and scholarship opportunities for international students.",
    linkedIn: "#",
  },
  {
    id: 5,
    name: "Mentor from University of Messina",
    title: "Admissions Mentor, University of Messina (Italy)",
    photoUrl: "https://htmlstream.com/preview/unify-v2.6.2/assets/img-temp/400x450/img5.jpg",
    bio: "Experienced in guiding applicants toward competitive European study opportunities.",
    linkedIn: "#",
  },
  {
    id: 6,
    name: "Mentor from University of Pennsylvania",
    title: "Admissions Mentor, University of Pennsylvania",
    photoUrl: "https://htmlstream.com/preview/unify-v2.6.2/assets/img-temp/400x450/img5.jpg",
    bio: "Helps students secure admission into Ivy League institutions with tailored strategies.",
    linkedIn: "#",
  },
];

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Hero */}
      <section className="public-page-hero">
        <div className="public-page-hero-inner">
          <p className="public-eyebrow">
            <Trophy className="w-4 h-4 text-[var(--gold-ink)]" /> DOCUMENTED ACCEPTANCES &amp; AWARDS
          </p>
          <h1 className="public-page-title">
            Real Ethiopian scholars. <em>Real admissions results.</em>
          </h1>
          <p className="public-page-copy">
            Every year, students working with Negus Consultants earn fully-funded
            scholarships, Ivy League admissions, and offers from prestigious
            universities worldwide.
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

      {/* Featured Scholars Showcase */}
      <TeamSection />

      {/* Testimonials Stream */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--ink-muted)] uppercase tracking-widest font-['Lexend'] mb-2">
            <Sparkles className="w-4 h-4 text-[var(--gold-ink)]" /> WHAT OUR STUDENTS SAY
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold font-['Lexend'] text-[var(--ink)]">
            Stories from our community.
          </h2>
          <p className="text-sm text-[var(--ink-secondary)] mt-2">
            Firsthand accounts from students who navigated SAT prep, essay
            revisions, and CSS Profile documentation with Negus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial, idx) => (
            <TestimonialCard
              key={`${testimonial.id}-${idx}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
