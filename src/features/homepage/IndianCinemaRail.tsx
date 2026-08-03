import React, { useState } from "react";
import { Film, Globe, Flame } from "lucide-react";
import { Movie } from "../../types";

interface IndianCinemaRailProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const IndianCinemaRail: React.FC<IndianCinemaRailProps> = ({ movies, onSelectMovie }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<"Telugu" | "Hindi" | "Tamil" | "Malayalam" | "Kannada">("Telugu");

  const industries = [
    { key: "Telugu", label: "Tollywood (Telugu)" },
    { key: "Hindi", label: "Bollywood (Hindi)" },
    { key: "Tamil", label: "Kollywood (Tamil)" },
    { key: "Malayalam", label: "Mollywood (Malayalam)" },
    { key: "Kannada", label: "Sandalwood (Kannada)" },
  ];

  const filteredMovies = movies.filter(
    (m) => m.language.toLowerCase() === selectedIndustry.toLowerCase() || m.industry?.toLowerCase() === selectedIndustry.toLowerCase()
  );

  const displayMovies = filteredMovies.length > 0 ? filteredMovies : movies.slice(0, 5);

  return (
    <div className="my-10 space-y-4 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-serif flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-400" /> 🇮🇳 Indian Cinema Industry Hub
          </h2>
          <p className="text-xs text-gray-400 font-sans">
            Pan-Indian cinema powerhouse filtered across all 5 major film industries
          </p>
        </div>

        {/* Industry Switcher Buttons */}
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          {industries.map((ind) => (
            <button
              key={ind.key}
              onClick={() => setSelectedIndustry(ind.key as any)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedIndustry === ind.key
                  ? "bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/30"
                  : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayMovies.map((m) => (
          <div
            key={m.id}
            onClick={() => onSelectMovie(m)}
            className="bg-[#12141d] border border-white/10 rounded-2xl p-3 space-y-2 hover:border-emerald-400/50 transition-all group cursor-pointer"
          >
            <div className="aspect-[2/3] rounded-xl overflow-hidden bg-black relative">
              <img src={m.posterUrl} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-amber-400 font-bold text-[10px] backdrop-blur-md">
                ★ {m.rating}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-white font-serif truncate group-hover:text-emerald-300 transition-colors">{m.title}</p>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{m.language} • ₹{m.boxOfficeGrossCrores} Cr</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
