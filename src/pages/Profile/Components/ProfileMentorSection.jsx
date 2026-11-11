import { useNavigate } from "react-router";
import { useMyMentorApplication } from "../../../hooks/useMentorApplications";
import { Users, FileText, ArrowRight, CheckCircle2, Clock, AlertCircle, Sparkles } from "lucide-react";
import MentorProfileEditor from "../../Mentors/MentorProfileEditor";

export default function ProfileMentorSection({ user }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data, isLoading, error } = useMyMentorApplication();

  const isMentorOrAdmin = ["mentor", "admin", "semiadmin"].includes(user?.role);

  // If user is already a mentor or admin, render their profile editor
  if (isMentorOrAdmin) {
    return <MentorProfileEditor />;
  }

  if (!token) return null;

  if (isLoading) {
    return (
      <div
        className="h-28 animate-pulse rounded-3xl border"
        style={{ background: "var(--green-subtle)", borderColor: "var(--line)" }}
        role="status"
        aria-label="Loading mentor status"
      />
    );
  }

  const noApplication = error?.response?.status === 404 || !data?.data;

  // Active Application Found
  if (!noApplication && data?.data) {
    const app = data.data;
    const statusDisplay = (app.status || "under_review").replace("_", " ");

    return (
      <section
        className="rounded-3xl border p-6 sm:p-7 text-[var(--ink)] shadow-sm space-y-4"
        style={{ background: "var(--white)", borderColor: "var(--line)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--line)" }}>
          <div>
            <div className="eyebrow-tag text-[12px]">
              <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--yellow)" }} />
              <span>MENTOR CANDIDATE</span>
            </div>
            <h2 className="mt-1 font-['Lexend'] text-lg sm:text-xl font-bold" style={{ color: "var(--ink)" }}>
              Mentor Application Status
            </h2>
          </div>
          <span
            className="self-start sm:self-center rounded-full px-3 py-1.5 text-[12.5px] font-['Lexend'] font-bold capitalize border"
            style={{
              background: "var(--yellow-soft)",
              color: "var(--ink)",
              borderColor: "var(--line)",
            }}
          >
            {statusDisplay}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-[13px] sm:text-sm">
          <div className="p-3.5 rounded-xl border" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <span className="block text-[12.5px] mb-1" style={{ color: "var(--ink-muted)" }}>Affiliated Institution</span>
            <strong className="font-['Lexend'] text-[13px] sm:text-sm font-bold break-words block" style={{ color: "var(--ink)" }}>
              {app.university || "Under verification"}
            </strong>
          </div>
          <div className="p-3.5 rounded-xl border" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <span className="block text-[12.5px] mb-1" style={{ color: "var(--ink-muted)" }}>Submitted Timeline</span>
            <strong className="font-['Lexend'] text-[13px] sm:text-sm font-bold block" style={{ color: "var(--ink)" }}>
              {app.created_at ? new Date(app.created_at).toLocaleDateString() : "Recent"}
            </strong>
          </div>
          <div className="p-3.5 rounded-xl border col-span-2 sm:col-span-1" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <span className="block text-[12.5px] mb-1" style={{ color: "var(--ink-muted)" }}>Interview Stage</span>
            <strong className="font-['Lexend'] text-[13px] sm:text-sm font-bold block" style={{ color: "var(--green)" }}>
              Admissions Review
            </strong>
          </div>
        </div>

        <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
          Our advisory directors review applicant backgrounds weekly. You will receive a direct notification via Telegram for your onboarding interview.
        </p>
      </section>
    );
  }

  // Single clean mentor invite card when NO application exists
  return (
    <section
      className="rounded-3xl border p-6 sm:p-7 text-[var(--ink)] shadow-sm"
      style={{ background: "var(--white)", borderColor: "var(--line)" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="eyebrow-tag text-[12px]">
            <Users className="w-3.5 h-3.5" style={{ color: "var(--green)" }} />
            <span>MENTOR NETWORK</span>
          </div>
          <h2 className="font-['Lexend'] text-lg sm:text-xl font-bold" style={{ color: "var(--ink)" }}>
            Guide Future Scholars Abroad
          </h2>
          <p className="text-[13px] sm:text-sm leading-relaxed max-w-xl" style={{ color: "var(--ink-secondary)" }}>
            Are you an Ethiopian scholar studying or graduated from a top international university? Apply to join our paid mentor network and mentor students remotely.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/mentor/apply")}
          className="btn-dark-hero text-[14px] py-2.5 px-5 shrink-0 inline-flex items-center gap-2 self-start sm:self-center"
          style={{ minHeight: "44px" }}
        >
          <span>Apply as Mentor</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
