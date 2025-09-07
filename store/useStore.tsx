import { bets, match } from "@/constants/data";
import { betProps, MatchProps } from "@/interface";
import { create } from "zustand";

interface Betslip {
  match: MatchProps[];
  removeMatch: (id: number) => void;
  clearBetslip: () => void;
}

interface betHistory {
  bets: betProps[],
  deleteBetSlip: (id:string) => void
}

const useBetslip = create<Betslip>((set) => ({
  match: match,
  removeMatch: (id: number) =>
    set((state) => ({
      match: state.match.filter((e: MatchProps) => e.id !== id),
  })),
  clearBetslip: () => set(()=> ({ match: []}))
}));

export const useBetHistory = create<betHistory>((set, get)=>({
  bets: bets,
  deleteBetSlip: ((id: string) => set((state)=>({
    bets: state.bets.filter((bet)=> bet.id != Number(id))
  })))
}))

export default useBetslip;
