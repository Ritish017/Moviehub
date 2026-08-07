import React, { useState } from "react";
import {
  User,
  Sparkles,
  Bookmark,
  Film,
  Award,
  Settings,
  Star,
  Check,
  Play,
  Loader2,
  List
} from "lucide-react";
import { Movie, UserProfile, UserRole, LanguageType } from "../types";

interface UserDashboardProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  moviesList: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie) => void;
  onRemoveWatchlist: (movieId: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  userProfile,
  setUserProfile,
  moviesList,
  onSelectMovie,
  onOpenTrailer,
  onRemoveWatchlist,
}) => {
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);

  const rolesList: UserRole[] = [
    "Cinephile Fan",
    "Film Critic",
    "Aspiring Director",
    "Actor / Crew Member",
    "Box Office Analyst"
  ];

  const languagesList: LanguageType[] = [
    "Hindi",
    "Telugu",
    "Tamil",
    "Malayalam",
    "Kannada"
  ];

  const watchlistedMovies = moviesList.filter((m) => userProfile.watchlist.includes(m.id));

  const handleFetchAiRecommendations = async () => {
    setIsLoadingRecs(true);
    setRecError(null);
    try {
      const res = await fetch("/api/gemini/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferredLanguages: userProfile.preferredLanguages,
          favoriteGenres: userProfile.favoriteGenres,
          userRole: userProfile.role,
          watchHistory: userProfile.watchHistory.map((w) => w.movieId)
        })
      });
      const data = await res.json();
      if (data.success && data.recommendations) {
        setAiRecommendations(data.recommendations);
      } else {
        setRecError("Failed to fetch AI recommendations.");
      }
    } catch (err: any) {
      setRecError("Could not connect to recommendation engine.");
    } finally {
      setIsLoadingRecs(false);
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    setUserProfile((prev) => ({ ...prev, role: newRole }));
  };

  const toggleLanguage = (lang: LanguageType) => {
    setUserProfile((prev) => {
      const exists = prev.preferredLanguages.includes(lang);
      const updated = exists
        ? prev.preferredLanguages.filter((l) => l !== lang)
        : [...prev.preferredLanguages, lang];
      return { ...prev, preferredLanguages: updated };
    });
  };

  return (
    <div className="space-y-8 my-8 animate-fadeIn">
      
      {/* Profile Header Card */}
      <div className="bg-[#14171E] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-18 h-18 rounded-full object-cover border-2 border-emerald-500 shadow-xl"
          />
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white font-sans">{userProfile.name}</h1>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-mono">
                {userProfile.role}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 font-mono">{userProfile.email} • Member of MovieHub X Ecosystem</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 bg-[#0F1116] p-4 rounded-2xl border border-white/5 text-center w-full md:w-auto font-mono">
          <div>
            <p className="text-xl font-bold text-white">{watchlistedMovies.length}</p>
            <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">Watchlist</p>
          </div>
          <div>
            <p className="text-xl font-bold text-emerald-400">{userProfile.stats.reviewsWritten}</p>
            <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">Reviews</p>
          </div>
          <div>
            <p className="text-xl font-bold text-blue-400">{userProfile.stats.reputationPoints}</p>
            <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">Reputation</p>
          </div>
        </div>
      </div>

      {/* Role & Preferences Configuration Bar */}
      <div className="bg-[#14171E] border border-white/5 p-6 rounded-3xl shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-400" /> Customize Your Industry Profile Persona
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Role Switcher */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2 font-mono">SELECTED INDUSTRY ROLE</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {rolesList.map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-left ${
                    userProfile.role === r
                      ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                      : "bg-[#0F1116] text-gray-400 hover:bg-white/5 border border-white/5"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Languages Selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2 font-mono">PREFERRED LANGUAGES</label>
            <div className="flex flex-wrap gap-2">
              {languagesList.map((lang) => {
                const isSelected = userProfile.preferredLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-[#0F1116] text-gray-400 border border-white/5"
                    }`}
                  >
                    {isSelected ? `✓ ${lang}` : lang}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* AI Personalized Recommendations Module */}
      <div className="bg-[#14171E] border border-white/5 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>AI Personalized Movie Recommendations</span>
            </h2>
            <p className="text-xs text-gray-400">
              Matches your language choices ({userProfile.preferredLanguages.join(", ")}) and persona role ({userProfile.role}).
            </p>
          </div>

          <button
            onClick={handleFetchAiRecommendations}
            disabled={isLoadingRecs}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-lg shadow flex items-center gap-2 cursor-pointer self-start sm:self-auto disabled:opacity-50"
          >
            {isLoadingRecs ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating Recs...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate AI Matches
              </>
            )}
          </button>
        </div>

        {recError && (
          <p className="text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl">{recError}</p>
        )}

        {aiRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiRecommendations.map((rec, idx) => (
              <div key={idx} className="p-4 bg-[#0F1116] border border-white/5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 font-mono">
                    {rec.language}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400 font-mono">
                    {rec.matchPercentage}% AI Match
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white font-sans">{rec.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{rec.reason}</p>

                {rec.keyHighlights && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {rec.keyHighlights.map((hl: string) => (
                      <span key={hl} className="text-[9px] bg-white/5 text-gray-300 px-2 py-0.5 rounded font-mono">
                        • {hl}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#0F1116] rounded-2xl border border-white/5">
            <p className="text-xs text-gray-500 font-mono">Click "Generate AI Matches" above to receive custom Indian film recommendations from Gemini 3.6 Flash.</p>
          </div>
        )}
      </div>

      {/* Saved Watchlist Grid */}
      <div className="bg-[#14171E] border border-white/5 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-emerald-400" /> My Saved Watchlist ({watchlistedMovies.length})
        </h2>

        {watchlistedMovies.length === 0 ? (
          <p className="text-xs text-gray-500 italic">Your watchlist is currently empty. Click the bookmark icon on any movie card to save it here!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {watchlistedMovies.map((movie) => (
              <div key={movie.id} className="p-3 bg-[#0F1116] border border-white/5 rounded-2xl flex gap-3 items-center">
                <img src={movie.posterUrl} alt={movie.title} className="w-10 h-14 object-cover rounded-md" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate font-sans">{movie.title}</h4>
                  <p className="text-[10px] text-gray-500 font-mono">{movie.language} • {movie.releaseYear}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onSelectMovie(movie)}
                      className="text-[10px] font-bold text-emerald-400 hover:underline cursor-pointer font-mono"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onRemoveWatchlist(movie.id)}
                      className="text-[10px] font-bold text-rose-400 hover:underline cursor-pointer font-mono"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
