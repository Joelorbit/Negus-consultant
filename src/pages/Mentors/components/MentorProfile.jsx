import { useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import MentorSidebar from "./ProfileComponents/Sidebar";
import BookingModal from "./ProfileComponents/BookingModal";
import { useGetMentorById, useGetMentorReview } from "../../../hooks/useMentor";
import { mentor as fallbackMentor } from "./ProfileComponents/MentorData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "./ProfileComponents/StarRating";
import { getEmbedUrl } from "../../../utils/yotubeUrl";

const MentorProfile = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { id } = useParams();
  const { data: mentorRes, isLoading, isError } = useGetMentorById(id);
  const { data: reviewsRes } = useGetMentorReview(id);

  if (isLoading) return <p>Loading mentor...</p>;
  if (isError) return <p>Error loading mentor.</p>;

  const apiMentor = (mentorRes && (mentorRes.data || mentorRes)) || {};

  const reviews = reviewsRes || [];
  const avgRating = reviews.length
    ? Math.round(
        (reviews.reduce((s, r) => s + (r.rating || r.score || 0), 0) /
          reviews.length) *
          10,
      ) / 10
    : apiMentor.rating || fallbackMentor.rating;

  const mappedMentor = {
    name:
      apiMentor.name ||
      [apiMentor.first_name, apiMentor.last_name].filter(Boolean).join(" ") ||
      fallbackMentor.name,
    title: apiMentor.position || apiMentor.title || fallbackMentor.title,
    company: apiMentor.company || fallbackMentor.company,
    avatar:
      apiMentor.profile_image || apiMentor.avatar || fallbackMentor.avatar,
    rating: apiMentor.rating || avgRating,
    reviewCount: reviews.length || fallbackMentor.reviewCount,
    bio: apiMentor.bio || fallbackMentor.bio,
    specializations:
      apiMentor.specialties ||
      apiMentor.specializations ||
      fallbackMentor.specializations,
    languages: apiMentor.languages || fallbackMentor.languages,
    highlights: apiMentor.highlights || fallbackMentor.highlights,
    stats: {
      sessionsCompleted:
        apiMentor.sessions_completed ||
        apiMentor.sessionsCompleted ||
        fallbackMentor.stats.sessionsCompleted,
      yearsExperience:
        apiMentor.years_experience ||
        apiMentor.years_of_experience ||
        fallbackMentor.stats.yearsExperience,
      studentsMentored:
        apiMentor.students_helped ||
        apiMentor.studentsMentored ||
        fallbackMentor.stats.studentsMentored,
      rating: apiMentor.rating || fallbackMentor.stats.rating,
    },
    education: apiMentor.education || fallbackMentor.education,
    reviews: reviews.map((r) => ({
      id: r.id || r._id || Math.random(),
      name:
        r.name ||
        [r.first_name, r.last_name].filter(Boolean).join(" ") ||
        r.user_name ||
        "Anonymous",
      avatar: r.avatar || r.user_avatar || fallbackMentor.reviews?.[0]?.avatar,
      rating: r.rating || r.score || 0,
      date:
        r.date ||
        (r.created_at ? format(new Date(r.created_at), "MMM d, yyyy") : ""),
      text: r.comment || r.text || "",
    })),
    availability:
      apiMentor.availability ||
      apiMentor.available_days ||
      fallbackMentor.availability,
    introduction_video_url: apiMentor.introduction_video_url || null,
    country: apiMentor.country || null,
    timezone: apiMentor.timezone || null,
    socials: apiMentor.socials || fallbackMentor.socials,
    sessionRate:
      apiMentor.session_rate ||
      apiMentor.hourly_rate ||
      fallbackMentor.sessionRate,
    sessionDuration:
      apiMentor.session_duration ||
      apiMentor.sessionDuration ||
      fallbackMentor.sessionDuration,
  };

  return (
    <div className="relative min-h-screen bg-[hsl(var(--mentor-surface))]">
      <div className="relative mx-auto max-w-7xl w-full px-6 lg:px-20 py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span className="hover:text-primary cursor-pointer">Home</span>
          <span className="text-xs">/</span>
          <span className="hover:text-primary cursor-pointer">Mentors</span>
          <span className="text-xs">/</span>
          <span className="text-foreground font-medium">
            {mappedMentor.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left column: main content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Hero section */}
            <section className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-lg border-4 border-background">
                  <img src={mappedMentor.avatar} alt={mappedMentor.name} />
                  <Avatar className="w-full h-full">
                    <AvatarFallback className="text-2xl font-semibold">
                      {mappedMentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {mappedMentor.availability && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-background" />
                )}
              </div>

              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {mappedMentor.name}
                  </h1>
                  {mappedMentor.availability && (
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                      Verified Mentor
                    </span>
                  )}
                </div>

                <p className="text-lg text-muted-foreground font-medium">
                  {mappedMentor.title}
                  {mappedMentor.company && (
                    <>
                      {" "}
                      at{" "}
                      <span className="text-foreground">
                        {mappedMentor.company}
                      </span>
                    </>
                  )}
                </p>

                <p className="text-muted-foreground max-w-xl italic">
                  {mappedMentor.bio}
                </p>

                {/* Key stats */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl shadow-sm">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="font-bold text-foreground">
                      {mappedMentor.rating?.toFixed
                        ? mappedMentor.rating.toFixed(1)
                        : mappedMentor.rating}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      ({mappedMentor.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl shadow-sm">
                    <span className="text-primary text-sm">👥</span>
                    <span className="font-bold text-foreground">
                      {mappedMentor.stats?.studentsMentored || 0}+
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Students
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl shadow-sm">
                    <span className="text-primary text-sm">⏱</span>
                    <span className="font-bold text-foreground">
                      {mappedMentor.stats?.yearsExperience || 0}+
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Years Exp
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* About section */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <span className="text-primary text-lg">👤</span>
                About {mappedMentor.name.split(" ")[0] || "Mentor"}
              </h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>{mappedMentor.bio}</p>
              </div>
            </section>

            {/* Expertise tags */}
            {mappedMentor.specializations &&
              mappedMentor.specializations.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                    <span className="text-primary text-lg">🎯</span>
                    Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mappedMentor.specializations.map((s) => (
                      <span
                        key={s}
                        className="bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-sm font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </section>
              )}

            {/* Intro video */}
            {mappedMentor.introduction_video_url && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <span className="text-primary text-lg">▶</span>
                  Intro Video
                </h3>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-xl">
                  <iframe
                    src={getEmbedUrl(mappedMentor.introduction_video_url)}
                    title="Introduction video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </section>
            )}

            {/* Reviews / Testimonials */}
            {mappedMentor.reviews && mappedMentor.reviews.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                    <span className="text-primary text-lg">💬</span>
                    Student Testimonials
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mappedMentor.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={review.avatar}
                            alt={review.name}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {review.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-sm text-foreground">
                            {review.name}
                          </p>
                          {review.date && (
                            <p className="text-xs text-muted-foreground">
                              {review.date}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <StarRating rating={review.rating} />
                      </div>
                      {review.text && (
                        <p className="text-sm text-muted-foreground italic">
                          "{review.text}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right column: existing sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <MentorSidebar
                onBookSession={() => setBookingOpen(true)}
                mentor={mappedMentor}
              />
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        mentor={mappedMentor}
      />
    </div>
  );
};

export default MentorProfile;
