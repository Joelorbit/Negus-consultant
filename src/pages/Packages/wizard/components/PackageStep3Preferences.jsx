import { FileText, Compass, DollarSign, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function PackageStep3Preferences({ formData, handleChange, errors }) {
  const efcQuickOptions = [
    { label: "$0 (100% Full Need)", val: "$0 (100% Full Need / Zero EFC)" },
    { label: "< $2,000 / year", val: "Under $2,000 / year" },
    { label: "$2,000 – $5,000 / year", val: "$2,000 - $5,000 / year" },
    { label: "$5,000+ / year", val: "Above $5,000 / year" },
  ];

  return (
    <div className="pkgw-stepbody">
      <div className="pkgw-stephead">
        <div className="pkgw-eyebrow">STEP 3 OF 4</div>
        <h2 className="pkgw-steptitle">Target Universities &amp; Financial Aid</h2>
        <p className="pkgw-stepintro">
          Help us tailor your admissions strategy, CSS Profile, and
          institutional aid matching.
        </p>
      </div>

      <div className="pkgw-directory">
        <div className="pkgw-directory-copy">
          <div className="pkgw-directory-title">
            <span className="pkgw-directory-dot" />
            <strong>Curated Scholarship University Directory (2025/2026)</strong>
          </div>
          <p className="pkgw-directory-sub">
            Explore our vetted list of universities offering 100% need-met aid
            for Ethiopian and international applicants.
          </p>
        </div>
        <a
          href="/universitie_list.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="pkgw-directory-link"
        >
          <FileText className="w-4 h-4" />
          <span>View Directory PDF</span>
        </a>
      </div>

      <div className="pkgw-fieldgroup">
        <div className="pkgw-field">
          <Label className="pkgw-label">Top 3 University Choices *</Label>
          <div className="pkgw-inputwrap">
            <Compass className="pkgw-input-icon" />
            <Input
              value={formData.topUniversities}
              onChange={(e) => handleChange("topUniversities", e.target.value)}
              className="pkgw-input pkgw-input--pl"
              placeholder="e.g. Georgetown, Williams College, NYU Abu Dhabi, Drexel"
            />
          </div>
          {errors?.topUniversities && (
            <p className="pkgw-error">{errors.topUniversities}</p>
          )}
          <span className="pkgw-helper">
            List colleges you are most interested in. Our advisors will balance
            your reach, target, and likely list.
          </span>
        </div>

        <div className="pkgw-field">
          <Label className="pkgw-label">Expected Family Contribution (EFC) per Year</Label>
          <div className="pkgw-pillgrid">
            {efcQuickOptions.map((opt) => {
              const isSelected = formData.familyContribution === opt.val;
              return (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => handleChange("familyContribution", opt.val)}
                  aria-pressed={isSelected}
                  className={`pkgw-pill${isSelected ? " is-selected" : ""}`}
                >
                  <span className="pkgw-pill-label">{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="pkgw-inputwrap">
            <DollarSign className="pkgw-input-icon" />
            <Input
              value={formData.familyContribution}
              onChange={(e) => handleChange("familyContribution", e.target.value)}
              className="pkgw-input pkgw-input--pl"
              placeholder="Or enter custom amount (e.g. $0 or $1,500/year)"
            />
          </div>
          <span className="pkgw-helper">
            Crucial for ISFAA, CSS Profile, and determining whether you require
            100% full-ride funding or partial merit grants.
          </span>
        </div>
      </div>
    </div>
  );
}
