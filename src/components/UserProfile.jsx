import React from "react";

const UserProfile = ({ user, width = 8, height = 8 }) => {
  const initials =
    `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase() || "N";

  const size = typeof width === "number" ? width * 4 : 32;
  const heightSize = typeof height === "number" ? height * 4 : size;

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${heightSize}px`,
        borderRadius: "50%",
        background: "linear-gradient(135deg, var(--ink) 0%, var(--ink-secondary) 100%)",
        color: "var(--yellow)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: `${Math.max(11, Math.round(Math.min(size, heightSize) * 0.36))}px`,
        fontWeight: 700,
        fontFamily: "var(--font-display)",
        overflow: "hidden",
        border: "1.5px solid var(--line-strong)",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {user?.profile_image ? (
        <img
          src={user.profile_image}
          alt={user?.first_name || "User"}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default UserProfile;
