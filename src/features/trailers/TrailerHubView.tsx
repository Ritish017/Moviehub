import React, { useState } from "react";
import { Play, Tv, Sparkles, Filter, Eye, Film, Volume2, Maximize2 } from "lucide-react";
import { Movie, VideoClip } from "../../types";

interface TrailerHubViewProps {
  movies: Movie[];
  onOpenTrailer: (movie: Movie, clip?: VideoClip) => void;
}

export const TrailerHubView: React.FC<TrailerHubViewProps> = ({ movies, onOpenTrailer }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const allClips = movies.flatMap((movie) =>
    movie.videoClips.map((clip) => ({
      ...clip,
      movieTitle: movie.title,
      backdropUrl: movie.backdropUrl,
      language: movie.language,
      movieObj: movie,
    }))
  );

  const filteredClips = selectedFilter === "All"
    ? allClips
    : allClips.filter((c) => c.type.toLowerCase().includes(selectedFilter.toLowerCase()));

  const featuredClip = allClips[0];

  return (
    <div className="space-y-8 my-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950/50 via-indigo-950/40 to-[#07080c] border border-purple-500/30 p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
          4K & 1080p Cinema Video Hub
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-serif mt-3 tracking-tight">
          Official Indian Cinema Trailer & Footage Player
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
          Powered by YouTube Data API v3. Experience official high-definition trailers, lyrical video songs, behind-the-scenes footage, and director commentaries across Bollywood, Tollywood, Kollywood, Mollywood, and Sandalwood.
        </p>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 mt-6">
          {["All", "Trailer", "Teaser", "Song", "Behind The Scenes"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === filter
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40"
                  : "bg-white/10 hover:bg-white/20 text-gray-300 border border-white/10"
              }`}
            >
              {filter === "All" ? "All Video Footage" : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Main Player Highlight */}
      {featuredClip && (
        <div className="bg-[#12141d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div 
            className="relative aspect-video w-full max-h-[500px] bg-black cursor-pointer group"
            onClick={() => onOpenTrailer(featuredClip.movieObj, featuredClip)}
          >
            <img
              src={featuredClip.backdropUrl}
              alt={featuredClip.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-400 text-black">
                  FEATURED STREAM
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mt-2">
                  {featuredClip.title}
                </h3>
                <p className="text-xs text-gray-300 mt-1">{featuredClip.movieTitle} • {featuredClip.duration} • {featuredClip.viewsCount || '10M+'} Views</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white font-serif flex items-center gap-2">
          <Film className="w-5 h-5 text-purple-400" /> Catalog Video Footage ({filteredClips.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClips.map((clip, idx) => (
            <div
              key={`${clip.id}-${idx}`}
              className="bg-[#12141d] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all shadow-xl group cursor-pointer"
              onClick={() => onOpenTrailer(clip.movieObj, clip)}
            >
              <div className="relative aspect-video w-full bg-black overflow-hidden">
                <img
                  src={clip.thumbnailUrl || clip.backdropUrl}
                  alt={clip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-amber-300 backdrop-blur-md">
                  {clip.language}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-white font-mono">
                  {clip.duration}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {clip.title}
                </h3>
                <p className="text-xs text-gray-400">{clip.movieTitle}</p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span className="text-purple-400 font-bold">{clip.type}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {clip.viewsCount || '1.5M'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
