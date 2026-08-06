import { useCallback } from "react";
import { useUserStore } from "../store/useUserStore";

/**
 * Watchlist management hook.
 * Reads from and writes to the global user store.
 * Persists to localStorage via the store's subscribe.
 */
export function useWatchlist() {
  const watchlist = useUserStore((s) => s.userProfile.watchlist);
  const toggleWatchlist = useUserStore((s) => s.toggleWatchlist);

  const isWatchlisted = useCallback(
    (movieId: string) => watchlist.includes(movieId),
    [watchlist]
  );

  return { watchlist, isWatchlisted, toggleWatchlist };
}
