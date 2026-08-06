/**
 * MovieHub X - API Service Adapters
 * Unified client service layer for fetching normalized movie data, searching, and calling Gemini AI.
 */

import { Movie } from "../types";

export interface MasterSearchResponse {
  success: boolean;
  query: string;
  counts: {
    itunes: number;
    wikipedia: number;
    tvmaze: number;
  };
  itunesMovies: Movie[];
  wikipediaItems: any[];
  tvmazeShows: any[];
  error?: string;
}

/**
 * Perform multi-source search across backend endpoints with direct client-side fallback
 */
export async function searchMoviesMultiApi(query: string): Promise<MasterSearchResponse> {
  if (!query || !query.trim()) {
    return {
      success: true,
      query: "",
      counts: { itunes: 0, wikipedia: 0, tvmaze: 0 },
      itunesMovies: [],
      wikipediaItems: [],
      tvmazeShows: [],
    };
  }

  try {
    const res = await fetch("/api/cinema/public-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const contentType = res.headers.get("content-type");
    if (res.ok && contentType && contentType.includes("application/json")) {
      const data = await res.json();
      if (data.success && Array.isArray(data.itunesMovies)) {
        return data;
      }
    }
    throw new Error(`Server API status ${res.status}`);
  } catch (err: any) {
    console.warn("[API Adapter] Backend search unavailable, performing client public iTunes search fallback:", err?.message);
    
    try {
      const iTunesRes = await fetch(
        `https://itunes.apple.com/search?media=movie&term=${encodeURIComponent(query)}&limit=12`
      );
      if (iTunesRes.ok) {
        const data = await iTunesRes.json();
        const results = data?.results || [];

        const normalizedMovies: Movie[] = results.map((item: any) => {
          const highResPoster = item.artworkUrl100
            ? item.artworkUrl100.replace("100x100bb", "600x600bb")
            : "";
          const releaseYear = item.releaseDate
            ? new Date(item.releaseDate).getFullYear()
            : 2024;

          return {
            id: `itunes-${item.trackId || Math.random()}`,
            title: item.trackName || item.collectionName || query,
            originalTitle: item.trackName,
            language: item.country || "English",
            releaseYear,
            director: item.artistName || "Director",
            cast: [{ name: item.artistName || "Cast Member", role: "Actor", characterName: "Lead" }],
            genres: item.primaryGenreName ? [item.primaryGenreName] : ["Cinema"],
            rating: item.trackRentalPrice ? 8.2 : 7.8,
            boxOffice: "Live Streaming",
            budget: "N/A",
            synopsis: item.longDescription || item.shortDescription || `Discover ${item.trackName || query} in high definition.`,
            posterUrl: highResPoster,
            backdropUrl: highResPoster,
            featuredTrailerUrl: item.previewUrl || "https://www.youtube.com/watch?v=1kF_n7Y546Q",
            aiVerdict: "Recommended via Global Cinema Gateway",
            aiScore: 88,
          };
        });

        return {
          success: true,
          query,
          counts: { itunes: normalizedMovies.length, wikipedia: 0, tvmaze: 0 },
          itunesMovies: normalizedMovies,
          wikipediaItems: [],
          tvmazeShows: [],
        };
      }
    } catch (fallbackErr) {
      console.error("[API Adapter] Client iTunes fallback failed:", fallbackErr);
    }

    return {
      success: false,
      query,
      counts: { itunes: 0, wikipedia: 0, tvmaze: 0 },
      itunesMovies: [],
      wikipediaItems: [],
      tvmazeShows: [],
      error: err?.message || "Search network error",
    };
  }
}

/**
 * Fetch live trending items from backend
 */
export async function fetchLiveTrendingMovies(): Promise<{ success: boolean; movies: any[] }> {
  try {
    const res = await fetch("/api/cinema/live-trending");
    if (!res.ok) throw new Error(`Live trending API error ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.error("[API Adapter] Live trending fetch failed:", err);
    return { success: false, movies: [] };
  }
}

/**
 * Fetch Deep Gemini AI analysis for a movie title
 */
export async function fetchGeminiDeepAnalysis(movieTitle: string, director?: string, synopsis?: string) {
  try {
    const res = await fetch("/api/gemini/analyze-movie-deep", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieTitle, director, synopsis }),
    });

    if (!res.ok) throw new Error(`Gemini AI analysis error ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.error("[API Adapter] Gemini Deep Analysis failed:", err);
    return { success: false, isMock: true, error: err?.message };
  }
}

/**
 * Send user query to CineAI Assistant
 */
export async function sendCineAiChatMessage(userMessage: string, userRole?: string) {
  try {
    const res = await fetch("/api/gemini/industry-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage, userRole }),
    });

    if (!res.ok) throw new Error(`CineAI Assistant error ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.error("[API Adapter] CineAI Chat failed:", err);
    return {
      success: false,
      reply: "CineAI Assistant is currently operating in offline mode. Please check network connectivity.",
    };
  }
}
