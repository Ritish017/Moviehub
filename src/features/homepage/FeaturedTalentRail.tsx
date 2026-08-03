import React from "react";
import { Users, Video, Star } from "lucide-react";

export const FeaturedTalentRail: React.FC = () => {
  const actors = [
    { name: "Prabhas", role: "Rebel Star", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", landmark: "Kalki 2898 AD, Baahubali, Salaar" },
    { name: "Deepika Padukone", role: "Global Icon", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop", landmark: "Kalki 2898 AD, Jawan, Pathaan" },
    { name: "Amitabh Bachchan", role: "Legendary Actor", photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop", landmark: "Kalki 2898 AD, Sholay, Don" },
    { name: "Shah Rukh Khan", role: "King of Cinema", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop", landmark: "Jawan, Pathaan, Dunki" },
    { name: "Fahadh Faasil", role: "Master Performer", photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop", landmark: "Pushpa 2, Aavesham, Vikram" },
  ];

  const directors = [
    { name: "Christopher Nolan", trademark: "70mm IMAX Practical Spectacles", landmark: "Oppenheimer, Interstellar, Inception" },
    { name: "S.S. Rajamouli", trademark: "Mythological Pan-Indian Cinema", landmark: "RRR, Baahubali 1 & 2" },
    { name: "Nag Ashwin", trademark: "Dystopian Sci-Fi World-Building", landmark: "Kalki 2898 AD, Mahanati" },
    { name: "Denis Villeneuve", trademark: "Atmospheric Visual Soundscapes", landmark: "Dune Part 1 & 2, Blade Runner 2049" },
    { name: "Lokesh Kanagaraj", trademark: "Gritty Cinematic Universe (LCU)", landmark: "Vikram, Leo, Kaithi" },
  ];

  return (
    <div className="my-10 space-y-8 animate-fadeIn">
      {/* Featured Actors */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-serif flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" /> ⭐ Featured Visionary Actors
          </h2>
          <p className="text-xs text-gray-400 font-sans">
            Top performers driving worldwide box office records and iconic cinema roles
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {actors.map((actor) => (
            <div
              key={actor.name}
              className="bg-[#12141d] border border-white/10 p-4 rounded-2xl flex flex-col items-center text-center space-y-2 hover:border-purple-500/50 transition-all group cursor-pointer"
            >
              <img
                src={actor.photoUrl}
                alt={actor.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/40 group-hover:scale-105 transition-transform"
              />
              <div>
                <p className="text-sm font-bold text-white font-serif group-hover:text-purple-300 transition-colors">{actor.name}</p>
                <p className="text-[11px] text-amber-400 font-mono">{actor.role}</p>
                <p className="text-[10px] text-gray-400 line-clamp-1 mt-1 font-sans">{actor.landmark}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Directors */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-serif flex items-center gap-2">
            <Video className="w-6 h-6 text-amber-400" /> 🎬 Master Auteur Directors
          </h2>
          <p className="text-xs text-gray-400 font-sans">
            Visionary filmmakers defining modern cinema craft and visual storytelling
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {directors.map((dir) => (
            <div
              key={dir.name}
              className="bg-[#12141d] border border-white/10 p-4 rounded-2xl space-y-2 hover:border-amber-400/50 transition-all group cursor-pointer"
            >
              <div className="space-y-1">
                <p className="text-sm font-bold text-white font-serif group-hover:text-amber-300 transition-colors">{dir.name}</p>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono font-bold inline-block">
                  Auteur Director
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-tight font-sans">{dir.trademark}</p>
              <p className="text-[10px] text-gray-400 font-mono border-t border-white/10 pt-2">{dir.landmark}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
