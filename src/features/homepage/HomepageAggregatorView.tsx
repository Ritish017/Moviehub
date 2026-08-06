import React, { Suspense } from "react";
import { CinematicHero } from "../hero/CinematicHero";
import { HorizontalMovieRail } from "../../components/HorizontalMovieRail";
import { ErrorBoundary } from "../../components/ui/ErrorBoundary";
import { SectionSkeleton, HeroSkeleton } from "../../components/ui/Skeleton";
import { useContentStore } from "../../store/useContentStore";
import type { Movie, VideoClip, LanguageType } from "../../types";
import { Sparkles, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

interface HomepageAggregatorViewProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie, clip?: VideoClip) => void;
  watchlist: string[];
  onToggleWatchlist: (movieId: string) => void;
  selectedLanguage: LanguageType;
  setSelectedLanguage: (lang: LanguageType) => void;
}

export const HomepageAggregatorView: React.FC<HomepageAggregatorViewProps> = ({
  onSelectMovie,
  onOpenTrailer,
}) => {
  const trending = useContentStore((s) => s.trending);
  const nowPlaying = useContentStore((s) => s.nowPlaying);
  const popular = useContentStore((s) => s.popular);
  const bollywood = useContentStore((s) => s.bollywood);
  const netflix = useContentStore((s) => s.netflix);

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* 1. Cinematic Hero */}
      <ErrorBoundary>
        <Suspense fallback={<HeroSkeleton />}>
          <CinematicHero />
        </Suspense>
      </ErrorBoundary>

      {/* 2. Trending Now (Carousel) */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton rows={1} />}>
          <HorizontalMovieRail
            title="Trending This Week"
            movies={trending}
            onSelectMovie={onSelectMovie}
            onOpenTrailer={onOpenTrailer}
            isLarge={true}
          />
        </Suspense>
      </ErrorBoundary>

      {/* 3. Now in Cinemas (Carousel) */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton rows={1} />}>
          <HorizontalMovieRail
            title="Now In Cinemas"
            movies={nowPlaying}
            onSelectMovie={onSelectMovie}
            onOpenTrailer={onOpenTrailer}
          />
        </Suspense>
      </ErrorBoundary>

      {/* 4. AI Collections (Cinematic Banner Engine) */}
      <ErrorBoundary>
        <div className="px-10 lg:px-20 py-8">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-black text-white">AI Collections</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mind Bending */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative h-80 rounded-3xl overflow-hidden cursor-pointer group"
            >
              <img src="https://image.tmdb.org/t/p/original/8ZTVqvKdQ8QL0t0e6U1P60oA0d9.jpg" alt="Mind Bending" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <BrainCircuit className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2 font-serif">Mind-Bending Thrillers</h3>
                <p className="text-gray-300 text-sm">Films that will make you question reality, curated by CineAI.</p>
              </div>
            </motion.div>

            {/* Weekend Binge */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative h-80 rounded-3xl overflow-hidden cursor-pointer group"
            >
              <img src="https://image.tmdb.org/t/p/original/mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg" alt="Weekend Binge" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <Sparkles className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2 font-serif">The Weekend Binge</h3>
                <p className="text-gray-300 text-sm">High-octane action and epic blockbusters for your weekend.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </ErrorBoundary>

        {/* 5. Premium Streaming Hub */}
        <div className="px-10 lg:px-20 py-8">
          <h2 className="text-2xl font-bold text-white mb-6 font-serif">Included with your subscriptions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Netflix", color: "bg-red-600" },
              { name: "Prime Video", color: "bg-blue-600" },
              { name: "Apple TV+", color: "bg-black" },
              { name: "Disney+", color: "bg-blue-800" },
              { name: "Crunchyroll", color: "bg-orange-500" },
              { name: "JioHotstar", color: "bg-green-700" }
            ].map(provider => (
              <motion.div
                key={provider.name}
                whileHover={{ scale: 1.05 }}
                className={`${provider.color} h-24 rounded-2xl flex items-center justify-center cursor-pointer shadow-lg`}
              >
                <span className="text-white font-black tracking-tight text-lg">{provider.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 6. Top on Netflix (Carousel) */}
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton rows={1} />}>
            <HorizontalMovieRail
              title="Top on Netflix"
              movies={netflix}
              onSelectMovie={onSelectMovie}
              onOpenTrailer={onOpenTrailer}
            />
          </Suspense>
        </ErrorBoundary>

        {/* 7. Franchise Collections */}
        <div className="px-10 lg:px-20 py-8">
          <h2 className="text-2xl font-bold text-white mb-6 font-serif">Legendary Franchises</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Marvel Cinematic Universe", "Dune Saga", "Mission Impossible"].map((franchise, idx) => (
              <motion.div
                key={franchise}
                whileHover={{ scale: 1.02 }}
                className="h-48 rounded-2xl bg-[#121212] border border-white/10 relative overflow-hidden cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                {idx === 0 && <img src="https://image.tmdb.org/t/p/w500/rzdPqYx7Um4FUZeD8ucX1bkGu3O.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="" />}
                {idx === 1 && <img src="https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8vTFcl94JA.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="" />}
                {idx === 2 && <img src="https://image.tmdb.org/t/p/w500/4q2hz2m8hubgvijz8Ez0T2Os2Yv.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="" />}
                
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-1 font-serif">{franchise}</h3>
                  <p className="text-xs text-gray-400">View Collection Timeline →</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 8. Coming Soon Timeline */}
        <div className="px-10 lg:px-20 py-8">
          <h2 className="text-2xl font-bold text-white mb-6 font-serif flex items-center gap-2">
            Coming Soon
          </h2>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {[
              { date: "Dec 2026", title: "Avatar: Fire and Ash", studio: "20th Century Studios" },
              { date: "May 2027", title: "Avengers: Secret Wars", studio: "Marvel Studios" },
            ].map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#121212] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-white/5 bg-[#121212] hover:border-white/20 transition-colors shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">{item.date}</span>
                  </div>
                  <p className="text-sm text-gray-400">{item.studio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      
    </div>
  );
};
