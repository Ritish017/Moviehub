import React from "react";
import { useSearchParams } from "react-router-dom";
import { SearchEngine } from "../../features/search/SearchEngine";
import { useMovieStore } from "../../store/useMovieStore";
import { useNavigate } from "react-router-dom";
import type { Movie, VideoClip } from "../../types";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const movies = useMovieStore((s) => s.movies);
  const openStreaming = useMovieStore((s) => s.openStreaming);

  const handleSelectMovie = (movie: Movie) => navigate(`/movie/${movie.id}`);
  const handleOpenTrailer = (movie: Movie, clip?: VideoClip) => openStreaming(movie, clip);

  return (
    <div className="my-8">
      <SearchEngine
        movies={movies}
        onSelectMovie={handleSelectMovie}
        onOpenTrailer={handleOpenTrailer}
        initialQuery={searchParams.get("q") ?? ""}
      />
    </div>
  );
};

export default SearchPage;
