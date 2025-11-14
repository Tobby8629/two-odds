import { footballLeagues, updateDataArry } from "@/constants/dataOne";
import { sports as availsport, CountryLeagues, sports } from "@/interface";
import { router } from "expo-router";
import { create } from "zustand";

interface USESPORTPROPS{
  dataArry: CountryLeagues[]
  selectedsport: availsport | ""
  handleSelect: (sport: availsport | "") => void
  switchAndSelect: (sport: availsport ) => void
}

export const useSport = create<USESPORTPROPS>((set)=>({
  dataArry: footballLeagues,
  selectedsport: "",
  handleSelect: (sport: availsport | "") => set({
    selectedsport: sport,
    dataArry: updateDataArry(sport as sports)
  }),
  switchAndSelect: (sport: availsport ) => {
  router.push("/(tabs)/menu")
  set(({
    selectedsport: sport,
    dataArry: updateDataArry(sport)
  }))
  }
}))



