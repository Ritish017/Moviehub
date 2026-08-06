/**
 * MovieHub X — Client-Side Memory Cache
 * Generic TTL-based in-memory cache with per-key expiration.
 * Implements the cache TTL spec from the architecture plan.
 */

import type { CacheEntry } from "../types/cache";

class MemoryCache {
  private store = new Map<string, CacheEntry<unknown>>();

  /** Store a value with a TTL in milliseconds */
  set<T>(key: string, data: T, ttlMs: number): void {
    this.store.set(key, {
      key,
      data,
      timestamp: Date.now(),
      ttlMs,
    });
  }

  /** Retrieve a value if it exists and has not expired */
  get<T>(key: string): T | null {
    const entry = this.store.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;

    const age = Date.now() - entry.timestamp;
    if (age > entry.ttlMs) {
      this.store.delete(key);
      return null;
    }

    return entry.data;
  }

  /** Check if a key exists and is still valid */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /** Force-invalidate a key */
  invalidate(key: string): void {
    this.store.delete(key);
  }

  /** Invalidate all keys with a given prefix */
  invalidatePrefix(prefix: string): void {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) {
        this.store.delete(key);
      }
    }
  }

  /** Clear entire cache */
  clear(): void {
    this.store.clear();
  }

  /** Return age of a cache entry in ms, or null if absent/expired */
  ageMs(key: string): number | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    const age = Date.now() - entry.timestamp;
    if (age > entry.ttlMs) {
      this.store.delete(key);
      return null;
    }
    return age;
  }

  /** Debug: list all valid keys */
  keys(): string[] {
    const valid: string[] = [];
    for (const [key, entry] of this.store.entries()) {
      if (Date.now() - entry.timestamp <= entry.ttlMs) {
        valid.push(key);
      }
    }
    return valid;
  }
}

/** Singleton cache instance — shared across the application */
export const cache = new MemoryCache();

/**
 * Fetch-with-cache utility.
 * If the key is in cache, returns cached data.
 * Otherwise calls the async fetcher, stores the result, and returns it.
 */
export async function cachedFetch<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get<T>(key);
  if (cached !== null) return cached;

  const data = await fetcher();
  cache.set(key, data, ttlMs);
  return data;
}
