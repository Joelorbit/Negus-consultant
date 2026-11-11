import { Check } from "lucide-react";

export default function PackageStepTracker({ steps, currentStep }) {
  return (
    <div className="pkgw-tracker">
      <div className="pkgw-tracker-bar">
        {steps.map((s) => (
          <span
            key={s.number}
            className={currentStep >= s.number ? "is-active" : ""}
          />
        ))}
      </div>

      <div className="pkgw-tracker-tabs">
        {steps.map((s) => {
          const isCurrent = currentStep === s.number;
          const isDone = currentStep > s.number;

          return (
            <div
              key={s.number}
              className={`pkgw-tracker-tab${isCurrent ? " is-current" : ""}${
                isDone ? " is-done" : ""
              }`}
            >
              <span className="pkgw-tracker-num">
                {isDone ? <Check className="w-4 h-4" /> : <span>{s.number}</span>}
              </span>
              <span className="pkgw-tracker-text">
                <span className="pkgw-tracker-step">Step {s.number}</span>
                <strong className="pkgw-tracker-title">{s.title}</strong>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
