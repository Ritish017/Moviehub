# Functional Documentation - MovieHub (CineBharat)

---

## 1. Product Vision & Value Proposition

**MovieHub (CineBharat)** is a dedicated, feature-rich Pan-Indian Film Industry Platform designed for film lovers, industry analysts, critics, aspiring directors, and actors. 

Unlike generic Western-centric movie platforms, CineBharat specifically addresses the unique dynamics of the Indian film ecosystem — spanning **Bollywood (Hindi)**, **Tollywood (Telugu)**, **Kollywood (Tamil)**, **Mollywood (Malayalam)**, and **Sandalwood (Kannada)**.

### Core Value Drivers:
1. **Pan-Indian Focus**: Multi-language support celebrating cross-industry releases and 1000+ Crore theatrical blockbusters.
2. **Financial Telemetry**: Transparent tracking of budget vs gross box office numbers in Crores (₹), return on investment (ROI %), and regional footfall distributions.
3. **AI-Powered Insights**: AI deep movie breakdown, sentiment analysis, director style radars, and CineAI Copilot powered by Google Gemini 3.6 Flash.
4. **Live External Data**: Real-time public API queries for instant lookup across iTunes, Wikipedia, TVMaze, OMDB, and TMDB.
5. **Interactive Cinephile Hub**: Community forums, custom movie lists, watchlist management, and critic vs fan review ratings.

---

## 2. Target User Personas & Roles

CineBharat customizes user experiences and AI recommendations according to 5 distinct user roles:

```
                          ┌─────────────────────────────────────┐
                          │         CineBharat User Roles       │
                          └──────────────────┬──────────────────┘
                                             │
    ┌──────────────────┬─────────────────────┼─────────────────────┬──────────────────┐
    ▼                  ▼                     ▼                     ▼                  ▼
┌──────────────┐ ┌──────────────┐   ┌──────────────────┐  ┌────────────────┐  ┌─────────────────────┐
│  Cinephile   │ │ Film Critic  │   │Aspiring Director │  │  Actor / Crew  │  │ Box Office Analyst  │
│     Fan      │ │              │   │                  │  │     Member     │  │                     │
└──────────────┘ └──────────────┘   └──────────────────┘  └────────────────┘  └─────────────────────┘
```

| User Role | Primary Motivations | Key Features Utilized |
| :--- | :--- | :--- |
| **Cinephile Fan** | Discovering blockbusters, watching trailers, building watchlists, engaging in fan theory discussions. | Hero Banner, Movie Grid, HD Streaming Studio, Watchlist, Community Forum. |
| **Film Critic** | Analyzing screenplays, writing verified reviews, assessing consensus sentiment, comparing fan vs critic scores. | Review Sentiment Breakdown, Director Style Radar, Community Forum (Critic Tag). |
| **Aspiring Director** | Studying directorial techniques, shot breakdown, visual grandeur, narrative pacing, and soundtrack integration. | Director Radar Charts, AI Movie Analysis, BTS Footage, Script Analysis forum topics. |
| **Actor / Crew Member** | Tracking industry trends, production houses, cinematographers, cast impact scores, and pan-Indian crossovers. | Cast & Crew Telemetry, Impact Scores, Industry Crossover statistics. |
| **Box Office Analyst** | Evaluating budget-to-gross ratios, net India vs overseas collections, theatrical screen counts, and ROI percentages. | Box Office Analytics Dashboard, Financial Telemetry Modals. |

---

## 3. Platform Modules & Features Breakdown

### Module 1: Sticky Navigation & Live Search (`Navbar.tsx`)

The navigation bar stays fixed at the top of the application viewport and provides:
- **Brand Identity**: CineBharat logo with metallic gold (`#e5b842`) and red (`#e50914`) accents.
- **Tab Navigation Bar**: Instant tab switching between:
  1. `Explore` (Main Catalog)
  2. `Live API Engine` (Public API Explorer)
  3. `Box Office Telemetry` (Financial Dashboard)
  4. `HD Streams` (Footage Player)
  5. `Community Forum` (Discussions)
  6. `My Dashboard` (User Profile & Watchlist)
