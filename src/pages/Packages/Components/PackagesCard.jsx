import {
  Book,
  Check,
  Crown,
  GraduationCap,
  Group,
  Flash,
  Page,
  Spark,
  Star,
  ArrowRight,
  HelpCircle,
  VideoCamera,
} from "iconoir-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import { smartNavigate } from "../../../utils/mobileNavigation";
import { toast } from "sonner";
import { getPackagePriceBreakdown } from "../../../utils/packagePricing";

const packageIcons = {
  BookOpen: Book,
  Book,
  Crown,
  FileText: Page,
  Star,
  Users: Group,
  Group,
  Zap: Flash,
  Flash,
  Clapperboard: VideoCamera,
  VideoCamera,
  GraduationCap,
  Spark,
};

export const PackageCard = ({
  pkg,
  isSelected,
  onSelect,
  onNavigate,
  applyDiscount = pkg.type !== "service",
}) => {
  const IconComponent = packageIcons[pkg.icon] || GraduationCap;
  const hasContactPrice =
    pkg.price == null || String(pkg.price).toLowerCase().includes("contact");
  const priceBreakdown =
    !hasContactPrice && applyDiscount
      ? getPackagePriceBreakdown(pkg.price)
      : null;
  const showDiscount = Boolean(priceBreakdown?.offerSaving > 0);
  const displayedPrice = priceBreakdown?.total ?? Number(pkg.price);
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    // If custom navigation is passed
    if (typeof onNavigate === "function" && pkg.id === "additional") {
      return onNavigate();
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please sign in to choose a package");

      const fromRoute =
        pkg.name === "Full Course"
          ? `/packages/full-course/${pkg.id}`
          : `/packages/${pkg.id}`;

      smartNavigate("/login", { state: { from: fromRoute } });
      return;
    }

    // Normal navigation
    if (pkg.name === "Full Course") {
      navigate(`/packages/full-course/${pkg.id}`);
    } else {
      navigate(`/packages/${pkg.id}`);
    }

    if (typeof onSelect === "function") onSelect();
  };

  const isHighlighted = isSelected || Boolean(pkg.popular);

  return (
    <article
      className={`negus-plan-card-refined ${isHighlighted ? "highlighted" : ""}`}
      onClick={(e) => handleNavigate(e)}
    >
      <style>{`
        .negus-plan-card-refined {
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--line);
          border-radius: var(--radius-lg, 20px);
          background: var(--white);
          color: var(--ink);
          padding: 32px 26px 26px;
          cursor: pointer;
          transition: transform 0.25s var(--ease-spring, cubic-bezier(0.16, 1, 0.3, 1)),
                      box-shadow 0.25s ease,
                      border-color 0.25s ease;
          box-shadow: var(--shadow-sm);
        }

        .negus-plan-card-refined:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: var(--green);
        }

        .negus-plan-card-refined.highlighted {
          border-color: var(--yellow);
          box-shadow: var(--shadow-card), 0 0 0 1px var(--yellow);
        }

        .negus-card-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          min-height: 28px;
        }

        .negus-card-popular-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 9999px;
          background: var(--yellow);
          color: #123d2b;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .negus-card-discount-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 9999px;
          background: var(--green-soft);
          color: var(--ink);
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 700;
        }

        .negus-card-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--green-subtle);
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          margin-bottom: 18px;
        }

        .negus-card-title {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin: 0 0 8px;
          line-height: 1.25;
        }

        .negus-card-desc {
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 13.5px;
          color: var(--ink-secondary);
          line-height: 1.6;
          margin: 0 0 22px;
          min-height: 42px;
        }

        .negus-card-pricing {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 7px;
          padding-bottom: 22px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 22px;
        }

        .negus-card-price-before { color: var(--ink-muted); font-size: 12px; }
        .negus-card-price-before del { text-decoration-thickness: 1px; }
        .negus-card-price-current { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
        .negus-card-savings { color: var(--gold-ink); font-size: 12px; font-weight: 700; }

        .negus-card-price-num {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--ink);
          line-height: 1;
        }

        .negus-card-price-unit {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 700;
          color: var(--ink-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .negus-card-price-period {
          font-size: 12px;
          color: var(--ink-muted);
          margin-left: 2px;
        }

        .negus-card-features {
          list-style: none;
          padding: 0;
          margin: 0 0 26px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }

        .negus-card-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--ink);
        }

        .negus-card-check-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--green-soft);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .negus-card-btn {
          width: 100%;
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 8px;
          border: 1px solid var(--ink);
          background: var(--ink);
          color: var(--paper);
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
          margin-top: auto;
        }

        .negus-plan-card-refined:hover .negus-card-btn {
          background: var(--ink-secondary);
          border-color: var(--ink-secondary);
        }

        .negus-card-btn svg {
          transition: transform 0.2s ease;
        }

        .negus-plan-card-refined:hover .negus-card-btn svg {
          transform: translateX(3px);
        }
      `}</style>

      {/* Top Badges */}
      <div className="negus-card-badge-row">
        {pkg.popular ? (
          <span className="negus-card-popular-badge">
            <Spark width={12} height={12} /> Most Popular
          </span>
        ) : (
          <span />
        )}
        {showDiscount ? (
          <span className="negus-card-discount-badge">50% OFF</span>
        ) : pkg.discount ? (
          <span className="negus-card-discount-badge">{pkg.discount}</span>
        ) : <span />}
      </div>

      {/* Card Icon */}
      <div className="negus-card-icon-wrap">
        <IconComponent width={26} height={26} />
      </div>

      {/* Title */}
      <h3 className="negus-card-title">{pkg.name}</h3>

      {/* Description */}
      <p className="negus-card-desc">
        {pkg.description ||
          "Structured guidance designed to support your application goals with clarity and confidence."}
      </p>

      {/* Pricing Row */}
      <div className="negus-card-pricing">
        {hasContactPrice ? (
          <span className="negus-card-price-num" style={{ fontSize: "28px" }}>
            Contact Us
          </span>
        ) : (
          <>
            {priceBreakdown && (
              <div className="negus-card-price-before">
                <del>{pkg.currency || "ETB"} {priceBreakdown.listPrice.toLocaleString()}</del>
                <span className="negus-card-savings"> · Save 50%</span>
              </div>
            )}
            <div className="negus-card-price-current">
              <span className="negus-card-price-num">
                {displayedPrice.toLocaleString()}
              </span>
              <span className="negus-card-price-unit">
                {pkg.currency || "ETB"}
              </span>
            </div>
            {!!pkg.duration_days && (
              <span className="negus-card-price-period">
                {pkg.duration_days} days of support
              </span>
            )}
          </>
        )}
      </div>

      {/* Features List */}
      <ul className="negus-card-features">
        {pkg?.features?.map((feature, idx) => (
          <li key={idx} className="negus-card-feature-item">
            <span className="negus-card-check-icon">
              <Check width={12} height={12} />
            </span>
            <span>{typeof feature === "string" ? feature : feature.name}</span>
          </li>
        ))}
      </ul>

      {/* Action Button */}
      <button
        type="button"
        className="negus-card-btn"
        onClick={(e) => handleNavigate(e)}
      >
        <span>{isHighlighted ? "Get Started" : "Select Plan"}</span>
        <ArrowRight width={16} height={16} aria-hidden="true" />
      </button>
    </article>
  );
};
