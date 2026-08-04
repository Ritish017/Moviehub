import React, { useEffect, useState } from "react";
import { getDominantColorFromImageUrl, getBackdropUrl } from "../../utils/imageUtils";

interface AmbientBackgroundProps {
  posterUrl?: string;
  backdropUrl?: string;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ backdropUrl, posterUrl }) => {
  const activeBg = getBackdropUrl(backdropUrl || posterUrl);
  const [rgb, setRgb] = useState<[number, number, number]>([120, 40, 200]); // Rich purple default

  useEffect(() => {
    let isMounted = true;
    if (activeBg) {
      getDominantColorFromImageUrl(activeBg).then((color) => {
        if (isMounted) {
          setRgb(color);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [activeBg]);

  const [r, g, b] = rgb;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Color Mesh Gradient extracted from current poster/backdrop */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[120%] h-[85vh] opacity-35 blur-[140px] transition-all duration-1000 transform scale-110"
        style={{
          background: `radial-gradient(circle at 50% 30%, rgba(${r}, ${g}, ${b}, 0.8) 0%, rgba(15, 17, 22, 0.95) 75%)`,
        }}
      />

      {/* Backdrop Blurred Texture */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[120%] h-[75vh] opacity-20 blur-[120px] transition-all duration-1000 transform scale-110"
        style={{
          backgroundImage: `url(${activeBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Ambient Pulse Orbs */}
      <div 
        className="absolute top-1/4 -right-20 w-96 h-96 rounded-full blur-[140px] animate-pulse pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)` }}
      />
      <div 
        className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full blur-[140px] animate-pulse pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: `rgba(${Math.min(r + 40, 255)}, ${Math.max(g - 20, 0)}, ${Math.max(b - 40, 0)}, 0.15)` }}
      />

      {/* Atmospheric Top-to-Bottom Gradient Mask */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#07080c]/40 via-[#07080c]/80 to-[#07080c]" />
      
      {/* Micro Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "28px 28px"
        }}
      />
    </div>
  );
};
