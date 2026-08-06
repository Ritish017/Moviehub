import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, Info } from "lucide-react";
import type { Movie } from "../types";
import { getPosterUrl } from "../utils/imageUtils";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

interface HorizontalMovieRailProps {
  title: string;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie) => void;
  isLarge?: boolean;
}

export const HorizontalMovieRail: React.FC<HorizontalMovieRailProps> = ({
  title,
  movies,
  onSelectMovie,
  onOpenTrailer,
  isLarge = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.7;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative group/rail w-full py-6">
      {/* Rail Header */}
      <div className="px-10 lg:px-20 mb-4 flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {title}
        </h2>
        <div className="hidden md:flex gap-2 opacity-0 group-hover/rail:opacity-100 transition-opacity">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer border border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer border border-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Rail Content */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-10 lg:px-20 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "relative shrink-0 snap-start cursor-pointer rounded-2xl overflow-hidden group/card bg-[#121212] border border-white/5 shadow-lg",
              isLarge ? "w-[300px] md:w-[400px] aspect-[16/9]" : "w-[160px] md:w-[220px] aspect-[2/3]"
            )}
            onClick={() => onSelectMovie(movie)}
          >
            {/* Poster / Backdrop */}
            <img
              src={isLarge ? getPosterUrl(movie.backdropUrl) : getPosterUrl(movie.posterUrl)}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
            />
            
            {/* Hover Glass Panel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-lg line-clamp-1 mb-1">{movie.title}</h3>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 mb-4">
                <span className="text-yellow-500">★ {movie.rating}</span>
                <span>{movie.releaseYear}</span>
                <span className="px-1.5 py-0.5 border border-white/30 rounded text-[10px]">HD</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onOpenTrailer(movie); }}
                  className="flex-1 bg-white hover:bg-gray-200 text-black py-2 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onSelectMovie(movie); }}
                  className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-colors"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
