import React from "react";

const Badge = ({ item, strike }) => {
  return (
    <span
      className={`${strike ? "line-through" : ""} text-xs font-medium text-muted-foreground`}
    >
      {item}
    </span>
  );
};

export default Badge;
