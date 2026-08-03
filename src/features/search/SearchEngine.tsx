import React, { useState } from "react";
import { Search, Mic, Sparkles, Film, User, Clapperboard, Award, Smile, Tag, Globe, SlidersHorizontal } from "lucide-react";
import { Movie } from "../../types";

interface SearchEngineProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const SearchEngine: React.FC<SearchEngineProps> = ({ movies, onSelectMovie }) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "movies" | "actors" | "directors" | "awards" | "mood" | "quotes" | "ai"
  >("all");
  const [selectedMood, setSelectedMood] = useState<string>("All");

  const moods = ["All", "Cyberpunk", "Epic Mythology", "High-Octane Action", "Mind-bending", "Folklore", "Emotional Climax"];

  const filteredMovies = movies.filter((movie) => {
    const q = query.toLowerCase().trim();
    if (!q && selectedMood === "All") return true;

    const matchesQuery = !q || (
      movie.title.toLowerCase().includes(q) ||
      movie.director.toLowerCase().includes(q) ||
      movie.genres.some((g) => g.toLowerCase().includes(q)) ||
      movie.cast.some((c) => c.name.toLowerCase().includes(q) || c.characterName.toLowerCase().includes(q)) ||
      movie.synopsis.toLowerCase().includes(q) ||
      movie.productionHouse.toLowerCase().includes(q)
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
          Search across Movies, Actors, Directors, Studios, Awards, Dialogue Quotes, Moods, and Natural Language
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <div className="flex items-center bg-[#07080c] border border-white/15 rounded-2xl px-4 py-3 text-sm focus-within:border-amber-400 transition-all shadow-inner">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, director, dialogue quote, mood, or natural language query..."
            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none font-sans text-sm sm:text-base"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-400 hover:text-white mr-2 text-xs">
              Clear
            </button>
          )}
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

      {/* Mood Filters Bar */}
      {activeCategory === "mood" && (
        <div className="flex flex-wrap gap-2 animate-fadeIn">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedMood === mood
                  ? "bg-purple-600 text-white shadow"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      )}

      {/* Search Results Grid */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Found {filteredMovies.length} Matching Results
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onSelectMovie(movie)}
              className="bg-[#07080c] border border-white/10 p-3.5 rounded-2xl flex items-center gap-3 hover:border-amber-400/50 transition-all cursor-pointer group"
            >
              <img src={movie.posterUrl} alt={movie.title} className="w-12 h-16 object-cover rounded-xl shadow shrink-0" />
              <div className="truncate">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate font-serif">
                  {movie.title}
                </h4>
                <p className="text-xs text-gray-400 truncate">{movie.releaseYear} • {movie.director}</p>
                <p className="text-[11px] text-amber-400 font-bold mt-0.5">★ {movie.rating} • ₹{movie.boxOfficeGrossCrores} Cr</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
