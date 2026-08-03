import React from "react";
import {
  Home,
  Film,
  Tv,
  Users,
  Layers,
  Award,
  Bookmark,
  Clock,
  Settings,
  Sparkles
} from "lucide-react";

interface LeftSidebarProps {
  activeTab: string;
  onNavigate: (tab: "explore" | "analytics" | "streaming" | "community" | "dashboard" | "live-api") => void;
  onOpenAiCopilot: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeTab, onNavigate, onOpenAiCopilot }) => {
  const navItems = [
    { id: "explore", label: "Home", icon: Home },
    { id: "explore", label: "Movies", icon: Film },
    { id: "streaming", label: "TV Shows", icon: Tv },
    { id: "community", label: "People", icon: Users },
    { id: "explore", label: "Collections", icon: Layers },
    { id: "analytics", label: "Awards", icon: Award },
    { id: "dashboard", label: "Watchlist", icon: Bookmark },
    { id: "dashboard", label: "History", icon: Clock },
    { id: "dashboard", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col items-center w-16 py-6 bg-[#07080c] border-r border-white/10 shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-30 space-y-6">
      {/* Top Shortcuts */}
      <div className="flex flex-col items-center space-y-4 w-full px-2">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = (item.id === "explore" && activeTab === "explore" && idx === 0) || (item.id === activeTab && idx > 0);
          return (
            <button
              key={`${item.label}-${idx}`}
              onClick={() => onNavigate(item.id as any)}
              className={`group relative p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? "bg-[#e50914] text-white shadow-lg shadow-red-600/40"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4" />

              {/* Hover Tooltip */}
              <span className="absolute left-14 px-2.5 py-1 bg-[#12141d] text-white text-[11px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl whitespace-nowrap z-50 border border-white/10">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating AI Copilot Icon */}
      <div className="mt-auto pt-4 border-t border-white/10 w-full px-2 flex justify-center">
        <button
          onClick={onOpenAiCopilot}
          className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/50 hover:scale-110 transition-transform cursor-pointer group relative"
          title="Ask CineAI Copilot"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="absolute left-14 px-2.5 py-1 bg-[#12141d] text-purple-300 text-[11px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl whitespace-nowrap z-50 border border-purple-500/30">
            CineAI Copilot
          </span>
        </button>
      </div>
    </aside>
  );
};
