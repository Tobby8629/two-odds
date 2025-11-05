// store/useP2PStore.ts
import { create } from 'zustand';

const defaultAvatar = require('@/assets/images/user.png'); // Local fallback image

interface P2PBet {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatarImage: any;
  successRate: string;
  preferredBets: string;
  responseTime: string;
  totalBets: string;
  status: 'available' | 'accepted' | 'completed';
}

interface P2PUser {
  id: string;
  name: string;
  image: any;
}

interface P2PState {
  currentScreen: 'landing' | 'searching' | 'list';
  isSearching: boolean;
  availableBets: P2PBet[];
  users: P2PUser[];

  setScreen: (screen: 'landing' | 'searching' | 'list') => void;
  startSearch: () => void;
  stopSearch: () => void;
  setAvailableBets: (bets: P2PBet[]) => void;
  setUsers: (users: P2PUser[]) => void;
  fetchBets: () => Promise<void>;
  updateBetStatus: (betId: string, newStatus: 'available' | 'accepted' | 'completed') => void;
  resetToHome: () => void;
}

export const useP2PStore = create<P2PState>((set) => ({
  currentScreen: 'landing',
  isSearching: false,
  availableBets: [],
  users: [
    { id: 'u1', name: 'Yusuf', image: defaultAvatar },
    { id: 'u2', name: 'Chris', image: defaultAvatar },
    { id: 'u3', name: 'Tobi', image: defaultAvatar },
  ],

  setScreen: (screen) => set({ currentScreen: screen }),
  startSearch: () => set({ isSearching: true }),
  stopSearch: () => set({ isSearching: false }),
  setAvailableBets: (bets) => set({ availableBets: bets }),
  setUsers: (users) => set({ users }),

  updateBetStatus: (betId, newStatus) =>
    set((state) => ({
      availableBets: state.availableBets.map((bet) =>
        bet.id === betId ? { ...bet, status: newStatus } : bet
      ),
    })),

  fetchBets: async () => {
    const mockBets: P2PBet[] = [
      {
        id: 'b1',
        playerId: 'u1',
        playerName: 'Yusuf',
        playerAvatarImage: defaultAvatar,
        successRate: '88.8%',
        preferredBets: '450$',
        responseTime: '-2m',
        totalBets: '156',
        status: 'available',
      },
      {
        id: 'b2',
        playerId: 'u2',
        playerName: 'Chris',
        playerAvatarImage: defaultAvatar,
        successRate: '79.4%',
        preferredBets: '$450',
        responseTime: '-1m',
        totalBets: '204',
        status: 'available',
      },
      {
        id: 'b3',
        playerId: 'u3',
        playerName: 'Tobi',
        playerAvatarImage: defaultAvatar,
        successRate: '91.2%',
        preferredBets: '$450',
        responseTime: '-1m',
        totalBets: '320',
        status: 'available',
      },
    ];

    await new Promise((resolve) => setTimeout(resolve, 800));
    set({
      availableBets: mockBets,
      currentScreen: 'list',
      isSearching: false,
    });
  },

  // NEW: resets P2P UI state back to landing
  resetToHome: () =>
    set({
      currentScreen: 'landing',
      isSearching: false,
    }),
}));