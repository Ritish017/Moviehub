import { Movie } from "../types";

export const INDIAN_MOVIES_DATABASE: Movie[] = [
  {
    id: "kalki-2898-ad",
    title: "Kalki 2898 AD",
    originalTitle: "కల్కి 2898 AD",
    language: "Telugu",
    industry: "Tollywood (Telugu)",
    releaseYear: 2024,
    releaseDate: "2024-06-27",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop",
    dataSource: "curated" as const,
    genres: ["Sci-Fi", "Action", "Mythology", "Epic"],
    rating: 8.7,
    userRatingCount: 142000,
    synopsis: "Set in a post-apocalyptic world in the year 2898 AD, a modern avatar of Lord Vishnu descends to earth to protect the unborn child of SUM-80 from the tyrannical ruler Supreme Yaskin in the dystopian city of Kasi.",
    duration: "3h 01m",
    budgetCrores: 600,
    boxOfficeGrossCrores: 1100,
    indiaNetGrossCrores: 645,
    overseasGrossCrores: 285,
    roiPercentage: 183,
    boxOfficeStatus: "All-Time Blockbuster",
    screenCount: 8500,
    director: "Nag Ashwin",
    directorPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    musicDirector: "Santhosh Narayanan",
    productionHouse: "Vyjayanthi Movies",
    cinematographer: "Djordje Stojiljkovic",
    featuredTrailerUrl: "https://www.youtube.com/embed/k9k1l_8y0e8",
    videoClips: [
      {
        id: "v1",
        title: "Kalki 2898 AD Official Trailer (HD)",
        type: "Official Trailer",
        videoUrl: "https://www.youtube.com/embed/k9k1l_8y0e8",
        thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop",
        duration: "3m 02s",
        isHD: true,
        viewsCount: "85M"
      },
      {
        id: "v2",
        title: "Bhairava Anthem - Santhosh Narayanan feat. Diljit Dosanjh",
        type: "Lyrical Song",
        videoUrl: "https://www.youtube.com/embed/P2347-A9-1w",
        thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500&auto=format&fit=crop",
        duration: "3m 45s",
        isHD: true,
        viewsCount: "120M"
      }
    ],
    cast: [
      { id: "c1", name: "Prabhas", characterName: "Bhairava", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", impactScore: 98, roleType: "Lead Actor" },
      { id: "c2", name: "Amitabh Bachchan", characterName: "Ashwatthama", photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop", impactScore: 99, roleType: "Key Supporting" },
      { id: "c3", name: "Deepika Padukone", characterName: "SUM-80 / Sumathi", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop", impactScore: 95, roleType: "Lead Actress" },
      { id: "c4", name: "Kamal Haasan", characterName: "Supreme Yaskin", photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop", impactScore: 97, roleType: "Antagonist" }
    ],
    reviewSentiment: {
      positivePercentage: 89,
      neutralPercentage: 8,
      negativePercentage: 3,
      consensusSummary: "Celebrated for merging Indian Puranic mythology with futuristic cyberpunk aesthetics. Amitabh Bachchan's towering portrayal of Ashwatthama and Nag Ashwin's world-building are hailed as historic milestones.",
      emotionalArc: "Dystopian Intrigue -> High-Octane Vehicle Action -> Mythological Reverence Climax"
    },
    demographicBreakdown: {
      age18To24: 38,
      age25To34: 42,
      age35Plus: 20,
      malePercentage: 64,
      femalePercentage: 36,
      topRegions: [
        { region: "Telangana & Andhra Pradesh", footfallsPercentage: 45 },
        { region: "North India (Hindi Belt)", footfallsPercentage: 30 },
        { region: "Overseas (USA/Canada/GCC)", footfallsPercentage: 15 },
        { region: "Tamil Nadu & Karnataka", footfallsPercentage: 10 }
      ]
    },
    directorStyleRadar: {
      visualGrandeur: 98,
      storyPacing: 84,
      emotionalResonance: 90,
      commercialAppeal: 96,
      soundtrackIntegration: 92
    },
    streamingPlatforms: [
      { name: "Netflix", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", directUrl: "https://netflix.com" },
      { name: "Amazon Prime Video", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png", directUrl: "https://primevideo.com" }
    ],
    awards: ["National Film Award - Best Special Effects", "Filmfare South - Best Director", "SIIMA - Best Film"],
    tags: ["Pan-India", "Sci-Fi", "Mahabharata", "Cyberpunk", "Blockbuster"],
    criticReviews: [
      { id: "cr1", criticName: "Anupama Chopra", publication: "Film Companion", rating: 4.5, quote: "Nag Ashwin creates an astounding cinematic spectacle where Indian mythology breathes in a dystopian future.", verified: true, date: "2024-06-28" }
    ],
    fanReviews: [
      { id: "fr1", userName: "Rajesh Varma", userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop", userRole: "Cinephile Fan", rating: 10, reviewTitle: "Ashwatthama sequence gave me chills!", reviewText: "The interval scene with Big B standing tall against Bhairava is pure cinema goosebumps.", likes: 342, date: "2024-06-29" }
    ],
    isTrending: true,
    isEditorPick: true
  },
  {
    id: "rrr",
    title: "RRR",
    originalTitle: "రౌద్రం రణం రుధిరం",
    language: "Telugu",
    industry: "Tollywood (Telugu)",
    releaseYear: 2022,
    releaseDate: "2022-03-25",
    posterUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=500&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1600&auto=format&fit=crop",
    dataSource: "curated" as const,
    genres: ["Action", "Period Drama", "Historical", "Epic"],
    rating: 9.0,
    userRatingCount: 280000,
    synopsis: "A fearless revolutionary and an officer in the British army, who are close friends, decide to join forces and fight against the tyrannical British Raj in 1920s India.",
    duration: "3h 07m",
    budgetCrores: 550,
    boxOfficeGrossCrores: 1380,
    indiaNetGrossCrores: 780,
    overseasGrossCrores: 370,
    roiPercentage: 251,
    boxOfficeStatus: "All-Time Blockbuster",
    screenCount: 10000,
    director: "S.S. Rajamouli",
    directorPhotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    musicDirector: "M.M. Keeravani",
    productionHouse: "DVV Entertainment",
    cinematographer: "K.K. Senthil Kumar",
    featuredTrailerUrl: "https://www.youtube.com/embed/GY4BgSe538c",
    videoClips: [
      {
        id: "rrr1",
        title: "RRR Official Trailer (Multi-Language)",
        type: "Official Trailer",
        videoUrl: "https://www.youtube.com/embed/GY4BgSe538c",
        thumbnailUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=500&auto=format&fit=crop",
        duration: "3m 15s",
        isHD: true,
        viewsCount: "140M"
      },
      {
        id: "rrr2",
        title: "Naatu Naatu Oscar Winning Video Song",
        type: "Lyrical Song",
        videoUrl: "https://www.youtube.com/embed/sAzlWScHTc4",
        thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500&auto=format&fit=crop",
        duration: "4m 35s",
        isHD: true,
        viewsCount: "350M"
      }
    ],
    cast: [
      { id: "rc1", name: "N.T. Rama Rao Jr.", characterName: "Komaram Bheem", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop", impactScore: 99, roleType: "Lead Actor" },
      { id: "rc2", name: "Ram Charan", characterName: "Alluri Sitarama Raju", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", impactScore: 99, roleType: "Lead Actor" },
      { id: "rc3", name: "Alia Bhatt", characterName: "Sita", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop", impactScore: 90, roleType: "Lead Actress" }
    ],
    reviewSentiment: {
      positivePercentage: 96,
      neutralPercentage: 3,
      negativePercentage: 1,
      consensusSummary: "Academy Award winner for Best Original Song ('Naatu Naatu'). Universally praised for its kinetic action choreography, emotional camaraderie, and S.S. Rajamouli's directorial vision.",
      emotionalArc: "Bonding Brotherhood -> Betrayal Tension -> Mythic Rebellion Awakening"
    },
    demographicBreakdown: {
      age18To24: 35,
      age25To34: 45,
      age35Plus: 20,
      malePercentage: 58,
      femalePercentage: 42,
      topRegions: [
        { region: "Andhra Pradesh & Telangana", footfallsPercentage: 40 },
        { region: "North America & Japan", footfallsPercentage: 25 },
        { region: "North India (Hindi Belt)", footfallsPercentage: 22 }
      ]
    },
    directorStyleRadar: {
      visualGrandeur: 100,
      storyPacing: 95,
      emotionalResonance: 98,
      commercialAppeal: 100,
      soundtrackIntegration: 98
    },
    streamingPlatforms: [
      { name: "Netflix", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", directUrl: "https://netflix.com" },
      { name: "ZEE5", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/ZEE5_logo.png", directUrl: "https://zee5.com" }
    ],
    awards: ["95th Academy Award - Best Original Song (Naatu Naatu)", "Golden Globe Award - Best Original Song"],
    tags: ["Oscar Winner", "Pan-India", "Rajamouli", "Action Masterpiece"],
    criticReviews: [
      { id: "rrr_c1", criticName: "James Cameron", publication: "Filmmaker Spotlight", rating: 5.0, quote: "An absolute masterclass in kinetic action, emotional storytelling, and visual grandeur.", verified: true, date: "2023-01-15" }
    ],
    fanReviews: [
      { id: "rrr_f1", userName: "Arjun Reddy", userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop", userRole: "Box Office Analyst", rating: 10, reviewTitle: "The gold standard of commercial cinema!", reviewText: "Naatu Naatu sequence and Bheem's animal entry scene at the palace are peak theatrical experiences.", likes: 890, date: "2022-03-26" }
    ],
    isTrending: true,
    isEditorPick: true
  },
  {
    id: "pushpa-2-the-rule",
    title: "Pushpa 2: The Rule",
    originalTitle: "పుష్ప 2: ది రూల్",
    language: "Telugu",
    industry: "Tollywood (Telugu)",
    releaseYear: 2024,
    releaseDate: "2024-12-05",
    posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=500&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1600&auto=format&fit=crop",
    dataSource: "curated" as const,
    genres: ["Action", "Crime", "Mass Entertainer", "Drama"],
    rating: 8.8,
    userRatingCount: 195000,
    synopsis: "Pushpa Raj expands his red sandalwood smuggling empire across international borders while clashing head-on with SP Bhanwar Singh Shekhawat in an explosive battle of power, ego, and rule.",
    duration: "3h 20m",
    budgetCrores: 500,
    boxOfficeGrossCrores: 1650,
    indiaNetGrossCrores: 920,
    overseasGrossCrores: 380,
    roiPercentage: 330,
    boxOfficeStatus: "All-Time Blockbuster",
    screenCount: 11500,
    director: "Sukumar",
    directorPhotoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
    musicDirector: "Devi Sri Prasad (DSP)",
    productionHouse: "Mythri Movie Makers",
    cinematographer: "Miroslaw Kuba Brozek",
    featuredTrailerUrl: "https://www.youtube.com/embed/1kF_n7Y546Q",
    videoClips: [
      {
        id: "p2_1",
        title: "Pushpa 2 The Rule Official Trailer",
        type: "Official Trailer",
        videoUrl: "https://www.youtube.com/embed/1kF_n7Y546Q",
        thumbnailUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=500&auto=format&fit=crop",
        duration: "3m 10s",
        isHD: true,
        viewsCount: "110M"
      },
      {
        id: "p2_2",
        title: "Pushpa Pushpa - Title Song Video",
        type: "Lyrical Song",
        videoUrl: "https://www.youtube.com/embed/3U_yP-8gqZ0",
        thumbnailUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=500&auto=format&fit=crop",
        duration: "4m 12s",
        isHD: true,
        viewsCount: "210M"
      }
    ],
    cast: [
      { id: "pc1", name: "Allu Arjun", characterName: "Pushpa Raj", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", impactScore: 100, roleType: "Lead Actor" },
      { id: "pc2", name: "Fahadh Faasil", characterName: "SP Bhanwar Singh Shekhawat", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop", impactScore: 98, roleType: "Antagonist" },
      { id: "pc3", name: "Rashmika Mandanna", characterName: "Srivalli", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop", impactScore: 91, roleType: "Lead Actress" }
    ],
    reviewSentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      consensusSummary: "Allu Arjun delivers a tour-de-force performance as Pushpa. Sukumar's intricate screenplay and high-octane Gangamma Jathara action sequence created theatrical euphoria across India.",
      emotionalArc: "Rebellion swagger -> Intricate Smuggling Strategy -> Epic Jathara Climax"
    },
    demographicBreakdown: {
      age18To24: 42,
      age25To34: 38,
      age35Plus: 20,
      malePercentage: 66,
      femalePercentage: 34,
      topRegions: [
        { region: "North India (Hindi Belt)", footfallsPercentage: 42 },
        { region: "Telangana & Andhra Pradesh", footfallsPercentage: 38 },
        { region: "Overseas (USA/GCC)", footfallsPercentage: 12 }
      ]
    },
    directorStyleRadar: {
      visualGrandeur: 94,
      storyPacing: 92,
      emotionalResonance: 88,
      commercialAppeal: 100,
      soundtrackIntegration: 95
    },
    streamingPlatforms: [
      { name: "Netflix", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", directUrl: "https://netflix.com" }
    ],
    awards: ["Filmfare Awards South - Best Film", "National Award Contender", "SIIMA Best Actor"],
    tags: ["Wildfire Trend", "Allu Arjun", "Mass Swag", "Pan-India Record"],
    criticReviews: [
      { id: "p2_c1", criticName: "Komash Sharma", publication: "Trade Analyst India", rating: 4.8, quote: "Allu Arjun's screen presence is hypnotic. Sukumar scales up the sequel in every conceivable department.", verified: true, date: "2024-12-06" }
    ],
    fanReviews: [
      { id: "p2_f1", userName: "Kiran Kumar", userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop", userRole: "Cinephile Fan", rating: 10, reviewTitle: "Gangamma Jathara scene is history!", reviewText: "The sari fight scene in the second half blew off the roof of the cinema hall.", likes: 1120, date: "2024-12-07" }
    ],
    isTrending: true,
    isEditorPick: true
  },
  {
    id: "jawan",
    title: "Jawan",
    originalTitle: "जवान",
    language: "Hindi",
    industry: "Bollywood (Hindi)",
    releaseYear: 2023,
    releaseDate: "2023-09-07",
    posterUrl: "https://images.unsplash.com/photo-1566159374559-9b1d5d00e67a?q=80&w=500&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1566159374559-9b1d5d00e67a?q=80&w=1600&auto=format&fit=crop",
    dataSource: "curated" as const,
    genres: ["Action", "Vigilante", "Thriller", "Social Drama"],
    rating: 8.4,
    userRatingCount: 210000,
    synopsis: "A father-son duo driven by a personal vendetta rectifies corruption in Indian society with the help of a crew of skilled women, taking on a ruthless arms tycoon.",
    duration: "2h 49m",
    budgetCrores: 300,
    boxOfficeGrossCrores: 1150,
    indiaNetGrossCrores: 640,
    overseasGrossCrores: 400,
    roiPercentage: 283,
    boxOfficeStatus: "All-Time Blockbuster",
    screenCount: 10000,
    director: "Atlee",
    directorPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    musicDirector: "Anirudh Ravichander",
    productionHouse: "Red Chillies Entertainment",
    cinematographer: "G.K. Vishnu",
    featuredTrailerUrl: "https://www.youtube.com/embed/COv52Qyctws",
    videoClips: [
      {
        id: "j1",
        title: "Jawan Official Prevail Trailer",
        type: "Official Trailer",
        videoUrl: "https://www.youtube.com/embed/COv52Qyctws",
        thumbnailUrl: "https://images.unsplash.com/photo-1566159374559-9b1d5d00e67a?q=80&w=500&auto=format&fit=crop",
        duration: "2m 15s",
        isHD: true,
        viewsCount: "130M"
      }
    ],
    cast: [
      { id: "jc1", name: "Shah Rukh Khan", characterName: "Vikram Rathore / Azad", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", impactScore: 100, roleType: "Lead Actor" },
      { id: "jc2", name: "Nayanthara", characterName: "Narmada Rai", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop", impactScore: 92, roleType: "Lead Actress" },
      { id: "jc3", name: "Vijay Sethupathi", characterName: "Kalie Gaikwad", photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop", impactScore: 94, roleType: "Antagonist" }
    ],
    reviewSentiment: {
      positivePercentage: 88,
      neutralPercentage: 9,
      negativePercentage: 3,
      consensusSummary: "An explosive mass entertainer bridging South directorial flair (Atlee) with North superstar charisma (SRK). Anirudh's score elevated every single hero mass moment.",
      emotionalArc: "Metro Heist Intrigue -> Flashback Tragedy -> Dual SRK Mass Firefight"
    },
    demographicBreakdown: {
      age18To24: 36,
      age25To34: 44,
      age35Plus: 20,
      malePercentage: 55,
      femalePercentage: 45,
      topRegions: [
        { region: "North India (Hindi Belt)", footfallsPercentage: 55 },
        { region: "Overseas (USA/UK/UAE)", footfallsPercentage: 25 }
      ]
    },
    directorStyleRadar: {
      visualGrandeur: 92,
      storyPacing: 90,
      emotionalResonance: 89,
      commercialAppeal: 99,
      soundtrackIntegration: 98
    },
    streamingPlatforms: [
      { name: "Netflix", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", directUrl: "https://netflix.com" }
    ],
    awards: ["Filmfare Award - Best Actor (Shah Rukh Khan)", "IIFA Award - Best Picture"],
    tags: ["Shah Rukh Khan", "Atlee", "Anirudh Score", "Mass Blockbuster"],
    criticReviews: [
      { id: "j_c1", criticName: "Rajeev Masand", publication: "Open Magazine", rating: 4.5, quote: "Shah Rukh Khan at his absolute massiest best.", verified: true, date: "2023-09-08" }
    ],
    fanReviews: [
      { id: "j_f1", userName: "Pooja Mehta", userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop", userRole: "Film Critic", rating: 9, reviewTitle: "Vikram Rathore entry is legendary!", reviewText: "The cigar entry scene with Anirudh's background track will go down in history.", likes: 620, date: "2023-09-09" }
    ],
    isTrending: true,
    isEditorPick: false
  },
  {
    id: "manjummel-boys",
    title: "Manjummel Boys",
    originalTitle: "മഞ്ഞുമ്മൽ ബോയ്സ്",
    language: "Malayalam",
    industry: "Mollywood (Malayalam)",
    releaseYear: 2024,
    releaseDate: "2024-02-22",
    posterUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=500&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1600&auto=format&fit=crop",
    dataSource: "curated" as const,
    genres: ["Survival", "Thriller", "Drama", "Real Events"],
    rating: 9.1,
    userRatingCount: 125000,
    synopsis: "Based on a true incident from 2006, a group of friends from Kochi go on a vacation to Kodaikanal where one of them falls into the treacherous, dark depths of the Guna Caves, triggering an impossible rescue effort.",
    duration: "2h 15m",
    budgetCrores: 20,
    boxOfficeGrossCrores: 240,
    indiaNetGrossCrores: 160,
    overseasGrossCrores: 80,
    roiPercentage: 1100,
    boxOfficeStatus: "All-Time Blockbuster",
    screenCount: 3000,
    director: "Chidambaram",
    directorPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    musicDirector: "Sushin Shyam",
    productionHouse: "Parava Films",
    cinematographer: "Shyju Khalid",
    featuredTrailerUrl: "https://www.youtube.com/embed/gls7N6_74r8",
    videoClips: [
      {
        id: "mb1",
        title: "Manjummel Boys Official Trailer (HD)",
        type: "Official Trailer",
        videoUrl: "https://www.youtube.com/embed/gls7N6_74r8",
        thumbnailUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=500&auto=format&fit=crop",
        duration: "2m 10s",
        isHD: true,
        viewsCount: "45M"
      }
    ],
    cast: [
      { id: "mbc1", name: "Soubin Shahir", characterName: "Kuttan", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", impactScore: 97, roleType: "Lead Actor" },
      { id: "mbc2", name: "Sreenath Bhasi", characterName: "Subhash", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop", impactScore: 98, roleType: "Lead Actor" }
    ],
    reviewSentiment: {
      positivePercentage: 98,
      neutralPercentage: 2,
      negativePercentage: 0,
      consensusSummary: "A masterpiece in emotional tension and realistic world-building.",
      emotionalArc: "Carefree Trip -> Terrifying Abyss Pit -> Heart-stopping Brotherhood Rescue"
    },
    demographicBreakdown: {
      age18To24: 40,
      age25To34: 45,
      age35Plus: 15,
      malePercentage: 62,
      femalePercentage: 38,
      topRegions: [
        { region: "Kerala", footfallsPercentage: 45 },
        { region: "Tamil Nadu", footfallsPercentage: 32 }
      ]
    },
    directorStyleRadar: {
      visualGrandeur: 88,
      storyPacing: 96,
      emotionalResonance: 100,
      commercialAppeal: 94,
      soundtrackIntegration: 100
    },
    streamingPlatforms: [
      { name: "Disney+ Hotstar", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg", directUrl: "https://hotstar.com" }
    ],
    awards: ["Highest Grossing Malayalam Film of All Time"],
    tags: ["Mollywood Gem", "True Event", "Survival Masterpiece"],
    criticReviews: [
      { id: "mb_c1", criticName: "Baradwaj Rangan", publication: "Galatta Plus", rating: 5.0, quote: "A miracle of screenwriting and sound design.", verified: true, date: "2024-02-24" }
    ],
    fanReviews: [],
    isTrending: true,
    isEditorPick: true
  },
  {
    id: "kantara",
    title: "Kantara",
    originalTitle: "ಕಾಂತಾರ",
    language: "Kannada",
    industry: "Sandalwood (Kannada)",
    releaseYear: 2022,
    releaseDate: "2022-09-30",
    posterUrl: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=500&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=1600&auto=format&fit=crop",
    dataSource: "curated" as const,
    genres: ["Folklore", "Action", "Mythology"],
    rating: 8.9,
    userRatingCount: 230000,
    synopsis: "When a human-versus-nature conflict erupts in a Coastal Karnataka village, Shiva, a champion buffalo racer, stands up against a greedy landlord and forest officer, guided by divine Bhoota Kola traditions.",
    duration: "2h 28m",
    budgetCrores: 16,
    boxOfficeGrossCrores: 450,
    indiaNetGrossCrores: 310,
    overseasGrossCrores: 50,
    roiPercentage: 2712,
    boxOfficeStatus: "All-Time Blockbuster",
    screenCount: 4500,
    director: "Rishab Shetty",
    directorPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    musicDirector: "B. Ajaneesh Loknath",
    productionHouse: "Hombale Films",
    cinematographer: "Arvind S. Kashyap",
    featuredTrailerUrl: "https://www.youtube.com/embed/hobYqR0_6N0",
    videoClips: [
      {
        id: "k1",
        title: "Kantara Official Trailer (Multi-Language)",
        type: "Official Trailer",
        videoUrl: "https://www.youtube.com/embed/hobYqR0_6N0",
        thumbnailUrl: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=500&auto=format&fit=crop",
        duration: "2m 30s",
        isHD: true,
        viewsCount: "95M"
      }
    ],
    cast: [
      { id: "kc1", name: "Rishab Shetty", characterName: "Shiva / Kaadubettu Shiva", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", impactScore: 100, roleType: "Lead Actor" }
    ],
    reviewSentiment: {
      positivePercentage: 97,
      neutralPercentage: 2,
      negativePercentage: 1,
      consensusSummary: "National Film Award winner for Best Actor. Celebrated worldwide for bringing indigenous Coastal Karnataka divine folklore onto the big screen.",
      emotionalArc: "Rustic Kampala Pride -> Land Rights Friction -> Divine Demigod Possession Climax"
    },
    demographicBreakdown: {
      age18To24: 34,
      age25To34: 46,
      age35Plus: 20,
      malePercentage: 60,
      femalePercentage: 40,
      topRegions: [
        { region: "Karnataka", footfallsPercentage: 45 },
        { region: "North India", footfallsPercentage: 30 }
      ]
    },
    directorStyleRadar: {
      visualGrandeur: 92,
      storyPacing: 94,
      emotionalResonance: 99,
      commercialAppeal: 97,
      soundtrackIntegration: 98
    },
    streamingPlatforms: [
      { name: "Amazon Prime Video", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png", directUrl: "https://primevideo.com" }
    ],
    awards: ["National Film Award - Best Popular Film", "National Film Award - Best Actor"],
    tags: ["Folklore", "Bhoota Kola", "Divine Climax"],
    criticReviews: [],
    fanReviews: [],
    isTrending: false,
    isEditorPick: true
  },
  {
    id: "leo",
    title: "Leo",
    originalTitle: "லியோ",
    language: "Tamil",
    industry: "Kollywood (Tamil)",
    releaseYear: 2023,
    releaseDate: "2023-10-19",
    posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=500&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=1600&auto=format&fit=crop",
    dataSource: "curated" as const,
    genres: ["Action", "Crime", "LCU Universe"],
    rating: 8.3,
    userRatingCount: 180000,
    synopsis: "Parthiban, a mild-mannered cafe owner in Himachal Pradesh, is pursued by ruthless gangster brothers Antony and Harold Das who are convinced he is their estranged lethal son, Leo Das.",
    duration: "2h 44m",
    budgetCrores: 275,
    boxOfficeGrossCrores: 620,
    indiaNetGrossCrores: 340,
    overseasGrossCrores: 210,
    roiPercentage: 125,
    boxOfficeStatus: "Blockbuster",
    screenCount: 7500,
    director: "Lokesh Kanagaraj",
    directorPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    musicDirector: "Anirudh Ravichander",
    productionHouse: "Seven Screen Studio",
    cinematographer: "Manoj Paramahamsa",
    featuredTrailerUrl: "https://www.youtube.com/embed/Po3jStA673E",
    videoClips: [
      {
        id: "l1",
        title: "Leo Official Trailer (HD Tamil)",
        type: "Official Trailer",
        videoUrl: "https://www.youtube.com/embed/Po3jStA673E",
        thumbnailUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=500&auto=format&fit=crop",
        duration: "2m 44s",
        isHD: true,
        viewsCount: "70M"
      }
    ],
    cast: [
      { id: "lc1", name: "Thalapathy Vijay", characterName: "Parthiban / Leo Das", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", impactScore: 99, roleType: "Lead Actor" }
    ],
    reviewSentiment: {
      positivePercentage: 86,
      neutralPercentage: 10,
      negativePercentage: 4,
      consensusSummary: "Thalapathy Vijay gives an emotionally vulnerable yet fiercely violent dual-toned performance.",
      emotionalArc: "Quiet Family Life -> Hyena Defense -> LCU Phone Call Reveal Climax"
    },
    demographicBreakdown: {
      age18To24: 45,
      age25To34: 40,
      age35Plus: 15,
      malePercentage: 65,
      femalePercentage: 35,
      topRegions: [
        { region: "Tamil Nadu", footfallsPercentage: 50 }
      ]
    },
    directorStyleRadar: {
      visualGrandeur: 90,
      storyPacing: 88,
      emotionalResonance: 85,
      commercialAppeal: 98,
      soundtrackIntegration: 97
    },
    streamingPlatforms: [
      { name: "Netflix", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", directUrl: "https://netflix.com" }
    ],
    awards: ["SIIMA Best Director"],
    tags: ["LCU Universe", "Thalapathy Vijay", "Anirudh BGM"],
    criticReviews: [],
    fanReviews: [],
    isTrending: false,
    isEditorPick: false
  },
  {
    id: "stree-2",
    title: "Stree 2: Sarkate Ka Aatank",
    originalTitle: "स्त्री 2",
    language: "Hindi",
    industry: "Bollywood (Hindi)",
    releaseYear: 2024,
    releaseDate: "2024-08-15",
    posterUrl: "https://images.unsplash.com/photo-1617795778855-ab69c73b4e82?q=80&w=500&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1617795778855-ab69c73b4e82?q=80&w=1600&auto=format&fit=crop",
    dataSource: "curated" as const,
    genres: ["Horror Comedy", "Mystery", "Supernatural"],
    rating: 8.6,
    userRatingCount: 165000,
    synopsis: "The town of Chanderi is haunted by a headless demon called 'Sarkata' who abducts modern women. Vicky, Jana, Bittu, and Rudra team up once again with the mysterious nameless woman to defeat the demonic entity.",
    duration: "2h 27m",
    budgetCrores: 60,
    boxOfficeGrossCrores: 875,
    indiaNetGrossCrores: 600,
    overseasGrossCrores: 140,
    roiPercentage: 1358,
    boxOfficeStatus: "All-Time Blockbuster",
    screenCount: 5500,
    director: "Amar Kaushik",
    directorPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    musicDirector: "Sachin-Jigar",
    productionHouse: "Maddock Films & Jio Studios",
    cinematographer: "Jishnu Bhattacharjee",
    featuredTrailerUrl: "https://www.youtube.com/embed/KVnheWAFiZg",
    videoClips: [
      {
        id: "s2_1",
        title: "Stree 2 Official Trailer (HD)",
        type: "Official Trailer",
        videoUrl: "https://www.youtube.com/embed/KVnheWAFiZg",
        thumbnailUrl: "https://images.unsplash.com/photo-1617795778855-ab69c73b4e82?q=80&w=500&auto=format&fit=crop",
        duration: "3m 05s",
        isHD: true,
        viewsCount: "90M"
      }
    ],
    cast: [
      { id: "sc1", name: "Rajkummar Rao", characterName: "Vicky", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", impactScore: 98, roleType: "Lead Actor" },
      { id: "sc2", name: "Shraddha Kapoor", characterName: "Mysterious Stree", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop", impactScore: 97, roleType: "Lead Actress" }
    ],
    reviewSentiment: {
      positivePercentage: 94,
      neutralPercentage: 4,
      negativePercentage: 2,
      consensusSummary: "A riotous blend of genuine horror scares and belly-laughing comedic timing.",
      emotionalArc: "Chanderi Fear -> Hilarious Investigation -> Maddock Supernatural Crossover"
    },
    demographicBreakdown: {
      age18To24: 38,
      age25To34: 42,
      age35Plus: 20,
      malePercentage: 50,
      femalePercentage: 50,
      topRegions: [
        { region: "North & Central India", footfallsPercentage: 60 }
      ]
    },
    directorStyleRadar: {
      visualGrandeur: 85,
      storyPacing: 95,
      emotionalResonance: 88,
      commercialAppeal: 99,
      soundtrackIntegration: 94
    },
    streamingPlatforms: [
      { name: "Amazon Prime Video", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png", directUrl: "https://primevideo.com" }
    ],
    awards: ["Highest Grossing Hindi Film of 2024"],
    tags: ["Horror Comedy", "Shraddha Kapoor", "Box Office Monster"],
    criticReviews: [],
    fanReviews: [],
    isTrending: false,
    isEditorPick: true
  }
];

export const BOX_OFFICE_PAN_INDIA_TELEMETRY = {
  totalGrossCrores2024: 12850,
  yoyGrowthPercentage: 18.4,
  industryShare: [
    { industry: "Tollywood (Telugu)", sharePercentage: 29, color: "#e5b842" },
    { industry: "Bollywood (Hindi)", sharePercentage: 28, color: "#e50914" },
    { industry: "Kollywood (Tamil)", sharePercentage: 18, color: "#3b82f6" },
    { industry: "Mollywood (Malayalam)", sharePercentage: 14, color: "#10b981" },
    { industry: "Sandalwood (Kannada)", sharePercentage: 7, color: "#8b5cf6" },
    { industry: "Other Regional", sharePercentage: 4, color: "#ec4899" }
  ],
  top1000CroreClub: [
    { title: "Dangal", year: 2016, gross: 2024, language: "Hindi" },
    { title: "Baahubali 2: The Conclusion", year: 2017, gross: 1810, language: "Telugu" },
    { title: "Pushpa 2: The Rule", year: 2024, gross: 1650, language: "Telugu" },
    { title: "RRR", year: 2022, gross: 1380, language: "Telugu" },
    { title: "KGF: Chapter 2", year: 2022, gross: 1250, language: "Kannada" },
    { title: "Jawan", year: 2023, gross: 1150, language: "Hindi" },
    { title: "Kalki 2898 AD", year: 2024, gross: 1100, language: "Telugu" },
    { title: "Pathaan", year: 2023, gross: 1050, language: "Hindi" }
  ]
};
