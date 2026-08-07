import React, { useState, useEffect, useRef } from "react";
import { X, Play, Pause, Volume2, VolumeX, Maximize, Tv, AlertTriangle, ExternalLink } from "lucide-react";
import { Movie, VideoClip } from "../types";
import { getYouTubeWatchUrl, extractYouTubeVideoId, isDirectVideoUrl } from "../utils/videoUtils";
import { FALLBACK_POSTER } from "../utils/imageUtils";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface HdStreamPlayerModalProps {
  movie: Movie | null;
  initialClip?: VideoClip;
  onClose: () => void;
}

export const HdStreamPlayerModal: React.FC<HdStreamPlayerModalProps> = ({
  movie,
  initialClip,
  onClose,
}) => {
  if (!movie) return null;

  const currentClip = initialClip || movie.videoClips[0] || {
    id: "main-trailer",
    title: `${movie.title} Official Trailer`,
    type: "Official Trailer",
    videoUrl: movie.featuredTrailerUrl,
    thumbnailUrl: movie.posterUrl,
    duration: movie.duration,
    isHD: true,
  };

  const [activeClip, setActiveClip] = useState<VideoClip>(currentClip);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(100);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [iframeError, setIframeError] = useState<boolean>(false);
  const [isApiReady, setIsApiReady] = useState<boolean>(false);

  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeProgressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const videoId = extractYouTubeVideoId(activeClip.videoUrl);
  const watchUrl = getYouTubeWatchUrl(activeClip.videoUrl);

  // Load YouTube IFrame Player API script if not present
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsApiReady(true);
      return;
    }

    const existingScript = document.getElementById("yt-iframe-api-script");
    if (!existingScript) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api-script";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevCallback) prevCallback();
      setIsApiReady(true);
    };
  }, []);

  // Initialize YT.Player instance when active clip changes or API is ready
  useEffect(() => {
    if (isDirectVideoUrl(activeClip.videoUrl) || !isApiReady) return;

    let isSubscribed = true;

    if (playerRef.current && typeof playerRef.current.destroy === "function") {
      try {
        playerRef.current.destroy();
      } catch (e) {
        // Ignore destruction errors
      }
    }

    playerRef.current = new window.YT.Player(`yt-player-container-${activeClip.id}`, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
        disablekb: 1,
        fs: 0,
        playsinline: 1,
        enablejsapi: 1,
      },
      events: {
        onReady: (event: any) => {
          if (!isSubscribed) return;
          try {
            event.target.playVideo();
            setIsPlaying(true);
            setDuration(event.target.getDuration() || 0);
          } catch (e) {
            // Ignore autoplay restriction errors
          }
        },
        onStateChange: (event: any) => {
          if (!isSubscribed) return;
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            setDuration(event.target.getDuration() || 0);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          } else if (event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
          }
        },
        onError: () => {
          if (!isSubscribed) return;
          setIframeError(true);
        },
      },
    });

    return () => {
      isSubscribed = false;
    };
  }, [activeClip.id, videoId, isApiReady]);

  // Sync current time ticker
  useEffect(() => {
    timeProgressIntervalRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function" && isPlaying) {
        try {
          const curr = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration();
          if (typeof curr === "number") setCurrentTime(curr);
          if (typeof dur === "number" && dur > 0) setDuration(dur);
        } catch (e) {}
      }
    }, 500);

    return () => {
      if (timeProgressIntervalRef.current) clearInterval(timeProgressIntervalRef.current);
    };
  }, [isPlaying]);

  // Handle overlay auto-hide on mouse inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolumeState(val);
    if (playerRef.current && typeof playerRef.current.setVolume === "function") {
      playerRef.current.setVolume(val);
      if (val === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (playerRef.current && typeof playerRef.current.seekTo === "function") {
      playerRef.current.seekTo(targetTime, true);
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleClipChange = (clip: VideoClip) => {
    setActiveClip(clip);
    setIframeError(false);
    setCurrentTime(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn">
      <div 
        ref={playerContainerRef}
        onMouseMove={handleMouseMove}
        className="relative w-[96vw] max-w-7xl h-[92vh] bg-[#0A0C12] border border-white/10 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
      >
        {/* Header Bar */}
        <div className="p-4 bg-[#0F1116] border-b border-white/5 flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 text-white flex items-center justify-center shadow-lg font-bold">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-sans">{movie.title} — Cinema Theater</h3>
              <p className="text-[10px] text-amber-400 font-mono flex items-center gap-2">
                <span>1080p Ultra HD</span>
                <span>•</span>
                <span>Spatial Surround Audio</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
              title="Close Theater"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Player Viewport */}
        <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden group">
          {isDirectVideoUrl(activeClip.videoUrl) ? (
            <video
              src={activeClip.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : !iframeError ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <div 
                id={`yt-player-container-${activeClip.id}`} 
                className="w-full h-full pointer-events-none scale-[1.05]"
              />

              {/* Custom MovieHub UI Control Overlay */}
              <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-10 flex flex-col justify-between p-6 ${showControls ? "opacity-100" : "opacity-0"}`}>
                
                {/* Top Overlay Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-mono font-bold text-white border border-white/10">
                    {activeClip.title}
                  </span>
                </div>

                {/* Bottom Overlay Controls */}
                <div className="w-full bg-black/75 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-3 pointer-events-auto shadow-2xl">
                  
                  {/* Scrubber Slider */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-400 font-bold shrink-0">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-red-500 hover:accent-red-400"
                    />
                    <span className="text-xs font-mono text-gray-400 font-bold shrink-0">{formatTime(duration)}</span>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Play / Pause */}
                      <button
                        onClick={togglePlay}
                        className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform cursor-pointer shadow-lg"
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                      </button>

                      {/* Mute & Volume */}
                      <div className="flex items-center gap-2 group/vol">
                        <button
                          onClick={toggleMute}
                          className="p-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        >
                          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Fullscreen */}
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        title="Toggle Fullscreen"
                      >
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ) : (
            <div className="p-8 text-center space-y-4 max-w-md bg-[#14171E]/90 border border-white/10 rounded-2xl z-20">
              <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
              <div>
                <h4 className="text-lg font-bold text-white">Embed Protected Title</h4>
                <p className="text-xs text-gray-400 mt-1">
                  This video requires direct playback on YouTube due to content publisher licensing.
                </p>
              </div>
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl transition-all cursor-pointer"
              >
                Watch Directly on YouTube <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Playlist & Meta Info Drawer */}
        <div className="p-4 bg-[#0F1116] border-t border-white/5 overflow-y-auto space-y-3 shrink-0 max-h-[30vh]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1 font-mono">
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-400 uppercase">
                  {activeClip.type}
                </span>
                <span className="text-xs text-amber-400 font-bold">★ {movie.rating} / 10 Rating</span>
              </div>
              <h4 className="text-sm font-bold text-white font-sans">{activeClip.title}</h4>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
              <span className="px-3 py-1 bg-[#14171E] border border-white/5 rounded-lg">Language: {movie.language}</span>
              {movie.boxOfficeGrossCrores && (
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg font-bold">
                  ₹{movie.boxOfficeGrossCrores} Cr WW
                </span>
              )}
              {/* Subtle compliance fallback link */}
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
              >
                YouTube Source <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Playlist Clips Selector */}
          {movie.videoClips && movie.videoClips.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-gray-500 font-mono mb-2 uppercase tracking-wider">
                Select Footage / Songs ({movie.videoClips.length}):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {movie.videoClips.map((clip) => (
                  <div
                    key={clip.id}
                    onClick={() => handleClipChange(clip)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      activeClip.id === clip.id
                        ? "bg-[#14171E] border-amber-500/80 shadow-lg shadow-amber-500/10"
                        : "bg-[#14171E] border-white/5 hover:bg-white/5"
                    }`}
                  >
                    <div className="relative w-16 aspect-video rounded-md overflow-hidden bg-black shrink-0">
                      <img
                        src={clip.thumbnailUrl || movie.posterUrl || FALLBACK_POSTER}
                        alt={clip.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_POSTER;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 text-white fill-current" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate font-sans">{clip.title}</p>
                      <p className="text-[10px] text-amber-400 font-mono">{clip.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
