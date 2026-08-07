import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Bookmark, Check, ChevronLeft, ChevronRight, Sparkles, Clock, Star, Info } from "lucide-react";
import type { Movie } from "../../types";
import { getBackdropUrl, getPosterUrl, FALLBACK_BACKDROP } from "../../utils/imageUtils";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { useMovieStore } from "../../store/useMovieStore";
import { useContentStore } from "../../store/useContentStore";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

import { HeroSkeleton } from "../../components/ui/Skeleton";

const AUTOPLAY_INTERVAL = 8000;

export const CinematicHero: React.FC = () => {
  const navigate = useNavigate();
  const toggleWatchlist = useUserStore((s) => s.toggleWatchlist);
  const watchlist = useUserStore((s) => s.userProfile.watchlist);
  const openStreaming = useMovieStore((s) => s.openStreaming);
  
  // Use trending from the new TMDB store
  const trending = useContentStore(s => s.trending);
  const heroMovies = trending.slice(0, 5);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeMovie = heroMovies[activeIndex];

  const goNext = useCallback(() => {
    if (heroMovies.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % heroMovies.length);
  }, [heroMovies.length]);

  const goPrev = useCallback(() => {
    if (heroMovies.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
  }, [heroMovies.length]);

  useEffect(() => {
    if (isPaused || heroMovies.length === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, goNext, heroMovies.length]);

  if (!activeMovie) return <HeroSkeleton />;

  const isWatchlisted = watchlist.includes(activeMovie.id);
  const backdropSrc = getBackdropUrl(activeMovie.backdropUrl);
  const posterSrc = getPosterUrl(activeMovie.posterUrl);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden rounded-[2rem] bg-black border border-white/5 shadow-2xl group"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Backdrop Image */}
          <img
            src={backdropSrc}
            alt={activeMovie.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_BACKDROP; }}
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Nav Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 backdrop-blur-md hover:bg-white/20 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-xl"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 backdrop-blur-md hover:bg-white/20 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-xl"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Area */}
      <div className="absolute inset-0 z-20 flex items-center px-10 lg:px-20 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMovie.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex w-full gap-16 items-center"
          >
            {/* Left Column: Metadata & Actions */}
            <div className="flex-1 max-w-2xl space-y-6">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold tracking-wider uppercase text-white/80">
                {activeMovie.isTrending && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-500/20 shadow-[0_0_15px_rgba(229,9,20,0.3)]">
                    <Sparkles className="w-3.5 h-3.5" /> Trending #1
                  </span>
                )}
                {activeMovie.genres.slice(0, 2).map(g => (
                  <span key={g} className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
                    {g}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-black text-white font-serif leading-[1.1] tracking-tight drop-shadow-2xl">
                {activeMovie.title}
              </h1>

              {/* AI Tagline */}
              <p className="text-xl md:text-2xl text-gray-300 font-medium italic drop-shadow-md">
                "{activeMovie.synopsis ? activeMovie.synopsis.split('.')[0] : activeMovie.title}."
              </p>

              {/* Meta Stats */}
              <div className="flex items-center gap-6 text-sm font-semibold text-gray-300">
                <span className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                  <Star className="w-4 h-4 fill-current" /> {activeMovie.rating} / 10
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" /> {activeMovie.duration || "150m"}
                </span>
                <span className="text-gray-400 border border-white/20 px-2 py-0.5 rounded text-xs font-mono">
                  {activeMovie.releaseYear}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => openStreaming(activeMovie as any)}
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-white/10 cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-current" /> Watch Trailer
                </button>

                <button
                  onClick={() => navigate(`/movie/${activeMovie.id}`)}
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer"
                >
                  <Info className="w-6 h-6" /> Explore
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); toggleWatchlist(activeMovie.id); }}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer text-white"
                  title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                  {isWatchlisted ? <Check className="w-6 h-6 text-green-400" /> : <Bookmark className="w-6 h-6" />}
                </button>
              </div>

            </div>

            {/* Right Column: Poster */}
            <div className="hidden lg:block w-72 shrink-0 perspective-1000">
              <motion.div
                whileHover={{ rotateY: -15, rotateX: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/10"
              >
                <img
                  src={posterSrc}
                  alt={activeMovie.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-10 lg:left-20 z-30 flex items-center gap-2">
        {heroMovies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { setActiveIndex(idx); setIsPaused(true); }}
            className={cn(
              "h-1.5 rounded-full transition-all cursor-pointer",
              activeIndex === idx ? "w-12 bg-white" : "w-4 bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};
