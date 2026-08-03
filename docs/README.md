# MovieHub (CineBharat) - Documentation Suite

Welcome to the official documentation for **MovieHub (CineBharat)** — a full-stack, enterprise-grade Pan-Indian Film Industry Ecosystem, Analytics, and AI Copilot platform built with React 19, TypeScript, Express, Vite, and Google Gemini 3.6 Flash.

---

## 📚 Documentation Index

| Document | Description | Target Audience |
| :--- | :--- | :--- |
| 🛠️ [Technical Documentation](file:///c:/AI-Projects/MovieHub/docs/TECHNICAL_DOCUMENTATION.md) | Deep dive into system architecture, tech stack, backend Express server, Gemini AI integration, public API aggregators, TypeScript schemas, state management, component architecture, and build pipelines. | Engineers, Software Architects, DevOps, AI Developers |
| 🎭 [Functional Documentation](file:///c:/AI-Projects/MovieHub/docs/FUNCTIONAL_DOCUMENTATION.md) | Comprehensive specification of user personas, core platform features, box office telemetry, AI copilot capabilities, community forums, HD streaming, user workflows, and UI specifications. | Product Managers, UX Designers, Cinephiles, Business Analysts |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### Environment Setup
Create a `.env` file in the root directory based on `.env.example`:

```bash
# GEMINI_API_KEY: Required for live Gemini AI API calls.
GEMINI_API_KEY="your_gemini_api_key_here"

# APP_URL: Base host URL
APP_URL="http://localhost:3000"

# Optional External Cinema APIs (Fallback mock data available if empty)
TMDB_API_KEY=
OMDB_API_KEY=
YOUTUBE_API_KEY=
```

### Running Locally

```bash
# Install dependencies
npm install

# Start full-stack dev server (Express + Vite)
npm run dev

# Run TypeScript compilation check
npm run lint

# Build production distribution
npm run build

# Start production server
npm run start
```

---

## 🏛️ Platform Architecture Overview

```
                          ┌──────────────────────────────────────┐
                          │         React 19 Frontend SPA         │
                          │ (Vite + TailwindCSS + Lucide Icons)  │
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
               │  Google Gemini 3.6 Flash │      │ Multi-Public Cinema API Aggregation│
               │  (@google/genai SDK)     │      │ (iTunes, Wiki, TVMaze, OMDB, TMDB)│
               └──────────────────────────┘      └──────────────────────────────────┘
```

---

## 📁 Repository Structure Overview

```
MovieHub/
├── docs/                             # Full Technical & Functional Documentation
│   ├── README.md                     # Documentation Hub & Quick Start
│   ├── TECHNICAL_DOCUMENTATION.md    # End-to-End Technical & API Specs
│   └── FUNCTIONAL_DOCUMENTATION.md   # Product Features & User Workflows
├── src/                              # Frontend React 19 Application Source
│   ├── components/                   # Modular UI Components
│   │   ├── AiCinemaAssistantModal.tsx # CineAI Assistant Modal Window
│   │   ├── BoxOfficeAnalyticsDashboard.tsx # Telemetry & Box Office Charts
│   │   ├── CommunityForum.tsx        # Cinephile Discussion Forum
│   │   ├── HdStreamPlayerModal.tsx   # Video Player Modal Overlay
│   │   ├── HeroBanner.tsx            # Featured Movie Spotlight
│   │   ├── LiveApiDataExplorer.tsx   # External Public API Integration Hub
│   │   ├── MovieCard.tsx             # Movie Card UI Component
│   │   ├── MovieDetailModal.tsx      # Comprehensive Movie Inspector Modal
│   │   ├── MovieGrid.tsx             # Interactive Filterable Grid
│   │   ├── Navbar.tsx                # Sticky Navigation & Live Search
│   │   └── UserDashboard.tsx         # User Profile & Watchlist Portal
│   ├── data/                         # Static Repositories & Pre-loaded Data
│   │   ├── communityData.ts          # Sample Forum Threads & Comments
│   │   └── indianMovies.ts           # Curated Indian Cinema Master Database
│   ├── App.tsx                       # Root Application & State Coordinator
│   ├── main.tsx                      # Vite Application Entry Point
│   ├── index.css                     # TailwindCSS Directives & Global Styling
│   └── types.ts                      # Strict TypeScript Schemas & Models
├── .env.example                      # Environment Template
├── index.html                        # Single Page HTML Shell
├── package.json                      # NPM Dependencies & Build Scripts
├── server.ts                         # Node Express Server & AI / API Layer
├── tsconfig.json                     # TypeScript Configuration
└── vite.config.ts                    # Vite Build & HMR Configuration
```
