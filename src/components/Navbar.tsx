import React, { useState, useEffect } from "react";
import { Search, Film, Sparkles, Bell, User } from "lucide-react";
import { LanguageType, Movie, UserRole } from "../types";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../utils/cn";

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
  onOpenAiAssistant,
  onOpenCommandPalette,
}) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Shrink the navbar when scrolled
  const paddingY = useTransform(scrollY, [0, 100], ["1.5rem", "0.75rem"]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      style={{ paddingTop: paddingY, paddingBottom: paddingY }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 transition-all flex justify-center w-full lg:pl-[80px]"
    >
      <motion.div
        className={cn(
          "max-w-5xl w-full flex items-center justify-between px-6 rounded-full transition-all duration-300 border",
          isScrolled 
            ? "bg-black/60 backdrop-blur-2xl shadow-2xl border-white/10" 
            : "bg-transparent border-transparent"
        )}
        style={{ minHeight: "64px" }}
      >
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group shrink-0" 
          onClick={() => setActiveTab("explore")}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-red-900 text-white flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
            <Film className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold text-white font-serif tracking-tight hidden sm:block">
            ReelVerse
          </span>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {[
            { id: "explore", label: "Home" },
            { id: "movies", label: "Movies" },
            { id: "community", label: "Community" },
            { id: "analytics", label: "Analytics" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "relative transition-colors hover:text-white px-2 py-1",
                activeTab === item.id ? "text-white" : "text-gray-400"
              )}
            >
              {item.label}
              {activeTab === item.id && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* AI Search (CTRL+K) */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-all backdrop-blur-md group"
          >
            <Search className="w-3.5 h-3.5 group-hover:text-white" />
            <span>Search</span>
            <kbd className="hidden lg:inline-block ml-2 px-1.5 py-0.5 rounded bg-black/50 border border-white/10 font-mono text-[10px] text-gray-500">
              ⌘K
            </kbd>
          </button>

          {/* AI Copilot Button */}
          <button
            onClick={onOpenAiAssistant}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 hover:from-purple-800/60 hover:to-pink-800/60 border border-purple-500/30 flex items-center justify-center text-purple-300 hover:text-white hover:scale-105 transition-all shadow-lg shadow-purple-900/20"
            title="CineAI Copilot"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all backdrop-blur-md relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>

          {/* Profile */}
          <button className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden hover:scale-105 transition-all ml-1">
            <User className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
};
