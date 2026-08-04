import React, { useState } from "react";
import { Play } from "lucide-react";
import { Movie } from "../types";
import { getYouTubeEmbedUrl } from "../utils/videoUtils";
import { getPosterUrl, FALLBACK_POSTER } from "../utils/imageUtils";

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
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const posterSrc = getPosterUrl(movie.posterUrl);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5"
      onClick={() => onSelectMovie(movie)}
    >
      {/* Poster Box */}
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#121319] border border-white/5 group-hover:border-white/20 transition-all shadow-lg">
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
            src={posterSrc}
            alt={movie.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_POSTER;
            }}
          />
        )}

        {/* Live Badge top left matching screenshot */}
        {movie.isTrending && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#ea580c] text-white shadow-md lowercase font-sans">
              live
            </span>
          </div>
        )}

        {/* Play Icon Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenTrailer(movie);
            }}
            className="w-12 h-12 rounded-full bg-[#f95716] text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </button>
        </div>
      </div>

      {/* Details below poster matching screenshot: title (bold white lowercase) + genre (muted text) */}
      <div className="mt-2.5 space-y-0.5 px-0.5">
        <h3 className="text-sm font-bold text-white group-hover:text-[#f95716] transition-colors font-sans lowercase truncate">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-400 font-sans lowercase truncate">
          {movie.genres[0] || movie.language}
        </p>
      </div>
    </div>
  );
};
