import React from "react";
import { Star, Play, BarChart2, Bookmark, Flame, Check } from "lucide-react";
import { Movie } from "../types";

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
  return (
    <div className="group relative bg-[#090B10] rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-red-600/15 flex flex-col h-full">
      
      {/* Poster Image & Overlay Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-black/50 cursor-pointer" onClick={() => onSelectMovie(movie)}>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B10] via-transparent to-black/50 opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#06070B]/90 text-blue-400 border border-blue-500/30 backdrop-blur-md uppercase tracking-wider font-mono">
            {movie.language}
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-white shadow ${
            movie.boxOfficeStatus.includes("All-Time")
              ? "bg-gradient-to-r from-red-600 to-rose-600"
              : movie.boxOfficeStatus.includes("Blockbuster")
              ? "bg-blue-600"
              : "bg-indigo-600"
          }`}>
            {movie.boxOfficeStatus}
          </span>
        </div>

        {/* Center Hover Action (Play Trailer) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenTrailer(movie);
            }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 transform hover:scale-110 transition-transform cursor-pointer"
            title="Play Trailer"
          >
            <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
          </button>
        </div>

        {/* Watchlist Toggle Bookmark Button */}
        {onToggleWatchlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(movie.id);
            }}
            className={`absolute bottom-3 right-3 p-1.5 rounded-lg border backdrop-blur-md transition-all cursor-pointer z-10 ${
              isWatchlisted
                ? "bg-red-600 text-white border-red-500 font-bold"
                : "bg-black/60 text-gray-400 border-white/20 hover:text-white hover:bg-black/80"
            }`}
            title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            {isWatchlisted ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>
        )}

      </div>

      {/* Card Details Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1 font-mono">
            <span>{movie.releaseYear} • {movie.duration}</span>
            <span className="flex items-center gap-1 font-bold text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              {movie.rating}
            </span>
          </div>

          <h3
            onClick={() => onSelectMovie(movie)}
            className="text-sm font-black text-white group-hover:text-red-400 transition-colors cursor-pointer line-clamp-1 font-sans"
          >
            {movie.title}
          </h3>

          <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
            Dir: <span className="text-gray-200 font-medium">{movie.director}</span>
          </p>

          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genres.slice(0, 2).map((genre) => (
              <span key={genre} className="text-[10px] bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded font-medium">
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Financial Telemetry Snippet */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">WW Gross</p>
            <p className="text-red-400 font-black font-mono">₹{movie.boxOfficeGrossCrores} Cr</p>
          </div>
          <button
            onClick={() => onSelectMovie(movie)}
            className="flex items-center gap-1 text-[11px] font-extrabold text-blue-400 hover:text-blue-300 cursor-pointer"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Telemetry</span>
          </button>
        </div>

      </div>

    </div>
  );
};
