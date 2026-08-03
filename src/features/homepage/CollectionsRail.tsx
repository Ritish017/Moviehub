import React from "react";
import { Layers, Film } from "lucide-react";

export const CollectionsRail: React.FC = () => {
  const universes = [
    { name: "Kalki Cinematic Universe", moviesCount: "3 Films", bg: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop" },
    { name: "Lokesh Cinematic Universe (LCU)", moviesCount: "5 Films", bg: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop" },
    { name: "Marvel Cinematic Universe (MCU)", moviesCount: "34 Films", bg: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop" },
    { name: "Dune Franchise", moviesCount: "3 Films", bg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop" },
    { name: "MonsterVerse (Godzilla x Kong)", moviesCount: "5 Films", bg: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop" },
    { name: "John Wick Universe", moviesCount: "4 Films", bg: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <div className="my-10 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-serif flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-400" /> 🎭 Collections & Franchise Universes
          </h2>
          <p className="text-xs text-gray-400 font-sans">
            Explore interconnected cinematic sagas, multi-part universes, and legendary film franchises
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {universes.map((uni) => (
          <div
            key={uni.name}
            className="relative h-44 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-lg hover:border-amber-400/50 transition-all"
          >
            <img src={uni.bg} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute bottom-3 inset-x-3 space-y-0.5">
              <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded font-bold">
                {uni.moviesCount}
              </span>
              <p className="text-xs font-bold text-white font-serif line-clamp-2 leading-snug">{uni.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
