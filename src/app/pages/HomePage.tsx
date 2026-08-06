import React, { useEffect } from "react";
import { HomepageAggregatorView } from "../../features/homepage/HomepageAggregatorView";
import { useMovieStore } from "../../store/useMovieStore";
import { useContentStore } from "../../store/useContentStore";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import type { Movie, VideoClip } from "../../types";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const fetchAllHomeData = useContentStore((s) => s.fetchAllHomeData);
  
  // Backwards compatibility for now, combine some rails for the aggregated view
  const trending = useContentStore((s) => s.trending);
  const nowPlaying = useContentStore((s) => s.nowPlaying);
  const popular = useContentStore((s) => s.popular);
  // combine into a generic "movies" array so old components don't break immediately
  // while we transition them
  const movies = [...trending, ...nowPlaying, ...popular].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);

  useEffect(() => {
    fetchAllHomeData();
  }, [fetchAllHomeData]);

  const openStreaming = useMovieStore((s) => s.openStreaming);
  const selectedLanguage = useMovieStore((s) => s.selectedLanguage);
  const setSelectedLanguage = useMovieStore((s) => s.setSelectedLanguage);
  const watchlist = useUserStore((s) => s.userProfile.watchlist);
  const toggleWatchlist = useUserStore((s) => s.toggleWatchlist);

  const handleSelectMovie = (movie: Movie) => navigate(`/movie/${movie.id}`);
  const handleOpenTrailer = (movie: Movie, clip?: VideoClip) => openStreaming(movie, clip);

  return (
    <HomepageAggregatorView
      movies={movies}
      onSelectMovie={handleSelectMovie}
      onOpenTrailer={handleOpenTrailer}
      watchlist={watchlist}
      onToggleWatchlist={toggleWatchlist}
      selectedLanguage={selectedLanguage}
      setSelectedLanguage={setSelectedLanguage}
    />
  );
};

export default HomePage;
