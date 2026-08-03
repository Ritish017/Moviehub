import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { MovieGrid } from "./components/MovieGrid";
import { MovieDetailModal } from "./components/MovieDetailModal";
import { BoxOfficeAnalyticsDashboard } from "./components/BoxOfficeAnalyticsDashboard";
import { CommunityForum } from "./components/CommunityForum";
import { UserDashboard } from "./components/UserDashboard";
import { LiveApiDataExplorer } from "./components/LiveApiDataExplorer";
import { AiCinemaAssistantModal } from "./components/AiCinemaAssistantModal";
import { HdStreamPlayerModal } from "./components/HdStreamPlayerModal";
import { INDIAN_MOVIES_DATABASE } from "./data/indianMovies";
import { Movie, VideoClip, UserProfile, LanguageType } from "./types";
import { Film, Tv, BarChart3, Sparkles, Play, ShieldAlert, Heart } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "explore" | "analytics" | "streaming" | "community" | "dashboard" | "live-api"
  >("explore");

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals & Active View state
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [streamingMovie, setStreamingMovie] = useState<Movie | null>(null);
  const [streamingClip, setStreamingClip] = useState<VideoClip | undefined>(undefined);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

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
    <div className="min-h-screen bg-[#0a0b10] text-gray-100 flex flex-col font-sans selection:bg-[#e50914] selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        moviesList={INDIAN_MOVIES_DATABASE}
        onSelectMovie={setSelectedMovie}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        userRole={userProfile.role}
        userName={userProfile.name}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* TAB 1: EXPLORE MOVIES */}
        {activeTab === "explore" && (
          <div>
            {!searchQuery && (
              <HeroBanner
                movie={heroMovie}
                onSelectMovie={setSelectedMovie}
                onOpenTrailer={handleOpenTrailer}
              />
            )}

            <LiveApiDataExplorer
              onSelectMovie={setSelectedMovie}
              onOpenTrailer={handleOpenTrailer}
            />

            <MovieGrid
              movies={INDIAN_MOVIES_DATABASE}
              onSelectMovie={setSelectedMovie}
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
            onSelectMovie={setSelectedMovie}
            onOpenTrailer={handleOpenTrailer}
          />
        )}

        {/* TAB 2: BOX OFFICE TELEMETRY */}
        {activeTab === "analytics" && (
          <BoxOfficeAnalyticsDashboard />
        )}

        {/* TAB 3: HD STREAMING SHOWCASE */}
        {activeTab === "streaming" && (
          <div className="space-y-8 my-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-[#12141d] border border-purple-500/30 p-6 sm:p-10 rounded-3xl shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                HD Footage & Song Studio
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-serif mt-2">
                High-Definition Indian Cinema Footage Player
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl">
                Experience official 1080p / 4K trailers, lyrical video songs, behind the scenes, and director commentary clips across all major Indian film industries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INDIAN_MOVIES_DATABASE.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-[#12141d] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all shadow-xl group"
                >
                  <div className="relative aspect-video w-full bg-black overflow-hidden cursor-pointer" onClick={() => handleOpenTrailer(movie)}>
                    <img src={movie.backdropUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-amber-300 backdrop-blur-md">
                      {movie.language}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-bold text-white font-serif">{movie.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{movie.videoClips.length} HD Videos Available</p>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-bold">₹{movie.boxOfficeGrossCrores} Cr WW</span>
                      <button
                        onClick={() => handleOpenTrailer(movie)}
                        className="font-bold text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Tv className="w-3.5 h-3.5" /> Play Footage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COMMUNITY FORUM */}
        {activeTab === "community" && (
          <CommunityForum
            userRole={userProfile.role}
            userName={userProfile.name}
          />
        )}

        {/* TAB 5: MY DASHBOARD */}
        {activeTab === "dashboard" && (
          <UserDashboard
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            moviesList={INDIAN_MOVIES_DATABASE}
            onSelectMovie={setSelectedMovie}
            onOpenTrailer={handleOpenTrailer}
            onRemoveWatchlist={handleToggleWatchlist}
          />
        )}

      </main>

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

      {/* Footer */}
      <footer className="bg-[#07080d] border-t border-white/10 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#e50914] text-white flex items-center justify-center font-bold text-sm">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white font-serif">
                CINE<span className="text-[#e5b842]">BHARAT</span>
              </p>
              <p className="text-[11px] text-gray-400">Pan-Indian Film Industry Ecosystem & Analytics Platform</p>
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
            Powered by Gemini 3.6 Flash Server Intelligence
          </p>
        </div>
      </footer>

    </div>
  );
}
