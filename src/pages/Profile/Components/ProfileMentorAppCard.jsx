import { useNavigate } from "react-router";
import { useMyMentorApplication } from "../../../hooks/useMentorApplications";
import { FileText, ArrowRight, CheckCircle2, Clock, AlertCircle, Sparkles } from "lucide-react";

export default function ProfileMentorAppCard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data, isLoading, isError, error, refetch } = useMyMentorApplication();

  if (!token) return null;

  if (isLoading) {
    return (
      <div className="h-28 animate-pulse rounded-2xl bg-[var(--green-subtle)] border border-[var(--line)]" role="status" aria-label="Loading mentor application" />
    );
  }

  const noApplication = error?.response?.status === 404 || !data?.data;

  if (isError && !noApplication) {
    return (
      <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-6 text-[var(--ink)] shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[var(--yellow-soft)] text-[var(--yellow)] flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </span>
            <div>
              <strong className="font-['Lexend'] text-sm font-bold text-[var(--ink)]">Application status temporarily unavailable</strong>
              <p className="text-[13px] text-[var(--ink-muted)]">Your account is safe. Tap to retry loading status.</p>
            </div>
          </div>
          <button type="button" onClick={() => refetch()} className="public-button public-button-secondary text-[14px] px-4 py-2 min-h-[44px] inline-flex items-center justify-center">
            Try again
          </button>
        </div>
      </section>
    );
  }

  // No active application
  if (noApplication) {
    return (
      <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-6 sm:p-7 text-[var(--ink)] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-[var(--green-subtle)] text-[var(--green)] flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[12px] font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                <span>MENTOR PROGRAM</span>
              </div>
              <h2 className="font-['Lexend'] text-lg font-bold text-[var(--ink)]">Mentor application</h2>
              <p className="text-[13px] sm:text-sm text-[var(--ink-muted)] mt-1.5 max-w-md">
                You have no active application. Start one whenever you are ready.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="public-button public-button-primary text-[14px] px-5 py-2.5 min-h-[44px] shrink-0 inline-flex items-center gap-2 self-start sm:self-center"
            onClick={() => navigate("/mentor/apply")}
          >
            <span>Start application</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </section>
    );
  }

  // Active Application Found
  const app = data.data;
  const statusDisplay = (app.status || "under_review").replace("_", " ");

  return (
    <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-6 sm:p-7 text-[var(--ink)] shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[12px] font-['Lexend'] font-bold uppercase tracking-wider text-[var(--gold-ink)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ACTIVE APPLICATION</span>
          </div>
          <h2 className="mt-1 font-['Lexend'] text-lg sm:text-xl font-bold text-[var(--ink)]">
            Mentor Candidate Status
          </h2>
        </div>
        <span className="self-start sm:self-center rounded-full px-3 py-1.5 text-[12.5px] font-['Lexend'] font-bold capitalize bg-[var(--yellow-soft)] text-[var(--ink)] border border-[var(--line)]">
          {statusDisplay}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-[13px] sm:text-sm">
        <div className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
          <span className="text-[var(--ink-muted)] block text-[12.5px] mb-1">University</span>
          <strong className="font-['Lexend'] text-[13px] sm:text-sm font-bold text-[var(--ink)] break-words block">
            {app.university || "Under verification"}
          </strong>
        </div>
        <div className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
          <span className="text-[var(--ink-muted)] block text-[12.5px] mb-1">Program</span>
          <strong className="font-['Lexend'] text-[13px] sm:text-sm font-bold text-[var(--ink)] break-words block">
            {app.program || "Bachelor's"}
          </strong>
        </div>
        <div className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)] col-span-2 sm:col-span-1">
          <span className="text-[var(--ink-muted)] block text-[12.5px] mb-1">Starting Rate</span>
          <strong className="font-['Lexend'] text-[13px] sm:text-sm font-bold text-[var(--green)]">
            $15.00 / hour
          </strong>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-[13px] text-[var(--ink-muted)] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[var(--green)]" />
          <span>Our admin team reviews video responses within 48–72 hours.</span>
        </p>
        <button
          type="button"
          onClick={() => navigate("/mentor/apply")}
          className="public-button public-button-secondary text-[14px] px-4 py-2 min-h-[44px] inline-flex items-center gap-1.5"
        >
          <span>Update Application</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </section>
  );
}
