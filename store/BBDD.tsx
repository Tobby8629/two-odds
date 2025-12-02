import { create } from "zustand";

interface BBDDProps {
   BBoverUnder?: { line: string; over: string; under: string }[];
    generalvalue: string;
    updateGoalSelection: (line: string) => void;
}

export const BB = create<BBDDProps>((set,get) => ({
 generalvalue:  "goals",
  BBoverUnder: [
    { line: "205.5", over: "1.80", under: "1.95" },
    { line: "215.5", over: "1.88", under: "1.92" },
    { line: "220.5", over: "3.60", under: "1.40" }
  ],
  updateGoalSelection: ((line) => set((state)=>({
    generalvalue: line
  })))
}));
