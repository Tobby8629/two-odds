
import { create } from "zustand";

type LimitPeriod = "daily" | "weekly" | "monthly";

interface AccountLimits {
  daily: number | null;
  weekly: number | null;
  monthly: number | null;
}

interface AccountLimitState {
  limits: AccountLimits;
  selectedPeriod: LimitPeriod;
  selectedChip: LimitPeriod;
  amount: string;
  isLoading: boolean;
  showInfoModal: boolean;
  error: string | null;
  

  // Actions
  setSelectedPeriod: (period: LimitPeriod) => void;
  setSelectedChip: (chip: LimitPeriod) => void;
  setAmount: (value: string) => void;
  toggleInfoModal: (visible?: boolean) => void;
  setError: (error: string | null) => void;

  // Limit updates
  setLimit: (period: LimitPeriod, amount: number) => void;
  clearLimit: (period: LimitPeriod) => void;
  updateLimit: (period: LimitPeriod, amount: number) => Promise<void>;
}

// Mock initial data
const initialLimits: AccountLimits = {
  daily: null,
  weekly: null,
  monthly: null,
};

export const useAccountLimitStore = create<AccountLimitState>((set, get) => ({
  limits: initialLimits,
  selectedPeriod: "daily",
  selectedChip: "daily",
  amount: "",
  isLoading: false,
  showInfoModal: false,
  error: null,

  setSelectedPeriod: (period) => set({ selectedPeriod: period }),
  setSelectedChip: (chip) => set({ selectedChip: chip }),
  setAmount: (value) => set({ amount: value }),
  toggleInfoModal: (visible) =>
    set((state) => ({ showInfoModal: visible ?? !state.showInfoModal })),

  setLimit: (period, amount) =>
    set((state) => ({
      limits: { ...state.limits, [period]: amount },
    })),

  clearLimit: (period) =>
    set((state) => ({
      limits: { ...state.limits, [period]: null },
    })),
      setError: (error) => set({ error }), 

  updateLimit: async (period, amount) => {
    const { setLimit } = get();
    set({ isLoading: true, error: null });

    try {
      // simulate API call
      await new Promise((res) => setTimeout(res, 1000));

      setLimit(period, amount);
      set({ isLoading: false, amount: "" });
    } catch (e) {
      set({
        isLoading: false,
        error: "Failed to update deposit limit. Please try again.",
      });
    }
  },
}));
