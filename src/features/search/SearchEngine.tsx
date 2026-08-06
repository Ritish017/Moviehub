import React, { useState, useEffect } from "react";
import { Search, Mic, Sparkles, Film, User, Clapperboard, Award, Smile, RefreshCw, AlertCircle } from "lucide-react";
import type { Movie, VideoClip } from "../../types";
import { api } from "../../services/apiClient";
import { MovieCard } from "../../components/MovieCard";
import { useDebounce } from "../../hooks/useDebounce";

interface SearchEngineProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie, clip?: VideoClip) => void;
  initialQuery?: string;
}

export const SearchEngine: React.FC<SearchEngineProps> = ({ movies, onSelectMovie, onOpenTrailer, initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "movies" | "actors" | "directors" | "awards" | "mood" | "ai"
  >("all");
  const [selectedMood, setSelectedMood] = useState<string>("All");

  const [isSearching, setIsSearching] = useState(false);
  const [apiResults, setApiResults] = useState<Movie[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  const moods = ["All", "Cyberpunk", "Epic Mythology", "High-Octane Action", "Mind-bending", "Folklore", "Emotional Climax"];

  // Debounce input via reusable hook
  const debouncedQuery = useDebounce(query, 300);

  // Execute multi-API backend search when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) {
      setApiResults([]);
      setSearchError(null);
      return;
    }

    let isSubscribed = true;
    setIsSearching(true);
    setSearchError(null);
    console.log(`[SearchEngine] Executing search for query: "${debouncedQuery}"`);

    api.search(debouncedQuery)
      .then((res) => {
        if (!isSubscribed) return;
        setIsSearching(false);
        if (res.success && (res.movies?.length > 0 || res.supplementary?.length > 0)) {
          // Merge TMDB + supplementary
          setApiResults([...(res.movies || []), ...(res.supplementary || [])]);
        } else if (res.error) {
          setSearchError(res.error);
        } else {
          setApiResults([]);
        }
      })
      .catch((err) => {
        if (!isSubscribed) return;
        setIsSearching(false);
        setSearchError(err?.message || "Search failed");
      });

    return () => {
      isSubscribed = false;
    };
  }, [debouncedQuery]);

  // Local filter fallback combined with API results
  const combinedMovies = apiResults.length > 0 ? apiResults : movies;

  const filteredMovies = combinedMovies.filter((movie) => {
    const q = debouncedQuery.toLowerCase();
    if (!q && selectedMood === "All") return true;

    const matchesQuery = !q || (
      movie.title.toLowerCase().includes(q) ||
      movie.director.toLowerCase().includes(q) ||
      movie.genres.some((g) => g.toLowerCase().includes(q)) ||
      movie.cast?.some((c) => c.name.toLowerCase().includes(q) || c.characterName.toLowerCase().includes(q)) ||
      movie.synopsis.toLowerCase().includes(q)
    );

    const matchesMood = selectedMood === "All" || (
      movie.synopsis.toLowerCase().includes(selectedMood.toLowerCase()) ||
      movie.genres.some((g) => g.toLowerCase().includes(selectedMood.toLowerCase()))
    );

    return matchesQuery && matchesMood;
  });

  return (
    <div className="bg-[#12141d] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl animate-fadeIn">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-white font-serif flex items-center gap-2">
          <Search className="w-6 h-6 text-amber-400" /> Multi-Dimensional AI Search Engine
        </h2>
        <p className="text-xs text-gray-400">
          Live multi-source indexing across Apple iTunes, Wikipedia, TVMaze, TMDb, OMDb & Google Gemini AI
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <div className="flex items-center bg-[#07080c] border border-white/15 rounded-2xl px-4 py-3.5 text-sm focus-within:border-amber-400 transition-all shadow-inner">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Kalki, Pushpa, RRR, Oppenheimer, Mani Ratnam, dialogue quotes..."
            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none font-sans text-sm sm:text-base"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setApiResults([]); }}
              className="text-gray-400 hover:text-white mr-2 text-xs font-mono font-bold"
            >
              CLEAR
            </button>
          )}
          {isSearching && <RefreshCw className="w-4 h-4 text-amber-400 animate-spin mr-2" />}
          <button
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Voice Search"
          >
            <Mic className="w-4 h-4 text-purple-400" />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 text-xs font-bold border-b border-white/10 pb-4">
        {[
          { id: "all", label: "All Categories", icon: Film },
          { id: "movies", label: "Movies", icon: Film },
          { id: "actors", label: "Actors & Cast", icon: User },
          { id: "directors", label: "Directors", icon: Clapperboard },
          { id: "awards", label: "Awards & Honors", icon: Award },
          { id: "mood", label: "Mood & Theme", icon: Smile },
          { id: "ai", label: "AI Semantic Search", icon: Sparkles },
        ].map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-amber-400 text-black font-extrabold shadow-lg shadow-amber-400/20"
                  : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mood Filters */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-gray-400 mr-2 font-bold">Filter Mood:</span>
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => setSelectedMood(m)}
            className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
              selectedMood === m
                ? "bg-purple-600/30 text-purple-300 border-purple-500 font-bold"
                : "bg-white/5 text-gray-400 border-white/5 hover:text-white"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Search Output Status */}
      {searchError && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>API Notice: {searchError}. Falling back to local verified cinema index.</span>
        </div>
      )}

      {/* Results Grid */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white font-mono">
            SearchResults ({filteredMovies.length})
            {apiResults.length > 0 && <span className="ml-2 text-emerald-400 text-xs">• Sourced via Live iTunes/TMDb Gateway</span>}
          </h3>
        </div>

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelectMovie={onSelectMovie}
                onOpenTrailer={onOpenTrailer}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center space-y-3 bg-[#07080c] border border-white/5 rounded-2xl">
            <Film className="w-10 h-10 text-gray-600 mx-auto" />
            <h4 className="text-base font-bold text-white">No Movies Found</h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Try adjusting your query term or clear mood filters to discover titles across all language industries.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
