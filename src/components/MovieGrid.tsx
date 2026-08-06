import React, { useState, useEffect, useRef } from "react";
import { MovieCard } from "./MovieCard";
import type { Movie, LanguageType, VideoClip } from "../types";
import { ArrowUpDown, Filter } from "lucide-react";
import { useMovieFilter, useGenreList, type SortKey } from "../hooks/useMovieFilter";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

interface MovieGridProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie, clip?: VideoClip) => void;
  watchlist: string[];
  onToggleWatchlist: (movieId: string) => void;
  selectedLanguage: LanguageType;
  setSelectedLanguage: (lang: LanguageType) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  onSelectMovie,
  onOpenTrailer,
  watchlist,
  onToggleWatchlist,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortKey>("gross");

  const languages: LanguageType[] = [
    "All",
    "Hindi",
    "Telugu",
    "Tamil",
    "Malayalam",
    "Kannada",
    "Pan-India",
  ];

  const genresList = useGenreList(movies);

  const filteredMovies = useMovieFilter(movies, {
    selectedLanguage,
    selectedGenre,
    selectedStatus,
    sortBy,
  });

  // Responsive column calculation for virtualization
  const [columns, setColumns] = useState(5);
  
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else if (width < 1280) setColumns(4);
      else setColumns(5);
    };
    
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const rowCount = Math.ceil(filteredMovies.length / columns);
  const cardHeight = 420; // Estimated height of MovieCard + gap
  const listRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => cardHeight,
    overscan: 2,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  return (
    <section className="my-8">
      {/* Header & Filter Controls Bar */}
      <div className="bg-[#080A0F] border border-red-500/20 rounded-3xl p-5 sm:p-6 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-xl font-extrabold text-white font-sans lowercase tracking-tight">
              trending now
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" /> SORT BY:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-[#0C0E16] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-gray-200 font-bold focus:outline-none focus:border-red-500"
            >
              <option value="gross">Worldwide Gross (₹ Cr)</option>
              <option value="rating">Audience Rating (★)</option>
              <option value="roi">ROI Return (%)</option>
              <option value="year">Release Year (Newest)</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          {/* Languages Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0 mr-1 font-mono">LANGUAGE:</span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  selectedLanguage === lang
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30"
                    : "bg-[#0C0E16] hover:bg-white/10 text-gray-400 border border-white/10"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Genre Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest shrink-0 mr-1 font-mono">GENRE:</span>
            {genresList.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedGenre === genre
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-[#0F1116] hover:bg-white/5 text-gray-400 border border-white/5"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Virtualized Grid Display */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-16 bg-[#14171E] rounded-3xl border border-white/5 p-8">
          <Filter className="w-10 h-10 text-gray-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Indian Movies Match Selected Filters</h3>
          <p className="text-xs text-gray-400 mt-1 mb-4">Try clearing your language or genre filter choices.</p>
          <button
            onClick={() => {
              setSelectedLanguage("All");
              setSelectedGenre("All");
              setSelectedStatus("All");
            }}
            className="px-4 py-2 bg-emerald-500 text-black rounded-lg text-xs font-extrabold shadow hover:bg-emerald-400"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div ref={listRef} style={{ height: virtualizer.getTotalSize(), width: '100%', position: 'relative' }}>
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {filteredMovies
                .slice(virtualRow.index * columns, (virtualRow.index + 1) * columns)
                .map((movie) => (
                  <div key={movie.id} className="w-full h-full pb-6">
                    <MovieCard
                      movie={movie}
                      onSelectMovie={onSelectMovie}
                      onOpenTrailer={onOpenTrailer}
                      isWatchlisted={watchlist.includes(movie.id)}
                      onToggleWatchlist={onToggleWatchlist}
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
