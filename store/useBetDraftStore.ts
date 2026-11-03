import { create } from "zustand";
import { Match, MarketOutcome } from "@/types/sports.types";

/** Carries the in-progress bet from the create screen to review. */
interface BetDraftState {
  match: Match | null;
  outcome: MarketOutcome | null;
  outcomeLabel: string;
  betType: string;
  stake: number;

  setDraft: (draft: {
    match: Match;
    outcome: MarketOutcome;
    outcomeLabel: string;
    betType: string;
    stake: number;
  }) => void;
  clearDraft: () => void;
}

const empty = {
  match: null,
  outcome: null,
  outcomeLabel: "",
  betType: "MATCH_WINNER",
  stake: 0,
};

export const useBetDraftStore = create<BetDraftState>((set) => ({
  ...empty,

  setDraft: (draft) => set({ ...draft }),
  clearDraft: () => set({ ...empty }),
}));
