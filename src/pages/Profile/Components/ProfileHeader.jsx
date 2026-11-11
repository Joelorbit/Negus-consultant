import { NavLink } from "react-router";
import { BookOpen, Package, LogOut, Sparkles, Compass } from "lucide-react";

export default function ProfileHeader({ user, handleLogout, isLoggingOut }) {
  const firstName = user?.first_name || "";
  const displayName = firstName ? `, ${firstName}` : "";

  return (
    <header className="flex flex-col justify-between gap-5 border-b pb-6 md:flex-row md:items-end" style={{ borderColor: "var(--line)" }}>
      <div className="space-y-1.5">
        <div className="eyebrow-tag text-[12px]">
          <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--yellow)" }} />
          <span>YOUR NEGUS SCHOLAR ACCOUNT</span>
        </div>
        <h1
          className="font-['Lexend'] text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{ color: "var(--ink)", margin: 0 }}
        >
          Welcome back{displayName}.
        </h1>
        <p className="max-w-xl text-[13px] sm:text-sm leading-relaxed" style={{ color: "var(--ink-secondary)", margin: 0 }}>
          Track your scholarship application milestones, enrolled courses, and mentorship from one centralized scholar portal.
        </p>
      </div>

      <nav className="flex flex-wrap items-center gap-2.5" aria-label="Account shortcuts">
        <NavLink
          to="/courses"
          className="px-4 py-2 min-h-[44px] rounded-xl border text-[14px] font-['Lexend'] font-bold inline-flex items-center gap-1.5 transition-colors"
          style={{
            background: "var(--white)",
            borderColor: "var(--line)",
            color: "var(--ink)",
          }}
        >
          <BookOpen className="w-3.5 h-3.5" style={{ color: "var(--green)" }} />
          <span>Browse Courses</span>
        </NavLink>
        <NavLink
          to="/packages"
          className="px-4 py-2 min-h-[44px] rounded-xl border text-[14px] font-['Lexend'] font-bold inline-flex items-center gap-1.5 transition-colors"
          style={{
            background: "var(--white)",
            borderColor: "var(--line)",
            color: "var(--ink)",
          }}
        >
          <Package className="w-3.5 h-3.5" style={{ color: "var(--yellow)" }} />
          <span>Packages</span>
        </NavLink>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="px-4 py-2 min-h-[44px] rounded-xl border text-[14px] font-['Lexend'] font-bold inline-flex items-center gap-1.5 transition-colors hover:text-red-600 hover:border-red-300"
          style={{
            background: "var(--white)",
            borderColor: "var(--line)",
            color: "var(--ink-muted)",
            cursor: "pointer",
          }}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isLoggingOut ? "Signing out…" : "Sign out"}</span>
        </button>
      </nav>
    </header>
  );
}
