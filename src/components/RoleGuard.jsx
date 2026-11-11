import React from "react";
/* eslint-disable react-refresh/only-export-components */
import { Navigate, useLocation } from "react-router";
import { useMe } from "../hooks/useAuth";

// Role-based access control component
export const RoleGuard = ({
  children,
  allowedRoles = ["admin"],
  fallbackPath = "/dashboard",
  fallbackComponent = null,
}) => {
  const { data: user, isLoading } = useMe();
  const location = useLocation();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Check if user has required role
  const hasPermission = allowedRoles.includes(user.role);

  if (!hasPermission) {
    // If fallback component is provided, show it
    if (fallbackComponent) {
      return fallbackComponent;
    }

    // Otherwise redirect to fallback path
    return <Navigate to={fallbackPath} replace />;
  }

  // User has permission, render children
  return children;
};

// Hook for checking permissions
export const usePermissions = () => {
  const { data: user } = useMe();

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const canAccess = (resource) => {
    if (!user) return false;

    switch (user.role) {
      case "admin":
        return true; // Admin can access everything
      case "semiadmin":
        // Semi-admin can access blog, users, scholarships, college orders, and college payments
        return [
          "blog",
          "users",
          "scholarships",
          "college-orders",
          "college-payments",
          "email",
        ].includes(resource);
      default:
        return false;
    }
  };

  const getAvailableRoutes = () => {
    if (!user) return [];

    switch (user.role) {
      case "admin":
        return [
          "dashboard",
          "users",
          "scholarships",
          "college-orders",
          "college-payments",
          "packages",
          "payments",
          "mentors",
          "courses",
          "blog",
          "applications",
          "contact-messages",
          "email",
        ];
      case "semiadmin":
        return [
          "dashboard",
          "users",
          "scholarships",
          "college-orders",
          "college-payments",
          "blog",
          "email",
        ];
      default:
        return [];
    }
  };

  return {
    user,
    hasRole,
    hasAnyRole,
    canAccess,
    getAvailableRoutes,
    isAdmin: user?.role === "admin",
    isSemiAdmin: user?.role === "semiadmin",
  };
};

export default RoleGuard;
