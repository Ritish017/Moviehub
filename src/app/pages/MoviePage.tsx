import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DedicatedMovieView } from "../../features/movies/DedicatedMovieView";
import { useMovieStore } from "../../store/useMovieStore";
import { useUserStore } from "../../store/useUserStore";
import type { Movie, VideoClip } from "../../types";
import { ArrowLeft } from "lucide-react";
import { api } from "../../services/apiClient";

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  const getMovieById = useMovieStore((s) => s.getMovieById);
  const setViewingMovie = useMovieStore((s) => s.setViewingMovie);
  const openStreaming = useMovieStore((s) => s.openStreaming);
  const watchlist = useUserStore((s) => s.userProfile.watchlist);
  const toggleWatchlist = useUserStore((s) => s.toggleWatchlist);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    
    // Check if it's a TMDB ID
    if (id.startsWith("tmdb-")) {
      api.getMovie(id).then(res => {
        if (res.success && res.data) {
          setMovie(res.data);
        } else {
          // fallback to store
          setMovie(getMovieById(id) || null);
        }
        setLoading(false);
      }).catch(() => {
        setMovie(getMovieById(id) || null);
        setLoading(false);
      });
    } else {
      // old format / local data fallback
      setMovie(getMovieById(id) || null);
      setLoading(false);
    }
  }, [id, getMovieById]);

  // Keep viewing movie in store for AmbientBackground
  useEffect(() => {
    if (movie) setViewingMovie(movie);
    return () => setViewingMovie(null);
  }, [movie, setViewingMovie]);

  const handleOpenTrailer = (m: Movie, clip?: VideoClip) => openStreaming(m, clip);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <span className="text-3xl">🎬</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Movie Not Found</h1>
        <p className="text-gray-400 max-w-sm">
          We couldn't find a movie with ID <code className="text-amber-400">{id}</code> in our database.
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f95716] text-white font-bold text-sm hover:bg-[#e04708] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <DedicatedMovieView
      movie={movie}
      onBack={() => navigate(-1)}
      onOpenTrailer={handleOpenTrailer}
      isWatchlisted={watchlist.includes(movie.id)}
      onToggleWatchlist={toggleWatchlist}
    />
  );
};

export default MoviePage;
