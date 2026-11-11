import { Download, Lock, Eye, FileText } from "lucide-react";
import { useMe } from "../../../hooks/useAuth";
import { NavLink } from "react-router";

const baseBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 7,
  minHeight: 44,
  padding: "0 14px",
  borderRadius: 10,
  fontFamily: "var(--font-display)",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  flex: 1,
  textDecoration: "none",
};

const primaryBtn = {
  ...baseBtn,
  background: "var(--ink)",
  color: "var(--paper)",
  border: "1px solid var(--ink)",
};

const secondaryBtn = {
  ...baseBtn,
  background: "var(--white)",
  color: "var(--ink)",
  border: "1px solid var(--line-strong)",
};

const accessBtn = {
  ...baseBtn,
  background: "var(--primary)",
  color: "var(--paper)",
  border: "1px solid var(--primary)",
};

export const ResourceCard = ({ resource, onDownload }) => {
  const { data: user } = useMe();

  const isLocked = resource.id !== "0" && user?.subscription_status !== true;

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{
        background: "var(--white)",
        border: "1px solid var(--line)",
        borderRadius: 18,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        className="relative shrink-0"
        style={{ height: 190, background: "var(--green-soft)" }}
      >
        {resource.thumbnail ? (
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText
              style={{ width: 64, height: 64, color: "var(--line-strong)" }}
            />
          </div>
        )}

        {/* Price Badge */}
        <span
          className="absolute top-3 right-3"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: 28,
            padding: "0 12px",
            borderRadius: 999,
            fontFamily: "var(--font-display)",
            fontSize: 12,
            fontWeight: 700,
            background: resource.isFree ? "var(--ink)" : "var(--yellow)",
            color: resource.isFree ? "var(--paper)" : "#123d2b",
          }}
        >
          {resource.isFree ? "Free" : "Premium"}
        </span>

        {/* Lock Overlay */}
        {isLocked && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "rgba(18, 61, 43, 0.62)",
              backdropFilter: "blur(1px)",
            }}
          >
            <div className="text-center" style={{ color: "#fffdf6" }}>
              <Lock
                className="mx-auto"
                style={{ width: 34, height: 34, color: "var(--yellow)" }}
              />
              <p
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1.5,
                }}
              >
                Unlock All 17 Courses
                <br /> and Files
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col" style={{ padding: 22, gap: 12 }}>
        <h3
          className="line-clamp-2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1.35,
            color: "var(--ink)",
            margin: 0,
          }}
        >
          {resource.title}
        </h3>
        <p
          className="line-clamp-2"
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--ink-muted)",
            margin: 0,
          }}
        >
          {resource.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          {resource.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 11px",
                borderRadius: 999,
                border: "1px solid var(--line)",
                background: "var(--green-subtle)",
                color: "var(--ink-secondary)",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metadata */}
        <div
          className="flex items-center"
          style={{ gap: 10, fontSize: 12.5, color: "var(--ink-muted)" }}
        >
          <span>{resource.format}</span>
          <span
            style={{
              width: 3,
              height: 3,
              borderRadius: 999,
              background: "var(--line-strong)",
            }}
          ></span>
          <span>{resource.size}</span>
        </div>

        {/* Actions */}
        <div
          className="mt-auto flex items-stretch"
          style={{ gap: 10, paddingTop: 6 }}
        >
          {!isLocked && resource.id !== "0" ? (
            <>
              <a
                href={resource.path}
                target="_blank"
                rel="noopener noreferrer"
                style={secondaryBtn}
              >
                <Eye className="h-4 w-4" />
                Preview
              </a>
              <button
                type="button"
                onClick={() => onDownload(resource)}
                style={primaryBtn}
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </>
          ) : resource.id === "0" ? (
            <a
              href={resource.path}
              target="_blank"
              rel="noopener noreferrer"
              style={primaryBtn}
            >
              <Download className="h-4 w-4" />
              Get for Free
            </a>
          ) : (
            <NavLink
              to="/packages/full-course/b2427308-b9a9-4b89-8b55-24308243e756"
              style={accessBtn}
            >
              <Lock className="h-4 w-4" />
              Get access
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
