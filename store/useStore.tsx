import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { create } from "zustand";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";

import { bets } from "@/constants/data";

import {
  basketballData,
  CountryLeagues,
  footballData,
} from "@/constants/dataOne";

import { Match } from "@/hooks/matchInterface/matchInterface";

import {
  betProps,
  MatchPropsBetslip,
  sports as AvailableSport,
} from "@/interface";



export type BetOption =
  | "homeTeam"
  | "awayTeam"
  | "Draw"
  | `Over ${string}`
  | `Under ${string}`;


interface SportDetail {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}


interface SportFetch {
  success: boolean;
  data: SportDetail[];
}


interface SportStore {
  sports: SportDetail[];

  fetchSport: () => Promise<void>;

  isLoading: boolean;

  error: string | null;
}


interface BetHistoryStore {
  bets: betProps[];

  deleteBetSlip: (id: string) => void;
}


export interface WithdrawInfo {
  amount: string | null;

  asset: "solana" | "usdt" | "naira";

  walletAddress: string;
}


interface WithdrawalStore {
  withdrawStatus: boolean;

  withdrawInfo: WithdrawInfo;

  updateWithdrawStatus: () => void;

  removeWithdrawStatus: () => void;

  updateWithdrawInfo: (
    value: WithdrawInfo
  ) => void;
}


interface UseSportProps {
  // dataArry: CountryLeagues[];

  // footballData: CountryLeagues[];

  // basketballData: CountryLeagues[];

  selectedsport: string;

  menuSelectedsport: string;

  selectedGames: MatchPropsBetslip[];

  handleSelect: (sport: string) => void;

  menuhandleSelect: (sport: string) => void;

  switchAndSelect: (
    sport: AvailableSport
  ) => void;

  selectGame: (
    id: string,
    option: BetOption,
    match: Match
  ) => void;

  removeMatch: (
    selectionId: string
  ) => void;

  clearBetslip: () => void;
}




export const useSport = create<UseSportProps>()(
  persist(
    (set) => ({
      dataArry: footballData,

      footballData,

      basketballData,

      selectedsport: "football",

      menuSelectedsport: "football",

      selectedGames: [],


      // ================================================
      // SELECT SPORT
      // ================================================

      handleSelect: (sport) => {
        set({
          selectedsport: sport,
        });
      },


      // ================================================
      // MENU SPORT
      // ================================================

      menuhandleSelect: (sport) => {
        set({
          menuSelectedsport: sport,
        });
      },


      // ================================================
      // SWITCH SPORT + NAVIGATE
      // ================================================

      switchAndSelect: (sport) => {
        set({
          menuSelectedsport: sport,
        });

        router.push("/(tabs)/menu");
      },


      // ================================================
      // SELECT / DESELECT BET
      // ================================================

      selectGame: (
        matchId,
        option,
        match
      ) => {
        set((state) => {
         
          const existingSelection =
            state.selectedGames.find(
              (game) =>
                game.matchId === matchId &&
                game.option === option
            );


          if (existingSelection) {
            return {
              selectedGames:
                state.selectedGames.filter(
                  (game) =>
                    game.id !==
                    existingSelection.id
                ),
            };
          }


          const newSelection: MatchPropsBetslip = {
            id: `${matchId}-${Date.now()}`,

            matchId,

            option,

            match,
          };


          return {
            selectedGames: [
              ...state.selectedGames,
              newSelection,
            ],
          };
        });
      },


      removeMatch: (selectionId) => {
        set((state) => ({
          selectedGames:
            state.selectedGames.filter(
              (game) =>
                game.id !== selectionId
            ),
        }));
      },

      clearBetslip: () => {
        set({
          selectedGames: [],
        });
      },
    }),

    {
      // ================================================
      // LOCAL STORAGE
      // ================================================

      name: "two-odds-sport-store",

      storage: createJSONStorage(
        () => AsyncStorage
      ),

      partialize: (state) => ({
        selectedGames:
          state.selectedGames,

        selectedsport:
          state.selectedsport,

        menuSelectedsport:
          state.menuSelectedsport,
      }),
    }
  )
);

export const useBetHistory =
  create<BetHistoryStore>((set) => ({
    bets,

    deleteBetSlip: (id) => {
      set((state) => ({
        bets: state.bets.filter(
          (bet) =>
            bet.id !== Number(id)
        ),
      }));
    },
  }));

export const useWithdrawal =
  create<WithdrawalStore>((set) => ({
    withdrawStatus: false,

    withdrawInfo: {
      amount: null,

      asset: "usdt",

      walletAddress: "",
    },


    updateWithdrawStatus: () => {
      set({
        withdrawStatus: true,
      });
    },


    removeWithdrawStatus: () => {
      set({
        withdrawStatus: false,
      });
    },


    updateWithdrawInfo: (
      value
    ) => {
      set({
        withdrawInfo: value,
      });
    },
  }));