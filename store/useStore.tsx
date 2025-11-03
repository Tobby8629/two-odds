import { bets, match } from "@/constants/data";
import { betProps, MatchProps, MatchPropsBetslip } from "@/interface";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";


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

  // selectGame: ({ id, option }: select) =>
  // set((state) => {
  //   //this updates the cloned match that display in the home page
  //   const updatedMatches = state.match.map((e: MatchProps) => {
  //     if (e.id === id) {
  //       const alreadySelected = e.selected.some((opt) => opt.option === option);
  //       const newSelected = alreadySelected
  //         ? e.selected.filter((opt) => opt.option !== option)
  //         : [...e.selected, {id: String(e.selected.length), option:option}];
  //       return { ...e, selected: newSelected };
  //     }
  //     return e;
  //   });

  //   const updatedGame = updatedMatches.find((e) => e.id === id);

  //   // const updatedSelectedGames = updatedGame?.selected.length
  //   //   ? [...state.selectedGames.filter((g) => g.id !== id), updatedGame]
  //   //   : state.selectedGames.filter((g) => g.id !== id);

  //   const updatedSelectedGames = [...state.selectedGames, updatedGame]

  //   return {
  //     match: updatedMatches,
  //     selectedGames: updatedSelectedGames,
  //   };
  // }),

  selectGame: ({ id, option }: select) =>
  set((state) => {
  let newSelectedGames = [...state.selectedGames];

  const updatedMatch = state.match.map((e) => {
    if (e.id === id) {
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
        e.selected.some((e)=>e.id === id) ? { ...e, selected: e.selected.filter((e)=>e.id === id)} : e
      ),
      selectedGames: state.selectedGames.filter((e: MatchPropsBetslip) => e.selected.id !== id)
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
