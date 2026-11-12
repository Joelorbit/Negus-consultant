import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router";
import { VideoDetailPage } from "./Components/VideoDetailPage";
import { VideosPage } from "./Components/VideoPage";
import CourseMentorsSection from "./Components/CourseMentorsSection";
import { useCourseById } from "../../hooks/useCourses";
import { ArrowRight } from "lucide-react";
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
            <div className="course-overview-copy">
              <p className="public-eyebrow">YOUR APPLICATION, WITH A PLAN</p>
              <h2>Learn the moves that make a strong application.</h2>
              <p>Start with the course, then add the support package that fits your goals.</p>
            </div>
            <aside className="course-testimonial-snippet">
              <p className="public-eyebrow">STUDENT VOICE</p>
              <h3>What our students say</h3>
              <div className="course-testimonial-person">
                <img src="/assets/testimonials/photo_2026-11-12_11-26-18.jpg" alt="Arsema" />
                <div>
                  <strong>Arsema</strong>
                  <p>“Overall throughout the program I have learned so many things.”</p>
                </div>
              </div>
              <audio controls preload="none" src="/assets/arema.ogg" aria-label="Arsema voice testimonial" />
              <NavLink to="/about">See more... <ArrowRight aria-hidden="true" size={15} /></NavLink>
            </aside>
          </section>
          <CourseMentorsSection />
          <VideosPage onVideoSelect={handleVideoSelect} />
        </div>
      )}
    </main>
  );
}

export default Course;
