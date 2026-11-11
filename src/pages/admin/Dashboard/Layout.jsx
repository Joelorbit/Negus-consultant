import React, { useState, useMemo } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, NavArrowLeft, NavArrowRight } from "iconoir-react";
import { Sidebar } from "../../../components/Sidebar";
import { usePermissions } from "../../../components/RoleGuard";

const ALL_TABS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: "dashboard",
    resource: "dashboard",
  },
  { to: "/dashboard/users", label: "Users", icon: "person", resource: "users" },
  {
    to: "/dashboard/scholarships",
    label: "Scholarships",
    icon: "school",
    resource: "scholarships",
  },
  {
    to: "/dashboard/college-orders",
    label: "College Orders",
    icon: "receipt_long",
    resource: "college-orders",
  },
  {
    to: "/dashboard/college-payments",
    label: "College Payments",
    icon: "payments",
    resource: "college-payments",
  },
  {
    to: "/dashboard/packages",
    label: "Packages",
    icon: "package",
    resource: "packages",
  },
  {
    to: "/dashboard/payments",
    label: "Payments",
    icon: "money",
    resource: "payments",
  },
  {
    to: "/dashboard/courses-n",
    label: "Tree",
    icon: "lan",
    resource: "tree",
  },
  // {
  //   to: "/dashboard/mentors",
  //   label: "Mentors",
  //   icon: "ent",
  //   resource: "mentors",
  // },
  {
    to: "/dashboard/courses",
    label: "Courses",
    icon: "video_call",
    resource: "courses",
  },
  {
    to: "/dashboard/blog",
    label: "Blogs",
    icon: "news",
    resource: "blog",
  },
  {
    to: "/dashboard/applications",
    label: "Applications",
    icon: "assessment",
    resource: "applications",
  },
  {
    to: "/dashboard/contact-messages",
    label: "Contact Messages",
    icon: "mail",
    resource: "contact-messages",
  },
  {
    to: "/dashboard/roles",
    label: "Role Management",
    icon: "admin_panel_settings",
    resource: "roles",
  },
  {
    to: "/dashboard/email",
    label: "Email Management",
    icon: "mail",
    resource: "email",
  },
  {
    to: "/dashboard/mentor-applications",
    label: "Monitoring",
    icon: "monitoring",
    resource: "monitor",
  },
];

const Layout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { canAccess } = usePermissions();

  // Filter tabs based on user permissions
  const TABS = useMemo(() => {
    return ALL_TABS.filter((tab) => {
      if (tab.resource === "dashboard") return true; // Always allow dashboard
      return canAccess(tab.resource);
    });
  }, [canAccess]);

  // Listen for collapse toggle globally (from button)
  React.useEffect(() => {
    const handler = () => setCollapsed((prev) => !prev);
    window.addEventListener("toggleSidebar", handler);
    return () => window.removeEventListener("toggleSidebar", handler);
  }, []);

  // Build breadcrumb text
  const breadcrumbSegment = location.pathname.split("/").pop();
  const breadcrumbLabel =
    breadcrumbSegment === "dashboard"
      ? "Overview"
      : breadcrumbSegment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="reference-dashboard-layout flex min-h-screen relative transition-colors duration-300" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar collapsed={collapsed} tabs={TABS} />
      </div>

      {/* Mobile sheet sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50 rounded-[0.5rem] shadow-lg shadow-black/20 w-10 h-10"
            style={{ background: "var(--ink)", color: "var(--paper)" }}
          >
            <Menu width={20} height={20} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-64 h-full border-r-0"
          style={{ background: "var(--ink)" }}
        >
          <Sidebar collapsed={false} tabs={TABS} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div
          className="sticky top-0 z-40 backdrop-blur-md border-b"
          style={{ background: "color-mix(in srgb, var(--paper) 88%, transparent)", borderColor: "var(--line)" }}
        >
          <div className="flex items-center gap-4 px-4 lg:px-8 h-16">
            {/* Collapse toggle – desktop only */}
            <div className="hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 rounded-[0.5rem] border transition-colors duration-200"
                style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}
                onClick={() => {
                  const event = new CustomEvent("toggleSidebar");
                  window.dispatchEvent(event);
                }}
              >
                {collapsed ? (
                    <NavArrowRight width={16} height={16} />
                ) : (
                    <NavArrowLeft width={16} height={16} />
                )}
              </Button>
            </div>

            {/* Breadcrumb */}
            <nav className="flex items-center text-sm font-[Outfit]">
              <span style={{ color: "var(--ink-muted)" }}>
                Dashboard
              </span>
              {breadcrumbSegment !== "dashboard" && (
                <>
                  <span className="mx-2" style={{ color: "var(--line-strong)" }}>/</span>
                  <span className="font-medium" style={{ color: "var(--ink)" }}>
                    {breadcrumbLabel}
                  </span>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
