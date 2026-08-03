import React from "react";
import {
  BarChart3,
  TrendingUp,
  Award,
  Globe2,
  DollarSign,
  PieChart,
  Layers,
  Sparkles,
  ArrowUpRight,
  Flame,
  Film
} from "lucide-react";
import { BOX_OFFICE_PAN_INDIA_TELEMETRY, INDIAN_MOVIES_DATABASE } from "../data/indianMovies";

export const BoxOfficeAnalyticsDashboard: React.FC = () => {
  const topRoiMovies = [...INDIAN_MOVIES_DATABASE].sort((a, b) => b.roiPercentage - a.roiPercentage);
  const topGrossers = [...INDIAN_MOVIES_DATABASE].sort((a, b) => b.boxOfficeGrossCrores - a.boxOfficeGrossCrores);

  return (
    <div className="space-y-8 my-8 animate-fadeIn">
      
      {/* Title Banner */}
      <div className="bg-[#14171E] border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <BarChart3 className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3 font-mono">
            <Flame className="w-3.5 h-3.5 text-emerald-400" /> PAN-INDIAN TELEMETRY CONSOLE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            Indian Film Industry Box Office Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
            Real-time trade analysis, regional revenue share distributions, ROI multipliers, and 1000+ Crore Club milestones across Tollywood, Bollywood, Kollywood, Mollywood, and Sandalwood.
          </p>
        </div>
      </div>

      {/* Quick Macro Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#14171E] border border-white/5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
            <span>2024 Pan-India Gross</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold flex items-center text-[10px]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +18.4%
            </span>
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 font-mono mt-2">
            ₹{BOX_OFFICE_PAN_INDIA_TELEMETRY.totalGrossCrores2024.toLocaleString()} Cr
          </p>
          <p className="text-[11px] text-gray-500 mt-1">Cumulative All-India Box Office</p>
        </div>

        <div className="p-5 bg-[#14171E] border border-white/5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
            <span>Market Share Leader</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold text-[10px]">29% Share</span>
          </div>
          <p className="text-3xl font-extrabold text-white font-sans mt-2">Tollywood</p>
          <p className="text-[11px] text-gray-500 mt-1">Telugu Cinema Industry (₹3,726 Cr)</p>
        </div>

        <div className="p-5 bg-[#14171E] border border-white/5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
            <span>1000 Cr+ Members</span>
            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-bold text-[10px]">8 Films</span>
          </div>
          <p className="text-3xl font-extrabold text-purple-400 font-sans mt-2">Elite Club</p>
          <p className="text-[11px] text-gray-500 mt-1">Pan-Indian Global Milestones</p>
        </div>

        <div className="p-5 bg-[#14171E] border border-white/5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
            <span>Highest ROI Winner</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold text-[10px]">2700% ROI</span>
          </div>
          <p className="text-3xl font-extrabold text-amber-300 font-sans mt-2">Kantara</p>
          <p className="text-[11px] text-gray-500 mt-1">Sandalwood Folklore Blockbuster</p>
        </div>
      </div>

      {/* Industry Share Distribution */}
      <div className="bg-[#14171E] border border-white/5 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-400" /> Regional Cinema Market Share Breakdown
            </h3>
            <p className="text-xs text-gray-400">Percentage contribution to total Indian box office revenue</p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 self-start sm:self-auto font-bold">
            Multi-Lingual Crossover Era
          </span>
        </div>

        {/* Visual Bar Stack */}
        <div className="h-5 w-full bg-black/60 rounded-lg overflow-hidden flex shadow-inner">
          {BOX_OFFICE_PAN_INDIA_TELEMETRY.industryShare.map((ind) => (
            <div
              key={ind.industry}
              style={{ width: `${ind.sharePercentage}%`, backgroundColor: ind.color }}
              className="h-full transition-all duration-500 hover:opacity-80"
              title={`${ind.industry}: ${ind.sharePercentage}%`}
            />
          ))}
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BOX_OFFICE_PAN_INDIA_TELEMETRY.industryShare.map((ind) => (
            <div key={ind.industry} className="p-3 bg-[#0F1116] border border-white/5 rounded-xl flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-xs shrink-0" style={{ backgroundColor: ind.color }} />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{ind.industry}</p>
                <p className="text-[10px] text-gray-400 font-mono font-semibold">{ind.sharePercentage}% Share</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: 1000 Cr Club vs Highest ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1000 Crore Club Leaderboard */}
        <div className="bg-[#14171E] border border-white/5 p-6 rounded-3xl shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" /> The ₹1000 Crore Club (All-Time Global)
          </h3>
          <p className="text-xs text-gray-400">Highest grossing Indian feature films worldwide</p>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {BOX_OFFICE_PAN_INDIA_TELEMETRY.top1000CroreClub.map((item, idx) => (
              <div key={item.title} className="p-3 bg-[#0F1116] border border-white/5 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs font-mono ${
                    idx === 0 ? "bg-emerald-500 text-black" : idx === 1 ? "bg-blue-500 text-white" : idx === 2 ? "bg-amber-500 text-black" : "bg-white/10 text-gray-400"
                  }`}>
                    #{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white font-sans">{item.title}</h4>
                    <p className="text-[10px] text-gray-500 font-mono">{item.language} • {item.year}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-extrabold text-emerald-400 font-mono">₹{item.gross} Cr</p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-wider">Worldwide Gross</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highest ROI Multiplier Leaderboard */}
        <div className="bg-[#14171E] border border-white/5 p-6 rounded-3xl shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" /> Top ROI Multiplier Champions
          </h3>
          <p className="text-xs text-gray-400">Films delivering highest profit returns on declared budget</p>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {topRoiMovies.map((movie, idx) => (
              <div key={movie.id} className="p-3 bg-[#0F1116] border border-white/5 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={movie.posterUrl} alt={movie.title} className="w-8 h-12 object-cover rounded-md border border-white/10" />
                  <div>
                    <h4 className="text-xs font-bold text-white font-sans">{movie.title}</h4>
                    <p className="text-[10px] text-gray-500 font-mono">
                      Budget: <span className="text-gray-300">₹{movie.budgetCrores} Cr</span> • Gross: <span className="text-emerald-400">₹{movie.boxOfficeGrossCrores} Cr</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-extrabold text-blue-400 font-mono">+{movie.roiPercentage}%</p>
                  <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">ROI Return</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
