import { ThemedText } from "@/components/ThemedText";
import { Match } from "@/constants/dataOne";
import { Pressable } from "react-native";

interface Props {
  match: Match;
  type: "Home" | "Away" | "Draw";
  className?: string;
  selectGame: (option: { id: number; option: "Home" | "Away" | "Draw" }) => void;
}

const OddsButton = ({ match, type, selectGame, className }: Props) => {
  // Detect if THIS specific option is selected
  const isSelected = match.selected.some((s) => s.option === type);

  // Get the right odds number
  const oddsValue =
    type === "Home" ? match?.odds?.home :
    type === "Draw" ? match?.odds?.draw :
    match?.odds?.away;

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
