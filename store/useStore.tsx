import { match } from "@/constants/data";
import { MatchProps } from "@/interface";
import { create } from "zustand";

interface Betslip {
  match: MatchProps[];
  removeMatch: (id: number) => void;
  clearBetslip: () => void;
}

const useBetslip = create<Betslip>((set) => ({
  match: match,
  removeMatch: (id: number) =>
    set((state) => ({
      match: state.match.filter((e: MatchProps) => e.id !== id),
  })),
  clearBetslip: () => set(()=> ({ match: []}))
}));

export default useBetslip;
