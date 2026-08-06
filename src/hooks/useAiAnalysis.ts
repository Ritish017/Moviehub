import { useState, useEffect, useCallback } from "react";
import { cachedFetch } from "../cache/memoryCache";
import { CACHE_TTL } from "../types/cache";
import type { AiDeepAnalysisResponse } from "../types";

interface UseAiAnalysisResult {
  deepAnalysis: AiDeepAnalysisResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  isMock: boolean;
}

/**
 * AI deep analysis hook with 7-day cache.
 * Never regenerates analysis for the same movie.id unless the cache expires.
 * Falls back gracefully when Gemini API key is invalid.
 */
export function useAiAnalysis(
  movieTitle: string,
  movieId: string,
  director?: string,
  synopsis?: string
): UseAiAnalysisResult {
  const [deepAnalysis, setDeepAnalysis] = useState<AiDeepAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);

  const cacheKey = `ai:deep:${movieId}`;

  const fetchAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await cachedFetch<{ analysis: AiDeepAnalysisResponse; isMock: boolean }>(
        cacheKey,
        CACHE_TTL.AI,
        async () => {
          const res = await fetch("/api/gemini/analyze-movie-deep", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ movieTitle, director, synopsis }),
          });
          if (!res.ok) throw new Error(`AI API returned ${res.status}`);
          const data = await res.json();
          return {
            analysis: data.deepAnalysis ?? data.analysis,
            isMock: data.isMock ?? false,
          };
        }
      );

      setDeepAnalysis(result.analysis);
      setIsMock(result.isMock);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "AI analysis failed";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [cacheKey, movieTitle, director, synopsis]);

  useEffect(() => {
    if (movieId) {
      fetchAnalysis();
    }
  }, [movieId, fetchAnalysis]);

  return { deepAnalysis, isLoading, error, refetch: fetchAnalysis, isMock };
}
