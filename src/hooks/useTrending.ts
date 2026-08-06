import { useState, useEffect, useCallback } from "react";
import { cachedFetch } from "../cache/memoryCache";
import { CACHE_TTL } from "../types/cache";
import type { Movie } from "../types";
import { fetchLiveTrendingMovies } from "../services/apiAdapters";

interface UseTrendingResult {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch live trending movies from iTunes India.
 * Cached for 15 minutes per spec.
 */
export function useTrending(): UseTrendingResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await cachedFetch<Movie[]>(
        "trending:live",
        CACHE_TTL.TRENDING,
        async () => {
          const res = await fetchLiveTrendingMovies();
          if (!res.success) throw new Error("Failed to load trending");
          return res.movies as Movie[];
        }
      );
      setMovies(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load trending";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  return { movies, isLoading, error, refetch: fetchTrending };
}
