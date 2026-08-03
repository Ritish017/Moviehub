import { CommunityThread } from "../types";

export const INITIAL_COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: "thread-1",
    title: "The Rise of Pan-Indian Sci-Fi & Mythology: Kalki 2898 AD vs Baahubali",
    content: "With Nag Ashwin introducing Bujji and Mahabharata lore in Kalki 2898 AD, Indian cinema has officially broken into high-budget world-building sci-fi. How do you rate the VFX and narrative pacing compared to Rajamouli's Baahubali and RRR?",
    authorName: "Vikramaditya_Cinema",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
    authorRole: "Box Office Analyst",
    category: "Box Office Battles",
    languageFilter: "Pan-India",
    upvotes: 420,
    viewsCount: 5800,
    commentCount: 48,
    createdAt: "2 hours ago",
    tags: ["Pan-India", "Kalki2898AD", "SciFi", "Rajamouli"],
    relatedMovieId: "kalki-2898-ad",
    comments: [
      {
        id: "c-101",
        authorName: "Anupama_Reviewer",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
        authorRole: "Film Critic",
        text: "The combination of Ashwatthama's immortality arc with cyberpunk Kasi was revolutionary. The VFX done by DNEG and local Indian studios matches Hollywood standards at a fraction of the budget.",
        timestamp: "1 hour ago",
        upvotes: 82,
        isVerifiedCritic: true
      },
      {
        id: "c-102",
        authorName: "Rajesh_Director_Cut",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        authorRole: "Aspiring Director",
        text: "As an aspiring director, what blew my mind was Santhosh Narayanan's synth-dhol background score during the Bujji chase. It gave Kasi a distinct futuristic pulse.",
        timestamp: "45 mins ago",
        upvotes: 34
      }
    ]
  },
  {
    id: "thread-2",
    title: "Why Malayalam Cinema (Mollywood) is Dominating 2024 Content Quality",
    content: "From Manjummel Boys crossing ₹240 Cr to Aavesham and Bramayugam, Mollywood is proving that screenplay, character writing, and realistic world-building beat mindless massive budgets every single time. Let's discuss!",
    authorName: "Siddharth_Nair",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    authorRole: "Cinephile Fan",
    category: "Director Spotlight",
    languageFilter: "Malayalam",
    upvotes: 610,
    viewsCount: 8900,
    commentCount: 72,
    createdAt: "5 hours ago",
    tags: ["Mollywood", "ManjummelBoys", "Aavesham", "ScreenplayMastery"],
    relatedMovieId: "manjummel-boys",
    comments: [
      {
        id: "c-201",
        authorName: "Karthik_G",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        authorRole: "Actor / Crew Member",
        text: "The Guna Cave set created in Kochi was so authentic that viewers couldn't tell it wasn't the real cave! Art direction and sound mixing in Malayalam movies are unmatched.",
        timestamp: "3 hours ago",
        upvotes: 120
      }
    ]
  },
  {
    id: "thread-3",
    title: "Frame-by-Frame Breakdown: Sukumar's Gangamma Jathara Sequence in Pushpa 2",
    content: "Let's dissect the color palette, blue-sari symbolism, sound mixing, and camera tracking in Pushpa 2's Jathara sequence. How Sukumar transformed traditional folk rituals into a peak mass hero moment.",
    authorName: "FrameByFrame_India",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    authorRole: "Aspiring Director",
    category: "Script Analysis",
    languageFilter: "Telugu",
    upvotes: 380,
    viewsCount: 4200,
    commentCount: 31,
    createdAt: "1 day ago",
    tags: ["Pushpa2", "AlluArjun", "Sukumar", "DirectionTechnique"],
    relatedMovieId: "pushpa-2-the-rule",
    comments: []
  },
  {
    id: "thread-4",
    title: "Lokesh Cinematic Universe (LCU) Future Roadmap: Vikram 2, Leo 2, and Rolex standalone film?",
    content: "Lokesh Kanagaraj confirmed that Rolex (Suriya) will get his own dark spin-off before the grand crossover. What are your theories on how Dilli (Karthi), Vikram (Kamal Haasan), and Leo (Vijay) will team up?",
    authorName: "LCU_Theory_Craft",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    authorRole: "Cinephile Fan",
    category: "Fan Theories",
    languageFilter: "Tamil",
    upvotes: 540,
    viewsCount: 7100,
    commentCount: 64,
    createdAt: "2 days ago",
    tags: ["LCU", "Leo", "Vikram", "SuriyaRolex"],
    relatedMovieId: "leo",
    comments: []
  }
];
