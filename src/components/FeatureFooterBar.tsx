import React from "react";
import { Sparkles, BarChart3, Users, Globe, UserCheck, Smartphone } from "lucide-react";

export const FeatureFooterBar: React.FC = () => {
  const pillars = [
    {
      title: "AI Powered Insights",
      desc: "Deep analysis, summaries and recommendations",
      icon: Sparkles,
      color: "text-purple-400",
    },
    {
      title: "Real-time Box Office",
      desc: "Live collection updates and industry analytics",
      icon: BarChart3,
      color: "text-amber-400",
    },
    {
      title: "Community Driven",
      desc: "Forums, reviews and discussions",
      icon: Users,
      color: "text-rose-400",
    },
    {
      title: "Global Cinema",
      desc: "Movies from all industries and languages",
      icon: Globe,
      color: "text-emerald-400",
    },
    {
      title: "Personalized Experience",
      desc: "Watchlists, ratings and smart recommendations",
      icon: UserCheck,
      color: "text-blue-400",
    },
    {
      title: "Cross Platform",
      desc: "Seamless experience across all devices",
      icon: Smartphone,
      color: "text-indigo-400",
    },
  ];

  return (
    <div className="bg-[#090b10] border-t border-white/10 py-6 px-4 sm:px-8 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="bg-[#12141d] border border-white/5 p-3.5 rounded-2xl space-y-1.5 hover:border-white/15 transition-all"
            >
              <Icon className={`w-4 h-4 ${p.color}`} />
              <p className="text-xs font-bold text-white font-sans line-clamp-1">{p.title}</p>
              <p className="text-[11px] text-gray-400 leading-tight line-clamp-2">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
