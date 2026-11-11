import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "../../hooks/useAuth";

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const { mutate, isPending } = useGoogleAuth();

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (!credentialResponse.credential) {
            onError?.("No credential returned from Google");
            return;
          }
          mutate(credentialResponse.credential, {
            onSuccess: (user) => onSuccess?.(user),
            onError: (error) =>
              onError?.(
                error.response?.data?.message || "Google sign-in failed",
              ),
          });
        }}
        onError={() => onError?.("Google sign-in failed")}
        theme="outline"
        size="large"
        width="100%"
        text={isPending ? undefined : "continue_with"}
      />
    </div>
  );
};

export default GoogleLoginButton;
