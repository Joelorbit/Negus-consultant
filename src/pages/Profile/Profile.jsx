import { useNavigate, NavLink } from "react-router";
import { ArrowRight } from "lucide-react";
import { useLogout, useMe } from "../../hooks/useAuth";
import { useSubscriptionById } from "../../hooks/useSubscriptions";

import ProfileHeader from "./Components/ProfileHeader";
import ProfileIdentityCard from "./Components/ProfileIdentityCard";
import ProfileCourseAccessCard from "./Components/ProfileCourseAccessCard";
import ProfileMentorSection from "./Components/ProfileMentorSection";
import ProfileReferralCard from "./Components/ProfileReferralCard";
import ProfileSupportCard from "./Components/ProfileSupportCard";
import "../public-pages.css";

export default function Profile() {
  const { data: user, isLoading, error } = useMe();
  const { data: subscription, isLoading: isSubscriptionLoading } = useSubscriptionById(user?.id);
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <main className="grid min-h-[65vh] place-items-center bg-[var(--paper)] px-4 text-[var(--ink)]">
        <div className="flex flex-col items-center gap-3" role="status" aria-label="Loading profile">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--green)] border-t-transparent" />
          <p className="font-['Lexend'] text-[13px] font-semibold text-[var(--ink-muted)]">
            Loading your scholar profile…
          </p>
        </div>
      </main>
    );
  }

  if (!user || error) {
    return (
      <main className="grid min-h-[65vh] place-items-center bg-[var(--paper)] px-4 text-[var(--ink)]">
        <section
          className="w-full max-w-md rounded-3xl border p-8 text-center shadow-sm space-y-4"
          style={{ background: "var(--white)", borderColor: "var(--line)" }}
        >
          <div className="eyebrow-tag text-[12px] justify-center">AUTHENTICATION REQUIRED</div>
          <h1 className="font-['Lexend'] text-2xl font-bold" style={{ color: "var(--ink)", margin: 0 }}>
            Sign in to view your profile
          </h1>
          <p className="text-[13px] sm:text-sm leading-relaxed" style={{ color: "var(--ink-secondary)", margin: 0 }}>
            Your scholarship roadmap, package admissions files, and mentor application are available after signing in.
          </p>
          <NavLink
            to="/login"
            state={{ from: "/profile" }}
            className="btn-dark-hero text-[14px] py-2.5 px-6 min-h-[44px] inline-flex items-center gap-2 justify-center w-full"
          >
            <span>Sign in to Account</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </NavLink>
        </section>
      </main>
    );
  }

  const handleLogout = () => {
    logout(undefined, { onSettled: () => navigate("/login", { replace: true }) });
  };

  const hasSubscription = Boolean(subscription?.subscription_status || user.subscription_status);
  const progressSteps = [
    { label: "Account created", complete: true },
    { label: "Choose a learning or support path", complete: hasSubscription || Boolean(user.package_id) },
    { label: "Submit your application details", complete: Boolean(user.application_status) },
    { label: "Track review and next actions", complete: false },
  ];
  const nextStep = progressSteps.find((step) => !step.complete)?.label || "Review your latest updates";

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      <div style={{ maxWidth: "1060px", margin: "0 auto", width: "100%" }} className="profile-stage space-y-7">
        {/* 1. Scholar Header */}
        <ProfileHeader
          user={user}
          handleLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />

        {/* 2. Top Identity Card */}
        <ProfileIdentityCard user={user} />

        <section
          aria-labelledby="profile-next-step"
          className="rounded-3xl border p-6 shadow-sm"
          style={{ background: "var(--green-subtle)", borderColor: "var(--line)", color: "var(--ink)" }}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow-tag" style={{ color: "var(--gold-ink)", marginBottom: "10px" }}>YOUR ROADMAP</p>
              <h2 id="profile-next-step" className="font-['Lexend'] text-xl font-bold" style={{ margin: 0, color: "var(--ink)" }}>
                Next: {nextStep}
              </h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-secondary)", marginBottom: 0 }}>
                Your account keeps your course access, applications, payment reviews, and mentor actions together.
              </p>
            </div>
            <NavLink
              to={hasSubscription ? "/courses" : "/packages"}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold"
              style={{ background: "var(--ink)", color: "var(--paper)", whiteSpace: "nowrap" }}
            >
              {hasSubscription ? "Continue learning" : "Choose your path"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </NavLink>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-4">
            {progressSteps.map((step) => (
              <div key={step.label} className="flex items-center gap-2 text-xs font-semibold" style={{ color: step.complete ? "var(--ink)" : "var(--ink-muted)" }}>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border" style={{ borderColor: step.complete ? "var(--yellow)" : "var(--line-strong)", background: step.complete ? "var(--yellow-soft)" : "transparent" }}>
                  {step.complete ? "✓" : "·"}
                </span>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 2-Column Responsive Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Column (7 cols): Learning Access + Mentorship Center */}
          <div className="lg:col-span-7 space-y-6">
            <ProfileCourseAccessCard
              subscription={subscription}
              isLoading={isSubscriptionLoading}
            />

            <ProfileMentorSection user={user} />
          </div>

          {/* Sidebar Column (5 cols): Referral Rewards + Support Desk */}
          <div className="lg:col-span-5 space-y-6">
            <ProfileReferralCard user={user} />

            <ProfileSupportCard />
          </div>
        </div>
      </div>
    </main>
  );
}
