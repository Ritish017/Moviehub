import React from "react";
import { X, Tv, Film, Play, Star, Sparkles, Volume2, Maximize2 } from "lucide-react";
import { Movie, VideoClip } from "../types";
import { getYouTubeEmbedUrl } from "../utils/videoUtils";

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

  const [activeClip, setActiveClip] = React.useState<VideoClip>(currentClip);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl">
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

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={getYouTubeEmbedUrl(activeClip.videoUrl, true, false)}
            title={activeClip.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
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
          {movie.videoClips.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-500 font-mono mb-2">Select Footage / Songs ({movie.videoClips.length}):</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {movie.videoClips.map((clip) => (
                  <div
                    key={clip.id}
                    onClick={() => setActiveClip(clip)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      activeClip.id === clip.id
                        ? "bg-[#0F1116] border-emerald-500"
                        : "bg-[#0F1116] border-white/5 hover:bg-white/5"
                    }`}
                  >
                    <div className="relative w-16 aspect-video rounded-md overflow-hidden bg-black shrink-0">
                      <img src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover" />
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
