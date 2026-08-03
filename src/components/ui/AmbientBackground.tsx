import React from "react";

interface AmbientBackgroundProps {
  posterUrl?: string;
  backdropUrl?: string;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ backdropUrl, posterUrl }) => {
  const activeBg = backdropUrl || posterUrl || "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600&auto=format&fit=crop";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Primary Blurred Glow extracted from active poster/backdrop */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[120%] h-[75vh] opacity-30 blur-[130px] transition-all duration-1000 transform scale-110"
        style={{
          backgroundImage: `url(${activeBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Secondary Dynamic Color Pulse Orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px] animate-pulse pointer-events-none" />

      {/* Atmospheric Top-to-Bottom Gradient Mask */}
      <div className="absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-[#07080c]/50 via-[#07080c]/85 to-[#07080c]" />
      
      {/* Micro Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "28px 28px"
        }}
      />
    </div>
  );
};
