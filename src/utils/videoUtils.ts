/**
 * MovieHub X - Video Utilities
 * Converts any YouTube URL, Shorts URL, or Video ID into a robust embed URL
 */

export const DEFAULT_TRAILER_ID = "1kF_n7Y546Q"; // Pushpa 2 / Kalki official trailer fallback

export function extractYouTubeVideoId(input?: string): string {
  if (!input || !input.trim()) return DEFAULT_TRAILER_ID;
  
  // Clean URL string
  const cleanInput = input.trim();

  // Match 11-character video ID across watch?v=, /embed/, /shorts/, youtu.be/, or raw 11-char ID
  const match = cleanInput.match(/(?:v=|\/embed\/|\/shorts\/|youtu\.be\/|v\/|^)([a-zA-Z0-9_-]{11})/);
  
  if (match && match[1]) {
    return match[1];
  }

  // Fallback cleanup if query parameters are attached
  const idOnly = cleanInput.split("?")[0].split("&")[0].split("/").pop();
  if (idOnly && idOnly.length === 11) {
    return idOnly;
  }

  return DEFAULT_TRAILER_ID;
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