- **Language Chips Filter**: Quick filter pills for `All`, `Hindi`, `Telugu`, `Tamil`, `Malayalam`, `Kannada`, `Pan-India`.
- **Live Search Auto-suggest**: Instant search input filtering titles, directors, actors, and genres with immediate dropdown preview results.
- **CineAI Copilot Button**: Floating trigger to launch the Gemini 3.6 Flash conversational assistant.
- **User Role Badge**: Displays user avatar, name (*Ritish Kurmari*), and selected persona.

---

### Module 2: Explore Catalog & Hero Spotlight (`HeroBanner.tsx` & `MovieGrid.tsx`)

- **Hero Banner**:
  - Highlights flagship Pan-Indian blockbusters (e.g., *Kalki 2898 AD*).
  - Displays high-resolution backdrop art, release year, genres, rating, box office gross (₹1,100 Cr WW), and quick action buttons (**Play Trailer** and **View Detailed Analysis**).
- **Interactive Movie Grid**:
  - Displays grid of movie cards with lazy-loaded poster art.
  - Card badges: Rating out of 10, Box Office Status (*All-Time Blockbuster*, *Super Hit*), ROI percentage tag.
  - Sorting Controls: Sort by Rating (High to Low), Box Office Gross (Highest First), Release Date (Newest), or ROI Percentage.
  - Hover Interactions: Quick Play button overlay and Watchlist bookmark toggle (`+ Watchlist` / `✓ In Watchlist`).

---

### Module 3: Comprehensive Movie Detail Inspector (`MovieDetailModal.tsx`)

When a user clicks on any movie card, a full-screen modal opens with 6 structured tabs:

```
[Movie Detail Inspector Modal]
 ├── Overview & Synopsis (Plot summary, release date, duration, ratings, genres, streaming links)
 ├── Financial Telemetry (Budget, WW Gross, India Net, Overseas Gross, ROI %, Screen Count)
 ├── Cast & Crew (Director, Music Composer, Production House, Cast list with Impact Scores 0-100)
 ├── Director Style Radar (Spider chart measuring Visual Grandeur, Story Pacing, Emotional Resonance, Commercial Appeal, Soundtrack Integration)
 ├── Audience Demographics & Sentiment (Age distribution %, Male/Female %, Top regions, Positive/Neutral/Negative sentiment consensus)
 └── Gemini AI Deep Analysis (Button triggering live /api/gemini/analyze-movie for instant AI breakdown)
```

#### Key Financial Telemetry Card:
- **Budget**: Displayed in ₹ Crores (e.g., ₹600 Cr for *Kalki 2898 AD*).
- **Worldwide Gross**: Worldwide earnings in ₹ Crores (e.g., ₹1,100 Cr).
- **India Net**: Domestic net collection (e.g., ₹645 Cr).
- **Overseas Gross**: International collection (e.g., ₹285 Cr).
- **ROI Percentage**: Return on investment calculation (e.g., `+183%`).
- **Screen Count**: Total global theatrical screen footprint (e.g., 8,500 screens).

---

### Module 4: Box Office Telemetry & Analytics Dashboard (`BoxOfficeAnalyticsDashboard.tsx`)

A dedicated analytics hub providing data visualizations for movie industry executives and analysts:
- **Top Financial Indicators**: Aggregate total gross of catalog, top ROI performer, highest overseas collection.
- **ROI Champions**: Ranked leaderboard of films based on return on investment percentage.
- **Industry Share Breakdown**: Comparative metrics showing revenue contributions across Bollywood, Tollywood, Kollywood, Mollywood, and Sandalwood.
- **Budget vs Gross Comparison**: Visual bar charts comparing production budget against worldwide box office returns.
- **All-Time 1000 Crore Club**: Dedicated showcase for milestone films surpassing ₹1,000 Crores gross.

---

### Module 5: Live External Public API Explorer (`LiveApiDataExplorer.tsx`)

