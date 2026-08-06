import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile, UserRole, LanguageType } from "../types";

const DEFAULT_PROFILE: UserProfile = {
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
    { movieId: "pushpa-2-the-rule", watchedAt: "2024-12-06", userRating: 10 },
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
      createdAt: "2024-01-01",
    },
  ],
  stats: {
    moviesWatched: 184,
    reviewsWritten: 12,
    forumPosts: 28,
    reputationPoints: 1450,
  },
};

interface UserStore {
  userProfile: UserProfile;
  toggleWatchlist: (movieId: string) => void;
  toggleFavorite: (movieId: string) => void;
  addToWatchHistory: (movieId: string, rating?: number) => void;
  updateRole: (role: UserRole) => void;
  updatePreferredLanguages: (languages: LanguageType[]) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userProfile: DEFAULT_PROFILE,

      toggleWatchlist: (movieId) =>
        set((state) => {
          const exists = state.userProfile.watchlist.includes(movieId);
          return {
            userProfile: {
              ...state.userProfile,
              watchlist: exists
                ? state.userProfile.watchlist.filter((id) => id !== movieId)
                : [...state.userProfile.watchlist, movieId],
            },
          };
        }),

      toggleFavorite: (movieId) =>
        set((state) => {
          const exists = state.userProfile.favorites.includes(movieId);
          return {
            userProfile: {
              ...state.userProfile,
              favorites: exists
                ? state.userProfile.favorites.filter((id) => id !== movieId)
                : [...state.userProfile.favorites, movieId],
            },
          };
        }),

      addToWatchHistory: (movieId, rating) =>
        set((state) => {
          const existing = state.userProfile.watchHistory.find(
            (e) => e.movieId === movieId
          );
          const updated = existing
            ? state.userProfile.watchHistory.map((e) =>
                e.movieId === movieId ? { ...e, userRating: rating, watchedAt: new Date().toISOString() } : e
              )
            : [
                ...state.userProfile.watchHistory,
                { movieId, watchedAt: new Date().toISOString(), userRating: rating },
              ];
          return {
            userProfile: {
              ...state.userProfile,
              watchHistory: updated,
              stats: {
                ...state.userProfile.stats,
                moviesWatched: existing
                  ? state.userProfile.stats.moviesWatched
                  : state.userProfile.stats.moviesWatched + 1,
              },
            },
          };
        }),

      updateRole: (role) =>
        set((state) => ({
          userProfile: { ...state.userProfile, role },
        })),

      updatePreferredLanguages: (languages) =>
        set((state) => ({
          userProfile: { ...state.userProfile, preferredLanguages: languages },
        })),

      updateProfile: (updates) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...updates },
        })),
    }),
    {
      name: "moviehub-user-store",
      partialize: (state) => ({
        userProfile: {
          watchlist: state.userProfile.watchlist,
          favorites: state.userProfile.favorites,
          watchHistory: state.userProfile.watchHistory,
          role: state.userProfile.role,
          preferredLanguages: state.userProfile.preferredLanguages,
          favoriteGenres: state.userProfile.favoriteGenres,
        },
      }),
    }
  )
);
