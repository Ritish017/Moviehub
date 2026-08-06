// MovieHub X — Cache Types

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
  key: string;
}

export interface CacheConfig {
  ttlMs: number;
}

/** Pre-defined TTL configurations per spec */
export const CACHE_TTL = {
  HOMEPAGE: 15 * 60 * 1000,          // 15 minutes
  MOVIE_DETAILS: 24 * 60 * 60 * 1000, // 24 hours
  ACTORS: 24 * 60 * 60 * 1000,        // 24 hours
  COLLECTIONS: 24 * 60 * 60 * 1000,   // 24 hours
  GENRES: 24 * 60 * 60 * 1000,        // 24 hours
  TRAILERS: 6 * 60 * 60 * 1000,       // 6 hours
  AI: 7 * 24 * 60 * 60 * 1000,        // 7 days
  SEARCH: 5 * 60 * 1000,              // 5 minutes
  TRENDING: 15 * 60 * 1000,           // 15 minutes
} as const;
