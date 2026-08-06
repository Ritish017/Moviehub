// src/services/apiClient.ts

const BASE_URL = "/api";

export const api = {
  // Config
  getConfig: () => fetch(`${BASE_URL}/tmdb/config`).then(res => res.json()),
  getGenres: () => fetch(`${BASE_URL}/tmdb/genres`).then(res => res.json()),

  // Discovery
  getTrending: (page = 1) => fetch(`${BASE_URL}/tmdb/trending?page=${page}`).then(res => res.json()),
  getPopular: (page = 1) => fetch(`${BASE_URL}/tmdb/popular?page=${page}`).then(res => res.json()),
  getNowPlaying: (page = 1) => fetch(`${BASE_URL}/tmdb/now-playing?page=${page}`).then(res => res.json()),
  
  // Regional Cinema
  getBollywood: (page = 1) => fetch(`${BASE_URL}/tmdb/bollywood?page=${page}`).then(res => res.json()),
  getTollywood: (page = 1) => fetch(`${BASE_URL}/tmdb/tollywood?page=${page}`).then(res => res.json()),
  getKollywood: (page = 1) => fetch(`${BASE_URL}/tmdb/kollywood?page=${page}`).then(res => res.json()),
  getMollywood: (page = 1) => fetch(`${BASE_URL}/tmdb/mollywood?page=${page}`).then(res => res.json()),
  getSandalwood: (page = 1) => fetch(`${BASE_URL}/tmdb/sandalwood?page=${page}`).then(res => res.json()),

  // OTT Catalogs
  getNetflix: (page = 1) => fetch(`${BASE_URL}/tmdb/netflix?page=${page}`).then(res => res.json()),
  getPrime: (page = 1) => fetch(`${BASE_URL}/tmdb/prime?page=${page}`).then(res => res.json()),
  getHotstar: (page = 1) => fetch(`${BASE_URL}/tmdb/hotstar?page=${page}`).then(res => res.json()),
  getZee5: (page = 1) => fetch(`${BASE_URL}/tmdb/zee5?page=${page}`).then(res => res.json()),
  getSonyLiv: (page = 1) => fetch(`${BASE_URL}/tmdb/sonyliv?page=${page}`).then(res => res.json()),

  // Additional
  getMovie: (id: string) => fetch(`${BASE_URL}/tmdb/movie/${id}`).then(res => res.json()),
  getBoxOffice: () => fetch(`${BASE_URL}/tmdb/box-office`).then(res => res.json()),
  getByGenre: (genreId: number, page = 1) => fetch(`${BASE_URL}/tmdb/by-genre?genreId=${genreId}&page=${page}`).then(res => res.json()),
  
  // Search
  search: (query: string, page = 1) => fetch(`${BASE_URL}/cinema/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, page })
  }).then(res => res.json()),
};
