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

  // 1. Raw 11-character Video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanInput)) {
    return cleanInput;
  }

  // 2. Specific YouTube URL patterns (watch?v=, /embed/, /shorts/, youtu.be/)
  const urlMatch = cleanInput.match(/(?:v=|\/embed\/|\/shorts\/|youtu\.be\/|v\/)([a-zA-Z0-9_-]{11})/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }

  // 3. Fallback path extraction
  try {
    const urlObj = new URL(cleanInput.startsWith("http") ? cleanInput : `https://${cleanInput}`);
    const vParam = urlObj.searchParams.get("v");
    if (vParam && vParam.length === 11) {
      return vParam;
    }
    const pathSegments = urlObj.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment && lastSegment.length === 11) {
      return lastSegment;
    }
  } catch (e) {
    // Ignore URL parse error
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
