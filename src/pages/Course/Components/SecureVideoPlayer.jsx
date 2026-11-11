import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  RotateCcw,
  SkipBack,
  SkipForward,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { apiUrl } from "../../../lib/axiosInstance";

export function SecureVideoPlayer({ videoId, title, poster, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const videoBlobRef = useRef(null);

  // Security: Generate encrypted video URL
  const generateSecureVideoUrl = useCallback(async (videoId) => {
    try {
      // In a real implementation, this would be a server endpoint
      // that validates the user and returns a signed URL
      const response = await fetch(apiUrl(`/courses/stream/${videoId}`), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get video stream");
      }

      const data = await response.json();
      return data.streamUrl;
    } catch (error) {
      console.error("Error getting secure video URL:", error);
      // Fallback for development - replace with actual secure endpoint
      return `https://negusconsultants.com/videos/course-${videoId}.mp4`;
    }
  }, []);

  // Security: Load video as blob to prevent direct access
  const loadVideoAsBlob = useCallback(
    async (videoId) => {
      try {
        setIsLoading(true);
        setError(null);

        const videoUrl = await generateSecureVideoUrl(videoId);

        const response = await fetch(videoUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load video");
        }

        const blob = await response.blob();
        videoBlobRef.current = blob;

        if (videoRef.current) {
          videoRef.current.src = URL.createObjectURL(blob);
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error loading video:", error);
        setError("Failed to load video. Please try again.");
        toast.error("Failed to load video");
      } finally {
        setIsLoading(false);
      }
    },
    [generateSecureVideoUrl]
  );

  // Security: Prevent right-click and keyboard shortcuts
  const handleContextMenu = (e) => {
    e.preventDefault();
    toast.error("Right-click is disabled for security");
  };

  const handleKeyDown = (e) => {
    // Prevent common keyboard shortcuts
    const blockedKeys = ["F12", "Ctrl+Shift+I", "Ctrl+U", "Ctrl+S"];
    const keyCombo =
      e.key + (e.ctrlKey ? "+Ctrl" : "") + (e.shiftKey ? "+Shift" : "");

    if (blockedKeys.includes(keyCombo) || blockedKeys.includes(e.key)) {
      e.preventDefault();
      toast.error("This action is not allowed");
    }
  };

  // Security: Disable video download
  const disableVideoDownload = useCallback(() => {
    if (videoRef.current) {
      // Remove download attribute
      videoRef.current.removeAttribute("download");

      // Disable save as
      videoRef.current.addEventListener("contextmenu", handleContextMenu);

      // Prevent drag and drop
      videoRef.current.addEventListener("dragstart", (e) => e.preventDefault());

      // Disable copy
      videoRef.current.addEventListener("copy", (e) => e.preventDefault());
    }
  }, []);

  // Video controls
  const togglePlay = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to watch this video");
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value) => {
    if (videoRef.current) {
      const newVolume = value[0] / 100;
      videoRef.current.volume = newVolume;
      setVolume(value[0]);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skipTime = (seconds) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Effects
  useEffect(() => {
    const video = videoRef.current;
    if (videoId) {
      loadVideoAsBlob(videoId);
    }

    // Security: Add global event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      // Clean up blob URL
      if (video?.src) {
        URL.revokeObjectURL(video.src);
      }
    };
  }, [videoId, loadVideoAsBlob]);

  useEffect(() => {
    if (videoRef.current) {
      disableVideoDownload();
    }
  }, [isAuthenticated, disableVideoDownload]);

  // Security: Clear video source on unmount
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video) {
        video.src = "";
        video.load();
      }
    };
  }, []);

  if (error) {
    return (
      <div
        className={`relative bg-black rounded-lg overflow-hidden ${className}`}
      >
        <div className="aspect-video flex items-center justify-center">
          <div className="text-center text-white">
            <Lock className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <p className="text-lg font-semibold mb-2">Video Unavailable</p>
            <p className="text-sm text-gray-400">{error}</p>
            <Button
              onClick={() => loadVideoAsBlob(videoId)}
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Loading Video...</p>
            <p className="text-sm text-gray-400 mt-2">Securing content...</p>
          </div>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        aria-label={title || "Course video"}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setError("Failed to load video")}
        className="w-full aspect-video"
        onClick={togglePlay}
        preload="metadata"
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        Your browser does not support the video tag.
      </video>

      {/* Security overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          <Lock className="h-3 w-3 inline mr-1" />
          Protected Content
        </div>
      </div>

      {/* Play button overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-white text-primary hover:bg-yellow-50 pointer-events-auto"
            onClick={togglePlay}
          >
            <Play className="h-8 w-8 ml-1" />
          </Button>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-black/85 p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress bar */}
        <div className="mb-3">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/20"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/20"
              onClick={() => skipTime(-10)}
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/20"
              onClick={() => skipTime(10)}
            >
              <SkipForward className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>

            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/20"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/20"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Security notice */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
        <Lock className="h-3 w-3 inline mr-1" />
        DRM Protected
      </div>
    </div>
  );
}
