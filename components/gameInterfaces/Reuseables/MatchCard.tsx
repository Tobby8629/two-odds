import { View } from "react-native";
import { flex } from "@/constants/style";
import OverUnderButtons from "./OverUnderBtn";
import OddsButton from "./OddsBTN";
import { ThemedText } from "@/components/ThemedText";
import { BettingMarket} from "@/interface";
import { useSport } from "@/store/useSports";
import { Match } from "@/hooks/matchInterface/matchInterface";


interface Props {
  selectedMarket: BettingMarket | undefined;
  match: Match;
  generalGoal: string;
}

const MatchCard = ({ selectedMarket, match, generalGoal }: Props) => {
  const { menuSelectedsport, selectGame } = useSport()
  
  return (
    <View className={`${flex} my-3 px-3 py-3 bg-light-blue mb-3 mx-6 rounded-xl`}>
      <View className="w-[48%]">
        <ThemedText className="text-sm !text-black">{match.startTime}</ThemedText>
        <ThemedText className="text-lg !text-black font-medium">{match.homeTeam}</ThemedText>
        <ThemedText className="text-lg !text-black font-medium">{match.awayTeam}</ThemedText>
      </View>

      <View className="w-[50%]">
        {selectedMarket?.title &&
        (selectedMarket.title.includes("Over") ||
          selectedMarket.title.includes("Under") ||
          selectedMarket.title.includes("Handicap"))
           ? (
          <OverUnderButtons generalGoal={generalGoal} match={match}  />
        ) : 
        menuSelectedsport === "tennis" || menuSelectedsport === "basketball" ?  
        <View className="flex-row justify-between">
          <OddsButton className="w-[47%]" match={match} type="homeTeam" selectGame={selectGame} />
          <OddsButton className="w-[47%]" match={match} type="awayTeam" selectGame={selectGame} />
        </View>
        :
        (
          <View className="flex-row justify-between">
            <OddsButton match={match} type="homeTeam" selectGame={selectGame}/>
            <OddsButton match={match} type="Draw" selectGame={selectGame} />
            <OddsButton match={match} type="awayTeam" selectGame={selectGame} />
          </View>
        )
        }
      </View>

    </View>
  );
};

export default MatchCard;
