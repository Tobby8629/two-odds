import { ThemedText } from "@/components/ThemedText";
import { match } from "@/constants/data";
import { flex } from "@/constants/style";
import { OVERHEADER } from "@/interface";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import GoalsDD from "./GoalsDD";

const OverUnderHeader = ({
  selectedMarket,
  setMarkets,
  goalDD,
  setGoalDD,
  BBoverUnder,
  generalvalue,
  updateGoalSelection
}: OVERHEADER) => {

  return (
    <View className={`px-8 bg-pry-light py-2 ${flex}`}>
      <ThemedText className="text-lg w-[48%] font-medium mb-2">
        Matches
      </ThemedText>

      <View className={`${flex} justify-around w-[48%]`}>
        {/* GOALS DROPDOWN */}
        <GoalsDD 
          matchGoals={BBoverUnder!!}
          onSelectGoal={updateGoalSelection}
          value={generalvalue}
        />

        {/* OVER / UNDER LABELS */}
        <ThemedText className="text-center">Over</ThemedText>
        <ThemedText className="text-center">Under</ThemedText>
      </View>
    </View>
  );
};

export default OverUnderHeader;