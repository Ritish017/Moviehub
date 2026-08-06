import React from "react";
import { TrailerHubView } from "../../features/trailers/TrailerHubView";
import { useMovieStore } from "../../store/useMovieStore";
import type { Movie, VideoClip } from "../../types";

const TrailersPage: React.FC = () => {
  const movies = useMovieStore((s) => s.movies);
  const openStreaming = useMovieStore((s) => s.openStreaming);
  return (
    <TrailerHubView
      movies={movies}
      onOpenTrailer={(movie: Movie, clip?: VideoClip) => openStreaming(movie, clip)}
    />
  );
};
export default TrailersPage;
