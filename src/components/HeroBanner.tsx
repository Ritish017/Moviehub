import React, { useState, useEffect } from "react";
import { Play, Plus, Check, Star, Flame, Trophy, Volume2, VolumeX, Eye } from "lucide-react";
import { Movie } from "../types";
import { getYouTubeEmbedUrl } from "../utils/videoUtils";

interface HeroBannerProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie) => void;
  isWatchlisted?: boolean;
  onToggleWatchlist?: (movieId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  movie,
  onSelectMovie,
  onOpenTrailer,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlayingVideo(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [movie.id]);

  return (
    <div className="relative w-full h-[580px] sm:h-[640px] overflow-hidden rounded-3xl my-4 border border-white/15 shadow-2xl group bg-[#07080c]">
      {/* Media Layer */}
      {isPlayingVideo ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden scale-125">
          <iframe
            src={getYouTubeEmbedUrl(movie.featuredTrailerUrl, true, isMuted)}
            title={movie.title}
            className="w-full h-full border-0 pointer-events-none opacity-85"
            allow="autoplay; encrypted-media"
          />
        </div>
      ) : (
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 group-hover:scale-110 filter brightness-90"
        />
      )}

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07080c] via-[#07080c]/70 to-transparent" />

      {/* Ambient Poster Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Content Container matching Screen 01 */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-end pb-10 z-10 space-y-4">
        
        {/* #1 in India Today Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black bg-gradient-to-r from-[#e50914] to-amber-500 text-white shadow-lg uppercase tracking-wider font-mono">
            <Flame className="w-3.5 h-3.5 fill-current" /> #1 in India Today
          </span>
        </div>

        {/* Floating Movie Title Logo */}
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-7xl font-black text-white font-serif tracking-tight drop-shadow-2xl">
            {movie.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-mono">
            {movie.releaseYear} • {movie.duration} • {movie.genres.join(" • ")} • UA-16+
          </p>
        </div>

        {/* Stats Row matching Screen 01 reference */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1 bg-[#12141d]/90 px-3 py-1.5 rounded-xl border border-white/10">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-white">★ {movie.rating} / 10</span>
          </div>

          <div className="bg-[#12141d]/90 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-emerald-400 font-bold">₹{movie.boxOfficeGrossCrores} Cr+</span>
            <span className="text-gray-400 text-[10px] ml-1">Worldwide</span>
          </div>

          <div className="bg-[#12141d]/90 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-amber-300 font-bold">93%</span>
            <span className="text-gray-400 text-[10px] ml-1">Audience Score</span>
          </div>
        </div>

        {/* Action Buttons matching Screen 01 */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => onOpenTrailer(movie)}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#e50914] hover:bg-red-700 text-white font-bold text-sm shadow-2xl shadow-red-900/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" /> Play Trailer
          </button>

          {onToggleWatchlist && (
            <button
              onClick={() => onToggleWatchlist(movie.id)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm border backdrop-blur-md transition-all cursor-pointer ${
                isWatchlisted
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20"
              }`}
            >
              {isWatchlisted ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isWatchlisted ? "In Watchlist" : "+ Watchlist"}
            </button>
          )}

          {/* Audio Mute toggle */}
          {isPlayingVideo && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="ml-auto p-3 rounded-2xl bg-black/60 hover:bg-black text-gray-300 hover:text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
