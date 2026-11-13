import { Compass } from "lucide-react";

export default function AboutMission() {
  return (
    <section className="public-content about-mission">
      <div className="about-mission-mark" aria-hidden="true">
        <Compass />
      </div>
      <div className="about-mission-copy">
        <p className="public-eyebrow">OUR MISSION</p>
        <h2>Ability should open doors, not family income.</h2>
        <p>
          Our mission is to open international education to every capable Ethiopian
          student, whatever their family's income. We give students practical,
          honest guidance, built on real applications and experiences that worked.
        </p>
      </div>
    </section>
  );
}
