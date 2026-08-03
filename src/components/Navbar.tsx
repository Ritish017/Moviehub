import React, { useState } from "react";
import {
  Film,
  BarChart3,
  Tv,
  MessageSquare,
  User,
  Bot,
  Search,
  Sparkles,
  X,
  SlidersHorizontal,
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
  userRole,
  userName
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    <header className="sticky top-0 z-40 bg-[#0A0C10]/90 backdrop-blur-md border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Geometric Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("explore")}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-red-600 to-rose-600 rounded-sm rotate-45 flex items-center justify-center shadow-lg shadow-red-600/40 shrink-0">
              <Film className="w-4 h-4 sm:w-5 sm:h-5 text-white -rotate-45 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white font-sans">
                  CINE<span className="text-red-500 font-extrabold">BHARAT</span>
                </span>
                <span className="hidden xs:inline-block px-2 py-0.5 text-[9px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded uppercase tracking-widest font-mono">
                  RED-BLUE PRO
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium hidden md:block">
                Pan-Indian Cinema Ecosystem & Real-Time Telemetry
              </p>
            </div>
          </div>

          {/* Navigation Links (Desktop Console) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#090B10] p-1.5 rounded-xl border border-white/10 shadow-inner">
            <button
              onClick={() => setActiveTab("explore")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                activeTab === "explore"
                  ? "bg-gradient-to-r from-red-600/30 to-rose-600/30 text-white border border-red-500/50 shadow-md shadow-red-600/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Film className="w-3.5 h-3.5 text-red-500" />
              <span>Cinema Pulse</span>
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                activeTab === "analytics"
                  ? "bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-white border border-blue-500/50 shadow-md shadow-blue-600/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab("streaming")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                activeTab === "streaming"
                  ? "bg-gradient-to-r from-red-600/30 to-rose-600/30 text-white border border-red-500/50 shadow-md shadow-red-600/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Tv className="w-3.5 h-3.5 text-red-400" />
              <span>4K Footage</span>
            </button>

            <button
              onClick={() => setActiveTab("community")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                activeTab === "community"
                  ? "bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-white border border-blue-500/50 shadow-md shadow-blue-600/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
              <span>Forum</span>
            </button>

            <button
              onClick={() => setActiveTab("live-api")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                activeTab === "live-api"
                  ? "bg-gradient-to-r from-red-600 to-blue-600 text-white border border-white/20 shadow-lg shadow-red-600/25"
                  : "text-red-400 hover:text-red-300 hover:bg-red-500/10"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Real Free APIs</span>
            </button>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-white border border-blue-500/50 shadow-md shadow-blue-600/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Workspace</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            
            {/* Live Telemetry Ticker (Desktop) */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-[#090B10] border border-red-500/20 rounded-full text-[11px] font-bold text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span>LIVE BOX OFFICE: <span className="text-red-500 font-extrabold">₹482.4 CR TODAY</span></span>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-xs focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/30 transition-all">
                <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search actors, analytics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none w-24 xs:w-32 sm:w-44 text-xs font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-white ml-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search Dropdown Auto-suggest */}
              {filteredSearchResults.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0B0D14] border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-white/5">
                  <div className="p-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-black/60 flex items-center justify-between">
                    <span>Matches ({filteredSearchResults.length})</span>
                    <span className="text-red-400">Select to Inspect</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {filteredSearchResults.map((movie) => (
                      <div
                        key={movie.id}
                        onClick={() => {
                          onSelectMovie(movie);
                          setSearchQuery("");
                        }}
                        className="p-3 hover:bg-red-500/10 flex items-center gap-3 cursor-pointer transition-colors"
                      >
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="w-10 h-14 object-cover rounded-md border border-white/10 shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-white truncate">{movie.title}</h4>
                            <span className="text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.2 rounded font-mono">
                              {movie.language}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 truncate">Dir: {movie.director}</p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400 font-mono">
                            <span className="text-amber-400 font-bold">★ {movie.rating}</span>
                            <span>•</span>
                            <span className="text-red-400 font-bold">₹{movie.boxOfficeGrossCrores} Cr</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Copilot Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-500 hover:to-blue-500 text-xs font-extrabold transition-all cursor-pointer shadow-lg shadow-red-600/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">CineAI Copilot</span>
            </button>

            {/* User Profile Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-[#090B10] border border-white/10 px-2.5 py-1 rounded-xl text-xs">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 to-blue-600 text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                {userName.charAt(0)}
              </div>
              <div className="text-left leading-tight">
                <p className="text-white font-bold text-[11px] truncate max-w-[80px]">{userName}</p>
                <p className="text-[9px] text-red-400 font-extrabold uppercase tracking-wider">{userRole}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Bar (Bottom Bar) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#080A0E]/95 backdrop-blur-lg border-t border-white/10 p-2 z-50 flex items-center justify-around text-[10px] font-bold">
          <button
            onClick={() => setActiveTab("explore")}
            className={`flex flex-col items-center gap-1 p-1.5 ${
              activeTab === "explore" ? "text-red-500" : "text-gray-400"
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Pulse</span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex flex-col items-center gap-1 p-1.5 ${
              activeTab === "analytics" ? "text-blue-400" : "text-gray-400"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab("live-api")}
            className={`flex flex-col items-center gap-1 p-1.5 ${
              activeTab === "live-api" ? "text-red-500 font-black" : "text-gray-400"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Live APIs</span>
          </button>
          <button
            onClick={() => setActiveTab("streaming")}
            className={`flex flex-col items-center gap-1 p-1.5 ${
              activeTab === "streaming" ? "text-red-500" : "text-gray-400"
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>4K Stream</span>
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`flex flex-col items-center gap-1 p-1.5 ${
              activeTab === "community" ? "text-blue-400" : "text-gray-400"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Forum</span>
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center gap-1 p-1.5 ${
              activeTab === "dashboard" ? "text-blue-400" : "text-gray-400"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Workspace</span>
          </button>
        </div>

      </div>
    </header>
  );
};
