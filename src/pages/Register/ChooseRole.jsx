import { Button } from "@/components/ui/button";
import { GraduationCap, Spark, User, ArrowRight } from "iconoir-react";
import { useNavigate } from "react-router";

const ChooseRole = () => {
  const navigate = useNavigate();
  const logoSrc = "/negus-logo.svg";

  return (
    <main className="reference-role-page">
      <div className="reference-role-content">
        <img
          src={logoSrc}
          alt="Negus Consultants"
          style={{ height: "42px", width: "auto", margin: "0 auto 24px" }}
        />
        <div className="reference-eyebrow">CHOOSE YOUR PATH</div>
        <h1 className="reference-auth-title">
          Welcome to Negus<br /><mark>Consultants.</mark>
        </h1>
        <p className="reference-auth-lead">
          Choose how you want to take part in the Negus community.
        </p>

        <div className="reference-role-options">
          <section className="reference-role-card">
            <h2>
              <GraduationCap width={24} height={24} /> Student
            </h2>
            <p>
              Explore courses, connect with mentors, compare scholarship
              packages, and start your study abroad journey.
            </p>
            <Button
              className="reference-role-action w-full"
              onClick={() => navigate("/register")}
            >
              <span>Continue as Student</span>
              <ArrowRight width={16} height={16} />
            </Button>
          </section>

          <section className="reference-role-card">
            <h2>
              <Spark width={24} height={24} /> Mentor
            </h2>
            <p>
              Share your university admissions experience and help ambitious
              Ethiopian students secure scholarships worldwide.
            </p>
            <Button
              className="reference-role-action w-full"
              onClick={() => navigate("/mentor/benefits")}
            >
              <span>Apply as Mentor</span>
              <ArrowRight width={16} height={16} />
            </Button>
          </section>
        </div>

        <p className="reference-auth-lead mt-8" style={{ fontSize: "13px" }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[var(--ink)] font-bold underline hover:text-[var(--yellow)]"
          >
            Sign in here
          </button>
        </p>
      </div>
    </main>
  );
};

export default ChooseRole;
