import AboutHero from "./Components/AboutHero";
import AboutStats from "./Components/AboutStats";
import AboutMethodology from "./Components/AboutMethodology";
import AboutAcceptanceShowcase from "./Components/AboutAcceptanceShowcase";
import AboutTeamSection from "./Components/AboutTeamSection";
import AboutCenterCard from "./Components/AboutCenterCard";
import "../public-pages.css";

export default function AboutUs() {
  return (
    <main className="public-page public-about-page pb-20 space-y-12">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Key Metrics & Outcomes */}
      <AboutStats />

      {/* 3. Core Pillars & Methodology */}
      <AboutMethodology />

      {/* 4. University Acceptances & Crests */}
      <AboutAcceptanceShowcase />

      {/* 5. Leadership & Verified Mentors */}
      <AboutTeamSection />

      {/* 6. Addis Ababa Center & Contact Card */}
      <AboutCenterCard />
    </main>
  );
}
