import { Link } from "react-router";
import { ArrowUpRight } from "iconoir-react";

const Footer = () => {
  return (
    <footer className="public-footer">
      <div className="public-footer-inner">
        <div className="public-footer-grid">
          {/* Brand Column */}
          <div className="public-footer-brand">
            <Link to="/" aria-label="Negus Consultants home">
              <img src="/negus-logo.svg" alt="Negus Consultants" />
            </Link>
            <p>
              Dedicated guidance for ambitious Ethiopian students planning university
              applications, full-ride scholarships, and international education.
            </p>
          </div>

          {/* Explore Column */}
          <nav className="public-footer-col" aria-label="Explore Negus">
            <h2>Explore</h2>
            <Link to="/courses">Courses</Link>
            <Link to="/training">Training</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/sat-ielts">SAT &amp; IELTS</Link>
            <Link to="/scholarships">Open Scholarships</Link>
            <Link to="/free-tools">Free Tools</Link>
          </nav>

          {/* Support Column */}
          <nav className="public-footer-col" aria-label="Get support">
            <h2>Support &amp; Community</h2>
            <Link to="/about">About Us</Link>
            <Link to="/free-tour">Free Tour</Link>
            <Link to="/blogs">Blogs &amp; Tips</Link>
            <Link to="/testimonials">Admit Stories</Link>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Create Account</Link>
          </nav>

          {/* Connect Column */}
          <div className="public-footer-col">
            <h2>Connect Directly</h2>
            <a href="tel:+251964730248" style={{ whiteSpace: "nowrap" }}>Call Primary: +251 964 730 248</a>
            <a href="tel:+251943041418" style={{ whiteSpace: "nowrap" }}>Call Admin: +251 943 041 418</a>
            <a href="mailto:contact@negusconsultants.com">
              contact@negusconsultants.com
            </a>
            <a
              href="https://t.me/negushelpcenter"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              Telegram: @negushelpcenter <ArrowUpRight width={12} height={12} />
            </a>
            <a
              href="https://t.me/NEGUSCONSULTANTS"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              Telegram Channel <ArrowUpRight width={12} height={12} />
            </a>
            <a
              href="https://www.tiktok.com/@negus.consultant?_t=ZM-8xpBtQiI488&_r=1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              TikTok Community <ArrowUpRight width={12} height={12} />
            </a>
            <a
              href="https://www.instagram.com/negusconsultants?igsh=MWs1NHhlcDVyanZ1cQ=="
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              Instagram Stories <ArrowUpRight width={12} height={12} />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="public-footer-bottom">
          <span>
            © {new Date().getFullYear()} Negus Consultants. All rights reserved.
          </span>
          <span>Addis Ababa, Ethiopia · Online &amp; In-Person Guidance</span>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
