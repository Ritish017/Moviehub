// src/server/tmdbService.ts
const TMDB_BASE = "https://api.themoviedb.org/3";

export async function tmdbFetch(endpoint: string, params: Record<string, string | number | boolean> = {}): Promise<any> {
  const token = process.env.TMDB_READ_ACCESS_TOKEN || process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY;
  if (!token) {
    console.error("[TMDB Error] Neither TMDB_READ_ACCESS_TOKEN, TMDB_API_KEY, nor VITE_TMDB_API_KEY is configured in environment variables.");
    throw new Error("TMDB_READ_ACCESS_TOKEN or TMDB_API_KEY not configured in environment variables");
  }

  const url = new URL(`${TMDB_BASE}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token.startsWith("eyJ")) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    url.searchParams.set("api_key", token);
  }

  console.log(`[TMDB Outgoing Request] ${url.toString()}`);

  const res = await fetch(url.toString(), {
    headers,
    signal: AbortSignal.timeout(10000),
  });

  if (res.status === 429) {
    console.warn(`[TMDB] 429 Rate Limit Hit. Retrying ${endpoint}...`);
    await new Promise(r => setTimeout(r, 2000));
    const retryRes = await fetch(url.toString(), {
      headers,
      signal: AbortSignal.timeout(10000),
    });
    if (!retryRes.ok) {
      const errText = await retryRes.text().catch(() => "");
      console.error(`[TMDB Retry Error] Status ${retryRes.status} on ${endpoint}: ${errText}`);
      throw new Error(`[TMDB] Retry Failed with status ${retryRes.status} on ${endpoint}`);
    }
    const data = await retryRes.json();
    console.log(`[TMDB Response Success] ${endpoint} -> ${JSON.stringify(data).slice(0, 300)}...`);
    return data;
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`[TMDB Request Failed] ${res.status} on ${url.toString()} - Raw Response: ${text}`);
    throw new Error(`[TMDB] ${res.status} on ${endpoint} - ${text}`);
  }
  
  const data = await res.json();
  console.log(`[TMDB Response Success] ${endpoint} -> Results count: ${data.results?.length ?? 'N/A'}`);
  return data;
}
