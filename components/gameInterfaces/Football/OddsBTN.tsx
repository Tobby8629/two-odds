import { ThemedText } from "@/components/ThemedText";
import { MatchProps } from "@/interface";
import { Pressable } from "react-native";

interface Props {
  match: MatchProps;
  type: "Home" | "Away" | "Draw";
  selectGame: (option: { id: number; option: "Home" | "Away" | "Draw" }) => void;
}

const OddsButton = ({ match, type, selectGame }: Props) => {
  const isSelected = match.selected.some((s) => s.option === type);

  const oddsMap = {
    Home: match.homeOdds,
    Away: match.awayOdds,
    Draw: match.drawOdds,
  } as const;

  return (
    <Pressable
      onPress={() => selectGame({ id: match.id, option: type })}
      className={`${isSelected ? "bg-sec" : "bg-cus-purple"} px-3 py-3 rounded-xl w-[31%]`}
    >
      <ThemedText
        className={`${isSelected ? "!text-white" : "!text-black"} text-center`}
      >
        {oddsMap[type]}
      </ThemedText>
    </Pressable>
  );
};

export default OddsButton;
