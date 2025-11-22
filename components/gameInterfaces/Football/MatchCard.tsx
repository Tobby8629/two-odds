import { View } from "react-native";
import { flex } from "@/constants/style";
import OverUnderButtons from "./OverUnderBtn";
import OddsButton from "./OddsBTN";
import { ThemedText } from "@/components/ThemedText";
import { BettingMarket, MatchProps } from "@/interface";

interface Props {
  match: MatchProps;
  selectedMarket: BettingMarket | undefined;
  selectGame:(option: {id: number, option: "Home" | "Away" | "Draw"}) => void; 
}

const MatchCard = ({ match, selectedMarket, selectGame }: Props) => {
  return (
    <View className={`${flex} my-3 px-3 py-3 bg-light-blue mb-3 mx-6 rounded-xl`}>
      <View className="w-[48%]">
        <ThemedText className="text-sm !text-black">{match.time}</ThemedText>
        <ThemedText className="text-lg !text-black font-medium">{match.home}</ThemedText>
        <ThemedText className="text-lg !text-black font-medium">{match.away}</ThemedText>
      </View>

      <View className="w-[50%]">
        {selectedMarket?.id === 3 ? (
          <OverUnderButtons match={match} selectGame={selectGame} />
        ) : (
          <View className="flex-row justify-between">
            <OddsButton match={match} type="Home" selectGame={selectGame} />
            <OddsButton match={match} type="Draw" selectGame={selectGame} />
            <OddsButton match={match} type="Away" selectGame={selectGame} />
          </View>
        )}
      </View>
    </View>
  );
};

export default MatchCard;
