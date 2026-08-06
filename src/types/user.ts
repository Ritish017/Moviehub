// MovieHub X — User & Community Types

export type UserRole =
  | "Cinephile Fan"
  | "Film Critic"
  | "Aspiring Director"
  | "Actor / Crew Member"
  | "Box Office Analyst";

export interface UserCustomList {
  id: string;
  title: string;
  description: string;
  movieIds: string[];
  isPublic: boolean;
  createdAt: string;
}

export interface UserStats {
  moviesWatched: number;
  reviewsWritten: number;
  forumPosts: number;
  reputationPoints: number;
}

export interface WatchHistoryEntry {
  movieId: string;
  watchedAt: string;
  userRating?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  bio: string;
  preferredLanguages: import("./movie").LanguageType[];
  favoriteGenres: string[];
  favoriteActors: string[];
  watchHistory: WatchHistoryEntry[];
  watchlist: string[]; // movie IDs
  favorites: string[]; // movie IDs
  customLists: UserCustomList[];
  stats: UserStats;
}

export interface ThreadComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  text: string;
  timestamp: string;
  upvotes: number;
  isVerifiedCritic?: boolean;
}

export type CommunityCategory =
  | "Box Office Battles"
  | "Trailer Analysis"
  | "Director Spotlight"
  | "Fan Theories"
  | "Script Analysis"
  | "Industry News";

export interface CommunityThread {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  category: CommunityCategory;
  languageFilter: import("./movie").LanguageType;
  upvotes: number;
  viewsCount: number;
  commentCount: number;
  createdAt: string;
  tags: string[];
  comments: ThreadComment[];
  relatedMovieId?: string;
}
