import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Calendar,
  ArrowRight,
  Globe2,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Send,
  Building2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { NavLink } from "react-router";
import {
  useScholarshipComments,
  useScholarshipLikes,
  useToggleScholarshipLike,
  useAddScholarshipComment,
} from "../../../hooks/useScholarships";
import { useMe } from "../../../hooks/useAuth";

const MotionArticle = motion.article;
const MotionDiv = motion.div;

export default function ScholarshipCard({
  scholarship,
  onSelect,
  isSelected,
  index = 0,
  isDetailPage = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localCommentsOpen, setLocalCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const {
    id,
    title,
    description,
    image_url,
    deadline,
    likes_count = 0,
    comments_count = 0,
    link,
    university,
    country,
    degree_level,
    funding_type,
    coverage = [],
  } = scholarship;

  const showComments = isDetailPage ? isSelected : (isSelected ?? localCommentsOpen);

  const { data: likesInfo } = useScholarshipLikes(id);
  const { data: comments } = useScholarshipComments(showComments ? id : null);
  const { mutate: toggleLike, isPending: likePending } = useToggleScholarshipLike();
  const { mutate: addComment, isPending: commentPending } = useAddScholarshipComment();
  const { data: user } = useMe();

  const handleLike = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to save & like scholarships");
      return;
    }
    toggleLike({ id });
  };

  const handleToggleComments = (e) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(id);
    } else {
      setLocalCommentsOpen((prev) => !prev);
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!user) {
      toast.error("Please log in to participate in the scholarship discussion");
      return;
    }
    addComment(
      { id, content: commentText.trim() },
      {
        onSuccess: () => {
          setCommentText("");
          toast.success("Question posted to scholarship thread!");
        },
        onError: () => {
          toast.error("Failed to post comment. Please try again.");
        },
      }
    );
  };

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Rolling / Open";

  const isLiked = likesInfo?.liked ?? false;
  const currentLikes = likesInfo?.likesCount ?? likes_count;
  const totalComments = comments?.length ?? comments_count;

  return (
    <MotionArticle
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl border border-border/80 bg-card p-6 md:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-xl dark:border-border/60 scholarship-card-item"
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Left: Thumbnail & Badges */}
        <div className="relative w-full lg:w-72 shrink-0 aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-2xl bg-muted border border-border/60">
          <img
            src={image_url || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=80"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Priority / Verified Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-900 shadow-sm dark:bg-slate-900/90 dark:text-slate-100">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Verified Award</span>
          </div>

          {/* Location / Country on Image Bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="flex items-center gap-1 font-medium drop-shadow-md">
              <Globe2 className="h-3.5 w-3.5 text-yellow-400" />
              {country || "International"}
            </span>
            <span className="rounded-md bg-black/50 backdrop-blur-sm px-2 py-0.5 text-[11px] font-semibold text-white/90">
              {degree_level || "Degree"}
            </span>
          </div>
        </div>

        {/* Center / Right: Scholarship Details */}
        <div className="flex-1 min-w-0 space-y-4 w-full">
          {/* Top Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="h-3.5 w-3.5" />
                {funding_type || "Fully Funded"}
              </span>
              {university && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  <Building2 className="h-3.5 w-3.5" />
                  {university}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/60">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <span>Deadline: {formattedDeadline}</span>
            </div>
          </div>

          {/* Scholarship Title */}
          <div>
            {isDetailPage ? (
              <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
                {title}
              </h2>
            ) : (
              <NavLink
                to={`/scholarships/${id}`}
                className="group/link block text-xl lg:text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
              >
                {title}
              </NavLink>
            )}
          </div>

          {/* Description */}
          <div>
            <p
              className={`text-sm md:text-base leading-relaxed text-muted-foreground ${
                isExpanded || isDetailPage ? "" : "line-clamp-2"
              }`}
            >
              {description}
            </p>
            {description && description.length > 180 && !isDetailPage && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 text-xs font-bold text-primary hover:underline focus:outline-none"
              >
                {isExpanded ? "Show less" : "Read more..."}
              </button>
            )}
          </div>

          {/* Key Coverage Highlights */}
          {coverage && coverage.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {coverage.slice(0, 4).map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-md bg-muted/80 px-2.5 py-1 text-xs text-muted-foreground border border-border/50"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          )}

          {/* Actions & Interaction Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/70">
            {/* Likes & Comments triggers */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLike}
                disabled={likePending}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  isLiked
                    ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400 shadow-sm"
                    : "border-border/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                title={isLiked ? "Unlike" : "Like this scholarship"}
              >
                <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{currentLikes}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleComments}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  showComments
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "border-border/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                title="View discussion thread"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{totalComments} {totalComments === 1 ? "Question" : "Questions"}</span>
              </button>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-3">
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                >
                  Official Link <ExternalLink className="h-3 w-3" />
                </a>
              )}

              {!isDetailPage ? (
                <NavLink to={`/scholarships/${id}`}>
                  <Button className="rounded-xl px-5 py-2 font-bold text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:translate-x-0.5">
                    View Details
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </NavLink>
              ) : (
                link && (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <Button className="rounded-xl px-6 py-2.5 font-bold text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                      Apply on Official Portal
                      <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Q&A Comments Area */}
      <AnimatePresence>
        {showComments && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-border/80 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Scholarship Questions & Discussion ({comments?.length || 0})
                </h4>
                <span className="text-xs text-muted-foreground">Ask counselors & fellow scholars</span>
              </div>

              {/* Comments Thread */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {comments && comments.length > 0 ? (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-2xl bg-muted/50 p-4 border border-border/50 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/20 text-primary text-[10px] font-extrabold flex items-center justify-center">
                            {c.first_name ? c.first_name[0].toUpperCase() : "S"}
                          </div>
                          <span className="text-xs font-bold text-foreground">
                            {c.first_name} {c.last_name}
                          </span>
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {c.created_at ? new Date(c.created_at).toLocaleDateString() : "Recently"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-8 leading-relaxed">
                        {c.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground py-3 text-center italic bg-muted/30 rounded-xl">
                    No questions yet on this scholarship. Be the first to ask!
                  </p>
                )}
              </div>

              {/* Post Question Input */}
              <form onSubmit={handlePostComment} className="relative pt-2">
                <Textarea
                  placeholder="Ask anything about eligibility, GPA, deadlines, or essays for this scholarship..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="rounded-2xl border-border bg-background p-3.5 text-xs transition-all focus-visible:ring-1 focus-visible:ring-primary min-h-[72px]"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={commentPending || !commentText.trim()}
                  className="absolute bottom-4 right-3 rounded-xl px-4 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="h-3 w-3 mr-1.5" />
                  {commentPending ? "Posting…" : "Ask"}
                </Button>
              </form>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionArticle>
  );
}
