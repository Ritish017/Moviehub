import React, { useState, useEffect } from "react";
import { HeroBanner } from "../../components/HeroBanner";
import { MovieGrid } from "../../components/MovieGrid";
import { LiveApiDataExplorer } from "../../components/LiveApiDataExplorer";
import { BoxOfficeAnalyticsDashboard } from "../../components/BoxOfficeAnalyticsDashboard";
import { ComingSoonRail } from "./ComingSoonRail";
import { AiPicksRail } from "./AiPicksRail";
import { CollectionsRail } from "./CollectionsRail";
import { IndianCinemaRail } from "./IndianCinemaRail";
import { FeaturedTalentRail } from "./FeaturedTalentRail";
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
  const [aggregatorData, setAggregatorData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/cinema/homepage-aggregator")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setAggregatorData(json.data);
        }
      })
      .catch((err) => console.error("Aggregator load error:", err));
  }, []);

  const heroMovie = movies[0];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* 1. Full-Viewport Auto-Rotating Hero Spotlight */}
      <HeroBanner
        movie={heroMovie}
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
        isWatchlisted={watchlist.includes(heroMovie.id)}
        onToggleWatchlist={onToggleWatchlist}
      />

      {/* 2. Live API Cinema Gateway Sandbox */}
      <LiveApiDataExplorer
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
      />

      {/* 3. 🎬 Section 3: Coming Soon & Release Countdowns */}
      <ComingSoonRail />

      {/* 4. 🤖 Section 7: AI Picks by Gemini 3.6 Flash */}
      <AiPicksRail movies={movies} onSelectMovie={onSelectMovie} />

      {/* 5. 🇮🇳 Section 9: Indian Regional Cinema Hub */}
      <IndianCinemaRail movies={movies} onSelectMovie={onSelectMovie} />

      {/* 6. 🎭 Section 8: Collections & Franchise Universes */}
      <CollectionsRail />

      {/* 7. ⭐ & 🎬 Sections 13 & 14: Featured Actors & Directors */}
      <FeaturedTalentRail />

      {/* 8. Main Catalog Grid with Language & Industry Filters */}
      <MovieGrid
        movies={movies}
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
        watchlist={watchlist}
        onToggleWatchlist={onToggleWatchlist}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* 9. 📈 Section 11: Box Office Telemetry */}
      <BoxOfficeAnalyticsDashboard />
    </div>
  );
};
