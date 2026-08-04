/**
 * MovieHub X - Image Utilities
 * Standardized poster/backdrop URL formatters, fallback artwork generators, and CORS color extraction.
 */

export const TMDB_POSTER_BASE_W500 = "https://image.tmdb.org/t/p/w500";
export const TMDB_BACKDROP_BASE_ORIGINAL = "https://image.tmdb.org/t/p/original";

export const FALLBACK_POSTER = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop";
export const FALLBACK_BACKDROP = "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600&auto=format&fit=crop";

/**
 * Returns a robust image URL or fallback placeholder if input is invalid/missing.
 */
export function getPosterUrl(pathOrUrl?: string): string {
  if (!pathOrUrl || pathOrUrl.trim() === "" || pathOrUrl === "N/A" || pathOrUrl === "null") {
    return FALLBACK_POSTER;
  }

  // If path is a relative TMDB path
  if (pathOrUrl.startsWith("/")) {
    return `${TMDB_POSTER_BASE_W500}${pathOrUrl}`;
  }

  // If already a full HTTP/HTTPS URL
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return `${TMDB_POSTER_BASE_W500}/${pathOrUrl}`;
}

export function getBackdropUrl(pathOrUrl?: string): string {
  if (!pathOrUrl || pathOrUrl.trim() === "" || pathOrUrl === "N/A" || pathOrUrl === "null") {
    return FALLBACK_BACKDROP;
  }

  if (pathOrUrl.startsWith("/")) {
    return `${TMDB_BACKDROP_BASE_ORIGINAL}${pathOrUrl}`;
  }

  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return `${TMDB_BACKDROP_BASE_ORIGINAL}/${pathOrUrl}`;
}

/**
 * Extract dominant RGB color from an image element or canvas safely
 */
export async function getDominantColorFromImageUrl(url: string): Promise<[number, number, number]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve([20, 24, 33]); // Fallback dark RGB

        canvas.width = 32;
        canvas.height = 32;
        ctx.drawImage(img, 0, 0, 32, 32);

        const imageData = ctx.getImageData(0, 0, 32, 32).data;
        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < imageData.length; i += 16) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
          count++;
        }

        resolve([
          Math.floor(r / (count || 1)),
          Math.floor(g / (count || 1)),
          Math.floor(b / (count || 1)),
        ]);
      } catch (e) {
        // Fallback on CORS error
        resolve([20, 24, 33]);
      }
    };

    img.onerror = () => {
      resolve([20, 24, 33]);
    };
  });
}
