import { View } from "react-native";
import { flex } from "@/constants/style";
import { BettingMarket } from "@/interface";
import { ThemedText } from "@/components/ThemedText";
import OverUnderHeader from "./OverUnder";
import { BB } from "@/store/BBDD";

interface Props {
  selectedMarket?: BettingMarket;
  setMarkets: any;
  goalDD: boolean;
  setGoalDD: any;
}

const HeaderRow = ({ selectedMarket, setMarkets, goalDD, setGoalDD}: Props) => {
  const { generalvalue, updateGoalSelection, BBoverUnder } = BB()
  if (!selectedMarket) return null;

  if (selectedMarket.title.includes("Over") ||
          selectedMarket.title.includes("Under") ||
          selectedMarket.title.includes("Handicap")) {
    return (
      <OverUnderHeader
        selectedMarket={selectedMarket}
        setMarkets={setMarkets}
        goalDD={goalDD}
        setGoalDD={setGoalDD}
        BBoverUnder={BBoverUnder}
        updateGoalSelection={updateGoalSelection}
        generalvalue={generalvalue}
      />
    );
  }

  return (
    <View className={`px-8 bg-pry-light py-2 ${flex}`}>
      <ThemedText className="text-lg w-[48%] font-medium mb-2">
        Matches
      </ThemedText>

      <View className={`${flex} justify-around w-[48%]`}>
        {selectedMarket.options.map((opt) => (
          <ThemedText
            key={opt.id}
            className="text-center text-white capitalize"
          >
            {opt.init}
          </ThemedText>
        ))}
      </View>
    </View>
  );
};

export default HeaderRow;
