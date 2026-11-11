import { Phone, Send, Calendar, Tag } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function PackageStep1Personal({ formData, handleChange, errors }) {
  return (
    <div className="pkgw-stepbody">
      <div className="pkgw-stephead">
        <div className="pkgw-eyebrow">STEP 1 OF 4</div>
        <h2 className="pkgw-steptitle">Personal Information</h2>
        <p className="pkgw-stepintro">
          Start with your primary contact details so your dedicated advisor can
          reach you.
        </p>
      </div>

      <div className="pkgw-grid2">
        <div className="pkgw-field">
          <Label className="pkgw-label">Phone Number *</Label>
          <div className="pkgw-inputwrap">
            <Phone className="pkgw-input-icon" />
            <Input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="pkgw-input pkgw-input--pl"
              placeholder="+251 91 234 5678"
            />
          </div>
          {errors?.phone && <p className="pkgw-error">{errors.phone}</p>}
          <span className="pkgw-helper">
            Used by your mentor for SMS and initial WhatsApp verification.
          </span>
        </div>

        <div className="pkgw-field">
          <Label className="pkgw-label">Telegram Username *</Label>
          <div className="pkgw-inputwrap">
            <Send className="pkgw-input-icon" />
            <Input
              value={formData.telegram}
              onChange={(e) => handleChange("telegram", e.target.value)}
              className="pkgw-input pkgw-input--pl"
              placeholder="@username"
            />
          </div>
          {errors?.telegram && <p className="pkgw-error">{errors.telegram}</p>}
          <span className="pkgw-helper">
            Primary messaging channel for daily essay &amp; application coaching.
          </span>
        </div>

        <div className="pkgw-field">
          <Label className="pkgw-label">Date of Birth *</Label>
          <div className="pkgw-inputwrap">
            <Calendar className="pkgw-input-icon" />
            <Input
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="pkgw-input pkgw-input--pl"
            />
          </div>
          {errors?.dob && <p className="pkgw-error">{errors.dob}</p>}
          <span className="pkgw-helper">
            Confirms your university application cohort and scholarship
            eligibility.
          </span>
        </div>

        <div className="pkgw-field">
          <Label className="pkgw-label">Referral / Offer Code (Optional)</Label>
          <div className="pkgw-inputwrap">
            <Tag className="pkgw-input-icon" />
            <Input
              value={formData.referral}
              onChange={(e) => handleChange("referral", e.target.value)}
              className="pkgw-input pkgw-input--pl"
              placeholder="e.g. EthioNew1212"
            />
          </div>
          <span className="pkgw-helper">
            The 50% package offer is automatic. <strong>EthioNew1212</strong>{" "}
            provides an additional 5% discount on the reduced price.
          </span>
        </div>
      </div>
    </div>
  );
}
