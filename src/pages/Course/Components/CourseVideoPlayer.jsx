import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Lock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { NavLink } from "react-router";
import { apiUrl } from "../../../lib/axiosInstance";

export function CourseVideoPlayer({ course, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Get the protected video URL from the server. Keep the callback stable so
  // playback state changes do not repeatedly request a new stream URL.
  const getVideoUrl = useCallback(async () => {
    const courseId = course?.id;
    if (!courseId) return;

    try {
      setIsLoading(true);
      setError(null);

      // Try to get secure stream URL from server
      const response = await fetch(apiUrl(`/courses/stream/${courseId}`), {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        const message =
          response.status === 401
            ? "Sign in to watch this course."
            : response.status === 403
              ? "An active course package is required to watch this lesson."
              : payload.message || payload.error || "The video could not be loaded.";
        setVideoUrl(null);
        setError(message);
        return;
      }

      const data = await response.json();
      if (!data.streamUrl) throw new Error("The secure video URL is missing.");
      setVideoUrl(data.streamUrl);
    } catch (error) {
      console.error("Error getting video URL:", error);
      setError("Failed to load video");
      toast.error("Failed to load video");
    } finally {
      setIsLoading(false);
    }
  }, [course?.id]);

  // Security: Prevent right-click and keyboard shortcuts
  const handleContextMenu = (e) => {
    e.preventDefault();
    toast.error("Right-click is disabled for security");
  };

  const handleKeyDown = (e) => {
    const blockedKeys = ["F12", "Ctrl+Shift+I", "Ctrl+U", "Ctrl+S"];
    const keyCombo =
      e.key + (e.ctrlKey ? "+Ctrl" : "") + (e.shiftKey ? "+Shift" : "");

    if (blockedKeys.includes(keyCombo) || blockedKeys.includes(e.key)) {
      e.preventDefault();
      toast.error("This action is not allowed");
    }
  };

  // Video controls
  const togglePlay = () => {
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
    } else {
      document.exitFullscreen();
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
    if (course?.id) {
      getVideoUrl();
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
    };
  }, [course?.id, getVideoUrl]);

  if (error) {
    const isPackageError = error.includes("active course package") || error.toLowerCase().includes("package");
    const isAuthError = error.includes("Sign in") || error.toLowerCase().includes("unauthorized");

    return (
      <div
        className={`relative bg-[#0c1c14] border border-[var(--line)] rounded-2xl overflow-hidden ${className}`}
      >
        <div className="aspect-video flex items-center justify-center p-6">
          <div className="text-center text-[var(--ink)] max-w-sm">
            <div className="w-12 h-12 rounded-full bg-[var(--yellow-soft)] border border-[var(--line)] flex items-center justify-center mx-auto mb-3">
              <Lock className="h-6 w-6 text-[var(--yellow)]" />
            </div>
            <p className="font-['Lexend'] text-lg font-bold mb-1 text-[var(--ink)]">
              {isPackageError ? "Course Package Required" : isAuthError ? "Sign In Required" : "Lesson Unavailable"}
            </p>
            <p className="text-[13px] text-[var(--ink-secondary)] leading-relaxed mb-4">{error}</p>
            {isPackageError ? (
              <NavLink className="public-button public-button-primary inline-flex" to="/packages">
                Explore Course Packages
              </NavLink>
            ) : isAuthError ? (
              <NavLink className="public-button public-button-primary inline-flex" to="/login">
                Sign In to Continue
              </NavLink>
            ) : (
              <Button onClick={getVideoUrl} className="public-button public-button-secondary" variant="outline">
                Try Again
              </Button>
            )}
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
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin" />
            <p className="text-lg font-semibold">Loading Course Video...</p>
            <p className="text-sm text-gray-400 mt-2">Securing content...</p>
          </div>
        </div>
      )}

      {/* Video element */}
      {videoUrl && (
        <video
          ref={videoRef}
          poster={course.thumbnail || course.image}
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
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Security overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          <Lock className="h-3 w-3 inline mr-1" />
          Protected Content
        </div>
      </div>

      {/* Play button overlay */}
      {!isPlaying && !isLoading && videoUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-white/90 hover:bg-white text-blue-600 hover:text-blue-700 pointer-events-auto"
            onClick={togglePlay}
          >
            <Play className="h-8 w-8 ml-1" />
          </Button>
        </div>
      )}

      {/* Controls */}
      {videoUrl && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 ${
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
                onClick={toggleFullscreen}
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Course info overlay */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
        <Lock className="h-3 w-3 inline mr-1" />
        {course.level || "Course"} Video
      </div>
    </div>
  );
}
