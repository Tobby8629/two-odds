import { create } from 'zustand';

interface P2PBet {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatarimage?: string;
  successRate: string;
  preferredBets: string;
  responseTime: string;
  status: 'available' | 'accepted' | 'completed';
}

interface P2PUser {
  id: string;
  name: string;
  image: any; // can be require(...) or a URL string
}

interface P2PState {
  currentScreen: 'landing' | 'searching' | 'list';
  isSearching: boolean;
  availableBets: P2PBet[];
  users: P2PUser[];

  // Actions
  setScreen: (screen: 'landing' | 'searching' | 'list') => void;
  startSearch: () => void;
  stopSearch: () => void;
  setAvailableBets: (bets: P2PBet[]) => void;
  setUsers: (users: P2PUser[]) => void;
}

export const useP2PStore = create<P2PState>((set) => ({
  currentScreen: 'landing',
  isSearching: false,
  availableBets: [],
  users: [],

  setScreen: (screen) => set({ currentScreen: screen }),
  startSearch: () => set({ isSearching: true }),
  stopSearch: () => set({ isSearching: false }),
  setAvailableBets: (bets) => set({ availableBets: bets }),
  setUsers: (users: P2PUser[]) => set({ users }),
}));
