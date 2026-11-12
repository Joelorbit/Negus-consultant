import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { useMe } from "../hooks/useAuth";
import { TABS } from "../constants/Data";
import UserProfile from "./UserProfile";
import { useGetBlogs } from "../hooks/useBlogs";
import { ArrowUpRight, Bell } from "iconoir-react";

const Navbar = () => {
  const { data: user, isLoading: isUserLoading } = useMe();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationRef = useRef(null);
  const {
    data: blogs = [],
    isLoading: isBlogsLoading,
    isError: isBlogsError,
  } = useGetBlogs();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!notificationsOpen) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!notificationRef.current?.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setNotificationsOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [notificationsOpen]);

  // Prevent background scroll and coordinate mobile dock when mobile overlay is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("negus-mobile-menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("negus-mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("negus-mobile-menu-open");
    };
  }, [mobileMenuOpen]);

  const logoSrc = "/negus-logo.svg";

  return (
    <header className="negus-global-header">
      <style>{`
        /* Top Announcement Strip (CEO Sketch Page 1) */
        .negus-announcement-strip {
          background: #123d2b;
          color: #fffdf6;
          border-bottom: 1px solid rgba(209, 189, 130, 0.25);
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          line-height: 1.4;
          padding: 7px clamp(16px, 3.5vw, 44px);
          transition: all 0.2s ease;
        }

        .negus-announcement-content {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .negus-announcement-tag {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--yellow);
          color: #123d2b;
          padding: 2px 8px;
          border-radius: 999px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }

        .negus-announcement-msg {
          color: #f3f5f2;
          font-weight: 500;
        }

        .negus-announcement-cta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--yellow);
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.15s ease;
        }

        .negus-announcement-cta:hover {
          color: #ffffff;
        }

        .negus-global-header {
          position: sticky;
          top: 0;
          z-index: 90;
          width: 100%;
          background: var(--paper);
          border-bottom: 1px solid var(--line);
          transition: background-color 0.25s ease, border-color 0.25s ease;
        }

        .negus-header-inner {
          max-width: 1440px;
          height: 76px;
          margin: 0 auto;
          padding: 0 clamp(20px, 3.5vw, 48px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(16px, 2.5vw, 40px);
          width: 100%;
        }

        .negus-header-brand {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
          padding-right: clamp(10px, 1.8vw, 24px);
        }

        .negus-header-logo {
          height: 40px;
          width: auto;
          object-fit: contain;
          transition: transform 0.2s ease;
        }

        .negus-header-brand:hover .negus-header-logo {
          transform: scale(1.02);
        }

        /* Desktop Navigation Links */
        .negus-nav-links {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1.2vw, 18px);
          flex: 1;
          justify-content: center;
        }

        .negus-nav-item {
          position: relative;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: clamp(12px, 0.95vw, 13.5px);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ink-secondary);
          text-decoration: none;
          padding: 7px 10px;
          border-radius: 9999px;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .negus-nav-item:hover {
          color: var(--ink);
          background: var(--green-subtle);
        }

        .negus-nav-item.active {
          color: var(--ink);
          font-weight: 700;
          background: color-mix(in srgb, var(--green-soft) 85%, transparent);
        }

        /* Right Actions */
        .negus-header-actions {
          display: flex;
          align-items: center;
          gap: clamp(10px, 1.2vw, 18px);
          flex-shrink: 0;
        }

        .negus-utilities-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .negus-header-sep {
          width: 1px;
          height: 24px;
          background: var(--line-strong);
          opacity: 0.55;
          margin: 0 4px;
        }

        .negus-auth-cluster {
          display: flex;
          align-items: center;
        }

        .negus-auth-buttons-pair {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: 2px;
        }

        .negus-account-skeleton {
          width: 126px;
          height: 38px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--line-strong) 72%, transparent);
          animation: negus-account-pulse 1.4s ease-in-out infinite;
        }

        @keyframes negus-account-pulse {
          50% { opacity: 0.45; }
        }

        @media (prefers-reduced-motion: reduce) {
          .negus-account-skeleton { animation: none; }
        }

        /* Circular Theme Toggle */
        .negus-theme-toggle,
        .site-theme-toggle {
          width: 42px;
          height: 42px;
          min-width: 42px;
          min-height: 42px;
          border-radius: 50%;
          border: 1px solid var(--line-strong);
          background: #ffffff;
          color: var(--ink);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          margin: 0;
          padding: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          transition: all 0.2s ease;
        }

        .negus-theme-toggle:hover,
        .site-theme-toggle:hover {
          border-color: var(--ink);
          background: var(--green-subtle);
          color: var(--ink);
          transform: translateY(-1px);
        }

        /* Bell Notifications Button */
        .negus-bell-btn {
          position: relative;
          width: 42px;
          height: 42px;
          min-width: 42px;
          min-height: 42px;
          border-radius: 50%;
          border: 1px solid var(--line-strong);
          background: #ffffff;
          color: var(--ink);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          transition: all 0.2s ease;
        }

        .negus-bell-btn:hover {
          background: var(--green-subtle);
          border-color: var(--ink);
          transform: translateY(-1px);
        }

        .negus-notification-anchor { position: relative; display: flex; align-items: center; }
        .negus-notification-popover {
          position: absolute;
          z-index: 120;
          top: calc(100% + 13px);
          right: 0;
          width: min(390px, calc(100vw - 28px));
          max-height: min(72vh, 620px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: 18px;
          background: var(--white);
          color: var(--ink);
          box-shadow: 0 22px 60px rgba(15, 42, 29, .18);
          animation: negus-popover-in 160ms ease-out both;
        }
        .negus-notification-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 19px 20px 15px; border-bottom: 1px solid var(--line); }
        .negus-notification-heading h2 { margin: 0; color: var(--ink); font: 700 15px/1.3 var(--font-display); }
        .negus-notification-heading p { margin: 5px 0 0; color: var(--ink-muted); font: 400 12px/1.5 var(--font-body); }
        .negus-notification-count { flex: 0 0 auto; border-radius: 999px; padding: 5px 8px; background: var(--green-subtle); color: var(--ink-secondary); font: 700 12px/1 var(--font-display); }
        .negus-notification-list { min-height: 0; overflow: auto; padding: 7px; }
        .negus-notification-item { display: grid; grid-template-columns: 54px minmax(0, 1fr); align-items: start; gap: 12px; padding: 11px; border-radius: 12px; color: inherit; text-decoration: none; transition: background-color .15s ease; }
        .negus-notification-item:hover, .negus-notification-item:focus-visible { outline: none; background: var(--paper); }
        .negus-notification-image { width: 54px; height: 54px; border-radius: 9px; object-fit: cover; background: var(--green-subtle); }
        .negus-notification-copy { min-width: 0; }
        .negus-notification-copy strong { display: block; overflow: hidden; color: var(--ink); font: 650 13px/1.45 var(--font-display); text-overflow: ellipsis; white-space: nowrap; }
        .negus-notification-copy span { display: -webkit-box; overflow: hidden; margin-top: 4px; color: var(--ink-muted); font: 400 12.5px/1.5 var(--font-body); -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
        .negus-notification-empty { padding: 32px 20px; color: var(--ink-muted); font: 400 13px/1.6 var(--font-body); text-align: center; }
        .negus-notification-footer { display: flex; justify-content: center; padding: 12px; border-top: 1px solid var(--line); }
        .negus-notification-footer a { display: inline-flex; align-items: center; gap: 6px; color: var(--ink-secondary); font: 700 13px/1.4 var(--font-display); text-decoration: none; }
        .negus-notification-footer a:hover { text-decoration: underline; text-underline-offset: 3px; }
        @keyframes negus-popover-in { from { opacity: 0; transform: translateY(-5px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (prefers-reduced-motion: reduce) { .negus-notification-popover { animation: none; } }

        .dark .negus-notification-popover,
        [data-theme='dark'] .negus-notification-popover {
          background: #12201a !important;
          border-color: rgba(127, 191, 154, 0.22) !important;
          color: #eaf2ec !important;
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.65) !important;
        }

        .dark .negus-notification-heading,
        [data-theme='dark'] .negus-notification-heading {
          border-bottom-color: rgba(127, 191, 154, 0.15) !important;
        }

        .dark .negus-notification-heading h2,
        [data-theme='dark'] .negus-notification-heading h2 {
          color: #eaf2ec !important;
        }

        .dark .negus-notification-heading p,
        [data-theme='dark'] .negus-notification-heading p {
          color: #9db2a4 !important;
        }

        .dark .negus-notification-count,
        [data-theme='dark'] .negus-notification-count {
          background: rgba(47, 107, 69, 0.25) !important;
          color: #5be39d !important;
        }

        .dark .negus-notification-item:hover,
        [data-theme='dark'] .negus-notification-item:hover {
          background: rgba(47, 107, 69, 0.2) !important;
        }

        .dark .negus-notification-copy strong,
        [data-theme='dark'] .negus-notification-copy strong {
          color: #eaf2ec !important;
        }

        .dark .negus-notification-copy span,
        [data-theme='dark'] .negus-notification-copy span {
          color: #9db2a4 !important;
        }

        .dark .negus-notification-footer,
        [data-theme='dark'] .negus-notification-footer {
          border-top-color: rgba(127, 191, 154, 0.15) !important;
        }

        .dark .negus-notification-footer a,
        [data-theme='dark'] .negus-notification-footer a {
          color: #dfc68a !important;
        }

        .negus-bell-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          min-width: 19px;
          height: 19px;
          border-radius: 9999px;
          background: #e04538;
          border: 2px solid var(--paper);
          color: #ffffff;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 10.5px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          box-shadow: 0 2px 6px rgba(224, 69, 56, 0.4);
        }

        /* Login and Register Buttons */
        .negus-auth-login {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ink);
          text-decoration: none;
          padding: 0 20px;
          border-radius: 9999px;
          border: 1.5px solid var(--line-strong);
          background: #ffffff;
          white-space: nowrap !important;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          transition: all 0.2s ease;
        }

        .negus-auth-login:hover {
          background: var(--green-subtle);
          border-color: var(--ink);
          color: var(--ink);
          transform: translateY(-1px);
        }

        .dark .negus-auth-login,
        [data-theme='dark'] .negus-auth-login {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .dark .negus-auth-login:hover,
        [data-theme='dark'] .negus-auth-login:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .negus-auth-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-height: 42px;
          padding: 0 22px;
          background: #123d2b;
          color: #ffffff !important;
          border: 1.5px solid #123d2b;
          border-radius: 9999px;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap !important;
          flex-shrink: 0;
          box-shadow: 0 3px 12px rgba(18, 61, 43, 0.2);
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }

        .negus-auth-cta:hover {
          transform: translateY(-1px);
          background: #19523b;
          border-color: #19523b;
          color: #ffffff !important;
          box-shadow: 0 5px 16px rgba(18, 61, 43, 0.28);
        }
          box-shadow: 0 4px 14px -2px rgba(18, 61, 43, 0.3);
        }

        .dark .negus-auth-cta,
        [data-theme='dark'] .negus-auth-cta {
          background: #2f6b45;
          color: #ffffff;
          border-color: #3d8a59;
          box-shadow: 0 4px 14px -2px rgba(47, 107, 69, 0.4);
        }

        .dark .negus-auth-cta:hover,
        [data-theme='dark'] .negus-auth-cta:hover {
          background: #387c52;
          border-color: #489b65;
          color: #ffffff;
        }

        .negus-auth-cta svg {
          transition: transform 0.2s ease;
        }

        .negus-auth-cta:hover svg {
          transform: translate(2px, -2px);
        }

        /* User Profile Pill */
        .negus-user-pill {
          display: flex;
          min-height: 44px;
          align-items: center;
          gap: 10px;
          padding: 5px 14px 5px 5px;
          border-radius: 9999px;
          border: 1px solid var(--line);
          background: var(--white);
          color: var(--ink);
          text-decoration: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .negus-user-pill:hover {
          border-color: var(--green);
          box-shadow: var(--shadow-sm);
        }

        .negus-user-pill span {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 13.5px;
          font-weight: 700;
        }

        /* Dashboard Pill */
        .negus-dash-pill {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--ink);
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .negus-dash-pill:hover {
          border-color: var(--green);
          background: var(--green-subtle);
        }

        /* Hamburger Button */
        .negus-burger {
          display: none;
          width: 44px;
          height: 44px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: transparent;
          border: 1px solid var(--line);
          border-radius: 10px;
          cursor: pointer;
          padding: 0;
          z-index: 160;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .negus-burger:hover {
          background: var(--green-subtle);
          border-color: var(--green);
        }

        .negus-burger span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--ink);
          border-radius: 2px;
          transition: transform 0.3s var(--ease-spring, cubic-bezier(0.16, 1, 0.3, 1)), opacity 0.2s ease;
        }

        .negus-burger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .negus-burger.open span:nth-child(2) {
          opacity: 0;
        }
        .negus-burger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile Overlay */
        .negus-mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 150;
          background: color-mix(in srgb, var(--paper) 98%, transparent);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          flex-direction: column;
          padding: 88px 24px 36px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s var(--ease-smooth, cubic-bezier(0.4, 0, 0.2, 1));
        }

        .dark .negus-mobile-overlay,
        [data-theme='dark'] .negus-mobile-overlay {
          background: color-mix(in srgb, #0b1410 98%, transparent);
        }

        .negus-mobile-overlay.open {
          display: flex;
          opacity: 1;
          pointer-events: auto;
        }

        @media (min-width: 1025px) {
          .negus-mobile-overlay {
            display: none !important;
          }
        }

        .negus-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow-y: auto;
          flex: 1;
        }

        .negus-mobile-item {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--ink);
          text-decoration: none;
          padding: 12px 0;
          border-bottom: 1px solid var(--line);
          transition: color 0.2s ease, padding-left 0.2s ease;
        }

        .negus-mobile-item:hover,
        .negus-mobile-item.active {
          color: var(--yellow);
          padding-left: 8px;
        }

        .negus-mobile-bottom {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid var(--line-strong);
        }

        .negus-mobile-bottom .negus-auth-login {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          border: 1.5px solid var(--line-strong);
          background: var(--white);
          color: var(--ink);
          font-weight: 700;
          font-size: 14px;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(18, 61, 43, 0.06);
          transition: all 0.2s ease;
        }

        .negus-mobile-bottom .negus-auth-login:hover {
          background: var(--green-subtle);
          border-color: var(--green);
        }

        .dark .negus-mobile-bottom .negus-auth-login,
        [data-theme='dark'] .negus-mobile-bottom .negus-auth-login {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .negus-mobile-bottom .negus-auth-cta {
          min-height: 46px;
          border-radius: 12px;
          font-size: 14px;
        }

        .negus-mobile-bottom .negus-user-pill {
          min-height: 46px;
          border-radius: 12px;
          justify-content: center;
          background: var(--white);
          border: 1.5px solid var(--line-strong);
        }

        .dark .negus-mobile-bottom .negus-user-pill,
        [data-theme='dark'] .negus-mobile-bottom .negus-user-pill {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        @media (max-width: 1024px) {
          .negus-header-inner {
            display: flex;
            justify-content: space-between;
          }
          .negus-nav-links { display: none; }
          .negus-header-actions .desktop-only { display: none; }
          .negus-burger { display: flex; }
        }

        @media (max-width: 480px) {
          .negus-announcement-strip {
            padding: 4px 10px 5px;
            font-size: 10px;
          }
          .negus-announcement-content {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            gap: 2px 6px;
            align-items: center;
            justify-content: stretch;
          }
          .negus-announcement-tag {
            grid-row: span 2;
            align-self: start;
            margin-top: 0;
            font-size: 8px;
          }
          .negus-announcement-msg {
            min-width: 0;
            line-height: 1.35;
          }
          .negus-announcement-cta {
            justify-self: start;
            font-size: 11px;
          }
          .negus-global-header {
            height: auto;
          }
          .negus-header-inner {
            padding: 0 14px;
          }
          .negus-header-logo {
            height: 32px;
          }
          .negus-header-actions {
            gap: 8px;
          }
          .negus-theme-toggle,
          .site-theme-toggle,
          .negus-bell-btn,
          .negus-burger {
            width: 38px;
            height: 38px;
            min-width: 38px;
            min-height: 38px;
            max-width: 38px;
            max-height: 38px;
            flex: 0 0 38px;
          }
          .negus-mobile-overlay {
            padding: 76px 18px 28px;
          }
          .negus-mobile-item {
            font-size: 20px;
            padding: 10px 0;
          }
        }

        @media (min-width: 1025px) and (max-width: 1500px) {
          .negus-header-inner {
            gap: 12px;
            padding-left: 24px;
            padding-right: 24px;
          }
          .negus-nav-links {
            gap: 2px;
          }
          .negus-nav-item {
            padding-left: 7px;
            padding-right: 7px;
          }
        }

        @media (max-width: 360px) {
          .negus-header-logo {
            height: 28px;
          }
          .negus-header-actions {
            gap: 5px;
          }
          .negus-theme-toggle,
          .site-theme-toggle,
          .negus-bell-btn,
          .negus-burger {
            width: 34px;
            height: 34px;
            min-width: 34px;
            min-height: 34px;
            max-width: 34px;
            max-height: 34px;
            flex: 0 0 34px;
          }
        }
      `}</style>

      {/* Top Announcement Strip (CEO Sketch Page 1) */}
      <div className="negus-announcement-strip">
        <div className="negus-announcement-content">
          <span className="negus-announcement-tag">ANNOUNCEMENT</span>
          <span className="negus-announcement-msg">
            📢 2026/2027 Scholarship Cohort Online Training Registration is Now Open! | Special Forex & Fee Notice
          </span>
          <Link to="/training" className="negus-announcement-cta">
            <span>Register for training</span>
            <ArrowUpRight width={12} height={12} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="negus-header-inner">
        {/* Brand Logo */}
        <Link
          to="/"
          className="negus-header-brand"
          aria-label="Negus Consultants home"
        >
          <img
            src={logoSrc}
            alt="Negus Consultants"
            className="negus-header-logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="negus-nav-links" aria-label="Main Navigation">
          {TABS.map((tab) => (
            <NavLink
              key={tab.href}
              to={tab.href}
              className={({ isActive }) =>
                `negus-nav-item${isActive ? " active" : ""}`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="negus-header-actions">
          {/* Utilities: Blog Bell */}
          <div className="negus-utilities-group">
            {/* Blog notification bell for logged in user */}
            {user && <div className="negus-notification-anchor" ref={notificationRef}>
              <button
                type="button"
                className="negus-bell-btn"
                aria-label="Blog updates"
                aria-haspopup="dialog"
                aria-expanded={notificationsOpen}
                aria-controls="negus-notification-popover"
                onClick={() => setNotificationsOpen((open) => !open)}
              >
                <Bell width={18} height={18} aria-hidden="true" />
              </button>
              {notificationsOpen && (
              <section
                id="negus-notification-popover"
                className="negus-notification-popover"
                role="dialog"
                aria-label="Latest Negus updates"
              >
                <div className="negus-notification-heading">
                  <div>
                    <h2>Latest updates</h2>
                    <p>New guidance from the Negus team.</p>
                  </div>
                  {blogs.length > 0 && (
                    <span className="negus-notification-count">
                      {blogs.length} posts
                    </span>
                  )}
                </div>
                <div className="negus-notification-list">
                  {isBlogsLoading ? (
                    <p className="negus-notification-empty" role="status">
                      Loading updates…
                    </p>
                  ) : isBlogsError ? (
                    <p className="negus-notification-empty" role="alert">
                      Updates are temporarily unavailable.
                    </p>
                  ) : blogs.length === 0 ? (
                    <p className="negus-notification-empty">
                      No new updates yet. Check back soon.
                    </p>
                  ) : (
                    blogs.slice(0, 6).map((blog) => {
                      const image = Array.isArray(blog.images)
                        ? blog.images[0]
                        : blog.images;
                      const excerpt = String(blog.content || "")
                        .replace(/<[^>]*>/g, " ")
                        .replace(/\s+/g, " ")
                        .trim();
                      return (
                        <Link
                          key={blog.id}
                          className="negus-notification-item"
                          to={`/blogs/${blog.id}`}
                          onClick={() => setNotificationsOpen(false)}
                        >
                          {image ? (
                            <img
                              className="negus-notification-image"
                              src={image}
                              alt=""
                              loading="lazy"
                            />
                          ) : (
                            <span
                              className="negus-notification-image"
                              aria-hidden="true"
                            />
                          )}
                          <span className="negus-notification-copy">
                            <strong>
                              {blog.title || "From the Negus team"}
                            </strong>
                            <span>
                              {excerpt ||
                                "Read the latest scholarship and application guidance."}
                            </span>
                          </span>
                        </Link>
                      );
                    })
                  )}
                </div>
                <div className="negus-notification-footer">
                  <Link to="/blogs" onClick={() => setNotificationsOpen(false)}>
                    Visit the journal{" "}
                    <ArrowUpRight width={14} height={14} aria-hidden="true" />
                  </Link>
                </div>
              </section>
            )}
          </div>}
        </div>

        <div className="negus-header-sep desktop-only" aria-hidden="true" />

        {/* Desktop Auth State */}
        <div className="desktop-only negus-auth-cluster">
          {isUserLoading ? (
            <span
              className="negus-account-skeleton"
              role="status"
              aria-label="Loading your account"
            />
          ) : user ? (
            <div className="flex items-center gap-3">
              {(user.role === "admin" || user.role === "semiadmin") && (
                <NavLink to="/dashboard" className="negus-dash-pill">
                  Dashboard
                </NavLink>
              )}
              <NavLink to="/profile" className="negus-user-pill">
                <UserProfile user={user} width={7} height={7} />
                <span>{user.first_name || "Profile"}</span>
              </NavLink>
            </div>
          ) : (
            <div className="negus-auth-buttons-pair">
              <NavLink to="/login" className="negus-auth-login">
                Sign in
              </NavLink>
              <NavLink to="/register" className="negus-auth-cta">
                <span>Create account</span>
                <ArrowUpRight width={14} height={14} aria-hidden="true" />
              </NavLink>
            </div>
          )}
        </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            type="button"
            className={`negus-burger ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`negus-mobile-overlay ${mobileMenuOpen ? "open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="negus-mobile-links">
          {TABS.map((tab) => (
            <NavLink
              key={tab.href}
              to={tab.href}
              className={({ isActive }) =>
                `negus-mobile-item${isActive ? " active" : ""}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {tab.label}
            </NavLink>
          ))}

          {user && (user.role === "admin" || user.role === "semiadmin") && (
            <NavLink
              to="/dashboard"
              className="negus-mobile-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
        </div>

        <div className="negus-mobile-bottom">
          {isUserLoading ? (
            <span
              className="negus-account-skeleton"
              role="status"
              aria-label="Loading your account"
            />
          ) : user ? (
            <>
              <NavLink
                to="/profile"
                className="negus-user-pill justify-center py-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserProfile user={user} width={7} height={7} />
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </NavLink>
              <a
                href="https://t.me/negushelpcenter"
                target="_blank"
                rel="noreferrer"
                className="negus-auth-cta justify-center py-3 text-center"
              >
                Talk to an Advisor <ArrowUpRight width={15} height={15} />
              </a>
            </>
          ) : (
            <div className="flex flex-col gap-2.5 w-full">
              <NavLink
                to="/register"
                className="negus-auth-cta justify-center text-center w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Create account</span>
                <ArrowUpRight width={15} height={15} />
              </NavLink>
              <NavLink
                to="/login"
                className="negus-auth-login justify-center text-center w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
