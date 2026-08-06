import React, { useState, useRef, useCallback } from "react";
import { Play, Bookmark, Check, Info, Star, Zap, Archive } from "lucide-react";
import type { Movie, VideoClip } from "../types";
import { getPosterUrl, FALLBACK_POSTER } from "../utils/imageUtils";
import { getYouTubeThumbnailUrl } from "../utils/videoUtils";

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie, clip?: VideoClip) => void;
  isWatchlisted?: boolean;
  onToggleWatchlist?: (movieId: string) => void;
}

/**
 * MovieHub X v2 — Enterprise Movie Card
 * - NO iframe on hover (critical bug fix — was firing 20+ YouTube requests simultaneously)
 * - 3D tilt effect via CSS perspective on mouse move
 * - Ambient poster glow on hover
 * - Thumbnail preview (static image, not live video) on hover
 * - Quick-action overlay: Watchlist, Info, Trailer
 * - AI score + genre pill
 */
export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelectMovie,
  onOpenTrailer,
  isWatchlisted = false,
  onToggleWatchlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const posterSrc = getPosterUrl(movie.posterUrl);
  const thumbnailSrc = getYouTubeThumbnailUrl(movie.featuredTrailerUrl);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 14;  // -7 to +7 degrees
    const y = ((e.clientY - top) / height - 0.5) * -14;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const ratingColor =
    movie.rating >= 8.5 ? "text-emerald-400" :
    movie.rating >= 7   ? "text-amber-400"   :
    "text-gray-400";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col cursor-pointer select-none"
      style={{
        perspective: "800px",
        transform: `perspective(800px)`,
      }}
      onClick={() => onSelectMovie(movie)}
      role="button"
      tabIndex={0}
      aria-label={`View ${movie.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelectMovie(movie); }}
    >
      {/* Poster Box with 3D tilt */}
      <div
        className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#121419] border border-white/5 shadow-card transition-all duration-200"
        style={{
          transform: isHovered
            ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.04)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transition: isHovered ? "transform 100ms ease-out" : "transform 350ms ease-out",
          boxShadow: isHovered
            ? `0 24px 48px rgba(0,0,0,0.6), 0 0 40px -10px var(--color-brand-glow)`
            : "var(--shadow-card)",
          borderColor: isHovered ? "rgba(249,87,22,0.3)" : "rgba(255,255,255,0.05)",
        }}
      >
        {/* Poster image — always shown (no iframe) */}
        <img
          src={isHovered && thumbnailSrc ? thumbnailSrc : posterSrc}
          alt={movie.title}
          className="w-full h-full object-cover transition-all duration-500"
          style={{ transform: isHovered ? "scale(1.06)" : "scale(1)" }}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_POSTER;
          }}
        />

        {/* Gradient overlay — appears on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0.3 }}
        />

        {/* Data Provenance Badge top-left */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          {movie.apiSource || movie.dataSource === "live" ? (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-[#e2571c] text-white shadow-md tracking-wide border border-white/10">
              <Zap className="w-2.5 h-2.5 fill-current flex-shrink-0" />
              {movie.apiSource ? movie.apiSource.split(" ")[0] : "Live"}
            </span>
          ) : (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-white/15 text-white/70 backdrop-blur-md shadow tracking-wide border border-white/10">
              <Archive className="w-2.5 h-2.5 flex-shrink-0" />
              Curated
            </span>
          )}
        </div>

        {/* Rating badge top-right */}
        <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
          <span className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-black/60 backdrop-blur-sm ${ratingColor}`}>
            <Star className="w-2.5 h-2.5 fill-current" />
            {movie.rating}
          </span>
        </div>

        {/* Quick Actions Overlay — appears on hover */}
        <div
          className="absolute bottom-0 inset-x-0 p-3 flex flex-col gap-2 transition-all duration-300"
          style={{ opacity: isHovered ? 1 : 0, transform: isHovered ? "translateY(0)" : "translateY(8px)" }}
        >
          {/* Genre pill */}
          <span className="self-start px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/15 text-white backdrop-blur-sm border border-white/10">
            {movie.genres[0] || movie.language}
          </span>

          {/* Action row */}
          <div className="flex items-center gap-2">
            {/* Play Trailer */}
            <button
              onClick={(e) => { e.stopPropagation(); onOpenTrailer(movie); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#f95716] hover:bg-[#e04708] text-white text-[11px] font-extrabold shadow-lg shadow-[#f95716]/30 transition-colors cursor-pointer"
              aria-label={`Play trailer for ${movie.title}`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Trailer
            </button>

            {/* Info */}
            <button
              onClick={(e) => { e.stopPropagation(); onSelectMovie(movie); }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
              aria-label={`View details for ${movie.title}`}
            >
              <Info className="w-3.5 h-3.5" />
            </button>

            {/* Watchlist */}
            {onToggleWatchlist && (
              <button
                onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie.id); }}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isWatchlisted
                    ? "bg-[#f95716]/20 border-[#f95716]/40 text-[#f95716]"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/10"
                }`}
                aria-label={isWatchlisted ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
                aria-pressed={isWatchlisted}
              >
                {isWatchlisted ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Details below poster */}
      <div className="mt-2.5 space-y-0.5 px-0.5">
        <h3
          className="text-sm font-bold text-white group-hover:text-[#f95716] transition-colors truncate leading-tight"
          title={movie.title}
        >
          {movie.title}
        </h3>
        <p className="text-xs text-gray-500 truncate font-mono">
          {movie.releaseYear} · {movie.duration}
        </p>
        {movie.boxOfficeGrossCrores > 0 && (
          <p className="text-[10px] text-emerald-500 font-bold truncate">
            ₹{movie.boxOfficeGrossCrores.toLocaleString("en-IN")} Cr WW
          </p>
        )}
      </div>
    </div>
  );
};
