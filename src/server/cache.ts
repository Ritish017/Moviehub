// src/server/cache.ts

interface CacheEntry {
  data: any;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

export function withCache<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const entry = cache.get(key);
  if (entry && entry.expiresAt > Date.now()) {
    return Promise.resolve(entry.data as T);
  }
  
  return fetcher().then(data => {
    cache.set(key, { data, expiresAt: Date.now() + ttlMs });
    return data;
  });
}

export const TTL = {
  CONFIG:        24 * 60 * 60 * 1000,   // 24h
  TRENDING:       1 * 60 * 60 * 1000,   // 1h
  TRENDING_TODAY: 15 * 60 * 1000,       // 15m
  POPULAR:       30 * 60 * 1000,        // 30m
  NOW_PLAYING:   15 * 60 * 1000,        // 15m
  UPCOMING:       1 * 60 * 60 * 1000,   // 1h
  MOVIE_DETAIL:   6 * 60 * 60 * 1000,   // 6h
  SEARCH:         5 * 60 * 1000,        // 5m
  PERSON:        12 * 60 * 60 * 1000,   // 12h
  TV_DETAIL:      6 * 60 * 60 * 1000,   // 6h
  PROVIDER:       1 * 60 * 60 * 1000,   // 1h
  LANGUAGE:      30 * 60 * 1000,        // 30m
  BOX_OFFICE:     2 * 60 * 60 * 1000,   // 2h
};
