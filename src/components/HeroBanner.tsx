import React, { useState, useEffect } from "react";
import { Play, Plus, Check, Star, Flame, Volume2, VolumeX, Sparkles, Clock, ChevronLeft, ChevronRight } from "lucide-react";
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
      id: movie.id,
      title: movie.title,
      badge: "#1 IN CINEMA TODAY",
      badgeColor: "from-[#e50914] to-amber-500",
      rating: movie.rating,
      imdb: "8.4",
      tmdb: "8.6",
      audienceScore: "93%",
      grossWW: `₹${movie.boxOfficeGrossCrores} Cr`,
      year: movie.releaseYear,
      duration: movie.duration,
      genres: movie.genres,
      synopsis: movie.synopsis,
      backdropUrl: movie.backdropUrl,
      posterUrl: movie.posterUrl,
      trailerVideoId: movie.featuredTrailerUrl,
      movieObj: movie,
    },
    {
      id: "pushpa-2-the-rule",
      title: "Pushpa 2: The Rule",
      badge: "BIGGEST UPCOMING RELEASE",
      badgeColor: "from-amber-500 to-rose-600",
      rating: 9.1,
      imdb: "8.9",
      tmdb: "9.0",
      audienceScore: "96%",
      grossWW: "₹970 Cr+ Est.",
      year: 2024,
      duration: "3h 20m",
      genres: ["Action", "Crime", "Mass Thriller"],
      synopsis: "The clash between Pushpa Raj and Bhanwar Singh Shekhawat escalates into an international smuggling empire rule.",
      backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop",
      posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
      trailerVideoId: "1kF_n7Y546Q",
      movieObj: movie,
    },
    {
      id: "rrr",
      title: "RRR",
      badge: "OSCAR & GOLDEN GLOBE WINNER",
      badgeColor: "from-purple-600 to-indigo-600",
      rating: 8.8,
      imdb: "8.8",
      tmdb: "8.7",
      audienceScore: "95%",
      grossWW: "₹1,387 Cr",
      year: 2022,
      duration: "3h 07m",
      genres: ["Action", "Drama", "Historical"],
      synopsis: "A fearless revolutionary and an officer in the British force forge a legendary friendship in 1920s India.",
      backdropUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600&auto=format&fit=crop",
      posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
      trailerVideoId: "GY4BgSe538c",
      movieObj: movie,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // 10-Second Auto Rotate Timer (Pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rotatingMovies.length);
      setIsPlayingVideo(false);
    }, 9000);
    return () => clearInterval(timer);
  }, [rotatingMovies.length, isPaused]);

  // Auto video preview after 3s on slide change
  useEffect(() => {
    const videoTimer = setTimeout(() => {
      setIsPlayingVideo(true);
    }, 3200);
    return () => clearTimeout(videoTimer);
  }, [activeIndex]);

  const activeSlide = rotatingMovies[activeIndex];
  const bgUrl = getBackdropUrl(activeSlide.backdropUrl);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[85vh] min-h-[580px] max-h-[820px] overflow-hidden rounded-3xl my-4 border border-white/15 shadow-2xl group bg-[#07080c] select-none transition-all duration-700"
    >
      
      {/* Media Layer: Live Video vs Backdrop Image */}
      {isPlayingVideo ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden scale-125 transition-opacity duration-1000">
          <iframe
            src={getYouTubeEmbedUrl(activeSlide.trailerVideoId, true, isMuted)}
            title={activeSlide.title}
            className="w-full h-full border-0 pointer-events-none opacity-80"
            allow="autoplay; encrypted-media"
          />
        </div>
      ) : (
        <img
          src={bgUrl}
          alt={activeSlide.title}
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 group-hover:scale-110 filter brightness-90"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_BACKDROP;
          }}
        />
      )}

      {/* Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07080c] via-[#07080c]/80 to-transparent" />

      {/* Dynamic Ambient Poster Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Slide Navigation Arrow Controls */}
      <button
        onClick={() => { setActiveIndex((prev) => (prev - 1 + rotatingMovies.length) % rotatingMovies.length); setIsPlayingVideo(false); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => { setActiveIndex((prev) => (prev + 1) % rotatingMovies.length); setIsPlayingVideo(false); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Content Info Container matching Reference Hero */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-end pb-10 z-10 space-y-4">
        
        {/* Release / Trending Badge */}
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r ${activeSlide.badgeColor} text-white shadow-xl uppercase tracking-wider font-mono`}>
            <Flame className="w-3.5 h-3.5 fill-current" /> {activeSlide.badge}
          </span>
          <span className="text-xs text-gray-400 font-mono hidden sm:inline">
            {isPaused ? "Paused on hover" : "Rotating every 9s"}
          </span>
        </div>

        {/* Floating Movie Title */}
        <div className="space-y-1 max-w-3xl">
          <h1 className="text-4xl sm:text-7xl font-black text-white font-serif tracking-tight drop-shadow-2xl">
            {activeSlide.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-sans line-clamp-2 leading-relaxed">
            {activeSlide.synopsis}
          </p>
        </div>

        {/* Multi-Source Ratings & Telemetry Badges */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-[#12141d]/90 px-3.5 py-1.5 rounded-xl border border-white/10 shadow">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-white">★ {activeSlide.rating} / 10</span>
          </div>

          <div className="bg-[#12141d]/90 px-3.5 py-1.5 rounded-xl border border-white/10">
            <span className="text-amber-400 font-bold">IMDb: {activeSlide.imdb}</span>
          </div>

          <div className="bg-[#12141d]/90 px-3.5 py-1.5 rounded-xl border border-white/10">
            <span className="text-emerald-400 font-bold">TMDb: {activeSlide.tmdb}</span>
          </div>

          <div className="bg-[#12141d]/90 px-3.5 py-1.5 rounded-xl border border-white/10">
            <span className="text-purple-300 font-bold">{activeSlide.audienceScore} Audience</span>
          </div>

          <div className="bg-[#12141d]/90 px-3.5 py-1.5 rounded-xl border border-white/10">
            <span className="text-emerald-400 font-bold">{activeSlide.grossWW} WW</span>
          </div>

          <div className="text-gray-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {activeSlide.duration}
          </div>
        </div>

        {/* Handcrafted Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => onOpenTrailer(activeSlide.movieObj)}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#e50914] hover:bg-red-700 text-white font-bold text-sm shadow-2xl shadow-red-900/50 hover:scale-105 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" /> Play Trailer
          </button>

          <button
            onClick={() => onSelectMovie(activeSlide.movieObj)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 font-bold text-sm backdrop-blur-md hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> AI Deep Analysis
          </button>

          {onToggleWatchlist && (
            <button
              onClick={() => onToggleWatchlist(activeSlide.id)}
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

        {/* 9-Second Auto Slider Indicator Dots */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            {rotatingMovies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveIndex(idx); setIsPlayingVideo(false); }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx ? "w-8 bg-[#e50914]" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <span className="text-[11px] text-gray-400 font-mono">
            {activeIndex + 1} / {rotatingMovies.length} Featured Cinema Spotlight
          </span>
        </div>

      </div>
    </div>
  );
};
