import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { NavLink } from "react-router";

export default function AboutCenterCard() {
  return (
    <section className="public-content public-about-office pt-4 pb-16">
      <div className="p-8 sm:p-12 rounded-3xl bg-[var(--white)] border border-[var(--line)] shadow-md text-center max-w-4xl mx-auto space-y-8">
        <div className="w-14 h-14 rounded-2xl bg-[var(--yellow-soft)] text-[var(--gold-ink)] flex items-center justify-center mx-auto shadow-xs">
          <MapPin className="w-7 h-7" />
        </div>

        <div>
          <h3 className="font-['Lexend'] font-bold text-2xl sm:text-3xl text-[var(--ink)]">
            Visit Our Advisory Center in Addis Ababa
          </h3>
          <p className="text-[13px] sm:text-sm text-[var(--ink-secondary)] max-w-xl mx-auto mt-3 leading-relaxed">
            We conduct one-on-one strategy sessions both in person at our Addis Ababa headquarters and remotely for scholars across Ethiopia and the diaspora.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 text-left">
          <div className="p-5 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
            <span className="text-[12px] font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
              Primary Phone
            </span>
            <strong className="font-['Lexend'] text-[13px] sm:text-sm font-bold text-[var(--ink)] inline-flex min-h-11 items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[var(--green)]" /> +251 964 730 248
            </strong>
          </div>

          <div className="p-5 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
            <span className="text-[12px] font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
              Alternative Line
            </span>
            <strong className="font-['Lexend'] text-[13px] sm:text-sm font-bold text-[var(--ink)] inline-flex min-h-11 items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[var(--gold-ink)]" /> +251 943 041 418
            </strong>
          </div>

          <div className="p-5 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
            <span className="text-[12px] font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
              Telegram Desk
            </span>
            <a
              href="https://t.me/negushelpcenter"
              target="_blank"
              rel="noreferrer"
              className="font-['Lexend'] text-[13px] sm:text-sm font-bold text-[var(--ink)] inline-flex min-h-11 items-center gap-1.5 hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" /> @negushelpcenter
            </a>
          </div>

          <div className="p-5 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
            <span className="text-[12px] font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
              Email Desk
            </span>
            <a
              href="mailto:contact@negusconsultants.com"
              className="font-['Lexend'] text-[13px] sm:text-sm font-bold text-[var(--ink)] hover:underline inline-flex min-h-11 items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 shrink-0 text-[var(--ink-muted)]" />
              <span className="break-all">contact@negusconsultants.com</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href="https://t.me/negushelpcenter"
            target="_blank"
            rel="noreferrer"
            className="public-button public-button-primary text-[14px] min-h-11 px-6 py-3 inline-flex items-center gap-2"
          >
            <span>Connect on Telegram</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <NavLink
            to="/packages"
            className="public-button public-button-secondary text-[14px] min-h-11 px-6 py-3 inline-flex items-center gap-2"
          >
            <span>Get started</span>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
