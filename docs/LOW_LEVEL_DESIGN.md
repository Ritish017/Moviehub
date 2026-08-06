# MovieHub X — Low-Level Design (LLD) Document

## 1. System Architecture & High-Level Overview

MovieHub X is an enterprise Indian Cinema ecosystem and telemetry platform built with React 19, TypeScript, Express, and Google Gemini AI. It acts as a unified aggregator combining streaming platform availability (Netflix, Amazon Prime Video), live theatrical booking (BookMyShow), and all-India district box office telemetry (District24 / BFilmy).

```
+-----------------------------------------------------------------------------------+
|                                  BROWSER CLIENT                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                           React 19 SPA (Vite 6)                             |  |
|  |  +-------------------+   +--------------------+   +----------------------+  |  |
|  |  | Zustand App Store |   | Zustand MovieStore |   | Zustand User Store   |  |  |
|  |  +-------------------+   +--------------------+   +----------------------+  |  |
|  |                                                                             |  |
|  |  [ AppLayout ]                                                              |  |
|  |    +-- Navbar (Command Palette & Search)                                    |  |
|  |    +-- LiveMarketTickerBar                                                  |  |
|  |    +-- LeftSidebar Navigation                                               |  |
|  |    +-- React Router Outlets (HomePage, MoviePage, SearchPage, etc.)         |  |
|  |    +-- HdStreamPlayerModal & AiCopilotDrawer                                |  |
|  +-----------------------------------------------------------------------------+  |
+------------------------------------------+----------------------------------------+
                                           |
                                   HTTP / REST API Calls
                                           |
+------------------------------------------v----------------------------------------+
|                            VERCEL SERVERLESS / EXPRESS                            |
|  +-----------------------------------------------------------------------------+  |
|  |                         Express.js Router (server.ts)                       |  |
|  |  - /api/cinema/public-search   (Multi-source iTunes + Wiki + TVMaze)         |  |
|  |  - /api/cinema/bfilmy-marketstrip & live-boxoffice                            |  |
|  |  - /api/gemini/analyze-movie & analyze-movie-deep                             |  |
|  |  - /api/gemini/recommendations & industry-chat                              |  |
|  +-----------------------------------------------------------------------------+  |
+---------+------------------------------+-----------------------------+------------+
          |                              |                             |
          v                              v                             v
+------------------+           +------------------+          +------------------+
|  Google Gemini   |           | Public Public    |          | BFilmy / District|
|   3.6 Flash AI   |           | iTunes / Wiki /  |          | Live Box Office  |
|  (@google/genai) |           | TVMaze APIs      |          | JSON Gateways    |
+------------------+           +------------------+          +------------------+
```

---

## 2. End-to-End Execution & Data Flow Sequences

### Flow 1: Multi-Source Search & Client Fallback Lifecycle

```
[ User Inputs Query ] ---> [ SearchEngine Component ]
                                |
                   (300ms Debounce via useDebounce)
                                |
                                v
                [ searchMoviesMultiApi(query) ]
                                |
          +---------------------+---------------------+
          |                                           |
  (Try Server API)                            (On Failure / Static mode)
          |                                           |
          v                                           v
[ POST /api/cinema/public-search ]       [ Direct Fetch to Apple iTunes API ]
          |                              (https://itunes.apple.com/search)
  (Parallel Express Fetch)                            |
   +-- iTunes Search API                              v
   +-- Wikipedia REST API                [ Normalize to Movie[] schema ]
   +-- TVMaze API                                     |
          |                                           |
          +---------------------+---------------------+
                                |
                                v
                  [ Return MasterSearchResponse ]
                                |
                                v
               [ Render MovieCard Grid in UI ]
```

#### Detailed Low-Level Step Execution:
1. **Debounce Trigger**: User types `"Kalki"` in `SearchEngine.tsx`. `useDebounce(query, 300)` delays execution until typing pauses for 300ms.
2. **API Dispatch**: `searchMoviesMultiApi(query)` sends HTTP `POST` to `/api/cinema/public-search` with payload `{ query: "Kalki" }`.
3. **Server Execution**:
   - `server.ts` handles the request and fires three non-blocking parallel `fetch` calls:
     - `iTunes`: `https://itunes.apple.com/search?term=Kalki&entity=movie&country=IN&limit=10`
     - `Wikipedia`: `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Kalki%20film&format=json&origin=*`
     - `TVMaze`: `https://api.tvmaze.com/search/shows?q=Kalki`
   - `Promise.all` aggregates the response, transforms iTunes `artworkUrl100` into `600x600bb` high-res posters, and returns JSON payload.
