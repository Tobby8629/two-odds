import { bets, match } from "@/constants/data";
import { betProps, MatchProps, MatchPropsBetslip } from "@/interface";
import { create } from "zustand";

export interface select {
  id: number,
  option: "Home" | "Away" | "Draw"
}

interface Betslip {
  match: MatchProps[];
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

const useBetslip = create<Betslip>((set) => ({
  match: match,
  selectedGames: [],

  selectGame: ({ id, option }: select) =>
  set((state) => {
  let newSelectedGames = [...state.selectedGames];

  const updatedMatch = state.match.map((e) => {
    //check for the game with the given id

    if (e.id === id) {
      //check if the option is already selected
      const alreadySelected = e.selected.some((opt) => opt.option === option);

      if (alreadySelected) {
        // Remove selected option from match
        const SGID = e.selected.find((opt) => opt.option === option)?.id;
        const newSelected = e.selected.filter((opt) => opt.option !== option);

        // Remove corresponding game from selectedGames
        newSelectedGames = newSelectedGames.filter(
          (game) => game.selected.id !== SGID
        );

        return { ...e, selected: newSelected };
      } else {
        // Add new selected option
        const newOption = { id: String(Date.now()), option };
        const newSelected = [...e.selected, newOption];

        // Add game to selectedGames
        newSelectedGames = [...newSelectedGames, { ...e, selected: newOption }];

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
      match: state.match.map((e: MatchProps) =>
        //filters the selected option from the match selected array
        e.selected.some((e)=>e.id === id) ? { ...e, selected: e.selected.filter((e)=>e.id !== id)} : e
      ),
      //filters out the game from selectedGames
      selectedGames: state.selectedGames.filter((e: MatchPropsBetslip) => e.selected.id !== id)
  })),

  clearBetslip: () =>
  set((state) => ({
    //this clears all selected options in the match array
    match: state.match.map((e) =>
      e.selected.length > 0 ? { ...e, selected: [] } : e
    ),
    //this clears all selected games
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
