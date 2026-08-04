/**
 * MovieHub X - Video Utilities
 * Converts any YouTube URL or video ID into a robust embed URL with fallback parameters
 */

export const DEFAULT_TRAILER_ID = "k9k1l_8y0e8"; // Kalki 2898 AD trailer fallback

export function extractYouTubeVideoId(input?: string): string {
  if (!input || !input.trim()) return DEFAULT_TRAILER_ID;
  const match = input.match(/(?:v=|\/embed\/|youtu\.be\/|v\/|^)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : input.trim();
}

export function getYouTubeEmbedUrl(input?: string, autoplay = true, mute = true): string {
  const videoId = extractYouTubeVideoId(input);
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: mute ? "1" : "0",
    enablejsapi: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    origin: currentOrigin,
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function getYouTubeWatchUrl(input?: string): string {
  const videoId = extractYouTubeVideoId(input);
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYouTubeThumbnailUrl(input?: string): string {
  const videoId = extractYouTubeVideoId(input);
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
