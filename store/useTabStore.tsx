
// store/useTabStore.ts
import { create } from "zustand";

type TabType = "bets" | "p2p";

interface TabState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const useTabStore = create<TabState>((set) => ({
  activeTab: "bets", // default
  setActiveTab: (tab) => set({ activeTab: tab }),
}));