An interactive sandbox where users can query real-time public cinema APIs:
1. **Apple iTunes India API**: Real-time Indian movie search returning official posters, pricing, genres, and preview video URLs.
2. **Wikipedia REST API**: Direct page summary extraction including plot excerpts, lead imagery, and Wikipedia links.
3. **TVMaze API**: Search Indian web series and television shows with episode guides and cast profiles.
4. **OMDB API Integration**: Query film metadata, IMDb ratings, metascores, awards, and poster links.
5. **TMDB API Integration**: View TMDB v3 API format specs, posters, and vote averages.
6. **YouTube oEmbed API**: Resolve YouTube trailer URLs to get high-res thumbnail previews and embed HTML.
7. **Parallel Multi-API Aggregator**: Run a single search that queries all 5 services concurrently.

---

### Module 6: High-Definition Streaming & Video Studio (`HdStreamPlayerModal.tsx`)

- **Video Categories**: Filter clips by *Official Trailer*, *Teaser*, *Lyrical Song*, *Behind The Scenes*, or *Director Commentary*.
- **HD Video Player**: Responsive embed player supporting embed YouTube trailers, direct MP4 video streams, with fullscreen support.
- **Clip Switcher Drawer**: Switch between different video clips for the currently selected film without closing the modal.

---

### Module 7: Cinephile & Industry Forum (`CommunityForum.tsx`)

- **Discussion Topics**: Categorized threads covering:
  - *Box Office Battles*
  - *Trailer Analysis*
  - *Director Spotlight*
  - *Fan Theories*
  - *Script Analysis*
  - *Industry News*
- **Filter by Industry Language**: Filter threads by Hindi, Telugu, Tamil, Malayalam, Kannada, or Pan-India.
- **Interactive Thread Features**:
  - Upvote counters.
  - View counts & comment tallies.
  - Verified Critic badges.
  - Thread creation modal to post new discussions.
  - Thread comment section with replies.

---

### Module 8: Personal User Dashboard & AI Recommendations (`UserDashboard.tsx`)

- **User Profile Header**: Displays user details (*Ritish Kurmari*), avatar, bio, preferred languages, favorite genres, favorite actors, and user role.
- **User Reputation & Stats**: Counters for Movies Watched (184), Reviews Written (12), Forum Posts (28), and Reputation Points (1,450).
- **Watchlist & Favorites**: Grid view of bookmarked movies with one-click remove buttons.
- **Custom Lists Manager**: View and create public/private custom movie lists (e.g., *"1000 Crore Pan-Indian Titans"*).
- **AI Personalized Movie Recommendations**:
  - Powered by `/api/gemini/recommendations`.
  - Generates tailored movie suggestions matching user language preferences, favorite genres, and role.
  - Displays match percentage (e.g., `96% Match`), rationale text, and key highlights.

---

### Module 9: CineAI Copilot (`AiCinemaAssistantModal.tsx`)

- **Floating Conversational Assistant**: Accessible from any page via the top navigation bar or floating button.
- **Persona Context**: Answers are tailored specifically to the user's selected role (*Cinephile Fan*, *Film Critic*, *Aspiring Director*, *Box Office Analyst*).
- **Pre-set Prompt Chips**:
  - *"Which Indian film has the highest ROI?"*
  - *"Explain the visual style of S.S. Rajamouli vs Nag Ashwin"*
  - *"Analyze the rise of Malayalam cinema in 2024"*
  - *"Compare Kalki 2898 AD vs RRR box office numbers"*
- **Rich Formatting**: Responses rendered in clean Markdown with bullet points, box office numbers (in ₹ Crores), and director craft notes.

---

## 4. Design System & User Experience Guidelines

### Color Palette
- **Background**: Deep space black `#0a0b10` and slate container background `#12141d`.
- **Primary Accent**: Cinematic Crimson `#e50914` (buttons, active states, play icons).
- **Secondary Accent**: Royalty Gold `#e5b842` (ratings, financial badges, titles).
- **Purple Highlight**: Studio Ambient Purple `rgba(147, 51, 234, 0.2)` (streaming showcase & AI cards).
- **Typography**: Clean sans-serif primary font with serif headings (`font-serif`) for cinematic flair.

### Micro-Interactions & Motion
- Smooth scale transformations (`hover:scale-105`) on movie card posters.
- Backdrop blur effects (`backdrop-blur-md`) on modal overlays and floating filter bars.
- Subtle fade-in animations on tab switching and search results filtering.
