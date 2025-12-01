import { ThemedText } from "@/components/ThemedText";
import { Match } from "@/constants/dataOne";
import { useSport } from "@/store/useSports";
import { Pressable } from "react-native";
import React from "react";

interface Props {
  match: Match;
  type: "Home" | "Away" | "Draw";
  className?: string;
  selectGame: (option: { id: number; option: "Home" | "Away" | "Draw" }) => void;
}

const OddsButton = ({ match, type, selectGame, className }: Props) => {
  const { selectedGames } = useSport();

  // Filter once per match
  const matchSelections = selectedGames.filter(
    (g) => g.id === match.id
  );

  // This is the final boolean for THIS button
  const isSelected = matchSelections.some(
    (g) => g.selected.option === type
  );

  // Get the odds value based on type
  const oddsValue =
    type === "Home"
      ? match?.odds?.home
      : type === "Draw"
      ? match?.odds?.draw
      : match?.odds?.away;

  return (
    <Pressable
      onPress={() => selectGame({ id: match.id, option: type })}
      className={`px-3 py-3 rounded-xl w-[31%] 
        ${isSelected ? "bg-sec" : "bg-cus-purple"} 
        ${className ?? ""}`}
    >
      <ThemedText
        className={`text-center ${isSelected ? "!text-white" : "!text-black"}`}
      >
        {oddsValue}
      </ThemedText>
    </Pressable>
  );
};

export default OddsButton;
