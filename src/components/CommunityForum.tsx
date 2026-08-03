import React, { useState } from "react";
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  PlusCircle,
  Tag,
  User,
  CheckCircle,
  Send,
  X,
  Flame,
  MessageCircle
} from "lucide-react";
import { CommunityThread, LanguageType, UserRole } from "../types";
import { INITIAL_COMMUNITY_THREADS } from "../data/communityData";

interface CommunityForumProps {
  userRole: UserRole;
  userName: string;
}

export const CommunityForum: React.FC<CommunityForumProps> = ({ userRole, userName }) => {
  const [threads, setThreads] = useState<CommunityThread[]>(INITIAL_COMMUNITY_THREADS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeThread, setActiveThread] = useState<CommunityThread | null>(null);
  
  // New thread modal state
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<any>("Box Office Battles");
  const [newLanguage, setNewLanguage] = useState<LanguageType>("Pan-India");

  // New comment state inside open thread
  const [commentText, setCommentText] = useState("");

  const categories = [
    "All",
    "Box Office Battles",
    "Trailer Analysis",
    "Director Spotlight",
    "Fan Theories",
    "Script Analysis",
    "Industry News"
  ];

  const filteredThreads = threads.filter((t) => {
    if (selectedCategory !== "All" && t.category !== selectedCategory) return false;
    return true;
  });

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const threadObj: CommunityThread = {
      id: `thread-${Date.now()}`,
      title: newTitle,
      content: newContent,
      authorName: userName,
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
      authorRole: userRole,
      category: newCategory,
      languageFilter: newLanguage,
      upvotes: 1,
      viewsCount: 12,
      commentCount: 0,
      createdAt: "Just now",
      tags: [newCategory.replace(/\s+/g, ""), newLanguage],
      comments: []
    };

    setThreads([threadObj, ...threads]);
    setIsNewThreadOpen(false);
    setNewTitle("");
    setNewContent("");
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !activeThread) return;

    const newComm = {
      id: `c-${Date.now()}`,
      authorName: userName,
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
      authorRole: userRole,
      text: commentText,
      timestamp: "Just now",
      upvotes: 1,
      isVerifiedCritic: userRole === "Film Critic"
    };

    const updatedThread = {
      ...activeThread,
      commentCount: activeThread.commentCount + 1,
      comments: [...activeThread.comments, newComm]
    };

    setActiveThread(updatedThread);
    setThreads(threads.map((t) => (t.id === updatedThread.id ? updatedThread : t)));
    setCommentText("");
  };

  const handleUpvoteThread = (threadId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads(
      threads.map((t) => {
        if (t.id === threadId) {
          return { ...t, upvotes: t.upvotes + 1 };
        }
        return t;
      })
    );
    if (activeThread && activeThread.id === threadId) {
      setActiveThread({ ...activeThread, upvotes: activeThread.upvotes + 1 });
    }
  };

  return (
    <div className="space-y-6 my-8">
      
      {/* Header Bar */}
      <div className="bg-[#14171E] border border-white/5 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-mono">
              Live Cinema Lounge
            </span>
            <span className="text-xs text-gray-500">All Indian Languages</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            CineBharat Community Forum
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Real-time discussions, trailer frame breakdowns, box office debates & director spotlights.
          </p>
        </div>

        <button
          onClick={() => setIsNewThreadOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" /> Start Discussion
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                : "bg-[#14171E] text-gray-400 hover:bg-white/5 border border-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Forum List & Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Threads List Pane */}
        <div className={`space-y-4 ${activeThread ? "lg:col-span-1" : "lg:col-span-3"}`}>
          {filteredThreads.map((thread) => (
            <div
              key={thread.id}
              onClick={() => setActiveThread(thread)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeThread?.id === thread.id
                  ? "bg-[#14171E] border-emerald-500 shadow-xl"
                  : "bg-[#14171E] border-white/5 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <img src={thread.authorAvatar} alt={thread.authorName} className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-xs font-bold text-white">{thread.authorName}</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-mono">
                      {thread.authorRole}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{thread.createdAt}</span>
                </div>

                <h3 className="text-sm font-bold text-white font-sans line-clamp-2 hover:text-emerald-400 transition-colors">
                  {thread.title}
                </h3>
                
                <p className="text-xs text-gray-400 line-clamp-2 mt-1.5">
                  {thread.content}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs text-gray-500">
                <div className="flex items-center gap-3 font-mono">
                  <button
                    onClick={(e) => handleUpvoteThread(thread.id, e)}
                    className="flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> {thread.upvotes}
                  </button>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-gray-500" /> {thread.commentCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-gray-500" /> {thread.viewsCount}
                  </span>
                </div>

                <span className="text-[9px] bg-white/5 text-gray-400 px-2 py-0.5 rounded font-mono">
                  {thread.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Thread Detailed Discussion View */}
        {activeThread && (
          <div className="lg:col-span-2 bg-[#14171E] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col space-y-6">
            
            {/* Thread Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-mono">
                  {activeThread.category} • {activeThread.languageFilter}
                </span>
                <button
                  onClick={() => setActiveThread(null)}
                  className="text-gray-500 hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-xl font-extrabold text-white font-sans leading-snug">
                {activeThread.title}
              </h2>

              <div className="flex items-center gap-2 mt-3 text-xs text-gray-300">
                <img src={activeThread.authorAvatar} alt={activeThread.authorName} className="w-7 h-7 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{activeThread.authorName}</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-mono">
                      {activeThread.authorRole}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">Posted {activeThread.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Thread Main Post Content */}
            <div className="p-4 bg-[#0F1116] border border-white/5 rounded-2xl text-xs sm:text-sm text-gray-200 leading-relaxed">
              {activeThread.content}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleAddComment} className="space-y-3 bg-[#0F1116] p-4 rounded-2xl border border-white/5">
              <span className="text-xs font-bold text-gray-300">Join Discussion as {userName} ({userRole})</span>
              <textarea
                rows={3}
                placeholder="Share your perspective, box office predictions, or technical film feedback..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-[#14171E] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white font-sans">
                Replies & Discussions ({activeThread.comments.length})
              </h4>

              {activeThread.comments.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No replies yet. Be the first to share your perspective!</p>
              ) : (
                activeThread.comments.map((comm) => (
                  <div key={comm.id} className="p-4 bg-[#0F1116] border border-white/5 rounded-2xl space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img src={comm.authorAvatar} alt={comm.authorName} className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-bold text-white">{comm.authorName}</span>
                        {comm.isVerifiedCritic && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono flex items-center gap-0.5">
                            <CheckCircle className="w-3 h-3" /> Critic
                          </span>
                        )}
                        <span className="text-[9px] bg-white/5 text-gray-400 px-1.5 py-0.2 rounded font-mono">{comm.authorRole}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">{comm.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-300">{comm.text}</p>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>

      {/* Create New Thread Modal */}
      {isNewThreadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0F1116] border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-sans">Start New Indian Cinema Discussion</h3>
              <button onClick={() => setIsNewThreadOpen(false)} className="text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-300 block mb-1">Discussion Title</label>
                <input
                  type="text"
                  placeholder="e.g. Will Kalki 2898 AD Part 2 break the ₹2000 Crore barrier?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#14171E] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-300 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-[#14171E] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-300 block mb-1">Language</label>
                  <select
                    value={newLanguage}
                    onChange={(e: any) => setNewLanguage(e.target.value)}
                    className="w-full bg-[#14171E] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Pan-India">Pan-India</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Kannada">Kannada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-300 block mb-1">Discussion Content</label>
                <textarea
                  rows={4}
                  placeholder="Write your analysis, questions, or theories here..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-[#14171E] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewThreadOpen(false)}
                  className="px-4 py-2 bg-white/5 text-gray-400 rounded-lg text-xs font-bold hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg text-xs font-extrabold shadow"
                >
                  Publish Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
