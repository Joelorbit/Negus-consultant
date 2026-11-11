import React from "react";
import { NavLink } from "react-router";
import {
  Users,
  GraduationCap,
  Package,
  CreditCard,
  TrendingUp,
  Sparkles,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  BarChart3,
  Activity,
  FileText,
  Mail,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { usePackages } from "../../../../hooks/usePackages";
import { useMentor } from "../../../../hooks/useMentorApplications";

export default function DashboardOverview() {
  const { data: pkgData } = usePackages();
  const { data: mentorData } = useMentor({});

  const packagesCount = Array.isArray(pkgData?.data) ? pkgData.data.length : 6;
  const mentorsCount = Array.isArray(mentorData?.data) ? mentorData.data.length : 5;
  const kpis = [
    {
      label: "Total Scholars Enrolled",
      value: "1,420",
      change: "+14.2% this month",
      trend: "up",
      icon: GraduationCap,
      color: "var(--green)",
      bg: "var(--green-soft)",
    },
    {
      label: "Pending Applications",
      value: "38",
      change: "4 awaiting review today",
      trend: "neutral",
      icon: FileText,
      color: "var(--yellow)",
      bg: "var(--yellow-soft)",
    },
    {
      label: "Active Global Mentors",
      value: `${mentorsCount}`,
      change: "MIT, Columbia, Stanford, Oxford",
      trend: "up",
      icon: Users,
      color: "var(--green)",
      bg: "var(--green-soft)",
    },
    {
      label: "Gross Package Volume",
      value: "ETB 2,450,000",
      change: "50% Scholarship Offer active",
      trend: "up",
      icon: CreditCard,
      color: "var(--gold-ink, #b8860b)",
      bg: "var(--yellow-soft)",
    },
  ];

  const quickActions = [
    { label: "Manage Packages", to: "/dashboard/packages", icon: Package, count: `${packagesCount} Plans` },
    { label: "Review Applications", to: "/dashboard/applications", icon: FileText, count: "38 Applicants" },
    { label: "Course Library", to: "/dashboard/courses", icon: GraduationCap, count: "6 Active Courses" },
    { label: "Mentor Network", to: "/dashboard/mentors", icon: Users, count: `${mentorsCount} Mentors` },
    { label: "Payments & Proofs", to: "/dashboard/payments", icon: CreditCard, count: "CBE & Telebirr" },
    { label: "Dispatch Email", to: "/dashboard/email", icon: Mail, count: "Templates Ready" },
  ];

  const recentApplications = [
    {
      name: "Abebe Bikila",
      package: "Full Course",
      school: "Addis Ababa General Secondary",
      gpa: "3.95",
      status: "Approved",
      date: "Nov 4, 2026",
    },
    {
      name: "Lidia Haile",
      package: "Ivy League & Full-Ride Elite",
      school: "Addis Ababa University",
      gpa: "3.88",
      status: "Under Review",
      date: "Nov 3, 2026",
    },
    {
      name: "Dawit Wolde",
      package: "Master's & PhD Graduate Track",
      school: "Bahir Dar University",
      gpa: "3.92",
      status: "Approved",
      date: "Nov 2, 2026",
    },
    {
      name: "Selamawit Kebede",
      package: "SOP & Essay Intensive Review",
      school: "Hawassa University",
      gpa: "3.75",
      status: "Interview Scheduled",
      date: "Nov 1, 2026",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6" style={{ borderColor: "var(--line)" }}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-['Lexend'] font-bold border mb-2" style={{ background: "var(--green-soft)", color: "var(--green)", borderColor: "var(--line)" }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE OPERATIONS CENTER</span>
          </div>
          <h1 className="font-['Lexend'] text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--ink)" }}>
            Operations &amp; Admissions Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--ink-secondary)" }}>
            Platform telemetry, scholarship application pipelines, and mentor consultation activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border" style={{ background: "var(--white)", borderColor: "var(--line)", color: "var(--ink)" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Standalone Edge Active</span>
          </span>
          <NavLink
            to="/dashboard/packages"
            className="px-4 py-2 rounded-xl text-xs font-['Lexend'] font-bold inline-flex items-center gap-1.5 text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--green)" }}
          >
            <span>Package Manager</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl border shadow-2xs space-y-3 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--white)", borderColor: "var(--line)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-['Lexend'] font-semibold" style={{ color: "var(--ink-muted)" }}>
                  {kpi.label}
                </span>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: kpi.bg, color: kpi.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="font-['Lexend'] text-2xl font-black tracking-tight" style={{ color: "var(--ink)" }}>
                  {kpi.value}
                </div>
                <div className="text-[12px] flex items-center gap-1 mt-1 font-medium" style={{ color: "var(--green)" }}>
                  <TrendingUp className="w-3 h-3" />
                  <span>{kpi.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Hub */}
      <div className="space-y-3">
        <h2 className="font-['Lexend'] text-base font-bold" style={{ color: "var(--ink)" }}>
          Administrative Control Center
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <NavLink
                key={idx}
                to={action.to}
                className="p-4 rounded-xl border flex flex-col items-start gap-2.5 transition-all hover:border-[var(--green)] hover:shadow-sm"
                style={{ background: "var(--white)", borderColor: "var(--line)", color: "var(--ink)" }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--green-soft)", color: "var(--green)" }}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-['Lexend'] text-xs font-bold leading-tight">{action.label}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: "var(--ink-muted)" }}>{action.count}</div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* 2-Column Section: Recent Applications & Package Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Recent Applications Table */}
        <div className="lg:col-span-8 rounded-2xl border p-5 sm:p-6 shadow-2xs space-y-4" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
          <div className="flex items-center justify-between border-b pb-3.5" style={{ borderColor: "var(--line)" }}>
            <div>
              <h3 className="font-['Lexend'] text-base font-bold" style={{ color: "var(--ink)" }}>
                Recent Scholarship Applications
              </h3>
              <p className="text-xs" style={{ color: "var(--ink-secondary)" }}>
                Latest submissions from prospective scholarship candidates
              </p>
            </div>
            <NavLink
              to="/dashboard/applications"
              className="text-xs font-['Lexend'] font-bold inline-flex items-center gap-1 hover:underline"
              style={{ color: "var(--green)" }}
            >
              <span>View all 38</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--line)", color: "var(--ink-muted)" }}>
                  <th className="pb-3 font-semibold">Applicant</th>
                  <th className="pb-3 font-semibold">Target Package</th>
                  <th className="pb-3 font-semibold">Academic Institution</th>
                  <th className="pb-3 font-semibold">GPA</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--line)" }}>
                {recentApplications.map((app, idx) => (
                  <tr key={idx} className="hover:bg-[var(--paper)] transition-colors">
                    <td className="py-3 font-medium font-['Lexend']" style={{ color: "var(--ink)" }}>
                      {app.name}
                    </td>
                    <td className="py-3" style={{ color: "var(--ink-secondary)" }}>
                      {app.package}
                    </td>
                    <td className="py-3 text-[11.5px]" style={{ color: "var(--ink-muted)" }}>
                      {app.school}
                    </td>
                    <td className="py-3 font-bold" style={{ color: "var(--green)" }}>
                      {app.gpa}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold"
                        style={{
                          background: app.status === "Approved" ? "var(--green-soft)" : "var(--yellow-soft)",
                          color: app.status === "Approved" ? "var(--green)" : "var(--ink)",
                        }}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (4 cols): System Status & Pipeline Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border p-5 shadow-2xs space-y-4" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
            <h3 className="font-['Lexend'] text-base font-bold border-b pb-3" style={{ color: "var(--ink)", borderColor: "var(--line)" }}>
              Scholarship Pipeline
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Full Course Mastery</span>
                  <span className="font-bold">48%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--paper)" }}>
                  <div className="h-full rounded-full" style={{ width: "48%", background: "var(--green)" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Ivy League Elite</span>
                  <span className="font-bold">28%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--paper)" }}>
                  <div className="h-full rounded-full" style={{ width: "28%", background: "var(--yellow)" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Master's &amp; PhD Track</span>
                  <span className="font-bold">24%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--paper)" }}>
                  <div className="h-full rounded-full" style={{ width: "24%", background: "#3b82f6" }} />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border mt-4 space-y-1.5 text-xs" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
              <div className="flex items-center gap-1.5 font-bold" style={{ color: "var(--ink)" }}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verification Engine</span>
              </div>
              <p className="text-[11.5px] leading-relaxed" style={{ color: "var(--ink-secondary)" }}>
                CBE and Telebirr payment proof uploads are routed to the verification queue automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
