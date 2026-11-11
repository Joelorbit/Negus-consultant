import { Copy, CheckCircle2, ShieldCheck } from "lucide-react";
import ScreenshotUploader from "../../../Package/components/ScreenShotUploader";

export default function PackageStep4Payment({
  priceBreakdown,
  bankDetails,
  handleCopyAccount,
  copiedBankIndex,
  screenshot,
  setScreenshot,
  errors,
}) {
  return (
    <div className="pkgw-stepbody">
      <div className="pkgw-stephead">
        <div className="pkgw-eyebrow">STEP 4 OF 4</div>
        <h2 className="pkgw-steptitle">Payment &amp; Final Confirmation</h2>
        <p className="pkgw-stepintro">
          Transfer via CBE or Telebirr and upload your receipt screenshot to
          confirm your advisor placement.
        </p>
      </div>

      {priceBreakdown && (
        <div className="pkgw-section pkgw-section--tint pkgw-price">
          <div className="pkgw-price-row">
            <span>Standard Package Tuition:</span>
            <span className="pkgw-price-was">
              ETB {priceBreakdown.listPrice?.toLocaleString()}
            </span>
          </div>

          {priceBreakdown.offerSaving > 0 && (
            <div className="pkgw-price-row pkgw-price-strong">
              <span className="pkgw-price-label">
                <span className="pkgw-price-dot" style={{ background: "var(--ink-secondary)" }} />
                Automatic 50% Scholarship Reduction:
              </span>
              <span className="pkgw-price-mono">
                − ETB {priceBreakdown.offerSaving?.toLocaleString()}
              </span>
            </div>
          )}

          {priceBreakdown.referralSaving > 0 && (
            <div className="pkgw-price-row pkgw-price-strong">
              <span className="pkgw-price-label">
                <span className="pkgw-price-dot" style={{ background: "var(--gold-ink)" }} />
                Referral Code Discount (Extra 5%):
              </span>
              <span className="pkgw-price-mono">
                − ETB {priceBreakdown.referralSaving?.toLocaleString()}
              </span>
            </div>
          )}

          <div className="pkgw-price-total">
            <span>Total Payable Amount:</span>
            <span className="pkgw-price-mono pkgw-price-amount">
              ETB{" "}
              {priceBreakdown.total?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      )}

      <div className="pkgw-field">
        <div className="pkgw-account-head">
          <span className="pkgw-label" style={{ marginBottom: 0 }}>
            Official Payment Accounts (Tap to Copy)
          </span>
          <span className="pkgw-helper" style={{ marginTop: 0 }}>
            Direct Ethiopian banking
          </span>
        </div>

        <div className="pkgw-account-grid">
          {bankDetails.map((detail, idx) => {
            const isCopied = copiedBankIndex === idx;
            const Icon = detail.icon;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleCopyAccount(detail.copyValue, idx)}
                className={`pkgw-account${isCopied ? " is-copied" : ""}`}
              >
                <span className="pkgw-account-top">
                  <span className="pkgw-account-label">
                    <Icon className="w-4 h-4" /> {detail.label}
                  </span>
                  {isCopied ? (
                    <span className="pkgw-account-copied">
                      <CheckCircle2 className="w-4 h-4" /> Copied
                    </span>
                  ) : (
                    <Copy className="pkgw-account-copyicon" />
                  )}
                </span>
                <strong className="pkgw-account-value">{detail.value}</strong>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pkgw-field">
        <span className="pkgw-label">Upload Transaction Screenshot / Receipt *</span>
        <div className="pkgw-dropzone">
          <ScreenshotUploader screenshot={screenshot} setScreenshot={setScreenshot} />
        </div>
        {errors?.screenshot_string && (
          <p className="pkgw-error">{errors.screenshot_string}</p>
        )}
      </div>

      <div className="pkgw-note">
        <ShieldCheck className="w-5 h-5" style={{ color: "var(--ink-secondary)" }} />
        <span>
          <strong>Fast Verification:</strong> Applications are reviewed within
          2–4 hours. You will be assigned your advisor and added to the
          dedicated student channel immediately upon confirmation.
        </span>
      </div>
    </div>
  );
}
