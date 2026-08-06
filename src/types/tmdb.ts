// src/types/tmdb.ts

export interface TmdbConfig {
  imageBaseUrl: string;
  posterSizes: string[];
  backdropSizes: string[];
  profileSizes: string[];
  logoSizes: string[];
}

export interface Genre { id: number; name: string; }

export interface ProductionCompany {
  id: number;
  name: string;
  logoPath: string | null;
  originCountry: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  photoUrl: string;
  order: number;
  popularity: number;
  impactScore: number;
  roleType: "Lead" | "Supporting" | "Character";
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profilePath: string | null;
}

export interface TmdbVideo {
  id: string;
  key: string;
  site: "YouTube";
  type: "Trailer" | "Teaser" | "Clip" | "Featurette" | "Behind the Scenes" | "Bloopers";
  name: string;
  official: boolean;
  publishedAt: string;
  size: number;
}

export interface WatchProvider {
  providerId: number;
  providerName: string;
  logoPath: string;
  logoUrl: string;
  displayPriority: number;
}

export interface WatchProvidersByCountry {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  ads?: WatchProvider[];
  free?: WatchProvider[];
}

export interface VideoClip {
  id: string;
  title: string;
  type: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  isHD: boolean;
  viewsCount: string;
  youtubeKey?: string;
  official?: boolean;
  publishedAt?: string;
  isDirectMp4?: boolean;
}

export interface StreamingPlatform {
  name: string;
  logoUrl: string;
  directUrl: string;
  type?: "flatrate" | "rent" | "buy" | "ads" | "free";
  dataSource?: "live" | "curated";
  lastVerified?: string;
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
  topRegions: Array<{ region: string; footfallsPercentage: number; }>;
}

export interface DirectorStyleRadar {
  visualGrandeur: number;
  storyPacing: number;
  emotionalResonance: number;
  commercialAppeal: number;
  soundtrackIntegration: number;
}

export interface FanReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CriticReview {
  id: string;
  criticName: string;
  publication: string;
  rating: number;
  quote: string;
  verified: boolean;
  date: string;
}

export interface Movie {
  id: string;
  tmdbId?: number;
  imdbId?: string;
  title: string;
  originalTitle: string;
  originalLanguage: string;
  language: string;
  industry: string;

  posterPath?: string | null;
  backdropPath?: string | null;
  logoPath?: string | null;
  
  posterUrl: string;
  backdropUrl: string;

  releaseYear: number;
  releaseDate: string;
  duration: string;
  runtimeMinutes?: number;
  genres: string[];
  genreIds?: number[];
  tagline?: string;
  synopsis: string;
  rating: number;
  userRatingCount: number;
  voteAverage?: number;
  voteCount?: number;
  popularity?: number;
  certification?: string;

  budget?: number;
  revenue?: number;
  budgetCrores: number;
  boxOfficeGrossCrores: number;
  indiaNetGrossCrores: number;
  overseasGrossCrores: number;
  roiPercentage: number;
  boxOfficeStatus: string;
  screenCount: number;

  director: string;
  directorPhotoUrl: string;
  directorTmdbId?: number;
  musicDirector: string;
  productionHouse: string;
  cinematographer: string;
  productionCompanies?: ProductionCompany[];

  featuredTrailerUrl: string;
  videoClips: VideoClip[];
  images?: {
    posters: Array<{ filePath: string; width: number; height: number; voteAverage: number; }>;
    backdrops: Array<{ filePath: string; width: number; height: number; voteAverage: number; }>;
    logos: Array<{ filePath: string; width: number; height: number; }>;
  };

  cast: CastMember[];

  reviewSentiment: ReviewSentiment;
  demographicBreakdown: DemographicBreakdown;
  directorStyleRadar: DirectorStyleRadar;

  fanReviews: FanReview[];
  criticReviews: CriticReview[];

  streamingPlatforms: StreamingPlatform[];
  watchProviders?: WatchProvidersByCountry;

  isTrending: boolean;
  isEditorPick: boolean;
  isNowPlaying?: boolean;
  isUpcoming?: boolean;

  recommendations?: Movie[];
  similar?: Movie[];
  keywords?: string[];
  awards?: string[];
  tags?: string[];

  dataSource?: "live" | "curated";
  apiSource?: string;
  lastVerified?: string;
}
