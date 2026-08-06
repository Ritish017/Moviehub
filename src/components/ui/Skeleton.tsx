import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  width,
  height,
  rounded = "md",
}) => {
  const radiusMap = {
    sm:   "rounded-lg",
    md:   "rounded-xl",
    lg:   "rounded-2xl",
    xl:   "rounded-3xl",
    "2xl": "rounded-[24px]",
    full: "rounded-full",
  };

  return (
    <div
      className={`skeleton ${radiusMap[rounded]} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

/** Full movie card skeleton placeholder */
export const MovieCardSkeleton: React.FC = () => (
  <div className="flex flex-col gap-2.5 animate-fadeIn">
    <Skeleton className="w-full aspect-[3/4]" rounded="2xl" />
    <Skeleton className="w-3/4 h-3.5" rounded="sm" />
    <Skeleton className="w-1/2 h-2.5" rounded="sm" />
  </div>
);

/** Hero section skeleton */
export const HeroSkeleton: React.FC = () => (
  <div className="skeleton w-full rounded-3xl" style={{ height: "52vh", minHeight: 420 }} aria-hidden="true" />
);

/** Section header skeleton */
export const SectionSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => (
  <div className="space-y-8 animate-fadeIn">
    <div className="flex items-center justify-between">
      <Skeleton className="w-48 h-6" rounded="md" />
      <Skeleton className="w-20 h-4" rounded="md" />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: rows }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  </div>
);
