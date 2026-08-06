// MovieHub X — Unified Type Exports
// Import from here everywhere in the codebase

export type {
  LanguageType,
  IndustryType,
  BoxOfficeStatusType,
  VideoClipType,
  CastRoleType,
  VideoClip,
  CastMember,
  CriticReview,
  FanReview,
  ReviewSentiment,
  DemographicBreakdown,
  DirectorStyleRadar,
  StreamingPlatform,
  Movie,
  AiMovieAnalysisResponse,
  AiDeepAnalysisResponse,
} from "./movie";

export type {
  UserRole,
  UserCustomList,
  UserStats,
  WatchHistoryEntry,
  UserProfile,
  ThreadComment,
  CommunityCategory,
  CommunityThread,
} from "./user";

export type {
  TabType,
  ApiResponse,
  SearchResult,
  TickerItem,
  ComingSoonItem,
  FeaturedTalent,
  HomepagePayload,
  HeroItem,
} from "./api";

export { CACHE_TTL } from "./cache";
export type { CacheEntry, CacheConfig } from "./cache";
