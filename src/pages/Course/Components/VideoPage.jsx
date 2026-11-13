import { useState } from "react";
import { ArrowRight } from "iconoir-react";
import { NavLink } from "react-router";
import { CategoryFilter } from "./CategoryFilter";
import { VideoGrid } from "./VideoGrid";
import { useCourses, useCategories } from "../../../hooks/useCourses";

export function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const filters = {
    category: selectedCategory === "all" ? undefined : selectedCategory,
    sortBy,
  };
  const { data: videos = [], isLoading, error } = useCourses(filters);
  const { data: categories = [] } = useCategories();
  const visibleVideos = videos;

  return (
    <div className="course-catalog">
      <section className="public-content course-results" id="course-results">
        <div className="public-section-heading course-results-heading">
          <div>
            <p className="public-eyebrow">LEARN WITH DIRECTION</p>
            <h2>Explore available lessons.</h2>
          </div>
          <label className="course-sort-control">
            <span>Sort courses</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="newest">Newest</option>
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="course-results-status" aria-live="polite">
          {isLoading ? "Loading courses…" : error ? "Courses could not be loaded." : `${visibleVideos.length} ${visibleVideos.length === 1 ? "course" : "courses"} to explore`}
        </div>

        {isLoading ? (
          <div className="course-video-grid" aria-label="Loading courses">
            {[0, 1, 2].map((item) => <div className="public-skeleton course-skeleton" key={item} />)}
          </div>
        ) : error ? (
          <div className="public-empty-state" role="alert">
            <h3>Courses are temporarily unavailable.</h3>
            <p>Try again in a moment, or explore application support while we reconnect.</p>
            <NavLink className="public-button public-button-primary" to="/packages">Explore packages <ArrowRight aria-hidden="true" /></NavLink>
          </div>
        ) : visibleVideos.length ? (
          <VideoGrid videos={visibleVideos} />
        ) : (
          <div className="public-empty-state">
            <h3>No courses are available yet.</h3>
            <p>Contact our team to ask about upcoming courses and training.</p>
            <NavLink className="public-button public-button-primary" to="/packages">Explore packages <ArrowRight aria-hidden="true" /></NavLink>
          </div>
        )}
      </section>
    </div>
  );
}
