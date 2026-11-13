import { useState } from "react";
import { NavLink, useSearchParams } from "react-router";
import { VideoDetailPage } from "./Components/VideoDetailPage";
import { VideosPage } from "./Components/VideoPage";
import { useCourseById } from "../../hooks/useCourses";
import { ArrowDown, ArrowLeft } from "lucide-react";
import "../public-pages.css";

const COURSE_PREVIEW_ID = "ytDhlQqU384";
const COURSE_GUIDE_TITLE =
  "Complete Guide to the U.S. College Application (Common App, Essays, & Scholarships)";

function Course() {
  const [searchParams, setSearchParams] = useSearchParams();
  const videoId = searchParams.get("video");
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const {
    data: deepLinkedCourse,
    isLoading: isCourseLoading,
    isError: hasCourseError,
  } = useCourseById(videoId);

  const handleBackToVideos = () => {
    setSearchParams({}, { replace: true });
  };

  return (
    <main className="public-page public-courses-page">
      {videoId ? (
        deepLinkedCourse ? (
        <div className="course-detail-shell">
          <VideoDetailPage video={deepLinkedCourse} onBack={handleBackToVideos} />
        </div>
        ) : (
          <section className="public-content course-direct-load" aria-live="polite">
            {isCourseLoading ? (
              <p role="status">Loading this course…</p>
            ) : hasCourseError ? (
              <>
                <h1>This course couldn’t be loaded.</h1>
                <p>Please try again, or return to the course list.</p>
                <NavLink className="public-button public-button-primary" to="/courses">
                  <ArrowLeft aria-hidden="true" /> Back to courses
                </NavLink>
              </>
            ) : (
              <>
                <h1>This course is unavailable.</h1>
                <p>It may have been removed. Browse the available courses instead.</p>
                <NavLink className="public-button public-button-primary" to="/courses">
                  <ArrowLeft aria-hidden="true" /> Back to courses
                </NavLink>
              </>
            )}
          </section>
        )
      ) : (
        <div>
          <section className="course-intro-section">
            <div className="course-intro-inner">
              <div className="course-intro-copy">
                <p className="public-eyebrow">START HERE · WATCH THE GUIDE</p>
                <h1>Build a stronger application, <em>step by step.</em></h1>
                <p>
                  Watch our guide to the U.S. college application journey, from the Common App
                  and essays to scholarships. Then explore lessons that help you put each part
                  into practice.
                </p>
              </div>
              <div className="course-intro-video">
                {isPreviewPlaying ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${COURSE_PREVIEW_ID}?autoplay=1&rel=0`}
                    title={COURSE_GUIDE_TITLE}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    className="course-intro-play"
                    aria-label={`Play the guide: ${COURSE_GUIDE_TITLE}`}
                    onClick={() => setIsPreviewPlaying(true)}
                  >
                    <img src="/assets/course-preview.jpg" alt="" />
                    <span>Play the guide</span>
                  </button>
                )}
              </div>
              <a className="public-button public-button-primary course-explore-lessons" href="#course-results">
                Explore the lessons <ArrowDown aria-hidden="true" />
              </a>
            </div>
          </section>
          <VideosPage />
        </div>
      )}
    </main>
  );
}

export default Course;
