import React, { useState } from "react";
import { BarChart3, TrendingUp, DollarSign, Film, Globe, PieChart, ArrowUpRight } from "lucide-react";

export const BoxOfficeAnalyticsDashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<"overview" | "daily" | "weekly" | "monthly" | "yearly">("overview");

  const topGrossers = [
    { rank: 1, title: "Kalki 2898 AD", gross: "₹1100 Cr+" },
    { rank: 2, title: "Pushpa 2: The Rule", gross: "₹970 Cr+" },
    { rank: 3, title: "Jawan", gross: "₹950 Cr+" },
    { rank: 4, title: "Animal", gross: "₹840 Cr+" },
    { rank: 5, title: "Salaar: Part 1", gross: "₹630 Cr+" },
  ];

  const industryShares = [
    { name: "Bollywood", percentage: 45, color: "bg-red-500" },
    { name: "Tollywood", percentage: 25, color: "bg-amber-400" },
    { name: "Kollywood", percentage: 15, color: "bg-purple-500" },
    { name: "Sandalwood", percentage: 10, color: "bg-emerald-400" },
    { name: "Mollywood", percentage: 5, color: "bg-blue-400" },
  ];

  return (
    <div className="space-y-6 my-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-serif flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-red-500" /> Box Office Analytics
          </h1>
          <p className="text-xs text-gray-400">
            Real-time collection updates, collection trends, and industry analytics
          </p>
        </div>

        {/* Time Filters matching Screen 05 */}
        <div className="flex gap-1.5 bg-[#12141d] p-1.5 rounded-xl border border-white/10 text-xs font-bold self-start sm:self-auto">
          {["overview", "daily", "weekly", "monthly", "yearly"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(t as any)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                timeFilter === t
                  ? "bg-[#e50914] text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 KPI Summary Cards matching Screen 05 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#12141d] border border-white/10 p-5 rounded-2xl space-y-1">
          <p className="text-xs text-gray-400 uppercase font-bold font-sans">Total Collection</p>
          <p className="text-2xl font-black text-white font-serif">₹12,432 Cr</p>
          <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% vs last month
          </p>
        </div>

        <div className="bg-[#12141d] border border-white/10 p-5 rounded-2xl space-y-1">
          <p className="text-xs text-gray-400 uppercase font-bold font-sans">India Net</p>
          <p className="text-2xl font-black text-emerald-400 font-serif">₹7,842 Cr</p>
          <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +22.1% vs last month
          </p>
        </div>

        <div className="bg-[#12141d] border border-white/10 p-5 rounded-2xl space-y-1">
          <p className="text-xs text-gray-400 uppercase font-bold font-sans">Overseas Gross</p>
          <p className="text-2xl font-black text-amber-400 font-serif">₹4,590 Cr</p>
          <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +15.2% vs last month
          </p>
        </div>

        <div className="bg-[#12141d] border border-white/10 p-5 rounded-2xl space-y-1">
          <p className="text-xs text-gray-400 uppercase font-bold font-sans">Releases</p>
          <p className="text-2xl font-black text-purple-400 font-serif">128</p>
          <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14 vs last month
          </p>
        </div>
      </div>

      {/* Main Collection Trend Chart matching Screen 05 */}
      <div className="bg-[#12141d] border border-white/10 p-6 rounded-3xl space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-serif">Collection Trend (Last 12 Months)</h3>
          <span className="text-xs text-gray-400 font-mono">in ₹ Crores</span>
        </div>

        {/* Visual Line Chart Graphic matching Screen 05 */}
        <div className="relative h-56 w-full flex items-end justify-between pt-6 px-2 gap-2">
          {/* Background Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
            <div className="border-b border-white w-full" />
            <div className="border-b border-white w-full" />
            <div className="border-b border-white w-full" />
            <div className="border-b border-white w-full" />
          </div>

          {[
            { month: "Jan", val: 65 },
            { month: "Feb", val: 80 },
            { month: "Mar", val: 55 },
            { month: "Apr", val: 90 },
            { month: "May", val: 110 },
            { month: "Jun", val: 140 },
            { month: "Jul", val: 160 },
            { month: "Aug", val: 125 },
            { month: "Sep", val: 95 },
            { month: "Oct", val: 130 },
            { month: "Nov", val: 175 },
            { month: "Dec", val: 200 },
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group z-10">
              <div
                className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-red-800 to-red-500 group-hover:from-red-600 group-hover:to-rose-400 transition-all shadow-lg shadow-red-900/30"
                style={{ height: `${(bar.val / 200) * 100}%` }}
              />
              <span className="text-[10px] text-gray-400 font-mono group-hover:text-white transition-colors">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Top Grossers & Industry Share Donut matching Screen 05 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Top Grossers */}
        <div className="bg-[#12141d] border border-white/10 p-6 rounded-3xl space-y-4 shadow-2xl">
          <h3 className="text-base font-bold text-white font-serif flex items-center justify-between">
            <span>Top Grossers</span>
            <span className="text-xs text-red-500 font-mono">2024 Benchmark</span>
          </h3>

          <div className="space-y-2.5">
            {topGrossers.map((g) => (
              <div key={g.rank} className="flex items-center justify-between p-3 rounded-2xl bg-[#07080c] border border-white/5 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-600/20 text-red-400 font-bold flex items-center justify-center text-xs">
                    {g.rank}
                  </span>
                  <span className="font-bold text-white font-sans">{g.title}</span>
                </div>
                <span className="text-emerald-400 font-bold">{g.gross}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Industry Share Donut Breakdown */}
        <div className="bg-[#12141d] border border-white/10 p-6 rounded-3xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-serif">Industry Share</h3>
            <span className="text-xs text-gray-400 font-mono">Total: ₹12,432 Cr</span>
          </div>

          <div className="space-y-3">
            {industryShares.map((ind) => (
              <div key={ind.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-300 font-sans">{ind.name}</span>
                  <span className="text-white font-bold">{ind.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-[#07080c] rounded-full overflow-hidden">
                  <div className={`h-full ${ind.color} rounded-full`} style={{ width: `${ind.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
