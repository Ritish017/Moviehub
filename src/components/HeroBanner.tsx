import React from "react";
import { Play, Flame, BarChart2 } from "lucide-react";
import { Movie } from "../types";

interface HeroBannerProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  movie,
  onSelectMovie,
  onOpenTrailer,
}) => {
  return (
    <div className="relative w-full h-[520px] sm:h-[580px] overflow-hidden rounded-3xl my-6 border border-red-500/30 shadow-2xl group bg-[#06070B]">
      {/* Background Backdrop Image with Geometric Vignette Overlay */}
      <img
        src={movie.backdropUrl}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 group-hover:scale-110 opacity-65"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06070B] via-[#06070B]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06070B] via-[#06070B]/90 to-transparent" />

      {/* Red & Blue Ambient Light Floats */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-end pb-8 z-10">
        
        {/* Geometric Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-black bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-current" />
            #1 Pan-Indian Box Office Titan
          </span>
          <span className="px-3 py-1 rounded-md text-[11px] font-extrabold bg-[#0A0C14] text-blue-400 border border-blue-500/30">
            {movie.language} • {movie.industry}
          </span>
          <span className="px-3 py-1 rounded-md text-[11px] font-extrabold bg-[#0A0C14] text-red-400 border border-red-500/30 font-mono">
            ₹{movie.boxOfficeGrossCrores} Cr Worldwide Gross
          </span>
        </div>

        {/* Title & Original Title */}
        <div className="mb-3">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-sans drop-shadow-md">
            {movie.title}
          </h1>
          {movie.originalTitle && (
            <p className="text-base sm:text-lg text-red-400 font-mono italic mt-1 font-bold">
              {movie.originalTitle}
            </p>
          )}
        </div>

        {/* Synopsis snippet */}
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl line-clamp-2 mb-5 font-normal leading-relaxed">
          {movie.synopsis}
        </p>

        {/* Quick Financial Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mb-6 bg-[#0B0D14]/90 border border-white/10 p-3.5 rounded-2xl text-xs backdrop-blur-md shadow-inner">
          <div>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Directed By</p>
            <p className="text-white font-bold truncate mt-0.5">{movie.director}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">India Net Gross</p>
            <p className="text-red-400 font-extrabold font-mono mt-0.5">₹{movie.indiaNetGrossCrores} Cr</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">ROI Return</p>
            <p className="text-blue-400 font-extrabold font-mono mt-0.5">+{movie.roiPercentage}%</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Audience Rating</p>
            <p className="text-amber-400 font-bold flex items-center gap-1 mt-0.5 font-mono">
              ★ {movie.rating} / 10 <span className="text-gray-400 font-normal text-[10px]">({(movie.userRatingCount/1000).toFixed(0)}k)</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenTrailer(movie)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs tracking-wide shadow-xl shadow-red-600/30 transform hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current text-white" />
            <span>Watch HD Trailer</span>
          </button>

          <button
            onClick={() => onSelectMovie(movie)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A0C14] hover:bg-white/10 text-white font-extrabold text-xs border border-blue-500/40 shadow-lg shadow-blue-500/10 transform hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <BarChart2 className="w-4 h-4 text-blue-400" />
            <span>Deep Telemetry & Cast</span>
          </button>
        </div>

      </div>
    </div>
  );
};
