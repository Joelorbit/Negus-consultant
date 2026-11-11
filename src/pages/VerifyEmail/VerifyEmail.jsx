import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link, useLocation } from "react-router";
import { useVerifyEmail, useResendVerification } from "../../hooks/useAuth";
import { Check, Mail, NavArrowLeft, ArrowRight, WarningTriangle } from "iconoir-react";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const token = searchParams.get("token");
  const {
    mutate: verify,
    isPending,
    isSuccess,
    isError,
    error,
  } = useVerifyEmail();
  const {
    mutate: resend,
    isPending: isResending,
    isSuccess: resendOk,
    error: resendError,
  } = useResendVerification();
  const [email, setEmail] = useState(() => location.state?.email || "");

  const logoSrc = "/negus-logo.svg";

  useEffect(() => {
    if (token) {
      verify(token, {
        onSuccess: () => {
          try {
            const intent = localStorage.getItem("post_login_intent");
            if (intent === "mentor_apply") {
              setTimeout(
                () => navigate("/login", { state: { from: "/mentor/apply" } }),
                1800
              );
              return;
            }
          } catch {
            // ignore
          }

          setTimeout(() => navigate("/login"), 1800);
        },
      });
    }
  }, [token, verify, navigate]);

  return (
    <main className="reference-auth-page">
      <section className="reference-auth-card" style={{ maxWidth: "480px" }}>
        <Link className="reference-auth-back" to="/">
          <NavArrowLeft width={17} height={17} />
          Back to home
        </Link>
        <Link className="reference-auth-brand" to="/" aria-label="Negus Consultants home">
          <img src={logoSrc} alt="Negus Consultants" style={{ height: "36px", width: "auto" }} />
          <span>NEGUS CONSULTANTS</span>
        </Link>

        <div className="reference-eyebrow">ACCOUNT VERIFICATION</div>
        <h1 className="reference-auth-title">Verify your email<br /><mark>address.</mark></h1>

        {isPending && (
          <div className="py-8 text-center">
            <p className="reference-auth-lead">Verifying your account token…</p>
          </div>
        )}

        {isSuccess && (
          <div className="py-6 text-center">
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "var(--yellow)",
                color: "#123d2b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Check width={28} height={28} />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--ink)", margin: "0 0 8px" }}>
              Email Verified Successfully!
            </h2>
            <p className="reference-auth-lead" style={{ marginBottom: "20px" }}>
              Redirecting you to the sign-in page…
            </p>
            <Link to="/login" className="reference-auth-submit" style={{ textDecoration: "none" }}>
              <span>Sign in now</span>
              <ArrowRight width={16} height={16} />
            </Link>
          </div>
        )}

        {isError && (
          <div className="py-4">
            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                color: "var(--ink)",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <WarningTriangle width={22} height={22} style={{ color: "#dc2626", flexShrink: 0 }} />
              <div>
                <strong style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>
                  Verification Link Expired or Invalid
                </strong>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--ink-secondary)" }}>
                  {error?.response?.data?.message || "This verification link could not be validated. You can request a new verification link below."}
                </p>
              </div>
            </div>
          </div>
        )}

        {(!token || isError) && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) resend(email.trim());
            }}
            className="reference-auth-form"
          >
            <label htmlFor="verify-email-input">
              Request new verification link
              <input
                id="verify-email-input"
                type="email"
                required
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            {resendOk && (
              <p className="reference-form-success" role="status">
                Verification link sent! Please check your inbox.
              </p>
            )}
            {resendError && (
              <p className="reference-form-error" role="alert">
                {resendError.response?.data?.message || "We could not resend the verification email. Please try again."}
              </p>
            )}

            <button
              type="submit"
              className="reference-auth-submit"
              disabled={!email || isResending}
            >
              {isResending ? "Sending link…" : "Resend Verification Email"}
              {!isResending && <Mail width={16} height={16} />}
            </button>
          </form>
        )}

        <p className="reference-auth-switch" style={{ marginTop: "24px" }}>
          Ready to sign in? <Link to="/login">Go to login</Link>
        </p>
      </section>
    </main>
  );
};

export default VerifyEmail;
