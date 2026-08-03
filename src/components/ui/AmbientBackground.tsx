import React from "react";

interface AmbientBackgroundProps {
  posterUrl?: string;
  backdropUrl?: string;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ backdropUrl }) => {
  if (!backdropUrl) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Primary Blurred Glow */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[120%] h-[70vh] opacity-25 blur-[120px] transition-all duration-1000 transform scale-110"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Secondary Bottom Gradient Mesh */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#07080c]/60 via-[#07080c]/90 to-[#07080c]" />
      
      {/* Ambient Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-[#ffffff] 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />
    </div>
  );
};
