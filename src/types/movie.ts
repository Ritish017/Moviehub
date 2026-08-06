// MovieHub X — Core Movie Types

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

export type VideoClipType =
  | "Official Trailer"
  | "Teaser"
  | "Lyrical Song"
  | "Behind The Scenes"
  | "Director Commentary"
  | "Official iTunes Trailer";

export type CastRoleType =
  | "Lead Actor"
  | "Lead Actress"
  | "Antagonist"
  | "Key Supporting"
  | "Special Cameo";

export interface VideoClip {
  id: string;
  title: string;
  type: VideoClipType;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  isHD: boolean;
  viewsCount?: string;
  isDirectMp4?: boolean;
}

export interface CastMember {
  id: string;
  name: string;
  characterName: string;
  photoUrl: string;
  impactScore: number; // 0–100
  roleType: CastRoleType;
}

export interface CriticReview {
  id: string;
  criticName: string;
  publication: string;
  rating: number; // out of 5
  quote: string;
  verified: boolean;
  date: string;
}

export interface FanReview {
  id: string;
  userName: string;
  userAvatar: string;
  userRole: import("./user").UserRole;
  rating: number; // 1–10
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
  emotionalArc: string;
}

export interface DemographicBreakdown {
  age18To24: number;
  age25To34: number;
  age35Plus: number;
  malePercentage: number;
  femalePercentage: number;
  topRegions: { region: string; footfallsPercentage: number }[];
}

export interface DirectorStyleRadar {
  visualGrandeur: number;
  storyPacing: number;
  emotionalResonance: number;
  commercialAppeal: number;
  soundtrackIntegration: number;
}

export interface StreamingPlatform {
  name: string;
  logoUrl: string;
  directUrl: string;
  dataSource?: "live" | "curated" | string;
  lastVerified?: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  language: LanguageType;
  industry: IndustryType | string;
  releaseYear: number;
  releaseDate: string;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  rating: number;
  userRatingCount: number;
  synopsis: string;
  duration: string;

  // Financial
  budgetCrores: number;
  boxOfficeGrossCrores: number;
  indiaNetGrossCrores: number;
  overseasGrossCrores: number;
  roiPercentage: number;
  boxOfficeStatus: BoxOfficeStatusType | string;
  screenCount: number;

  // Cast & Crew
  director: string;
  directorPhotoUrl?: string;
  cast: CastMember[];
  musicDirector: string;
  productionHouse: string;
  cinematographer?: string;

  // Video
  featuredTrailerUrl: string;
  videoClips: VideoClip[];

  // Analytics
  reviewSentiment: ReviewSentiment;
  demographicBreakdown: DemographicBreakdown;
  directorStyleRadar: DirectorStyleRadar;

  // Extras
  streamingPlatforms: StreamingPlatform[];
  awards: string[];
  tags: string[];
  criticReviews: CriticReview[];
  fanReviews: FanReview[];

  // Flags & Data Authenticity Telemetry
  isTrending?: boolean;
  isEditorPick?: boolean;
  apiSource?: string;
  dataSource?: "live" | "curated" | string;
  lastVerified?: string;
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
  directorStyleRadar: DirectorStyleRadar;
  industryImpact: string;
}

export interface AiDeepAnalysisResponse {
  endingExplained: string;
  hiddenDetails: string[];
  themesAndSymbolism: string[];
  characterRelationships: { characters: string; dynamic: string }[];
  directorSignature: string;
  visualStyleAnalysis: string;
  funFactsAndTrivia: string[];
}
