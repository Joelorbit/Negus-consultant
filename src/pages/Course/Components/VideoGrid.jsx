import { VideoCard } from "./VideoCard";

export function VideoGrid({ videos }) {
  return (
    <div className="course-video-grid">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
