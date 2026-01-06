import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  PictureInPicture,
  Download,
  ChevronRight,
  ChevronDown,
  Check,
  ChevronUp,
  Gauge,
  Minimize,
  Volume1,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";

interface VideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({
  src,
  title,
  poster,
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const speedButtonRef = useRef<HTMLButtonElement>(null);
  const [showingSound, setshowingSound] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showInitialPlay, setShowInitialPlay] = useState(true);
  const [previewTime, setPreviewTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showSpeedSubmenu, setShowSpeedSubmenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update fullscreen state on change
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setShowContextMenu(false);
        setShowSpeedSubmenu(false);
      }
    };

    if (showContextMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showContextMenu]);

  const togglePlay = () => {
    setshowingSound(true); // bring back controls on tap
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
      setShowInitialPlay(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const togglePictureInPicture = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (error) {
      console.error("Picture-in-Picture error:", error);
    }
  };

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setCurrentTime(0);
  };

  const downloadVideo = () => {
    window.open(src, "_blank");
  };
  const handleProgressHover = (e: React.MouseEvent) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect || isMobile) return;

    const position = (e.clientX - rect.left) / rect.width;
    const time = position * duration;
    setPreviewTime(time);
    setPreviewPosition(e.clientX - rect.left);
    setShowPreview(true);

    // Update preview video time
    if (previewVideoRef.current) {
      previewVideoRef.current.currentTime = time;
    }
  };

  const handleProgressLeave = () => {
    setShowPreview(false);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const menuWidth = 220;
    const menuHeight = 280;

    // Calculate absolute position relative to viewport
    let x = e.clientX;
    let y = e.clientY;

    // Adjust position to keep menu within viewport horizontally
    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }
    if (x < 10) x = 10;

    // Adjust position to keep menu within viewport vertically
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10;
    }
    if (y < 10) y = 10;
    setshowingSound(true);
    setContextMenuPosition({ x, y });
    setShowContextMenu(true);
    setShowSpeedSubmenu(false);
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
    if (showingSound === true) {
      setShowSpeedSubmenu(false);
      setShowContextMenu(false);
    }
  };

  const toggleLoop = () => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden group
        ${
          isFullscreen
            ? "fixed inset-0 z-[9999] flex justify-center items-center"
            : ""
        }
        ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onContextMenu={handleContextMenu}
      style={isFullscreen ? { backgroundColor: "black" } : undefined}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-auto"
        onClick={togglePlay}
        onContextMenu={handleContextMenu}
      />

      {/* Preview Video (hidden) */}
      <video
        ref={previewVideoRef}
        src={src}
        className="hidden"
        muted
        preload="metadata"
      />

      {/* Custom Play Button Overlay */}
      {showInitialPlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button
            variant="ghost"
            size={isMobile ? "default" : "lg"}
            onClick={togglePlay}
            className="text-white bg-primary hover:bg-primary/80 h-12 w-12 sm:h-16 sm:w-16 rounded-full p-0 shadow-lg"
          >
            <Play className={`${isMobile ? "h-6 w-6" : "h-8 w-8"} ml-1`} />
          </Button>
        </div>
      )}

      {/* Download Button */}

      {title && !isMobile && (
        <div className="absolute top-0 left-0 right-0 p-2 sm:p-4">
          <h3 className="text-white font-medium text-xs sm:text-sm bg-black/50 rounded px-2 py-1 inline-block">
            {title}
          </h3>{" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadVideo}
            className=" absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 hover:bg-background border border-border h-8 w-8 p-0"
            title="Download video"
          >
            <Download className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Custom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-4 transition-opacity duration-300 ${
          showControls || isMobile ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: showControls || isMobile ? "auto" : "none" }}
      >
        {/* Progress Bar with Preview */}
        <div
          ref={progressRef}
          className="mb-2 sm:mb-3 relative"
          onMouseMove={handleProgressHover}
          onMouseLeave={handleProgressLeave}
        >
          <div className="flex justify-end text-xs text-white pointer-events-none mb-1 pr-1">
            {!isMobile && (
              <div className="bg-black/30 p-1 rounded-md pointer-events-none">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            )}
          </div>{" "}
          <div className="flex justify-end text-xs text-white pointer-events-none mb-1 pr-1">
            {isMobile && isFullscreen && (
              <div className="bg-black/30 p-1 rounded-md pointer-events-none">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            )}
          </div>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="w-full cursor-pointer"
          />
          {/* Preview Tooltip with Video Thumbnail */}
          {showPreview && !isMobile && (
            <div
              className="absolute bottom-8 bg-black border border-gray-600 rounded overflow-hidden shadow-lg pointer-events-none z-10"
              style={{
                left: `${Math.max(
                  0,
                  Math.min(
                    previewPosition - 80,
                    (progressRef.current?.clientWidth || 0) - 160
                  )
                )}px`,
              }}
            >
              <div className="w-40 h-24 bg-black flex items-center justify-center relative">
                <video
                  src={src}
                  className="w-full h-full object-cover"
                  muted
                  ref={(el) => {
                    if (el) {
                      el.currentTime = previewTime;
                    }
                  }}
                />
                <div className="absolute bottom-1 left-1 right-1 text-center">
                  <span className="text-white text-xs bg-black/80 px-1 rounded">
                    {formatTime(previewTime)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="text-white hover:bg-white/20 h-6 w-6 sm:h-8 sm:w-8 p-0"
            >
              {isPlaying ? (
                <Pause className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <Play className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>

            {!isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={restart}
                className="text-white hover:bg-white/20 h-6 w-6 sm:h-8 sm:w-8 p-0"
                title="Restart"
              >
                <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className=" text-white hover:bg-white/20 h-6 w-6 sm:h-8 sm:w-8 p-0 "
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : volume > 0 && volume <= 0.5 ? (
                <Volume1 className="h-3 w-3 sm:h-4 sm:w-4" /> // low volume icon
              ) : volume > 0.5 && volume <= 0.7 ? (
                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" /> // medium volume icon (like your current one)
              ) : (
                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" /> // high volume icon
              )}
            </Button>

            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className={`${
                !isPlaying ? "opacity-100" : "opacity-0"
              } transition-opacity w-24 sm:w-32 cursor-pointer`}
            />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePictureInPicture}
              className="text-white hover:bg-white/20 h-6 w-6 sm:h-8 sm:w-8 p-0"
              title="Picture in Picture"
            >
              <PictureInPicture className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();

                if (showContextMenu) {
                  setShowContextMenu(false);
                  return;
                }

                const rect = e.currentTarget.getBoundingClientRect();
                const offsetY = 70;
                const menuHeight = 150;
                const menuWidth = 180;

                setContextMenuPosition({
                  x: rect.right - menuWidth,
                  y: rect.top - menuHeight - offsetY,
                });

                setShowContextMenu(true);
                setShowSpeedSubmenu(true);
                setshowingSound(false);
              }}
              className="text-white hover:bg-white/20 h-6 w-6 sm:h-8 sm:w-8 p-0"
              title="Playback Speed"
            >
              <Gauge className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 h-6 w-6 sm:h-8 sm:w-8 p-0"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <Maximize className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <div
          ref={contextMenuRef}
          className="fixed z-50 w-40 text-xs bg-background/95 backdrop-blur-sm border border-primary/20 rounded-md shadow-lg"
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            userSelect: "none",
          }}
        >
          {/* Playback Speed */}
          <div
            className=" flex items-center justify-between px-4 py-2 cursor-pointer text-foreground hover:bg-primary/10 rounded-md transition-colors"
            onClick={() => setShowSpeedSubmenu(!showSpeedSubmenu)}
          >
            <span className="text-foreground">Playback Speed</span>
            {showSpeedSubmenu ? (
              <ChevronUp className="text-foreground h-4 w-4" />
            ) : (
              <ChevronRight className="text-foreground h-4 w-4" />
            )}
          </div>

          {/* Speed Submenu */}
          {showSpeedSubmenu && (
            <div className="text-foreground  border-b border-b-primary/40 transition-colors border-t  ">
              {[0.25, 0.5, 1, 1.5, 2].map((speed) => (
                <div
                  key={speed}
                  className={`px-6 py-2 cursor-pointer text-foreground hover:bg-primary/10 transition-colors flex items-center justify-between ${
                    playbackRate === speed
                      ? "text-foreground bg-primary/10 transition-colors"
                      : ""
                  }`}
                  onClick={() => changePlaybackRate(speed)}
                >
                  <span className="text-foreground">{speed}x</span>
                  {playbackRate === speed && (
                    <Gauge className="text-primary h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Loop */}
          <div
            className={`px-4 py-2 cursor-pointer text-foreground hover:bg-primary/10 transition-colors flex items-center justify-between ${
              isLooping
                ? "text-foreground hover:bg-primary/10 transition-colors"
                : ""
            }`}
            onClick={toggleLoop}
          >
            <span className="text-foreground">Loop</span>
            {isLooping && <Check className="text-primary h-4 w-4" />}
          </div>

          {/* Restart */}
          {showingSound && (
            <>
              <div
                className="px-4 py-2 cursor-pointer text-foreground hover:bg-primary/10 transition-colors"
                onClick={() => {
                  restart();
                  setShowContextMenu(false);
                }}
              >
                <span className="text-foreground">Restart</span>
              </div>

              {/* Download */}
              <div
                className="px-4 py-2 cursor-pointer text-foreground hover:bg-primary/10 transition-colors"
                onClick={() => {
                  downloadVideo();
                  setShowContextMenu(false);
                }}
              >
                <span className="text-foreground">Download</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
