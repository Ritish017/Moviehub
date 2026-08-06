import React, { useState, useEffect } from "react";
import { X, Tv, Play, AlertTriangle, ExternalLink } from "lucide-react";
import { Movie, VideoClip } from "../types";
import { getYouTubeEmbedUrl, getYouTubeWatchUrl, extractYouTubeVideoId, isDirectVideoUrl } from "../utils/videoUtils";
import { FALLBACK_POSTER } from "../utils/imageUtils";

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
  const [iframeError, setIframeError] = useState<boolean>(false);

  useEffect(() => {
    setActiveClip(currentClip);
    setIframeError(false);
  }, [movie.id, initialClip?.id, initialClip?.videoUrl]);

  const watchUrl = getYouTubeWatchUrl(activeClip.videoUrl);

  const handleClipChange = (clip: VideoClip) => {
    setActiveClip(clip);
    setIframeError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#0F1116] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header Control Bar */}
        <div className="p-4 bg-[#14171E] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-black flex items-center justify-center shadow font-bold">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-sans">{movie.title} - HD Cinema Theater</h3>
              <p className="text-[10px] text-emerald-400 font-mono">1080p Ultra HD • Dolby Atmos Audio Simulation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all cursor-pointer"
            >
              Watch on YouTube <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {isDirectVideoUrl(activeClip.videoUrl) ? (
            <video
              src={activeClip.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : !iframeError ? (
            <iframe
              src={getYouTubeEmbedUrl(activeClip.videoUrl, true, false)}
              title={activeClip.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => setIframeError(true)}
            />
          ) : (
            <div className="p-8 text-center space-y-4 max-w-md bg-[#14171E]/90 border border-white/10 rounded-2xl">
              <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
              <div>
                <h4 className="text-lg font-bold text-white">Embed Restricted by Publisher</h4>
                <p className="text-xs text-gray-400 mt-1">
                  This video requires direct playback on YouTube due to content protection rights.
                </p>
              </div>
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl transition-all"
              >
                Watch Directly on YouTube <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Video Info & Clip Selection Drawer */}
        <div className="p-5 bg-[#14171E] border-t border-white/5 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1 font-mono">
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 uppercase">
                  {activeClip.type}
                </span>
                <span className="text-xs text-emerald-400 font-bold">★ {movie.rating} / 10 Rating</span>
              </div>
              <h4 className="text-base font-bold text-white font-sans">{activeClip.title}</h4>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
              <span className="px-3 py-1 bg-[#0F1116] border border-white/5 rounded-lg">Language: {movie.language}</span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg font-bold">
                ₹{movie.boxOfficeGrossCrores} Cr WW
              </span>
            </div>
          </div>

          {/* Playlist Clips Selector */}
          {movie.videoClips && movie.videoClips.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-500 font-mono mb-2">Select Footage / Songs ({movie.videoClips.length}):</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {movie.videoClips.map((clip) => (
                  <div
                    key={clip.id}
                    onClick={() => handleClipChange(clip)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      activeClip.id === clip.id
                        ? "bg-[#0F1116] border-emerald-500"
                        : "bg-[#0F1116] border-white/5 hover:bg-white/5"
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
                      <p className="text-[10px] text-emerald-400 font-mono">{clip.type}</p>
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
