import { useMemo, useState } from "react";
import { ArrowRight, Book, Search } from "iconoir-react";
import { NavLink } from "react-router";
import { useGetBlogs } from "../../hooks/useBlogs";
import BlogCard from "./components/BlogCard";
import "../public-pages.css";

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, refetch } = useGetBlogs();
  const posts = useMemo(() => Array.isArray(data) ? data : [], [data]);

  const categories = useMemo(
    () => ["All", ...new Set(posts.map((post) => post.category).filter(Boolean))],
    [posts],
  );
  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch = !query || `${post.title || ""} ${post.content || ""}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, search]);

  return (
    <main className="public-page blogs-page">
      <section className="public-page-hero">
        <div className="public-page-hero-inner">
          <p className="public-eyebrow"><Book aria-hidden="true" /> THE NEGUS JOURNAL</p>
          <h1 className="public-page-title">Practical advice for the next step in <em>your journey.</em></h1>
          <p className="public-page-copy">
            Read guidance from the Negus team on scholarships, applications, essays, test preparation, and studying abroad.
          </p>
          <div className="public-page-actions">
            <a className="public-button public-button-primary" href="#latest-articles">Read the latest <ArrowRight aria-hidden="true" /></a>
            <NavLink className="public-button public-button-secondary" to="/packages">Explore application support</NavLink>
          </div>
        </div>
      </section>

      <section className="public-content public-blog-list" id="latest-articles">
        <div className="public-section-heading">
          <div>
            <p className="public-eyebrow">LATEST ARTICLES</p>
            <h2>Ideas you can put to work.</h2>
          </div>
          <label className="public-blog-search">
            <Search aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search articles"
              aria-label="Search articles"
            />
          </label>
        </div>

        {!isLoading && !isError && posts.length > 0 && (
          <div className="public-blog-filters" aria-label="Filter articles by category">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="public-blog-grid" aria-label="Loading articles">
            {[0, 1, 2].map((item) => <div className="public-skeleton blog-skeleton" key={item} />)}
          </div>
        ) : isError ? (
          <div className="public-empty-state" role="alert">
            <h3>Articles are temporarily unavailable.</h3>
            <p>Try again in a moment, or explore the support options from Negus.</p>
            <div className="public-page-actions">
              <button className="public-button public-button-primary" onClick={() => refetch()}>Try again</button>
              <NavLink className="public-button public-button-secondary" to="/packages">View packages</NavLink>
            </div>
          </div>
        ) : filteredPosts.length ? (
          <div className="public-blog-grid">
            {filteredPosts.map((post) => <BlogCard key={post.id} {...post} />)}
          </div>
        ) : (
          <div className="public-empty-state">
            <h3>{posts.length ? "No articles match your search." : "New articles are on the way."}</h3>
            <p>{posts.length ? "Try another search or choose a different category." : "Explore courses and application support while we prepare the next update."}</p>
            {!posts.length && <NavLink className="public-button public-button-primary" to="/courses">Explore courses <ArrowRight aria-hidden="true" /></NavLink>}
          </div>
        )}
      </section>

      <section className="public-page-cta">
        <p className="public-eyebrow">TURN GOOD ADVICE INTO A PLAN</p>
        <h2>Ready for personal guidance?</h2>
        <p>Explore the services, then talk with the Negus team about your application and goals.</p>
        <div className="public-page-actions">
          <NavLink className="public-button public-button-light" to="/packages">See packages <ArrowRight aria-hidden="true" /></NavLink>
          <NavLink className="public-button public-button-outline-light" to="/register">Create an account</NavLink>
        </div>
      </section>
    </main>
  );
};

export default BlogsPage;
