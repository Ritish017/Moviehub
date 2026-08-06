import React from "react";
import { HomepageAggregatorView } from "../../features/homepage/HomepageAggregatorView";
import { useMovieStore } from "../../store/useMovieStore";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import type { Movie, VideoClip } from "../../types";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const movies = useMovieStore((s) => s.movies);
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
