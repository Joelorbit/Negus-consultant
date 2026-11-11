import { useState } from "react";
import { Check, Copy, Gift, Sparkles, Tag } from "lucide-react";

export default function ProfileReferralCard({ user }) {
  const [copied, setCopied] = useState(false);

  if (!user?.referral_code) return null;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(user.referral_code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
    }
  };

  const creditAmount = Number(user?.credit || 0).toLocaleString();

  return (
    <section
      className="rounded-3xl border p-6 sm:p-7 text-[var(--ink)] shadow-sm space-y-4"
      style={{ background: "var(--white)", borderColor: "var(--line)" }}
    >
      <div className="flex items-center justify-between gap-3 border-b pb-4" style={{ borderColor: "var(--line)" }}>
        <div>
          <div className="eyebrow-tag text-[12px] mb-1">
            <Gift className="w-3.5 h-3.5" style={{ color: "var(--yellow)" }} />
            <span>REFERRAL EARNINGS</span>
          </div>
          <h2 className="mt-1 font-['Lexend'] text-lg font-bold" style={{ color: "var(--ink)" }}>
            Invite Ambitious Scholars
          </h2>
        </div>
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border"
          style={{ background: "var(--yellow-soft)", color: "var(--yellow)", borderColor: "var(--line)" }}
        >
          <Gift className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-secondary)" }}>
        Share your unique scholarship code. Your invited friends receive an immediate 5% discount on packages, and you earn direct Birr credit.
      </p>

      <div className="space-y-2.5">
        <div
          className="flex items-center justify-between rounded-xl border px-3.5 py-2.5"
          style={{ background: "var(--paper)", borderColor: "var(--line)" }}
        >
          <span className="font-mono text-sm font-bold tracking-wider" style={{ color: "var(--ink)" }}>
            {user.referral_code}
          </span>
          <span
            className="text-[12px] font-['Lexend'] font-bold px-3 py-1.5 rounded-full"
            style={{ background: "var(--green-soft)", color: "var(--green)" }}
          >
            5% Student Discount
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="btn-dark-hero text-[14px] py-2 px-4 w-full justify-center"
          style={{ minHeight: "44px", cursor: "pointer" }}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Referral Code</span>
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between border-t pt-4 text-[13px]" style={{ borderColor: "var(--line)" }}>
        <span style={{ color: "var(--ink-muted)" }}>Accumulated Credit:</span>
        <strong className="font-['Lexend'] text-sm font-extrabold" style={{ color: "var(--green)" }}>
          {creditAmount} ETB
        </strong>
      </div>
    </section>
  );
}
