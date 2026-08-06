// src/server/tmdbService.ts
const TMDB_BASE = "https://api.themoviedb.org/3";

export async function tmdbFetch(endpoint: string, params: Record<string, string | number | boolean> = {}): Promise<any> {
  const token = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!token) {
    throw new Error("TMDB_READ_ACCESS_TOKEN not configured in environment variables");
  }

  const url = new URL(`${TMDB_BASE}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  });

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (res.status === 429) {
    // Rate limited — wait 2s and retry once
    console.warn(`[TMDB] 429 Rate Limit Hit. Retrying ${endpoint}...`);
    await new Promise(r => setTimeout(r, 2000));
    const retryRes = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });
    if (!retryRes.ok) {
      throw new Error(`[TMDB] Retry Failed with status ${retryRes.status} on ${endpoint}`);
    }
    return retryRes.json();
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`[TMDB] ${res.status} on ${endpoint} - ${text}`);
  }
  
  return res.json();
}
