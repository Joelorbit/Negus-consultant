import { School, Award, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function PackageStep2Academic({
  formData,
  handleChange,
  toggleTest,
  setTranscriptFile,
  setMatricFile,
  isPackageTrack,
  errors,
}) {
  const academicOptions = [
    { title: "High-School G-12 Student", sub: "Currently graduating or entering senior year" },
    { title: "High-School Graduate (Gap Year)", sub: "Preparing full-time for international scholarships" },
    { title: "University 1st Year", sub: "Transfer or freshman scholarship applicant" },
    { title: "University 2nd Year+", sub: "Undergraduate transfer or study abroad applicant" },
  ];

  return (
    <div className="pkgw-stepbody">
      <div className="pkgw-stephead">
        <div className="pkgw-eyebrow">STEP 2 OF 4</div>
        <h2 className="pkgw-steptitle">Academic Background</h2>
        <p className="pkgw-stepintro">
          Tell us about your educational background and standardized testing
          status.
        </p>
      </div>

      <div className="pkgw-fieldgroup">
        <div className="pkgw-field">
          <Label className="pkgw-label">Current Academic Status *</Label>
          <div className="pkgw-grid2">
            {academicOptions.map((opt) => {
              const isSelected = formData.academicStatus === opt.title;
              return (
                <div
                  key={opt.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleChange("academicStatus", opt.title)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleChange("academicStatus", opt.title);
                    }
                  }}
                  className={`pkgw-choice${isSelected ? " is-selected" : ""}`}
                >
                  <span className="pkgw-choice-body">
                    <strong className="pkgw-choice-title">{opt.title}</strong>
                    <span className="pkgw-choice-sub">{opt.sub}</span>
                  </span>
                  <span className="pkgw-choice-radio">
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </span>
                </div>
              );
            })}
          </div>
          {errors?.academicStatus && (
            <p className="pkgw-error">{errors.academicStatus}</p>
          )}
        </div>

        <div className="pkgw-grid2">
          <div className="pkgw-field">
            <Label className="pkgw-label">School / University Name *</Label>
            <div className="pkgw-inputwrap">
              <School className="pkgw-input-icon" />
              <Input
                value={formData.school}
                onChange={(e) => handleChange("school", e.target.value)}
                className="pkgw-input pkgw-input--pl"
                placeholder="e.g. St. Joseph School / AAU"
              />
            </div>
            {errors?.school && <p className="pkgw-error">{errors.school}</p>}
          </div>

          <div className="pkgw-field">
            <Label className="pkgw-label">Cumulative GPA *</Label>
            <div className="pkgw-inputwrap">
              <Award className="pkgw-input-icon" />
              <Input
                value={formData.gpa}
                onChange={(e) => handleChange("gpa", e.target.value)}
                className="pkgw-input pkgw-input--pl"
                placeholder="e.g. 3.9 / 4.0 or 95%"
              />
            </div>
            {errors?.gpa && <p className="pkgw-error">{errors.gpa}</p>}
          </div>
        </div>

        {isPackageTrack && (
          <div className="pkgw-section">
            <div className="pkgw-eyebrow">DOCUMENT VERIFICATION</div>
            <div className="pkgw-grid2">
              <div className="pkgw-field">
                <Label className="pkgw-label">High School Transcript (Image) *</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setTranscriptFile(e.target.files?.[0])}
                  className="pkgw-input pkgw-input--file"
                />
                {errors?.transcript && (
                  <p className="pkgw-error">{errors.transcript}</p>
                )}
              </div>

              <div className="pkgw-field">
                <Label className="pkgw-label">Matric Certificate (Image) *</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setMatricFile(e.target.files?.[0])}
                  className="pkgw-input pkgw-input--file"
                />
                {errors?.matricCertificate && (
                  <p className="pkgw-error">{errors.matricCertificate}</p>
                )}
              </div>

              <div className="pkgw-field">
                <Label className="pkgw-label">National Exam Score (Optional)</Label>
                <Input
                  value={formData.examScore}
                  onChange={(e) => handleChange("examScore", e.target.value)}
                  className="pkgw-input"
                  placeholder="e.g. 520 / 600"
                />
              </div>

              <div className="pkgw-field">
                <Label className="pkgw-label">Class Rank (Optional)</Label>
                <Input
                  value={formData.classRank}
                  onChange={(e) => handleChange("classRank", e.target.value)}
                  className="pkgw-input"
                  placeholder="e.g. Top 5%"
                />
              </div>
            </div>
          </div>
        )}

        <div className="pkgw-field">
          <Label className="pkgw-label">
            Standardized Tests Taken or Planning to Take
          </Label>
          <div className="pkgw-chiprow">
            {["SAT", "ACT", "TOEFL", "IELTS", "Duolingo", "None"].map((test) => {
              const isChecked = formData.tests?.includes(test);
              return (
                <button
                  key={test}
                  type="button"
                  onClick={() => toggleTest(test)}
                  aria-pressed={isChecked}
                  className={`pkgw-chip${isChecked ? " is-selected" : ""}`}
                >
                  {test}
                </button>
              );
            })}
          </div>
          <Input
            value={formData.scores}
            onChange={(e) => handleChange("scores", e.target.value)}
            className="pkgw-input pkgw-scores"
            placeholder="Specify your test scores if already received (e.g. SAT: 1480, IELTS: 8.0)"
          />
        </div>
      </div>
    </div>
  );
}
