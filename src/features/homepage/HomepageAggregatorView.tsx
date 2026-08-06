import React, { Suspense } from "react";
import { CinematicHero } from "../hero/CinematicHero";
import { MovieGrid } from "../../components/MovieGrid";
import { ComingSoonRail } from "./ComingSoonRail";
import { AiPicksRail } from "./AiPicksRail";
import { CollectionsRail } from "./CollectionsRail";
import { IndianCinemaRail } from "./IndianCinemaRail";
import { BoxOfficeAnalyticsDashboard } from "../../components/BoxOfficeAnalyticsDashboard";
import { CommunityForum } from "../../components/CommunityForum";
import { ErrorBoundary } from "../../components/ui/ErrorBoundary";
import { SectionSkeleton, HeroSkeleton } from "../../components/ui/Skeleton";
import { useUserStore } from "../../store/useUserStore";
import type { Movie, VideoClip, LanguageType } from "../../types";

interface HomepageAggregatorViewProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie, clip?: VideoClip) => void;
  watchlist: string[];
  onToggleWatchlist: (movieId: string) => void;
  selectedLanguage: LanguageType;
  setSelectedLanguage: (lang: LanguageType) => void;
}

export const HomepageAggregatorView: React.FC<HomepageAggregatorViewProps> = ({
  movies,
  onSelectMovie,
  onOpenTrailer,
  watchlist,
  onToggleWatchlist,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const userProfile = useUserStore((s) => s.userProfile);

  return (
    <div className="space-y-14 animate-fadeIn pb-8">

      {/* 1. Full-Viewport Cinematic Hero */}
      <ErrorBoundary>
        <Suspense fallback={<HeroSkeleton />}>
          <CinematicHero />
        </Suspense>
      </ErrorBoundary>

      {/* 2. Trending Now Catalog Grid */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton rows={5} />}>
          <MovieGrid
            movies={movies}
            onSelectMovie={onSelectMovie}
            onOpenTrailer={onOpenTrailer}
            watchlist={watchlist}
            onToggleWatchlist={onToggleWatchlist}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        </Suspense>
      </ErrorBoundary>

      {/* 3. Indian Cinema Industry Rail */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton rows={4} />}>
          <IndianCinemaRail movies={movies} onSelectMovie={onSelectMovie} />
        </Suspense>
      </ErrorBoundary>

      {/* 4. Coming Soon Countdown Cards */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton rows={3} />}>
          <ComingSoonRail />
        </Suspense>
      </ErrorBoundary>

      {/* 5. AI Picks — Gemini Curated Rows */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton rows={4} />}>
          <AiPicksRail movies={movies} onSelectMovie={onSelectMovie} />
        </Suspense>
      </ErrorBoundary>

      {/* 6. Collections & Franchise Universes */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton rows={3} />}>
          <CollectionsRail />
        </Suspense>
      </ErrorBoundary>

      {/* 7. Box Office Analytics Mini-Dashboard */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton rows={2} />}>
          <BoxOfficeAnalyticsDashboard />
        </Suspense>
      </ErrorBoundary>

      {/* 8. Community Forum Preview */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton rows={2} />}>
          <CommunityForum
            userRole={userProfile.role}
            userName={userProfile.name}
          />
        </Suspense>
      </ErrorBoundary>

    </div>
  );
};
