import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router";
import { VideoDetailPage } from "./Components/VideoDetailPage";
import { VideosPage } from "./Components/VideoPage";
import { useCourseById } from "../../hooks/useCourses";
import { ArrowRight, Play } from "lucide-react";
import "../public-pages.css";

const COURSE_PREVIEW_ID = "ytDhlQqU384";
const COURSE_PREVIEW_TITLE =
  "Complete Guide to the U.S. College Application (Common App, Essays, & Scholarships)";

function Course() {
  const [searchParams, setSearchParams] = useSearchParams();
  const videoId = searchParams.get("video");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  // Supports direct links like /courses?video=<id> by loading the course by id
  const { data: deepLinkedCourse } = useCourseById(videoId);

  useEffect(() => {
    if (deepLinkedCourse) setSelectedVideo(deepLinkedCourse);
  }, [deepLinkedCourse]);

  useEffect(() => {
    if (!videoId) setSelectedVideo(null);
  }, [videoId]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    if (video?.id) setSearchParams({ video: video.id }, { replace: true });
  };

  const handleBackToVideos = () => {
    setSelectedVideo(null);
    setSearchParams({}, { replace: true });
  };

  const showDetail = Boolean(selectedVideo);

  return (
    <main className="public-page public-courses-page">
      {showDetail ? (
        <div className="course-detail-shell">
          <VideoDetailPage video={selectedVideo} onBack={handleBackToVideos} />
        </div>
      ) : (
        <div>
          <section className="course-intro-section">
            <div className="course-intro-inner">
              <div className="course-intro-copy">
                <p className="public-eyebrow">START HERE · COURSE PREVIEW</p>
                <h1>Build a stronger application, <em>step by step.</em></h1>
                <p>
                  Watch our guide to the U.S. college application journey, from the Common App
                  and essays to scholarships. Then explore lessons that help you put each part
                  into practice.
                </p>
                <NavLink className="public-button public-button-primary" to="#course-results">
                  Explore the lessons <ArrowRight aria-hidden="true" />
                </NavLink>
              </div>
              <div className="course-intro-video">
                {isPreviewPlaying ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${COURSE_PREVIEW_ID}?autoplay=1&rel=0`}
                    title={COURSE_PREVIEW_TITLE}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    className="course-intro-play"
                    aria-label={`Play: ${COURSE_PREVIEW_TITLE}`}
                    onClick={() => setIsPreviewPlaying(true)}
                  >
                    <img src="/assets/course-preview.jpg" alt="" />
                    <span><Play aria-hidden="true" fill="currentColor" />Play the course preview</span>
                  </button>
                )}
              </div>
            </div>
          </section>
          <VideosPage onVideoSelect={handleVideoSelect} />
        </div>
      )}
    </main>
  );
}

export default Course;