4. **Resilience Fallback**: If the server endpoint returns non-JSON or a network error occurs, `apiAdapters.ts` catches the exception and immediately invokes a direct client-side fetch to `https://itunes.apple.com/search?media=movie&term=Kalki&limit=12`.
5. **UI Update**: Resulting `Movie[]` array updates local component state `apiResults` and renders responsive `MovieCard` elements with 3D tilt interactions.

---

### Flow 2: AI Deep Movie Breakdown & Symbolism Analysis

```
[ User Navigates to Movie Detail ] ---> [ MovieAiAnalysisPanel Component ]
                                                 |
                                     (Click "Generate AI Analysis")
                                                 |
                                                 v
                               [ fetchGeminiDeepAnalysis(title) ]
                                                 |
                                                 v
                               [ POST /api/gemini/analyze-movie-deep ]
                                                 |
                                                 v
                              [ Initialize GoogleGenAI SDK ]
                                                 |
                                                 v
                              [ Call gemini-3.6-flash Model ]
                               (responseMimeType: "application/json")
                                                 |
                                                 v
                              [ Parse & Validate Structured JSON ]
                                                 |
                                                 v
                               [ Render Radar Charts & Themes UI ]
```

#### Low-Level Server-Side Prompt & Gemini SDK Execution:
- **SDK Call**:
  ```ts
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: promptString,
    config: { responseMimeType: "application/json" }
  });
  ```
- **Fallback Guarantee**: If `GEMINI_API_KEY` is missing, `server.ts` returns pre-curated fallback JSON (`isMock: true`) ensuring zero UI disruption.

---

### Flow 3: Live Streaming & Video Player Resolution

```
[ User Clicks "Watch Trailer" ] ---> [ Trigger onOpenTrailer(movie, clip) ]
                                                |
                                                v
                                [ Update Zustand MovieStore ]
                              (setStreamingContext(movie, clip))
                                                |
                                                v
                              [ AppLayout Renders HdStreamPlayerModal ]
                                                |
                                                v
                            [ videoUtils.ts Analyzes Video URL ]
                                                |
                       +------------------------+------------------------+
                       |                                                 |
            (Direct MP4 / M4V Stream)                          (YouTube Video URL)
                       |                                                 |
                       v                                                 v
         [ Render HTML5 <video> Tag ]                       [ Extract 11-char Video ID ]
          <video src={url} controls>                                     |
                                                                         v
                                                            [ Render Safe YouTube Embed ]
                                                            https://www.youtube.com/embed/{id}?autoplay=1
```

---

## 3. Data Models & TypeScript Interfaces

### Core Movie Data Architecture (`src/types/movie.ts`)

```typescript
export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  language: "All" | "Hindi" | "Telugu" | "Tamil" | "Malayalam" | "Kannada" | "Pan-India";
  industry: string;
  releaseYear: number;
  releaseDate: string;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  rating: number; // 0-10
  userRatingCount: number;
  synopsis: string;
  duration: string;

  // Financial Telemetry
  budgetCrores: number;
  boxOfficeGrossCrores: number;
  indiaNetGrossCrores: number;
  overseasGrossCrores: number;
  roiPercentage: number;
  boxOfficeStatus: string;
  screenCount: number;

  // Cast & Crew
  director: string;
  directorPhotoUrl?: string;
  cast: CastMember[];
  musicDirector: string;
  productionHouse: string;
  cinematographer?: string;

  // Media & Video
  featuredTrailerUrl: string;
  videoClips: VideoClip[];

  // Analytics & AI
  reviewSentiment: ReviewSentiment;
  demographicBreakdown: DemographicBreakdown;
  directorStyleRadar: DirectorStyleRadar;

  // Multi-Platform & Booking
  streamingPlatforms: StreamingPlatform[];
  awards: string[];
  tags: string[];
  criticReviews: CriticReview[];
  fanReviews: FanReview[];

  // Metadata Flags
  isTrending?: boolean;
  isEditorPick?: boolean;
  apiSource?: string;
}

export interface StreamingPlatform {
  name: string;
  logoUrl: string;
  directUrl: string;
}

export interface VideoClip {
  id: string;
  title: string;
  type: "Official Trailer" | "Teaser" | "Lyrical Song" | "Behind The Scenes" | "Director Commentary" | "Official iTunes Trailer";
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  isHD: boolean;
  viewsCount?: string;
  isDirectMp4?: boolean;
}
```

