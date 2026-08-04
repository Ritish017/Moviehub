import React, { useState } from "react";
import {
  ArrowLeft,
  Play,
  Plus,
  Check,
  Clock,
  Calendar,
  Sparkles,
  Tv,
  Layers,
  DollarSign
} from "lucide-react";
import { Movie, VideoClip } from "../../types";
import { MovieAiAnalysisPanel } from "../ai/MovieAiAnalysisPanel";
import { getPosterUrl, getBackdropUrl, FALLBACK_POSTER, FALLBACK_BACKDROP } from "../../utils/imageUtils";

interface DedicatedMovieViewProps {
  movie: Movie;
  onBack: () => void;
  onOpenTrailer: (movie: Movie, clip?: VideoClip) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movieId: string) => void;
}

export const DedicatedMovieView: React.FC<DedicatedMovieViewProps> = ({
  movie,
  onBack,
  onOpenTrailer,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "ai" | "timeline" | "cast" | "financials" | "reviews"
  >("overview");

  const backdropSrc = getBackdropUrl(movie.backdropUrl);
  const posterSrc = getPosterUrl(movie.posterUrl);

  return (
    <div className="min-h-screen text-gray-100 font-sans pb-20 animate-fadeIn">
      {/* Sticky Top Back Navigation Bar */}
      <div className="sticky top-16 z-30 bg-[#07080c]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </button>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
            ★ {movie.rating} / 10
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            ₹{movie.boxOfficeGrossCrores} Cr WW
          </span>
        </div>
      </div>

      {/* Hero Backdrop Spotlight */}
      <div className="relative w-full h-[65vh] min-h-[480px] max-h-[700px] overflow-hidden">
        <img
          src={backdropSrc}
          alt={movie.title}
          className="w-full h-full object-cover object-center filter brightness-[0.7] transform scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_BACKDROP;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080c] via-transparent to-[#07080c]/80" />

        {/* Dynamic Ambient Poster Aura */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[130px] pointer-events-none" />

        {/* Floating Hero Details */}
        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 sm:px-8 pb-10 flex flex-col md:flex-row items-end gap-8">
          {/* Poster Box */}
          <div className="hidden md:block w-52 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 shrink-0 transform -translate-y-4 hover:scale-105 transition-transform duration-300">
            <img
              src={posterSrc}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_POSTER;
              }}
            />
          </div>

          {/* Details & Actions */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-amber-400">
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-white backdrop-blur-md">
                {movie.industry}
              </span>
              <span>•</span>
              <span>{movie.language}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {movie.duration}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {movie.releaseYear}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white font-serif tracking-tight drop-shadow-2xl">
              {movie.title}
            </h1>
            {movie.originalTitle && (
              <p className="text-lg text-amber-400 font-serif italic -mt-2">{movie.originalTitle}</p>
            )}

            <div className="flex flex-wrap gap-2 text-xs">
              {movie.genres.map((g) => (
                <span key={g} className="px-3 py-1 rounded-full bg-white/10 text-gray-200 backdrop-blur-md border border-white/10 font-semibold">
                  {g}
                </span>
              ))}
            </div>

            {/* Handcrafted Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenTrailer(movie)}
                className="px-6 py-3.5 rounded-2xl bg-[#e50914] hover:bg-red-700 text-white font-bold text-sm flex items-center gap-2 shadow-2xl shadow-red-900/40 hover:scale-105 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" /> Watch Official 4K Trailer
              </button>

              <button
                onClick={() => onToggleWatchlist(movie.id)}
                className={`px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 border backdrop-blur-md transition-all cursor-pointer ${
                  isWatchlisted
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                }`}
              >
                {isWatchlisted ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Tabs & Information */}
        <div className="lg:col-span-2 space-y-8">
          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-4 text-xs sm:text-sm font-bold overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "overview" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Overview & Plot
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "ai" ? "border-purple-400 text-purple-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" /> AI Breakdown
            </button>

            <button
              onClick={() => setActiveTab("timeline")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "timeline" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" /> Timeline & Universe
            </button>

            <button
              onClick={() => setActiveTab("cast")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "cast" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Cast & Crew
            </button>

            <button
              onClick={() => setActiveTab("financials")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "financials" ? "border-emerald-400 text-emerald-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Financial Telemetry
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "reviews" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Reviews & Sentiment
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#12141d] border border-white/10 p-6 rounded-2xl space-y-3">
                <h2 className="text-lg font-bold text-white font-serif">Storyline & Synopsis</h2>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">{movie.synopsis}</p>
              </div>

              {/* Financial Summary Widget */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#12141d] border border-white/10 p-4 rounded-xl space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-bold">Budget</p>
                  <p className="text-lg font-black text-white font-serif">₹{movie.budgetCrores} Cr</p>
                </div>
                <div className="bg-[#12141d] border border-white/10 p-4 rounded-xl space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-bold">WW Gross</p>
                  <p className="text-lg font-black text-emerald-400 font-serif">₹{movie.boxOfficeGrossCrores} Cr</p>
                </div>
                <div className="bg-[#12141d] border border-white/10 p-4 rounded-xl space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-bold">ROI</p>
                  <p className="text-lg font-black text-amber-400 font-serif">+{movie.roiPercentage}%</p>
                </div>
                <div className="bg-[#12141d] border border-white/10 p-4 rounded-xl space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-bold">Theaters</p>
                  <p className="text-lg font-black text-purple-400 font-serif">{movie.screenCount.toLocaleString()}</p>
                </div>
              </div>

              {/* Video Clips Showcase */}
              {movie.videoClips && movie.videoClips.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white font-serif">HD Trailers & Featured Clips ({movie.videoClips.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {movie.videoClips.map((clip) => (
                      <div
                        key={clip.id}
                        onClick={() => onOpenTrailer(movie, clip)}
                        className="bg-[#12141d] border border-white/10 rounded-xl overflow-hidden cursor-pointer group hover:border-purple-500/50 transition-all"
                      >
                        <div className="relative aspect-video bg-black">
                          <img
                            src={getPosterUrl(clip.thumbnailUrl || movie.posterUrl)}
                            alt={clip.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK_POSTER;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-bold text-white truncate">{clip.title}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{clip.type} • {clip.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pre-rendered AI Breakdown Block */}
              <MovieAiAnalysisPanel movie={movie} />
            </div>
          )}

          {/* TAB 2: AI BREAKDOWN */}
          {activeTab === "ai" && (
            <MovieAiAnalysisPanel movie={movie} />
          )}

          {/* TAB 3: TIMELINE & UNIVERSE */}
          {activeTab === "timeline" && (
            <div className="bg-[#12141d] border border-white/10 p-6 rounded-2xl space-y-4 animate-fadeIn">
              <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" /> Chronological Timeline & Franchise Universe
              </h3>
              <div className="border-l-2 border-amber-400/40 pl-4 space-y-4 text-xs text-gray-300">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300">
                    Phase 1: Ancient Lore & Puranic Origins
                  </span>
                  <p className="font-bold text-white text-sm">Kurukshetra Climax & Prophecy</p>
                  <p>Lord Krishna bestows the curse of immortality upon Ashwatthama, setting the timeline into motion.</p>
                </div>
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                    Phase 2: Dystopian Future (2898 AD)
                  </span>
                  <p className="font-bold text-white text-sm">Rise of Supreme Yaskin & The Complex</p>
                  <p>In the last city of Kasi, Supreme Yaskin extracts life-force serum from mothers to achieve godhood.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CAST & CREW */}
          {activeTab === "cast" && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-base font-bold text-white font-serif">Lead Cast & Key Performers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {movie.cast.map((member) => (
                  <div key={member.id} className="bg-[#12141d] border border-white/10 p-3.5 rounded-xl flex items-center gap-3">
                    <img
                      src={getPosterUrl(member.photoUrl)}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/20 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_POSTER;
                      }}
                    />
                    <div className="truncate">
                      <p className="text-xs font-bold text-white truncate">{member.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{member.characterName}</p>
                      <span className="text-[10px] text-amber-400 font-semibold">Impact Score: {member.impactScore}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FINANCIALS */}
          {activeTab === "financials" && (
            <div className="bg-[#12141d] border border-white/10 p-6 rounded-2xl space-y-4 animate-fadeIn">
              <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" /> Full Box Office Telemetry
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#07080c] p-4 rounded-xl border border-white/10">
                  <p className="text-gray-400">Budget</p>
                  <p className="text-lg font-bold text-white mt-1">₹{movie.budgetCrores} Cr</p>
                </div>
                <div className="bg-[#07080c] p-4 rounded-xl border border-white/10">
                  <p className="text-gray-400">India Net</p>
                  <p className="text-lg font-bold text-emerald-400 mt-1">₹{movie.indiaNetGrossCrores} Cr</p>
                </div>
                <div className="bg-[#07080c] p-4 rounded-xl border border-white/10">
                  <p className="text-gray-400">Overseas Gross</p>
                  <p className="text-lg font-bold text-blue-400 mt-1">₹{movie.overseasGrossCrores} Cr</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#12141d] border border-white/10 p-5 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase">Consensus Sentiment Analysis</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{movie.reviewSentiment.consensusSummary}</p>
                <div className="flex gap-4 pt-2 text-xs font-bold">
                  <span className="text-emerald-400">👍 {movie.reviewSentiment.positivePercentage}% Positive</span>
                  <span className="text-gray-400">😐 {movie.reviewSentiment.neutralPercentage}% Neutral</span>
                  <span className="text-red-400">👎 {movie.reviewSentiment.negativePercentage}% Negative</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Production Metadata */}
        <div className="space-y-6">
          <div className="bg-[#12141d] border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
              Production Metadata
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-gray-400">Director</p>
                <p className="font-bold text-white text-sm mt-0.5">{movie.director}</p>
              </div>
              <div>
                <p className="text-gray-400">Music Composer</p>
                <p className="font-bold text-white mt-0.5">{movie.musicDirector}</p>
              </div>
              <div>
                <p className="text-gray-400">Production House</p>
                <p className="font-bold text-white mt-0.5">{movie.productionHouse}</p>
              </div>
              {movie.cinematographer && (
                <div>
                  <p className="text-gray-400">Cinematographer</p>
                  <p className="font-bold text-white mt-0.5">{movie.cinematographer}</p>
                </div>
              )}
            </div>
          </div>

          {/* Streaming Platforms */}
          <div className="bg-[#12141d] border border-white/10 p-6 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Tv className="w-4 h-4 text-purple-400" /> Stream & Watch Online
            </h3>
            <div className="space-y-2">
              {movie.streamingPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold text-white"
                >
                  <span>{platform.name}</span>
                  <span className="text-purple-400">Stream ↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
