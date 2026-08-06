import { create } from "zustand";

export type P2PScreen = "landing" | "searching" | "list";

/**
 * Navigation state for the P2P flow only.
 *
 * The bets themselves are server-owned and live in React Query - see
 * hooks/useBets. This store previously held a hardcoded mockBets array and a
 * fetchBets that resolved a setTimeout; both are gone.
 */
interface P2PState {
  currentScreen: P2PScreen;
  setScreen: (screen: P2PScreen) => void;
  resetToHome: () => void;
}

export const useP2PStore = create<P2PState>((set) => ({
  currentScreen: "landing",

  setScreen: (screen) => set({ currentScreen: screen }),

  resetToHome: () => set({ currentScreen: "landing" }),
}));
