import React from "react";
import { LiveApiDataExplorer } from "../../components/LiveApiDataExplorer";
import { useMovieStore } from "../../store/useMovieStore";
import { useNavigate } from "react-router-dom";
import type { Movie, VideoClip } from "../../types";

const LiveApiPage: React.FC = () => {
  const navigate = useNavigate();
  const openStreaming = useMovieStore((s) => s.openStreaming);
  return (
    <LiveApiDataExplorer
      onSelectMovie={(movie: Movie) => navigate(`/movie/${movie.id}`)}
      onOpenTrailer={(movie: Movie, clip?: VideoClip) => openStreaming(movie, clip)}
    />
  );
};
export default LiveApiPage;
