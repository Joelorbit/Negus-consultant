import React from "react";
import "./MobileDock.css";
import { NavLink, useLocation } from "react-router";
import {
  HomeSimple,
  Book,
  Packages,
  GraduationCap,
  User,
  LogIn,
} from "iconoir-react";
import { useMe } from "../hooks/useAuth";
import { preloadPublicRoute } from "../utils/preloadPublicRoute";

const MobileDock = () => {
  const { data: user } = useMe();
  const location = useLocation();

  // Hide the dock on admin dashboard, profile/messages, or standalone app frames
  const hiddenPrefixes = [
    "/dashboard",
    "/profile/messages",
    "/mentor/messages",
    "/app",
  ];
  if (hiddenPrefixes.some((p) => location.pathname.startsWith(p))) {
    return null;
  }

  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: HomeSimple,
      isActive: (path) => path === "/",
    },
    {
      to: "/courses",
      label: "Courses",
      icon: Book,
      isActive: (path) => path.startsWith("/courses"),
    },
    {
      to: "/packages",
      label: "Packages",
      icon: Packages,
      isActive: (path) =>
        path.startsWith("/packages") || path.startsWith("/college-packages"),
    },
    {
      to: "/scholarships",
      label: "Scholarships",
      icon: GraduationCap,
      isActive: (path) => path.startsWith("/scholarships"),
    },
    user
      ? {
          to: "/profile",
          label: user.first_name ? user.first_name.slice(0, 8) : "Profile",
          icon: User,
          isActive: (path) => path.startsWith("/profile"),
        }
      : {
          to: "/login",
          label: "Sign in",
          icon: LogIn,
          isActive: (path) => path === "/login" || path === "/register",
        },
  ];

  return (
    <nav className="negus-mobile-dock" aria-label="Mobile quick navigation">
      <div className="negus-mobile-dock-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive(location.pathname);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`negus-dock-item${active ? " active" : ""}`}
              onPointerDown={() => preloadPublicRoute(item.to)}
              onFocus={() => preloadPublicRoute(item.to)}
            >
              <span className="negus-dock-icon-wrap">
                <Icon width={20} height={20} strokeWidth={active ? 2.2 : 1.7} />
              </span>
              <span className="negus-dock-label">{item.label}</span>
              {active && (
                <span className="negus-dock-indicator" aria-hidden="true" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileDock;
