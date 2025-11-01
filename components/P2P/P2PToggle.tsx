import React from "react";
import { Pressable, Text, View, ViewStyle } from "react-native"; 

type Tab = "bets" | "p2p";

interface Props {
  activeTab: Tab;
  onToggle: (tab: Tab) => void;
  containerStyle?: ViewStyle; //Made optional for flexibility
}

export default function P2PToggle({ activeTab, onToggle, containerStyle }: Props) {
  return (
    <View
      className="mx-auto mt-4 w-[160px] h-[26px] rounded-[3px] bg-p2p-tab flex-row justify-between p-[2px]"
      style={containerStyle} 
    >
      <Pressable
        onPress={() => onToggle("bets")}
        className={`flex-1 mx-[1px] rounded-[3px] items-center justify-center ${
          activeTab === "bets" ? "bg-p2p-active" : "bg-p2p-tab"
        }`}
        style={{ width: 30, height: 20 }}
      >
        <Text className="text-white text-base font-semibold">Bets</Text>
      </Pressable>

      <Pressable
        onPress={() => onToggle("p2p")}
        className={`flex-1 mx-[1px] rounded-[3px] items-center justify-center ${
          activeTab === "p2p" ? "bg-p2p-active" : "bg-p2p-tab"
        }`}
        style={{ width: 32, height: 18 }}
      >
        <Text className="text-white text-base font-semibold">PTP</Text>
      </Pressable>
    </View>
  );
}
