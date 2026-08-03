import React, { useState, useEffect } from "react";
import { Search, Film, Sparkles, BarChart3, Tv, MessageSquare, User, Clapperboard, X, ArrowRight } from "lucide-react";
import { Movie } from "../../types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onNavigateTab: (tab: "explore" | "analytics" | "streaming" | "community" | "dashboard" | "live-api") => void;
  onOpenAiCopilot: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  movies,
  onSelectMovie,
  onNavigateTab,
  onOpenAiCopilot,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Close on Escape & handle global Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from parent or global state
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter items
  const filteredMovies = query.trim()
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.director.toLowerCase().includes(query.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()))
      )
    : movies.slice(0, 5);

  const navigationCommands = [
    { id: "explore", label: "Explore Main Catalog", icon: Film, action: () => { onNavigateTab("explore"); onClose(); } },
    { id: "analytics", label: "Box Office Telemetry & ROI Charts", icon: BarChart3, action: () => { onNavigateTab("analytics"); onClose(); } },
    { id: "streaming", label: "HD Footage & Video Studio", icon: Tv, action: () => { onNavigateTab("streaming"); onClose(); } },
    { id: "community", label: "Cinephile Community Forum", icon: MessageSquare, action: () => { onNavigateTab("community"); onClose(); } },
    { id: "dashboard", label: "My Profile & Watchlist Portal", icon: User, action: () => { onNavigateTab("dashboard"); onClose(); } },
    { id: "copilot", label: "Launch CineAI Copilot Assistant", icon: Sparkles, action: () => { onOpenAiCopilot(); onClose(); } },
  ].filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-xl animate-fadeIn">
      {/* Container */}
      <div 
        className="w-full max-w-2xl bg-[#11131c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#0d0e15]">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Search movies, directors, genres, or launch CineAI..."
            className="w-full bg-transparent text-white text-base placeholder-gray-400 focus:outline-none font-sans"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 divide-y divide-white/5">
          {/* Quick Actions */}
          {navigationCommands.length > 0 && (
            <div>
              <p className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                Platform Shortcuts
              </p>
              <div className="space-y-1">
                {navigationCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm text-gray-200 hover:bg-gradient-to-r hover:from-purple-950/40 hover:to-transparent hover:text-white transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white/5 text-amber-400 group-hover:bg-amber-400/20 group-hover:text-amber-300 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{cmd.label}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Movies Section */}
          <div>
            <p className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-gray-400 uppercase mt-2">
              Movies & Feature Titles ({filteredMovies.length})
            </p>
            {filteredMovies.length === 0 ? (
              <p className="px-3 py-4 text-xs text-gray-500 text-center">No movies matching "{query}"</p>
            ) : (
              <div className="space-y-1">
                {filteredMovies.map((movie) => (
                  <button
                    key={movie.id}
                    onClick={() => { onSelectMovie(movie); onClose(); }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-9 h-12 rounded object-cover shadow border border-white/10 shrink-0"
                      />
                      <div className="truncate">
                        <p className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {movie.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {movie.releaseYear} • {movie.director} • <span className="text-amber-400 font-semibold">★ {movie.rating}</span>
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-gray-300 group-hover:bg-amber-400/20 group-hover:text-amber-300 shrink-0">
                      ₹{movie.boxOfficeGrossCrores} Cr
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#090a0f] border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-300 font-mono">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-300 font-mono">Enter</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-300 font-mono">Esc</kbd> Close</span>
          </div>
          <span className="text-amber-400 font-bold">MovieHub X OS</span>
        </div>
      </div>
    </div>
  );
};
