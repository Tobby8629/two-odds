import { sports as availsport, sports } from "@/interface";
import { router } from "expo-router";
import { create } from "zustand";

interface USESPORTPROPS{
  selectedsport: availsport | ""
  handleSelect: (sport: availsport | "") => void
  switchAndSelect: (sport: availsport ) => void
}

export const useSport = create<USESPORTPROPS>((set)=>({
  selectedsport: "",
  handleSelect: (sport: availsport | "") => set({
    selectedsport: sport
  }),
  switchAndSelect: (sport: availsport ) => {
  router.push("/(tabs)/menu")
  set(({
    selectedsport: sport
  }))
}
}))



