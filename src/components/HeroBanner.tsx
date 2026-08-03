import React, { useState, useEffect } from "react";
import { Play, Sparkles, Plus, Check, Star, Clock, Calendar, Volume2, VolumeX, ShieldAlert } from "lucide-react";
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

  // Auto-start video preview after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlayingVideo(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [movie.id]);

  return (
    <div className="relative w-full h-[580px] sm:h-[650px] overflow-hidden rounded-3xl my-6 border border-white/15 shadow-2xl group bg-[#07080c]">
      {/* Background Media: Live Video Preview or High-Res Backdrop */}
      {isPlayingVideo ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden transform scale-125">
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

      {/* Cinematic Gradient Vignette & Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07080c] via-[#07080c]/70 to-transparent" />

      {/* Dynamic Ambient Poster Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Content Overlay Container */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-end pb-12 z-10 space-y-4">
        
        {/* Rating & Metadata Chips */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-black shadow-lg shadow-amber-400/20">
            <Star className="w-3.5 h-3.5 fill-current" /> ★ {movie.rating} / 10
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/10 text-gray-200 backdrop-blur-md border border-white/10">
            {movie.genres.join(" • ")}
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-amber-300 backdrop-blur-md border border-white/10 font-mono">
            {movie.releaseYear} • {movie.duration}
          </span>
        </div>

        {/* Floating Movie Title Logo */}
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight font-serif drop-shadow-2xl">
            {movie.title}
          </h1>
          {movie.originalTitle && (
            <p className="text-lg sm:text-xl text-amber-400 font-serif italic font-bold opacity-90">
              {movie.originalTitle}
            </p>
          )}
        </div>

        {/* Synopsis snippet */}
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl line-clamp-3 font-sans leading-relaxed drop-shadow">
          {movie.synopsis}
        </p>

        {/* Handcrafted Action Bar */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => onOpenTrailer(movie)}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#e50914] hover:bg-red-700 text-white font-bold text-sm shadow-2xl shadow-red-900/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" /> Watch Trailer
          </button>

          <button
            onClick={() => onSelectMovie(movie)}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 font-bold text-sm border border-purple-500/40 backdrop-blur-md hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-300" /> AI Deep Analysis
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
              {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
            </button>
          )}

          {/* Video Audio Mute Toggle */}
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
