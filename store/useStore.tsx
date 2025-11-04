import { bets, match } from "@/constants/data";
import { betProps, MatchProps } from "@/interface";
import { create } from "zustand";


export interface select {
  id: number,
  option: "Home" | "Away" | "Draw"
}

interface Betslip {
  match: MatchProps[];
  selectGame: ({id, option}:select) => void;
  selectedGames: MatchProps[];
  removeMatch: (id: number) => void;
  clearBetslip: () => void;
}

interface betHistory {
  bets: betProps[],
  deleteBetSlip: (id:string) => void
}


export interface WithdrawInfo{
  amount: string | null,
  asset: "solana" | "usdt" | "naira",
  walletAddress: string,
}

interface withdrawal {
  withdrawStatus: boolean
  updateWithdrawStatus: () => void
  removeWithdrawStatus: () => void
  withdrawInfo: WithdrawInfo,
  updateWithdrawInfo: (val: WithdrawInfo ) => void
}

const useBetslip = create<Betslip>((set) => ({
  match: match,
  selectedGames: [],

  selectGame: ({ id, option }: select) =>
  set((state) => {
    const updatedMatches = state.match.map((e: MatchProps) => {
      if (e.id === id) {
        const alreadySelected = e.selected.includes(option);
        const newSelected = alreadySelected
          ? e.selected.filter((opt) => opt !== option)
          : [...e.selected, option];
        return { ...e, selected: newSelected };
      }
      return e;
    });

    const updatedGame = updatedMatches.find((e) => e.id === id);
    const updatedSelectedGames = updatedGame?.selected.length
      ? [...state.selectedGames.filter((g) => g.id !== id), updatedGame]
      : state.selectedGames.filter((g) => g.id !== id);

    return {
      match: updatedMatches,
      selectedGames: updatedSelectedGames,
    };
  }),

  removeMatch: (id: number) =>
    set((state) => ({
      match: state.match.map((e: MatchProps) =>
        e.id === id ? { ...e, selected: [] } : e
      ),
      selectedGames: state.selectedGames.filter((e: MatchProps) => e.id !== id)
  })),

  clearBetslip: () =>
  set((state) => ({
    match: state.match.map((e) =>
      e.selected.length > 0 ? { ...e, selected: [] } : e
    ),
    selectedGames: [],
  })),

}));

export const useBetHistory = create<betHistory>((set, get)=>({
  bets: bets,
  deleteBetSlip: ((id: string) => set((state)=>({
    bets: state.bets.filter((bet)=> bet.id != Number(id))
  })))
}))

export const useWithdrawal = create<withdrawal>((set, get)=>({
  withdrawStatus: false,
  withdrawInfo: {
    amount: null,
    asset: "usdt",
    walletAddress: "",
  },
  updateWithdrawStatus: (()=> set(()=> ({
    withdrawStatus: true
  }))),
  removeWithdrawStatus: (()=>set(()=>({
    withdrawStatus:false 
  }))),
  updateWithdrawInfo: ((val: WithdrawInfo)=>(set(()=>({
    withdrawInfo: val
  }))))
}))

export default useBetslip;
