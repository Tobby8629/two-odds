import { View, Pressable } from "react-native";
import { flex } from "@/constants/style";
import { ThemedText } from "@/components/ThemedText";
import { Match } from "@/constants/dataOne";

interface Props {
  match: Match;
  selectGame: (option: { id: number; option: "Home" | "Draw"  }) => void;
}

const OverUnderButtons = ({ match, selectGame }: Props) => (
  <View className={`${flex} justify-between`}>
    <Pressable
      onPress={() => selectGame({ id: match.id, option: "Home" })}
      className="w-[45%] bg-cus-purple px-3 py-3 rounded-xl"
    >
      <ThemedText className="text-center text-black">
        {match.odds?.home}
      </ThemedText>
    </Pressable>

    <Pressable
      onPress={() => selectGame({ id: match.id, option: "Draw" })}
      className="w-[45%] bg-cus-purple px-3 py-3 rounded-xl"
    >
      <ThemedText className="text-center text-black">
        {match.odds?.away}
      </ThemedText>
    </Pressable>
  </View>
);

export default OverUnderButtons;
