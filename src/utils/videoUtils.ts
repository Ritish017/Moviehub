/**
 * MovieHub X - Video Utilities
 * Standardized YouTube embed URL generator, MP4 video detection, and thumbnail retriever.
 */

export const DEFAULT_TRAILER_ID = "1kF_n7Y546Q"; // Pushpa 2 / Kalki official trailer fallback

export function isDirectVideoUrl(input?: string): boolean {
  if (!input) return false;
  const clean = input.toLowerCase();
  return clean.includes(".mp4") || clean.includes(".m4v") || clean.includes(".webm") || clean.includes("audio-video.itunes.apple.com");
}

export function extractYouTubeVideoId(input?: string): string {
  if (!input || !input.trim()) return DEFAULT_TRAILER_ID;
  if (isDirectVideoUrl(input)) return DEFAULT_TRAILER_ID;

  const cleanInput = input.trim();
  const match = cleanInput.match(/(?:v=|\/embed\/|\/shorts\/|youtu\.be\/|v\/|^)([a-zA-Z0-9_-]{11})/);

  if (match && match[1]) {
    return match[1];
  }

  const idOnly = cleanInput.split("?")[0].split("&")[0].split("/").pop();
  if (idOnly && idOnly.length === 11) {
    return idOnly;
  }

  return DEFAULT_TRAILER_ID;
}

export function getYouTubeEmbedUrl(input?: string, autoplay = true, mute = false): string {
  const videoId = extractYouTubeVideoId(input);
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: mute ? "1" : "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    enablejsapi: "1"
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function getYouTubeWatchUrl(input?: string): string {
  if (isDirectVideoUrl(input)) return input || "";
  const videoId = extractYouTubeVideoId(input);
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYouTubeThumbnailUrl(input?: string): string {
  if (isDirectVideoUrl(input)) return "";
  const videoId = extractYouTubeVideoId(input);
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
