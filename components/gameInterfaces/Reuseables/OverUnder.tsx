import { ThemedText } from "@/components/ThemedText";
import { flex } from "@/constants/style";
import { OVERHEADER } from "@/interface";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

const OverUnderHeader = ({
  selectedMarket,
  setMarkets,
  goalDD,
  setGoalDD,
}: OVERHEADER) => {
  const updateGoalSelection = (id: string) => {
    setMarkets(prev =>
      prev.map(m =>
        m.id === selectedMarket.id
          ? {
              ...m,
              goals: m.goals?.map(goal => ({
                ...goal,
                select: goal.id === id,
              })),
            }
          : m
      )
    );
    setGoalDD(false);
  };

  return (
    <View className={`px-8 bg-pry-light py-2 ${flex}`}>
      <ThemedText className="text-lg w-[48%] font-medium mb-2">
        Matches
      </ThemedText>

      <View className={`${flex} justify-around w-[48%]`}>
        {/* GOALS DROPDOWN */}
        <View className="relative">
          <Pressable
            className={`${flex} justify-center gap-1`}
            onPress={() => setGoalDD(!goalDD)}
          >
            <ThemedText className="text-center">Goals</ThemedText>
            <FontAwesome6 name="angle-down" color={"white"} size={12} />
          </Pressable>

          {goalDD && (
            <Pressable
              onStartShouldSetResponder={() => true}
              className="absolute bg-light-blue gap-1 z-10 top-full left-0 w-[150%] rounded-lg p-2 px-3 mt-1"
            >
              {selectedMarket.goals?.map(goal => (
                <Pressable
                  key={goal.id}
                  onPress={() => updateGoalSelection(goal.id)}
                  className="mb-2 flex-row justify-between items-center"
                >
                  <ThemedText className="text-left !text-black">
                    {goal.init}
                  </ThemedText>

                  {goal.select && (
                    <FontAwesome6 name="check" color={"gold"} size={12} />
                  )}
                </Pressable>
              ))}
            </Pressable>
          )}
        </View>

        {/* OVER / UNDER LABELS */}
        <ThemedText className="text-center">Over</ThemedText>
        <ThemedText className="text-center">Under</ThemedText>
      </View>
    </View>
  );
};

export default OverUnderHeader;