import React, { useState } from "react";
import {
  Film,
  Tv,
  Users,
  Layers,
  Award,
  BarChart3,
  Sparkles,
  Search,
  User,
  X,
  Globe
} from "lucide-react";
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
  selectedLanguage,
  setSelectedLanguage,
  searchQuery,
  setSearchQuery,
  moviesList,
  onSelectMovie,
  onOpenAiAssistant,
  onOpenCommandPalette,
  userRole,
  userName,
}) => {
  const filteredSearchResults = searchQuery.trim()
    ? moviesList.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.cast.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#07080c]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("explore")}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-[#e50914] to-amber-500 rounded-xl rotate-45 flex items-center justify-center shadow-lg shadow-red-600/40 shrink-0">
              <Film className="w-4 h-4 sm:w-5 sm:h-5 text-white -rotate-45 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white font-sans">
                  MOVIEHUB <span className="text-amber-400 font-serif">X</span>
                </span>
                <span className="hidden xs:inline-block px-2 py-0.5 text-[9px] font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded uppercase tracking-widest font-mono">
                  AI CINEMA OS
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium hidden md:block">
                The AI Operating System for Global Cinema
              </p>
            </div>
          </div>

          {/* Clean Streamlined Product Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0d0e15] p-1.5 rounded-2xl border border-white/10 shadow-inner">
            <button
              onClick={() => setActiveTab("explore")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "explore"
                  ? "bg-white/10 text-white border border-white/15 shadow"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab("explore")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "explore"
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>Movies</span>
            </button>

            <button
              onClick={() => setActiveTab("streaming")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "streaming"
                  ? "bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Tv className="w-3.5 h-3.5 text-purple-400" />
              <span>TV & Footage</span>
            </button>

            <button
              onClick={() => setActiveTab("community")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "community"
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>Community</span>
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab("live-api")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "live-api"
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Live APIs</span>
            </button>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5 text-purple-400" />
              <span>Profile</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            
            {/* Real Metadata Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#0d0e15] border border-white/10 rounded-full text-[11px] font-bold text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Trending Movies • Updated 3m ago • TMDb</span>
            </div>

            {/* Search Launcher */}
            <div className="relative">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-xs focus-within:border-amber-400/50 transition-all">
                <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search movies, actors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none w-24 xs:w-32 sm:w-44 text-xs font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-white ml-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                {onOpenCommandPalette && (
                  <button
                    onClick={onOpenCommandPalette}
                    className="hidden sm:flex items-center gap-1 ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-amber-300 border border-white/15 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    ⌘K
                  </button>
                )}
              </div>

              {/* Autocomplete dropdown */}
              {filteredSearchResults.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0d0e15] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-white/5">
                  <div className="p-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-black/60 flex items-center justify-between">
                    <span>Matches ({filteredSearchResults.length})</span>
                    <span className="text-amber-400">Select to View</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {filteredSearchResults.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => { onSelectMovie(m); setSearchQuery(""); }}
                        className="p-3 hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <img src={m.posterUrl} alt={m.title} className="w-8 h-12 object-cover rounded shadow border border-white/10" />
                        <div>
                          <p className="text-xs font-bold text-white">{m.title}</p>
                          <p className="text-[11px] text-gray-400">{m.releaseYear} • {m.director} • ★ {m.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Floating CineAI Copilot Action Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-900/40 hover:scale-105 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">CineAI</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
