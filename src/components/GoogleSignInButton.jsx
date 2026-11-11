import { useEffect, useRef, useState } from "react";
import "./GoogleSignInButton.css";

const GOOGLE_SCRIPT_ID = "negus-google-identity";

export default function GoogleSignInButton({
  onCredential,
  disabled = false,
  text = "continue_with",
}) {
  const buttonRef = useRef(null);
  const credentialHandler = useRef(onCredential);
  const [scriptReady, setScriptReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [configurationNotice, setConfigurationNotice] = useState(false);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();

  credentialHandler.current = onCredential;

  useEffect(() => {
    if (!clientId) return undefined;

    let disposed = false;
    const renderButton = () => {
      if (disposed || !window.google?.accounts?.id || !buttonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response.credential) credentialHandler.current(response.credential);
        },
      });

      buttonRef.current.replaceChildren();
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: Math.max(220, Math.floor(buttonRef.current.getBoundingClientRect().width)),
        text,
        shape: "rectangular",
        logo_alignment: "left",
      });
      setScriptReady(true);
      setLoadError(false);
    };

    let script = document.getElementById(GOOGLE_SCRIPT_ID);
    const onLoad = () => renderButton();
    const onError = () => setLoadError(true);

    if (window.google?.accounts?.id) {
      renderButton();
    } else {
      if (!script) {
        script = document.createElement("script");
        script.id = GOOGLE_SCRIPT_ID;
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", onLoad);
      script.addEventListener("error", onError);
    }

    return () => {
      disposed = true;
      script?.removeEventListener("load", onLoad);
      script?.removeEventListener("error", onError);
    };
  }, [clientId, text]);

  if (!clientId) {
    return (
      <div className="google-signin">
        <button
          className="google-signin-fallback"
          type="button"
          disabled={disabled}
          onClick={() => setConfigurationNotice(true)}
        >
          <svg aria-hidden="true" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z" />
            <path fill="#FF3D00" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z" />
            <path fill="#4CAF50" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z" />
            <path fill="#1976D2" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z" />
          </svg>
          <span>Continue with Google</span>
        </button>
        {configurationNotice && (
          <span className="google-signin-status" role="status">
            Google sign-in needs a valid VITE_GOOGLE_CLIENT_ID in the client environment.
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`google-signin ${disabled ? "is-disabled" : ""}`} aria-busy={!scriptReady && !loadError}>
      <div ref={buttonRef} className="google-signin-button" />
      {!scriptReady && !loadError && <span className="google-signin-status">Loading Google sign-in…</span>}
      {loadError && <span className="google-signin-status" role="status">Google sign-in could not load. Use email instead.</span>}
    </div>
  );
}
