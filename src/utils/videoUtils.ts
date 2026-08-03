/**
 * Converts any YouTube URL or video ID into a clean, embeddable YouTube-nocookie URL
 */
export function getYouTubeEmbedUrl(input?: string, autoplay = true, mute = true): string {
  if (!input) {
    return "https://www.youtube-nocookie.com/embed/k9k1l_8y0e8?autoplay=1&mute=1&enablejsapi=1&rel=0";
  }

  // Extract 11-character video ID
  const match = input.match(/(?:v=|\/embed\/|youtu\.be\/|v\/|^)([a-zA-Z0-9_-]{11})/);
  const videoId = match ? match[1] : input.trim();

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: mute ? "1" : "0",
    enablejsapi: "1",
    rel: "0",
    modestbranding: "1",
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function getYouTubeThumbnailUrl(input?: string): string {
  if (!input) return "https://img.youtube.com/vi/k9k1l_8y0e8/maxresdefault.jpg";
  const match = input.match(/(?:v=|\/embed\/|youtu\.be\/|v\/|^)([a-zA-Z0-9_-]{11})/);
  const videoId = match ? match[1] : input.trim();
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
