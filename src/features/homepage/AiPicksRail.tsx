import React from "react";
import { Sparkles, Brain, Flame, Heart, ShieldAlert, Award } from "lucide-react";
import { Movie } from "../../types";

interface AiPicksRailProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const AiPicksRail: React.FC<AiPicksRailProps> = ({ movies, onSelectMovie }) => {
  const collections = [
    { title: "Mind Bending", icon: Brain, color: "from-purple-600 to-indigo-600", movies: movies.slice(0, 4) },
    { title: "Weekend Binge", icon: Flame, color: "from-[#e50914] to-amber-500", movies: movies.slice(2, 6) },
    { title: "Hidden Gems", icon: Sparkles, color: "from-emerald-600 to-teal-600", movies: movies.slice(4, 8) },
    { title: "Underrated Masterpieces", icon: Award, color: "from-rose-600 to-pink-600", movies: movies.slice(1, 5) },
  ];

  return (
    <div className="my-10 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-serif flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" /> 🤖 AI Picks by Gemini 3.6 Flash
          </h2>
          <p className="text-xs text-gray-400 font-sans">
            AI-curated collections generated based on narrative depth, cinematography craft, and audience mood
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col) => {
          const Icon = col.icon;
          return (
            <div
              key={col.title}
              className="bg-[#12141d] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${col.color} text-white shadow`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white font-serif">{col.title}</h3>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
                  Gemini 3.6 Flash
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {col.movies.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => onSelectMovie(m)}
                    className="group cursor-pointer space-y-1"
                  >
                    <div className="aspect-[2/3] rounded-xl overflow-hidden bg-black border border-white/10 group-hover:border-purple-500/50 transition-all">
                      <img src={m.posterUrl} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-[11px] font-bold text-white truncate group-hover:text-purple-300 transition-colors font-sans">
                      {m.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
