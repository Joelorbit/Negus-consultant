import { Filter, X } from "lucide-react";

const categories = [
  "All",
  "Essay Writing",
  "Research",
  "Study Guides",
  "Reference Books",
];
const priceFilters = ["All", "Free", "Premium"];
const availableTags = [
  "Scholarship",
  "TOEFL",
  "IELTS",
  "University",
  "Application",
];

const chipStyle = (active) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 44,
  padding: "0 16px",
  borderRadius: 10,
  fontFamily: "var(--font-display)",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  background: active ? "var(--ink)" : "var(--white)",
  color: active ? "var(--paper)" : "var(--ink)",
  border: active
    ? "1px solid var(--ink)"
    : "1px solid var(--line-strong)",
});

const labelStyle = {
  display: "block",
  fontSize: 12.5,
  fontWeight: 600,
  color: "var(--ink-muted)",
  marginBottom: 10,
};

export const FilterBar = ({
  selectedCategory,
  selectedPrice,
  selectedTags,
  onCategoryChange,
  onPriceChange,
  onTagToggle,
  onClearFilters,
}) => {
  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedPrice !== "All" ||
    selectedTags.length > 0;

  return (
    <div
      className="sticky top-0 z-10 backdrop-blur-sm"
      style={{
        background: "color-mix(in srgb, var(--paper) 94%, transparent)",
        borderBottom: "1px solid var(--line)",
        padding: "16px 0",
      }}
    >
      <div
        className="mx-auto"
        style={{ width: "min(100% - 48px, 1160px)" }}
      >
        <div className="flex items-center gap-2" style={{ marginBottom: 18 }}>
          <Filter style={{ width: 16, height: 16, color: "var(--ink-muted)" }} />
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              color: "var(--ink)",
            }}
          >
            Filters
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              style={{
                ...chipStyle(false),
                marginLeft: "auto",
                padding: "0 14px",
              }}
            >
              <X style={{ width: 15, height: 15 }} />
              Clear all
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Category</label>
          <div className="flex flex-wrap" style={{ gap: 10 }}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                style={chipStyle(selectedCategory === category)}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Price</label>
          <div className="flex flex-wrap" style={{ gap: 10 }}>
            {priceFilters.map((price) => (
              <button
                key={price}
                type="button"
                style={chipStyle(selectedPrice === price)}
                onClick={() => onPriceChange(price)}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Filter */}
        <div>
          <label style={labelStyle}>Tags</label>
          <div className="flex flex-wrap" style={{ gap: 10 }}>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                style={chipStyle(selectedTags.includes(tag))}
                onClick={() => onTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
