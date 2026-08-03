import React, { useState, useEffect } from "react";
import { Sparkles, HelpCircle, Eye, Layers, Users, Clapperboard, Palette, RefreshCw, MessageSquare, Clock } from "lucide-react";
import { Movie } from "../../types";

interface MovieAiAnalysisPanelProps {
  movie: Movie;
}

export const MovieAiAnalysisPanel: React.FC<MovieAiAnalysisPanelProps> = ({ movie }) => {
  const [loading, setLoading] = useState(false);
  const [deepAnalysis, setDeepAnalysis] = useState<any>(null);

  const fetchDeepAnalysis = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gemini/analyze-movie-deep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieTitle: movie.title,
          director: movie.director,
          synopsis: movie.synopsis,
        }),
      });
      const data = await res.json();
      if (data.success && data.deepAnalysis) {
        setDeepAnalysis(data.deepAnalysis);
      }
    } catch (err) {
      console.error("Deep AI Analysis fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeepAnalysis();
  }, [movie.id]);

  return (
    <div className="bg-[#12141d]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg text-white">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif flex items-center gap-2">
              Gemini 3.6 Flash Pre-Rendered AI Breakdown
            </h2>
            <p className="text-xs text-purple-300">
              Automatic film intelligence: Plot climax, ending explainer, hidden easter eggs, symbolism & character dynamics
            </p>
          </div>
        </div>

        <button
          onClick={fetchDeepAnalysis}
          disabled={loading}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Analyzing..." : "Re-Analyze with AI"}
        </button>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
          <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
          <p className="text-sm font-semibold text-gray-300">
            Pre-rendering AI Film Analysis via Gemini 3.6 Flash...
          </p>
        </div>
      ) : deepAnalysis ? (
        <div className="space-y-6 text-sm text-gray-200 animate-fadeIn">
          {/* SECTION 1: AI Ending Explained */}
          <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-transparent border border-purple-500/30 p-5 rounded-2xl space-y-2">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-400" /> AI Ending & Plot Resolution Explained
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              {deepAnalysis.endingExplained || `${movie.title}'s climax resolves key conflict lines while leaving thematic room for future installments.`}
            </p>
          </div>

          {/* SECTION 2: Hidden Details & Easter Eggs */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-400" /> Hidden Details & Easter Eggs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(deepAnalysis.hiddenDetails || []).map((detail: string, idx: number) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: Themes & Symbolism */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" /> Themes & Symbolism
            </h3>
            <div className="flex flex-wrap gap-2">
              {(deepAnalysis.themesAndSymbolism || []).map((theme: string, idx: number) => (
                <span key={idx} className="px-3.5 py-2 rounded-xl bg-purple-500/20 text-purple-200 border border-purple-500/30 text-xs font-bold">
                  ✨ {theme}
                </span>
              ))}
            </div>
          </div>

          {/* SECTION 4: Character Relationships */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" /> Character Dynamics & Relationships
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(deepAnalysis.characterRelationships || []).map((rel: any, idx: number) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-1">
                  <p className="text-xs font-bold text-amber-300">{rel.characters}</p>
                  <p className="text-xs text-gray-300">{rel.dynamic}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5: Director Signature & Visual Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1.5">
              <p className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clapperboard className="w-3.5 h-3.5" /> Director Signature
              </p>
              <p className="text-xs text-gray-300 leading-relaxed">
                {deepAnalysis.directorSignature || `${movie.director}'s signature involves grand scale compositions and high-octane set pieces.`}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1.5">
              <p className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> Visual Style & Lighting
              </p>
              <p className="text-xs text-gray-300 leading-relaxed">
                {deepAnalysis.visualStyleAnalysis || "Vibrant high-contrast lighting paired with rich color grading tailored for large format IMAX screens."}
              </p>
            </div>
          </div>

        </div>
      ) : null}
    </div>
  );
};
