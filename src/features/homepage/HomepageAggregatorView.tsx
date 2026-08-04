import React from "react";
import { HeroBanner } from "../../components/HeroBanner";
import { MovieGrid } from "../../components/MovieGrid";
import { LiveApiDataExplorer } from "../../components/LiveApiDataExplorer";
import { BoxOfficeAnalyticsDashboard } from "../../components/BoxOfficeAnalyticsDashboard";
import { CommunityForum } from "../../components/CommunityForum";
import { ComingSoonRail } from "./ComingSoonRail";
import { AiPicksRail } from "./AiPicksRail";
import { CollectionsRail } from "./CollectionsRail";
import { IndianCinemaRail } from "./IndianCinemaRail";
import { Movie, VideoClip } from "../../types";

interface HomepageAggregatorViewProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie, clip?: VideoClip) => void;
  watchlist: string[];
  onToggleWatchlist: (movieId: string) => void;
  selectedLanguage: any;
  setSelectedLanguage: any;
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
  const heroMovie = movies[0];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* 1. Full-Viewport Auto-Rotating Hero (85vh) */}
      <HeroBanner
        movie={heroMovie}
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
        isWatchlisted={watchlist.includes(heroMovie.id)}
        onToggleWatchlist={onToggleWatchlist}
      />

      {/* 2. Trending Now Catalog Grid */}
      <MovieGrid
        movies={movies}
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
        watchlist={watchlist}
        onToggleWatchlist={onToggleWatchlist}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* 3. Trending in India (Bollywood / Tollywood / Kollywood / Mollywood / Sandalwood) */}
      <IndianCinemaRail movies={movies} onSelectMovie={onSelectMovie} />

      {/* 4. Coming Soon Countdown Cards */}
      <ComingSoonRail />

      {/* 5. Latest Trailers (YouTube Data Proxy Rail) */}
      <LiveApiDataExplorer
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
      />

      {/* 6. AI Picks (Gemini 3.6 Flash Curated Rows) */}
      <AiPicksRail movies={movies} onSelectMovie={onSelectMovie} />

      {/* 7. Collections & Franchise Universes */}
      <CollectionsRail />

      {/* 8. Box Office / Analytics Telemetry */}
      <BoxOfficeAnalyticsDashboard />

      {/* 9. Cinephile Community & Verified Critic Discussions */}
      <CommunityForum />
    </div>
  );
};
