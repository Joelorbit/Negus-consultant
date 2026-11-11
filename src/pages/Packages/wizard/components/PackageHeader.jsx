import { NavLink } from "react-router";
import { ArrowLeft, Award, Phone, MessageCircle, Mail } from "lucide-react";

export default function PackageHeader({ pkg }) {
  return (
    <div className="pkgw-head">
      <div className="pkgw-head-toprow">
        <NavLink to="/packages" className="pkgw-backlink">
          <ArrowLeft className="w-4 h-4" /> Return to Packages
        </NavLink>
        {pkg?.data?.name && (
          <span className="pkgw-head-badge">
            <Award className="w-4 h-4" style={{ color: "var(--gold-ink)" }} />
            <span>{pkg.data.name}</span>
          </span>
        )}
      </div>

      <header className="pkgw-head-hero">
        <div className="pkgw-eyebrow" style={{ justifyContent: "center" }}>
          YOUR SCHOLARSHIP JOURNEY
        </div>
        <h1 className="display-title pkgw-head-title">
          Apply for Your Next Chapter
        </h1>
        <p className="pkgw-head-lead">
          Let’s unlock your potential and secure the global education you
          deserve. Fill out the steps below to confirm your placement.
        </p>
      </header>

      <div className="pkgw-directline">
        <div className="pkgw-directline-main">
          <span className="pkgw-directline-icon">
            <Phone className="w-5 h-5" />
          </span>
          <div>
            <strong className="pkgw-directline-title">Advisory Direct Line</strong>
            <span className="pkgw-directline-num">+251 964 730 248 · +251 943 041 418</span>
          </div>
        </div>
        <div className="pkgw-directline-links">
          <a
            href="https://t.me/negushelpcenter"
            target="_blank"
            rel="noreferrer"
            className="pkgw-directlink"
          >
            <MessageCircle className="w-4 h-4" /> @negushelpcenter
          </a>
          <a
            href="mailto:contact@negusconsultants.com"
            className="pkgw-directlink pkgw-directlink--muted"
          >
            <Mail className="w-4 h-4" /> Email support
          </a>
        </div>
      </div>
    </div>
  );
}
