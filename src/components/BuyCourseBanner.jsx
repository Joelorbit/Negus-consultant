import { useState } from "react";
import { Lock, X } from "lucide-react";
import { NavLink } from "react-router";

const BuyCourseBanner = () => {
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem("negus-course-access-banner-dismissed") !== "true";
    } catch {
      return true;
    }
  });

  const dismiss = () => {
    try {
      sessionStorage.setItem("negus-course-access-banner-dismissed", "true");
    } catch {
      // The banner remains dismissible for this page even when storage is unavailable.
    }
    setVisible(false);
  };

  return (
    visible ? (
        <aside className="buy-course-banner" aria-label="Course access offer">
          <span className="buy-course-banner-icon"><Lock aria-hidden="true" /></span>
          <div className="buy-course-banner-copy">
            <p className="buy-course-banner-label">COURSE ACCESS</p>
            <p>Unlock all courses and note files for <strong>500 Birr</strong>.</p>
          </div>
          <NavLink
            to="/packages/full-course/b2427308-b9a9-4b89-8b55-24308243e756"
            className="buy-course-banner-link"
          >
            View access options <span aria-hidden="true">↗</span>
          </NavLink>
          <button
            type="button"
            onClick={dismiss}
            className="buy-course-banner-close"
            aria-label="Dismiss course access offer"
          >
            <X aria-hidden="true" />
          </button>
        </aside>
    ) : null
  );
};

export default BuyCourseBanner;
