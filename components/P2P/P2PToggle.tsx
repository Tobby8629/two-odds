import React from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";

export type ToggleTab = "bets" | "p2p";

export interface P2PToggleProps {
  active: ToggleTab; 
  onChange: (tab: ToggleTab) => void; 
  containerStyle?: ViewStyle; 
}

/*
 * The track sits on the brand blue and the selected pill uses the lighter
 * brand blue (p2p-active), which was defined in the theme but never wired up.
 * The inactive label is dimmed so the selection reads without a colour change.
 */
export default function P2PToggle({ active, onChange, containerStyle }: P2PToggleProps) {
  const tab = (label: string, value: ToggleTab, style: ViewStyle) => (
    <Pressable
      onPress={() => onChange(value)}
      accessibilityRole="button"
      accessibilityState={{ selected: active === value }}
      className={`flex-1 rounded-[3px] items-center justify-center ${
        active === value ? "bg-p2p-active" : "bg-transparent"
      }`}
      style={style}
    >
      <Text
        className={`text-lg ${
          active === value ? "text-white font-semibold" : "text-white/60"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View
      className="mx-auto mt-4 w-[160px] h-[26px] rounded-[3px] bg-pry flex-row justify-between p-[2px] "
      style={containerStyle}
    >
      {tab("Bets", "bets", { width: 30, height: 20, marginHorizontal: 1 })}
      {tab("PTP", "p2p", { width: 32, height: 18, marginHorizontal: 3 })}
    </View>
  );
}