import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Bookmark, Check, ChevronLeft, ChevronRight, Sparkles, Clock, Star, TrendingUp } from "lucide-react";
import type { Movie } from "../../types";
import { getBackdropUrl, FALLBACK_BACKDROP } from "../../utils/imageUtils";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { useMovieStore } from "../../store/useMovieStore";
import { INDIAN_MOVIES_DATABASE } from "../../data/indianMovies";

/**
 * CinematicHero — Full-viewport rotating hero section.
 * 
 * FIXES vs HeroBanner.tsx:
 * - Hardcoded movie data bug FIXED — slides now use actual Movie objects from database
 * - movieObj no longer points to DB[0] for every slide
 * - No inline iframes
 * - Proper watchlist state per slide
 * - Navigate to /movie/:id on click
 */

const HERO_MOVIE_IDS = ["pushpa-2-the-rule", "kalki-2898-ad", "rrr"];
const AUTOPLAY_INTERVAL = 9000;

export const CinematicHero: React.FC = () => {
  const navigate = useNavigate();
  const toggleWatchlist = useUserStore((s) => s.toggleWatchlist);
  const watchlist = useUserStore((s) => s.userProfile.watchlist);
  const openStreaming = useMovieStore((s) => s.openStreaming);

  // Get real Movie objects from database — fixes U2 bug
  const heroMovies: Movie[] = HERO_MOVIE_IDS
    .map((id) => INDIAN_MOVIES_DATABASE.find((m) => m.id === id))
    .filter((m): m is Movie => !!m);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeMovie = heroMovies[activeIndex];
  const backdropSrc = getBackdropUrl(activeMovie?.backdropUrl);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const goNext = useCallback(() => {
    goToSlide((activeIndex + 1) % heroMovies.length);
  }, [activeIndex, heroMovies.length, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((activeIndex - 1 + heroMovies.length) % heroMovies.length);
  }, [activeIndex, heroMovies.length, goToSlide]);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, goNext]);

  if (!activeMovie) return null;

  const isWatchlisted = watchlist.includes(activeMovie.id);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden rounded-3xl bg-[#07080c] border border-white/5 shadow-2xl select-none group"
      style={{ height: "clamp(420px, 56vh, 640px)" }}
      aria-label={`Featured: ${activeMovie.title}`}
    >
      {/* Backdrop Image */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        <img
          key={activeMovie.backdropUrl}
          src={backdropSrc}
          alt={activeMovie.title}
          className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-[8000ms] ease-linear"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_BACKDROP; }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07080c] via-[#07080c]/40 to-transparent" />

      {/* Ambient glow blob */}
      <div className="absolute top-8 left-12 w-96 h-72 bg-[#f95716]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
        aria-label="Previous movie"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
        aria-label="Next movie"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Content */}
      <div
        className="absolute bottom-0 inset-x-0 max-w-5xl px-6 sm:px-10 pb-10 z-10 flex flex-col gap-4 transition-opacity duration-300"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        {/* Badge */}
        {activeMovie.isTrending && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#f95716] text-white text-[11px] font-extrabold uppercase tracking-wide shadow-lg shadow-[#f95716]/30">
              <TrendingUp className="w-3 h-3" />
              {activeMovie.boxOfficeStatus}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none">
          {activeMovie.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="flex items-center gap-1 font-bold text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            {activeMovie.rating}
          </span>
          <span className="text-gray-400">·</span>
          <span className="flex items-center gap-1 text-gray-300">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            {activeMovie.duration}
          </span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-300">{activeMovie.releaseYear}</span>
          <span className="text-gray-400">·</span>
          {activeMovie.genres.slice(0, 3).map((g) => (
            <span key={g} className="px-2 py-0.5 rounded-md bg-white/10 text-white text-xs font-medium border border-white/10">
              {g}
            </span>
          ))}
        </div>

        {/* Synopsis */}
        <p className="text-sm text-gray-300 max-w-xl leading-relaxed line-clamp-2 hidden sm:block">
          {activeMovie.synopsis}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={() => openStreaming(activeMovie)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#f95716] hover:bg-[#e04708] text-white font-extrabold text-sm shadow-xl shadow-[#f95716]/30 hover:shadow-[#f95716]/50 transition-all cursor-pointer active:scale-95"
            aria-label={`Play trailer for ${activeMovie.title}`}
          >
            <Play className="w-4 h-4 fill-current" />
            Play Trailer
          </button>

          <button
            onClick={() => navigate(`/movie/${activeMovie.id}`)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 hover:border-white/25 transition-all cursor-pointer active:scale-95"
            aria-label={`View AI analysis for ${activeMovie.title}`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            AI Analysis
          </button>

          <button
            onClick={() => toggleWatchlist(activeMovie.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm border transition-all cursor-pointer active:scale-95 ${
              isWatchlisted
                ? "bg-[#f95716]/15 border-[#f95716]/40 text-[#f95716]"
                : "bg-white/5 hover:bg-white/10 text-white border-white/15 hover:border-white/25"
            }`}
            aria-label={isWatchlisted ? `Remove ${activeMovie.title} from watchlist` : `Add ${activeMovie.title} to watchlist`}
            aria-pressed={isWatchlisted}
          >
            {isWatchlisted ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
            {isWatchlisted ? "In Watchlist" : "Watchlist"}
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-6 flex items-center gap-2 z-20">
        {heroMovies.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex
                ? "w-6 h-2 bg-[#f95716]"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/5 z-20">
        {!isPaused && (
          <div
            className="h-full bg-[#f95716] transition-none"
            style={{
              animation: `slideProgress ${AUTOPLAY_INTERVAL}ms linear`,
              animationFillMode: "forwards",
            }}
            key={activeIndex}
          />
        )}
      </div>

      <style>{`
        @keyframes slideProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
};
