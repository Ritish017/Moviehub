import React, { useState } from "react";
import { Star, Play, Sparkles, Bookmark, Check, ArrowUpRight } from "lucide-react";
import { Movie } from "../types";
import { getYouTubeEmbedUrl } from "../utils/videoUtils";

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie) => void;
  isWatchlisted?: boolean;
  onToggleWatchlist?: (movieId: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelectMovie,
  onOpenTrailer,
  isWatchlisted = false,
  onToggleWatchlist
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#090b10] rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-600/20 transform hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full cursor-pointer"
      onClick={() => onSelectMovie(movie)}
    >
      
      {/* Poster Media Box */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-black/60">
        {/* Poster Image or Hover Video Preview */}
        {isHovered ? (
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <iframe
              src={getYouTubeEmbedUrl(movie.featuredTrailerUrl, true, true)}
              title={movie.title}
              className="w-full h-full border-0 pointer-events-none opacity-90 scale-125"
              allow="autoplay"
            />
          </div>
        ) : (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-black/40 opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges: AI Score & Language */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-purple-600 text-white shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> {movie.directorStyleRadar?.visualGrandeur || 95}% AI Score
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-amber-300 backdrop-blur-md">
            {movie.language}
          </span>
        </div>

        {/* Center Hover Action (Play Trailer) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-xs z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenTrailer(movie);
            }}
            className="w-12 h-12 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-2xl shadow-red-600/50 transform hover:scale-110 transition-transform cursor-pointer"
            title="Play Trailer"
          >
            <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
          </button>
        </div>

        {/* Watchlist Bookmark */}
        {onToggleWatchlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(movie.id);
            }}
            className={`absolute bottom-3 right-3 p-2 rounded-xl border backdrop-blur-md transition-all cursor-pointer z-20 ${
              isWatchlisted
                ? "bg-emerald-500 text-black border-emerald-400 font-bold shadow-lg"
                : "bg-black/60 text-gray-300 border-white/20 hover:text-white hover:bg-black/90"
            }`}
            title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            {isWatchlisted ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Card Details Body */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1 font-mono">
            <span>{movie.releaseYear} • {movie.duration}</span>
            <span className="flex items-center gap-1 font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {movie.rating}
            </span>
          </div>

          <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 font-serif">
            {movie.title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
            Dir: <span className="text-gray-200 font-medium">{movie.director}</span>
          </p>

          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genres.slice(0, 2).map((g) => (
              <span key={g} className="text-[10px] bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded font-medium">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Financial Telemetry Snippet */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Box Office</p>
            <p className="text-emerald-400 font-bold font-mono">₹{movie.boxOfficeGrossCrores} Cr WW</p>
          </div>
          <span className="flex items-center gap-0.5 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
            Inspect <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

    </div>
  );
};
