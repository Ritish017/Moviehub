import React, { useState, useMemo } from "react";
import { MovieCard } from "./MovieCard";
import { Movie, LanguageType, BoxOfficeStatusType } from "../types";
import { SlidersHorizontal, Film, ArrowUpDown, Filter } from "lucide-react";

interface MovieGridProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie) => void;
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
  const [sortBy, setSortBy] = useState<"rating" | "gross" | "roi" | "year">("gross");

  const languages: LanguageType[] = [
    "All",
    "Hindi",
    "Telugu",
    "Tamil",
    "Malayalam",
    "Kannada",
    "Pan-India",
  ];

  const genresList = useMemo(() => {
    const all = new Set<string>();
    movies.forEach((m) => m.genres.forEach((g) => all.add(g)));
    return ["All", ...Array.from(all)];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    return movies
      .filter((m) => {
        if (selectedLanguage !== "All" && m.language !== selectedLanguage && !(selectedLanguage === "Pan-India" && m.tags.includes("Pan-India"))) {
          return false;
        }
        if (selectedGenre !== "All" && !m.genres.includes(selectedGenre)) {
          return false;
        }
        if (selectedStatus !== "All" && m.boxOfficeStatus !== selectedStatus) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "gross") return b.boxOfficeGrossCrores - a.boxOfficeGrossCrores;
        if (sortBy === "roi") return b.roiPercentage - a.roiPercentage;
        if (sortBy === "year") return b.releaseYear - a.releaseYear;
        return 0;
      });
  }, [movies, selectedLanguage, selectedGenre, selectedStatus, sortBy]);

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

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" /> SORT BY:
            </span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-[#0C0E16] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-gray-200 font-bold focus:outline-none focus:border-red-500"
            >
              <option value="gross">Worldwide Gross (₹ Cr)</option>
              <option value="rating">Audience Rating (★)</option>
              <option value="roi">ROI Return (%)</option>
              <option value="year">Release Year (Newest)</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
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

      {/* Grid Display */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelectMovie={onSelectMovie}
              onOpenTrailer={onOpenTrailer}
              isWatchlisted={watchlist.includes(movie.id)}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      )}

    </section>
  );
};
