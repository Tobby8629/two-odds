import { basketballData, CountryLeagues, footballData } from "@/constants/dataOne";
import { sports as availsport, MatchPropsBetslip, sports } from "@/interface";
import { router } from "expo-router";
import { create } from "zustand";

export interface select {
  id: number,
  option: "Home" | "Away" | "Draw"
}

interface USESPORTPROPS {
  dataArry: CountryLeagues[];
  footballData: CountryLeagues[];
  basketballData: CountryLeagues[];
  selectedsport: availsport | "";
  menuSelectedsport: availsport | "";
  selectGame: ({id, option}:select) => void;
  selectedGames: MatchPropsBetslip[];
  removeMatch: (id: string) => void;
  clearBetslip: () => void;
  updateDataArry: (sport: sports) => CountryLeagues[];
  handleSelect: (sport: availsport | "") => void;
  menuhandleSelect: (sport: availsport | "") => void;
  switchAndSelect: (sport: availsport) => void;
}

export const useSport = create<USESPORTPROPS>((set, get) => ({
  dataArry: footballData, 
  footballData: footballData,
  basketballData: basketballData,
  selectedsport: "football",
  selectedGames: [],
  menuSelectedsport: "football",

  updateDataArry: (sport: sports) => {
    const { footballData, basketballData } = get();
    switch (sport) {
      case "basketball":
        return basketballData;

      case "football":
        return footballData;

      default:
        return footballData; // safe fallback
    }
  },

  handleSelect: (sport: availsport | "") =>
    set((state) => ({
      selectedsport: sport,
      dataArry: state.updateDataArry(sport as sports),
  })),

  menuhandleSelect: (sport: availsport | "") =>
    set((state) => ({
      menuSelectedsport: sport,
      dataArry: state.updateDataArry(sport as sports),
    })),

  switchAndSelect: (sport: availsport) => {
    router.push("/(tabs)/menu");
    set((state) => ({
      menuSelectedsport: sport,
      dataArry: state.updateDataArry(sport),
    }));
  },

  selectGame: ({ id, option }) =>
  set((state) => {
    let newSelectedGames = [...state.selectedGames];

    const updatedDataArry = state.dataArry.map((country) => ({
      ...country,
      leagues: country.leagues.map((league) => ({
        ...league,
        matches: league.matches.map((match) => {
          if (match.id !== id) return match;

          const alreadySelected = match.selected.some(
            (opt) => opt.option === option
          );

          if (alreadySelected) {
            // Get the option id
            const optionId = match.selected.find(
              (opt) => opt.option === option
            )?.id;

            // Remove from match
            const newSelected = match.selected.filter(
              (opt) => opt.option !== option
            );

            // Remove from selectedGames
            newSelectedGames = newSelectedGames.filter(
              (g) => g.selected.id !== optionId
            );

            return { ...match, selected: newSelected };
          } else {
            const newOption = { id: String(Date.now()), option };
            const newSelected = [...match.selected, newOption];

            // Add to selectedGames
            newSelectedGames.push({
              id: match.id,
              home: match.home,
              away: match.away,
              selected: newOption,
            });

            return { ...match, selected: newSelected };
          }
        }),
      })),
    }));

    return {
      dataArry: updatedDataArry,
      selectedGames: newSelectedGames,
    };
  }),
 

  


removeMatch: (id: string) =>
  set((state) => ({
    dataArry: state.dataArry.map((country) => ({
      ...country,
      leagues: country.leagues.map((league) => ({
        ...league,
        matches: league.matches.map((match) =>
          match.selected.some((opt) => opt.id === id)
            ? { ...match, selected: match.selected.filter((opt) => opt.id !== id) }
            : match
        ),
      })),
    })),

    selectedGames: state.selectedGames.filter(
      (g) => g.selected.id !== id
    ),
  })),


  clearBetslip: () =>
    set((state) => ({
       dataArry: state.dataArry.map((country) => ({
      ...country,
      leagues: country.leagues.map((league) => ({
        ...league,
        matches: league.matches.map((e) =>
        e.selected.length > 0 ? { ...e, selected: [] } : e
      ),
      selectedGames: [],
    })),
  }))
  }))
}))

