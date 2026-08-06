// MovieHub X — Navigation & App Types

/** All valid top-level navigation tabs */
export type TabType =
  | "explore"
  | "analytics"
  | "streaming"
  | "community"
  | "dashboard"
  | "live-api";

/** Generic typed API response envelope */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  isMock?: boolean;
  isCached?: boolean;
  timestamp?: string;
}

/** Search result from multi-source search */
export interface SearchResult {
  source: "local" | "itunes" | "wikipedia" | "tvmaze" | "omdb" | "tmdb";
  id: string;
  title: string;
  type: "movie" | "show" | "actor" | "director" | "collection";
  year?: number;
  rating?: number;
  posterUrl?: string;
  description?: string;
}

/** Market ticker item from box office feed */
export interface TickerItem {
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
  gross: string;
  shows: string;
}

/** Coming soon countdown item */
export interface ComingSoonItem {
  title: string;
  daysLeft: number;
  releaseDate: string;
  studio: string;
  expectations: string;
  posterUrl?: string;
  backdropUrl?: string;
  trailerVideoId?: string;
}

/** Featured actor/director for talent section */
export interface FeaturedTalent {
  name: string;
  role: string;
  photoUrl: string;
  popularity: number;
  landmark?: string;
  trademark?: string;
}

/** Homepage aggregator payload shape */
export interface HomepagePayload {
  heroRotatingItems: HeroItem[];
  comingSoonCountdowns: ComingSoonItem[];
  featuredActors: FeaturedTalent[];
  featuredDirectors: FeaturedTalent[];
  trendingWorldwideCount: number;
}

export interface HeroItem {
  id: string;
  title: string;
  originalTitle?: string;
  badge: string;
  rating: number;
  imdbRating?: number;
  tmdbRating?: number;
  audienceScore?: string;
  grossWW?: string;
  releaseYear: number;
  duration: string;
  genres: string[];
  synopsis: string;
  backdropUrl: string;
  posterUrl: string;
  trailerVideoId: string;
  director: string;
}
