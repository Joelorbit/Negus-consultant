import { useState } from "react";
import { mentor as fallbackMentor } from "./MentorData";
import { cn } from "@/lib/utils";
import StarRating from "./StarRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { GraduationCap, Star } from "lucide-react";
import { toast } from "sonner";
import { getEmbedUrl } from "../../../../utils/yotubeUrl";
const tabs = ["About", "Education", "Reviews", "Availability"];

const TabsContent = ({ mentor }) => {
  const m = mentor || fallbackMentor;
  const [activeTab, setActiveTab] = useState("About");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim() || !reviewName.trim()) return;
    toast.success("Review submitted successfully!");
    setReviewText("");
    setReviewName("");
    setReviewRating(5);
  };
  return (
    <div>
      {/* Segmented Control */}
      <div className="flex bg-secondary/60 rounded-xl p-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === tab
                ? "bg-card shadow-premium text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="mt-6 animate-fade-in" key={activeTab}>
        {activeTab === "About" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border/50 shadow-premium p-6 bg-card">
              <h3 className="text-lg font-semibold mb-3">About</h3>
              <p className="text-muted-foreground leading-relaxed">{m.bio}</p>
            </div>

            {/* Introduction video */}
            {m.introduction_video_url && (
              <div className="rounded-2xl border border-border/50 shadow-premium p-6 bg-card">
                <h3 className="text-lg font-semibold mb-3">
                  Introduction Video
                </h3>
                <div className="w-full aspect-video rounded overflow-hidden">
                  <iframe
                    src={getEmbedUrl(m.introduction_video_url)}
                    title="Introduction video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
            <div className="rounded-2xl border border-border/50 shadow-premium p-6 bg-card">
              <h3 className="text-lg font-semibold mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {m.languages.map((l) => (
                  <span
                    key={l}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border/50 shadow-premium p-6 bg-card">
              <h3 className="text-lg font-semibold mb-3">Key Highlights</h3>
              <ul className="space-y-2">
                {m.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-muted-foreground text-sm"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {activeTab === "Education" && (
          <div className="space-y-4">
            {m.education.map((edu, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/50 shadow-premium p-6 bg-card flex gap-4"
              >
                <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {edu.institution}
                  </h4>
                  <p className="text-sm text-muted-foreground">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {edu.year} · {edu.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "Reviews" && (
          <div className="space-y-6">
            {/* Student Testimonials list styled like marketing page */}
            {m.reviews.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                    <span className="material-symbols-outlined text-primary">
                      chat
                    </span>
                    Student Testimonials
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {m.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.avatar} alt={review.name} />
                          <AvatarFallback>{review.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-sm text-foreground">
                            {review.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm">
                        <StarRating rating={review.rating} size={14} />
                      </div>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Write a Review */}
            <div className="rounded-2xl border border-border/50 shadow-premium p-6 bg-card">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <Input
                  placeholder="Your name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="rounded-xl"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Rating:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReviewRating(s)}
                      >
                        <Star
                          size={18}
                          className={cn(
                            "transition-colors",
                            s <= reviewRating
                              ? "fill-[hsl(var(--mentor-gold))] text-[hsl(var(--mentor-gold))]"
                              : "text-border",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea
                  placeholder="Share your experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="rounded-xl min-h-[100px]"
                />
                <Button
                  type="submit"
                  className="gradient-primary text-primary-foreground rounded-xl px-6 hover:shadow-glow transition-all duration-300"
                >
                  Submit Review
                </Button>
              </form>
            </div>
          </div>
        )}
        {activeTab === "Availability" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mentor.availability.map((day) => (
              <div
                key={day.day}
                className={cn(
                  "rounded-2xl border p-5 transition-all duration-300",
                  day.available
                    ? "border-primary/20 bg-card shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5"
                    : "border-border/30 bg-muted/30 opacity-60",
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground">
                    {day.day}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium px-2.5 py-0.5 rounded-full",
                      day.available
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {day.available ? "Available" : "Unavailable"}
                  </span>
                </div>
                {day.available && (
                  <div className="flex flex-wrap gap-2">
                    {day.slots.map((slot) => (
                      <span
                        key={slot}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground border border-border/50"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default TabsContent;
