import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import MentorsCard from "./MentorsCard";
import { useMentor } from "../../hooks/useMentorApplications";
import { NavLink } from "react-router";
import "../public-pages.css";

const MentorsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const {
    data: mentorsRes,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useMentor({
    page,
    per_page: perPage,
    search,
    min_price: minPrice,
    max_price: maxPrice,
  });

  const mentors = mentorsRes?.data || [];
  const total = mentorsRes?.meta?.total ?? mentors.length;
  const isUnauthorized = error?.response?.status === 401;

  const applySearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  const applyFilters = () => {
    setPage(1);
    setMinPrice(minPriceInput);
    setMaxPrice(maxPriceInput);
  };

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Header */}
      <section className="public-page-hero">
        <div className="public-page-hero-inner">
          <p className="public-eyebrow">
            <Sparkles className="w-4 h-4 text-[var(--yellow)]" /> ONE-ON-ONE MENTORSHIP
          </p>
          <h1 className="public-page-title">
            Connect with scholars who have <em>been there.</em>
          </h1>
          <p className="public-page-copy">
            Receive personalized essay critiques, interview preparation, and
            university application roadmap guidance from Ethiopian students and
            graduates at world-class universities.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-[var(--ink-muted)]" />
              <Input
                className="pl-11 h-12 bg-[var(--white)] shadow-sm border-[var(--line-strong)] text-[var(--ink)] rounded-xl"
                placeholder="Search by name or specialty..."
                value={search}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applySearch();
                }}
              />
            </div>
            <button
              className="public-button public-button-primary h-12"
              onClick={applySearch}
            >
              <span>Search Mentors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-[var(--white)] p-6 rounded-2xl border border-[var(--line)] shadow-sm space-y-6">
            <h3 className="font-['Lexend'] font-bold text-lg text-[var(--ink)]">
              Filter Mentors
            </h3>

            {/* Price Filter */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[var(--ink-muted)] uppercase tracking-wider block font-['Lexend']">
                Rate ($/hr)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minPriceInput}
                  onChange={(e) => setMinPriceInput(e.target.value)}
                  className="bg-[var(--paper)] border-[var(--line)] text-sm rounded-lg"
                />
                <span className="text-[var(--ink-muted)]">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(e.target.value)}
                  className="bg-[var(--paper)] border-[var(--line)] text-sm rounded-lg"
                />
              </div>
            </div>

            <Button
              className="w-full bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-secondary)] font-['Lexend'] font-bold text-xs rounded-lg py-2.5"
              onClick={applyFilters}
            >
              Apply Filter
            </Button>
          </div>

          {/* Become a mentor card */}
          <div className="bg-[var(--green-subtle)] p-6 rounded-2xl border border-[var(--line)] text-center space-y-3">
            <h4 className="font-['Lexend'] font-bold text-sm text-[var(--ink)]">
              Are you an accepted scholar?
            </h4>
            <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
              Join our mentorship network and guide the next generation of
              Ethiopian scholars.
            </p>
            <NavLink
              to="/mentor/benefits"
              className="public-button public-button-primary w-full text-xs"
            >
              Apply to Mentor
            </NavLink>
          </div>
        </aside>

        {/* Mentor Grid */}
        <main className="lg:col-span-3 space-y-4">
          {!error && (
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[var(--ink-muted)] font-medium">
                {isFetching ? "Updating results · " : "Showing "}
                <span className="text-[var(--ink)] font-bold">{total}</span>{" "}
                available mentors
              </p>
            </div>
          )}

          <div className="grid gap-4">
            {isLoading && !error && (
              <div className="text-sm text-[var(--ink-muted)] py-8 text-center">
                Loading mentors…
              </div>
            )}
            {error && isUnauthorized && (
              <div className="bg-[var(--white)] border border-[var(--line)] rounded-2xl p-10 text-center space-y-3">
                <h3 className="font-['Lexend'] font-bold text-lg text-[var(--ink)]">
                  Sign in to browse mentors.
                </h3>
                <p className="text-sm text-[var(--ink-muted)]">
                  Our mentor directory is available to Negus members. Create a
                  free account or sign in to see who is available.
                </p>
                <div className="flex items-center justify-center gap-3 pt-1">
                  <NavLink
                    to="/login"
                    className="public-button public-button-primary text-xs"
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="public-button public-button-secondary text-xs"
                  >
                    Create account
                  </NavLink>
                </div>
              </div>
            )}
            {error && !isUnauthorized && (
              <div className="bg-[var(--white)] border border-[var(--line)] rounded-2xl p-10 text-center space-y-3" role="alert">
                <h3 className="font-['Lexend'] font-bold text-lg text-[var(--ink)]">
                  Mentors could not be loaded.
                </h3>
                <p className="text-sm text-[var(--ink-muted)]">
                  Check your connection and try again.
                </p>
                <button
                  className="public-button public-button-secondary text-xs"
                  onClick={() => refetch()}
                >
                  Try again
                </button>
              </div>
            )}
            {!isLoading && !error && mentors.length === 0 && (
              <div className="bg-[var(--white)] border border-[var(--line)] rounded-2xl p-10 text-center space-y-3">
                <h3 className="font-['Lexend'] font-bold text-lg text-[var(--ink)]">
                  No mentors match your search criteria.
                </h3>
                <p className="text-sm text-[var(--ink-muted)]">
                  Try clearing your filters or search keywords.
                </p>
                <button
                  className="public-button public-button-secondary text-xs"
                  onClick={resetFilters}
                >
                  Reset Search
                </button>
              </div>
            )}
            {!isLoading && !error &&
              mentors.map((mentor) => {
                const safeMentor = {
                  id: mentor.id,
                  first_name: mentor.first_name || "",
                  last_name: mentor.last_name || "",
                  profile_image: mentor.profile_image || "",
                  headline: mentor.headline || "Mentor",
                  bio: mentor.bio || "",
                  hourly_rate: mentor.hourly_rate || null,
                  currency: mentor.currency || "USD",
                  country: mentor.country || "",
                  skills: mentor.skills?.map((s) => s?.skill || s) || [],
                  visibility: mentor.visibility,
                  title: mentor.title || "",
                  organization: mentor.organization || "",
                  languages: mentor.languages || [],
                  years_of_experience: mentor.years_of_experience ?? null,
                  session_duration: mentor.session_duration_minutes || 60,
                  specialties: mentor.specialties || [],
                  rating: mentor.rating || null,
                  reviews: mentor.reviews_count || 0,
                  introduction_video_url: mentor.introduction_video_url || "",
                };
                return <MentorsCard key={safeMentor.id} mentor={safeMentor} />;
              })}
          </div>

          {/* Pagination */}
          {total > perPage && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--line)]">
              <div className="text-xs text-[var(--ink-muted)]">
                Page {page} of {Math.ceil(total / perPage)}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  size="sm"
                  variant="outline"
                  className="border-[var(--line)] text-xs font-bold"
                >
                  Prev
                </Button>
                <Button
                  disabled={page * perPage >= total}
                  onClick={() => setPage((p) => p + 1)}
                  size="sm"
                  variant="outline"
                  className="border-[var(--line)] text-xs font-bold"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MentorsPage;
