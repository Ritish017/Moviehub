import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Flame } from "lucide-react";

interface TickerItem {
  label: string;
  value: string;
  trend: "up" | "down" | string;
  gross: string;
  shows: string;
}

export const LiveMarketTickerBar: React.FC = () => {
  const [items, setItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    fetch("/api/cinema/bfilmy-marketstrip")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.items && data.items.length > 0) {
          setItems(data.items);
        }
      })
      .catch(() => {});
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full bg-[#0a0c12] border-b border-white/10 text-xs py-1.5 overflow-hidden relative select-none">
      <div className="flex items-center gap-6 animate-marquee whitespace-nowrap px-4">
        <div className="flex items-center gap-1 text-amber-400 font-bold font-mono shrink-0">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>BFILMY LIVE TRADE FEED:</span>
        </div>

        {items.map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-2 font-mono shrink-0">
            <span className="text-gray-300 font-semibold">{item.label}</span>
            <span className="text-emerald-400 font-bold">{item.gross}</span>
            <span className="text-gray-500 text-[10px]">({item.shows} shows)</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
              item.trend === "up" || !item.trend.includes("-")
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-red-500/20 text-red-400"
            }`}>
              {item.value}
            </span>
            <span className="text-white/20 ml-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
