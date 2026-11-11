import { useState } from "react";
import { Check, ChevronDown, CreditCard } from "lucide-react";

const UserSubscriptionCard = ({ subscription }) => {
  const [isOpen, setIsOpen] = useState(false);
  const features = Array.isArray(subscription?.features) ? subscription.features : [];
  const isActive = subscription?.is_active === true;

  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6 text-[var(--ink)] shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="public-eyebrow">COURSE ACCESS</p>
          <h2 className="mt-1 font-['Lexend'] text-lg font-bold">Learning package</h2>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--green-subtle)] text-[var(--green)]">
          <CreditCard className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <dl className="grid gap-3 text-sm">
        <div className="flex items-start justify-between gap-4">
          <dt className="text-[var(--ink-muted)]">Current plan</dt>
          <dd className="text-right font-semibold">{subscription?.name || "Course package"}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-[var(--ink-muted)]">Price</dt>
          <dd className="text-right font-semibold">
            {subscription?.price == null ? "—" : `${subscription.price} birr`}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[var(--ink-muted)]">Status</dt>
          <dd
            className={`rounded-full px-3 py-1.5 text-[12.5px] font-semibold ${
              isActive
                ? "bg-[var(--green-subtle)] text-[var(--green)]"
                : "bg-[var(--yellow-soft)] text-[var(--ink-secondary)]"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </dd>
        </div>
      </dl>

      {features.length > 0 && (
        <div className="mt-5 border-t border-[var(--line)] pt-4">
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="flex min-h-11 w-full items-center justify-between gap-3 text-left text-sm font-semibold text-[var(--ink-secondary)]"
          >
            <span>Included benefits ({features.length})</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
          {isOpen && (
            <ul className="mt-3 grid gap-2">
              {features.map((feature, index) => (
                <li key={feature.id || feature.name || index} className="flex gap-2 text-sm text-[var(--ink-secondary)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--green)]" aria-hidden="true" />
                  <span>{feature.name || feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default UserSubscriptionCard;
