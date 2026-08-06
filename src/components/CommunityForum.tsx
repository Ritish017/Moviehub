import React, { useState } from "react";
import { MessageSquare, Heart, Share2, PlusCircle, User, Sparkles, AlertTriangle, MessageCircle, MoreHorizontal } from "lucide-react";
import { CommunityThread, LanguageType, UserRole } from "../types";
import { INITIAL_COMMUNITY_THREADS } from "../data/communityData";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";

interface CommunityForumProps {
  userRole: UserRole;
  userName: string;
}

export const CommunityForum: React.FC<CommunityForumProps> = ({ userRole, userName }) => {
  const [threads, setThreads] = useState<CommunityThread[]>(INITIAL_COMMUNITY_THREADS);
  const [activeTab, setActiveTab] = useState<"for-you" | "following" | "trending">("for-you");
  const [revealedSpoilers, setRevealedSpoilers] = useState<Set<string>>(new Set());

  const toggleSpoiler = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedSpoilers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-0 py-12 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white font-serif tracking-tight flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-blue-500" /> Community
          </h2>
          <p className="text-gray-400 mt-2 font-medium">
            Join the conversation with verified critics and cinephiles.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all cursor-pointer">
          <PlusCircle className="w-5 h-5" /> New Post
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-white/10 pb-4">
        {["for-you", "following", "trending"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "text-sm font-bold capitalize transition-colors relative pb-4 -mb-4",
              activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300"
            )}
          >
            {tab.replace("-", " ")}
            {activeTab === tab && (
              <motion.div
                layoutId="community-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* AI Summary Banner */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-2xl p-5 flex items-start gap-4">
        <Sparkles className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
        <div>
          <h4 className="text-purple-100 font-bold text-sm mb-1">CineAI Community Summary</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            The community is heavily debating the <strong className="text-white">Pushpa 2 vs Kalki 2898 AD</strong> box office clash. Theories about the multiverse cameo in <strong className="text-white">Jawan 2</strong> are also trending.
          </p>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        <AnimatePresence>
          {threads.map((thread) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#121212] border border-white/5 p-6 rounded-[2rem] hover:border-white/10 transition-colors shadow-xl"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={thread.authorAvatar} alt="" className="w-12 h-12 rounded-full object-cover border border-white/10" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{thread.authorName}</span>
                      {thread.authorRole === "Film Critic" && (
                        <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/20 font-bold">
                          Verified Critic
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{thread.createdAt} • {thread.category}</span>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-white p-2">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Content */}
              <div className="pl-15 space-y-4">
                <h3 className="text-xl font-bold text-white font-serif">{thread.title}</h3>
                
                {thread.content.includes("SPOILER") ? (
                  <div className="relative rounded-xl overflow-hidden cursor-pointer" onClick={(e) => toggleSpoiler(thread.id, e)}>
                    <div className={cn(
                      "transition-all duration-500",
                      !revealedSpoilers.has(thread.id) ? "filter blur-md opacity-50" : "filter-none opacity-100"
                    )}>
                      <p className="text-gray-300 text-sm leading-relaxed">{thread.content.replace("[SPOILER]", "")}</p>
                    </div>
                    {!revealedSpoilers.has(thread.id) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-red-500/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> Tap to reveal spoiler
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 text-sm leading-relaxed">{thread.content}</p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-8 pt-4">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group">
                    <Heart className="w-5 h-5 group-hover:fill-current" />
                    <span className="text-xs font-bold">{thread.upvotes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors group">
                    <MessageSquare className="w-5 h-5 group-hover:fill-current" />
                    <span className="text-xs font-bold">{thread.commentCount}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors group">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
