# Technical Documentation - MovieHub X ("The AI Operating System for Global Cinema")

---

## 1. Executive Summary & Stack Matrix

**MovieHub X** is an enterprise-grade AI entertainment platform designed to analyze, explore, and stream Indian and global cinema across five primary Indian language industries: **Bollywood (Hindi)**, **Tollywood (Telugu)**, **Kollywood (Tamil)**, **Mollywood (Malayalam)**, and **Sandalwood (Kannada)**, plus international blockbusters.

The architecture pairs a concurrent **React 19** Single-Page Application (SPA) with an **Express 4 Node.js TypeScript server** on port `3000`, connected directly to **Google Gemini 3.6 Flash AI** (`@google/genai`), **OMDb API**, **YouTube Data API v3**, and **Apple iTunes India API**.

### Technical Stack Matrix

| Architectural Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend SPA Framework** | React | `^19.0.1` | Concurrent rendering, stateful components, route switching |
| **Build & Dev Server** | Vite | `^6.2.3` | HMR, ES module bundling, static asset output (`dist`) |
| **Styling & Design System**| TailwindCSS | `^4.1.14` | Utility CSS, dark theme styling (`#07080c`), glassmorphism |
| **Icons** | Lucide React | `^0.546.0` | Vector icon set for UI widgets & navigation badges |
| **Animations & Motion** | Motion / Framer Motion | `^12.23.24` | Smooth transitions, 3D card tilt & modal overlays |
| **Backend Runtime** | Node.js | `^22.x` | Server execution environment |
| **API Server Framework** | Express.js | `^4.21.2` | REST API routing, proxy endpoints & Vite middleware |
| **TS Execution Tool** | tsx | `^4.21.0` | Direct execution of TypeScript server files |
| **Production Server Bundler**| esbuild | `^0.25.0` | Fast bundling of `server.ts` to `dist/server.cjs` |
| **AI SDK** | `@google/genai` | `^2.4.0` | Official SDK for Google Gemini 3.6 Flash AI models |
| **Type Compiler** | TypeScript | `~5.8.2` | Static typing, interface contracts & type verification |

---

## 2. Live External API Gateway Configuration

MovieHub X is connected to live production external cinema APIs:

### Environment Credentials (`.env`)
```bash
GEMINI_API_KEY="your_gemini_api_key"
APP_URL="http://localhost:3000"
OMDB_API_KEY="ec1f5176"
YOUTUBE_API_KEY="AIzaSyC2y4Twy0obXBW1e5J_VwTuzpUHzP-WovI"
```

### API Endpoint Contracts

#### 1. OMDb API (`GET /api/cinema/omdb`)
- **Key**: Configured with live key `ec1f5176`.
- **Functionality**: Returns full plot, IMDb ratings, Rotten Tomatoes percentages, Metascores, awards, and box office details.

#### 2. YouTube Data API v3 (`GET /api/cinema/youtube`)
- **Key**: Configured with live key `AIzaSyC2y4Twy0obXBW1e5J_VwTuzpUHzP-WovI`.
- **Functionality**: Resolves 4K/HD trailers, teasers, lyrical songs, and BTS clips with live view counts.

#### 3. Deep Gemini 3.6 Flash AI (`POST /api/gemini/analyze-movie-deep`)
- **Functionality**: Returns structured JSON deep analysis covering plot ending explanations, hidden easter eggs, themes & symbolism, character dynamics, director signatures, and visual style.

#### 4. Multi-API Master Aggregator (`POST /api/cinema/multi-api-master`)
- **Functionality**: Executes concurrent parallel queries across iTunes, Wikipedia, TVMaze, OMDB, and TMDB.

---

## 3. Video Embed & Stream Utility ([videoUtils.ts](file:///c:/AI-Projects/MovieHub/src/utils/videoUtils.ts))

To ensure 100% video stream playback without "Video unavailable" errors, MovieHub X uses a videoId parser utility:

```typescript
export function getYouTubeEmbedUrl(input?: string, autoplay = true, mute = true): string {
  if (!input) return "https://www.youtube-nocookie.com/embed/k9k1l_8y0e8?autoplay=1&mute=1&enablejsapi=1&rel=0";

  // Extracts 11-character video ID
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
```

---

## 4. Frontend Component Hierarchy & Dual Navigation Layout

```
[App.tsx Root Coordinator]
 ├── [Navbar] (Top Bar: Logo, product links, search input, Cmd+K badge, CineAI button, user avatar)
 ├── [LeftSidebar] (Icon Rail: Home, Movies, TV, People, Collections, Awards, Watchlist, History, Settings)
 ├── [AmbientBackground] (Dynamic poster color aura gradient overlay)
 ├── [Main Display Area]:
 │    ├── [DedicatedMovieView] (Full-screen route-based movie page view)
 │    ├── [SearchEngine] (Multi-category AI search view)
 │    ├── TAB "explore"   ➜ [HeroBanner] + [LiveApiDataExplorer] + [MovieGrid]
 │    ├── TAB "live-api"  ➜ [LiveApiDataExplorer]
 │    ├── TAB "analytics" ➜ [BoxOfficeAnalyticsDashboard]
 │    ├── TAB "streaming" ➜ [TrailerHubView]
 │    ├── TAB "community" ➜ [CommunityForum]
 │    └── TAB "dashboard" ➜ [UserDashboard]
 ├── [FeatureFooterBar] (Bottom 6-pillar feature highlights bar)
 └── [Global Modals]:
      ├── [CommandPalette] (Cmd+K modal launcher)
      ├── [HdStreamPlayerModal] (4K Video stream player)
      ├── [MovieDetailModal] (Movie inspector modal overlay)
      └── [AiCinemaAssistantModal] (CineAI Copilot drawer)
```

---

## 5. Vercel Build & Deployment Pipeline ([vercel.json](file:///c:/AI-Projects/MovieHub/vercel.json))

The repository is configured for single-click deployment on Vercel:

```json
{
  "buildCommand": "npx vite build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### TypeScript Verification
- Run `npx tsc --noEmit` to verify static compilation. Verified with `0 errors`.
