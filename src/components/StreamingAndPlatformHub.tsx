import React, { useState } from "react";
import { Tv, ExternalLink, Ticket, TrendingUp, Sparkles, Filter } from "lucide-react";
import { Movie, VideoClip } from "../types";
import { getPosterUrl, FALLBACK_POSTER } from "../utils/imageUtils";

interface StreamingAndPlatformHubProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie, clip?: VideoClip) => void;
}

type PlatformFilter = "all" | "netflix" | "prime" | "bookmyshow" | "district";

const PLATFORM_CONFIG: Record<PlatformFilter, { name: string; iconColor: string; badgeBg: string; description: string }> = {
  all: {
    name: "All Networks",
    iconColor: "text-[#f95716]",
    badgeBg: "bg-[#f95716]/10 text-[#f95716] border-[#f95716]/30",
    description: "Combined catalog across Netflix, Prime Video, BookMyShow & District24 live telemetry",
  },
  netflix: {
    name: "Netflix India",
    iconColor: "text-red-500",
    badgeBg: "bg-red-500/10 text-red-400 border-red-500/30",
    description: "Official Netflix India streaming lineup & top 10 trending blockbusters",
  },
  prime: {
    name: "Amazon Prime Video",
    iconColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    description: "Prime Video exclusives, early rental access, and multi-lingual originals",
  },
  bookmyshow: {
    name: "BookMyShow (Theatrical)",
    iconColor: "text-pink-500",
    badgeBg: "bg-pink-500/10 text-pink-300 border-pink-500/30",
    description: "Live theater showtimes, IMAX 3D seating occupancy & instant ticket booking",
  },
  district: {
    name: "District24 / BFilmy Telemetry",
    iconColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    description: "Real-time all-India district box office tracking, screen count & occupancy rates",
  },
};

export const StreamingAndPlatformHub: React.FC<StreamingAndPlatformHubProps> = ({
  movies,
  onSelectMovie,
  onOpenTrailer,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<PlatformFilter>("all");

  const filteredMovies = movies.filter((m) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "netflix") {
      return m.streamingPlatforms?.some((p) => p.name.toLowerCase().includes("netflix"));
    }
    if (selectedFilter === "prime") {
      return m.streamingPlatforms?.some((p) => p.name.toLowerCase().includes("prime"));
    }
    if (selectedFilter === "bookmyshow") {
      return m.boxOfficeStatus.toLowerCase().includes("blockbuster") || m.boxOfficeStatus.toLowerCase().includes("hit") || m.isTrending;
    }
    if (selectedFilter === "district") {
      return m.boxOfficeGrossCrores > 500;
    }
    return true;
  });

  return (
    <div className="bg-[#0f1118] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#f95716]/20 border border-[#f95716]/40 flex items-center justify-center text-[#f95716]">
              <Tv className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-serif tracking-tight">
              Multi-Platform Cinema Aggregator
            </h2>
          </div>
          <p className="text-xs text-gray-400 font-sans max-w-2xl">
            {PLATFORM_CONFIG[selectedFilter].description}
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Synced with Netflix • Prime • BookMyShow • District24</span>
        </div>
      </div>

      {/* Platform Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold font-sans">
        {(Object.keys(PLATFORM_CONFIG) as PlatformFilter[]).map((key) => {
          const cfg = PLATFORM_CONFIG[key];
          const isSelected = selectedFilter === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedFilter(key)}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#181b26] text-white border-[#f95716] shadow-lg shadow-[#f95716]/20 font-black"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Filter className={`w-3.5 h-3.5 ${cfg.iconColor}`} />
              <span>{cfg.name}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Platform Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMovies.map((movie) => {
          const poster = getPosterUrl(movie.posterUrl);

          return (
            <div
              key={movie.id}
              className="group relative bg-[#141722] border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-[#f95716]/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="flex gap-4">
                {/* Poster */}
                <div
                  onClick={() => onSelectMovie(movie)}
                  className="w-24 aspect-[2/3] rounded-xl overflow-hidden bg-[#07080c] shrink-0 border border-white/10 cursor-pointer group-hover:scale-105 transition-transform"
                >
                  <img
                    src={poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_POSTER;
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#f95716]/20 text-[#f95716] uppercase border border-[#f95716]/30">
                      {movie.language}
                    </span>
                    <span className="text-[11px] text-amber-400 font-bold font-mono">
                      ★ {movie.rating}
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectMovie(movie)}
                    className="text-base font-bold text-white font-serif truncate cursor-pointer hover:text-[#f95716] transition-colors"
                  >
                    {movie.title}
                  </h3>

                  <p className="text-xs text-gray-400 truncate">
                    Dir: {movie.director}
                  </p>

                  <div className="text-[11px] text-emerald-400 font-mono font-bold pt-1">
                    WW Gross: ₹{movie.boxOfficeGrossCrores} Cr
                  </div>
                </div>
              </div>

              {/* Action & Availability Bar */}
              <div className="pt-2 border-t border-white/5 space-y-2">
                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                  {movie.streamingPlatforms?.map((p) => (
                    <span
                      key={p.name}
                      className="px-2 py-0.5 rounded bg-white/10 text-gray-200 border border-white/10 flex items-center gap-1"
                    >
                      <Tv className="w-3 h-3 text-purple-400" /> {p.name}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1">
                    <Ticket className="w-3 h-3 text-pink-400" /> BookMyShow
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" /> District24 Top 10
                  </span>
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-2 text-xs pt-1">
                  <a
                    href="https://bookmyshow.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 text-white font-bold text-center flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Ticket className="w-3.5 h-3.5" /> Book Tickets <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => onOpenTrailer(movie)}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1 border border-white/10 transition-all cursor-pointer"
                  >
                    Trailer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
