import React, { useState } from "react";
import {
  Home, Film, Tv, Users, Layers, Award, Bookmark, Clock, Settings, Sparkles, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";

interface LeftSidebarProps {
  activeTab: string;
  onNavigate: (tab: "explore" | "analytics" | "streaming" | "community" | "dashboard" | "live-api") => void;
  onOpenAiCopilot: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeTab, onNavigate, onOpenAiCopilot }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { id: "explore", label: "Home", icon: Home },
    { id: "explore", label: "Movies", icon: Film },
    { id: "streaming", label: "TV Shows", icon: Tv },
    { id: "community", label: "People", icon: Users },
    { id: "explore", label: "Collections", icon: Layers },
    { id: "analytics", label: "Awards", icon: Award },
    { id: "dashboard", label: "Watchlist", icon: Bookmark },
    { id: "dashboard", label: "History", icon: Clock },
  ];

  return (
    <motion.aside
      initial={{ width: 80 }}
      animate={{ width: isExpanded ? 240 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="hidden lg:flex flex-col items-start py-8 bg-black/40 backdrop-blur-2xl border-r border-white/10 shrink-0 fixed left-0 top-0 h-screen z-50 shadow-2xl"
    >
      {/* Logo Area */}
      <div className="flex items-center w-full px-6 mb-8 h-10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20">
          <Film className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-4 font-serif font-black text-xl tracking-tight text-white"
            >
              MovieHub X
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col space-y-2 w-full px-4 flex-1">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = (item.id === "explore" && activeTab === "explore" && idx === 0) || (item.id === activeTab && idx > 0);
          
          return (
            <button
              key={`${item.label}-${idx}`}
              onClick={() => onNavigate(item.id as any)}
              className={cn(
                "group relative flex items-center p-3 rounded-2xl transition-all cursor-pointer w-full overflow-hidden",
                isActive 
                  ? "bg-white/10 text-white shadow-inner" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div layoutId="active-nav-indicator" className="absolute left-0 w-1 h-1/2 bg-red-500 rounded-r-full" />
              )}
              <div className="w-6 h-6 flex items-center justify-center shrink-0 ml-1">
                <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "text-red-500")} />
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-4 font-semibold text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="w-full px-4 pb-4 space-y-2">
        <button
          onClick={() => onNavigate("dashboard")}
          className="group relative flex items-center p-3 rounded-2xl transition-all cursor-pointer w-full overflow-hidden text-gray-400 hover:text-white hover:bg-white/5"
        >
          <div className="w-6 h-6 flex items-center justify-center shrink-0 ml-1">
            <Settings className="w-5 h-5 transition-transform group-hover:rotate-45" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-4 font-semibold text-sm whitespace-nowrap"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={onOpenAiCopilot}
          className="group relative flex items-center p-3 rounded-2xl transition-all cursor-pointer w-full overflow-hidden bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/20 hover:border-purple-500/50"
        >
          <div className="w-6 h-6 flex items-center justify-center shrink-0 ml-1">
            <Sparkles className="w-5 h-5 text-purple-400 group-hover:animate-spin" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-4 font-bold text-sm text-purple-100 whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200"
              >
                AI Copilot
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};
