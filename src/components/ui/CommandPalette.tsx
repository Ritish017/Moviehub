import React, { useState, useEffect } from "react";
import { Search, Film, Sparkles, BarChart3, Tv, MessageSquare, User, X, ArrowRight, Play } from "lucide-react";
import { Movie } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredMovies = query.trim()
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.director.toLowerCase().includes(query.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const navigationCommands = [
    { id: "explore", label: "Explore Main Catalog", icon: Film, action: () => { onNavigateTab("explore"); onClose(); } },
    { id: "analytics", label: "Box Office Analytics", icon: BarChart3, action: () => { onNavigateTab("analytics"); onClose(); } },
    { id: "community", label: "Community Forum", icon: MessageSquare, action: () => { onNavigateTab("community"); onClose(); } },
    { id: "copilot", label: "Launch CineAI Copilot", icon: Sparkles, action: () => { onOpenAiCopilot(); onClose(); } },
  ].filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));

  const aiExamples = [
    "Best psychological thrillers after 2015",
    "Movies similar to Interstellar",
    "Best Nolan movies",
    "Movies where hero becomes villain"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-3xl bg-[#121212]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col"
      >
        {/* Search Input */}
        <div className="flex items-center px-6 py-5 border-b border-white/10">
          <Search className="w-6 h-6 text-gray-400 mr-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, people, or ask CineAI..."
            className="w-full bg-transparent text-white text-xl placeholder-gray-500 focus:outline-none font-sans"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6 scrollbar-none">
          
          {/* Default State: AI Examples + Shortcuts */}
          {!query.trim() && (
            <div className="space-y-6">
              {/* AI Natural Language */}
              <div>
                <p className="px-3 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> AI Semantic Search
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {aiExamples.map((ex, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(ex)}
                      className="text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-purple-500/10 border border-transparent hover:border-purple-500/30 transition-all group"
                    >
                      <p className="text-sm font-medium text-gray-300 group-hover:text-purple-300 transition-colors">
                        "{ex}"
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shortcuts */}
              <div>
                <p className="px-3 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Quick Actions
                </p>
                <div className="space-y-1">
                  {navigationCommands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all group"
                    >
                      <cmd.icon className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                      <span className="font-semibold">{cmd.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.trim() && (
            <div>
              <p className="px-3 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Movies ({filteredMovies.length})
              </p>
              {filteredMovies.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <Sparkles className="w-10 h-10 text-purple-500 mb-4 animate-pulse" />
                  <p className="text-lg font-bold text-white mb-2">Ask CineAI</p>
                  <p className="text-sm text-gray-400">Press Enter to search for "{query}" using semantic AI</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredMovies.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => { onSelectMovie(movie); onClose(); }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="w-12 h-16 rounded object-cover shadow-lg border border-white/10"
                        />
                        <div>
                          <p className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                            {movie.title}
                          </p>
                          <p className="text-sm text-gray-400">
                            {movie.releaseYear} • {movie.director} • ★ {movie.rating}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-black/50 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><kbd className="font-mono bg-white/10 px-1.5 rounded">↑↓</kbd> Navigate</span>
            <span className="flex items-center gap-1"><kbd className="font-mono bg-white/10 px-1.5 rounded">↵</kbd> Select</span>
            <span className="flex items-center gap-1"><kbd className="font-mono bg-white/10 px-1.5 rounded">Esc</kbd> Close</span>
          </div>
          <span className="font-bold">ReelVerse AI</span>
        </div>
      </motion.div>
    </div>
  );
};
