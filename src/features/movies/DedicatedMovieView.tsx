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
  DollarSign,
  Ticket,
  TrendingUp,
  ExternalLink,
  Zap,
  ExternalLink,
  Zap,
  Archive,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
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
    "overview" | "ai" | "timeline" | "cast" | "financials" | "reviews" | "videos" | "gallery" | "awards" | "recommendations"
  >("overview");

  const backdropSrc = getBackdropUrl(movie.backdropUrl);
  const posterSrc = getPosterUrl(movie.posterUrl);

  return (
    <div className="min-h-screen text-gray-100 font-sans pb-20 bg-black">
      {/* Sticky Top Back Navigation Bar */}
      <div className="sticky top-0 z-40 bg-black/50 backdrop-blur-2xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="flex items-center gap-4 text-xs font-bold tracking-wider">
          <span className="flex items-center gap-1.5 text-yellow-500">
            <Star className="w-4 h-4 fill-current" /> {movie.rating} / 10
          </span>
          {movie.boxOfficeGrossCrores && (
            <span className="text-emerald-400">
              ₹{movie.boxOfficeGrossCrores} Cr WW
            </span>
          )}
        </div>
      </div>

      {/* Hero Backdrop Spotlight */}
      <div className="relative w-full min-h-[70vh] lg:h-[80vh] flex flex-col justify-end">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={backdropSrc}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_BACKDROP; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        {/* Floating Hero Details */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 pb-16 flex flex-col md:flex-row items-end gap-12"
        >
          {/* Poster Box */}
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="hidden md:block w-64 lg:w-80 aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 shrink-0 transform translate-y-8"
          >
            <img
              src={posterSrc}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_POSTER; }}
            />
          </motion.div>

          {/* Details & Actions */}
          <div className="flex-1 space-y-6">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-300">
              {movie.apiSource || movie.dataSource === "live" ? (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/20">
                  <Zap className="w-3.5 h-3.5 fill-current" /> Live API
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/10 text-gray-400 rounded-full border border-white/10">
                  <Archive className="w-3.5 h-3.5" /> Curated
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-5xl lg:text-7xl font-black text-white font-serif tracking-tight leading-[1.1] drop-shadow-2xl">
                {movie.title}
              </h1>
              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className="text-xl lg:text-2xl text-gray-400 font-serif italic mt-2">{movie.originalTitle}</p>
              )}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-300">
              <span className="px-2 py-1 bg-white/10 rounded-md text-white border border-white/10">{movie.industry || movie.language}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" /> {movie.duration || "N/A"}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400" /> {movie.releaseYear}</span>
              <span className="flex items-center gap-2">
                {movie.genres.map(g => (
                  <span key={g} className="text-gray-400">{g}</span>
                ))}
              </span>
            </div>

            {/* Synopsis */}
            <p className="text-base text-gray-300 max-w-3xl leading-relaxed">
              {movie.synopsis}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onOpenTrailer(movie)}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-white/10 cursor-pointer"
              >
                <Play className="w-6 h-6 fill-current" /> Watch Trailer
              </button>

              <button
                onClick={() => setActiveTab("ai")}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer"
              >
                <Sparkles className="w-6 h-6 text-purple-400" /> AI Review
              </button>

              <button
                onClick={() => onToggleWatchlist(movie.id)}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer text-white"
                title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
              >
                {isWatchlisted ? <Check className="w-6 h-6 text-green-400" /> : <Plus className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Tabs & Information */}
        <div className="lg:col-span-2 space-y-8">
          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-4 text-xs sm:text-sm font-bold overflow-x-auto pb-1 scroll-rail">
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
              onClick={() => setActiveTab("cast")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "cast" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Cast & Crew
            </button>

            <button
              onClick={() => setActiveTab("videos")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "videos" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Trailers & Videos
            </button>
            
            <button
              onClick={() => setActiveTab("gallery")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "gallery" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Photo Gallery
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
              onClick={() => setActiveTab("timeline")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "timeline" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" /> Timeline & Universe
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "reviews" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Reviews & Sentiment
            </button>
            
            <button
              onClick={() => setActiveTab("awards")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "awards" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Awards & Honors
            </button>
            
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "recommendations" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              More Like This
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

          {/* TAB 7: VIDEOS */}
          {activeTab === "videos" && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-base font-bold text-white font-serif">All Trailers & Clips</h3>
              {movie.videoClips && movie.videoClips.length > 0 ? (
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
              ) : (
                <div className="p-8 text-center bg-[#12141d] border border-white/10 rounded-xl">
                  <p className="text-gray-400 text-sm">No videos available for this title yet.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 8: GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-base font-bold text-white font-serif">Photo Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="aspect-square bg-[#12141d] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-white/30 transition-all">
                  <img src={getPosterUrl(movie.posterUrl)} alt="Poster" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                {movie.backdropUrl && (
                  <div className="aspect-square bg-[#12141d] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-white/30 transition-all">
                    <img src={getBackdropUrl(movie.backdropUrl)} alt="Backdrop" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                )}
                {/* Fallback empty slots to show grid layout intent */}
                {[1, 2, 3, 4].map(i => (
                   <div key={i} className="aspect-square bg-[#12141d]/50 border border-white/5 rounded-xl flex items-center justify-center text-white/10">
                     <Tv className="w-8 h-8" />
                   </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: AWARDS */}
          {activeTab === "awards" && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-base font-bold text-white font-serif">Awards & Honors</h3>
              <div className="p-8 text-center bg-[#12141d] border border-amber-500/20 rounded-xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto text-amber-500">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-amber-400 font-bold text-sm">Awards data pending synchronization.</p>
                <p className="text-xs text-gray-400">We are currently integrating with external academy databases.</p>
              </div>
            </div>
          )}

          {/* TAB 10: RECOMMENDATIONS */}
          {activeTab === "recommendations" && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-base font-bold text-white font-serif">More Like This</h3>
              <div className="p-8 text-center bg-[#12141d] border border-white/10 rounded-xl">
                <p className="text-gray-400 text-sm">Recommendation engine is analyzing similar titles...</p>
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

          {/* Multi-Platform Availability & Booking Hub */}
          <div className="bg-[#12141d] border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-purple-400" /> Platform Availability
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">Synced Live</span>
            </h3>

            {/* OTT Streaming */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">OTT Streaming Services</p>
              {movie.streamingPlatforms && movie.streamingPlatforms.length > 0 ? (
                movie.streamingPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-bold text-white border border-white/5 hover:border-purple-500/30"
                  >
                    <span className="flex items-center gap-2">
                      <Tv className="w-3.5 h-3.5 text-purple-400" />
                      {platform.name}
                    </span>
                    <span className="text-purple-400 text-[11px] flex items-center gap-1">Stream <ExternalLink className="w-3 h-3" /></span>
                  </a>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-white/5 text-xs text-gray-400 font-mono">
                  Streaming rights announced post-theatrical window.
                </div>
              )}
            </div>

            {/* BookMyShow Theatrical Ticket Link */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Theatrical Booking</p>
              <a
                href={`https://in.bookmyshow.com/explore/movies`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 transition-all text-xs font-bold text-white shadow-lg shadow-pink-600/20"
              >
                <span className="flex items-center gap-2">
                  <Ticket className="w-4 h-4" /> BookMyShow Live Tickets
                </span>
                <span className="text-[11px] underline flex items-center gap-1">Book Now <ExternalLink className="w-3 h-3" /></span>
              </a>
            </div>

            {/* District24 Box Office Telemetry Badge */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <div className="flex items-center justify-between text-emerald-400 font-mono text-[11px] font-bold">
                <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> District24 Telemetry</span>
                <span>Active</span>
              </div>
              <p className="text-xs text-gray-300">
                Tracked across <span className="font-bold text-white">{movie.screenCount.toLocaleString()} screens</span> in all 28 states & 8 Union Territories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
