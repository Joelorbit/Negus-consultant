export function CategoryFilter({ categories = [], selectedCategory, onCategoryChange }) {
  const relevantCategories = categories.filter((category) =>
    !/\b(web\s*development|ai\s*&?\s*ml|artificial intelligence|machine learning|programming|software development)\b/i.test(category.name || ""),
  );

  return (
    <div className="course-category-filter" aria-label="Filter courses by category">
      <style>{`
        .course-category-filter { gap: 12px; }
        .course-category-filter button {
          min-height: 44px;
          padding: 0 20px;
          font-size: 13px;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
      `}</style>
      <button
        type="button"
        className={selectedCategory === "all" ? "active" : ""}
        aria-pressed={selectedCategory === "all"}
        onClick={() => onCategoryChange("all")}
      >
        All courses
      </button>
      {relevantCategories.map((category) => (
        <button
          type="button"
          key={category.id}
          className={selectedCategory === String(category.id) ? "active" : ""}
          aria-pressed={selectedCategory === String(category.id)}
          onClick={() => onCategoryChange(String(category.id))}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
