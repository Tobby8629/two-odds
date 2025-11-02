import React from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";

export type ToggleTab = "bets" | "p2p";

export interface P2PToggleProps {
  active: ToggleTab; 
  onChange: (tab: ToggleTab) => void; 
  containerStyle?: ViewStyle; 
}

export default function P2PToggle({ active, onChange, containerStyle }: P2PToggleProps) {
  return (
    <View
      className="mx-auto mt-4 w-[160px] h-[26px] rounded-[3px] bg-p2p-tab flex-row justify-between p-[2px]"
      style={containerStyle}
    >
      <Pressable
        onPress={() => onChange("bets")}
        className={`flex-1 mx-[1px] rounded-[3px] items-center justify-center ${
          active === "bets" ? "bg-p2p-active" : "bg-p2p-tab"
        }`}
        style={{ width: 30, height: 20 }}
      >
        <Text className="text-white text-lg">Bets</Text>
      </Pressable>

      <Pressable
        onPress={() => onChange("p2p")}
        className={`flex-1 mx-[3px] rounded-[3px] items-center justify-center ${
          active === "p2p" ? "bg-p2p-active" : "bg-p2p-tab"
        }`}
        style={{ width: 32, height: 18 }}
      >
        <Text className="text-white text-lg">PTP</Text>
      </Pressable>
    </View>
  );
}