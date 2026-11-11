// The canonical homepage lives in Negus-homepage. Keep this route wired to
// that source so its sections, typography, icons, seals, and interactions
// remain one-to-one with the approved design instead of drifting in a fork.
import ReferenceHome from "./ReferenceHome";
import "./reference-mobile.css";

export default function Home() {
  return (
    <div className="reference-home-frame">
      <ReferenceHome />
    </div>
  );
}
