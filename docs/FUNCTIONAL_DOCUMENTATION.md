# Functional Documentation - MovieHub X ("The AI Operating System for Global Cinema")

---

## 1. Product Vision & Value Proposition

**MovieHub X** is an AI-powered entertainment platform designed to compete with **Netflix, Apple TV, IMAX, Letterboxd, and IMDb**.

MovieHub X addresses the Indian and global cinema ecosystem — spanning **Bollywood (Hindi)**, **Tollywood (Telugu)**, **Kollywood (Tamil)**, **Mollywood (Malayalam)**, **Sandalwood (Kannada)**, and international hollywood blockbusters.

### Key Product Pillars
1. **Cinema Operating System**: Dual-navigation system combining top header bar with left icon rail sidebar for effortless discovery.
2. **Pre-Rendered AI Intelligence**: Pre-generated Gemini 3.6 Flash film breakdowns covering ending explanations, hidden easter eggs, themes, character dynamics, and director signatures.
3. **Financial Telemetry**: Box office collection metrics in ₹ Crores, ROI percentages, 12-month collection trend line charts, and industry market share donut charts.
4. **4K & 1080p Stream Studio**: Bulletproof video embeds powered by YouTube Data API v3 (`AIzaSyC2y4Twy0obXBW1e5J_VwTuzpUHzP-WovI`).
5. **Interactive Poster Cards**: 3D tilt hover effects, live video previews on hover, AI score badges, and quick action bars.

---

## 2. The 7 Reference UI/UX Screens Breakdown

### Screen 01: Home Screen Spotlight ([HeroBanner.tsx](file:///c:/AI-Projects/MovieHub/src/components/HeroBanner.tsx) & [LeftSidebar.tsx](file:///c:/AI-Projects/MovieHub/src/components/LeftSidebar.tsx))
- **Left Icon Rail Sidebar**: Navigation for `Home`, `Movies`, `TV Shows`, `People`, `Collections`, `Awards`, `Watchlist`, `History`, `Settings`.
- **Hero Spotlight**: `#1 in India Today` badge, floating metallic title logo (*Kalki 2898 AD*), `2024 • 2h 56m • Sci-Fi • Action • Adventure • UA-16+`, `★ 8.7 / 10`, `1100 Cr+ Worldwide`, `93% Audience Score`.
- **Primary Actions**: Red `▶ Play Trailer`, `+ Watchlist`, audio mute toggle.
- **Trending Now Rail**: Horizontal slider for Kalki, Pushpa 2, Salaar, Stree 2, Animal, Jawan, Dune Part Two, Maharaja.

---

### Screen 02: Movie Detail Experience ([DedicatedMovieView.tsx](file:///c:/AI-Projects/MovieHub/src/features/movies/DedicatedMovieView.tsx))
- **Backdrop Spotlight**: Backdrop header image with video play overlay.
- **Floating Header Card**: Poster art, movie title, metadata chips, `★ 8.7 / 10`, `1100 Crs Worldwide Gross`, `93% Audience Score`.
- **Cast Avatars & Director**: Director (*Nag Ashwin*) and circular cast avatars (*Prabhas, Deepika P., Amitabh B., Kamal Haasan*).
- **Available On**: Amazon Prime Video, Netflix, Disney+ Hotstar streaming logos.
- **Sub-Tabs**: `Overview`, `Cast & Crew`, `Reviews`, `Videos`, `Gallery`, `AI Insights`.

---

### Screen 03: AI Insights & CineAI Copilot ([MovieAiAnalysisPanel.tsx](file:///c:/AI-Projects/MovieHub/src/features/ai/MovieAiAnalysisPanel.tsx))
- **Sub-Tabs**: `AI Summary`, `Ending Explained`, `Hidden Details`, `Easter Eggs`.
- **Stat Counter Cards**: `Themes: 4`, `Symbols: 7`, `Connections: 12`, `Questions: 18`.
- **Key Insights List**: Mythology inspiration, character arcs, sci-fi world-building, human evolution themes.
- **CineAI Copilot BETA Drawer**: Right-hand drawer with response text, sources `[1] [2] [3]`, and `"Ask anything about movies..."` input.

---

### Screen 04: Browse Movies Catalog ([SearchEngine.tsx](file:///c:/AI-Projects/MovieHub/src/features/search/SearchEngine.tsx))
- Top search input, filter toggle, sort dropdown.
- Left filter sidebar: Language (`All`, `Hindi`, `Telugu`, `Tamil`, `Malayalam`, `Kannada`, `English`, `Other`), Genre (`Action`, `Drama`, `Sci-Fi`, etc.), Year Range slider (`1990 - 2024`).
- 5-column poster grid.

---

### Screen 05: Box Office Analytics Dashboard ([BoxOfficeAnalyticsDashboard.tsx](file:///c:/AI-Projects/MovieHub/src/components/BoxOfficeAnalyticsDashboard.tsx))
- **KPI Summary Cards**: `Total Collection: ₹12,432 Cr (+18.4%)`, `India Net: ₹7,842 Cr (+22.1%)`, `Overseas Gross: ₹4,590 Cr (+15.2%)`, `Releases: 128 (+14)`.
- **Time Filters**: `Overview`, `Daily`, `Weekly`, `Monthly`, `Yearly`.
- **Collection Trend Line Chart**: 12-month revenue trend graph.
- **Top Grossers List**: #1 Kalki 2898 AD (₹1100 Cr+), #2 Pushpa 2 (₹970 Cr+), #3 Jawan (₹950 Cr+), #4 Animal (₹840 Cr+), #5 Salaar (₹630 Cr+).
- **Industry Share Donut Breakdown**: Bollywood 45%, Tollywood 25%, Kollywood 15%, Sandalwood 10%, Mollywood 5%. Total: ₹12,432 Cr.

---

### Screen 06: Watchlist Portal ([UserDashboard.tsx](file:///c:/AI-Projects/MovieHub/src/components/UserDashboard.tsx))
- `My Watchlist (24)` poster grid featuring Oppenheimer, Interstellar, The Dark Knight, Inception, 12th Fail, Forrest Gump, The Godfather, Spirited Away.

---

### Screen 07: Video Player & Trailer Hub ([HdStreamPlayerModal.tsx](file:///c:/AI-Projects/MovieHub/src/components/HdStreamPlayerModal.tsx))
- `Kalki 2898 AD - Official Trailer` header, 16:9 player frame, `More Videos` thumbnail carousel.

---

### Bottom Feature Pillars Bar ([FeatureFooterBar.tsx](file:///c:/AI-Projects/MovieHub/src/components/FeatureFooterBar.tsx))
- **6 Pillars**:
  1. `AI Powered Insights`: Deep analysis, summaries and recommendations.
  2. `Real-time Box Office`: Live collection updates and industry analytics.
  3. `Community Driven`: Forums, reviews and discussions.
  4. `Global Cinema`: Movies from all industries and languages.
  5. `Personalized Experience`: Watchlists, ratings and smart recommendations.
  6. `Cross Platform`: Seamless experience across all devices.

---

## 3. Design System & Micro-Interactions

- **Palette**: Deep Void Black `#07080c`, Slate `#12141d`, Metallic Gold `#e5b842`, Crimson `#e50914`, Ambient Purple `rgba(147, 51, 234, 0.2)`.
- **Dynamic Poster Glow**: Poster dominant color extraction animates global mesh gradients.
- **Command Palette**: Press `Cmd+K` or `Ctrl+K` to launch fuzzy search launcher menu.
