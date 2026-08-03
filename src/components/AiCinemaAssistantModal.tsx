import React, { useState } from "react";
import { Sparkles, X, Send, Bot, User, Loader2, Film } from "lucide-react";
import { UserRole } from "../types";

interface AiCinemaAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  userName: string;
}

export const AiCinemaAssistantModal: React.FC<AiCinemaAssistantModalProps> = ({
  isOpen,
  onClose,
  userRole,
  userName,
}) => {
  if (!isOpen) return null;

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string; timestamp: string }[]
  >([
    {
      sender: "ai",
      text: `Hello ${userName}! I am CineAI Copilot, your expert Indian Cinema Assistant. Ask me anything about Pan-Indian box office records, director style breakdowns (S.S. Rajamouli, Mani Ratnam, Lokesh Kanagaraj), actor filmography impact, or script ideas for your ${userRole} journey!`,
      timestamp: "Just now",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const presetPrompts = [
    "Compare S.S. Rajamouli vs Sukumar's direction style",
    "Top 5 highest grossing Malayalam movies worldwide",
    "What makes Anirudh Ravichander's background scores so iconic?",
    "Explain the box office multiplier effect of Pan-Indian films"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsgObj = {
      sender: "user" as const,
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsgObj]);
    if (!textToSend) setInputMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini/industry-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: query,
          userRole: userRole,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "I'm having trouble connecting to the Indian Cinema database right now. Please try again in a moment.",
            timestamp: "Just now",
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Communication error with server AI endpoint.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0F1116] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[640px] max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#14171E] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-black flex items-center justify-center shadow-lg font-bold">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <span>CineAI Copilot</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono border border-emerald-500/30">
                  Gemini 3.6 Flash
                </span>
              </h3>
              <p className="text-xs text-gray-400">Indian Cinema Ecosystem Consultant</p>
            </div>
          </div>

          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#0A0C10]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  msg.sender === "user"
                    ? "bg-emerald-500 text-black"
                    : "bg-[#14171E] border border-white/10 text-emerald-400"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 fill-current" />}
              </div>

              <div
                className={`max-w-[82%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-emerald-500 text-black font-medium rounded-tr-none"
                    : "bg-[#14171E] border border-white/5 text-gray-300 rounded-tl-none whitespace-pre-line"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[9px] mt-1 text-right font-mono ${msg.sender === "user" ? "text-black/60" : "text-gray-500"}`}>{msg.timestamp}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20 max-w-xs font-mono">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Indian Cinema Telemetry...</span>
            </div>
          )}
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="px-4 py-2 border-t border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none bg-[#14171E]">
          {presetPrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSendMessage(p)}
              className="text-[10px] bg-[#0F1116] hover:bg-white/5 border border-white/5 text-emerald-400 px-2.5 py-1 rounded-xl whitespace-nowrap transition-colors cursor-pointer font-mono"
            >
              ✨ {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-[#14171E] border-t border-white/5 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about box office records, scripts, directors, or actors..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-[#0F1116] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 font-sans"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="p-2.5 bg-emerald-500 text-black rounded-xl font-extrabold hover:bg-emerald-400 disabled:opacity-40 transition-opacity cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
