import React, { useState } from "react";
import {
  X,
  Play,
  Star,
  BarChart2,
  Users,
  MessageSquare,
  Sparkles,
  Award,
  Tv,
  Check,
  Bookmark,
  TrendingUp,
  Globe,
  Film,
  Send,
  Loader2
} from "lucide-react";
import { Movie, VideoClip, UserRole, AiMovieAnalysisResponse } from "../types";

interface MovieDetailModalProps {
  movie: Movie | null;
  onClose: () => void;
  onOpenTrailer: (movie: Movie, clip?: VideoClip) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movieId: string) => void;
  userRole: UserRole;
  userName: string;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  onClose,
  onOpenTrailer,
  isWatchlisted,
  onToggleWatchlist,
  userRole,
  userName,
}) => {
  if (!movie) return null;

  const [activeTab, setActiveTab] = useState<"clips" | "telemetry" | "cast" | "reviews" | "ai">("clips");
  const [selectedClip, setSelectedClip] = useState<VideoClip>(movie.videoClips[0] || {
    id: "def",
    title: `${movie.title} Official Trailer`,
    type: "Official Trailer",
    videoUrl: movie.featuredTrailerUrl,
    thumbnailUrl: movie.posterUrl,
    duration: movie.duration,
    isHD: true
  });

  // AI Analysis state
  const [aiAnalysis, setAiAnalysis] = useState<AiMovieAnalysisResponse | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // New review form state
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewTitle, setNewReviewTitle] = useState("");
  const [newRating, setNewRating] = useState(9);
  const [fanReviewsList, setFanReviewsList] = useState(movie.fanReviews);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim() || !newReviewTitle.trim()) return;

    const newRev = {
      id: `usr-${Date.now()}`,
      userName: userName,
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
      userRole: userRole,
      rating: newRating,
      reviewTitle: newReviewTitle,
      reviewText: newReviewText,
      likes: 1,
      date: "Just now"
    };

    setFanReviewsList([newRev, ...fanReviewsList]);
    setNewReviewText("");
    setNewReviewTitle("");
  };

  const handleGenerateAiAnalysis = async () => {
    setIsGeneratingAi(true);
    setAiError(null);
    try {
      const res = await fetch("/api/gemini/analyze-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieTitle: movie.title,
          language: movie.language,
          director: movie.director,
          budget: `₹${movie.budgetCrores} Crores`,
          boxOffice: `₹${movie.boxOfficeGrossCrores} Crores Worldwide`,
          plot: movie.synopsis
        })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAiAnalysis(data.analysis);
      } else {
        setAiError("Could not retrieve AI analysis at this time.");
      }
    } catch (err: any) {
      setAiError("Failed to connect to AI server endpoint.");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-5xl bg-[#0F1116] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-gray-400 hover:text-white flex items-center justify-center border border-white/10 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1116] via-[#0F1116]/60 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-24 sm:w-32 aspect-[2/3] object-cover rounded-xl shadow-2xl border border-white/10 hidden xs:block"
            />
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1 font-mono">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {movie.language}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-black">
                  {movie.boxOfficeStatus}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {movie.releaseYear} • {movie.duration}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-sans">
                {movie.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Directed by <span className="text-emerald-400 font-semibold">{movie.director}</span> • Music by <span className="text-white font-medium">{movie.musicDirector}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <button
                onClick={() => onToggleWatchlist(movie.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer font-mono ${
                  isWatchlisted
                    ? "bg-emerald-500 text-black border-emerald-400"
                    : "bg-white/5 hover:bg-white/10 text-white border-white/10"
                }`}
              >
                {isWatchlisted ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{isWatchlisted ? "In Watchlist" : "Watchlist"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 sm:px-8 bg-[#14171E] border-b border-white/5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("clips")}
            className={`flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "clips"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>HD Trailer & Clips ({movie.videoClips.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("telemetry")}
            className={`flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "telemetry"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Box Office Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab("cast")}
            className={`flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "cast"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Cast, Crew & Director</span>
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "reviews"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Reviews & Ratings</span>
          </button>

          <button
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "ai"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>AI Industry Analysis</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: HD TRAILER & VIDEO CLIPS */}
          {activeTab === "clips" && (
            <div className="space-y-6">
              
              {/* Active Video Player Frame */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl">
                <iframe
                  src={selectedClip.videoUrl}
                  title={selectedClip.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Clip Title & Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#14171E] p-4 rounded-xl border border-white/5">
                <div>
                  <div className="flex items-center gap-2 mb-1 font-mono">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
                      {selectedClip.type}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">1080p Full HD</span>
                  </div>
                  <h3 className="text-base font-bold text-white font-sans">{selectedClip.title}</h3>
                </div>
                <button
                  onClick={() => onOpenTrailer(movie, selectedClip)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg text-xs font-extrabold shadow flex items-center gap-2 self-start sm:self-auto cursor-pointer font-mono"
                >
                  <Play className="w-4 h-4 fill-current" /> Full Theater Mode
                </button>
              </div>

              {/* Clips Playlist Grid */}
              <div>
                <h4 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2 font-sans">
                  <Film className="w-4 h-4 text-emerald-400" /> Available Videos & Songs ({movie.videoClips.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {movie.videoClips.map((clip) => (
                    <div
                      key={clip.id}
                      onClick={() => setSelectedClip(clip)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                        selectedClip.id === clip.id
                          ? "bg-[#14171E] border-emerald-500"
                          : "bg-[#14171E] border-white/5 hover:bg-white/5"
                      }`}
                    >
                      <div className="relative w-24 aspect-video rounded-lg overflow-hidden shrink-0 bg-black">
                        <img src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-current" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate font-sans">{clip.title}</p>
                        <p className="text-[10px] text-emerald-400 font-mono">{clip.type}</p>
                        <p className="text-[10px] text-gray-500 font-mono mt-1">{clip.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: BOX OFFICE TELEMETRY */}
          {activeTab === "telemetry" && (
            <div className="space-y-6">
              
              {/* Financial Summary Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                <div className="p-4 bg-[#14171E] border border-white/5 rounded-2xl">
                  <p className="text-xs text-gray-500 font-medium">Worldwide Gross</p>
                  <p className="text-xl font-extrabold text-emerald-400 mt-1">₹{movie.boxOfficeGrossCrores} Cr</p>
                  <p className="text-[9px] text-gray-500 mt-1">All Markets Total</p>
                </div>

                <div className="p-4 bg-[#14171E] border border-white/5 rounded-2xl">
                  <p className="text-xs text-gray-500 font-medium">India Net Revenue</p>
                  <p className="text-xl font-extrabold text-white mt-1">₹{movie.indiaNetGrossCrores} Cr</p>
                  <p className="text-[9px] text-gray-500 mt-1">Domestic Box Office</p>
                </div>

                <div className="p-4 bg-[#14171E] border border-white/5 rounded-2xl">
                  <p className="text-xs text-gray-500 font-medium">Production Budget</p>
                  <p className="text-xl font-extrabold text-blue-400 mt-1">₹{movie.budgetCrores} Cr</p>
                  <p className="text-[9px] text-gray-500 mt-1">Declared Cost</p>
                </div>

                <div className="p-4 bg-[#14171E] border border-white/5 rounded-2xl">
                  <p className="text-xs text-gray-500 font-medium">ROI Return</p>
                  <p className="text-xl font-extrabold text-emerald-400 mt-1">+{movie.roiPercentage}%</p>
                  <p className="text-[9px] text-emerald-400 mt-1">Profitability Multiplier</p>
                </div>
              </div>

              {/* Review Sentiment Radar */}
              <div className="bg-[#14171E] border border-white/5 p-6 rounded-2xl space-y-4">
                <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Audience Review Sentiment Analysis</span>
                </h4>

                <div className="space-y-2 font-mono">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-emerald-400">Positive ({movie.reviewSentiment.positivePercentage}%)</span>
                    <span className="text-gray-400">Neutral ({movie.reviewSentiment.neutralPercentage}%)</span>
                    <span className="text-rose-400">Negative ({movie.reviewSentiment.negativePercentage}%)</span>
                  </div>
                  <div className="h-2 w-full bg-[#0F1116] rounded-full overflow-hidden flex">
                    <div style={{ width: `${movie.reviewSentiment.positivePercentage}%` }} className="bg-emerald-500 h-full" />
                    <div style={{ width: `${movie.reviewSentiment.neutralPercentage}%` }} className="bg-gray-500 h-full" />
                    <div style={{ width: `${movie.reviewSentiment.negativePercentage}%` }} className="bg-rose-500 h-full" />
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed bg-[#0F1116] p-3 rounded-xl border border-white/5">
                  <span className="font-bold text-emerald-400">Consensus: </span>
                  {movie.reviewSentiment.consensusSummary}
                </p>
              </div>

              {/* Demographics Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Age & Gender */}
                <div className="bg-[#14171E] border border-white/5 p-5 rounded-2xl space-y-3 font-mono">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">Audience Age Distribution</h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-gray-400 mb-1">
                        <span>18 - 24 Years (Youth)</span>
                        <span className="font-bold text-emerald-400">{movie.demographicBreakdown.age18To24}%</span>
                      </div>
                      <div className="h-1.5 bg-[#0F1116] rounded-full overflow-hidden">
                        <div style={{ width: `${movie.demographicBreakdown.age18To24}%` }} className="bg-emerald-400 h-full rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-gray-400 mb-1">
                        <span>25 - 34 Years (Core)</span>
                        <span className="font-bold text-blue-400">{movie.demographicBreakdown.age25To34}%</span>
                      </div>
                      <div className="h-1.5 bg-[#0F1116] rounded-full overflow-hidden">
                        <div style={{ width: `${movie.demographicBreakdown.age25To34}%` }} className="bg-blue-400 h-full rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-gray-400 mb-1">
                        <span>35+ Years (Family)</span>
                        <span className="font-bold text-emerald-300">{movie.demographicBreakdown.age35Plus}%</span>
                      </div>
                      <div className="h-1.5 bg-[#0F1116] rounded-full overflow-hidden">
                        <div style={{ width: `${movie.demographicBreakdown.age35Plus}%` }} className="bg-emerald-300 h-full rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regional Share */}
                <div className="bg-[#14171E] border border-white/5 p-5 rounded-2xl space-y-3 font-mono">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Regional Footfall Share</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    {movie.demographicBreakdown.topRegions.map((reg) => (
                      <div key={reg.region} className="flex items-center justify-between p-2 bg-[#0F1116] rounded-lg">
                        <span className="text-gray-400">{reg.region}</span>
                        <span className="font-bold text-emerald-400">{reg.footfallsPercentage}% Footfalls</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: CAST & DIRECTOR STYLE */}
          {activeTab === "cast" && (
            <div className="space-y-6">
              
              {/* Director Card */}
              <div className="bg-[#14171E] border border-white/5 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={movie.directorPhotoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"}
                  alt={movie.director}
                  className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500 shadow-xl"
                />
                <div className="flex-1 text-center sm:text-left">
                  <span className="px-2.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-mono">
                    Director Visionary
                  </span>
                  <h3 className="text-lg font-bold text-white font-sans mt-1">{movie.director}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Known for creating visually iconic Indian spectacles with memorable background scores.
                  </p>
                </div>
              </div>

              {/* Cast Cards */}
              <div>
                <h4 className="text-sm font-bold text-white font-sans mb-4">Lead Cast & Character Impact Index</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {movie.cast.map((actor) => (
                    <div key={actor.id} className="p-4 bg-[#14171E] border border-white/5 rounded-2xl flex items-center gap-4">
                      <img
                        src={actor.photoUrl}
                        alt={actor.name}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-white truncate font-sans">{actor.name}</h5>
                          <span className="text-[9px] bg-white/5 text-gray-400 px-1.5 py-0.5 rounded font-mono">
                            {actor.roleType}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">as <span className="text-white font-medium">{actor.characterName}</span></p>
                        
                        <div className="mt-2 font-mono">
                          <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                            <span>Screen Impact Score</span>
                            <span className="font-bold text-emerald-400">{actor.impactScore} / 100</span>
                          </div>
                          <div className="h-1.5 bg-[#0F1116] rounded-full overflow-hidden">
                            <div style={{ width: `${actor.impactScore}%` }} className="bg-emerald-400 h-full rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: REVIEWS & COMMUNITY RATINGS */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              
              {/* Add Custom Fan Review Form */}
              <form onSubmit={handleAddReview} className="bg-[#14171E] border border-white/5 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-white font-sans flex items-center gap-2">
                  <Star className="w-4 h-4 text-emerald-400" />
                  <span>Write a Fan / Critic Review as {userName} ({userRole})</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Review Title (e.g. Unmatched climax sequence!)"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    className="sm:col-span-2 bg-[#0F1116] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-xs text-gray-500">Rating:</span>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="bg-[#0F1116] border border-white/10 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold focus:outline-none"
                    >
                      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
                        <option key={num} value={num}>{num} ★</option>
                      ))}
                    </select>
                  </div>
                </div>

                <textarea
                  rows={2}
                  placeholder="Share your thoughts on performance, music, screenplay, or direction..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full bg-[#0F1116] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />

                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-black rounded-lg text-xs font-extrabold shadow hover:bg-emerald-400 flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  <Send className="w-3.5 h-3.5" /> Post Review
                </button>
              </form>

              {/* Critic Reviews */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono mb-3">Verified Critic Reviews</h4>
                <div className="space-y-3">
                  {movie.criticReviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-[#14171E] border border-white/5 rounded-2xl">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="text-xs font-bold text-white">{rev.criticName}</span>
                          <span className="text-xs text-gray-500 font-mono"> ({rev.publication})</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 font-mono">★ {rev.rating} / 5</span>
                      </div>
                      <p className="text-xs text-gray-300 italic">"{rev.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fan Reviews */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono mb-3">Community & Fan Reviews ({fanReviewsList.length})</h4>
                <div className="space-y-3">
                  {fanReviewsList.map((rev) => (
                    <div key={rev.id} className="p-4 bg-[#14171E] border border-white/5 rounded-2xl">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <img src={rev.userAvatar} alt={rev.userName} className="w-6 h-6 rounded-full object-cover" />
                          <div>
                            <span className="text-xs font-bold text-white">{rev.userName}</span>
                            <span className="text-[9px] text-emerald-400 ml-1.5 bg-emerald-500/10 px-1.5 py-0.2 rounded font-mono">{rev.userRole}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 font-mono">★ {rev.rating} / 10</span>
                      </div>
                      <h5 className="text-xs font-bold text-emerald-400 mt-2 font-sans">{rev.reviewTitle}</h5>
                      <p className="text-xs text-gray-300 mt-1">{rev.reviewText}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: AI DEEP ANALYSIS */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              
              <div className="bg-[#14171E] border border-white/5 p-6 rounded-2xl text-center space-y-3">
                <Sparkles className="w-6 h-6 text-emerald-400 mx-auto animate-spin" style={{ animationDuration: '6s' }} />
                <h3 className="text-base font-bold text-white font-sans">CineBharat AI Movie & Ecosystem Analysis</h3>
                <p className="text-xs text-gray-400 max-w-xl mx-auto">
                  Run Gemini 3.6 Flash server intelligence to extract producer executive notes, target demographics breakdown, script pacing radar, and regional crossover potential.
                </p>

                <button
                  onClick={handleGenerateAiAnalysis}
                  disabled={isGeneratingAi}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-lg shadow-lg shadow-emerald-500/20 transition-all cursor-pointer inline-flex items-center gap-2 disabled:opacity-50 font-mono"
                >
                  {isGeneratingAi ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Generating Deep AI Report...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Run AI Intelligence Scan
                    </>
                  )}
                </button>
              </div>

              {aiError && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl text-center font-mono">
                  {aiError}
                </div>
              )}

              {aiAnalysis && (
                <div className="space-y-4 animate-fadeIn">
                  
                  <div className="p-5 bg-[#14171E] border border-white/5 rounded-2xl">
                    <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono mb-2">Executive Summary</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{aiAnalysis.executiveSummary}</p>
                  </div>

                  <div className="p-5 bg-[#14171E] border border-white/5 rounded-2xl">
                    <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono mb-2">Commercial & Box Office Verdict</h4>
                    <p className="text-xs text-gray-300">{aiAnalysis.boxOfficeVerdict}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-[#14171E] border border-white/5 rounded-2xl">
                      <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono mb-2">Audience Demographics Target</h4>
                      <p className="text-xs text-gray-300">{aiAnalysis.targetAudienceDemographics}</p>
                    </div>

                    <div className="p-5 bg-[#14171E] border border-white/5 rounded-2xl">
                      <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono mb-2">Pan-Indian Industry Impact</h4>
                      <p className="text-xs text-gray-300">{aiAnalysis.industryImpact}</p>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
