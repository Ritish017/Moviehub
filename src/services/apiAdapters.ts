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
 * Perform multi-source search across iTunes, Wikipedia, TVMaze, TMDb, OMDb
 */
export async function searchMoviesMultiApi(query: string): Promise<MasterSearchResponse> {
  try {
    const res = await fetch("/api/cinema/public-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Search API returned status ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("[API Adapter] Search failed:", err);
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
