import React, { useState } from "react";
import { Card } from "../components/ui/card";
import StudentAuth from "./StudentAuth";
import MentorAuth from "./MentorAuth";
import { GraduationCap, User } from "iconoir-react";

const AUTHOPTIONS = [
  {
    icon: User,
    option: "Student",
    description: "Find scholarships and connect with mentors",
    iconBg: "bg-[#2f6b45]/15 dark:bg-[#2f6b45]/25",
    iconColor: "text-[#2f6b45] dark:text-[#8fa392]",
    hoverBorder: "hover:border-[#2f6b45]/60 dark:hover:border-[#8fa392]/60",
    hoverShadow: "hover:shadow-[0_0_24px_rgba(47,107,69,0.12)]",
  },
  {
    icon: GraduationCap,
    option: "Mentor",
    description: "Guide students on their scholarship journey",
    iconBg: "bg-[#d1bd82]/15 dark:bg-[#d1bd82]/25",
    iconColor: "text-[#a08c42] dark:text-[#d1bd82]",
    hoverBorder: "hover:border-[#d1bd82]/60 dark:hover:border-[#d1bd82]/60",
    hoverShadow: "hover:shadow-[0_0_24px_rgba(209,189,130,0.12)]",
  },
];

const AuthLayout = () => {
  const [toggle, setToggle] = useState(null);

  const toggleAuth = (option) => {
    setToggle(option);
  };

  if (toggle === "Student") return <StudentAuth />;
  if (toggle === "Mentor") return <MentorAuth />;

  return (
    <div className="flex justify-center min-h-screen items-center bg-gradient-to-br from-[#0a1a12] via-[#123d2b] to-[#0d2218] relative overflow-hidden px-4">
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,107,69,0.15)_0%,transparent_70%)]" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e8e9e4 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 w-full max-w-xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <img
            src="/negus-logo.svg"
            alt="Negus"
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-[#e8e9e4] font-[Lexend]">
            Negus
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#e8e9e4] font-[Lexend] mb-3">
            Choose how to{" "}
            <span className="text-[#d1bd82]">sign up</span>
          </h1>
          <p className="text-[#e8e9e4]/50 font-[Outfit]">
            Select your role to get started
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {AUTHOPTIONS.map((option, i) => (
            <Card
              key={i}
              onClick={() => toggleAuth(option.option)}
              className={`p-8 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#fffdf6]/95 dark:bg-[#1a2420]/90 backdrop-blur-sm border-2 border-[#8fa392]/15 dark:border-[#8fa392]/10 rounded-[1rem] shadow-[0_4px_24px_rgba(0,0,0,0.08)] ${option.hoverBorder} ${option.hoverShadow} hover:scale-[1.03] active:scale-[0.98] group`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className={`w-14 h-14 ${option.iconBg} rounded-[0.75rem] flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110`}
                >
                  <option.icon
                    className={`w-7 h-7 ${option.iconColor}`}
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#123d2b] dark:text-[#e8e9e4] font-[Lexend]">
                    {option.option}
                  </p>
                  <p className="text-sm text-[#123d2b]/50 dark:text-[#e8e9e4]/50 mt-1 font-[Outfit]">
                    {option.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Login link */}
        <p className="text-center mt-8 text-[#e8e9e4]/50 font-[Outfit] text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#d1bd82] hover:text-[#e8d5a0] font-medium transition-colors duration-200"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
