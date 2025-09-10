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

interface WithdrawInfo{
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
