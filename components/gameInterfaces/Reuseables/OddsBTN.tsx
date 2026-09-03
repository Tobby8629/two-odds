import { ThemedText } from "@/components/ThemedText";
import { Pressable } from "react-native";
import React from "react";
import { Match } from "@/hooks/matchInterface/matchInterface";
import { useSport } from "@/store/useStore";
import { SelectedOption } from "@/interface";


interface Props {
  match: Match;
  type: "homeTeam" | "awayTeam" | "Draw";
  className?: string;
  selectGame: (id: string, option: SelectedOption['option'], match: Match) => void;
}

const OddsButton = ({ match, type, selectGame, className }: Props) => {
  const { selectedGames } = useSport();

  // Filter once per match
  const matchSelections = selectedGames.filter(
    (g) => g.matchId === match.id
  );

  // This is the final boolean for THIS button
  const isSelected = matchSelections.some(
    (g) => g.option === type
  );

  const matchWinner = match.markets.find((e)=> e.betType === "MATCH_WINNER")
  
  // Get the odds value based on type
  const oddsValue =
    type === "homeTeam"
      ? matchWinner?.outcomes.find((e)=>e.prediction.winner === "home")
      : type === "Draw"
      ? matchWinner?.outcomes.find((e)=>e.prediction.winner === "draw")
      : matchWinner?.outcomes.find((e)=>e.prediction.winner === "away");

  return (
    <Pressable
      onPress={() => selectGame(match.id, type, match)}
      className={`px-3 py-3 rounded-xl w-[31%] 
        ${isSelected ? "bg-sec" : "bg-cus-purple"} 
        ${className ?? ""}`}
    >
      <ThemedText
        className={`text-center ${isSelected ? "!text-white" : "!text-black"}`}
      >
        {oddsValue?.price?.toFixed(2)}
      </ThemedText>
    </Pressable>
  );
};

export default OddsButton;
