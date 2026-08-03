# Technical Documentation - MovieHub X ("The AI Operating System for Global Cinema")

---

## 1. Executive Technical Summary & Architecture

**MovieHub X** is an enterprise-grade AI entertainment platform engineered to analyze, track, and stream Indian and global cinema across five primary Indian language industries: **Bollywood (Hindi)**, **Tollywood (Telugu)**, **Kollywood (Tamil)**, **Mollywood (Malayalam)**, and **Sandalwood (Kannada)**, alongside global Hollywood blockbusters.

The platform pairs a concurrent **React 19** Single-Page Application (SPA) with an **Express 4 Node.js TypeScript server** running on port `3000`, connected directly to **Google Gemini 3.6 Flash AI** (`@google/genai`), **OMDb API**, **YouTube Data API v3**, and **Apple iTunes India API**.

### Technical Stack Matrix

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.0.1` | Concurrent rendering, stateful components, route switching |
| **Build & Dev Server** | Vite | `^6.2.3` | HMR, ES module bundling, static asset output (`dist`) |
| **Styling & Design System**| TailwindCSS | `^4.1.14` | Utility CSS, dark theme styling (`#07080c`), glassmorphic panels |
| **Icons** | Lucide React | `^0.546.0` | Vector icon set for UI widgets & navigation badges |
| **Animations & Motion** | Motion / Framer Motion | `^12.23.24` | Smooth transitions, 3D card tilt & modal overlays |
| **Backend Runtime** | Node.js | `^22.x` | Server execution environment |
| **API Server Framework** | Express.js | `^4.21.2` | REST API routing, proxy endpoints & Vite middleware |
| **TS Execution Tool** | tsx | `^4.21.0` | Direct execution of TypeScript server files |
| **Production Server Bundler**| esbuild | `^0.25.0` | Fast bundling of `server.ts` to `dist/server.cjs` |
| **AI SDK** | `@google/genai` | `^2.4.0` | Official SDK for Google Gemini 3.6 Flash AI models |
| **Type Compiler** | TypeScript | `~5.8.2` | Static typing, interface contracts & type verification |

---

## 2. 17-Point Enterprise Audit Technical Implementation

1. **Visual Hierarchy**: Enforces a strict visual reading order (`Hero Backdrop -> Title & CTAs -> Pre-rendered AI -> Catalog -> Analytics -> Community`).
2. **Full-Viewport Hero**: `85vh` height on desktop, auto-playing video backdrop preview, ambient glow, floating title logo.
3. **Simplified Navigation**: Top Header Bar + Left Icon Rail Sidebar (`LeftSidebar.tsx`).
4. **Interactive 3D Tilt Cards**: `MovieCard.tsx` with spring physics, poster glow, live video hover preview, AI score badge, and quick action bar.
5. **Dedicated Route Page**: Immersive `/movie/:id` experience (`DedicatedMovieView.tsx`).
6. **Pre-Rendered Automatic AI Intelligence**: `MovieAiAnalysisPanel.tsx` renders AI ending explanations, hidden easter eggs, themes, character dynamics, and director signatures on load.
7. **Cinema Mode Trailer Hub & Fallback**: `HdStreamPlayerModal.tsx` with `getYouTubeEmbedUrl` helper and **"Watch on YouTube ↗"** fallback action.
8. **Per-Movie Financial Telemetry**: In-page breakdown of India Net vs Overseas Gross, Budget ratio, ROI %, and screen counts.
9. **Multi-Dimensional AI Search Engine**: `SearchEngine.tsx` supporting natural language, actors, directors, awards, dialogue quotes, moods, and voice queries.
10. **Personal Watchlist & Folders**: Poster grid, statistics, custom lists, and Year in Review.
11. **Verified Community Platform**: Verified critic badges, movie clubs, collaborative lists, and trending discussions.
12. **Physics-Based Motion Design**: CSS spring easing and smooth opacity transitions.
13. **Dynamic Poster Color Extraction**: `AmbientBackground.tsx` calculates dominant poster color and animates atmospheric gradient mesh overlays.
14. **Typography System**: Serif headlines (`font-serif font-black`) paired with muted mono metadata (`font-mono text-xs`).
15. **Data Authenticity**: Strict policy removing static fake counters. Verified data powered by live OMDb (`ec1f5176`) and YouTube API v3 (`AIzaSyC2y4Twy0obXBW1e5J_VwTuzpUHzP-WovI`).
16. **Responsive Adaptivity**: Tested layouts across Mobile, Tablet, Desktop, and TV screens.
17. **Performance & Vercel Pipeline**: `vercel.json` SPA build configuration (`buildCommand: "npx vite build"`, `outputDirectory: "dist"`). Clean compilation with `0 errors`.

---

## 3. Video Embed & Stream Helper ([videoUtils.ts](file:///c:/AI-Projects/MovieHub/src/utils/videoUtils.ts))

```typescript
export function getYouTubeEmbedUrl(input?: string, autoplay = true, mute = true): string {
  if (!input) return "https://www.youtube-nocookie.com/embed/k9k1l_8y0e8?autoplay=1&mute=1&enablejsapi=1&rel=0";

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

## 4. Vercel Deployment Configuration ([vercel.json](file:///c:/AI-Projects/MovieHub/vercel.json))

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
