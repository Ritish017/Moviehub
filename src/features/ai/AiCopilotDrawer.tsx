import React, { useState, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useUserStore } from "../../store/useUserStore";

export const AiCopilotDrawer: React.FC = () => {
  const { isAiCopilotOpen, closeAiCopilot } = useAppStore();
  const { userProfile } = useUserStore();

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string; timestamp: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAiCopilotOpen && messages.length === 0) {
      setMessages([
        {
          sender: "ai",
          text: `Hello ${userProfile.name}! I am CineAI Copilot, your expert Indian Cinema Assistant. Ask me anything about Pan-Indian box office records, director style breakdowns, actor filmography impact, or script ideas for your ${userProfile.role} journey!`,
          timestamp: "Just now",
        },
      ]);
    }
  }, [isAiCopilotOpen, messages.length, userProfile.name, userProfile.role]);

  const presetPrompts = [
    "Compare S.S. Rajamouli vs Sukumar's direction style",
    "Top 5 highest grossing Malayalam movies worldwide",
    "What makes Anirudh's background scores so iconic?",
    "Explain the box office multiplier effect",
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
          userRole: userProfile.role,
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

  if (!isAiCopilotOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeAiCopilot}
      />

      {/* Right Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] md:w-[480px] bg-[#0F1116] border-l border-white/10 shadow-2xl flex flex-col transform transition-transform duration-300 animate-slideInRight">
        {/* Header */}
        <div className="p-4 bg-[#14171E] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <span>CineAI Copilot</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono border border-emerald-500/30 uppercase">
                  Online
                </span>
              </h3>
              <p className="text-xs text-gray-400">Indian Cinema Expert</p>
            </div>
          </div>

          <button onClick={closeAiCopilot} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-5 bg-[#0A0C10] scrollbar-thin">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end gap-3 ${
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
                className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-lg ${
                  msg.sender === "user"
                    ? "bg-emerald-600 text-white rounded-2xl rounded-br-sm"
                    : "bg-[#14171E] border border-white/5 text-gray-200 rounded-2xl rounded-bl-sm whitespace-pre-line"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-2 text-right font-mono ${msg.sender === "user" ? "text-emerald-100/60" : "text-gray-500"}`}>{msg.timestamp}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-end gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#14171E] border border-white/10 text-emerald-400">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-[#14171E] p-4 rounded-2xl rounded-bl-sm border border-emerald-500/20 font-mono">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-3 bg-[#14171E] border-t border-white/5">
          <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-none pb-2">
            {presetPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSendMessage(p)}
                className="text-[11px] bg-[#0F1116] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-emerald-400 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 mt-1"
          >
            <input
              type="text"
              placeholder="Message CineAI..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-[#0F1116] border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="w-11 h-11 flex items-center justify-center bg-emerald-500 text-black rounded-full font-extrabold hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
