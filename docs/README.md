# MovieHub X ("The AI Operating System for Global Cinema") - Documentation Suite

Welcome to the official documentation hub for **MovieHub X** — an enterprise-grade, luxury AI-powered entertainment operating system built with React 19, TypeScript 5.8, Express 4, Vite 6, TailwindCSS 4, and Google Gemini 3.6 Flash AI.

MovieHub X combines the cinematic polish of **Netflix, Apple TV, IMAX, Letterboxd, Linear, and Vercel** with real-time live APIs and deep AI film intelligence.

---

## 📚 Documentation Suite Index

| Document | Description | Target Audience |
| :--- | :--- | :--- |
| 🛠️ [Technical Documentation](file:///c:/AI-Projects/MovieHub/docs/TECHNICAL_DOCUMENTATION.md) | In-depth technical specification, system architecture, feature-based directory design, Express API gateway, live OMDb & YouTube Data API integration, videoId embed engine, TypeScript domain models, and Vercel build pipelines. | Engineers, Architects, DevOps, AI Developers |
| 🎭 [Functional Documentation](file:///c:/AI-Projects/MovieHub/docs/FUNCTIONAL_DOCUMENTATION.md) | Exhaustive product specification covering the 7 reference UI screens (Home, Movie Detail, AI Insights & Copilot, Browse Catalog, Box Office Analytics, Watchlist, Video Player & Feature Bar), user personas, interactive cards, and AI features. | Product Managers, Designers, Analysts, Cinephiles |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.x` or `v20.x` or `v22.x`
- **npm**: `v9.x` or higher

### Environment Setup (`.env`)
Create a `.env` file in the root directory:

```bash
# GEMINI_API_KEY: Required for Gemini 3.6 Flash AI calls.
GEMINI_API_KEY="your_gemini_api_key"

# APP_URL: Platform public URL
APP_URL="http://localhost:3000"

# External Cinema APIs
TMDB_API_KEY=""
OMDB_API_KEY="ec1f5176"
YOUTUBE_API_KEY="AIzaSyC2y4Twy0obXBW1e5J_VwTuzpUHzP-WovI"
```

### Local Development Commands

```bash
# Install dependencies
npm install

# Start development server (Express + Vite)
npm run dev

# Run TypeScript compilation check
npx tsc --noEmit

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 🏛️ System Architecture Diagram

```
                          ┌──────────────────────────────────────┐
                          │       React 19 Frontend SPA          │
                          │ Dual Navigation: Top Bar + Left Rail │
                          └──────────────────┬───────────────────┘
                                             │
                                   HTTP REST API Requests
                                             │
                                             ▼
                          ┌──────────────────────────────────────┐
                          │         Express 4 Server TS          │
                          │            (Port 3000)               │
                          └──────┬────────────────────────┬──────┘
                                 │                        │
               ┌─────────────────┴────────┐      ┌────────┴─────────────────────────┐
               │  Google Gemini 3.6 Flash │      │ Multi-Public Cinema API Gateway  │
               │  (@google/genai SDK)     │      │ (OMDb, YouTube v3, iTunes, Wiki) │
               └──────────────────────────┘      └──────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```
MovieHub/
├── docs/                             # Documentation Suite
│   ├── README.md                     # Documentation Hub & Quick Start
│   ├── TECHNICAL_DOCUMENTATION.md    # Technical Specs, APIs & Schemas
│   └── FUNCTIONAL_DOCUMENTATION.md   # Product Features, UI/UX & Workflows
├── src/                              # Frontend React Source
│   ├── components/                   # UI Components & Controls
│   │   ├── ui/                       # Design System Primitives
│   │   │   ├── AmbientBackground.tsx # Dynamic poster color glow
│   │   │   └── CommandPalette.tsx    # Global Cmd+K launcher menu
│   │   ├── AiCinemaAssistantModal.tsx# Floating CineAI Copilot drawer
│   │   ├── BoxOfficeAnalyticsDashboard.tsx # Collection trend & donut charts
│   │   ├── CommunityForum.tsx        # Cinephile discussions
│   │   ├── FeatureFooterBar.tsx      # Bottom 6 feature pillars bar
│   │   ├── HdStreamPlayerModal.tsx   # 4K Video trailer player
│   │   ├── HeroBanner.tsx            # Full-width video backdrop hero
│   │   ├── LeftSidebar.tsx           # Left icon rail navigation
│   │   ├── LiveApiDataExplorer.tsx   # Public API sandbox
│   │   ├── MovieCard.tsx             # 3D tilt poster card
│   │   ├── MovieDetailModal.tsx      # Movie detail inspector modal
│   │   ├── MovieGrid.tsx             # Catalog grid layout
│   │   ├── Navbar.tsx                # Streamlined top header navigation
│   │   └── UserDashboard.tsx         # Watchlist & user stats
│   ├── features/                     # Domain Feature Modules
│   │   ├── ai/                       # Pre-rendered AI Insights Panel
│   │   │   └── MovieAiAnalysisPanel.tsx
│   │   ├── movies/                   # Dedicated Full-Screen Page Route
│   │   │   └── DedicatedMovieView.tsx
│   │   ├── search/                   # Multi-Dimensional AI Search Engine
│   │   │   └── SearchEngine.tsx
│   │   └── trailers/                 # HD Streaming & Trailer Hub
│   │       └── TrailerHubView.tsx
│   ├── utils/                        # Utilities & Helper Modules
│   │   └── videoUtils.ts             # YouTube videoId & embed URL helper
│   ├── data/                         # Pre-loaded Data & Seed Repositories
│   ├── App.tsx                       # Root Application & State Manager
│   ├── index.css                     # Tailwind v4 Directives & Motion Tokens
│   ├── main.tsx                      # React DOM Entrypoint
│   └── types.ts                      # Strict TypeScript Interfaces & Schemas
├── .env                              # Environment API Keys
├── package.json                      # NPM Dependencies & Scripts
├── server.ts                         # Express Server & AI / API Layer
├── vercel.json                       # Vercel Deployment Configuration
└── vite.config.ts                    # Vite Bundler Setup
```
