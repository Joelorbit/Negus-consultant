import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  Group,
  Book,
  Check,
  Lock,
  ChatBubble,
  Send,
  Spark,
} from "iconoir-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CourseVideoPlayer } from "./CourseVideoPlayer";
import { RelatedVideos } from "./RelatedVideos";
import {
  useCourses,
  useCourseComments,
  useCreateCourseComment,
} from "../../../hooks/useCourses";
import { useMe } from "../../../hooks/useAuth";
import { toast } from "sonner";
import { UpgradeCard } from "../../../components/UpgradeCard";
import { NavLink } from "react-router";
import { navigateToLogin } from "../../../utils/mobileNavigation";
import { mentorProfiles } from "../../../assets/mentorProfiles";

export function VideoDetailPage({ video, onBack }) {
  const [newComment, setNewComment] = useState("");
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const { data: comments } = useCourseComments(video.id);
  const { mutate: createComment } = useCreateCourseComment();
  const { data: user, isLoading: isUserLoading } = useMe();
  const { data: allCourses = [] } = useCourses();

  const relatedVideos = allCourses.filter((c) => c.id !== video.id).slice(0, 3);

  const handleComment = () => {
    if (!newComment.trim()) return toast.error("Comment cannot be empty");
    if (!user) {
      toast.error("You must be signed in to comment");
      navigateToLogin("comment");
      return;
    }
    createComment(
      { user_id: user.id, course_id: video.id, comment: newComment.trim() },
      {
        onSuccess: () => setNewComment(""),
        onError: (err) => toast.error(err.message || "Failed to add comment"),
      }
    );
  };

  const previewLength = 280;
  const description = video.description || "";
  const isLongDescription = description.length > previewLength;
  const displayedDescription = descriptionExpanded
    ? description
    : description.slice(0, previewLength);

  const subscriptionExpiresAt = new Date(user?.subscription_end_date).getTime();
  const hasActiveSubscription =
    user?.subscription_status === true &&
    Number.isFinite(subscriptionExpiresAt) &&
    subscriptionExpiresAt > Date.now();
  const hasAccess = Boolean(user) && hasActiveSubscription;
  const instructor = mentorProfiles.find((mentor) =>
    video.instructor_name?.toLowerCase().includes(mentor.name.split(" ")[0].toLowerCase()),
  );
  const instructorProfilePath = instructor
    ? `/about/mentors/${instructor.name.toLowerCase().replaceAll(" ", "-")}`
    : null;

  return (
    <div className="negus-video-detail-page">
      <style>{`
        .negus-video-detail-page {
          background: var(--paper);
          color: var(--ink);
          font-family: var(--font-body, 'Outfit', sans-serif);
          padding: 36px var(--gutter, 24px) 80px;
        }

        .negus-detail-container {
          max-width: 1240px;
          margin: 0 auto;
        }

        .negus-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          border: 1px solid var(--line);
          background: var(--white);
          color: var(--ink);
          padding: 8px 18px;
          border-radius: 8px;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 28px;
          transition: border-color 0.2s, background-color 0.2s, transform 0.2s;
        }

        .negus-back-btn:hover {
          border-color: var(--green);
          background: var(--green-subtle);
          transform: translateX(-2px);
        }

        .negus-detail-grid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
          gap: 36px;
        }

        @media (max-width: 1024px) {
          .negus-detail-grid {
            grid-template-columns: 1fr;
          }
        }

        .negus-detail-main {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .negus-player-box {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          background: #000;
          border: 1px solid var(--line);
          box-shadow: var(--shadow-card);
        }

        .negus-locked-box {
          position: relative;
          aspect-ratio: 16 / 9;
          width: 100%;
          overflow: hidden;
          background: #0e1713;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 24px;
        }

        .negus-locked-box img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
        }

        .negus-locked-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          max-width: 440px;
        }

        .negus-locked-icon {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(209, 189, 130, 0.2);
          border: 1px solid var(--yellow);
          color: var(--yellow);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .negus-locked-title {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }

        .negus-locked-desc {
          font-size: 13.5px;
          color: #e0e5e0;
          margin: 0;
          line-height: 1.5;
        }

        .negus-panel {
          border: 1px solid var(--line);
          border-radius: 18px;
          background: var(--white);
          padding: 28px;
          box-shadow: var(--shadow-sm);
        }

        .negus-detail-title {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          letter-spacing: -0.035em;
          color: var(--ink);
          margin: 0 0 20px;
          line-height: 1.25;
        }

        .negus-meta-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
          font-size: 13px;
          color: var(--ink-muted);
        }

        .negus-level-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 44px;
          padding: 8px 14px;
          border-radius: 9999px;
          background: var(--green-soft);
          color: var(--ink);
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .negus-instructor-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 22px;
          border-radius: 14px;
          background: var(--green-subtle);
          border: 1px solid var(--line);
          margin-bottom: 24px;
        }

        .negus-instructor-info h4 {
          margin: 0;
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
        }

        .negus-instructor-info p {
          margin: 2px 0 0;
          font-size: 12.5px;
          color: var(--ink-muted);
        }

        .negus-instructor-profile {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 14px;
          flex: 1;
          color: inherit;
          text-decoration: none;
          border-radius: 10px;
        }

        .negus-instructor-profile:hover .negus-instructor-info h4 {
          color: var(--gold-ink);
        }

        .negus-instructor-profile:focus-visible {
          outline: 3px solid var(--gold-ink);
          outline-offset: 4px;
        }

        .negus-section-title {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 16px;
        }

        .negus-body-text {
          font-size: 15px;
          line-height: 1.7;
          color: var(--ink-secondary);
          margin: 0 0 20px;
        }

        .negus-checklist {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .negus-checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--ink);
        }

        .negus-checklist-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--green-soft);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .negus-comment-box {
          margin-top: 32px;
          padding-top: 28px;
          border-top: 1px solid var(--line);
        }

        .negus-comment-input {
          width: 100%;
          border: 1px solid var(--line-strong);
          border-radius: 10px;
          padding: 12px 16px;
          background: var(--paper);
          color: var(--ink);
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 14px;
          resize: vertical;
          margin-bottom: 12px;
          outline: none;
          transition: border-color 0.2s;
        }

        .negus-comment-input:focus {
          border-color: var(--ink);
        }

        .negus-comment-thread {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 24px;
          max-height: 400px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .negus-comment-card {
          padding: 18px 20px;
          border-radius: 12px;
          background: var(--green-subtle);
          border: 1px solid var(--line);
        }

        .negus-comment-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .negus-comment-author {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }

        .negus-comment-date {
          font-size: 12px;
          color: var(--ink-muted);
        }

        .negus-comment-body {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--ink-secondary);
          margin: 0;
        }

        /* Sidebar Cards */
        .negus-side-card {
          border: 1px solid var(--line);
          border-radius: 16px;
          background: var(--white);
          padding: 22px;
          box-shadow: var(--shadow-sm);
        }

        .negus-side-title {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .negus-stat-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--line);
          font-size: 13.5px;
        }

        .negus-stat-row:last-child {
          border-bottom: 0;
        }

        .negus-stat-label {
          color: var(--ink-muted);
        }

        .negus-stat-val {
          font-family: var(--font-display, 'Lexend', sans-serif);
          font-weight: 700;
          color: var(--ink);
        }
      `}</style>

      {hasActiveSubscription && <UpgradeCard />}

      <div className="negus-detail-container">
        {/* Back to Courses Button */}
        <button
          type="button"
          onClick={onBack}
          className="negus-back-btn"
          aria-label="Return to course catalog"
        >
          <ArrowLeft width={16} height={16} />
          <span>Back to available lessons</span>
        </button>

        <div className="negus-detail-grid">
          {/* Main Column */}
          <div className="negus-detail-main">
            {/* Video Player Box */}
            <div className="negus-player-box">
              {isUserLoading ? (
                <div className="negus-locked-box" role="status" aria-live="polite">
                  <div className="negus-locked-content">
                    <p className="negus-locked-desc">Checking your course access…</p>
                  </div>
                </div>
              ) : hasAccess ? (
                <CourseVideoPlayer course={video} />
              ) : (
                <div className="negus-locked-box">
                  {video.thumbnail && (
                    <img src={video.thumbnail} alt={video.title} />
                  )}
                  <div className="negus-locked-content">
                    <div className="negus-locked-icon">
                      <Lock width={26} height={26} />
                    </div>
                    <h3 className="negus-locked-title">Unlock this lesson</h3>
                    <p className="negus-locked-desc">
                      An active course package unlocks this lesson and the rest of the learning library.
                    </p>
                    <NavLink
                      to="/packages"
                      className="public-button public-button-primary"
                      style={{ marginTop: "16px" }}
                    >
                      <span>Explore packages</span>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

            {/* Course Overview Panel */}
            <div className="negus-panel">
              <h1 className="negus-detail-title">{video.title}</h1>

              <div className="negus-meta-bar">
                {video.level && (
                  <span className="negus-level-pill">{video.level}</span>
                )}
                {video.duration && (
                  <span className="flex items-center gap-1.5">
                    <Clock width={15} height={15} /> {video.duration}
                  </span>
                )}
                {video.enrolled_students && (
                  <span className="flex items-center gap-1.5">
                    <Group width={15} height={15} />{" "}
                    {video.enrolled_students.toLocaleString()} students
                  </span>
                )}
              </div>

              {/* Instructor */}
              <div className="negus-instructor-card">
                {instructorProfilePath ? (
                  <NavLink
                    to={instructorProfilePath}
                    className="negus-instructor-profile"
                    aria-label={`View ${instructor.name}'s profile`}
                  >
                    <Avatar className="h-12 w-12 border border-[var(--line-strong)]">
                      <AvatarImage src={video.instructor_avatar} />
                      <AvatarFallback className="bg-[var(--ink)] text-[var(--yellow)] font-bold">
                        {video.instructor_name?.[0] || "N"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="negus-instructor-info">
                      <h4>{video.instructor_name || "Negus Advisor"}</h4>
                      <p>{video.instructor_title || "Admissions Mentor"}</p>
                    </div>
                  </NavLink>
                ) : (
                  <>
                    <Avatar className="h-12 w-12 border border-[var(--line-strong)]">
                      <AvatarImage src={video.instructor_avatar} />
                      <AvatarFallback className="bg-[var(--ink)] text-[var(--yellow)] font-bold">
                        {video.instructor_name?.[0] || "N"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="negus-instructor-info">
                      <h4>{video.instructor_name || "Negus Advisor"}</h4>
                      <p>{video.instructor_title || "Admissions Mentor"}</p>
                    </div>
                  </>
                )}
                <NavLink
                  to="/files"
                  className="negus-back-btn ml-auto text-[13.5px]"
                  style={{ marginBottom: 0 }}
                >
                  <Book width={14} height={14} /> Notes &amp; Files
                </NavLink>
              </div>

              {/* Description */}
              <h3 className="negus-section-title">About this Lesson</h3>
              <p className="negus-body-text">
                {displayedDescription}
                {!descriptionExpanded && isLongDescription && "..."}
              </p>
              {isLongDescription && (
                <button
                  type="button"
                  className="text-[13px] font-bold text-[var(--ink)] underline hover:text-[var(--gold-ink)] mb-6 flex h-11 max-w-fit items-center"
                  onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                >
                  {descriptionExpanded ? "Show less" : "Read full description"}
                </button>
              )}

              {/* What You'll Learn */}
              {Array.isArray(video.what_to_learn) &&
                video.what_to_learn.length > 0 && (
                  <>
                    <h3 className="negus-section-title">What You'll Learn</h3>
                    <ul className="negus-checklist">
                      {video.what_to_learn.map((point, idx) => (
                        <li key={idx} className="negus-checklist-item">
                          <span className="negus-checklist-icon">
                            <Check width={12} height={12} />
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

              {/* Discussion / Q&A */}
              <div className="negus-comment-box">
                <h3 className="negus-section-title flex items-center gap-2">
                  <ChatBubble width={18} height={18} /> Questions &amp;
                  Discussion
                </h3>

                <textarea
                  className="negus-comment-input"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={
                    user
                      ? "Have a question about this lesson? Ask here…"
                      : "Please sign in to join the discussion and ask questions."
                  }
                  readOnly={!user}
                  onClick={() => {
                    if (!user) {
                      toast.error("Please sign in to comment");
                      navigateToLogin("comment");
                    }
                  }}
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleComment}
                    className="public-button public-button-primary"
                  >
                    <span>{user ? "Post Question" : "Sign in to Post"}</span>
                    <Send width={14} height={14} />
                  </button>
                </div>

                {/* Comment Thread */}
                <div className="negus-comment-thread">
                  {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                      <div className="negus-comment-card" key={comment.id}>
                        <div className="negus-comment-head">
                          <div className="negus-course-avatar" style={{ width: "32px", height: "32px", fontSize: "12px" }}>
                            {comment.user?.name?.[0] || "U"}
                          </div>
                          <span className="negus-comment-author">
                            {comment.user?.name || "Student"}
                          </span>
                          <span className="negus-comment-date">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="negus-comment-body">{comment.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[12.5px] text-[var(--ink-muted)] py-4 text-center">
                      No questions yet. Be the first to start the discussion!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="flex flex-col gap-5">
            {/* Help / Guidance Card */}
            <div className="negus-side-card">
              <h4 className="negus-side-title">
                <Spark width={18} height={18} /> Need Application Mentorship?
              </h4>
              <p className="text-[12.5px] text-[var(--ink-secondary)] leading-relaxed mb-4">
                Get guidance on applications, scholarship options, and your next steps.
              </p>
              <NavLink
                to="/packages"
                className="public-button public-button-primary w-full text-center"
              >
                View Packages &amp; Mentors
              </NavLink>
            </div>

            {/* Course Information Stats */}
            <div className="negus-side-card">
              <h4 className="negus-side-title">
                <Book width={18} height={18} /> Course Details
              </h4>
              <div className="negus-stat-row">
                <span className="negus-stat-label">Category</span>
                <span className="negus-stat-val">
                  {video.category_name || "General"}
                </span>
              </div>
              <div className="negus-stat-row">
                <span className="negus-stat-label">Duration</span>
                <span className="negus-stat-val">{video.duration || "N/A"}</span>
              </div>
              <div className="negus-stat-row">
                <span className="negus-stat-label">Level</span>
                <span className="negus-stat-val">{video.level || "Beginner"}</span>
              </div>
              <div className="negus-stat-row">
                <span className="negus-stat-label">Format</span>
                <span className="negus-stat-val">On-Demand Video</span>
              </div>
            </div>

            {/* Related Courses */}
            {relatedVideos.length > 0 && (
              <RelatedVideos
                videos={relatedVideos}
                currentVideoId={video.id}
                onVideoClick={onBack}
              />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
