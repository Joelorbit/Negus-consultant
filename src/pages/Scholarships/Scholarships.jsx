import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Calendar,
  Check,
  RotateCcw,
  BookOpen,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScholarshipCard from "./components/ScholarshipCard";
import { useScholarships } from "../../hooks/useScholarships";
import { NavLink } from "react-router";
import "../public-pages.css";

const DEGREE_FILTERS = [
  { id: "all", label: "All Opportunities" },
  { id: "undergraduate", label: "Undergraduate" },
  { id: "masters", label: "Master's Degree" },
  { id: "phd", label: "PhD & Postgrad" },
  { id: "fully_funded", label: "Fully Funded Only" },
];

const SORT_OPTIONS = [
  { id: "deadline", label: "Upcoming Deadlines" },
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Recently Added" },
];

export default function ScholarshipsPage() {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");

  const { data, isLoading, isError, refetch } = useScholarships(page);

  const rawScholarships = useMemo(() => data?.scholarships ?? [], [data?.scholarships]);
  const pagination = data?.pagination;

  // Filter & sort scholarships client-side for ultra-responsive feel
  const filteredScholarships = useMemo(() => {
    let result = [...rawScholarships];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.title?.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q) ||
          s.university?.toLowerCase().includes(q) ||
          s.country?.toLowerCase().includes(q)
      );
    }

    if (activeFilter === "undergraduate") {
      result = result.filter((s) =>
        s.degree_level?.toLowerCase().includes("undergrad") ||
        s.degree_level?.toLowerCase().includes("bachelor")
      );
    } else if (activeFilter === "masters") {
      result = result.filter((s) =>
        s.degree_level?.toLowerCase().includes("master")
      );
    } else if (activeFilter === "phd") {
      result = result.filter((s) =>
        s.degree_level?.toLowerCase().includes("phd") ||
        s.degree_level?.toLowerCase().includes("postgrad")
      );
    } else if (activeFilter === "fully_funded") {
      result = result.filter((s) =>
        s.funding_type?.toLowerCase().includes("full") ||
        s.description?.toLowerCase().includes("full cost") ||
        s.description?.toLowerCase().includes("fully funded")
      );
    }

    if (sortBy === "deadline") {
      result.sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }

    return result;
  }, [rawScholarships, searchTerm, activeFilter, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setActiveFilter("all");
    setSortBy("deadline");
  };

  return (
    <main className="public-page scholarships-page">
      {/* ---------------- Hero Section ---------------- */}
      <section className="public-page-hero">
        <div className="public-page-hero-inner">
          <p className="public-eyebrow">
            <GraduationCap aria-hidden="true" /> VERIFIED GLOBAL SCHOLARSHIPS
          </p>
          <h1 className="public-page-title">
            Funding that turns ambition into <em>reality.</em>
          </h1>
          <p className="public-page-copy">
            Explore verified, fully funded scholarships and fellowships across the US,
            UK, Europe, and Asia. Hand-curated by Negus counselors with exact deadlines,
            complete coverage breakdowns, and official application portals.
          </p>

          <div className="public-page-actions">
            <a className="public-button public-button-primary" href="#scholarships-stream">
              Explore Live Scholarships <ArrowRight aria-hidden="true" />
            </a>
            <NavLink className="public-button public-button-secondary" to="/courses">
              Start with the course
            </NavLink>
          </div>

          <div className="public-hero-note">
            <Check aria-hidden="true" /> 100% Free Public Catalog · Verified Official Links · Updated Weekly
          </div>
        </div>
      </section>

      {/* ---------------- Key Stats Strip ---------------- */}
      <div className="border-b border-border/60 bg-muted/30 py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-extrabold text-foreground font-display">$2.5M+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Won by Our Scholars</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">100%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Verified Deadlines</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-extrabold text-foreground font-display">40+ Countries</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Eligible for Ethiopians</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-extrabold text-foreground font-display">Free</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Open Access Directory</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Main Content Area ---------------- */}
      <section className="public-content" id="scholarships-stream">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Search & Filter Bar */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by scholarship title, university, or country (e.g., Cambridge, Stanford, Germany)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 rounded-xl border-border bg-background text-sm focus-visible:ring-1 focus-visible:ring-primary"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-11 px-3.5 pr-8 rounded-xl border border-border/80 bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer negus-custom-select"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/60">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3 text-primary" /> Level:
              </span>
              {DEGREE_FILTERS.map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted/50 border-border/70 text-muted-foreground hover:bg-muted hover:text-foreground scholarship-filter-pill-inactive"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}

              {(searchTerm || activeFilter !== "all" || sortBy !== "deadline") && (
                <button
                  onClick={handleClearFilters}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <RotateCcw className="h-3 w-3" /> Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Heading */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display">
                Curated Opportunities
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                Showing {filteredScholarships.length} of {rawScholarships.length} verified awards
              </p>
            </div>

            {pagination?.totalPages > 1 && (
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-xl border border-border/60">
                <span>Page {page} of {pagination.totalPages}</span>
              </div>
            )}
          </div>

          {/* Loading Skeleton State */}
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-64 rounded-3xl border border-border/60 bg-muted/40 animate-pulse"
                />
              ))}
            </div>
          ) : isError ? (
            /* Error State */
            <div className="rounded-3xl border border-border/80 bg-card p-12 text-center space-y-4">
              <p className="text-base font-bold text-foreground">
                Unable to load scholarship listings at the moment.
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Please check your network connection or try refreshing the catalog.
              </p>
              <Button onClick={() => refetch()} className="rounded-xl px-6">
                Retry Loading
              </Button>
            </div>
          ) : filteredScholarships.length === 0 ? (
            /* Empty State */
            <div className="rounded-3xl border border-dashed border-border/80 bg-card p-12 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                No scholarships match your filters
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                We couldn’t find any awards matching "{searchTerm || activeFilter}". Try adjusting your keywords or clearing the filter options.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <Button variant="outline" onClick={handleClearFilters} className="rounded-xl text-xs font-bold">
                  Clear All Filters
                </Button>
                <a
                  href="https://t.me/negushelpcenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="public-button public-button-primary text-xs"
                >
                  Ask a Counselor on Telegram
                </a>
              </div>
            </div>
          ) : (
            /* Scholarships Stream */
            <div className="space-y-6">
              {filteredScholarships.map((scholarship, index) => (
                <ScholarshipCard
                  key={scholarship.id}
                  index={index}
                  scholarship={scholarship}
                  onSelect={(id) =>
                    setSelectedId((curr) => (curr === id ? null : id))
                  }
                  isSelected={selectedId === scholarship.id}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {pagination?.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-8">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  document.getElementById("scholarships-stream")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-xl px-5 text-xs font-bold border-border"
              >
                Previous
              </Button>
              <span className="text-xs font-bold text-muted-foreground">
                Page {page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page >= pagination.totalPages}
                onClick={() => {
                  setPage((p) => p + 1);
                  document.getElementById("scholarships-stream")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-xl px-5 text-xs font-bold border-border"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- Negus Guidance Banner / CTA ---------------- */}
      <section className="public-content border-t border-border/60">
        <aside className="public-offer-banner" aria-label="Negus Scholarship Coaching">
          <div className="public-offer-copy">
            <span className="public-offer-kicker">APPLICATION ASSISTANCE</span>
            <h3>Need an Ivy League or Oxford mentor to review your application?</h3>
            <p>
              Our mentors review statements of purpose, help refine your academic story,
              and prepare you for rigorous scholarship interview panels.
            </p>
            <div className="pt-3">
              <div className="public-page-actions">
                <NavLink to="/courses" className="public-button public-button-primary text-xs font-bold">
                  Start with the course <ArrowRight className="h-3.5 w-3.5" />
                </NavLink>
                <NavLink to="/packages" className="public-button public-button-secondary text-xs font-bold">
                  Explore application packages
                </NavLink>
              </div>
            </div>
          </div>
          <div className="public-offer-stamp" aria-hidden="true">
            <strong>100%</strong>
            <span>SUPPORT</span>
          </div>
        </aside>
      </section>
    </main>
  );
}
