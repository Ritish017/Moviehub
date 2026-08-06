import React, { useState } from "react";
import { BarChart3, TrendingUp, DollarSign, Film, ArrowUpRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

export const BoxOfficeAnalyticsDashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<"overview" | "daily" | "weekly" | "monthly" | "yearly">("overview");

  const kpis = [
    { label: "Total Gross", value: "₹12,432 Cr", trend: "+14%", icon: DollarSign, color: "text-emerald-400" },
    { label: "Active Releases", value: "128", trend: "+5%", icon: Film, color: "text-blue-400" },
    { label: "Avg ROI", value: "245%", trend: "+12%", icon: TrendingUp, color: "text-purple-400" },
    { label: "Peak Velocity", value: "₹45 Cr/hr", trend: "+8%", icon: Activity, color: "text-red-400" },
  ];

  return (
    <div className="px-10 lg:px-20 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-white font-serif flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-red-500" /> Box Office Analytics
          </h2>
          <p className="text-gray-400 mt-2 font-medium">
            Real-time global cinematic performance metrics.
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
          {["overview", "weekly", "monthly", "yearly"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(t as any)}
              className={`px-5 py-2 rounded-full text-sm font-bold capitalize transition-all cursor-pointer ${
                timeFilter === t
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards (Apple Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-[#121212] border border-white/5 p-6 rounded-[2rem] shadow-xl relative overflow-hidden group hover:border-white/20 transition-colors cursor-default"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <kpi.icon className={`w-24 h-24 ${kpi.color} transform translate-x-4 -translate-y-4`} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-medium">{kpi.label}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
                  <ArrowUpRight className="w-3 h-3" /> {kpi.trend}
                </span>
              </div>
              <div className="text-4xl lg:text-5xl font-black text-white tracking-tight font-serif">
                {kpi.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
