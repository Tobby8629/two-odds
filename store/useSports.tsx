import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";

import {
  basketballData,
  CountryLeagues,
  footballData,
} from "@/constants/dataOne";

import { Match } from "@/hooks/matchInterface/matchInterface";

import {
  sports as AvailableSport,
  MatchPropsBetslip,
} from "@/interface";

export interface Select {
  id: string;

  option:
    | "homeTeam"
    | "awayTeam"
    | "Draw"
    | `Over ${string}`
    | `Under ${string}`;

  match: Match;
}

interface UseSportProps {
  dataArry: CountryLeagues[];

  footballData: CountryLeagues[];

  basketballData: CountryLeagues[];

  selectedsport: string;

  menuSelectedsport: string;

  selectedGames: MatchPropsBetslip[];

  selectGame: (
    id: string,
    option: Select["option"],
    match: Match
  ) => void;

  removeMatch: (id: string) => void;

  clearBetslip: () => void;

  handleSelect: (sport: string) => void;

  menuhandleSelect: (sport: string) => void;

  switchAndSelect: (sport: AvailableSport) => void;
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

      handleSelect: (sport) => {
        set({
          selectedsport: sport,
        });
      },

      menuhandleSelect: (sport) => {
        set({
          menuSelectedsport: sport,
        });
      },

      switchAndSelect: (sport) => {
        set({
          menuSelectedsport: sport,
        });

        router.push("/(tabs)/menu");
      },

     selectGame: (id, option, match) => {
    set((state) => {
      const alreadySelected = state.selectedGames.some(
        (game) =>
          game.matchId === id &&
          game.option === option
      );

      if (alreadySelected) {
        return {
          selectedGames: state.selectedGames.filter(
            (game) =>
              !(
                game.matchId === id &&
                game.option === option
              )
          ),
        };
      }

      const newSelection: MatchPropsBetslip = {
        id: String(Date.now()),
        matchId: id,
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

  removeMatch: (id) => {
    set((state) => ({
      selectedGames: state.selectedGames.filter(
        (game) => game.id !== id
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
      name: "two-odds-sport-store",

      storage: createJSONStorage(
        () => AsyncStorage
      ),

      partialize: (state) => ({
        selectedGames: state.selectedGames,
        selectedsport: state.selectedsport,
        menuSelectedsport:
          state.menuSelectedsport,
      }),
    }
  )
);