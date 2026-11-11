import React from "react";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import { LogOut } from "iconoir-react";
import { ChevronDown, UserRound } from "lucide-react";
import { useMe, useLogout } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Sidebar = ({ tabs, collapsed }) => {
  const { data: user, isLoading, error } = useMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => navigate("/login", { replace: true }),
    });
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "h-screen bg-[#0a1a12] flex items-center justify-center transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="w-6 h-6 border-2 border-[#d1bd82]/30 border-t-[#d1bd82] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "h-screen bg-[#0a1a12] flex items-center justify-center transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <p className="text-red-400 text-xs px-2 text-center">Error loading user</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-screen bg-[#0a1a12] dark:bg-[#070d0a] p-4 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-[#1a3025]/50",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Top section: Logo + Nav */}
      <div>
        {/* Logo */}
        <div
          className={cn(
            "flex items-center mb-8 px-2 py-3",
            collapsed ? "justify-center" : "gap-3"
          )}
        >
          <img
            src="/negus-logo.svg"
            alt="Negus"
            className="w-9 h-9 flex-shrink-0"
          />
          {!collapsed && (
            <span className="text-xl font-bold text-[#e8e9e4] font-[Lexend] whitespace-nowrap">
              Negus
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {tabs.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-[0.5rem] px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group",
                  isActive
                    ? "bg-[#d1bd82]/10 text-[#d1bd82] border-l-[3px] border-[#d1bd82]"
                    : "text-[#e8e9e4]/50 hover:bg-[#e8e9e4]/5 hover:text-[#e8e9e4]/80",
                  collapsed && "justify-center px-2"
                )
              }
            >
              <span
                className={cn(
                  "material-symbols-outlined text-lg transition-colors duration-200",
                  collapsed && "text-xl"
                )}
              >
                {icon}
              </span>
              {!collapsed && (
                <span className="whitespace-nowrap font-[Outfit]">
                  {label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Account actions live in a compact menu so the sidebar stays clear. */}
      <div className="border-t border-white/10 pt-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Open account menu"
              title={collapsed ? `${user?.first_name || "Account"} account menu` : undefined}
              className={cn(
                "flex min-h-12 w-full items-center gap-3 rounded-xl border border-transparent p-2 text-left transition-colors hover:border-white/10 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c184]",
                collapsed && "justify-center"
              )}
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#315a45] text-xs font-bold text-white">
                {user?.profile_image ? (
                  <img src={user.profile_image} alt="" className="h-full w-full object-cover" />
                ) : (
                  `${user?.first_name?.[0] || "N"}${user?.last_name?.[0] || ""}`
                )}
              </span>
              {!collapsed && (
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-[Outfit] text-sm font-semibold text-white">
                    {[user?.first_name, user?.last_name].filter(Boolean).join(" ") || "My account"}
                  </span>
                  <span className="block truncate font-[Outfit] text-xs text-white/55">Account settings</span>
                </span>
              )}
              {!collapsed && <ChevronDown className="h-4 w-4 flex-shrink-0 text-white/55" aria-hidden="true" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align={collapsed ? "center" : "start"}
            sideOffset={10}
            className="w-64 rounded-xl border p-2 shadow-xl"
            style={{ background: "var(--white)", color: "var(--ink)", borderColor: "var(--line)" }}
          >
            <DropdownMenuLabel className="px-3 py-2 font-normal">
              <span className="block truncate font-[Lexend] text-sm font-bold text-[var(--ink)]">
                {[user?.first_name, user?.last_name].filter(Boolean).join(" ") || "My account"}
              </span>
              <span className="mt-1 block truncate text-xs text-[var(--ink-muted)]">{user?.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator style={{ background: "var(--line)" }} />
            <DropdownMenuItem asChild className="min-h-10 cursor-pointer rounded-lg px-3 text-[var(--ink)] focus:bg-[var(--paper)]">
              <NavLink to="/profile"><UserRound className="mr-2 h-4 w-4" aria-hidden="true" />View profile</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isLoggingOut}
              onSelect={handleLogout}
              className="min-h-10 cursor-pointer rounded-lg px-3 text-red-700 focus:bg-red-50 focus:text-red-800"
            >
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              {isLoggingOut ? "Signing out…" : "Sign out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
