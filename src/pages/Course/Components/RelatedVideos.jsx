export function RelatedVideos({ videos, currentVideoId, onVideoClick }) {
  const getThumbnail = (video) =>
    video.youtube_id
      ? `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`
      : video.thumbnail;

  const relatedVideos = videos
    .filter((v) => v.id !== currentVideoId)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary">Related Courses</h3>
      <div className="grid gap-4">
        {relatedVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => onVideoClick(video)}
            className="flex items-center gap-4 p-4 bg-card rounded-lg /50 hover:shadow-lg hover:shadow-primary/30 cursor-pointer transition-shadow duration-300"
          >
            <img
              src={getThumbnail(video)}
              alt={video.title}
              className="w-24 h-16 object-cover rounded-md ring-1 ring-primary/50"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground line-clamp-2 mb-1">
                {video.title}
              </h4>
              <div className="flex justify-between text-sm text-primary/80">
                <span className="text-muted-foreground">
                  {video.instructor_name}
                </span>
                <span className="text-muted-foreground">{video.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
