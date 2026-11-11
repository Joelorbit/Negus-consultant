import { useState } from "react";
import { useParams, Link } from "react-router";
import { format, formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMe } from "../../../../../hooks/useAuth";
import { navigateToLogin } from "../../../../../utils/mobileNavigation";
import {
  useCreateComment,
  useCreateLike,
  useDeleteLike,
  useGetBlogById,
  useGetComments,
  useGetLikesCount,
} from "../../../../../hooks/useBlogs";

export const BlogDetail = () => {
  const { id } = useParams();
  const { data: user } = useMe();

  const [selectedImage, setSelectedImage] = useState(0);
  const { data: blog, isLoading } = useGetBlogById(id);
  const [commentText, setCommentText] = useState("");

  const { data: likeData } = useGetLikesCount(id, user?.id);
  const { mutate: createComment, isPending: isCommenting } = useCreateComment();
  const { data: comments } = useGetComments(id);
  const { mutate: createLike } = useCreateLike();
  const { mutate: deleteLike } = useDeleteLike();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error("Please enter a comment before posting.");
      return;
    }

    if (!user) {
      toast.error("Please log in to leave a comment.");
      navigateToLogin("comment");
      return;
    }

    createComment(
      {
        post_id: id,
        user_id: user.id,
        comment: commentText.trim(),
      },
      {
        onSuccess: () => {
          setCommentText("");
          toast.success("Comment posted successfully!");
        },
        onError: () => {
          toast.error("Failed to post comment. Please try again.");
        },
      }
    );
  };

  const handleToggleLike = () => {
    if (!user) {
      toast.error("Please log in to like articles.");
      navigateToLogin("like posts");
      return;
    }
    if (likeData?.like) {
      deleteLike({ id, user_id: user.id });
    } else {
      createLike({ post_id: id, user_id: user.id });
    }
  };

  const calculateReadingTime = (text = "") => {
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "96px 20px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div className="w-10 h-10 border-3 border-[var(--line)] border-t-[var(--green)] rounded-full animate-spin" />
        <p className="text-sm font-['Lexend'] font-semibold text-[var(--ink-muted)]">
          Loading article…
        </p>
      </div>
    );
  }

  const images = blog?.images || [];
  const activeImage = images[selectedImage] || images[0];
  const authorName =
    [blog?.first_name, blog?.last_name].filter(Boolean).join(" ") ||
    "Negus Advisory Team";
  const authorInitial = authorName.charAt(0).toUpperCase();

  return (
    <article
      className="blog-reader-shell"
      style={{
        width: "100%",
        maxWidth: "860px",
        margin: "0 auto",
        padding: "clamp(24px, 4vw, 44px) clamp(16px, 3vw, 24px) 80px",
        boxSizing: "border-box",
      }}
    >
      {/* Back button */}
      <div style={{ marginBottom: "20px" }}>
        <Link
          to="/blogs"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            minHeight: "44px",
            fontSize: "12px",
            fontFamily: "var(--font-display, 'Lexend', sans-serif)",
            fontWeight: 700,
            color: "var(--ink-muted)",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "color 0.2s ease",
          }}
          className="hover:text-[var(--ink)]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </Link>
      </div>

      {/* Main Editorial Reading Card */}
      <div
        className="blog-article-card"
        style={{
          background: "var(--white)",
          border: "1px solid var(--line)",
          borderRadius: "22px",
          padding: "clamp(28px, 5vw, 48px)",
          boxShadow: "var(--shadow-sm)",
          boxSizing: "border-box",
        }}
      >
        {/* Article Header (Centered) */}
        <header style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontFamily: "var(--font-display, 'Lexend', sans-serif)",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              background: "var(--yellow-soft)",
              color: "var(--ink)",
              border: "1px solid var(--line)",
              marginBottom: "16px",
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold-ink)]" />
            <span>{blog?.category || "Scholarship Guidance"}</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display, 'Lexend', sans-serif)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "var(--ink)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
              textAlign: "center",
            }}
          >
            {blog?.title}
          </h1>

          {/* Author, Date, Reading Time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "14px",
              fontSize: "13px",
              color: "var(--ink-secondary)",
              paddingBottom: "22px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {blog?.profile_image ? (
                <img
                  src={blog.profile_image}
                  alt={authorName}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid var(--line)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "var(--green-soft)",
                    color: "var(--ink)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  {authorInitial}
                </div>
              )}
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                {authorName}
              </span>
            </div>

            <span style={{ color: "var(--line-strong)" }}>•</span>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--ink-muted)" }}>
              <Calendar className="w-3.5 h-3.5 text-[var(--gold-ink)]" />
              <span>
                {blog?.created_at
                  ? format(new Date(blog.created_at), "MMMM d, yyyy")
                  : "Recently Published"}
              </span>
            </div>

            <span style={{ color: "var(--line-strong)" }}>•</span>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--ink-muted)" }}>
              <Clock className="w-3.5 h-3.5 text-[var(--ink-secondary)]" />
              <span>{calculateReadingTime(blog?.content)} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        {activeImage && (
          <div style={{ marginBottom: "36px" }}>
            <div
              style={{
                overflow: "hidden",
                borderRadius: "16px",
                border: "1px solid var(--line)",
                background: "var(--paper)",
                aspectRatio: "16/9",
                width: "100%",
              }}
            >
              <img
                src={activeImage}
                alt={blog?.title || "Blog cover"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "14px",
                }}
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: `2px solid ${
                        selectedImage === idx ? "var(--green)" : "var(--line)"
                      }`,
                      opacity: selectedImage === idx ? 1 : 0.7,
                      cursor: "pointer",
                      padding: 0,
                      background: "transparent",
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Article Body - Clean Editorial Typography */}
        <div
          style={{
            fontSize: "17px",
            lineHeight: 1.85,
            color: "var(--ink)",
            letterSpacing: "-0.005em",
            marginBottom: "40px",
            whiteSpace: "pre-line",
          }}
        >
          {blog?.content ? (
            blog.content
          ) : (
            <p style={{ color: "var(--ink-muted)", fontStyle: "italic", textAlign: "center", padding: "32px 0" }}>
              No content published yet for this article.
            </p>
          )}
        </div>

        {/* Engagement & Likes Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderRadius: "14px",
            background: "var(--paper)",
            border: "1px solid var(--line)",
            marginBottom: "36px",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          <button
            type="button"
            onClick={handleToggleLike}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "10px",
              fontSize: "13px",
              fontFamily: "var(--font-display, 'Lexend', sans-serif)",
              fontWeight: 700,
              border: "1px solid var(--line)",
              cursor: "pointer",
              background: likeData?.like ? "var(--green-soft)" : "var(--white)",
              color: "var(--ink)",
              transition: "all 0.2s ease",
            }}
          >
            <Heart
              className={`w-4 h-4 ${
                likeData?.like
                  ? "fill-[var(--gold-ink)] text-[var(--gold-ink)]"
                  : "text-[var(--ink-muted)]"
              }`}
            />
            <span>{likeData?.likesCount || 0} Likes</span>
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--ink-muted)",
            }}
          >
            <span>Official community:</span>
            <a
              href="https://t.me/negushelpcenter"
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "9px 14px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                background: "var(--white)",
                color: "var(--ink)",
                textDecoration: "none",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                minHeight: "36px",
              }}
            >
              Telegram
            </a>
            <a
              href="https://www.tiktok.com/@negus.consultant"
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "9px 14px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                background: "var(--white)",
                color: "var(--ink)",
                textDecoration: "none",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                minHeight: "36px",
              }}
            >
              TikTok
            </a>
          </div>
        </div>

        {/* Discussion / Comments Section */}
        <section
          style={{
            padding: "clamp(20px, 4vw, 32px)",
            borderRadius: "18px",
            background: "var(--paper)",
            border: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "16px",
              marginBottom: "20px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display, 'Lexend', sans-serif)",
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--ink)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                margin: 0,
              }}
            >
              <MessageSquare className="w-5 h-5 text-[var(--gold-ink)]" />
              <span>Discussion ({comments?.length || 0})</span>
            </h3>
          </div>

          {/* Comment input form */}
          <form onSubmit={handleCommentSubmit} style={{ marginBottom: "28px" }}>
            <Textarea
              rows={3}
              placeholder={
                user
                  ? "Share your perspective or ask a question about this article…"
                  : "Please log in to leave a comment on this article."
              }
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={!user || isCommenting}
              className="w-full p-4 rounded-xl bg-[var(--white)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)] resize-none"
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
              <Button
                type="submit"
                disabled={!user || isCommenting || !commentText.trim()}
                className="font-['Lexend'] font-bold rounded-lg bg-[var(--ink)] hover:bg-[var(--ink-secondary)] text-[var(--paper)]"
              >
                {isCommenting ? "Posting…" : "Post Comment"}
                <Send className="w-3.5 h-3.5 ml-2" />
              </Button>
            </div>
          </form>

          {/* Comments stream */}
          <div style={{ display: "grid", gap: "12px" }}>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--white)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "var(--green-soft)",
                        color: "var(--ink)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "12px",
                      }}
                    >
                      {(comment?.first_name || "A").charAt(0).toUpperCase()}
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-display, 'Lexend', sans-serif)",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        color: "var(--ink)",
                      }}
                    >
                      {[comment?.first_name, comment?.last_name]
                        .filter(Boolean)
                        .join(" ") || "Applicant"}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--ink-muted)", marginLeft: "auto" }}>
                      {comment?.created_at
                        ? formatDistanceToNow(new Date(comment.created_at), {
                            addSuffix: true,
                          })
                        : "Just now"}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--ink-secondary)",
                      lineHeight: 1.6,
                      margin: "0 0 0 38px",
                    }}
                  >
                    {comment.comment}
                  </p>
                </div>
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  padding: "24px 0",
                  fontSize: "13.5px",
                  color: "var(--ink-muted)",
                  fontFamily: "var(--font-display, 'Lexend', sans-serif)",
                }}
              >
                No comments yet. Start the conversation!
              </p>
            )}
          </div>
        </section>

        {/* Call to action at bottom of blog */}
        <div
          style={{
            marginTop: "40px",
            padding: "32px 24px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, var(--paper) 0%, var(--green-soft) 100%)",
            border: "1px solid var(--line-strong)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-display, 'Lexend', sans-serif)",
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "var(--gold-ink)",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            APPLY SMART WITH NEGUS
          </div>
          <h4
            style={{
              fontFamily: "var(--font-display, 'Lexend', sans-serif)",
              fontSize: "clamp(20px, 3vw, 24px)",
              fontWeight: 800,
              color: "var(--ink)",
              margin: "0 0 10px",
            }}
          >
            Ready to build your scholarship roadmap?
          </h4>
          <p
            style={{
              fontSize: "14px",
              color: "var(--ink-secondary)",
              maxWidth: "520px",
              margin: "0 auto 20px",
              lineHeight: 1.65,
            }}
          >
            Explore our admissions packages and expert-led video courses to secure full-ride awards.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
            <Link
              to="/packages"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "44px",
                padding: "0 22px",
                borderRadius: "10px",
                background: "var(--ink)",
                color: "var(--paper)",
                fontFamily: "var(--font-display, 'Lexend', sans-serif)",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Explore Packages
            </Link>
            <Link
              to="/courses"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "44px",
                padding: "0 22px",
                borderRadius: "10px",
                border: "1px solid var(--line-strong)",
                background: "var(--white)",
                color: "var(--ink)",
                fontFamily: "var(--font-display, 'Lexend', sans-serif)",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;
