import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

export default function ProfileSupportCard() {
  return (
    <section
      className="rounded-3xl border p-6 sm:p-7 text-[var(--ink)] shadow-sm space-y-4"
      style={{ background: "var(--white)", borderColor: "var(--line)" }}
    >
      <div className="border-b pb-4" style={{ borderColor: "var(--line)" }}>
        <div className="eyebrow-tag text-[12px] mb-1">
          <Phone className="w-3.5 h-3.5" style={{ color: "var(--green)" }} />
          <span>ADVISORY SUPPORT</span>
        </div>
        <h2 className="mt-1 font-['Lexend'] text-lg font-bold" style={{ color: "var(--ink)" }}>
          Direct Contact Desk
        </h2>
        <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-secondary)" }}>
          Reach your scholarship advisors directly for package onboarding and urgent questions.
        </p>
      </div>

      <div className="space-y-2.5 text-[13px]">
        <a
          href="https://t.me/negushelpcenter"
          target="_blank"
          rel="noreferrer"
          className="p-3 min-h-[44px] rounded-xl border flex items-center justify-between transition-colors hover:border-[var(--green)]"
          style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--ink)" }}
        >
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-4 h-4" style={{ color: "var(--green)" }} />
            <div>
              <strong className="block font-['Lexend']">Telegram Desk</strong>
              <span className="text-[12.5px]" style={{ color: "var(--ink-muted)" }}>@negushelpcenter</span>
            </div>
          </div>
          <span className="font-bold text-[12.5px]" style={{ color: "var(--green)" }}>Chat Live →</span>
        </a>

        <div
          className="p-3 rounded-xl border flex items-center justify-between"
          style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--ink)" }}
        >
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4" style={{ color: "var(--yellow)" }} />
            <div>
              <strong className="block font-['Lexend']">Primary Advisory Line</strong>
              <span className="text-[12.5px]" style={{ color: "var(--ink-muted)" }}>+251 964 730 248 · +251 943 041 418</span>
            </div>
          </div>
          <span className="text-[12px] font-bold px-3 py-1.5 rounded-full" style={{ background: "var(--green-soft)", color: "var(--green)" }}>
            Mon–Sat
          </span>
        </div>

        <div
          className="p-3 rounded-xl border flex items-center gap-2.5"
          style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--ink)" }}
        >
          <MapPin className="w-4 h-4 shrink-0" style={{ color: "var(--ink-muted)" }} />
          <div className="text-[13px]" style={{ color: "var(--ink-secondary)" }}>
            <strong className="block font-['Lexend']" style={{ color: "var(--ink)" }}>Addis Ababa Center</strong>
            <span>In-person &amp; remote strategic advising available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
