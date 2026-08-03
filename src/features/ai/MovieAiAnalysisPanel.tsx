import React, { useState, useEffect } from "react";
import { Sparkles, HelpCircle, Eye, Layers, Users, RefreshCw, Send, ArrowRight } from "lucide-react";
import { Movie } from "../../types";

interface MovieAiAnalysisPanelProps {
  movie: Movie;
  onOpenCopilotDrawer?: () => void;
}

export const MovieAiAnalysisPanel: React.FC<MovieAiAnalysisPanelProps> = ({ movie, onOpenCopilotDrawer }) => {
  const [loading, setLoading] = useState(false);
  const [deepAnalysis, setDeepAnalysis] = useState<any>(null);
  const [activeSubTab, setActiveSubTab] = useState<"summary" | "ending" | "details" | "easter">("summary");
  const [copilotInput, setCopilotInput] = useState("");
  const [copilotMessages, setCopilotMessages] = useState<Array<{ role: "user" | "ai"; text: string; sources?: number[] }>>([
    {
      role: "ai",
      text: `The ending hints that Bhairava's journey has just begun. The seed of change is planted and the future of humanity depends on the choices of the few. It sets up the possibility of a sequel.`,
      sources: [1, 2, 3],
    },
  ]);

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

  const handleSendCopilot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;
    const msg = copilotInput.trim();
    setCopilotInput("");
    setCopilotMessages((prev) => [...prev, { role: "user", text: msg }]);

    setTimeout(() => {
      setCopilotMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Analyzing "${msg}" for ${movie.title}... ${movie.title} merges ancient puranic lore with 2898 AD cyberpunk visual grandeur under ${movie.director}'s direction.`,
          sources: [1, 2],
        },
      ]);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
      {/* Left 2 Columns: AI Insights Box (Matching Screen 03) */}
      <div className="lg:col-span-2 bg-[#12141d] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Sub-Tabs matching Screen 03 */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveSubTab("summary")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeSubTab === "summary"
                  ? "bg-white/10 text-white border border-white/20 shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              AI Summary
            </button>
            <button
              onClick={() => setActiveSubTab("ending")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeSubTab === "ending"
                  ? "bg-white/10 text-white border border-white/20 shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Ending Explained
            </button>
            <button
              onClick={() => setActiveSubTab("details")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeSubTab === "details"
                  ? "bg-white/10 text-white border border-white/20 shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Hidden Details
            </button>
            <button
              onClick={() => setActiveSubTab("easter")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeSubTab === "easter"
                  ? "bg-white/10 text-white border border-white/20 shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Easter Eggs
            </button>
          </div>

          <button
            onClick={fetchDeepAnalysis}
            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-bold cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        {/* AI Generated Summary Block */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" /> AI Generated Summary
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            {movie.synopsis}
          </p>
        </div>

        {/* Stat Counters Grid matching Screen 03 (Themes: 4, Symbols: 7, Connections: 12, Questions: 18) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#07080c] border border-white/10 p-3.5 rounded-2xl text-center space-y-0.5">
            <p className="text-xs font-bold text-gray-400 uppercase">Themes</p>
            <p className="text-2xl font-black text-amber-400 font-serif">4</p>
          </div>
          <div className="bg-[#07080c] border border-white/10 p-3.5 rounded-2xl text-center space-y-0.5">
            <p className="text-xs font-bold text-gray-400 uppercase">Symbols</p>
            <p className="text-2xl font-black text-purple-400 font-serif">7</p>
          </div>
          <div className="bg-[#07080c] border border-white/10 p-3.5 rounded-2xl text-center space-y-0.5">
            <p className="text-xs font-bold text-gray-400 uppercase">Connections</p>
            <p className="text-2xl font-black text-emerald-400 font-serif">12</p>
          </div>
          <div className="bg-[#07080c] border border-white/10 p-3.5 rounded-2xl text-center space-y-0.5">
            <p className="text-xs font-bold text-gray-400 uppercase">Questions</p>
            <p className="text-2xl font-black text-rose-400 font-serif">18</p>
          </div>
        </div>

        {/* Key Insights Bullet Points matching Screen 03 */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Key Insights</h4>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <span>The movie draws heavy inspiration from Hindu mythology, especially the Mahabharata.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
              <span>Complex characters with deep arcs and moral dilemmas.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <span>Stunning visuals and world building that expand Indian sci-fi genre.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
              <span>Provokes thoughts about destiny, free will and human evolution.</span>
            </li>
          </ul>
        </div>

        {/* Ask CineAI Copilot Action Button */}
        <button
          onClick={onOpenCopilotDrawer}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-purple-600 to-amber-500 text-white font-bold text-sm shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 fill-current" /> Ask CineAI Copilot
        </button>

      </div>

      {/* Right Column: CineAI Copilot Drawer matching Screen 03 */}
      <div className="bg-[#12141d] border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-2xl space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white font-serif">CineAI Copilot</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
              BETA
            </span>
          </div>

          {/* Chat Messages */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {copilotMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-purple-600/30 text-white ml-6 border border-purple-500/30"
                    : "bg-[#07080c] text-gray-300 border border-white/10"
                }`}
              >
                <p>{msg.text}</p>
                {msg.sources && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                    <span>Sources:</span>
                    {msg.sources.map((s) => (
                      <span key={s} className="px-1.5 py-0.2 bg-white/10 rounded text-gray-200">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendCopilot} className="relative">
          <input
            type="text"
            value={copilotInput}
            onChange={(e) => setCopilotInput(e.target.value)}
            placeholder="Ask anything about movies..."
            className="w-full bg-[#07080c] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 pr-9 font-sans"
          />
          <button
            type="submit"
            className="absolute right-2 top-2.5 p-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
