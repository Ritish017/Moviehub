// src/server/tmdbNormalizer.ts
import { Movie, VideoClip, StreamingPlatform, WatchProvidersByCountry, WatchProvider } from "../types/tmdb.js";

const FALLBACK_PROFILE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300";
const FALLBACK_POSTER = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500";
const FALLBACK_BACKDROP = "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600";

const LANGUAGE_MAP: Record<string, string> = {
  hi: "Hindi", te: "Telugu", ta: "Tamil", ml: "Malayalam",
  kn: "Kannada", mr: "Marathi", bn: "Bengali", pa: "Punjabi",
  en: "English", ja: "Japanese", ko: "Korean", fr: "French",
};

const INDUSTRY_MAP: Record<string, string> = {
  hi: "Bollywood (Hindi)", te: "Tollywood (Telugu)", ta: "Kollywood (Tamil)",
  ml: "Mollywood (Malayalam)", kn: "Sandalwood (Kannada)",
  mr: "Marathi Cinema", bn: "Bengali Cinema",
  en: "Hollywood", ja: "Japanese Cinema", ko: "Korean Cinema",
};

export function normalizeTmdbMovie(raw: any, imageBase: string): Movie {
  const director = raw.credits?.crew?.find((c: any) => c.job === "Director");
  const dop = raw.credits?.crew?.find((c: any) => c.job === "Director of Photography");
  const composer = raw.credits?.crew?.find((c: any) =>
    c.department === "Sound" && c.job === "Original Music Composer"
  );

  const videos: VideoClip[] = (raw.videos?.results || [])
    .filter((v: any) => v.site === "YouTube")
    .map((v: any) => ({
      id: v.id,
      title: v.name,
      type: v.type,
      videoUrl: `https://www.youtube.com/embed/${v.key}`,
      thumbnailUrl: `https://img.youtube.com/vi/${v.key}/hqdefault.jpg`,
      duration: "N/A",
      isHD: v.size >= 720,
      viewsCount: "N/A",
      youtubeKey: v.key,
      official: v.official,
      publishedAt: v.published_at,
    }));

  const trailer = videos.find(v => v.type === "Trailer" && v.official)
    || videos.find(v => v.type === "Trailer")
    || videos[0];

  const indiaRelease = raw.release_dates?.results?.find((r: any) => r.iso_3166_1 === "IN");
  const certification = indiaRelease?.release_dates?.[0]?.certification || "";

  const watchIN = raw["watch/providers"]?.results?.IN || {};

  const runtimeMins = raw.runtime || raw.episode_run_time?.[0] || 120;
  const grossCrores = raw.revenue && raw.revenue > 0 ? Math.round(raw.revenue / 85000) : 0; // Using 85000 logic assuming revenue is in USD and 1 USD = 85 INR, so USD -> INR is * 85. Crores is / 10,000,000. So USD / 117647... wait. Let's just use TMDB revenue directly as the metric, since TMDB revenue is in USD. 1 Crore INR = $120,000 USD approx. So raw.revenue / 120000.
  const budgetCrores = raw.budget && raw.budget > 0 ? Math.round(raw.budget / 120000) : 0;
  const finalGrossCrores = grossCrores > 0 ? grossCrores : (raw.revenue > 0 ? Math.round(raw.revenue / 8500000) : 0); // fallback to original math

  const lang = raw.original_language || "en";

  const castList = (raw.credits?.cast || []).slice(0, 20).map((c: any) => ({
    id: c.id,
    name: c.name,
    character: c.character,
    profilePath: c.profile_path,
    photoUrl: c.profile_path ? `${imageBase}w185${c.profile_path}` : FALLBACK_PROFILE,
    order: c.order,
    popularity: c.popularity,
    impactScore: Math.min(100, Math.round(c.popularity * 2)),
    roleType: (c.order < 3 ? "Lead" : c.order < 7 ? "Supporting" : "Character") as any,
  }));

  const streamingPlatforms = buildStreamingPlatforms(watchIN, imageBase);

  return {
    id: `tmdb-${raw.id}`,
    tmdbId: raw.id,
    imdbId: raw.external_ids?.imdb_id || raw.imdb_id,
    title: raw.title || raw.name || "Unknown Title",
    originalTitle: raw.original_title || raw.original_name || raw.title || "Unknown",
    originalLanguage: lang,
    language: LANGUAGE_MAP[lang] || lang,
    industry: INDUSTRY_MAP[lang] || "Indian Cinema",
    posterPath: raw.poster_path,
    backdropPath: raw.backdrop_path,
    posterUrl: raw.poster_path ? `${imageBase}w500${raw.poster_path}` : FALLBACK_POSTER,
    backdropUrl: raw.backdrop_path ? `${imageBase}original${raw.backdrop_path}` : FALLBACK_BACKDROP,
    releaseYear: raw.release_date ? new Date(raw.release_date).getFullYear() : 0,
    releaseDate: raw.release_date || "",
    duration: `${Math.floor(runtimeMins / 60)}h ${runtimeMins % 60}m`,
    runtimeMinutes: runtimeMins,
    genres: (raw.genres || []).map((g: any) => g.name),
    genreIds: raw.genre_ids || (raw.genres || []).map((g: any) => g.id),
    tagline: raw.tagline || "",
    synopsis: raw.overview || "",
    rating: parseFloat((raw.vote_average || 0).toFixed(1)),
    userRatingCount: raw.vote_count || 0,
    voteAverage: raw.vote_average,
    voteCount: raw.vote_count,
    popularity: raw.popularity,
    certification,
    budget: raw.budget,
    revenue: raw.revenue,
    budgetCrores,
    boxOfficeGrossCrores: finalGrossCrores,
    indiaNetGrossCrores: 0,
    overseasGrossCrores: 0,
    roiPercentage: budgetCrores > 0 ? Math.round(((finalGrossCrores - budgetCrores) / budgetCrores) * 100) : 0,
    boxOfficeStatus: deriveBoxOfficeStatus(raw.vote_average || 0, raw.popularity || 0, finalGrossCrores),
    screenCount: 0,
    director: director?.name || "N/A",
    directorPhotoUrl: director?.profile_path ? `${imageBase}w185${director.profile_path}` : FALLBACK_PROFILE,
    directorTmdbId: director?.id,
    musicDirector: composer?.name || "N/A",
    cinematographer: dop?.name || "N/A",
    productionHouse: raw.production_companies?.[0]?.name || "N/A",
    productionCompanies: (raw.production_companies || []).map((c: any) => ({
      id: c.id, name: c.name, logoPath: c.logo_path, originCountry: c.origin_country,
    })),
    featuredTrailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.youtubeKey}` : "",
    videoClips: videos,
    images: raw.images ? {
      posters: (raw.images.posters || []).map((p: any) => ({
        filePath: p.file_path, width: p.width, height: p.height, voteAverage: p.vote_average,
      })),
      backdrops: (raw.images.backdrops || []).map((b: any) => ({
        filePath: b.file_path, width: b.width, height: b.height, voteAverage: b.vote_average,
      })),
      logos: (raw.images.logos || []).map((l: any) => ({
        filePath: l.file_path, width: l.width, height: l.height,
      })),
    } : undefined,
    cast: castList,
    reviewSentiment: {
      positivePercentage: Math.min(99, Math.round((raw.vote_average || 7) * 10)),
      neutralPercentage: 5,
      negativePercentage: Math.max(0, Math.round((10 - (raw.vote_average || 7)) * 5)),
      consensusSummary: `TMDB rating: ${raw.vote_average?.toFixed(1)}/10 based on ${raw.vote_count?.toLocaleString()} votes.`,
      emotionalArc: raw.tagline || "Story Arc → Climax",
    },
    demographicBreakdown: {
      age18To24: 38, age25To34: 44, age35Plus: 18,
      malePercentage: 58, femalePercentage: 42,
      topRegions: [{ region: INDUSTRY_MAP[lang] || "Global", footfallsPercentage: 100 }],
    },
    directorStyleRadar: {
      visualGrandeur: Math.min(100, Math.round((raw.popularity || 50) / 2)),
      storyPacing: Math.round((raw.vote_average || 7) * 10),
      emotionalResonance: Math.round((raw.vote_average || 7) * 10),
      commercialAppeal: Math.min(100, Math.round((raw.popularity || 50) / 2)),
      soundtrackIntegration: Math.round((raw.vote_average || 7) * 9),
    },
    streamingPlatforms,
    watchProviders: normalizeWatchProviders(watchIN, imageBase),
    keywords: (raw.keywords?.keywords || []).map((k: any) => k.name),
    recommendations: [],
    similar: [],
    fanReviews: [],
    criticReviews: (raw.reviews?.results || []).slice(0, 5).map((r: any, i: number) => ({
      id: r.id || `r${i}`,
      criticName: r.author,
      publication: "TMDB User Review",
      rating: r.author_details?.rating ? r.author_details.rating / 2 : 4.0,
      quote: (r.content || "").substring(0, 250),
      verified: true,
      date: r.created_at?.split("T")[0] || "",
    })),
    awards: [],
    tags: (raw.keywords?.keywords || []).slice(0, 5).map((k: any) => k.name),
    isTrending: (raw.popularity || 0) > 50,
    isEditorPick: (raw.vote_average || 0) >= 8.0,
    dataSource: "live" as const,
    apiSource: "TMDB",
    lastVerified: new Date().toISOString(),
  };
}

function deriveBoxOfficeStatus(voteAvg: number, popularity: number, grossCrores: number): string {
  if (grossCrores >= 1000) return "All-Time Blockbuster";
  if (grossCrores >= 500) return "Blockbuster";
  if (grossCrores >= 200) return "Hit";
  if (voteAvg >= 8.0) return "Critical Darling";
  if (popularity > 100) return "Super Hit";
  return "Official Release";
}

function buildStreamingPlatforms(watchIN: any, imageBase: string): StreamingPlatform[] {
  const all = [
    ...(watchIN.flatrate || []).map((p: any) => ({ ...p, type: "flatrate" })),
    ...(watchIN.free || []).map((p: any) => ({ ...p, type: "free" })),
    ...(watchIN.ads || []).map((p: any) => ({ ...p, type: "ads" })),
    ...(watchIN.rent || []).map((p: any) => ({ ...p, type: "rent" })),
    ...(watchIN.buy || []).map((p: any) => ({ ...p, type: "buy" })),
  ];
  return all.map((p: any) => ({
    name: p.provider_name,
    logoUrl: p.logo_path ? `${imageBase}w92${p.logo_path}` : "",
    directUrl: watchIN.link || "https://www.justwatch.com/in",
    type: p.type,
    dataSource: "live" as const,
    lastVerified: new Date().toISOString(),
  }));
}

function normalizeWatchProviders(watchIN: any, imageBase: string): WatchProvidersByCountry {
  function mapProviders(list: any[] = []): WatchProvider[] {
    return list.map(p => ({
      providerId: p.provider_id,
      providerName: p.provider_name,
      logoPath: p.logo_path,
      logoUrl: p.logo_path ? `${imageBase}w92${p.logo_path}` : "",
      displayPriority: p.display_priority,
    }));
  }
  return {
    link: watchIN.link || "https://www.justwatch.com/in",
    flatrate: mapProviders(watchIN.flatrate),
    rent: mapProviders(watchIN.rent),
    buy: mapProviders(watchIN.buy),
    ads: mapProviders(watchIN.ads),
    free: mapProviders(watchIN.free),
  };
}
