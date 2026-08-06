import React from "react";
import { UserDashboard } from "../../components/UserDashboard";
import { useUserStore } from "../../store/useUserStore";
import { useMovieStore } from "../../store/useMovieStore";
import { useNavigate } from "react-router-dom";
import type { Movie, VideoClip } from "../../types";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const userProfile = useUserStore((s) => s.userProfile);
  const setUserProfile = useUserStore((s) => s.updateProfile);
  const movies = useMovieStore((s) => s.movies);
  const openStreaming = useMovieStore((s) => s.openStreaming);
  const toggleWatchlist = useUserStore((s) => s.toggleWatchlist);

  return (
    <UserDashboard
      userProfile={userProfile}
      setUserProfile={setUserProfile}
      moviesList={movies}
      onSelectMovie={(movie: Movie) => navigate(`/movie/${movie.id}`)}
      onOpenTrailer={(movie: Movie, clip?: VideoClip) => openStreaming(movie, clip)}
      onRemoveWatchlist={toggleWatchlist}
    />
  );
};
export default DashboardPage;
