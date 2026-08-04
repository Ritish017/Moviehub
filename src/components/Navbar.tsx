import React from "react";
import { Search, Film, Sparkles } from "lucide-react";
import { LanguageType, Movie, UserRole } from "../types";

interface NavbarProps {
  activeTab: "explore" | "analytics" | "streaming" | "community" | "dashboard" | "live-api";
  setActiveTab: (tab: "explore" | "analytics" | "streaming" | "community" | "dashboard" | "live-api") => void;
  selectedLanguage: LanguageType;
  setSelectedLanguage: (lang: LanguageType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  moviesList: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onOpenAiAssistant: () => void;
  onOpenCommandPalette?: () => void;
  userRole: UserRole;
  userName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  moviesList,
  onSelectMovie,
  onOpenAiAssistant,
}) => {
  const filteredSearchResults = searchQuery.trim()
    ? moviesList.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.language.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#08080a]/95 backdrop-blur-xl border-b border-white/5 py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo matching screenshot: Orange Square Badge + lowercase "moviehub" */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group" 
          onClick={() => setActiveTab("explore")}
        >
          <div className="w-8 h-8 rounded-lg bg-[#f95716] text-white flex items-center justify-center font-black shadow-lg shadow-[#f95716]/30">
            <Film className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold text-white font-sans tracking-tight lowercase">
            moviehub
          </span>
        </div>

        {/* Center Nav Links matching screenshot: home, movies, community, analytics */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => setActiveTab("explore")}
            className={`transition-colors cursor-pointer lowercase ${
              activeTab === "explore" ? "text-white font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            home
          </button>

          <button
            onClick={() => setActiveTab("explore")}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer lowercase"
          >
            movies
          </button>

          <button
            onClick={() => setActiveTab("community")}
            className={`transition-colors cursor-pointer lowercase ${
              activeTab === "community" ? "text-white font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            community
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`transition-colors cursor-pointer lowercase ${
              activeTab === "analytics" ? "text-white font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            analytics
          </button>
        </nav>

        {/* Right Search Button & CineAI */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center bg-[#13141a] border border-white/10 rounded-xl px-3.5 py-1.5 text-xs text-gray-400 focus-within:border-white/30 transition-all">
              <Search className="w-3.5 h-3.5 mr-2 text-gray-400" />
              <input
                type="text"
                placeholder="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-gray-500 focus:outline-none w-20 sm:w-28 text-xs font-sans lowercase"
              />
            </div>

            {/* Autocomplete Dropdown */}
            {filteredSearchResults.length > 0 && (
              <div className="absolute right-0 mt-2 w-80 bg-[#121319] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-white/5">
                {filteredSearchResults.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => { onSelectMovie(m); setSearchQuery(""); }}
                    className="p-3 hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <img src={m.posterUrl} alt={m.title} className="w-8 h-12 object-cover rounded border border-white/10" />
                    <div>
                      <p className="text-xs font-bold text-white lowercase">{m.title}</p>
                      <p className="text-[11px] text-gray-400 font-mono">{m.releaseYear} • ★ {m.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenAiAssistant}
            className="p-2 rounded-xl bg-gradient-to-tr from-[#f95716] to-purple-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
            title="CineAI Copilot"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
