import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { LeftSidebar } from "./components/LeftSidebar";
import { FeatureFooterBar } from "./components/FeatureFooterBar";
import { HeroBanner } from "./components/HeroBanner";
import { MovieGrid } from "./components/MovieGrid";
import { MovieDetailModal } from "./components/MovieDetailModal";
import { BoxOfficeAnalyticsDashboard } from "./components/BoxOfficeAnalyticsDashboard";
import { CommunityForum } from "./components/CommunityForum";
import { UserDashboard } from "./components/UserDashboard";
import { LiveApiDataExplorer } from "./components/LiveApiDataExplorer";
import { AiCinemaAssistantModal } from "./components/AiCinemaAssistantModal";
import { HdStreamPlayerModal } from "./components/HdStreamPlayerModal";
import { AmbientBackground } from "./components/ui/AmbientBackground";
import { CommandPalette } from "./components/ui/CommandPalette";
import { DedicatedMovieView } from "./features/movies/DedicatedMovieView";
import { TrailerHubView } from "./features/trailers/TrailerHubView";
import { SearchEngine } from "./features/search/SearchEngine";
import { INDIAN_MOVIES_DATABASE } from "./data/indianMovies";
import { Movie, VideoClip, UserProfile, LanguageType } from "./types";
import { Film, Tv, BarChart3, Sparkles, Play, ShieldAlert, Heart } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "explore" | "analytics" | "streaming" | "community" | "dashboard" | "live-api"
  >("explore");

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals, Full Page & Active View state
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [viewingMovie, setViewingMovie] = useState<Movie | null>(null);
  const [streamingMovie, setStreamingMovie] = useState<Movie | null>(null);
  const [streamingClip, setStreamingClip] = useState<VideoClip | undefined>(undefined);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // User Profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "usr-777",
    name: "Ritish Kurmari",
    email: "kurmaritish777@gmail.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
    role: "Cinephile Fan",
    bio: "Passionate Indian cinema enthusiast tracking Pan-Indian box office trends, cinematography & screenplay crafts.",
    preferredLanguages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
    favoriteGenres: ["Action", "Sci-Fi", "Folklore", "Thriller"],
    favoriteActors: ["Prabhas", "Allu Arjun", "Shah Rukh Khan", "Fahadh Faasil"],
    watchHistory: [
      { movieId: "kalki-2898-ad", watchedAt: "2024-06-28", userRating: 10 },
      { movieId: "pushpa-2-the-rule", watchedAt: "2024-12-06", userRating: 10 }
    ],
    watchlist: ["rrr", "manjummel-boys", "kantara"],
    favorites: ["kalki-2898-ad", "rrr"],
    customLists: [
      {
        id: "list-1",
        title: "1000 Crore Pan-Indian Titans",
        description: "Milestone films that redefined Indian cinema worldwide",
        movieIds: ["kalki-2898-ad", "rrr", "pushpa-2-the-rule", "jawan"],
        isPublic: true,
        createdAt: "2024-01-01"
      }
    ],
    stats: {
      moviesWatched: 184,
      reviewsWritten: 12,
      forumPosts: 28,
      reputationPoints: 1450
    }
  });

  const handleToggleWatchlist = (movieId: string) => {
    setUserProfile((prev) => {
      const exists = prev.watchlist.includes(movieId);
      const updated = exists
        ? prev.watchlist.filter((id) => id !== movieId)
        : [...prev.watchlist, movieId];
      return { ...prev, watchlist: updated };
    });
  };

  const handleOpenTrailer = (movie: Movie, clip?: VideoClip) => {
    setStreamingMovie(movie);
    setStreamingClip(clip);
  };

  const heroMovie = INDIAN_MOVIES_DATABASE[0]; // Kalki 2898 AD

  return (
    <div className="min-h-screen bg-[#07080c] text-gray-100 flex flex-col font-sans selection:bg-[#e50914] selection:text-white relative overflow-x-hidden">
      
      {/* Ambient Poster Aura Background */}
      <AmbientBackground backdropUrl={(viewingMovie || selectedMovie || heroMovie)?.backdropUrl} />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => { setViewingMovie(null); setActiveTab(tab); }}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        moviesList={INDIAN_MOVIES_DATABASE}
        onSelectMovie={(movie) => setViewingMovie(movie)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        userRole={userProfile.role}
        userName={userProfile.name}
      />

      {/* Main Body Shell: Left Icon Rail Sidebar + Main View Content */}
      <div className="flex-1 flex w-full relative z-10">
        <LeftSidebar
          activeTab={activeTab}
          onNavigate={(tab) => { setViewingMovie(null); setActiveTab(tab); }}
          onOpenAiCopilot={() => setIsAiAssistantOpen(true)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 min-w-0">
          {viewingMovie ? (
            <DedicatedMovieView
              movie={viewingMovie}
              onBack={() => setViewingMovie(null)}
              onOpenTrailer={handleOpenTrailer}
              isWatchlisted={userProfile.watchlist.includes(viewingMovie.id)}
              onToggleWatchlist={handleToggleWatchlist}
            />
          ) : (
            <>
              {searchQuery ? (
                <div className="my-8">
                  <SearchEngine
                    movies={INDIAN_MOVIES_DATABASE}
                    onSelectMovie={(movie) => setViewingMovie(movie)}
                  />
                </div>
              ) : (
                <>
                  {/* TAB 1: EXPLORE MOVIES */}
                  {activeTab === "explore" && (
                    <div>
                      <HeroBanner
                        movie={heroMovie}
                        onSelectMovie={(movie) => setViewingMovie(movie)}
                        onOpenTrailer={handleOpenTrailer}
                        isWatchlisted={userProfile.watchlist.includes(heroMovie.id)}
                        onToggleWatchlist={handleToggleWatchlist}
                      />

                      <LiveApiDataExplorer
                        onSelectMovie={(movie) => setViewingMovie(movie)}
                        onOpenTrailer={handleOpenTrailer}
                      />

                      <MovieGrid
                        movies={INDIAN_MOVIES_DATABASE}
                        onSelectMovie={(movie) => setViewingMovie(movie)}
                        onOpenTrailer={handleOpenTrailer}
                        watchlist={userProfile.watchlist}
                        onToggleWatchlist={handleToggleWatchlist}
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                      />
                    </div>
                  )}

                  {/* TAB 2: LIVE FREE API ENGINE */}
                  {activeTab === "live-api" && (
                    <LiveApiDataExplorer
                      onSelectMovie={(movie) => setViewingMovie(movie)}
                      onOpenTrailer={handleOpenTrailer}
                    />
                  )}

                  {/* TAB 3: BOX OFFICE TELEMETRY */}
                  {activeTab === "analytics" && (
                    <BoxOfficeAnalyticsDashboard />
                  )}

                  {/* TAB 4: HD STREAMING & TRAILER HUB */}
                  {activeTab === "streaming" && (
                    <TrailerHubView
                      movies={INDIAN_MOVIES_DATABASE}
                      onOpenTrailer={handleOpenTrailer}
                    />
                  )}

                  {/* TAB 5: COMMUNITY FORUM */}
                  {activeTab === "community" && (
                    <CommunityForum
                      userRole={userProfile.role}
                      userName={userProfile.name}
                    />
                  )}

                  {/* TAB 6: MY WORKSPACE & DASHBOARD */}
                  {activeTab === "dashboard" && (
                    <UserDashboard
                      userProfile={userProfile}
                      setUserProfile={setUserProfile}
                      moviesList={INDIAN_MOVIES_DATABASE}
                      onSelectMovie={(movie) => setViewingMovie(movie)}
                      onOpenTrailer={handleOpenTrailer}
                      onRemoveWatchlist={handleToggleWatchlist}
                    />
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>

      {/* Bottom Feature Pillars Bar */}
      <FeatureFooterBar />

      {/* Global Modals */}
      <MovieDetailModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onOpenTrailer={handleOpenTrailer}
        isWatchlisted={selectedMovie ? userProfile.watchlist.includes(selectedMovie.id) : false}
        onToggleWatchlist={handleToggleWatchlist}
        userRole={userProfile.role}
        userName={userProfile.name}
      />

      <HdStreamPlayerModal
        movie={streamingMovie}
        initialClip={streamingClip}
        onClose={() => setStreamingMovie(null)}
      />

      <AiCinemaAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        userRole={userProfile.role}
        userName={userProfile.name}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        movies={INDIAN_MOVIES_DATABASE}
        onSelectMovie={(movie) => { setViewingMovie(movie); }}
        onNavigateTab={(tab) => { setViewingMovie(null); setActiveTab(tab); }}
        onOpenAiCopilot={() => setIsAiAssistantOpen(true)}
      />

      {/* Footer */}
      <footer className="bg-[#050609] border-t border-white/10 py-10 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#e50914] text-white flex items-center justify-center font-bold text-sm">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white font-serif">
                MOVIEHUB <span className="text-amber-400">X</span>
              </p>
              <p className="text-[11px] text-gray-400">The AI Operating System for Global Cinema</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            <span>Bollywood (Hindi)</span>
            <span>•</span>
            <span>Tollywood (Telugu)</span>
            <span>•</span>
            <span>Kollywood (Tamil)</span>
            <span>•</span>
            <span>Mollywood (Malayalam)</span>
            <span>•</span>
            <span>Sandalwood (Kannada)</span>
          </div>

          <p className="text-xs text-gray-500">
            Powered by Gemini 3.6 Flash & Live Public Cinema APIs
          </p>
        </div>
      </footer>

    </div>
  );
}
