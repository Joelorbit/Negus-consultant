import { VideoCard } from "./VideoCard";

export function VideoGrid({ videos, onVideoClick }) {
  return (
    <div className="course-video-grid">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onClick={onVideoClick} />
      ))}
    </div>
  );
}
