import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/60 px-4">
      <div className="bg-background rounded-xl shadow-xl max-w-md w-full p-8 text-center space-y-6">
        <h1 className="text-2xl font-bold">Verify your email 📧</h1>

        <p className="text-muted-foreground">
          We’ve sent a verification link to
        </p>

        {email && (
          <p className="font-semibold text-primary break-all">{email}</p>
        )}

        <p className="text-sm text-muted-foreground">
          Please check your inbox and click the link to activate your account.
        </p>

        <div className="space-y-3">
          <Button className="w-full" onClick={() => navigate("/login")}>
            I’ve verified my email
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Didn’t receive the email? Check spam or resend from login.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
