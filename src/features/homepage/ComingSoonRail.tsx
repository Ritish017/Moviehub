import React from "react";
import { Clock, Calendar, Sparkles, Film } from "lucide-react";

export const ComingSoonRail: React.FC = () => {
  const upcomingFilms = [
    {
      title: "Spider-Man 4",
      daysLeft: 12,
      releaseDate: "Dec 16, 2024",
      studio: "Marvel / Sony Pictures",
      expectations: "Multiverse Climax & Street-Level War",
      posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Ramayana: Part 1",
      daysLeft: 28,
      releaseDate: "Dec 30, 2024",
      studio: "Namit Malhotra VFX",
      expectations: "₹800 Cr Epic Visual Spectacle",
      posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Dune Messiah",
      daysLeft: 64,
      releaseDate: "Feb 05, 2025",
      studio: "Legendary / Warner Bros",
      expectations: "Denis Villeneuve Sci-Fi Finale",
      posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Kalki 2898 AD Part 2",
      daysLeft: 140,
      releaseDate: "Apr 20, 2025",
      studio: "Vyjayanthi Movies",
      expectations: "Supreme Yaskin & Ashwatthama War",
      posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <div className="my-10 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-serif flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-400" /> 🎬 Coming Soon & Release Countdowns
          </h2>
          <p className="text-xs text-gray-400 font-sans">
            Track upcoming global blockbusters with live countdown timers and AI expectations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {upcomingFilms.map((film) => (
          <div
            key={film.title}
            className="bg-[#12141d] border border-white/10 rounded-2xl p-4 space-y-3 hover:border-amber-400/50 transition-all group"
          >
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black">
              <img src={film.posterUrl} alt={film.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-amber-500 text-black font-black text-xs font-mono shadow">
                ⏳ {film.daysLeft} Days Left
              </div>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-mono uppercase">{film.studio}</span>
              <h3 className="text-base font-bold text-white font-serif truncate">{film.title}</h3>
              <p className="text-xs text-amber-400 font-mono mt-0.5 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {film.releaseDate}
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-purple-300 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="truncate">{film.expectations}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
