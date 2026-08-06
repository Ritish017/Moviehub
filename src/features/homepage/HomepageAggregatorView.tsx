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

      {/* 5. Top on Netflix (Carousel) */}
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

      {/* 6. Popular Masterpieces */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton rows={1} />}>
          <HorizontalMovieRail
            title="Critically Acclaimed"
            movies={popular}
            onSelectMovie={onSelectMovie}
            onOpenTrailer={onOpenTrailer}
          />
        </Suspense>
      </ErrorBoundary>
      
    </div>
  );
};
