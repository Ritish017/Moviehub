import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { LeftSidebar } from "../../components/LeftSidebar";
import { FeatureFooterBar } from "../../components/FeatureFooterBar";
import { AmbientBackground } from "../../components/ui/AmbientBackground";
import { LiveMarketTickerBar } from "../../components/ui/LiveMarketTickerBar";
import { CommandPalette } from "../../components/ui/CommandPalette";
import { HdStreamPlayerModal } from "../../components/HdStreamPlayerModal";
import { AiCopilotDrawer } from "../../features/ai/AiCopilotDrawer";
import { useAppStore } from "../../store/useAppStore";
import { useUserStore } from "../../store/useUserStore";
import { useMovieStore } from "../../store/useMovieStore";
import type { TabType } from "../../types";
import { INDIAN_MOVIES_DATABASE } from "../../data/indianMovies";

interface AppLayoutProps {
  children: React.ReactNode;
}

const TAB_TO_PATH: Record<TabType, string> = {
  "explore": "/",
  "analytics": "/analytics",
  "streaming": "/trailers",
  "community": "/community",
  "dashboard": "/dashboard",
  "live-api": "/live-api",
};

const PATH_TO_TAB: Record<string, TabType> = {
  "/": "explore",
  "/analytics": "analytics",
  "/trailers": "streaming",
  "/community": "community",
  "/dashboard": "dashboard",
  "/live-api": "live-api",
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAiCopilotOpen = useAppStore((s) => s.isAiCopilotOpen);
  const closeAiCopilot = useAppStore((s) => s.closeAiCopilot);
  const openAiCopilot = useAppStore((s) => s.openAiCopilot);
  const isCommandPaletteOpen = useAppStore((s) => s.isCommandPaletteOpen);
  const closeCommandPalette = useAppStore((s) => s.closeCommandPalette);
  const openCommandPalette = useAppStore((s) => s.openCommandPalette);

  const streamingContext = useMovieStore((s) => s.streamingContext);
  const closeStreaming = useMovieStore((s) => s.closeStreaming);
  const viewingMovie = useMovieStore((s) => s.viewingMovie);
  const heroMovie = INDIAN_MOVIES_DATABASE[0];
  const userProfile = useUserStore((s) => s.userProfile);

  const activeTab: TabType = PATH_TO_TAB[location.pathname] ?? "explore";

  const handleNavigate = (tab: TabType) => {
    navigate(TAB_TO_PATH[tab] ?? "/");
  };

  const handleSelectMovie = (movie: typeof INDIAN_MOVIES_DATABASE[0]) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-gray-100 flex flex-col font-sans selection:bg-[#e50914] selection:text-white relative overflow-x-hidden">
      {/* Ambient aura background */}
      <AmbientBackground
        backdropUrl={(viewingMovie || heroMovie)?.backdropUrl}
      />

      {/* Live box office ticker */}
      <LiveMarketTickerBar />

      {/* Top navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        selectedLanguage={userProfile.preferredLanguages[0] ?? "All"}
        setSelectedLanguage={() => {}}
        searchQuery=""
        setSearchQuery={(q) => {
          if (q.trim()) navigate(`/search?q=${encodeURIComponent(q)}`);
        }}
        moviesList={INDIAN_MOVIES_DATABASE}
        onSelectMovie={handleSelectMovie}
        onOpenAiAssistant={openAiCopilot}
        onOpenCommandPalette={openCommandPalette}
        userRole={userProfile.role}
        userName={userProfile.name}
      />

      {/* Main body */}
      <div className="flex-1 flex w-full relative z-10">
        <LeftSidebar
          activeTab={activeTab}
          onNavigate={handleNavigate}
          onOpenAiCopilot={openAiCopilot}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 min-w-0">
          {children}
        </main>
      </div>

      {/* Footer */}
      <FeatureFooterBar />

      {/* Global Modals */}
      <HdStreamPlayerModal
        movie={streamingContext?.movie ?? null}
        initialClip={streamingContext?.clip}
        onClose={closeStreaming}
      />

      <AiCopilotDrawer />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={closeCommandPalette}
        movies={INDIAN_MOVIES_DATABASE}
        onSelectMovie={handleSelectMovie}
        onNavigateTab={handleNavigate}
        onOpenAiCopilot={openAiCopilot}
      />
    </div>
  );
};
