// src/store/useContentStore.ts
import { create } from "zustand";
import { Movie } from "../types/tmdb";
import { api } from "../services/apiClient";

interface ContentStore {
  trending: Movie[];
  nowPlaying: Movie[];
  popular: Movie[];
  bollywood: Movie[];
  tollywood: Movie[];
  kollywood: Movie[];
  netflix: Movie[];
  prime: Movie[];
  
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;

  fetchTrending: () => Promise<void>;
  fetchNowPlaying: () => Promise<void>;
  fetchPopular: () => Promise<void>;
  fetchBollywood: () => Promise<void>;
  fetchTollywood: () => Promise<void>;
  fetchKollywood: () => Promise<void>;
  fetchNetflix: () => Promise<void>;
  fetchPrime: () => Promise<void>;
  
  fetchAllHomeData: () => Promise<void>;
}

export const useContentStore = create<ContentStore>((set, get) => {
  const fetchSection = async (sectionKey: keyof ContentStore, apiCall: () => Promise<{ success: boolean; data?: any; error?: string }>) => {
    set((state) => ({ loading: { ...state.loading, [sectionKey]: true }, errors: { ...state.errors, [sectionKey]: null } }));
    try {
      const res = await apiCall();
      if (res.success && res.data) {
        set((state) => ({ [sectionKey]: res.data, loading: { ...state.loading, [sectionKey]: false } }));
      } else {
        set((state) => ({ errors: { ...state.errors, [sectionKey]: res.error || "Fetch failed" }, loading: { ...state.loading, [sectionKey]: false } }));
      }
    } catch (err: any) {
      set((state) => ({ errors: { ...state.errors, [sectionKey]: err.message }, loading: { ...state.loading, [sectionKey]: false } }));
    }
  };

  return {
    trending: [],
    nowPlaying: [],
    popular: [],
    bollywood: [],
    tollywood: [],
    kollywood: [],
    netflix: [],
    prime: [],
    
    loading: {},
    errors: {},

    fetchTrending: () => fetchSection("trending", api.getTrending),
    fetchNowPlaying: () => fetchSection("nowPlaying", api.getNowPlaying),
    fetchPopular: () => fetchSection("popular", api.getPopular),
    fetchBollywood: () => fetchSection("bollywood", api.getBollywood),
    fetchTollywood: () => fetchSection("tollywood", api.getTollywood),
    fetchKollywood: () => fetchSection("kollywood", api.getKollywood),
    fetchNetflix: () => fetchSection("netflix", api.getNetflix),
    fetchPrime: () => fetchSection("prime", api.getPrime),

    fetchAllHomeData: async () => {
      const { fetchTrending, fetchNowPlaying, fetchPopular, fetchBollywood, fetchTollywood, fetchKollywood, fetchNetflix, fetchPrime } = get();
      // Fetch in parallel
      await Promise.allSettled([
        fetchTrending(),
        fetchNowPlaying(),
        fetchPopular(),
        fetchBollywood(),
        fetchTollywood(),
        fetchKollywood(),
        fetchNetflix(),
        fetchPrime()
      ]);
    }
  };
});
