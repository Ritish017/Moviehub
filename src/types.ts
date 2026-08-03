export type LanguageType =
  | "All"
  | "Hindi"
  | "Telugu"
  | "Tamil"
  | "Malayalam"
  | "Kannada"
  | "Pan-India";

export type IndustryType =
  | "Bollywood (Hindi)"
  | "Tollywood (Telugu)"
  | "Kollywood (Tamil)"
  | "Mollywood (Malayalam)"
  | "Sandalwood (Kannada)"
  | "Cross-Industry";

export type BoxOfficeStatusType =
  | "All-Time Blockbuster"
  | "Blockbuster"
  | "Super Hit"
  | "Hit"
  | "Average"
  | "Trending Now"
  | "Upcoming Release";

export type UserRole =
  | "Cinephile Fan"
  | "Film Critic"
  | "Aspiring Director"
  | "Actor / Crew Member"
  | "Box Office Analyst";

export interface VideoClip {
  id: string;
  title: string;
  type: "Official Trailer" | "Teaser" | "Lyrical Song" | "Behind The Scenes" | "Director Commentary";
  videoUrl: string; // Embeddable YouTube URL or fallback HD MP4
  thumbnailUrl: string;
  duration: string;
  isHD: boolean;
  viewsCount?: string;
}

export interface CastMember {
  id: string;
  name: string;
  characterName: string;
  photoUrl: string;
  impactScore: number; // 0 to 100
  roleType: "Lead Actor" | "Lead Actress" | "Antagonist" | "Key Supporting" | "Special Cameo";
}

export interface CriticReview {
  id: string;
  criticName: string;
  publication: string;
  rating: number; // e.g. 4.5 out of 5
  quote: string;
  verified: boolean;
  date: string;
}

export interface FanReview {
  id: string;
  userName: string;
  userAvatar: string;
  userRole: UserRole;
  rating: number; // 1 to 10
  reviewTitle: string;
  reviewText: string;
  likes: number;
  date: string;
  spoilerWarning?: boolean;
}

export interface ReviewSentiment {
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
  consensusSummary: string;
  emotionalArc: string; // e.g., "High-Octane Thrill -> Emotional Climax"
}

export interface DemographicBreakdown {
  age18To24: number; // %
  age25To34: number; // %
  age35Plus: number;  // %
  malePercentage: number;
  femalePercentage: number;
  topRegions: { region: string; footfallsPercentage: number }[];
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  language: LanguageType;
  industry: IndustryType;
  releaseYear: number;
  releaseDate: string;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  rating: number; // Out of 10
  userRatingCount: number;
  synopsis: string;
  duration: string; // e.g., "2h 48m"
  
  // Financial Telemetry (in Crores ₹)
  budgetCrores: number;
  boxOfficeGrossCrores: number;
  indiaNetGrossCrores: number;
  overseasGrossCrores: number;
  roiPercentage: number;
  boxOfficeStatus: BoxOfficeStatusType;
  screenCount: number;
  
  // Cast & Crew
  director: string;
  directorPhotoUrl?: string;
  cast: CastMember[];
  musicDirector: string;
  productionHouse: string;
  cinematographer?: string;
  
  // Video Footage & Trailers
  featuredTrailerUrl: string; // Primary HD video embed
  videoClips: VideoClip[];
  
  // Analytics & Insights
  reviewSentiment: ReviewSentiment;
  demographicBreakdown: DemographicBreakdown;
  directorStyleRadar: {
    visualGrandeur: number;
    storyPacing: number;
    emotionalResonance: number;
    commercialAppeal: number;
    soundtrackIntegration: number;
  };
  
  // Extras
  streamingPlatforms: { name: string; logoUrl: string; directUrl: string }[];
  awards: string[];
  tags: string[];
  criticReviews: CriticReview[];
  fanReviews: FanReview[];
  isTrending?: boolean;
  isEditorPick?: boolean;
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

export interface CommunityThread {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  category: "Box Office Battles" | "Trailer Analysis" | "Director Spotlight" | "Fan Theories" | "Script Analysis" | "Industry News";
  languageFilter: LanguageType;
  upvotes: number;
  viewsCount: number;
  commentCount: number;
  createdAt: string;
  tags: string[];
  comments: ThreadComment[];
  relatedMovieId?: string;
}

export interface UserCustomList {
  id: string;
  title: string;
  description: string;
  movieIds: string[];
  isPublic: boolean;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  bio: string;
  preferredLanguages: LanguageType[];
  favoriteGenres: string[];
  favoriteActors: string[];
  watchHistory: { movieId: string; watchedAt: string; userRating?: number }[];
  watchlist: string[]; // movie IDs
  favorites: string[]; // movie IDs
  customLists: UserCustomList[];
  stats: {
    moviesWatched: number;
    reviewsWritten: number;
    forumPosts: number;
    reputationPoints: number;
  };
}

export interface AiMovieAnalysisResponse {
  executiveSummary: string;
  boxOfficeVerdict: string;
  sentimentAnalysis: {
    positivePoints: string[];
    areasOfImprovement: string[];
    overallScore: number;
  };
  targetAudienceDemographics: string;
  directorStyleRadar: {
    visualGrandeur: number;
    storyPacing: number;
    emotionalResonance: number;
    commercialAppeal: number;
    soundtrackIntegration: number;
  };
  industryImpact: string;
}
