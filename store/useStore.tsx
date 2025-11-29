import { bets } from "@/constants/data";
import {  Match } from "@/constants/dataOne";
import { betProps,  MatchPropsBetslip } from "@/interface";
import { create } from "zustand";
import { useSport } from "./useSports";

export interface select {
  id: number,
  option: "Home" | "Away" | "Draw"
}

interface Betslip {
  match: Match[];
  setMatches: ( matches: Match[]) => void; 
  selectGame: ({id, option}:select) => void;
  selectedGames: MatchPropsBetslip[];
  removeMatch: (id: string) => void;
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

export const useBetslip = create<Betslip>((set) => ({
  match: [], 
  selectedGames: [],

  setMatches: (matches: Match[]) => set({ match: matches }),

  selectGame: ({ id, option }) =>
  set((state) => {
    let newSelectedGames = [...state.selectedGames];
    
    const updatedMatch = state.match.map((e) => {
      if (e.id === id) {
        const alreadySelected = e.selected.some((opt) => opt.option === option);

        if (alreadySelected) {
          //Get the ID of the already selected option from the Game selected
          const SGID = e.selected.find((opt) => opt.option === option)?.id;

          //Filter out this option from the selected option from the Game selected
          const newSelected = e.selected.filter((opt) => opt.option !== option);

          // remove from selectedGames (single object)
          newSelectedGames = newSelectedGames.filter(
            (game) => game.selected.id !== SGID
          );

          return { ...e, selected: newSelected };
        } 
        else {
          const newOption = { id: String(Date.now()), option };
          const newSelected = [...e.selected, newOption];

          // add to selectedGames
          newSelectedGames = [
            ...newSelectedGames,
            {
              id: e.id,
              home: e.home,
              away: e.away,
              selected: newOption, // single object
            },
          ];

          return { ...e, selected: newSelected };
        }
      }
      return e;
    });

    return {
      match: updatedMatch,
      selectedGames: newSelectedGames,
    };
  }),

  removeMatch: (id: string) =>
    set((state) => ({
      match: state.match.map((e) =>
        e.selected.some((opt) => opt.id === id)
          ? { ...e, selected: e.selected.filter((opt) => opt.id !== id) }
          : e
      ),
      selectedGames: state.selectedGames.filter((e) => e.selected.id !== id),
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
