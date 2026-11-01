import { Pressable, View } from "react-native";
import { flex } from "@/constants/style";
import { BettingMarket } from "@/interface";
import { ThemedText } from "@/components/ThemedText";

interface Props {
  markets: BettingMarket[];
  selectMarket: (id: number) => void;
}

const  MarketTabs = ({ markets, selectMarket }: Props) => (
  <View className={`${flex} border-b border-gray-300 px-8 pt-3`}>
    {markets.map((m) => (
      <Pressable key={m.id} onPress={() => selectMarket(m.id)} className="mb-3">
        <ThemedText className="text-lg font-light text-gray-300">
          {m.title}
        </ThemedText>
        <View
          className={`${
            m.selected ? "bg-sec" : "bg-transparent"
          } h-2 w-2 mx-auto mt-1 rounded-lg`}
        />
      </Pressable>
    ))}
  </View>
);

export default MarketTabs;
