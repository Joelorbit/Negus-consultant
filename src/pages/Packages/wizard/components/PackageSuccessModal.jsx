import { CheckCircle2 } from "lucide-react";
import { NavLink } from "react-router";

export default function PackageSuccessModal({ packageName }) {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] flex items-center justify-center p-5 sm:p-6 font-['Outfit']">
      <div className="max-w-md w-full bg-[var(--white)] rounded-3xl border border-[var(--line)] p-7 sm:p-9 text-center shadow-lg relative">
        <div className="w-16 h-16 rounded-full bg-[var(--green-soft)] text-[var(--ink)] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="font-['Lexend'] text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-3 leading-tight">
          Application Submitted! 🎉
        </h2>
        <p className="text-[14.5px] text-[var(--ink-secondary)] leading-relaxed mb-7">
          Your application for <strong>{packageName || "your package"}</strong> has been received. Our senior advisory team will contact you on Telegram within 24 hours to begin onboarding.
        </p>
        <div className="flex flex-col gap-3">
          <NavLink
            to="/profile"
            className="public-button public-button-primary w-full text-center"
            style={{ minHeight: "48px", fontSize: "14.5px" }}
          >
            View Application in Profile
          </NavLink>
          <NavLink
            to="/packages"
            className="public-button public-button-secondary w-full text-center"
            style={{ minHeight: "48px", fontSize: "14.5px" }}
          >
            Back to Packages
          </NavLink>
        </div>
      </div>
    </main>
  );
}
