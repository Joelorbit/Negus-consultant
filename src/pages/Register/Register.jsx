import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ArrowRight,
  Check,
  Eye,
  EyeClosed,
  NavArrowLeft,
} from "iconoir-react";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import { useGoogleAuth, useRegister } from "../../hooks/useAuth";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const { mutate, isPending, isSuccess, data, error: registerError } = useRegister();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    mutate: googleSignIn,
    isPending: isGooglePending,
    isSuccess: isGoogleSuccess,
    error: googleError,
  } = useGoogleAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!isGoogleSuccess) return;

    let destination = location.state?.from || "/";
    try {
      if (localStorage.getItem("post_login_intent") === "mentor_apply") {
        destination = "/mentor/apply";
        localStorage.removeItem("post_login_intent");
      }
    } catch {
      // Continue to normal destination
    }
    navigate(destination, { replace: true });
  }, [isGoogleSuccess, location, navigate]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.first_name.trim()) nextErrors.first_name = "Enter your first name.";
    if (!form.last_name.trim()) nextErrors.last_name = "Enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (form.password.length < 6) {
      nextErrors.password = "Use at least 6 characters for your password.";
    }
    if (form.password !== form.confirm_password) {
      nextErrors.confirm_password = "The passwords do not match.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    mutate({
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
      password: form.password,
      role: "member",
    });
  };

  const errorMessage =
    googleError?.response?.status === 404
      ? "Google sign-in is not supported on this server. Please create an account with your email."
      : registerError?.response?.data?.message ||
        (typeof registerError?.response?.data === "string" ? registerError.response.data : null) ||
        (registerError ? "Could not create your account. Please try again." : null);

  const logoSrc = "/negus-logo.svg";

  return (
    <main className="negus-auth-viewport">
      <style>{`
        .negus-auth-viewport {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(24px, 4vw, 56px) 16px;
          background-color: var(--paper);
          background-image: radial-gradient(circle at 50% 12%, color-mix(in srgb, var(--green-subtle) 40%, var(--paper)), var(--paper) 70%);
          color: var(--ink);
          font-family: var(--font-body, 'Outfit', sans-serif);
        }

        .negus-auth-solid-card {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          background: #ffffff !important;
          border: 1px solid rgba(18, 61, 43, 0.12) !important;
          border-radius: 24px;
          padding: clamp(28px, 4.5vw, 44px);
          box-shadow: 0 16px 40px -12px rgba(18, 61, 43, 0.08), 0 0 0 1px rgba(18, 61, 43, 0.04);
          position: relative;
          z-index: 2;
        }

        .dark .negus-auth-solid-card,
        [data-theme='dark'] .negus-auth-solid-card {
          background: #101914 !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.7);
        }

        .negus-auth-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .negus-auth-back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 44px;
          padding: 10px 6px;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 600;
          color: var(--ink-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .negus-auth-back-link:hover {
          color: var(--ink);
        }

        .negus-auth-brand-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 24px;
        }

        .negus-auth-brand-badge img {
          height: 40px;
          width: auto;
          margin-bottom: 12px;
        }

        .negus-auth-brand-badge span {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: var(--ink);
        }

        .negus-auth-headline {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 26px;
          font-weight: 800;
          color: var(--ink);
          margin: 0 0 6px;
          letter-spacing: -0.02em;
          text-align: center;
        }

        .negus-auth-subhead {
          font-size: 13.5px;
          color: var(--ink-secondary);
          margin: 0 0 24px;
          line-height: 1.55;
          text-align: center;
        }

        .negus-auth-form-body {
          display: grid;
          gap: 16px;
        }

        .negus-name-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 480px) {
          .negus-name-row {
            grid-template-columns: 1fr;
          }
        }

        .negus-auth-field {
          display: grid;
          gap: 6px;
        }

        .negus-auth-label {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12.5px;
          font-weight: 700;
          color: var(--ink);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .negus-auth-input {
          height: 48px;
          width: 100%;
          border: 1px solid var(--line-strong);
          border-radius: 12px;
          padding: 0 16px;
          background: var(--paper) !important;
          color: var(--ink) !important;
          font-size: 14.5px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .negus-auth-input:focus {
          border-color: #2f6b45;
          box-shadow: 0 0 0 3px rgba(47, 107, 69, 0.18);
        }

        .dark .negus-auth-input,
        [data-theme='dark'] .negus-auth-input {
          background: #16241c !important;
          border-color: rgba(255, 255, 255, 0.14);
          color: #eaf2ec !important;
        }

        .dark .negus-auth-input:focus,
        [data-theme='dark'] .negus-auth-input:focus {
          border-color: #7fbf9a;
          box-shadow: 0 0 0 3px rgba(127, 191, 154, 0.2);
        }

        .negus-password-box {
          position: relative;
        }

        .negus-password-box .negus-auth-input {
          padding-right: 52px;
        }

        .negus-pw-toggle {
          position: absolute;
          top: 50%;
          right: 2px;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: var(--ink-muted);
          cursor: pointer;
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          padding: 0;
          transition: color 0.2s ease;
        }

        .negus-pw-toggle:hover {
          color: var(--ink);
        }

        .negus-field-error {
          font-size: 12.5px;
          color: #b14438;
          font-weight: 500;
        }

        .negus-form-alert {
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(177, 68, 56, 0.1);
          border: 1px solid rgba(177, 68, 56, 0.3);
          color: #b14438;
          font-size: 13px;
          line-height: 1.45;
        }

        .negus-auth-primary-btn {
          height: 48px;
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
          border-radius: 12px;
          background: #123d2b;
          color: #ffffff;
          border: 1px solid #123d2b;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 14.5px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px -2px rgba(18, 61, 43, 0.25);
          transition: transform 0.15s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }

        .negus-auth-primary-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          background: #1b533b;
          border-color: #1b533b;
          box-shadow: 0 6px 20px -2px rgba(18, 61, 43, 0.35);
        }

        .dark .negus-auth-primary-btn,
        [data-theme='dark'] .negus-auth-primary-btn {
          background: #2f6b45;
          color: #ffffff;
          border-color: #3d8a59;
          box-shadow: 0 4px 14px -2px rgba(47, 107, 69, 0.4);
        }

        .dark .negus-auth-primary-btn:hover:not(:disabled),
        [data-theme='dark'] .negus-auth-primary-btn:hover:not(:disabled) {
          background: #387c52;
          border-color: #489b65;
          box-shadow: 0 6px 20px -2px rgba(47, 107, 69, 0.5);
        }

        .negus-auth-primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .negus-divider-line {
          position: relative;
          text-align: center;
          margin: 22px 0 18px;
        }

        .negus-divider-line::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--line);
        }

        .negus-divider-line span {
          position: relative;
          background: #ffffff;
          padding: 0 14px;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 700;
          color: var(--ink-muted);
          letter-spacing: 0.08em;
        }

        .dark .negus-divider-line span,
        [data-theme='dark'] .negus-divider-line span {
          background: #101914;
          color: #7a9486;
        }

        .negus-auth-bottom-switch {
          margin-top: 24px;
          text-align: center;
          font-size: 13.5px;
          color: var(--ink-secondary);
        }

        .negus-auth-bottom-switch a {
          font-weight: 700;
          color: var(--primary);
          text-decoration: none;
        }

        .negus-auth-bottom-switch a:hover {
          text-decoration: underline;
        }

        .negus-success-box {
          text-align: center;
          padding: 24px 8px;
        }

        .negus-success-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--yellow);
          color: #123d2b;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <section className="negus-auth-solid-card" aria-labelledby="signup-heading">
        <div className="negus-auth-top-nav">
          <Link className="negus-auth-back-link" to="/">
            <NavArrowLeft width={16} height={16} />
            Back to home
          </Link>
        </div>

        <div className="negus-auth-brand-badge">
          <Link to="/" aria-label="Negus Consultants home">
            <img src={logoSrc} alt="Negus Consultants" />
          </Link>
          <span>NEGUS CONSULTANTS</span>
        </div>

        {isSuccess ? (
          <div className="negus-success-box" role="status">
            <div className="negus-success-icon">
              <Check width={26} height={26} />
            </div>
            <h2 className="negus-auth-headline" style={{ fontSize: "22px" }}>
              Account Created Successfully!
            </h2>
            <p className="negus-auth-subhead" style={{ marginBottom: "20px" }}>
              {data?.message || "Welcome to Negus Consultants! Your account is ready."}
            </p>
            <Link
              to="/verify-email"
              state={{ email: form.email.trim() }}
              className="negus-auth-primary-btn"
              style={{ textDecoration: "none" }}
            >
              <span>Continue to email verification</span>
              <ArrowRight width={16} height={16} />
            </Link>
          </div>
        ) : (
          <>
            <h1 id="signup-heading" className="negus-auth-headline">Create Your Account</h1>
            <p className="negus-auth-subhead">
              Start your scholarship roadmap with expert mentoring and essay reviews.
            </p>

            <form onSubmit={handleSubmit} className="negus-auth-form-body">
              <div className="negus-name-row">
                <div className="negus-auth-field">
                  <label className="negus-auth-label" htmlFor="register-first-name">
                    First Name
                  </label>
                  <input
                    id="register-first-name"
                    name="first_name"
                    className="negus-auth-input"
                    required
                    type="text"
                    value={form.first_name}
                    onChange={updateField}
                    placeholder="e.g. Abebe"
                  />
                  {errors.first_name && (
                    <span className="negus-field-error">{errors.first_name}</span>
                  )}
                </div>

                <div className="negus-auth-field">
                  <label className="negus-auth-label" htmlFor="register-last-name">
                    Last Name
                  </label>
                  <input
                    id="register-last-name"
                    name="last_name"
                    className="negus-auth-input"
                    required
                    type="text"
                    value={form.last_name}
                    onChange={updateField}
                    placeholder="e.g. Kebede"
                  />
                  {errors.last_name && (
                    <span className="negus-field-error">{errors.last_name}</span>
                  )}
                </div>
              </div>

              <div className="negus-auth-field">
                <label className="negus-auth-label" htmlFor="register-email">
                  Email Address
                </label>
                <input
                  id="register-email"
                  name="email"
                  className="negus-auth-input"
                  autoComplete="email"
                  required
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <span className="negus-field-error">{errors.email}</span>
                )}
              </div>

              <div className="negus-auth-field">
                <label className="negus-auth-label" htmlFor="register-password">
                  Password
                </label>
                <div className="negus-password-box">
                  <input
                    id="register-password"
                    name="password"
                    className="negus-auth-input"
                    required
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={updateField}
                    placeholder="Minimum 6 characters"
                  />
                  <button
                    type="button"
                    className="negus-pw-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeClosed width={18} height={18} /> : <Eye width={18} height={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="negus-field-error">{errors.password}</span>
                )}
              </div>

              <div className="negus-auth-field">
                <label className="negus-auth-label" htmlFor="register-confirm-password">
                  Confirm Password
                </label>
                <div className="negus-password-box">
                  <input
                    id="register-confirm-password"
                    name="confirm_password"
                    className="negus-auth-input"
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirm_password}
                    onChange={updateField}
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    className="negus-pw-toggle"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeClosed width={18} height={18} /> : <Eye width={18} height={18} />}
                  </button>
                </div>
                {errors.confirm_password && (
                  <span className="negus-field-error">{errors.confirm_password}</span>
                )}
              </div>

              {errorMessage && (
                <div className="negus-form-alert" role="alert">
                  {errorMessage}
                </div>
              )}

              <button
                className="negus-auth-primary-btn"
                type="submit"
                disabled={isPending || isGooglePending}
              >
                {isPending ? "Creating your account…" : "Create Account"}
                {!isPending && <ArrowRight width={16} height={16} />}
              </button>
            </form>

            <div className="negus-divider-line">
              <span>OR</span>
            </div>

            <GoogleSignInButton
              disabled={isPending || isGooglePending}
              onCredential={(credential) => googleSignIn(credential)}
            />
            {isGooglePending && (
              <p className="text-[13px] text-center text-[var(--ink-muted)] mt-2">
                Creating account with Google…
              </p>
            )}

            <p className="negus-auth-bottom-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </>
        )}
      </section>
    </main>
  );
};

export default Register;
