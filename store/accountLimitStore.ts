
import { create } from "zustand";
import { LimitPeriod, WalletCurrency } from "@/types/wallet.types";

/**
 * Form state for the deposit-limit screen only. The limits themselves are
 * server-owned and live in React Query — see hooks/useDepositLimits.
 */
interface AccountLimitState {
  selectedPeriod: LimitPeriod;
  selectedCurrency: WalletCurrency;
  amount: string;
  showInfoModal: boolean;
  error: string | null;

  setSelectedPeriod: (period: LimitPeriod) => void;
  setSelectedCurrency: (currency: WalletCurrency) => void;
  setAmount: (value: string) => void;
  toggleInfoModal: (visible?: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAccountLimitStore = create<AccountLimitState>((set) => ({
  selectedPeriod: "daily",
  /*
   * Naira is the primary wallet: deposits, withdrawals and bank details all
   * run through Paystack. Held in state so a currency switcher can be added
   * without touching the callers.
   */
  selectedCurrency: "NGN",
  amount: "",
  showInfoModal: false,
  error: null,

  setSelectedPeriod: (period) => set({ selectedPeriod: period }),
  setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
  setAmount: (value) => set({ amount: value }),
  toggleInfoModal: (visible) =>
    set((state) => ({ showInfoModal: visible ?? !state.showInfoModal })),
  setError: (error) => set({ error }),
}));
