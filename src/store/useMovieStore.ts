import { create } from "zustand";
import type { Movie, VideoClip, LanguageType } from "../types";
import { INDIAN_MOVIES_DATABASE } from "../data/indianMovies";

interface StreamingContext {
  movie: Movie;
  clip?: VideoClip;
}

interface MovieStore {
  // Data
  movies: Movie[];
  trendingMovies: Movie[];
  searchResults: Movie[];
  selectedLanguage: LanguageType;

  // UI state
  viewingMovie: Movie | null;
  streamingContext: StreamingContext | null;

  // Actions
  setMovies: (movies: Movie[]) => void;
  setTrendingMovies: (movies: Movie[]) => void;
  setSearchResults: (movies: Movie[]) => void;
  setSelectedLanguage: (lang: LanguageType) => void;
  setViewingMovie: (movie: Movie | null) => void;
  openStreaming: (movie: Movie, clip?: VideoClip) => void;
  closeStreaming: () => void;
  getMovieById: (id: string) => Movie | undefined;
}

export const useMovieStore = create<MovieStore>((set, get) => ({
  movies: INDIAN_MOVIES_DATABASE,
  trendingMovies: [],
  searchResults: [],
  selectedLanguage: "All",
  viewingMovie: null,
  streamingContext: null,

  setMovies: (movies) => set({ movies }),
  setTrendingMovies: (movies) => set({ trendingMovies: movies }),
  setSearchResults: (movies) => set({ searchResults: movies }),
  setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),
  setViewingMovie: (movie) => set({ viewingMovie: movie }),

  openStreaming: (movie, clip) => set({ streamingContext: { movie, clip } }),
  closeStreaming: () => set({ streamingContext: null }),

  getMovieById: (id) => {
    const { movies } = get();
    return movies.find((m) => m.id === id);
  },
}));
