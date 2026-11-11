import { useState } from "react";
import { NavLink } from "react-router";
import { CreditCard, Check, ChevronDown, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

export default function ProfileCourseAccessCard({ subscription, isLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const features = Array.isArray(subscription?.features) ? subscription.features : [];
  const isActive = subscription?.is_active === true;

  if (isLoading) {
    return (
      <div
        className="h-32 animate-pulse rounded-3xl border"
        style={{ background: "var(--green-subtle)", borderColor: "var(--line)" }}
        role="status"
        aria-label="Loading course access"
      />
    );
  }

  // Active or Inactive Subscription Found
  if (subscription) {
    return (
      <section
        className="rounded-3xl border p-6 sm:p-7 text-[var(--ink)] shadow-sm space-y-5"
        style={{ background: "var(--white)", borderColor: "var(--line)" }}
      >
        <div className="flex items-center justify-between gap-3 border-b pb-4" style={{ borderColor: "var(--line)" }}>
          <div>
            <div className="eyebrow-tag text-[12px] mb-1">
              <CreditCard className="w-3.5 h-3.5" style={{ color: "var(--green)" }} />
              <span>ACTIVE LEARNING ACCESS</span>
            </div>
            <h2 className="mt-1 font-['Lexend'] text-lg sm:text-xl font-bold" style={{ color: "var(--ink)" }}>
              {subscription?.name || "Active Learning Package"}
            </h2>
          </div>
          <span
            className="rounded-full px-3 py-1.5 text-[12.5px] font-['Lexend'] font-bold border"
            style={{
              background: isActive ? "var(--green-subtle)" : "var(--yellow-soft)",
              color: isActive ? "var(--green)" : "var(--ink)",
              borderColor: isActive ? "var(--green)" : "var(--line)",
            }}
          >
            {isActive ? "Active Plan" : "Renewal Due"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-[13px] sm:text-sm">
          <div className="p-3.5 rounded-xl border" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <span className="block text-[12.5px] mb-1" style={{ color: "var(--ink-muted)" }}>Package Rate</span>
            <strong className="font-['Lexend'] text-sm font-bold" style={{ color: "var(--ink)" }}>
              {subscription?.price == null ? "Included" : `${subscription.price} ETB`}
            </strong>
          </div>
          <div className="p-3.5 rounded-xl border" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <span className="block text-[12.5px] mb-1" style={{ color: "var(--ink-muted)" }}>Access Status</span>
            <strong className="font-['Lexend'] text-sm font-bold" style={{ color: "var(--green)" }}>
              {isActive ? "Full Access Granted" : "Pending Verification"}
            </strong>
          </div>
          <div className="p-3.5 rounded-xl border col-span-2 sm:col-span-1" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <span className="block text-[12.5px] mb-1" style={{ color: "var(--ink-muted)" }}>Course Library</span>
            <strong className="font-['Lexend'] text-sm font-bold" style={{ color: "var(--ink)" }}>
              All Modules Unlocked
            </strong>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <NavLink
            to="/courses"
            className="btn-dark-hero text-[14px] py-2 px-5 inline-flex items-center gap-2"
            style={{ minHeight: "44px" }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Go to Video Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>

          {features.length > 0 && (
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
              className="text-[14px] font-['Lexend'] font-bold inline-flex items-center gap-1.5 px-2 py-2.5 min-h-[44px]"
              style={{ color: "var(--ink-secondary)" }}
            >
              <span>{isOpen ? "Hide Package Inclusions" : `View ${features.length} Package Benefits`}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
          )}
        </div>

        {isOpen && features.length > 0 && (
          <ul className="pt-3 border-t grid grid-cols-1 sm:grid-cols-2 gap-2" style={{ borderColor: "var(--line)" }}>
            {features.map((feature, index) => (
              <li
                key={feature.id || feature.name || index}
                className="flex items-center gap-2 text-[13.5px] p-3 rounded-xl border"
                style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--ink)" }}
              >
                <Check className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--green)" }} aria-hidden="true" />
                <span>{feature.name || feature}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  // Not subscribed: clean, elegant scholar card (NO marketing boilerplate!)
  return (
    <section
      className="rounded-3xl border p-6 sm:p-7 text-[var(--ink)] shadow-sm space-y-4"
      style={{ background: "var(--white)", borderColor: "var(--line)" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="eyebrow-tag text-[12px]">
            <BookOpen className="w-3.5 h-3.5" style={{ color: "var(--yellow)" }} />
            <span>SCHOLARSHIP TRACKS</span>
          </div>
          <h2 className="font-['Lexend'] text-lg sm:text-xl font-bold" style={{ color: "var(--ink)" }}>
            Select an Admissions Advisory Package
          </h2>
          <p className="text-[13px] sm:text-sm leading-relaxed max-w-xl" style={{ color: "var(--ink-secondary)" }}>
            Unlock 1-on-1 essay mentorship, comprehensive CSS Profile &amp; ISFAA packaging, and the complete video course library.
          </p>
        </div>

        <NavLink
          to="/packages"
          className="btn-dark-hero text-[14px] py-2.5 px-5 shrink-0 inline-flex items-center gap-2 self-start sm:self-center"
          style={{ minHeight: "44px" }}
        >
          <span>Explore Packages</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </NavLink>
      </div>

      <div
        className="p-3.5 rounded-2xl border flex items-center justify-between text-[13px]"
        style={{ background: "var(--green-subtle)", borderColor: "var(--line)" }}
      >
        <span className="flex items-center gap-2 font-medium" style={{ color: "var(--ink)" }}>
          <CheckCircle2 className="w-4 h-4" style={{ color: "var(--green)" }} />
          Free scholar account active · Video previews enabled
        </span>
        <NavLink to="/courses" className="btn-link-hero text-[13.5px] min-h-[44px] px-2 inline-flex items-center">
          Browse Library
        </NavLink>
      </div>
    </section>
  );
}
