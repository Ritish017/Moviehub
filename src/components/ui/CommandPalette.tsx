import React, { useState, useEffect } from "react";
import { Search, Film, Sparkles, BarChart3, MessageSquare, X, ArrowRight, Loader2 } from "lucide-react";
import { Movie } from "../../types";
import { motion } from "framer-motion";
import { api } from "../../services/apiClient";
import { useDebounce } from "../../hooks/useDebounce";

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
  const [isSearching, setIsSearching] = useState(false);
  const [apiResults, setApiResults] = useState<Movie[]>([]);
  const debouncedQuery = useDebounce(query, 300);

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

  // Execute live TMDb/OMDb search via API client
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setApiResults([]);
      setIsSearching(false);
      return;
    }

    let isSubscribed = true;
    setIsSearching(true);

    api.search(debouncedQuery.trim())
      .then((res) => {
        if (!isSubscribed) return;
        setIsSearching(false);
        if (res.success && (res.movies?.length > 0 || res.supplementary?.length > 0)) {
          setApiResults([...(res.movies || []), ...(res.supplementary || [])]);
        } else {
          setApiResults([]);
        }
      })
      .catch(() => {
        if (!isSubscribed) return;
        setIsSearching(false);
        setApiResults([]);
      });

    return () => {
      isSubscribed = false;
    };
  }, [debouncedQuery]);

  if (!isOpen) return null;

  const localFiltered = query.trim()
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.director.toLowerCase().includes(query.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  // Combine API results with local fallback matches, deduplicated by id or title
  const combinedMovies = [...apiResults, ...localFiltered].filter(
    (item, index, self) =>
      self.findIndex((t) => t.id === item.id || t.title.toLowerCase() === item.title.toLowerCase()) === index
  );

  const navigationCommands = [
    { id: "explore", label: "Explore Main Catalog", icon: Film, action: () => { onNavigateTab("explore"); onClose(); } },
    { id: "analytics", label: "Box Office Analytics", icon: BarChart3, action: () => { onNavigateTab("analytics"); onClose(); } },
    { id: "community", label: "Community Forum", icon: MessageSquare, action: () => { onNavigateTab("community"); onClose(); } },
    { id: "copilot", label: "Launch CineAI Copilot", icon: Sparkles, action: () => { onOpenAiCopilot(); onClose(); } },
  ].filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));

  const aiExamples = [
    "Best psychological thrillers after 2015",
    "Movies similar to Interstellar",
    "Khaleja Telugu full movie details",
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
        className="w-full max-w-3xl bg-[#121212]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col z-10"
      >
        {/* Search Input */}
        <div className="flex items-center px-6 py-5 border-b border-white/10">
          <Search className="w-6 h-6 text-gray-400 mr-4 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, Khaleja, Pushpa, Nolan, or ask CineAI..."
            className="w-full bg-transparent text-white text-xl placeholder-gray-500 focus:outline-none font-sans"
            autoFocus
          />
          {isSearching && <Loader2 className="w-5 h-5 text-amber-400 animate-spin mr-3 shrink-0" />}
          {query && (
            <button onClick={() => { setQuery(""); setApiResults([]); }} className="p-1 text-gray-500 hover:text-white transition-colors">
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
                      className="text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-purple-500/10 border border-transparent hover:border-purple-500/30 transition-all group cursor-pointer"
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
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all group cursor-pointer"
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
              <div className="px-3 mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Direct Matches ({combinedMovies.length})
                </p>
                {apiResults.length > 0 && (
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">
                    • Live TMDb/OMDb Gateway Connected
                  </span>
                )}
              </div>

              {isSearching && combinedMovies.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                  <p className="text-sm font-medium text-gray-400">Searching TMDb, OMDb & iTunes databases...</p>
                </div>
              ) : combinedMovies.length === 0 ? (
                <div className="py-8 text-center flex flex-col items-center bg-white/5 rounded-2xl p-6 border border-white/5 space-y-3">
                  <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                  <div>
                    <p className="text-base font-bold text-white">No direct TMDb/OMDb matches found for "{query}"</p>
                    <p className="text-xs text-gray-400 mt-1">Press Enter or launch CineAI to search using natural language semantics.</p>
                  </div>
                  <button
                    onClick={() => { onOpenAiCopilot(); onClose(); }}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
                  >
                    Ask CineAI Copilot →
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  {combinedMovies.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => { onSelectMovie(movie); onClose(); }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={movie.posterUrl || "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop"}
                          alt={movie.title}
                          className="w-12 h-16 rounded object-cover shadow-lg border border-white/10 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop";
                          }}
                        />
                        <div>
                          <p className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                            {movie.title}
                          </p>
                          <p className="text-sm text-gray-400">
                            {movie.releaseYear || "2024"} • {movie.director || "Cinema"} • ★ {movie.rating || 8.0}
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
          <span className="font-bold text-gray-300">MovieHub X AI</span>
        </div>
      </motion.div>
    </div>
  );
};
