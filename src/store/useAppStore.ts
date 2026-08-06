import { create } from "zustand";
import type { TabType } from "../types";

interface AppStore {
  activeTab: TabType;
  isAiCopilotOpen: boolean;
  isCommandPaletteOpen: boolean;
  isStreamingOpen: boolean;

  setActiveTab: (tab: TabType) => void;
  openAiCopilot: () => void;
  closeAiCopilot: () => void;
  toggleAiCopilot: () => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  openStreaming: () => void;
  closeStreaming: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeTab: "explore",
  isAiCopilotOpen: false,
  isCommandPaletteOpen: false,
  isStreamingOpen: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  openAiCopilot: () => set({ isAiCopilotOpen: true }),
  closeAiCopilot: () => set({ isAiCopilotOpen: false }),
  toggleAiCopilot: () => set((s) => ({ isAiCopilotOpen: !s.isAiCopilotOpen })),
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
  openStreaming: () => set({ isStreamingOpen: true }),
  closeStreaming: () => set({ isStreamingOpen: false }),
}));
