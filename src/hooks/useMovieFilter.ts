import { useMemo } from "react";
import type { Movie, LanguageType, BoxOfficeStatusType } from "../types";

export type SortKey = "rating" | "gross" | "roi" | "year";

export interface MovieFilterOptions {
  selectedLanguage: LanguageType;
  selectedGenre: string;
  selectedStatus: string;
  sortBy: SortKey;
  searchQuery?: string;
}

/**
 * Single source of truth for movie filtering and sorting logic.
 * Replaces duplicate implementations in MovieGrid, CommandPalette,
 * SearchEngine, IndianCinemaRail, and Navbar.
 */
export function useMovieFilter(
  movies: Movie[],
  options: MovieFilterOptions
): Movie[] {
  const { selectedLanguage, selectedGenre, selectedStatus, sortBy, searchQuery } = options;

  return useMemo(() => {
    return movies
      .filter((m) => {
        // Language filter
        if (
          selectedLanguage !== "All" &&
          m.language !== selectedLanguage &&
          !(selectedLanguage === "Pan-India" && m.tags?.includes("Pan-India"))
        ) {
          return false;
        }
        // Genre filter
        if (selectedGenre !== "All" && !m.genres.includes(selectedGenre)) {
          return false;
        }
        // Status filter
        if (selectedStatus !== "All" && m.boxOfficeStatus !== selectedStatus) {
          return false;
        }
        // Text search
        if (searchQuery?.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            m.title.toLowerCase().includes(q) ||
            m.director.toLowerCase().includes(q) ||
            m.language.toLowerCase().includes(q) ||
            m.genres.some((g) => g.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "rating": return b.rating - a.rating;
          case "gross":  return b.boxOfficeGrossCrores - a.boxOfficeGrossCrores;
          case "roi":    return b.roiPercentage - a.roiPercentage;
          case "year":   return b.releaseYear - a.releaseYear;
          default:       return 0;
        }
      });
  }, [movies, selectedLanguage, selectedGenre, selectedStatus, sortBy, searchQuery]);
}

/** Extract unique genres from a movie list */
export function useGenreList(movies: Movie[]): string[] {
  return useMemo(() => {
    const all = new Set<string>();
    movies.forEach((m) => m.genres.forEach((g) => all.add(g)));
    return ["All", ...Array.from(all).sort()];
  }, [movies]);
}
