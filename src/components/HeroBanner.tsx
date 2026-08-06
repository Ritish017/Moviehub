import React, { useState, useEffect } from "react";
import { Play, Bookmark, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "../types";
import { getYouTubeEmbedUrl } from "../utils/videoUtils";
import { getBackdropUrl, FALLBACK_BACKDROP } from "../utils/imageUtils";

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
  const rotatingMovies = [
    {
      id: "pushpa-2-the-rule",
      title: "pushpa 2: the rule",
      badge: "biggest release",
      rating: "9.1",
      imdb: "8.9",
      duration: "3h 20m",
      synopsis: "Pushpa Raj expands his red sandalwood smuggling empire across international borders while clashing head-on with SP Bhanwar Singh Shekhawat.",
      backdropUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1600&auto=format&fit=crop",
      trailerVideoId: "1kF_n7Y546Q",
      movieObj: movie,
    },
    {
      id: "kalki-2898-ad",
      title: "kalki 2898 ad",
      badge: "trending #1",
      rating: "8.7",
      imdb: "8.4",
      duration: "3h 01m",
      synopsis: "Set in 2898 AD, a modern avatar of Vishnu descends to Earth in dystopian Kasi to protect the unborn child of SUM-80.",
      backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop",
      trailerVideoId: "k9k1l_8y0e8",
      movieObj: movie,
    },
    {
      id: "rrr",
      title: "rrr",
      badge: "oscar winner",
      rating: "8.8",
      imdb: "8.8",
      duration: "3h 07m",
      synopsis: "A fearless revolutionary and an officer in the British force forge a legendary friendship in 1920s India.",
      backdropUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1600&auto=format&fit=crop",
      trailerVideoId: "GY4BgSe538c",
      movieObj: movie,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rotatingMovies.length);
      setIsPlayingVideo(false);
    }, 8000);
    return () => clearInterval(timer);
  }, [rotatingMovies.length, isPaused]);

  const activeSlide = rotatingMovies[activeIndex];
  const bgUrl = getBackdropUrl(activeSlide.backdropUrl);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[52vh] min-h-[420px] max-h-[560px] overflow-hidden rounded-3xl my-6 bg-[#1a120e] border border-white/5 shadow-2xl group select-none transition-all duration-700"
    >
      {/* Video preview vs Backdrop image */}
      {isPlayingVideo ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden scale-125">
          <iframe
            src={getYouTubeEmbedUrl(activeSlide.trailerVideoId, true, true)}
            title={activeSlide.title}
            className="w-full h-full border-0 pointer-events-none opacity-80"
            allow="autoplay; encrypted-media"
          />
        </div>
      ) : (
        <img
          src={bgUrl}
          alt={activeSlide.title}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.4] group-hover:scale-105 transition-transform duration-1000"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_BACKDROP;
          }}
        />
      )}

      {/* Atmospheric gradient overlay matching screenshot warmth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#1a120e]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a120e] via-[#1a120e]/70 to-transparent" />

      {/* Slide Navigation Arrows */}
      <button
        onClick={() => { setActiveIndex((prev) => (prev - 1 + rotatingMovies.length) % rotatingMovies.length); setIsPlayingVideo(false); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => { setActiveIndex((prev) => (prev + 1) % rotatingMovies.length); setIsPlayingVideo(false); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Main Content Layout matching Screenshot */}
      <div className="relative h-full max-w-7xl mx-auto px-8 sm:px-12 flex flex-col justify-end pb-12 z-10 space-y-4">
        
        {/* Top Badge: Orange Solid Pill `biggest release` */}
        <div>
          <span className="inline-block px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#f95716] text-white tracking-wide lowercase font-sans">
            {activeSlide.badge}
          </span>
        </div>

        {/* Main Title: Bold clean lowercase sans-serif */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-sans tracking-tight lowercase">
          {activeSlide.title}
        </h1>

        {/* Rating + Meta row: 9.1  imdb 8.9  3h 20m */}
        <div className="flex items-center gap-3 text-sm text-gray-300 font-sans">
          <span className="font-bold text-[#f95716]">{activeSlide.rating}</span>
          <span className="text-gray-400">imdb {activeSlide.imdb}</span>
          <span className="text-gray-400">{activeSlide.duration}</span>
        </div>

        {/* Action Row: `play trailer` (orange) + `watchlist` (outline) */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => onOpenTrailer(activeSlide.movieObj)}
            className="px-7 py-3 rounded-2xl bg-[#f95716] hover:bg-[#e04708] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#f95716]/30 transition-all cursor-pointer lowercase"
          >
            <Play className="w-4 h-4 fill-current" /> play trailer
          </button>

          {onToggleWatchlist && (
            <button
              onClick={() => onToggleWatchlist(activeSlide.id)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 border border-white/20 text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer lowercase ${
                isWatchlisted ? "border-[#f95716] text-[#f95716]" : ""
              }`}
            >
              {isWatchlisted ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
              <span>{isWatchlisted ? "in watchlist" : "watchlist"}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
