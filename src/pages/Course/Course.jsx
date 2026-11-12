import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { VideoDetailPage } from "./Components/VideoDetailPage";
import { VideosPage } from "./Components/VideoPage";
import { useCourseById } from "../../hooks/useCourses";
import "../public-pages.css";

function Course() {
  const [searchParams, setSearchParams] = useSearchParams();
  const videoId = searchParams.get("video");
  const [selectedVideo, setSelectedVideo] = useState(null);

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
          <section className="course-overview-strip">
            <div>
              <p className="public-eyebrow">YOUR APPLICATION, WITH A PLAN</p>
              <h2>Learn the moves that make a strong application.</h2>
              <p>Start with the course, then add the support package that fits your goals.</p>
            </div>
            <div className="course-overview-stats">
              <span><strong>23</strong> Videos</span>
              <span><strong>600+</strong> Students</span>
              <span><strong>1:1</strong> Guidance</span>
            </div>
          </section>
          <VideosPage onVideoSelect={handleVideoSelect} />
        </div>
      )}
    </main>
  );
}

export default Course;