---

## 4. Component Hierarchy & Application State Architecture

### Component Tree Map

```
App (App.tsx)
 └── AppRouter (src/app/router.tsx)
      └── AppLayout (src/app/layouts/AppLayout.tsx)
           ├── AmbientBackground
           ├── LiveMarketTickerBar
           ├── Navbar (CommandPalette trigger, Search, AI Copilot trigger)
           ├── LeftSidebar (Tab Navigation, Mobile Drawer)
           ├── Main Content (<Outlet>)
           │    ├── HomePage (CinematicHero, MovieGrid, StreamingAndPlatformHub, IndianCinemaRail, ComingSoonRail, AiPicksRail, CollectionsRail, BoxOfficeAnalyticsDashboard, CommunityForum)
           │    ├── MoviePage (DedicatedMovieView, MovieAiAnalysisPanel)
           │    ├── SearchPage (SearchEngine)
           │    ├── AnalyticsPage (BoxOfficeAnalyticsDashboard)
           │    ├── CommunityPage (CommunityForum)
           │    ├── DashboardPage
           │    └── LiveApiPage
           ├── HdStreamPlayerModal (Global Video/Trailer Modal)
           ├── AiCopilotDrawer (Slide-over CineAI Chat Assistant)
           ├── CommandPalette (Global search overlay: Cmd+K)
           └── FeatureFooterBar
```

### State Management via Zustand Stores

1. **`useAppStore`** (`src/store/useAppStore.ts`):
   - Controls global UI overlays: `isAiCopilotOpen`, `isCommandPaletteOpen`, `activeMobileMenu`.
   - Actions: `openAiCopilot()`, `closeAiCopilot()`, `openCommandPalette()`, `closeCommandPalette()`.

2. **`useMovieStore`** (`src/store/useMovieStore.ts`):
   - Controls selected movie context, trailer player state, and watchlist IDs.
   - States: `viewingMovie: Movie | null`, `streamingContext: { movie: Movie; clip?: VideoClip } | null`, `watchlist: string[]`.
   - Actions: `setViewingMovie(movie)`, `openStreaming(movie, clip)`, `closeStreaming()`, `toggleWatchlist(movieId)`.

3. **`useUserStore`** (`src/store/useUserStore.ts`):
   - Stores user preferences and persona metadata.
   - States: `userProfile: { name: string; role: string; preferredLanguages: string[] }`.

---

## 5. API Endpoints Directory & Low-Level Interfaces

| Endpoint | Method | Input Parameters | Primary Output Payload |
| :--- | :--- | :--- | :--- |
| `/api/cinema/public-search` | `POST` | `{ query: string }` | `{ success: boolean, counts: object, itunesMovies: Movie[], wikipediaItems: array, tvmazeShows: array }` |
| `/api/cinema/bfilmy-marketstrip` | `GET` | None | `{ success: boolean, items: [{ label, value, trend, gross, shows }] }` |
| `/api/cinema/bfilmy-live-boxoffice` | `GET` | None | `{ success: boolean, movies: array }` |
| `/api/gemini/analyze-movie` | `POST` | `{ movieTitle, language, director, budget, boxOffice, plot }` | `{ success: boolean, analysis: AiMovieAnalysisResponse }` |
| `/api/gemini/analyze-movie-deep` | `POST` | `{ movieTitle, director, synopsis }` | `{ success: boolean, deepAnalysis: AiDeepAnalysisResponse }` |
| `/api/gemini/recommendations` | `POST` | `{ preferredLanguages, favoriteGenres, userRole, watchHistory }` | `{ success: boolean, recommendations: array }` |
| `/api/gemini/industry-chat` | `POST` | `{ userMessage, userRole }` | `{ success: boolean, reply: string }` |

---

## 6. Caching & Performance Optimizations

1. **In-Memory Cache (`src/cache/memoryCache.ts`)**:
   - Time-to-Live (TTL) key-value store used to cache external API responses (iTunes, Wikipedia, BFilmy) for 5 minutes (300,000 ms), reducing redundant network roundtrips.
2. **Dynamic Image SrcSet Generation (`src/utils/imageUtils.ts`)**:
   - Automatically injects high-density image URLs (`w342` for mobile thumbnails, `w500` for grid cards, `original` for IMAX backdrops).
3. **Route Lazy Loading (`src/app/router.tsx`)**:
   - Code-splits all page chunks (`HomePage`, `MoviePage`, `SearchPage`, etc.) using React `lazy()` and `Suspense` skeletons.
